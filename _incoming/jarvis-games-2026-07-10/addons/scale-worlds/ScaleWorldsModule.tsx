// ScaleWorldsModule.tsx — the Blade racer as a SCALE-TEMPLATE studio (operator spec 2026-07-10).
//
// TOP  = the cyber-blade game rendered at the selected scale (table · sidewalk · urban) — an audio-
//        reactive neon city whose buildings ARE the frequency bars, with Portals you fly through to score.
// BELOW = "Generate your own game" from a prompt / image / youtube ref, + a basic walkthrough.
// One authored GameTemplate auto-derives all THREE scales (gameTemplate.ts) — that pure-TS seam + the
// audio-reactive cityGen.ts are what graduate UNCHANGED to the RN 3JS V5 + Unity composers; only this
// render layer is per-host. The two seams are gated headless by self-tests (asserted every e2e run).
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { SyncClient } from "../../spatial/SpatialWebpageModule/multiplayer/SyncClient";
import type { SyncState } from "../../spatial/SpatialWebpageModule/multiplayer/SyncState";
import {
  SCALES, deriveWorld, sourceToTemplate, collectPortals, nearestPortal, gameTemplateSelfTest,
  type Scale, type GameTemplate, type ScaledWorld, type Portal,
} from "../../lib/scale/gameTemplate";
import { generateCity, synthBands, buildingHeight, cityGenSelfTest, type Building } from "../../lib/scale/cityGen";
import { OwnershipStamp } from "../provenance/OwnershipStamp";

const hueColor = (h: number, l = 0.55) => new THREE.Color().setHSL(h, 1, l);

// ── Portals — presented per scale: post (table) · neon sign (sidewalk) · hologram-beam (urban). ─────
function PortalObj({ portal, world }: { portal: Portal; world: ScaledWorld }) {
  const ring = useRef<THREE.Mesh>(null);
  const grp = useRef<THREE.Group>(null);
  const mode = world.profile.portalMode;
  const r = Math.max(0.7, world.profile.worldRadius * 0.03);
  const col = useMemo(() => hueColor((world.template.hue + 0.5) % 1, 0.6), [world.template.hue]);
  useFrame((_, dt) => {
    if (ring.current) ring.current.rotation.z += dt * 1.2;
    if (grp.current) { const s = portal.collected ? 0.25 : 1; grp.current.scale.setScalar(grp.current.scale.x + (s - grp.current.scale.x) * Math.min(1, dt * 6)); }
  });
  return (
    <group ref={grp} position={[portal.x, portal.y, portal.z]}>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r, r * 0.16, 12, 32]} />
        <meshBasicMaterial color={col} transparent opacity={portal.collected ? 0.25 : 0.95} />
      </mesh>
      {mode === "post" && (
        <mesh position={[0, -portal.y / 2, 0]}><cylinderGeometry args={[r * 0.08, r * 0.08, portal.y, 6]} /><meshBasicMaterial color={col} transparent opacity={0.5} /></mesh>
      )}
      {mode === "sign" && (
        <mesh position={[0, r * 1.4, 0]}><boxGeometry args={[r * 1.6, r * 0.5, r * 0.1]} /><meshBasicMaterial color={hueColor(world.template.hue, 0.6)} /></mesh>
      )}
      {mode === "hologram-beam" && (
        <mesh position={[0, world.profile.worldRadius * 0.6, 0]}><cylinderGeometry args={[r * 0.25, r * 0.05, world.profile.worldRadius * 1.2, 8, 1, true]} /><meshBasicMaterial color={col} transparent opacity={0.14} side={THREE.DoubleSide} /></mesh>
      )}
    </group>
  );
}

