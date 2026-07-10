# Scale-Template — one authored game → table · sidewalk · urban (auto-generated)

**Operator thesis (2026-07-10):** every game is authored ONCE (from a prompt / image / youtube ref) and
auto-derives three scales with the same goals (find & fly through Portals) and scale-appropriate
presentation. "One being created, the other two generated automatically based on user input."

This is a **cut-code-surface seam**: the game LOGIC is scale-agnostic; only a `ScaleProfile` swaps per
scale. Prototyped in web (this addon); the pure-TS seams graduate UNCHANGED to the **RN 3JS V5** + Unity
composers — only the render layer is per-host.

## Templates in this framework

| # | template | goal | status | spec |
|---|---|---|---|---|
| 1 | **Blades** | fly through Portals you place (cyberpunk racer) | 🟢 built (loop 71/71) | this doc |
| 2 | **Archetype Hunt** | discover generative archetypes in the real world via camera, grow them | 📋 spec | `GAME_TEMPLATE_2_ARCHETYPE_HUNT.md` |

Both ride the SAME `deriveWorld(template, scale)` seam — adding a template = a new goal payload + registry,
not a new engine.

## Seams (pure TS — graduate to jarvis-core / RN / Unity)

| file | role | headless gate |
|---|---|---|
| `src/lib/scale/gameTemplate.ts` | `promptToTemplate` / `sourceToTemplate` → `GameTemplate`; `deriveWorld(template, scale)`; `collectPortals` / `nearestPortal`; `SCALE_PROFILES` | `gameTemplateSelfTest()` — **9/9** |
| `src/lib/scale/cityGen.ts` | audio-reactive city — buildings ARE the frequency bars; `generateCity` · `synthBands` · `buildingHeight` | `cityGenSelfTest()` — **7/7** |
| `src/addons/scale-worlds/ScaleWorldsModule.tsx` | render (web-only): neon city, blade flight, fly-through scoring, generate-your-own composer + walkthrough | e2e §8 (17 checks) |

## The three scales (`SCALE_PROFILES`)

| scale | locomotion | worldRadius | portal presentation | rich features |
|---|---|---|---|---|
| **table** | orbit | 16 | `post` (glowing pillar) | — (the board on your desk, city slides under you) |
| **sidewalk** | walk | 60 | `sign` (neon sign) | neonArrows (arrows guide you to the nearest portal) |
| **urban** | fly | 220 | `hologram-beam` (ring + light beam) | skyBeams · plexWeb · doppler (full Blade-Runner skyline) |

Invariants asserted every run: 3 scales · portal-count preserved across scales · sizes monotonic
(16<60<220) · portal-mode correct per scale · urban-only rich features · deterministic from seed.

## Shipped (this increment — loop 🟢 71/71, streak ×11)

- One template → three auto-derived worlds, switchable live (Table/Sidewalk/Urban).
- Audio-reactive neon city (buildings bounce to `synthBands` spectrum; real `AnalyserNode` swaps in next).
- Portals presented per scale; fly-through scoring (`▶ Start race`) + deterministic `🎯 Collect nearest`.
- Idle orbit preview (no scoring) → race → autopilot (hands-free stub).
- **Generate your own game** composer (prompt / image / youtube) BELOW the game + walkthrough (operator spec).

## Roadmap (honest — NOT yet built)

1. **Real source analysis** — image → palette; YouTube → tempo/skyline keyframes (today: id→seed only).
2. **Real audio** — mic/track `AnalyserNode` → `bands`; procedural instruments (drum machine, arp, theremin via Tone.js).
3. **Per-scale locomotion** — table board-drift, sidewalk ground-lock + neon arrows in-scene, urban free-fly.
4. **Urban visuals** — sky-beams + profile-photo-on-clouds, plex web of vibrating lines, Doppler cues, bloom postFX.
5. **Multiplayer** — LiveKit/BroadcastChannel race (invite friends, most Portals wins) — reuse holo-telepresence seam.
6. **Hands + breath drive** — MediaPipe (already a dep); **horns gesture → turbo** (blur-back + lens-flare pull + music
   speed-up → futuristic sonic-boom shockwave that knocks other players off course).
7. **Graduate** — port `gameTemplate.ts` + `cityGen.ts` into the RN 3JS V5 composer (same modules, web render swapped).

Visual ref to match: `~/Desktop/FINAL_VIDS/City-of-Holograms.mov` (skyline aesthetic).
