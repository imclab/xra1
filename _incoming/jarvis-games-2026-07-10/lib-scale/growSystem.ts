// growSystem.ts — the "explode into a living system + rewire the rules" engines. Pure TS (no three/DOM).
//
// When an archetype unlocks, the real object erupts into one of THREE grow engines — L-system (trees/branching),
// cellular automata (Game of Life), or spiral. rewiring the rule (edit the production / birth-set / growth
// constant) changes the growth in real-time — the constitution's Bret-Victor law (:353) made literal. All
// deterministic → gated headless; graduates to Unity + RN 3JS V5 unchanged (only rendering is per-host).

// ── L-system (turtle graphics) ──────────────────────────────────────────────────────────────────────
export function lsystemStep(s: string, rules: Record<string, string>): string {
  let out = "";
  for (const ch of s) out += rules[ch] ?? ch;
  return out;
}
export function lsystemExpand(axiom: string, rules: Record<string, string>, iters: number, maxLen = 40000): string {
  let s = axiom;
  for (let i = 0; i < iters; i++) { s = lsystemStep(s, rules); if (s.length > maxLen) break; }
  return s;
}

export interface Seg { a: [number, number, number]; b: [number, number, number]; }
// Interpret an L-system string as 2D turtle segments in the x-y plane (heads +y = grows upward, tree-like).
// F/G draw · +/- turn · [ ] push/pop. Returns one Seg per drawn step.
export function lsystemToSegments(s: string, angleDeg: number, step: number): Seg[] {
  const segs: Seg[] = [];
  let x = 0, y = 0, a = 90; // degrees, 90 = up
  const st: { x: number; y: number; a: number }[] = [];
  const rad = Math.PI / 180;
  for (const ch of s) {
    if (ch === "F" || ch === "G") {
      const nx = x + step * Math.cos(a * rad), ny = y + step * Math.sin(a * rad);
      segs.push({ a: [x, y, 0], b: [nx, ny, 0] }); x = nx; y = ny;
    } else if (ch === "+") a += angleDeg;
    else if (ch === "-") a -= angleDeg;
    else if (ch === "[") st.push({ x, y, a });
    else if (ch === "]") { const p = st.pop(); if (p) { x = p.x; y = p.y; a = p.a; } }
  }
  return segs;
}

// Two rule sets so "rewire the rule" visibly changes the plant.
export const PLANT_RULES: Record<string, string>[] = [
  { X: "F+[[X]-X]-F[-FX]+X", F: "FF" }, // classic fractal plant
  { X: "F[+X]F[-X]+X", F: "FF" },       // sparser variant
];

// ── Cellular automata — Conway's Game of Life (B3/S23), bounded grid ─────────────────────────────────
export interface Life { w: number; h: number; cells: Uint8Array; }
export function makeLife(w: number, h: number, coords: [number, number][] = []): Life {
  const cells = new Uint8Array(w * h);
  for (const [x, y] of coords) if (x >= 0 && x < w && y >= 0 && y < h) cells[y * w + x] = 1;
  return { w, h, cells };
}
export function makeLifeSeeded(w: number, h: number, seed: number): Life {
  const cells = new Uint8Array(w * h);
  let a = (seed ^ 0x9e3779b9) >>> 0;
  for (let i = 0; i < cells.length; i++) { a = (Math.imul(a ^ (a >>> 15), 1 | a) + 0x6d2b79f5) >>> 0; cells[i] = (a & 7) === 0 ? 1 : 0; }
  return { w, h, cells };
}
export function lifeStep(l: Life): Life {
  const { w, h, cells } = l;
  const next = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let n = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue; const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) n += cells[ny * w + nx];
    }
    const alive = cells[y * w + x] === 1;
    next[y * w + x] = (alive ? (n === 2 || n === 3) : n === 3) ? 1 : 0;
  }
  return { w, h, cells: next };
}
export function lifePopulation(l: Life): number { let p = 0; for (let i = 0; i < l.cells.length; i++) p += l.cells[i]; return p; }
function lifeEqual(a: Life, b: Life): boolean { if (a.w !== b.w || a.h !== b.h) return false; for (let i = 0; i < a.cells.length; i++) if (a.cells[i] !== b.cells[i]) return false; return true; }

// ── Spiral (logarithmic) ─────────────────────────────────────────────────────────────────────────────
export function spiralPoints(a: number, b: number, n: number, dTheta = 0.25): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) { const th = i * dTheta, r = a * Math.exp(b * th); pts.push([r * Math.cos(th), r * Math.sin(th)]); }
  return pts;
}

export function growSelfTest(): { name: string; ok: boolean; detail: string }[] {
  const out: { name: string; ok: boolean; detail: string }[] = [];
  out.push({ name: "lsystem-expands", ok: lsystemExpand("F", { F: "FF" }, 3) === "FFFFFFFF", detail: "2^3" });
  out.push({ name: "lsystem-deterministic", ok: lsystemExpand("X", PLANT_RULES[0], 3) === lsystemExpand("X", PLANT_RULES[0], 3), detail: "stable" });
  out.push({ name: "lsystem-rewire", ok: lsystemExpand("X", PLANT_RULES[0], 3) !== lsystemExpand("X", PLANT_RULES[1], 3), detail: "rule edit changes output" });
  const segs = lsystemToSegments(lsystemExpand("X", PLANT_RULES[0], 3), 25, 1);
  out.push({ name: "turtle-segments", ok: segs.length > 2 && segs.every((s) => s.a.every(Number.isFinite) && s.b.every(Number.isFinite)), detail: `${segs.length} segs` });
  // Blinker oscillates with period 2 (vertical → horizontal → vertical), population 3 conserved.
  const b0 = makeLife(5, 5, [[2, 1], [2, 2], [2, 3]]);
  const b1 = lifeStep(b0), b2 = lifeStep(b1);
  out.push({ name: "life-blinker", ok: lifePopulation(b1) === 3 && lifeEqual(b2, b0) && !lifeEqual(b1, b0), detail: "period-2" });
  // Block still-life (B3/S23) is stable.
  const bl = makeLife(4, 4, [[1, 1], [1, 2], [2, 1], [2, 2]]);
  out.push({ name: "life-block", ok: lifeEqual(lifeStep(bl), bl), detail: "still-life" });
  const sp = spiralPoints(0.1, 0.18, 60);
  const r0 = Math.hypot(sp[1][0], sp[1][1]), rN = Math.hypot(sp[59][0], sp[59][1]);
  out.push({ name: "spiral-grows", ok: rN > r0 && sp.length === 60, detail: `r ${r0.toFixed(2)}→${rN.toFixed(2)}` });
  return out;
}
