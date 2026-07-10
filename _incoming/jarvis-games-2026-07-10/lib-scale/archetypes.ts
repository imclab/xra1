// archetypes.ts — the 16 generative archetypes (the "essences") + recognizer. Pure TS (no three/DOM).
//
// This is the constitution's Generative Essence design law made a registry: each archetype is a TINY RULE
// that unfolds infinite structure (specs/constitution.md:399-405 "author rules, not assets"). The lineage is
// authoritative — Mandelbrot fractals (:368), Wolfram/Conway CA (:362,:370), Penrose→WFC (:362), Perlin
// noise (:358), DNA/morphogenesis (:532). matchByDescriptor + noveltyScore implement the codon resolver's
// two tiers (:701): closed-set match, else open-vocab NEW-discovery (Shannon surprise = −log p, :372).
// Graduates UNCHANGED to jarvis-core + Unity + RN 3JS V5 (only the render layer is per-host).

export type ArchetypeId =
  | "spiral" | "lsystem" | "mandelbrot" | "mandelbulb" | "cellular" | "wfc" | "dna" | "perlin"
  | "voronoi" | "reaction-diffusion" | "attractor" | "boids" | "dendritic" | "hex" | "sierpinski" | "cymatics";

export type GrowKind = "lsystem" | "cellular" | "spiral"; // the 3 grow engines shipped in increment 1

export interface Archetype {
  id: ArchetypeId;
  name: string;
  rule: string;          // the kernel, in one glance
  nature: string[];      // where it appears in nature (≥1)
  city: string[];        // where it appears in the urban environment (≥1)
  essences: string[];    // elemental VFX it erupts through
  anchor: string;        // constitution lineage anchor
  difficulty: number;    // 1 (everywhere) .. 5 (rare)
  growKind: GrowKind;    // which grow engine visualizes it
  sig: [number, number, number, number]; // [turn, branch, tile, chaos] fingerprint for recognition
}

