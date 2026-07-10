// gameTemplate.ts — ONE authored game → three auto-generated SCALES (table · sidewalk · urban).
//
// The operator's thesis (2026-07-10): every game is authored ONCE (from a prompt / image / youtube ref)
// and auto-derives a tabletop, a sidewalk, and a city-skyline version — same goals (find & fly through
// Portals), scale-appropriate presentation. This is the "cut code surface" seam: the game LOGIC is
// scale-agnostic; only a ScaleProfile (units, locomotion, portal presentation, feature flags) changes
// per scale. Pure TS — no three/DOM imports — so it graduates to jarvis-core + Unity + the RN 3JS V5
// composer UNCHANGED (only the render layer is per-host).

import { hashSeed } from "../procedural/seedKernel";

export type Scale = "table" | "sidewalk" | "urban";
export const SCALES: Scale[] = ["table", "sidewalk", "urban"];

export type PortalMode = "post" | "sign" | "hologram-beam";
export type Locomotion = "orbit" | "walk" | "fly";

export interface ScaleProfile {
  scale: Scale;
  worldRadius: number; // half-extent of the play area, world units (monotonic table<sidewalk<urban)
  buildingH: number;   // base building height unit
  locomotion: Locomotion;
  playerSpeed: number;
  portalMode: PortalMode; // how a Portal is presented at this scale
  audioGain: number;      // how hard buildings react to the music
  fogDensity: number;
  maxPlayers: number;
  // rich presentation flags — urban gets the full Blade-Runner skyline treatment (operator spec)
  neonArrows: boolean; // flashing signs/arrows guiding to the nearest portal (sidewalk+)
  skyBeams: boolean;   // beams of light + profile-photo-on-clouds above the skyline (urban)
  plexWeb: boolean;    // web of fine lines connecting portals, vibrating with the sound (urban)
  doppler: boolean;    // doppler audio cues (urban)
}

// The three scales, tuned so each is a recognizable step up. table = board on your desk; sidewalk =
// you walked into that board; urban = the whole skyline is the board and many players share it.
export const SCALE_PROFILES: Record<Scale, ScaleProfile> = {
  table:    { scale: "table",    worldRadius: 16,  buildingH: 1,  locomotion: "orbit", playerSpeed: 6,  portalMode: "post",          audioGain: 0.6, fogDensity: 0.02,  maxPlayers: 4,  neonArrows: false, skyBeams: false, plexWeb: false, doppler: false },
  sidewalk: { scale: "sidewalk", worldRadius: 60,  buildingH: 6,  locomotion: "walk",  playerSpeed: 9,  portalMode: "sign",          audioGain: 1.0, fogDensity: 0.012, maxPlayers: 8,  neonArrows: true,  skyBeams: false, plexWeb: false, doppler: false },
  urban:    { scale: "urban",    worldRadius: 220, buildingH: 22, locomotion: "fly",   playerSpeed: 24, portalMode: "hologram-beam", audioGain: 1.6, fogDensity: 0.004, maxPlayers: 32, neonArrows: true,  skyBeams: true,  plexWeb: true,  doppler: true  },
};

export interface GameTemplate {
  id: string;
  name: string;
  source: { kind: "prompt" | "image" | "youtube"; ref: string };
  seed: number;
  hue: number;        // base neon palette hue 0..1
  density: number;    // building density 0..1
  portalCount: number;
  goal: string;
}

// Theme keywords bias the palette hue — the ONLY "understanding" of the prompt today (honest: there is
// no LLM in this pure seam; richer image-palette / video-tempo extraction is the present-checked next
// increment, documented in the module UI).
const HUE_WORDS: Record<string, number> = {
  blade: 0.62, cyber: 0.78, neon: 0.85, sunset: 0.06, forest: 0.33, ocean: 0.55,
  fire: 0.02, gold: 0.13, ice: 0.52, violet: 0.8, matrix: 0.33, tokyo: 0.9, vapor: 0.82,
};

export function promptToTemplate(prompt: string, kind: "prompt" | "image" | "youtube" = "prompt"): GameTemplate {
  const ref = (prompt || "").trim() || "cyber blades";
  const seed = hashSeed(ref);
  let hue = ((seed >> 8) & 0xff) / 255;
  const lower = ref.toLowerCase();
  for (const [w, h] of Object.entries(HUE_WORDS)) if (lower.includes(w)) { hue = h; break; }
  const density = 0.35 + ((seed >> 16) & 0xff) / 255 * 0.5;
  const portalCount = 6 + (seed & 0x7); // 6..13
  const name = ref.length > 28 ? ref.slice(0, 28) + "…" : ref;
  return { id: `g${seed.toString(36)}`, name, source: { kind, ref }, seed, hue, density, portalCount, goal: "Find & fly through the most Portals" };
}

