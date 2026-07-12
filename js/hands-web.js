// hands-web.js
// ─────────────────────────────────────────────────────────────────────────────
// Optional hand navigation — desktop webcam + WebXR devices.
//
// Strategy per target device:
//   • WebXR (Quest / visionOS Safari when WebXR-AR lands) — uses native hand-
//     input events from the XR session. Zero-cost, low-latency.
//   • Desktop webcam — loads MediaPipe Hands via CDN on opt-in. ~2MB download,
//     runs locally (no server). Pinch gesture → click.
//   • Mobile (iOS Safari / Android Chrome non-XR) — disabled; falls back to
//     touch-tap which 3d-force-graph already supports via OrbitControls.
//
// Gesture vocabulary (v0):
//   • Pinch (thumb-tip to index-tip distance < 40px screen space) → click
//   • Two-hand pinch expand → zoom out
//   • Two-hand pinch contract → zoom in
//   • Open-palm swipe → rotate (future)
//
// Events dispatched on document:
//   hands:pointer-move {x, y}       — normalized 0..1
//   hands:click         {x, y}       — when pinch fires
//   hands:zoom          {dir, factor}— two-hand spread/contract
//   hands:available     {mode}       — 'webxr' | 'webcam' | 'none'
//
// Inspired by:
//   - Google AI Studio hand-tracking prototypes (MediaPipe Hands patterns)
//   - Keijiro WebGPU particle demos (per-fingertip particle trails, future)
//   - Portals spec 007 hand-tracking (HoloKit iOS + Sentis editor)
// ─────────────────────────────────────────────────────────────────────────────

const PINCH_GRIP_NORM    = 0.035;   // close → fire (tight)
const PINCH_RELEASE_NORM = 0.060;   // open  → reset (loose, hysteresis kills jitter)
const PINCH_COOLDOWN_MS  = 280;     // per-hand min gap between clicks
const ZOOM_DEADZONE      = 0.02;
const MEDIAPIPE_CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';

export class Hands {
  constructor({ Graph, showToast }) {
    this.Graph = Graph;
    this.showToast = showToast || (m => console.log(m));
    this.active = false;
    this.mode = 'none';         // 'webxr' | 'webcam' | 'none'
    this.landmarker = null;     // MediaPipe HandLandmarker instance
    this.stream = null;
    this.video = null;
    this.canvas = null;
    this.ctx = null;
    this.toggleBtn = null;
    this.previewEl = null;
    this.rafHandle = null;
    this.prevPinch = {};        // per-hand pinch state (latched: true while gripped)
    this.lastClickAt = {};      // per-hand last click ms (cooldown gate)
    this.prevTwoHandDistance = null;
  }

  async detectSupport() {
    // WebXR hand input?
    if (navigator.xr) {
      try {
        const xrOK = await navigator.xr.isSessionSupported('immersive-ar') ||
                     await navigator.xr.isSessionSupported('immersive-vr');
        if (xrOK) return 'webxr';
      } catch {}
    }
    // Webcam on fine-pointer desktop
    if (navigator.mediaDevices?.getUserMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return 'webcam';
    }
    return 'none';
  }

  // ─── WebXR branch — stub. Real impl reuses XR session hand inputs from
  //     the PlayCanvas / Needle viewer stubs (future).
  async _enableWebXR() {
    this.showToast('WebXR hand input wakes up inside an immersive session — enter AR first.', 4500);
    document.dispatchEvent(new CustomEvent('hands:available', { detail: { mode: 'webxr' } }));
    // Full WebXR session entry is the responsibility of the main viewer's XR
    // button. Hands.js subscribes to session events when one is active.
  }

