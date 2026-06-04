// room-qr.js
// ─────────────────────────────────────────────────────────────────────────────
// Room invite URL + scan-to-join QR for the xra1 live viewer.
//
// Cherry-picked from the Needle WebRTC sample's room-sharing UX (its shareable
// room link + QR). Reuses the lazy `esm.sh/qrcode` import pattern already used
// by presentations/cvpr2026/index.html — no bundled dependency, and silent
// degradation when offline (caller keeps its copy-link / native-share path).
//
// On Apple Vision Pro, typing a room URL into Safari is painful — a QR the host
// can hold up (or that renders on the live tile) is the easy join path.
// ─────────────────────────────────────────────────────────────────────────────

const QR_CDN = 'https://esm.sh/qrcode@1.5.3';

// Build the canonical room-pointer URL (?room=<id>) from a base. Pure +
// testable. `base` defaults to the current document location when in a browser.
export function buildRoomUrl(roomId, base) {
  const origin = base
    || (typeof location !== 'undefined' ? `${location.origin}${location.pathname}` : 'https://xra1.com/');
  const u = new URL(origin);
  u.searchParams.set('room', roomId);
  return u.toString();
}

// Render a scan-to-join QR for `url` into `el`. Returns true on success,
// false (silent) if offline / the qrcode module is unavailable — callers must
// keep a copy-link fallback. DOM + network, so not unit-tested.
export async function renderRoomQR(el, url, { size = 96 } = {}) {
  if (!el || typeof document === 'undefined') return false;
  try {
    const { default: QRCode } = await import(QR_CDN);
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, url, {
      width: size,
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' },
    });
    el.innerHTML = '';
    el.appendChild(canvas);
    return true;
  } catch {
    return false;
  }
}