// Unify the three input modes. image + youtube hash their IDENTIFIER (filename / URL) to a seed today —
// so a given source is stable and reproducible; extracting the real palette from an image or the tempo
// from a video is the next increment (present-checked in the module, not faked here).
export function sourceToTemplate(kind: "prompt" | "image" | "youtube", ref: string): GameTemplate {
  return promptToTemplate(ref, kind);
}

export interface Portal { id: number; x: number; y: number; z: number; collected: boolean; }
export interface ScaledWorld { template: GameTemplate; profile: ScaleProfile; portals: Portal[]; }

// mulberry32 — deterministic per (seed, scale) so the SAME template yields the SAME three worlds every run.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export function deriveWorld(template: GameTemplate, scale: Scale): ScaledWorld {
  const profile = SCALE_PROFILES[scale];
  const r = rng((template.seed ^ Math.imul(scale.charCodeAt(0), 2654435761)) >>> 0);
  const R = profile.worldRadius;
  const portals: Portal[] = [];
  for (let i = 0; i < template.portalCount; i++) {
    const a = r() * Math.PI * 2;
    const rad = (0.25 + r() * 0.7) * R;
    // fly scales float portals up among the skyline; ground scales keep them reachable at eye height.
    const y = profile.locomotion === "fly" ? (0.4 + r() * 0.9) * profile.buildingH * 4 : profile.buildingH * (0.4 + r() * 0.3);
    portals.push({ id: i, x: Math.cos(a) * rad, y, z: Math.sin(a) * rad, collected: false });
  }
  return { template, profile, portals };
}

// Collect every uncollected portal within `radius` of the player (mutates .collected). Returns hit ids.
export function collectPortals(portals: Portal[], px: number, py: number, pz: number, radius: number): number[] {
  const hit: number[] = [];
  const r2 = radius * radius;
  for (const p of portals) {
    if (p.collected) continue;
    const dx = p.x - px, dy = p.y - py, dz = p.z - pz;
    if (dx * dx + dy * dy + dz * dz <= r2) { p.collected = true; hit.push(p.id); }
  }
  return hit;
}

// Nearest uncollected portal — drives the neon-arrow guide + the hands-free autopilot.
export function nearestPortal(portals: Portal[], px: number, py: number, pz: number): { portal: Portal; dist: number } | null {
  let best: Portal | null = null, bd = Infinity;
  for (const p of portals) {
    if (p.collected) continue;
    const dx = p.x - px, dy = p.y - py, dz = p.z - pz, d = dx * dx + dy * dy + dz * dz;
    if (d < bd) { bd = d; best = p; }
  }
  return best ? { portal: best, dist: Math.sqrt(bd) } : null;
}

export function gameTemplateSelfTest(): { name: string; ok: boolean; detail: string }[] {
  const out: { name: string; ok: boolean; detail: string }[] = [];
  const t = promptToTemplate("cyber blades over neon tokyo");
  out.push({ name: "prompt-deterministic", ok: promptToTemplate("cyber blades over neon tokyo").seed === t.seed, detail: `${t.seed}` });
  out.push({ name: "theme-sensitive", ok: promptToTemplate("neon city").hue !== promptToTemplate("forest run").hue, detail: "hue diverges" });
  out.push({ name: "three-scales", ok: SCALES.length === 3, detail: SCALES.join("/") });
  const wt = deriveWorld(t, "table"), ws = deriveWorld(t, "sidewalk"), wu = deriveWorld(t, "urban");
  out.push({ name: "portal-count-invariant", ok: wt.portals.length === t.portalCount && wu.portals.length === t.portalCount, detail: `${t.portalCount}` });
  out.push({ name: "scale-monotonic", ok: wt.profile.worldRadius < ws.profile.worldRadius && ws.profile.worldRadius < wu.profile.worldRadius, detail: `${wt.profile.worldRadius}<${ws.profile.worldRadius}<${wu.profile.worldRadius}` });
  out.push({ name: "portal-mode-per-scale", ok: wt.profile.portalMode === "post" && wu.profile.portalMode === "hologram-beam", detail: `${wt.profile.portalMode}/${wu.profile.portalMode}` });
  out.push({ name: "urban-rich-features", ok: wu.profile.skyBeams && wu.profile.plexWeb && !wt.profile.skyBeams, detail: "beams+web urban-only" });
  const w2 = deriveWorld(t, "table");
  out.push({ name: "derive-deterministic", ok: w2.portals[0].x === wt.portals[0].x, detail: "same seed→same portals" });
  const w = deriveWorld(t, "table"), p0 = w.portals[0];
  const got = collectPortals(w.portals, p0.x, p0.y, p0.z, 1);
  out.push({ name: "collect-scores", ok: got.length >= 1 && w.portals[0].collected, detail: `${got.length}` });
  return out;
}
