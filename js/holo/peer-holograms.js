// peer-holograms.js
// ─────────────────────────────────────────────────────────────────────────────
// Per-peer RGBD hologram manager. Subscribes to remote LiveKit video tracks
// and DataChannel messages (xrai.rgbd / xrai.pose / xrai.face / xrai.hands),
// builds one RGBDPointCloud per peer, and positions/orients via xrai.pose.
//
// Layout assumes the side-by-side RGBD video format that LiveKitPublisher.ts
// produces — left half = hue-encoded depth, right half = color. The publisher
// is free to use any layout; this module accepts a configurable splitter via
// `extractFrames(videoEl)` override on subscribe(). Default = horizontal SBS.
//
// Hookup (see viewer.html):
//   const peers = new PeerHolograms({ scene, THREE });
//   document.addEventListener('live:track', (e) => peers.onTrack(e.detail));
//   document.addEventListener('live:track-end', (e) => peers.onTrackEnd(e.detail));
//   document.addEventListener('live:data',  (e) => peers.onData(e.detail));
//   function frame() { peers.tick(); requestAnimationFrame(frame); }
// ─────────────────────────────────────────────────────────────────────────────

import { RGBDPointCloud } from './rgbd-cloud.js';

const DEFAULT_DEPTH_RANGE = [0.3, 3.0];

class PeerHologram {
  constructor({ id, THREE, scene, layout }) {
    this.id = id;
    this.THREE = THREE;
    this.scene = scene;
    this.layout = layout || 'horizontal'; // 'horizontal' | 'vertical'
    this.cloud = new RGBDPointCloud(THREE, { width: 256, height: 192, depthRange: DEFAULT_DEPTH_RANGE });
    this.group = new THREE.Group();
    this.group.name = `peer:${id}`;
    this.group.add(this.cloud.points);

    // Lightweight presence avatar (operator's "glowing sphere + hands" mode) — the peer
    // representation when they are NOT streaming an RGBD hologram (no video track). A glowing
    // head sphere positioned by xrai.pose + a Points cloud of their hand landmarks (xrai.hands).
    const GLOW = 0x6cf0ff;
    this.head = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 24, 16),
      new THREE.MeshBasicMaterial({ color: GLOW, transparent: true, opacity: 0.7 }),
    );
    this.headGlow = new THREE.PointLight(GLOW, 1.3, 1.4);
    this.handPoints = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(42 * 3), 3),
      ),
      new THREE.PointsMaterial({ color: GLOW, size: 0.028, transparent: true, opacity: 0.95, sizeAttenuation: true }),
    );
    this.handPoints.frustumCulled = false;
    this.handPoints.geometry.setDrawRange(0, 0);
    this.avatar = new THREE.Group();
    this.avatar.name = `avatar:${id}`;
    this.avatar.add(this.head, this.headGlow, this.handPoints);
    this.group.add(this.avatar); // visible by default = instant presence before any data

    scene.add(this.group);

    this.videoEl = null;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.lastT = 0;
  }

  attachVideo(track) {
    const el = track.attach();
    el.autoplay = true; el.playsInline = true; el.muted = true;
    el.style.display = 'none';
    document.body.appendChild(el);
    this.videoEl = el;
    this.showAvatar(false); // full RGBD hologram takes over from the lightweight avatar
  }

  detachVideo() {
    if (!this.videoEl) return;
    try { this.videoEl.remove(); } catch {}
    this.videoEl = null;
    this.showAvatar(true); // fall back to the glowing-sphere + hands avatar
  }

  applyPose(p, q) {
    if (p && p.length === 3) this.group.position.set(p[0], p[1], p[2]);
    if (q && q.length === 4) this.group.quaternion.set(q[0], q[1], q[2], q[3]);
  }

  applyCameraParams(meta) {
    if (Array.isArray(meta?.rayParams) && meta.rayParams.length === 4) this.cloud.setRayParams(meta.rayParams);
    if (Array.isArray(meta?.depthRange) && meta.depthRange.length === 2) this.cloud.setDepthRange(meta.depthRange[0], meta.depthRange[1]);
  }

  // hands = [ [ [x,y,z]×21 ], … ] normalized MediaPipe landmarks. Map into a ~0.5m box in
  // front of the head sphere so peers see moving hands (placement refined once verified live).
  applyHands(hands) {
    const pos = this.handPoints.geometry.getAttribute('position');
    const S = 0.5;
    let n = 0;
    for (const hand of hands || []) {
      for (const lm of hand) {
        if (n >= 42) break;
        const lx = Array.isArray(lm) ? lm[0] : lm.x;
        const ly = Array.isArray(lm) ? lm[1] : lm.y;
        const lz = (Array.isArray(lm) ? lm[2] : lm.z) || 0;
        pos.setXYZ(n++, (lx - 0.5) * S, (0.5 - ly) * S + 0.02, -0.3 - lz * S);
      }
    }
    pos.needsUpdate = true;
    this.handPoints.geometry.setDrawRange(0, n);
  }

  // Toggle the lightweight avatar (hidden once a full RGBD hologram video is streaming).
  showAvatar(v) { this.avatar.visible = v; }

  tick(now) {
    if (!this.videoEl || this.videoEl.readyState < 2) return;
    if (now - this.lastT < 33) return; // ~30 FPS sampling
    this.lastT = now;

    const vw = this.videoEl.videoWidth | 0;
    const vh = this.videoEl.videoHeight | 0;
    if (!vw || !vh) return;

    let depthRect, colorRect, halfW, halfH;
    if (this.layout === 'vertical') {
      halfH = vh >> 1;
      depthRect = { x: 0, y: 0, w: vw, h: halfH };
      colorRect = { x: 0, y: halfH, w: vw, h: halfH };
    } else {
      halfW = vw >> 1;
      depthRect = { x: 0, y: 0, w: halfW, h: vh };
      colorRect = { x: halfW, y: 0, w: halfW, h: vh };
    }

    const targetW = 256, targetH = 192;
    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW; this.canvas.height = targetH;
    }

    // depth
    this.ctx.drawImage(this.videoEl, depthRect.x, depthRect.y, depthRect.w, depthRect.h, 0, 0, targetW, targetH);
    const depthImg = this.ctx.getImageData(0, 0, targetW, targetH);
    this.cloud.updateDepth(new Uint8Array(depthImg.data.buffer), targetW, targetH);

    // color
    this.ctx.drawImage(this.videoEl, colorRect.x, colorRect.y, colorRect.w, colorRect.h, 0, 0, targetW, targetH);
    const colorImg = this.ctx.getImageData(0, 0, targetW, targetH);
    this.cloud.updateColor(new Uint8Array(colorImg.data.buffer), targetW, targetH);
  }

  dispose() {
    this.detachVideo();
    this.scene.remove(this.group);
    this.cloud.dispose();
  }
}

