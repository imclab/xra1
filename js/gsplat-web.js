// gsplat-web.js — Web Gaussian-splat rendering for XRAI (WEB-05).
//
// Wraps @mkkellogg/gaussian-splats-3d DropInViewer (a THREE.Object3D you add to
// any scene) so the existing render loop drives it. Loads .ply / .splat / .ksplat.
//
// LOD parity with the Unity GsplatLodController: the shared, portable LOD knob on
// web is `sphericalHarmonicsDegree` (0..2). The 4 Unity tiers map to it below
// (Full=2 best … Emergency=0). SH degree is fixed at construction in this lib, so
// setLodTier() remounts at the new degree. (Per-frame splat-shrink, the Unity
// SplatDownscaleFactor, has no direct web equivalent; SH degree + decimated-asset
// swap are the web levers — same strategy as the Unity discrete swapper.)
//
// Cloudflare Pages note: sharedMemoryForWorkers=false because Pages does not send
// COOP/COEP headers, so SharedArrayBuffer is unavailable.

import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

// Unity tier index → sphericalHarmonicsDegree. [Full, Reduced, Low, Emergency].
const TIER_SH = [2, 1, 0, 0];

function clampTier(t) { return Math.max(0, Math.min(3, (t | 0))); }

/**
 * Mount a Gaussian splat into an existing THREE.Object3D (e.g. the placeholder
 * Group produced by the XRAI adapter's object.gsplat case).
 * @returns the DropInViewer (a THREE.Object3D), or null on failure.
 */
export async function mountGsplat(obj, url, THREE, opts = {}) {
  if (!url) { console.warn('[gsplat-web] mountGsplat: no url'); return null; }
  const tier = clampTier(opts.tier ?? 0);
  const viewer = new GaussianSplats3D.DropInViewer({
    sharedMemoryForWorkers: false,
    gpuAcceleratedSort: true,
    sphericalHarmonicsDegree: TIER_SH[tier],
  });
  obj.add(viewer);
  obj.userData = obj.userData || {};
  obj.userData.gsplat = { viewer, url, tier, THREE };
  try {
    await viewer.addSplatScene(url, {
      showLoadingUI: opts.showLoadingUI ?? false,
      splatAlphaRemovalThreshold: opts.splatAlphaRemovalThreshold ?? 5,
    });
  } catch (e) {
    console.error('[gsplat-web] addSplatScene failed:', e);
  }
  return viewer;
}

/**
 * Set the LOD tier (0=Full .. 3=Emergency) — mirrors GsplatLodController.SetTier.
 * Remounts at the tier's SH degree (the lib fixes SH degree at construction).
 */
export async function setLodTier(obj, tier) {
  const st = obj?.userData?.gsplat;
  if (!st) return;
  const t = clampTier(tier);
  if (t === st.tier) return;
  obj.remove(st.viewer);
  try { st.viewer.dispose?.(); } catch (_) {}
  await mountGsplat(obj, st.url, st.THREE, { tier: t });
}

/** Dispose a mounted splat (frees GPU buffers + workers). */
export function disposeGsplat(obj) {
  const st = obj?.userData?.gsplat;
  if (!st) return;
  obj.remove(st.viewer);
  try { st.viewer.dispose?.(); } catch (_) {}
  delete obj.userData.gsplat;
}

export const TIER_TO_SH = TIER_SH.slice();
