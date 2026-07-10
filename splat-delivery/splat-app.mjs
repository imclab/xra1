// XRAI splat-delivery — shared runtime (CDN, no build step).
// Renderer: mkkellogg GaussianSplats3D (WebGL) via esm.sh — fastest vehicle to ship + measure.
// Production may swap to a WebGPU renderer (Spark / three-WebGPU); the API below stays the same.
import * as GS from 'https://esm.sh/@mkkellogg/gaussian-splats-3d@0.4.7';

export const hasWebGPU = typeof navigator !== 'undefined' && !!navigator.gpu;

export function makeViewer(opts = {}) {
  // sharedMemoryForWorkers:false → no COOP/COEP headers needed (works on plain static hosting).
  return new GS.Viewer({ sharedMemoryForWorkers: false, ...opts });
}

// Load a splat and resolve with timing. progressive:true renders a coarse pass first (sub-2s lever).
export async function loadScene(viewer, url, { progressive = true } = {}) {
  const t0 = performance.now();
  await viewer.addSplatScene(url, { showLoadingUI: false, progressiveLoad: progressive });
  const load = Math.round(performance.now() - t0);
  viewer.start();
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      let count = null;
      try { count = viewer.getSplatMesh ? viewer.getSplatMesh().getSplatCount() : null; } catch { /* API varies by version */ }
      resolve({ load, ttff: Math.round(performance.now() - t0), count });
    });
  });
}

// XRAI interchange manifest — wraps a splat + scene metadata per the XRAI format (the moat).
export function xraiManifest({ url, name, splatCount = null, source = 'unknown' }) {
  return {
    xrai: '2.0',
    type: 'scene',
    name: name || 'scene',
    assets: [{
      id: 'splat0',
      kind: 'gaussian-splat',
      src: url,
      format: (String(url).split('.').pop() || '').toLowerCase(),
      splatCount,
    }],
    camera: { up: [0, -1, 0], position: [0, 0, -3], lookAt: [0, 0, 0] },
    provenance: { generator: source },   // created/host stamped server-side at publish time
  };
}

export function viewerBase() {
  return location.origin + location.pathname.replace(/[^/]*$/, '');
}
export function shareLink(splatUrl) {
  return viewerBase() + 'viewer.html?url=' + encodeURIComponent(splatUrl);
}
export function embedSnippet(splatUrl) {
  return `<iframe src="${shareLink(splatUrl)}" width="640" height="420" frameborder="0" allowfullscreen allow="xr-spatial-tracking"></iframe>`;
}
export function isHosted(url) {
  return /^https?:\/\//.test(String(url));   // object: URLs (local files) can't be shared until hosted
}