export const ARCHETYPES: Archetype[] = [
  { id: "spiral", name: "Spiral", rule: "r = a·e^(bθ) · φ phyllotaxis 137.5°", nature: ["nautilus shell", "sunflower seeds", "galaxies", "whirlpools"], city: ["spiral staircase", "parking ramp", "drain"], essences: ["water"], anchor: "Mandelbrot self-similarity (:368)", difficulty: 1, growKind: "spiral", sig: [1, 0.1, 0, 0.2] },
  { id: "lsystem", name: "L-system", rule: "rewrite F→F[+F]F[−F]F", nature: ["trees", "ferns", "lungs", "river deltas"], city: ["street trees", "pipe networks", "wall cracks"], essences: ["fire"], anchor: "codelet law (:870)", difficulty: 1, growKind: "lsystem", sig: [0.2, 1, 0.1, 0.1] },
  { id: "mandelbrot", name: "Mandelbrot set", rule: "z → z² + c", nature: ["coastlines", "Romanesco", "snowflakes"], city: ["skylines", "circuit traces"], essences: ["clouds"], anchor: "Mandelbrot (:368)", difficulty: 3, growKind: "spiral", sig: [0.6, 0.6, 0.2, 0.4] },
  { id: "mandelbulb", name: "Mandelbulb", rule: "z → z^n + c in ℝ³", nature: ["coral", "cave formations", "minerals"], city: ["brutalist facades", "ornament"], essences: ["clouds"], anchor: "Mandelbrot extended (:368)", difficulty: 4, growKind: "spiral", sig: [0.6, 0.6, 0.3, 0.4] },
  { id: "cellular", name: "Game of Life", rule: "4 local birth/death rules (B3/S23)", nature: ["shell pigment", "forest-fire spread", "slime mold"], city: ["crowd flow", "traffic waves"], essences: ["sparks"], anchor: "Conway (:370), Wolfram (:362)", difficulty: 2, growKind: "cellular", sig: [0, 0.1, 0.9, 0.5] },
  { id: "wfc", name: "Wave Function Collapse", rule: "local constraints → aperiodic order", nature: ["quasicrystals", "crystal growth"], city: ["floor mosaics", "brick bonds", "block layouts"], essences: ["snow"], anchor: "Penrose (:362)", difficulty: 3, growKind: "cellular", sig: [0, 0.1, 1, 0.2] },
  { id: "dna", name: "DNA / double-helix", rule: "genotype → phenotype", nature: ["DNA", "vines", "seashell coil"], city: ["twisted towers", "helical ramps"], essences: ["water"], anchor: "XRAI = DNA (:532,:572)", difficulty: 3, growKind: "spiral", sig: [0.9, 0.2, 0, 0.1] },
  { id: "perlin", name: "Perlin / flow noise", rule: "gradient noise field", nature: ["terrain", "clouds", "wood grain"], city: ["rust", "worn stone", "graffiti"], essences: ["clouds"], anchor: "Perlin (:358)", difficulty: 2, growKind: "cellular", sig: [0.1, 0.1, 0.3, 0.7] },
  { id: "voronoi", name: "Voronoi / Delaunay", rule: "nearest-seed partition", nature: ["giraffe skin", "cracked mud", "foam", "basalt columns"], city: ["cracked pavement", "coverage maps"], essences: ["sparks"], anchor: "local-rule emergence (:405)", difficulty: 2, growKind: "cellular", sig: [0, 0.1, 0.95, 0.2] },
  { id: "reaction-diffusion", name: "Reaction-diffusion", rule: "activator–inhibitor PDE (Turing)", nature: ["leopard spots", "zebra stripes", "fingerprints"], city: ["rust blooms", "paint crackle", "moss"], essences: ["fire"], anchor: "morphogenesis (:405)", difficulty: 4, growKind: "cellular", sig: [0.1, 0.2, 0.7, 0.6] },
  { id: "attractor", name: "Strange attractor", rule: "chaotic deterministic flow (Lorenz)", nature: ["turbulence", "smoke plumes", "heart rhythm"], city: ["traffic chaos", "crowd turbulence"], essences: ["smoke"], anchor: "Wolfram irreducibility (:362)", difficulty: 5, growKind: "spiral", sig: [0.7, 0.1, 0, 0.9] },
  { id: "boids", name: "Flocking / Boids", rule: "separation · alignment · cohesion", nature: ["murmurations", "fish schools", "ant swarms"], city: ["pedestrian crowds", "drones"], essences: ["fireflies"], anchor: "Minsky Society of Mind (:379)", difficulty: 3, growKind: "cellular", sig: [0.2, 0.1, 0.2, 0.8] },
  { id: "dendritic", name: "Dendritic / DLA", rule: "diffusion-limited aggregation", nature: ["rivers", "lightning", "frost", "neurons"], city: ["power grids", "subway maps", "water mains"], essences: ["lightning"], anchor: "fractal branching (:401)", difficulty: 3, growKind: "lsystem", sig: [0.1, 0.9, 0.2, 0.4] },
  { id: "hex", name: "Hex packing", rule: "optimal tiling / minimal surface", nature: ["honeycomb", "insect eyes", "snowflakes"], city: ["geodesic domes", "chain-link", "tiling"], essences: ["snow"], anchor: "Fuller synergetics (:376)", difficulty: 2, growKind: "cellular", sig: [0, 0, 1, 0] },
  { id: "sierpinski", name: "Self-similarity / Sierpinski", rule: "recursion / strange loop", nature: ["fern", "Romanesco", "lung", "vessels"], city: ["truss towers", "fractal antennas", "nested arches"], essences: ["sparks"], anchor: "Hofstadter (:374)", difficulty: 3, growKind: "lsystem", sig: [0.1, 0.8, 0.4, 0] },
  { id: "cymatics", name: "Wave interference / cymatics", rule: "standing waves", nature: ["ripples", "dunes", "ripple marks"], city: ["moiré facades", "sound barriers"], essences: ["water"], anchor: "Shannon signal (:372)", difficulty: 4, growKind: "cellular", sig: [0.3, 0, 0.6, 0.3] },
];

const BY_ID: Record<string, Archetype> = Object.fromEntries(ARCHETYPES.map((a) => [a.id, a]));
export function getArchetype(id: ArchetypeId): Archetype { return BY_ID[id]; }