  // ─── Webcam branch — MediaPipe HandLandmarker ─────────────────────────────
  async _enableWebcam() {
    try {
      // Dynamic import of MediaPipe tasks-vision
      const { FilesetResolver, HandLandmarker } = await import(MEDIAPIPE_CDN + '/vision_bundle.mjs');
      const filesetResolver = await FilesetResolver.forVisionTasks(MEDIAPIPE_CDN + '/wasm');
      this.landmarker = await HandLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 2,
      });
    } catch (e) {
      this.showToast('MediaPipe Hands failed to load — check network.', 4000);
      console.warn('[hands-web] mediapipe load error:', e);
      return false;
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 480, height: 360, facingMode: 'user' },
      });
    } catch {
      this.showToast('Camera access denied — hand tracking off.', 4000);
      return false;
    }

    this._buildPreview();
    this.video.srcObject = this.stream;
    await this.video.play();

    const loop = () => {
      if (!this.active) return;
      const now = performance.now();
      const results = this.landmarker.detectForVideo(this.video, now);
      this._render(results);
      this._interpret(results);
      this.rafHandle = requestAnimationFrame(loop);
    };
    loop();
    this.mode = 'webcam';
    this.showToast('hand cam on — pinch index+thumb to click', 4500);
    document.dispatchEvent(new CustomEvent('hands:available', { detail: { mode: 'webcam' } }));
    return true;
  }

  _buildPreview() {
    if (this.previewEl) return;
    this.previewEl = document.createElement('div');
    this.previewEl.id = 'hands-preview';
    Object.assign(this.previewEl.style, {
      position: 'fixed', bottom: '40px', right: '40px', zIndex: '16',
      width: '160px', height: '120px',
      border: '1px solid rgba(247,255,168,0.4)',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
      pointerEvents: 'none',
    });
    this.video = document.createElement('video');
    Object.assign(this.video.style, {
      width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)',
    });
    this.video.setAttribute('playsinline', ''); this.video.setAttribute('muted', ''); this.video.muted = true;
    this.canvas = document.createElement('canvas');
    Object.assign(this.canvas.style, {
      position: 'absolute', inset: '0', width: '100%', height: '100%', transform: 'scaleX(-1)',
    });
    this.canvas.width = 160; this.canvas.height = 120;
    this.ctx = this.canvas.getContext('2d');
    this.previewEl.appendChild(this.video);
    this.previewEl.appendChild(this.canvas);
    document.body.appendChild(this.previewEl);
  }

  _render(results) {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!results.landmarks) return;
    for (const hand of results.landmarks) {
      this.ctx.fillStyle = '#F7FFA8';
      this.ctx.strokeStyle = 'rgba(247,255,168,0.55)';
      this.ctx.lineWidth = 1;
      // Draw joints
      hand.forEach(p => {
        this.ctx.beginPath();
        this.ctx.arc(p.x * this.canvas.width, p.y * this.canvas.height, 2.2, 0, Math.PI * 2);
        this.ctx.fill();
      });
      // Draw pinch guideline (thumb-tip 4 → index-tip 8)
      if (hand[4] && hand[8]) {
        this.ctx.beginPath();
        this.ctx.moveTo(hand[4].x * this.canvas.width, hand[4].y * this.canvas.height);
        this.ctx.lineTo(hand[8].x * this.canvas.width, hand[8].y * this.canvas.height);
        this.ctx.stroke();
      }
    }
  }

  _interpret(results) {
    if (!results.landmarks || !results.landmarks.length) {
      this.prevTwoHandDistance = null;
      return;
    }
    const hands = results.landmarks;
    // Broadcast raw landmarks so telepresence peers can render remote hands (viewer.html
    // publishes these as xrai.hands). Compact [x,y,z] arrays keep the DataChannel payload small.
    document.dispatchEvent(new CustomEvent('hands:frame', {
      detail: { hands: hands.map((h) => h.map((p) => [+p.x.toFixed(3), +p.y.toFixed(3), +(p.z || 0).toFixed(3)])) },
    }));
    // Single-hand pinch → click + pointer move
    hands.forEach((hand, i) => {
      const thumb = hand[4];
      const index = hand[8];
      if (!thumb || !index) return;
      const dx = thumb.x - index.x, dy = thumb.y - index.y;
      const dist = Math.hypot(dx, dy);
      // Hysteresis: grip below tight threshold, release only above loose threshold.
      const wasGripped = this.prevPinch[i] === true;
      const pinch = wasGripped ? (dist < PINCH_RELEASE_NORM) : (dist < PINCH_GRIP_NORM);
      // Pointer follows index tip
      document.dispatchEvent(new CustomEvent('hands:pointer-move', {
        detail: { x: 1 - index.x, y: index.y, hand: i },
      }));
      // Rising edge + per-hand cooldown → exactly one click per genuine pinch.
      if (pinch && !wasGripped) {
        const now = performance.now();
        if (now - (this.lastClickAt[i] || 0) >= PINCH_COOLDOWN_MS) {
          this.lastClickAt[i] = now;
          document.dispatchEvent(new CustomEvent('hands:click', {
            detail: { x: 1 - index.x, y: index.y, hand: i },
          }));
        }
      }
      this.prevPinch[i] = pinch;
    });
    // Two-hand spread → zoom
    if (hands.length >= 2) {
      const a = hands[0][8], b = hands[1][8];
      if (a && b) {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (this.prevTwoHandDistance !== null) {
          const delta = d - this.prevTwoHandDistance;
          if (Math.abs(delta) > ZOOM_DEADZONE) {
            document.dispatchEvent(new CustomEvent('hands:zoom', {
              detail: { dir: delta > 0 ? 'out' : 'in', factor: Math.abs(delta) * 5 },
            }));
          }
        }
        this.prevTwoHandDistance = d;
      }
    } else {
      this.prevTwoHandDistance = null;
    }
  }

  async enable() {
    const mode = await this.detectSupport();
    if (mode === 'none') {
      this.showToast('Hand tracking not supported on this device (need desktop webcam or WebXR).', 4500);
      return false;
    }
    this.active = true;
    this.mode = mode;
    if (mode === 'webxr') await this._enableWebXR();
    else await this._enableWebcam();
    this._updateBtn();
    return true;
  }
  disable() {
    this.active = false;
    if (this.rafHandle) cancelAnimationFrame(this.rafHandle);
    if (this.stream) { this.stream.getTracks().forEach(t => t.stop()); this.stream = null; }
    if (this.previewEl) { this.previewEl.remove(); this.previewEl = null; }
    this.mode = 'none';
    this._updateBtn();
    this.showToast('hand tracking off.');
  }
  wireToDOM() {
    this.toggleBtn = document.getElementById('hands-toggle');
    if (!this.toggleBtn) return;
    this.toggleBtn.addEventListener('click', () => {
      if (this.active) this.disable(); else this.enable();
    });
    this._updateBtn();
  }
  _updateBtn() {
    if (!this.toggleBtn) return;
    this.toggleBtn.textContent = this.active ? `hands ${this.mode}` : 'hands';
    this.toggleBtn.classList.toggle('hands-on', this.active);
  }
}
