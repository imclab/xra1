// xr-session.js
// ─────────────────────────────────────────────────────────────────────────────
// WebXR session bootstrap for the xra1 live viewer — enter/exit immersive
// sessions with a capability-driven mode pick.
//
// Cherry-picked pattern from the Needle WebRTC sample (its enter-XR session
// toggle), adapted to our LiveKit transport and the Apple Vision Pro reality:
// visionOS Safari grants `immersive-vr` ONLY — AR passthrough is NOT available
// via WebXR (Apple restriction). We do not UA-sniff for this; capability
// detection surfaces it naturally (`isSessionSupported('immersive-ar')` is
// false on AVP Safari, `immersive-vr` is true). See runtimes/webxr/README.md.
//
// Pure-ish + injectable: every entry point accepts an optional `xr` so it is
// unit-testable without a headset (see tests/smoke-xr-session.mjs).
// ─────────────────────────────────────────────────────────────────────────────

function getXR(xr) {
  if (xr) return xr;
  return (typeof navigator !== 'undefined' && navigator.xr) || null;
}

// Probe immersive support. Returns { available, ar, vr } — never throws.
export async function detectXR(xr) {
  const x = getXR(xr);
  if (!x || typeof x.isSessionSupported !== 'function') {
    return { available: false, ar: false, vr: false };
  }
  const [ar, vr] = await Promise.all([
    Promise.resolve().then(() => x.isSessionSupported('immersive-ar')).catch(() => false),
    Promise.resolve().then(() => x.isSessionSupported('immersive-vr')).catch(() => false),
  ]);
  return { available: true, ar: !!ar, vr: !!vr };
}

// Choose the richest supported mode. AR > VR > none.
// On AVP Safari this lands on 'immersive-vr' (AR unsupported) — by design.
export function pickMode(caps) {
  if (!caps || !caps.available) return null;
  if (caps.ar) return 'immersive-ar';
  if (caps.vr) return 'immersive-vr';
  return null;
}

function defaultInit(mode) {
  return mode === 'immersive-ar'
    ? { requiredFeatures: ['local-floor'], optionalFeatures: ['hit-test', 'light-estimation'] }
    : { requiredFeatures: ['local-floor'] };
}

let _active = null;

// Enter an immersive session. If `mode` is omitted, picks the best supported.
// `onSession(session, mode)` is where the caller wires its render loop
// (three.js renderer.xr.setSession etc.) — out of scope for this helper.
export async function enterXR({ mode, xr, onSession, sessionInit } = {}) {
  const x = getXR(xr);
  if (!x || typeof x.requestSession !== 'function') throw new Error('WebXR unavailable');
  let m = mode || pickMode(await detectXR(x));
  if (!m) throw new Error('no immersive WebXR mode supported on this device');
  const session = await x.requestSession(m, sessionInit || defaultInit(m));
  _active = { session, mode: m };
  if (typeof session.addEventListener === 'function') {
    session.addEventListener('end', () => { if (_active && _active.session === session) _active = null; });
  }
  if (typeof onSession === 'function') await onSession(session, m);
  return { session, mode: m };
}

export async function exitXR() {
  if (!_active) return false;
  const s = _active.session;
  _active = null;
  try { await s.end(); } catch {}
  return true;
}

export function activeXR() { return _active; }

// Optional DOM convenience: wire a button to enter/exit + reflect support.
// Hides the button when no immersive mode is available (e.g. desktop Chrome
// without a headset, or iOS Safari with WebXR disabled).
export async function wireXRToggle(btnId, opts = {}) {
  if (typeof document === 'undefined') return null;
  const btn = document.getElementById(btnId);
  if (!btn) return null;
  const caps = await detectXR(opts.xr);
  const mode = pickMode(caps);
  if (!mode) { btn.style.display = 'none'; return null; }
  btn.textContent = mode === 'immersive-ar' ? 'enter ar' : 'enter vr';
  btn.addEventListener('click', async () => {
    try {
      if (activeXR()) { await exitXR(); btn.textContent = mode === 'immersive-ar' ? 'enter ar' : 'enter vr'; }
      else { await enterXR({ mode, xr: opts.xr, onSession: opts.onSession }); btn.textContent = 'exit xr'; }
    } catch (e) {
      (opts.showToast || console.warn)(`xr · ${e.message || 'session failed'}`);
    }
  });
  return { mode, caps };
}