export class PeerHolograms {
  constructor({ scene, THREE, layout = 'horizontal' }) {
    this.scene = scene;
    this.THREE = THREE;
    this.layout = layout;
    this.peers = new Map();
  }

  _get(id) {
    let p = this.peers.get(id);
    if (!p) {
      p = new PeerHologram({ id, THREE: this.THREE, scene: this.scene, layout: this.layout });
      this.peers.set(id, p);
    }
    return p;
  }

  onTrack({ track, participant }) {
    if (!track || track.kind !== 'video') return;
    const id = participant?.identity || 'unknown';
    this._get(id).attachVideo(track);
  }

  onTrackEnd({ participant }) {
    const id = participant?.identity;
    if (!id) return;
    const p = this.peers.get(id);
    if (p) { p.dispose(); this.peers.delete(id); }
  }

  onData({ msg, participant }) {
    if (!msg || typeof msg !== 'object') return;
    const id = msg.peer || participant?.identity;
    if (!id) return;
    const peer = this._get(id);

    switch (msg.kind) {
      case 'pose':
        peer.applyPose(msg.p, msg.q);
        break;
      case 'rgbd-meta':
        peer.applyCameraParams(msg);
        break;
      case 'hands':
        peer.applyHands(msg.hands);
        break;
      default:
        break;
    }
  }

  tick() {
    const now = performance.now();
    for (const peer of this.peers.values()) peer.tick(now);
  }

  count() { return this.peers.size; }

  dispose() {
    for (const peer of this.peers.values()) peer.dispose();
    this.peers.clear();
  }
}