// ── The city + flight camera. Buildings are instanced neon bars driven by the spectrum every frame. ──
function GameScene({ world, playingRef, autopilotRef, onCollect, onNearest }:
  { world: ScaledWorld; playingRef: React.MutableRefObject<boolean>; autopilotRef: React.MutableRefObject<boolean>;
    onCollect: (n: number) => void; onNearest: (dist: number | null) => void }) {
  const { camera } = useThree();
  const prof = world.profile;
  const inst = useRef<THREE.InstancedMesh>(null);
  const buildings = useMemo<Building[]>(() => generateCity(world.template.seed, prof, world.template.hue, world.template.density), [world]);
  const keys = useRef<Set<string>>(new Set());
  const cam = useRef({ pos: new THREE.Vector3(), yaw: 0, pitch: 0 });
  const clock = useRef(0);
  const nearAcc = useRef(0);
  const scratch = useRef(new THREE.Matrix4());
  const collectR = Math.max(1, prof.worldRadius * 0.06);

  useLayoutEffect(() => {
    // camera start: look inward toward the portal cluster; height by scale (board view→walk→fly-over).
    const c = cam.current;
    c.pos.set(0, prof.locomotion === "walk" ? prof.buildingH * 0.9 : prof.buildingH * (prof.locomotion === "fly" ? 3 : 4), prof.worldRadius * 0.65);
    c.yaw = 0; c.pitch = prof.locomotion === "walk" ? -0.05 : prof.locomotion === "fly" ? -0.15 : -0.5;
    // neon color per building (instanceColor → glowing bars, no lighting needed = headless-robust).
    const m = inst.current; if (!m) return;
    buildings.forEach((b, i) => m.setColorAt(i, hueColor(b.hue, 0.5)));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [buildings, prof]);

  useEffect(() => {
    const dn = (e: KeyboardEvent) => keys.current.add(e.key.toLowerCase());
    const up = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", dn); window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", dn); window.removeEventListener("keyup", up); };
  }, []);

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05); clock.current += dt;
    const bands = synthBands(clock.current, world.template.seed & 0xffff);

    // buildings bounce to their band — the skyline "rips to the music".
    const m = inst.current;
    if (m) {
      for (let i = 0; i < buildings.length; i++) {
        const b = buildings[i], h = buildingHeight(b, bands, prof.audioGain);
        scratch.current.compose(new THREE.Vector3(b.x, h / 2, b.z), new THREE.Quaternion(), new THREE.Vector3(b.w, h, b.d));
        m.setMatrixAt(i, scratch.current);
      }
      m.instanceMatrix.needsUpdate = true;
    }

    // camera: idle → gentle orbit preview (no scoring); playing → forward flight + fly-through scoring.
    const c = cam.current, k = keys.current;
    if (!playingRef.current) {
      c.yaw += dt * 0.15;
      const rad = prof.worldRadius * 0.65;
      c.pos.set(Math.sin(c.yaw) * rad, c.pos.y, Math.cos(c.yaw) * rad);
      camera.position.copy(c.pos); camera.lookAt(0, prof.buildingH, 0);
    } else {
      const near = nearestPortal(world.portals, c.pos.x, c.pos.y, c.pos.z);
      if (autopilotRef.current && near) {
        const p = near.portal, tx = p.x - c.pos.x, tz = p.z - c.pos.z;
        c.yaw += (Math.atan2(tx, -tz) - c.yaw) * Math.min(1, dt * 2);
        c.pitch += (Math.atan2(p.y - c.pos.y, Math.hypot(tx, tz)) - c.pitch) * Math.min(1, dt * 2);
      } else {
        if (k.has("arrowleft") || k.has("a")) c.yaw -= 1.4 * dt;
        if (k.has("arrowright") || k.has("d")) c.yaw += 1.4 * dt;
        if (k.has("arrowup")) c.pitch = Math.min(1.2, c.pitch + 1.1 * dt);
        if (k.has("arrowdown")) c.pitch = Math.max(-1.2, c.pitch - 1.1 * dt);
      }
      const fwd = new THREE.Vector3(Math.sin(c.yaw) * Math.cos(c.pitch), Math.sin(c.pitch), -Math.cos(c.yaw) * Math.cos(c.pitch));
      c.pos.addScaledVector(fwd, prof.playerSpeed * dt * (k.has("shift") ? 2 : 1)); // constant forward drift (glider feel)
      camera.position.copy(c.pos); camera.lookAt(c.pos.clone().add(fwd));
      const hits = collectPortals(world.portals, c.pos.x, c.pos.y, c.pos.z, collectR);
      if (hits.length) onCollect(hits.length);
    }

    nearAcc.current += dt;
    if (nearAcc.current > 0.2) { nearAcc.current = 0; const n = nearestPortal(world.portals, camera.position.x, camera.position.y, camera.position.z); onNearest(n ? n.dist : null); }
  });

  return (
    <>
      <fogExp2 attach="fog" args={[0x05030a, prof.fogDensity]} />
      <color attach="background" args={[0x05030a]} />
      <ambientLight intensity={0.4} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[prof.worldRadius * 3, prof.worldRadius * 3]} />
        <meshBasicMaterial color={hueColor(world.template.hue, 0.06)} />
      </mesh>
      <instancedMesh ref={inst} args={[undefined as any, undefined as any, buildings.length]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial />
      </instancedMesh>
      {world.portals.map((p) => <PortalObj key={p.id} portal={p} world={world} />)}
    </>
  );
}