// Nearest archetype to a 4-d structural descriptor; dist normalized to 0..1 (max L2 in [0,1]^4 = 2).
export function matchByDescriptor(desc: number[]): { archetype: Archetype; dist: number } {
  let best = ARCHETYPES[0], bd = Infinity;
  for (const a of ARCHETYPES) {
    let s = 0; for (let i = 0; i < 4; i++) { const d = (desc[i] ?? 0) - a.sig[i]; s += d * d; }
    const dist = Math.sqrt(s) / 2;
    if (dist < bd) { bd = dist; best = a; }
  }
  return { archetype: best, dist: bd };
}

// Surprise = −log2(p), p = similarity = 1 − dist. Novel patterns (far from every known archetype) score high.
export function noveltyScore(dist: number): number { const p = Math.min(1, Math.max(1e-6, 1 - dist)); return -Math.log2(p); }

export const NOVELTY_THRESHOLD = 0.55; // dist-to-nearest above this = a NEW discovery (open-vocab)

export interface Recognition { archetypeId: ArchetypeId | null; confidence: number; novel: boolean; dist: number; noveltyBonus: number; }

// Deterministic MockRecognizer — a seeded stand-in for the on-device vision layer so the whole
// recognize→unlock→grow→score loop is gated headless with NO camera. The real MediaPipe recognizer is the
// present-checked next increment. forceNovel drives the "found something not on our list" path.
export function mockRecognize(frameSeed: number, forceNovel = false): Recognition {
  if (forceNovel) { const dist = 0.82; return { archetypeId: null, confidence: 0, novel: true, dist, noveltyBonus: Math.round(noveltyScore(dist) * 4) }; }
  const base = ARCHETYPES[frameSeed % ARCHETYPES.length].sig;
  const desc = base.map((v, i) => v + (((frameSeed * (i + 7)) % 40) / 1000 - 0.02)); // tiny deterministic noise
  const { archetype, dist } = matchByDescriptor(desc);
  const novel = dist > NOVELTY_THRESHOLD;
  return { archetypeId: novel ? null : archetype.id, confidence: Math.max(0, 1 - dist), novel, dist, noveltyBonus: novel ? Math.round(noveltyScore(dist) * 4) : 0 };
}

export function archetypeSelfTest(): { name: string; ok: boolean; detail: string }[] {
  const out: { name: string; ok: boolean; detail: string }[] = [];
  out.push({ name: "count-16", ok: ARCHETYPES.length === 16, detail: `${ARCHETYPES.length}` });
  out.push({ name: "examples-complete", ok: ARCHETYPES.every((a) => a.nature.length >= 1 && a.city.length >= 1 && a.essences.length >= 1), detail: "nature+city+essence each" });
  const m = matchByDescriptor([1, 0.1, 0, 0.2]);
  out.push({ name: "match-nearest", ok: m.archetype.id === "spiral" && m.dist < 0.05, detail: `${m.archetype.id} d=${m.dist.toFixed(3)}` });
  out.push({ name: "match-deterministic", ok: matchByDescriptor([0, 0.1, 0.9, 0.5]).archetype.id === matchByDescriptor([0, 0.1, 0.9, 0.5]).archetype.id, detail: "stable" });
  out.push({ name: "novelty-monotonic", ok: noveltyScore(0.1) < noveltyScore(0.5) && noveltyScore(0.5) < noveltyScore(0.9), detail: `${noveltyScore(0.9).toFixed(2)}` });
  out.push({ name: "novelty-zero-at-match", ok: noveltyScore(0) < 0.01, detail: `${noveltyScore(0).toFixed(3)}` });
  const norm = mockRecognize(3);
  out.push({ name: "mock-matches", ok: norm.archetypeId !== null && !norm.novel, detail: `${norm.archetypeId}` });
  const nov = mockRecognize(3, true);
  out.push({ name: "mock-novel", ok: nov.novel && nov.archetypeId === null && nov.noveltyBonus > 0, detail: `+${nov.noveltyBonus}` });
  return out;
}
