// rgbd-publisher.js
// ─────────────────────────────────────────────────────────────────────────────
// Web-side RGBD hologram publisher. Mirrors the side-by-side format that
// PeerHolograms (peer-holograms.js) decodes, and that LiveKitPublisher.ts on
// iOS produces — so any peer in the room can render this client as a hologram
// without per-platform forks.
//
// Pipeline:
//   getUserMedia(video)
//     ↓ rAF loop, ~30 FPS
//   draw color to right half of canvas
//   draw depth (hue-encoded) to left half
//     ↓ canvas.captureStream() → MediaStreamTrack
//   Live.publishTrack(track, { name: 'xrai-rgbd' })
//
// Until a real depth source is available in-browser (WebXR depth-sensing on
// Vision Pro Safari ships this; Chromium android-ar also exposes it), we use a
// luma-driven placeholder: brighter pixels = closer. This is good enough to
// prove the route end-to-end and exercise the peer-side decoder. When a real
// depth track is available we just swap _generateDepthFrame() and the rest of
// the pipeline (publish + receive + decode + render) keeps working as-is.
//
// Companion metadata: every START sends one xrai.rgbd-meta DataChannel msg
// describing rayParams + depthRange so the receiver's RGBDPointCloud can
// reconstruct world-space points (see rgbd-cloud.js setRayParams).
// ─────────────────────────────────────────────────────────────────────────────

import { encodeDepthToHue } from './hue-codec.js';

const DEFAULTS = {
  frameW: 256,
  frameH: 192,
  layout: 'horizontal', // 'horizontal' | 'vertical'
  depthRange: [0.3, 3.0],
  fps: 30,
  // Default FoV-ish ray params for a 60° webcam. rayParams = [tanFovX, tanFovY, principalX, principalY]
  // PeerHologram.applyCameraParams unpacks the first two as half-angle tangents.
  rayParams: [Math.tan((60 * Math.PI / 180) / 2), Math.tan((45 * Math.PI / 180) / 2), 0.5, 0.5],
};

export class RGBDPublisher {
  constructor({ live, showToast }) {
    this.live = live;
    this.showToast = showToast || (m => console.log(m));
    this.stream = null;       // getUserMedia stream
    this.outStream = null;    // canvas.captureStream
    this.publication = null;  // LiveKit LocalTrackPublication
    this.videoEl = null;
    this.canvas = null;
    this.ctx = null;
    this.tmp = null;          // offscreen for depth read-back
    this.tmpCtx = null;
    this.rafId = 0;
    this.opts = { ...DEFAULTS };
    this.lastT = 0;
  }

  get active() { return !!this.publication; }

  async start(opts = {}) {
    if (this.active) return true;
    this.opts = { ...DEFAULTS, ...opts };
    if (!this.live?.active) {
      this.showToast('hologram needs live · enable LiveKit first', 3000);
      return false;
    }

    // Acquire user-facing camera
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
    } catch (e) {
      this.showToast(`camera denied · ${e.message || 'unknown'}`, 4000);
      return false;
    }

    this.videoEl = document.createElement('video');
    this.videoEl.autoplay = true; this.videoEl.playsInline = true; this.videoEl.muted = true;
    this.videoEl.srcObject = this.stream;
    try { await this.videoEl.play(); } catch {}

    // SBS composition canvas
    const { frameW, frameH, layout } = this.opts;
    this.canvas = document.createElement('canvas');
    if (layout === 'vertical') { this.canvas.width = frameW; this.canvas.height = frameH * 2; }
    else                       { this.canvas.width = frameW * 2; this.canvas.height = frameH; }
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    // Offscreen for luma read-back (used to derive placeholder depth)
    this.tmp = document.createElement('canvas');
    this.tmp.width = frameW; this.tmp.height = frameH;
    this.tmpCtx = this.tmp.getContext('2d', { willReadFrequently: true });

    // Capture stream → publish
    this.outStream = this.canvas.captureStream(this.opts.fps);
    const track = this.outStream.getVideoTracks()[0];
    if (!track) {
      this.showToast('captureStream failed · no video track', 4000);
      this._teardown();
      return false;
    }

    this.publication = await this.live.publishTrack(track, { name: 'xrai-rgbd' });
    if (!this.publication) { this._teardown(); return false; }

    // Send rgbd-meta so receivers configure their cloud reconstruction
    await this.live.sendData('xrai.rgbd-meta', {
      kind: 'rgbd-meta',
      width: frameW,
      height: frameH,
      layout,
      rayParams: this.opts.rayParams,
      depthRange: this.opts.depthRange,
    });

    // One initial pose so peers can position the cloud
    await this.live.sendData('xrai.pose', { kind: 'pose', p: [0, 0, 0], q: [0, 0, 0, 1] });

    this._loop();
    this.showToast(`hologram · publishing ${frameW}×${frameH} @ ${this.opts.fps}fps`, 2400);
    return true;
  }

  async stop() {
    if (!this.active && !this.stream) return;
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    if (this.publication) {
      try { await this.live.unpublishTrack(this.publication); } catch {}
      this.publication = null;
    }
    this._teardown();
    this.showToast('hologram · stopped', 1800);
  }

  _teardown() {
    if (this.stream) { for (const t of this.stream.getTracks()) try { t.stop(); } catch {} this.stream = null; }
    if (this.outStream) { for (const t of this.outStream.getTracks()) try { t.stop(); } catch {} this.outStream = null; }
    if (this.videoEl) { try { this.videoEl.pause(); this.videoEl.srcObject = null; } catch {} this.videoEl = null; }
    this.canvas = null; this.ctx = null; this.tmp = null; this.tmpCtx = null;
  }

  _loop() {
    const tick = () => {
      this.rafId = requestAnimationFrame(tick);
      this._compose();
    };
    this.rafId = requestAnimationFrame(tick);
  }

  _compose() {
    if (!this.videoEl || !this.ctx) return;
    if (this.videoEl.readyState < 2) return;
    const now = performance.now();
    const interval = 1000 / this.opts.fps;
    if (now - this.lastT < interval - 1) return;
    this.lastT = now;

    const { frameW, frameH, layout } = this.opts;
    let depthRect, colorRect;
    if (layout === 'vertical') {
      depthRect = { x: 0, y: 0,       w: frameW, h: frameH };
      colorRect = { x: 0, y: frameH,  w: frameW, h: frameH };
    } else {
      depthRect = { x: 0,       y: 0, w: frameW, h: frameH };
      colorRect = { x: frameW,  y: 0, w: frameW, h: frameH };
    }

    // Color half — direct copy from video.
    this.ctx.drawImage(this.videoEl, colorRect.x, colorRect.y, colorRect.w, colorRect.h);

    // Depth half — placeholder from luma (brighter = closer).
    this.tmpCtx.drawImage(this.videoEl, 0, 0, frameW, frameH);
    const src = this.tmpCtx.getImageData(0, 0, frameW, frameH);
    const out = this.ctx.getImageData(depthRect.x, depthRect.y, frameW, frameH);
    const [dMin, dMax] = this.opts.depthRange;
    const range = dMax - dMin;
    for (let i = 0; i < src.data.length; i += 4) {
      const r = src.data[i], g = src.data[i + 1], b = src.data[i + 2];
      const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255; // 0..1
      // brighter -> closer
      const depth = dMin + (1 - luma) * range;
      const [hr, hg, hb] = encodeDepthToHue(depth, this.opts.depthRange);
      out.data[i] = hr; out.data[i + 1] = hg; out.data[i + 2] = hb; out.data[i + 3] = 255;
    }
    this.ctx.putImageData(out, depthRect.x, depthRect.y);
  }
}