const btn = { padding: "8px 10px", borderRadius: 10, border: "1px solid #333", background: "#000", color: "#fff", cursor: "pointer", fontSize: 13 } as const;
const sBtn = (on: boolean) => ({ ...btn, background: on ? "#1a1030" : "#000", borderColor: on ? "#6b3bd6" : "#333" });

export function ScaleWorldsModule({ userId }: { sync: SyncClient; syncState: SyncState; userId: string }) {
  const [template, setTemplate] = useState<GameTemplate>(() => sourceToTemplate("prompt", "cyber blades over neon tokyo"));
  const [scale, setScale] = useState<Scale>("table");
  const [score, setScore] = useState(0);
  const [near, setNear] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [autopilot, setAutopilot] = useState(false);
  const [mode, setMode] = useState<"prompt" | "image" | "youtube">("prompt");
  const [input, setInput] = useState("");
  const playingRef = useRef(playing); playingRef.current = playing;
  const autopilotRef = useRef(autopilot); autopilotRef.current = autopilot;

  const world = useMemo<ScaledWorld>(() => deriveWorld(template, scale), [template, scale]);
  useEffect(() => { setScore(0); setPlaying(false); }, [template, scale]); // fresh world → reset run

  const tSelf = useMemo(() => gameTemplateSelfTest(), []);
  const cSelf = useMemo(() => cityGenSelfTest(), []);
  const tPass = tSelf.filter((c) => c.ok).length, cPass = cSelf.filter((c) => c.ok).length;

  // Collect EXACTLY the nearest uncollected portal (deterministic +1) — the manual/tapped counterpart to fly-through.
  const collectNearest = () => { const n = nearestPortal(world.portals, 0, world.profile.buildingH, 0); if (!n) return; n.portal.collected = true; setScore((s) => s + 1); };
  const generate = () => { const ref = input.trim() || (mode === "prompt" ? "cyber blades over neon tokyo" : mode === "youtube" ? "https://youtu.be/demo" : "hologram-city.mov"); setTemplate(sourceToTemplate(mode, ref)); };

  const left = world.portals.length - score;
  const modeHint = mode === "prompt" ? "e.g. “neon tokyo blade race at dusk”" : mode === "youtube" ? "paste a YouTube URL (skyline / music video)" : "image filename or URL (a cityscape)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontWeight: 600 }}>🏍 Blades <span style={{ opacity: 0.6, fontWeight: 400 }}>· scale-world racer + game generator</span></div>

      <div style={{ fontSize: 12 }}>
        template self-test: <b style={{ color: tPass === tSelf.length ? "#8cff8c" : "#ff6b6b" }}>{tPass}/{tSelf.length}</b>
        {"  ·  city self-test: "}<b style={{ color: cPass === cSelf.length ? "#8cff8c" : "#ff6b6b" }}>{cPass}/{cSelf.length}</b>
        <br />
        <span style={{ opacity: 0.85 }}>game: <b>{template.name}</b> · mode: <b>{world.profile.portalMode}</b> · score: <b style={{ color: "#8cff8c" }}>{score}</b> · {left} left
        {near != null && <> · <span style={{ color: world.profile.neonArrows ? "#ffd166" : "#888" }}>→ nearest {near.toFixed(0)}u</span></>}</span>
      </div>

      {/* scale switch — ONE game, three auto-generated scales */}
      <div style={{ display: "flex", gap: 6 }}>
        {SCALES.map((s) => (
          <button key={s} style={sBtn(scale === s)} onClick={() => setScale(s)}>{s[0].toUpperCase() + s.slice(1)}</button>
        ))}
      </div>

      <div style={{ height: 300, borderRadius: 12, overflow: "hidden", border: "1px solid #222", background: "#05030a" }}>
        <Canvas key={`${template.id}:${scale}`} gl={{ antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 6, 20], fov: 70, near: 0.1, far: world.profile.worldRadius * 6 }}>
          <GameScene world={world} playingRef={playingRef} autopilotRef={autopilotRef} onCollect={(n) => setScore((s) => s + n)} onNearest={setNear} />
        </Canvas>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <button style={sBtn(playing)} onClick={() => setPlaying((p) => !p)}>{playing ? "⏸ Pause" : "▶ Start race"}</button>
        <button style={sBtn(autopilot)} onClick={() => setAutopilot((a) => !a)}>🖐 Autopilot</button>
        <button style={btn} onClick={collectNearest}>🎯 Collect nearest</button>
        <span style={{ fontSize: 11, opacity: 0.6 }}>WASD/arrows steer · Shift boost · fly through a Portal to score</span>
      </div>

      {/* ── Generate your own game (BELOW the game, per operator spec) ─────────────────────────────── */}
      <div style={{ marginTop: 4, padding: 12, borderRadius: 12, border: "1px solid #2a2140", background: "#0b0814" }}>
        <div style={{ fontWeight: 600, fontSize: 13 }}>✨ Generate your own game</div>
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          {(["prompt", "image", "youtube"] as const).map((mo) => (
            <button key={mo} style={sBtn(mode === mo)} onClick={() => { setMode(mo); setInput(""); }}>{mo[0].toUpperCase() + mo.slice(1)}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && generate()} placeholder={modeHint}
            style={{ flex: 1, minWidth: 120, padding: "7px 9px", borderRadius: 8, border: "1px solid #333", background: "#0a0a12", color: "#fff", fontSize: 12 }} />
          <button style={{ ...btn, background: "#1a1030", borderColor: "#6b3bd6" }} onClick={generate}>✨ Generate game</button>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, opacity: 0.9 }}>
          <div style={{ fontWeight: 600 }}>📖 How to make your own game</div>
          <ol style={{ margin: "6px 0 0", paddingLeft: 18, lineHeight: 1.5 }}>
            <li>Pick a source: a <b>prompt</b>, an <b>image</b> of a cityscape, or a <b>YouTube</b> skyline/music video.</li>
            <li>Type your idea (or paste the URL) and hit <b>✨ Generate game</b> — this authors ONE game template.</li>
            <li>The engine auto-generates all three scales — switch <b>Table / Sidewalk / Urban</b> above to inhabit each.</li>
            <li>Hit <b>▶ Start race</b> and fly your blade through the Portals to score (or 🖐 Autopilot for hands-free).</li>
          </ol>
        </div>

        <div style={{ marginTop: 8, fontSize: 11, opacity: 0.6 }}>
          Today the source only seeds the world (deterministic id → seed). Extracting the real <b>palette from an image</b> and
          the <b>tempo/skyline from a video</b> is the next increment. The template + audio-reactive city seams are pure TS —
          they graduate to the <b>RN 3JS V5</b> + Unity composers unchanged (only this render layer is web-specific).
        </div>
      </div>

      <OwnershipStamp userId={userId} asset={{ kind: "blades-game", template: { id: template.id, name: template.name, seed: template.seed, source: template.source } }} assetId={template.id} />

      {(tSelf.some((c) => !c.ok) || cSelf.some((c) => !c.ok)) && (
        <div style={{ fontSize: 11, color: "#ff6b6b" }}>{[...tSelf, ...cSelf].filter((c) => !c.ok).map((c) => `🔴 ${c.name}: ${c.detail}`).join(" · ")}</div>
      )}
    </div>
  );
}
