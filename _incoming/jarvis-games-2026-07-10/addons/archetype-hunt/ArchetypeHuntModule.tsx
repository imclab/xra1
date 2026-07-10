// ArchetypeHuntModule.tsx — Game Template #2: hunt the generative archetypes in the real world, grow them.
//
// Point your camera at the world → recognize an archetype (spiral / L-system / Game-of-Life / …) → the object
// ERUPTS into a living procedural system you can grow and REWIRE. Find one NOT on our list → huge discovery
// bonus (Shannon surprise). All logic is pure-TS (archetypes.ts · promptLadder.ts · growSystem.ts, each gated
// headless); this render layer is web-only and graduates to RN 3JS V5 + Unity. Spec: GAME_TEMPLATE_2_ARCHETYPE_HUNT.md.
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { SyncClient } from "../../spatial/SpatialWebpageModule/multiplayer/SyncClient";
import type { SyncState } from "../../spatial/SpatialWebpageModule/multiplayer/SyncState";
import { SCALES, SCALE_PROFILES, type Scale } from "../../lib/scale/gameTemplate";
import { ARCHETYPES, getArchetype, mockRecognize, archetypeSelfTest, type ArchetypeId } from "../../lib/scale/archetypes";
import { promptLadder, promptLadderSelfTest } from "../../lib/scale/promptLadder";
import {
  lsystemExpand, lsystemToSegments, PLANT_RULES, spiralPoints,
  makeLifeSeeded, lifeStep, growSelfTest, type Life,
} from "../../lib/scale/growSystem";
import { OwnershipStamp } from "../provenance/OwnershipStamp";

const archColor = (id: ArchetypeId) => new THREE.Color().setHSL((ARCHETYPES.findIndex((a) => a.id === id) / 16 + 0.55) % 1, 1, 0.6);
const SCALE_MUL: Record<Scale, number> = { table: 1, sidewalk: 1.5, urban: 2.3 };

// ── L-system tree: turtle segments revealed over ~2s; rewire (rule variant) + angle/iters change the plant. ──
function LSystemViz({ id, angle, iters, variant, mul }: { id: ArchetypeId; angle: number; iters: number; variant: number; mul: number }) {
  const grp = useRef<THREE.Group>(null);
  const reveal = useRef(0);
  const { obj, count } = useMemo(() => {
    const str = lsystemExpand("X", PLANT_RULES[variant], iters);
    const segs = lsystemToSegments(str, angle, 1);
    let minX = 1e9, maxX = -1e9, maxY = 1e-6;
    for (const s of segs) { for (const p of [s.a, s.b]) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); maxY = Math.max(maxY, p[1]); } }
    const cx = (minX + maxX) / 2, k = 2.4 / maxY;
    const pos = new Float32Array(segs.length * 6);
    segs.forEach((s, i) => { pos.set([(s.a[0] - cx) * k, s.a[1] * k, 0, (s.b[0] - cx) * k, s.b[1] * k, 0], i * 6); });
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { obj: new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: archColor(id) })), count: segs.length };
  }, [id, angle, iters, variant]);
  useEffect(() => { reveal.current = 0; return () => { obj.geometry.dispose(); (obj.material as THREE.Material).dispose(); }; }, [obj]);
  useFrame((_, dt) => {
    reveal.current = Math.min(1, reveal.current + dt * 0.6);
    obj.geometry.setDrawRange(0, Math.floor(reveal.current * count) * 2);
    if (grp.current) grp.current.rotation.y += dt * 0.15;
  });
  return <group ref={grp} scale={mul} position={[0, -0.2, 0]}><primitive object={obj} /></group>;
}

