// cityGen.ts — audio-reactive cyberpunk city: the buildings ARE the frequency bars.
//
// Pure TS (no three imports) — it generates the building LAYOUT and computes each building's live height
// from a spectrum, so the skyline "rips in reaction to the music" (the operator's hologram-city.mov
// reference). synthBands() is a deterministic pseudo-spectrum so the reactive logic is gated headless
// every run without a mic (a real AnalyserNode swaps in at the render layer). Graduates to both composers.

import type { ScaleProfile } from "./gameTemplate";

export interface Building { x: number; z: number; w: number; d: number; baseH: number; hue: number; band: number; }

export const NUM_BANDS = 16;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// A grid of buildings scaled to the world radius; density controls how many cells are occupied. Each
// building is assigned a frequency band so the city visibly maps the spectrum left-to-right / by cluster.
export function generateCity(seed: number, profile: ScaleProfile, hue: number, density: number): Building[] {
  const r = rng((seed ^ 0x9e3779b9) >>> 0);
  const R = profile.worldRadius;
  const target = Math.min(600, Math.round(40 + density * 160 * (R / 60)));
  const gridN = Math.max(4, Math.round(Math.sqrt(target)));
  const cell = (R * 2) / gridN;
  const out: Building[] = [];
  for (let gx = 0; gx < gridN; gx++) for (let gz = 0; gz < gridN; gz++) {
    if (r() > density + 0.25) continue; // leave streets between blocks
    const jitter = cell * 0.25;
    const x = -R + gx * cell + cell / 2 + (r() - 0.5) * jitter;
    const z = -R + gz * cell + cell / 2 + (r() - 0.5) * jitter;
    const w = cell * (0.4 + r() * 0.4), d = cell * (0.4 + r() * 0.4);
    const baseH = profile.buildingH * (0.4 + r() * 1.6);
    out.push({ x, z, w, d, baseH, hue: (hue + (r() - 0.5) * 0.12 + 1) % 1, band: Math.floor(r() * NUM_BANDS) });
  }
  return out.length ? out : [{ x: 0, z: 0, w: cell * 0.5, d: cell * 0.5, baseH: profile.buildingH, hue, band: 0 }];
}

// Deterministic pseudo-spectrum — NUM_BANDS values in 0..1. Bass bands (0..2) carry a beat so the low
// city pumps; used headless and as the fallback when no mic is granted.
export function synthBands(t: number, seed = 1): number[] {
  const bands: number[] = [];
  for (let i = 0; i < NUM_BANDS; i++) {
    const f = 0.5 + i * 0.35;
    const v = 0.5 + 0.5 * Math.sin(t * f + i * 1.7 + seed * 0.001);
    const beat = i < 3 ? 0.5 + 0.5 * Math.abs(Math.sin(t * 2.2)) : 1; // bass beat
    bands.push(Math.max(0, Math.min(1, v * beat)));
  }
  return bands;
}

// Live building height under the current spectrum — buildings bounce to their assigned band.
export function buildingHeight(b: Building, bands: number[], gain: number): number {
  const react = bands[b.band] ?? 0;
  return b.baseH * (1 + react * gain);
}

export function cityGenSelfTest(): { name: string; ok: boolean; detail: string }[] {
  const out: { name: string; ok: boolean; detail: string }[] = [];
  const prof = { scale: "sidewalk", worldRadius: 60, buildingH: 6, locomotion: "walk", playerSpeed: 9, portalMode: "sign", audioGain: 1, fogDensity: 0.01, maxPlayers: 8, neonArrows: true, skyBeams: false, plexWeb: false, doppler: false } as ScaleProfile;
  const c1 = generateCity(123, prof, 0.7, 0.6), c2 = generateCity(123, prof, 0.7, 0.6);
  out.push({ name: "city-nonempty", ok: c1.length > 0, detail: `${c1.length} buildings` });
  out.push({ name: "city-deterministic", ok: c1.length === c2.length && c1[0].x === c2[0].x, detail: "same seed→same city" });
  out.push({ name: "within-bounds", ok: c1.every((b) => Math.abs(b.x) <= prof.worldRadius + 5 && Math.abs(b.z) <= prof.worldRadius + 5), detail: "inside radius" });
  const bands = synthBands(1.0);
  out.push({ name: "bands-count", ok: bands.length === NUM_BANDS, detail: `${bands.length}` });
  out.push({ name: "bands-normalized", ok: bands.every((v) => v >= 0 && v <= 1), detail: "0..1" });
  const b0 = c1[0];
  out.push({ name: "reacts-to-music", ok: buildingHeight(b0, bands.map(() => 1), prof.audioGain) > b0.baseH, detail: "taller on beat" });
  out.push({ name: "quiet-is-base", ok: Math.abs(buildingHeight(b0, bands.map(() => 0), prof.audioGain) - b0.baseH) < 1e-9, detail: "base at silence" });
  return out;
}