// ── Game of Life (and the other cellular archetypes): a live grid of neon cells stepping B3/S23. ──
const GRID = 24;
function LifeViz({ id, variant, mul }: { id: ArchetypeId; variant: number; mul: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const life = useRef<Life>(makeLifeSeeded(GRID, GRID, 1));
  const acc = useRef(0);
  const scratch = useRef(new THREE.Matrix4());
  useEffect(() => { life.current = makeLifeSeeded(GRID, GRID, (getArchetype(id).name.charCodeAt(0) + variant * 131) >>> 0); }, [id, variant]);
  useLayoutColor(mesh, archColor(id));
  useFrame((_, dt) => {
    acc.current += dt;
    if (acc.current > 0.22) { acc.current = 0; life.current = lifeStep(life.current); if (lifePop(life.current) < 6) life.current = makeLifeSeeded(GRID, GRID, (Math.floor(performance.now() / 1000) % 997) + 1); }
    const m = mesh.current; if (!m) return;
    const l = life.current, cs = (3.2 / GRID) * mul;
    for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
      const on = l.cells[y * GRID + x] === 1;
      scratch.current.compose(new THREE.Vector3((x - GRID / 2) * cs, (y - GRID / 2) * cs + 1.4, 0), new THREE.Quaternion(), new THREE.Vector3(on ? cs * 0.85 : 0.0001, on ? cs * 0.85 : 0.0001, on ? cs * 0.85 : 0.0001));
      m.setMatrixAt(y * GRID + x, scratch.current);
    }
    m.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={mesh} args={[undefined as any, undefined as any, GRID * GRID]} frustumCulled={false}><boxGeometry args={[1, 1, 1]} /><meshBasicMaterial /></instancedMesh>;
}
function lifePop(l: Life) { let p = 0; for (let i = 0; i < l.cells.length; i++) p += l.cells[i]; return p; }
function useLayoutColor(ref: React.RefObject<THREE.InstancedMesh>, color: THREE.Color) {
  useEffect(() => { const m = ref.current; if (!m) return; for (let i = 0; i < GRID * GRID; i++) m.setColorAt(i, color); if (m.instanceColor) m.instanceColor.needsUpdate = true; }, [ref, color]);
}

// ── Spiral (and mandelbrot/dna/attractor): a logarithmic spiral line, revealed + slowly turning. ──
function SpiralViz({ id, variant, mul }: { id: ArchetypeId; variant: number; mul: number }) {
  const grp = useRef<THREE.Group>(null);
  const reveal = useRef(0);
  const { obj, count } = useMemo(() => {
    const pts = spiralPoints(0.05, 0.14 + variant * 0.05, 260).map(([x, y]) => new THREE.Vector3(x, y + 1.4, 0));
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    return { obj: new THREE.Line(g, new THREE.LineBasicMaterial({ color: archColor(id) })), count: pts.length };
  }, [id, variant]);
  useEffect(() => { reveal.current = 0; return () => { obj.geometry.dispose(); (obj.material as THREE.Material).dispose(); }; }, [obj]);
  useFrame((_, dt) => { reveal.current = Math.min(1, reveal.current + dt * 0.5); obj.geometry.setDrawRange(0, Math.floor(reveal.current * count)); if (grp.current) grp.current.rotation.z += dt * 0.3; });
  return <group ref={grp} scale={mul}><primitive object={obj} /></group>;
}

function SystemScene({ id, angle, iters, variant, scale }: { id: ArchetypeId; angle: number; iters: number; variant: number; scale: Scale }) {
  const kind = getArchetype(id).growKind, mul = SCALE_MUL[scale];
  return (
    <>
      <color attach="background" args={[0x06070d]} />
      <fogExp2 attach="fog" args={[0x06070d, 0.03]} />
      <ambientLight intensity={0.6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}><circleGeometry args={[6, 48]} /><meshBasicMaterial color={archColor(id).clone().multiplyScalar(0.12)} /></mesh>
      {kind === "lsystem" && <LSystemViz id={id} angle={angle} iters={iters} variant={variant} mul={mul} />}
      {kind === "cellular" && <LifeViz id={id} variant={variant} mul={mul} />}
      {kind === "spiral" && <SpiralViz id={id} variant={variant} mul={mul} />}
      <OrbitControls enableDamping enablePan={false} target={[0, 1.2, 0]} />
    </>
  );
}

const btn = { padding: "8px 10px", borderRadius: 10, border: "1px solid #333", background: "#000", color: "#fff", cursor: "pointer", fontSize: 13 } as const;
const on = (a: boolean) => ({ ...btn, background: a ? "#10241a" : "#000", borderColor: a ? "#3bd68a" : "#333" });

export function ArchetypeHuntModule({ userId }: { sync: SyncClient; syncState: SyncState; userId: string }) {
  const [currentId, setCurrentId] = useState<ArchetypeId>("lsystem");
  const [scale, setScale] = useState<Scale>("table");
  const [angle, setAngle] = useState(25);
  const [iters, setIters] = useState(4);
  const [variant, setVariant] = useState(0);
  const [frame, setFrame] = useState(0);
  const [saved, setSaved] = useState<ArchetypeId[]>([]);
  const [score, setScore] = useState(0);
  const [discoveries, setDiscoveries] = useState(0);
  const [msg, setMsg] = useState("point your camera at the world…");
  const [place, setPlace] = useState("the East River");
  const [epoch, setEpoch] = useState(2);

  const aSelf = useMemo(() => archetypeSelfTest(), []);
  const pSelf = useMemo(() => promptLadderSelfTest(), []);
  const gSelf = useMemo(() => growSelfTest(), []);
  const aP = aSelf.filter((c) => c.ok).length, pP = pSelf.filter((c) => c.ok).length, gP = gSelf.filter((c) => c.ok).length;

  const cur = getArchetype(currentId);
  const ladder = useMemo(() => promptLadder(currentId, { placeName: place, epochBucket: epoch, roll: frame }), [currentId, place, epoch, frame]);

  const recognize = () => {
    const f = frame + 1; setFrame(f); const r = mockRecognize(f);
    if (r.novel || !r.archetypeId) { setDiscoveries((d) => d + 1); setScore((s) => s + r.noveltyBonus); setMsg(`🌟 NEW DISCOVERY! +${r.noveltyBonus} — not on our list!`); return; }
    const a = getArchetype(r.archetypeId); const isNew = !saved.includes(a.id);
    setCurrentId(a.id); setMsg(`unlocked ${a.name} · ${(r.confidence * 100) | 0}% — ${a.rule}`);
    if (isNew) { setSaved((prev) => [...prev, a.id]); setScore((x) => x + 1); }
  };
  const findRare = () => { const f = frame + 1; setFrame(f); const r = mockRecognize(f, true); setDiscoveries((d) => d + 1); setScore((s) => s + r.noveltyBonus); setMsg(`🌟 NEW DISCOVERY! +${r.noveltyBonus} — you found one we've never seen!`); };
  const rewire = () => { setVariant((v) => 1 - v); setMsg("🔁 rewired the rule — watch the system change"); };
  const water = () => { setIters((i) => Math.min(6, i + 1)); setMsg("💧 watered — your system grows"); };

  const scaleBtn = (s: Scale) => ({ ...on(scale === s) });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontWeight: 600 }}>🔭 Archetype Hunt <span style={{ opacity: 0.6, fontWeight: 400 }}>· essence safari — find the rules of life & procgen</span></div>

      <div style={{ fontSize: 12 }}>
        archetype self-test: <b style={{ color: aP === aSelf.length ? "#8cff8c" : "#ff6b6b" }}>{aP}/{aSelf.length}</b>
        {"  ·  prompt-ladder self-test: "}<b style={{ color: pP === pSelf.length ? "#8cff8c" : "#ff6b6b" }}>{pP}/{pSelf.length}</b>
        {"  ·  grow self-test: "}<b style={{ color: gP === gSelf.length ? "#8cff8c" : "#ff6b6b" }}>{gP}/{gSelf.length}</b>
      </div>

      <div style={{ fontSize: 12, minHeight: 32 }}>
        <span style={{ color: msg.includes("DISCOVERY") ? "#ffd166" : "#8cff8c" }}>{msg}</span><br />
        <span style={{ opacity: 0.85 }}>archetype: <b>{cur.name}</b> · score: <b style={{ color: "#8cff8c" }}>{score}</b> · discoveries: <b style={{ color: "#ffd166" }}>{discoveries}</b> · systems saved: <b>{saved.length}</b></span>
      </div>

      <div style={{ display: "flex", gap: 6 }}>{SCALES.map((s) => <button key={s} style={scaleBtn(s)} onClick={() => setScale(s)}>{s[0].toUpperCase() + s.slice(1)}</button>)}</div>

      <div style={{ height: 300, borderRadius: 12, overflow: "hidden", border: "1px solid #222", background: "#06070d" }}>
        <Canvas key={`${currentId}:${scale}`} gl={{ antialias: true, powerPreference: "high-performance" }} camera={{ position: [0, 1.6, 5], fov: 50 }}>
          <SystemScene id={currentId} angle={angle} iters={iters} variant={variant} scale={scale} />
        </Canvas>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <button style={{ ...btn, background: "#10241a", borderColor: "#3bd68a" }} onClick={recognize}>🔍 Recognize</button>
        <button style={{ ...btn, background: "#242010", borderColor: "#d6b83b" }} onClick={findRare}>🌟 Find rare one</button>
        <button style={btn} onClick={water}>💧 Water / grow</button>
        <button style={btn} onClick={rewire}>🔁 Rewire rule</button>
        <span style={{ fontSize: 11, opacity: 0.55 }}>angle</span>
        <button style={btn} onClick={() => setAngle((a) => Math.max(8, a - 3))}>−</button>
        <button style={btn} onClick={() => setAngle((a) => Math.min(45, a + 3))}>+</button>
      </div>

      {saved.length > 0 && (
        <div style={{ fontSize: 11, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ opacity: 0.6 }}>your map:</span>
          {saved.map((id) => <button key={id} onClick={() => setCurrentId(id)} style={{ ...btn, padding: "4px 8px", fontSize: 11 }}>{getArchetype(id).name}</button>)}
        </div>
      )}

      {/* prompt-ladder — archetype word = seed → small / medium / large, seeded by place × time */}
      <div style={{ marginTop: 4, padding: 12, borderRadius: 12, border: "1px solid #21402a", background: "#08140b" }}>
        <div style={{ fontWeight: 600, fontSize: 13 }}>🧬 Prompt-ladder <span style={{ opacity: 0.6, fontWeight: 400 }}>· one archetype seed → three scales of prompt</span></div>
        <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center" }}>
          <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="place (e.g. the East River)"
            style={{ flex: 1, minWidth: 120, padding: "6px 8px", borderRadius: 8, border: "1px solid #333", background: "#0a0a12", color: "#fff", fontSize: 12 }} />
          <button style={btn} onClick={() => setEpoch((e) => (e + 1) % 4)}>🕑 {["dawn", "day", "dusk", "night"][epoch]}</button>
        </div>
        <div style={{ fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>
          <div><b style={{ color: "#8cff8c" }}>small:</b> {ladder.small}</div>
          <div><b style={{ color: "#ffd166" }}>medium:</b> {ladder.medium}</div>
          <div><b style={{ color: "#ff9f6b" }}>large:</b> {ladder.large}</div>
        </div>
      </div>

      <div style={{ fontSize: 11, opacity: 0.6 }}>
        The recognizer is a deterministic <b>mock</b> so the recognize→unlock→grow→score loop is gated headless; the real
        on-device <b>MediaPipe</b> camera is the next increment. The archetype registry, prompt-ladder, and grow engines
        are pure TS — they graduate to the <b>RN 3JS V5</b> + Unity composers unchanged. Spec: <b>GAME_TEMPLATE_2_ARCHETYPE_HUNT.md</b>.
      </div>

      <OwnershipStamp userId={userId} asset={{ kind: "archetype-system", archetype: currentId, params: { angle, iters, variant } }} assetId={`arch-${currentId}`} />

      {(aSelf.some((c) => !c.ok) || pSelf.some((c) => !c.ok) || gSelf.some((c) => !c.ok)) && (
        <div style={{ fontSize: 11, color: "#ff6b6b" }}>{[...aSelf, ...pSelf, ...gSelf].filter((c) => !c.ok).map((c) => `🔴 ${c.name}: ${c.detail}`).join(" · ")}</div>
      )}
    </div>
  );
}
