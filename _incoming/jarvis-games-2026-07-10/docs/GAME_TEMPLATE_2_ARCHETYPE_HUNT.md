# Game Template #2 — "Archetype Hunt" (Essence Safari)

**Status:** SPEC (2026-07-10). Second instance of the **scale-template** framework (`SCALE_TEMPLATE.md`).
Same engine as #1 (Blades): one authored game → table/sidewalk/urban auto-derived. What changes is the
**goal** — you don't hunt Portals, you hunt **archetypes**: the generative rules at the heart of both our
procedural-content system *and* life itself. This makes the game magical, scientific, and educational.

> **Doctrine gate (rule #7 — read before building).** This game is the constitution's **Generative Essence
> design law made playable**: "A rich world is not stored or authored — it is *generated* by the shortest
> rule that unfolds it… author rules, not assets… complexity is grown, not placed"
> (`specs/constitution.md:399–405`). The archetypes ARE that lineage: Mandelbrot fractals (`:368`),
> Wolfram/Conway cellular automata (`:362,:370`), Penrose tilings / WFC (`:362`), Perlin noise (`:358`),
> DNA/morphogenesis (`:532,:572`), Powers-of-Ten infinite zoom (Sagan/Eames). The player learns to *see*
> the rule behind the world — "we are blind; with x-ray vision, now we may see."

---

## 🩻 X-ray — the loop at a glance

```
📷 CAMERA on the real world ──▶ recognize pattern ──▶ MATCH an archetype ──▶ 🎇 UNLOCK
  (tree, drain, cloud, wall)      (on-device vision)     (spiral? L-system?)      │
                                        │  no match in our list?                  │
                                        └──▶ 🌟 NEW DISCOVERY (huge bonus)         ▼
                                             surprise = −log p (Shannon)   the object EXPLODES into a
                                                                          living procedural system, anchored
                                                                          on the REAL object (AR), saved to
                                                                          YOUR map as YOUR system —
                                                                          water · grow · customize · REWIRE the rules
                                                                                   │
   archetype word = SEED  ──▶  prompt-ladder (small · medium · large)  ◀───────────┘
   × place × time × randomness      = the table / sidewalk / urban scales
```

**Differs from #1 (Blades):** Blades = fly through Portals you *place*. Archetype Hunt = *discover* the
generative rules already present in the real world through your camera, and grow them. #1 is a racer; #2 is
a naturalist's safari + a procedural sandbox. Both ride the identical scale-template seam.

---

## 1. The full archetype list (the "essences")

Two tiers. **Generative archetypes** = the rules (the game's core targets). **Elemental essences** = the
VFX matter a system erupts into when unlocked (`docs/VFX_ARCHETYPE_CANDIDATES.md` — fire/water/etc.).
Each archetype has a **kernel** (the tiny rule), where it appears in **nature** and in the **city**, and its
**constitution anchor**. This is authoritative — the rules and their real-world signatures are textbook,
not fabricated; each maps to a procedural engine the project already has (SCALE_LADDER §2c: "50+ WFC/procgen
engines" — verify exact reuse at build).

| # | Archetype | Kernel (the rule) | In nature | In the city | Anchor |
|---|---|---|---|---|---|
| 1 | **Spiral** (log / Fibonacci / golden) | `r = a·e^(bθ)` · phyllotaxis 137.5° | nautilus, sunflower, galaxies, hurricanes, whirlpools, fern fiddleheads | spiral stairs, parking ramps, drains, rolled steel | Mandelbrot self-similarity `:368` |
| 2 | **L-system** (Lindenmayer) | rewrite `F→F[+F]F[−F]F` | trees, ferns, algae, veins, lungs, river deltas | street trees, pipe networks, wall cracks | codelet law `:870`; author-rules `:404` |
| 3 | **Fractal / Mandelbrot** | `z → z² + c` | coastlines, mountains, clouds, Romanesco, snowflakes | skylines, antennas, circuit traces | Mandelbrot `:368` |
| 4 | **Mandelbulb** (3D fractal) | `z → z^n + c` in ℝ³ | coral, cave formations, minerals | brutalist facades, ornament | Mandelbrot extended |
| 5 | **Cellular automata / Game of Life** | 4 local birth/death rules | shell pigment (Conus), stripe onset, forest-fire, slime mold | crowd flow, traffic waves, window-light patterns | Conway `:370`, Wolfram `:362` |
| 6 | **Wave Function Collapse / Penrose** | local constraints → aperiodic order | quasicrystals, crystal growth, honeycomb defects | floor mosaics, brick bonds, block layouts | Penrose `:362` |
| 7 | **DNA / double-helix / morphogenesis** | genotype → phenotype | DNA, vines, horns, seashell coil, protein folds | twisted towers, helical ramps | XRAI=DNA `:532,:572` |
| 8 | **Perlin / flow noise** | gradient noise field | terrain, clouds, marble, wood grain, wind | rust, worn stone, graffiti | Perlin `:358` |
| 9 | **Voronoi / Delaunay** | nearest-seed partition | giraffe skin, dragonfly wings, cracked mud, foam, leaf cells, basalt columns | cracked pavement, coverage maps | local-rule emergence `:405` |
| 10 | **Reaction-diffusion (Turing)** | activator–inhibitor PDE | leopard spots, zebra stripes, coral, fingerprints | rust blooms, paint crackle, moss | morphogenesis `:405` |
| 11 | **Strange attractor** (Lorenz) | chaotic deterministic flow | turbulence, smoke plumes, dripping tap, heart rhythm | traffic chaos, crowd turbulence | Wolfram irreducibility `:362` |
| 12 | **Flocking / Boids** | separation·alignment·cohesion | murmurations, fish schools, ant/bee swarms | pedestrian crowds, drones | Minsky Society of Mind `:379` |
| 13 | **Dendritic / DLA branching** | diffusion-limited aggregation | rivers, lightning, frost, neurons, lichen | power grids, subway maps, water mains | fractal branching `:401` |
| 14 | **Hex packing / minimal surface** | optimal tiling / soap film | honeycomb, insect eyes, basalt, snowflakes | geodesic domes, chain-link, tiling | Fuller synergetics `:376` |
| 15 | **Self-similarity / Sierpinski** | recursion / strange loop | fern, Romanesco, lung, vessels | truss towers, fractal antennas, nested arches | Hofstadter `:374` |
| 16 | **Wave interference / cymatics** | standing waves | ripples, dunes, tiger-bush, ripple marks | moiré facades, sound barriers | Shannon signal `:372`; Feynman `:373` |

**Elemental essences (the eruption matter):** fire · water · clouds/mist/smoke · sparks/fireflies · snow ·
lightning (device-safe VFX-Graph pool already exists — `VFX_ARCHETYPE_CANDIDATES.md:15`). When an archetype
unlocks, it *expresses* through one or more of these (a spiral in water → whirlpool; an L-system in fire → a
burning tree).

> **Populating exemplars is a DATA task, not a Claude task.** Each archetype's real-world reference set
> (image-search results per archetype + your **Powers of 10** VR exemplars) is harvested by the standalone
> `ingest/` crawler — **zero Claude tokens in the loop** (project rule, `DATA_SOURCES.md`). The crawler feeds
> the recognizer's prototype embeddings and the story engine's "what to look for next" hints.

---

## 2. Core loop (detailed)

1. **Point** your phone at anything — a tree, a drain, a cloud, a cracked wall, a crowd.
2. **Recognize** on-device (see §5): the vision layer proposes which archetype(s) the pattern matches, with a
   confidence. Point at a tree → "**Spiral** found in the fiddlehead" or "**L-system** in the branching."
3. **Unlock** → the object **explodes with virtual systems and animates**: the real tree sprouts a live
   L-system in AR that grows on top of it, matched to its actual branch structure. *That tree becomes YOUR
   system*, saved to your map.
4. **Grow & customize** — water it, grow it, and **rewire the rules** that dictate how the system grows on the
   real object (change the L-system production rules, the CA birth/death set, the spiral's growth constant).
   This is the constitution's Bret-Victor law (`:353`) made literal: *immediate connection to what you create,
   see every rule change in real-time.*
5. **Learn** — optional image-recognition metadata about the specific object (see §6): the tree's likely
   species, estimated age, what the neighborhood was like when it was likely planted. Magic + science + ed.
6. **Level up** — each saved system levels as you tend it; the hunt gets progressively harder (§4).

---

## 3. The prompt-ladder — archetype word = SEED (the procgen tie-in)

This is the heart: the archetype game is a **front-end onto the procedural-content system**, where prompts
scale from tiny to elaborate — exactly the codon-map / voice→procgen path (`constitution.md:701` Tier-2
"pattern match → nearest codon"). An unlocked archetype word becomes a **seed**, and the system authors
**three prompts of increasing length/complexity — small · medium · large — seeded by the archetype × the
player's place × time × a semi-random roll.** The three prompt sizes ARE the three scales.

**Worked example (operator's, verbatim intent): SEED = `spiral`, CONTEXT = East River, dusk.**

| size → scale | prompt (auto-authored) | what renders |
|---|---|---|
| **small → table** | "small whirlpools spinning at the river's edge" | a few gentle vortices on the tabletop river |
| **medium → sidewalk** | "a huge drain-vortex opens in the middle of the East River" | one massive draining spiral you can walk up to |
| **large → urban** | "a towering water-tornado whips down the East River — lightning forking through its spiral, neon reflections and debris spiraling up its walls, thunder rolling off the skyline" | a full cinematic set-piece across the skyline |

The ladder unifies everything: **prompt length ↔ procedural complexity ↔ scale (table/sidewalk/urban) ↔ the
simple→detailed authoring range** the operator described (from "L-system on that tree" up to the fully
detailed Blade-Runner cityscape of game #1). Small prompts make simple things; huge detailed prompts make the
Blades city. Same generator, different seed length.

**Seed model:** `promptLadder(archetype, {placeName, lat, lng, epochBucket, roll}) → { small, medium, large }`.
Determinism: same (archetype, place, time-bucket, roll) → same three prompts (reproducible, testable). Place
and time are *buckets* (neighborhood + hour-of-day / season) so a location has a stable-but-evolving flavor,
not per-second churn.

---

## 4. Progression & the NEW-DISCOVERY bonus (Shannon surprise made a score)

- **Archetypes are everywhere → start easy.** Level 1 targets are ubiquitous: any tree = L-system; any drain
  or shell = spiral; any cracked wall = Voronoi. Early wins teach the eye.
- **Progressively harder.** Higher levels demand rarer or more-composed archetypes (a *reaction-diffusion* on a
  pufferfish; a *strange attractor* in rising smoke; a *Penrose/WFC* in a specific tiling), or the same
  archetype at a harder scale. The **story engine** (fed by the §1 exemplar data) decides which real cityscape
  or nature item can trigger the next unlock, and routes you toward it with neon arrows (the sidewalk-scale
  guide from #1).
- **🌟 Discover a NEW one → HUGE bonus.** If the recognizer fires on a pattern our list does **not** contain
  (open-vocabulary; see §5), the player is credited with a **discovery** and a large bonus. This is
  **Shannon's law as a reward**: novelty = high surprise = `−log p` = high score (`constitution.md:372`). A
  verified new archetype is **curated into the canonical list** (human/curation gate — §7) and named after its
  discoverer. The list *grows from play* — the game improves the procgen system (the compounding-KB loop,
  `:1016`).

---

## 5. Recognition pipeline (on-device vision)

Reuse the perception stack (the `find-best` visual-intelligence run this session already selected the modular
layer): **MediaPipe Tasks** (already a dep — `@mediapipe/tasks-vision`) for detection/segmentation +
**embedding match** for archetype classification. Two paths, mirroring the constitution's codon resolver
(`:701`):

- **Tier-1 — closed-set classifier:** a small model / prototype-embedding bank maps a crop to one of the 16
  archetypes with confidence. Prototypes come from the §1 exemplar crawl (nature + Powers-of-10).
- **Tier-2 — open-vocabulary fallback:** when no prototype clears threshold, embed the crop and measure its
  **distance to every known archetype**. Far from all = candidate **NEW discovery** (§4). This is exactly the
  "0-latency on-device, open-vocab fallback when no Tier-1 generator hits" the constitution specifies (`:701`).
- **Structural cue, not just pixels:** many archetypes are *geometric* (spiral, branching, Voronoi). A cheap
  structural pass (skeletonize → measure branching angle / turning number / cell-adjacency) disambiguates
  L-system vs spiral vs Voronoi without a heavy model — and is fully testable headless.

**Privacy is load-bearing (honesty gate).** The camera feed is processed **on-device only**; frames are never
uploaded. Testing uses **synthetic / consented imagery only** (project rule — synthetic fixtures always). No
biometric identification of people. This mirrors the med-copilot PHI discipline: the sensitive boundary is
enforced by a test, not a promise.

---

## 6. Object metadata ("tell me about this tree") — clearly an ESTIMATE

Optional enrichment after unlock: species guess (fine-grained classifier), **estimated** age (trunk-diameter
heuristic + species growth rate), and neighborhood-history context ("when this tree was likely planted, this
block was…"). **Every such claim is labeled an estimate with its basis** — never asserted as fact (honesty
gate). History context comes from public/consented datasets via the `ingest/` crawler, not fabricated. This is
a *later* increment; the core loop ships without it.

---

## 7. Scale integration & infinite zoom (reuse, don't rebuild)

- **Same scale-template seam as #1.** `deriveWorld(template, scale)` and `SCALE_PROFILES` (table/sidewalk/urban)
  are reused verbatim; only the *goal payload* differs (archetypes instead of portals). The table version is
  the system on your desk; sidewalk = you walked into it, neon arrows guide you to the next archetype; urban =
  the skyline blooms with everyone's grown systems (beams, plex-web of connections — #1's §roadmap visuals).
- **Powers-of-Ten infinite zoom** is the vertical axis (Sagan/Eames anchor). Point at a tree → **zoom IN** to
  its L-system down to the cellular/DNA scale; **zoom OUT** to see your whole map of grown systems as a
  constellation. This is NOT a new system — it maps onto the existing `SpatialTier` × `LODTier` ladder and the
  membrane-dilation transition already designed in `docs/design/SCALE_LADDER_INFINITE_ZOOM.md` (§3). Reuse it.
- **Relationship graph:** grown systems that share an archetype connect as edges (rainbow light-bridges at
  skyline scale) — the same portal-relationship graph from SCALE_LADDER §3b and #1's plex-web.

---

## 8. What to build — the graduating pure-TS seams

Mirror #1: all logic pure-TS in `src/lib/scale/` (graduates to RN 3JS V5 + Unity unchanged); only render is
per-host. New seams:

| file | role | headless self-test |
|---|---|---|
| `src/lib/scale/archetypes.ts` | the **registry**: 16 archetypes, each `{ id, name, kernel, natureExamples, cityExamples, essences, anchor }`; `matchArchetype(features)`; `noveltyScore(dist)` (−log p) | `archetypeSelfTest()` — count=16, kernels deterministic, novelty monotonic, each has ≥1 nature+city example |
| `src/lib/scale/promptLadder.ts` | `promptLadder(archetype, ctx) → {small,medium,large}`; deterministic from (archetype, place, time-bucket, roll) | `promptLadderSelfTest()` — 3 sizes, len(small)<len(medium)<len(large), deterministic, place/time-sensitive |
| `src/lib/scale/growSystem.ts` | the "explode into a living system + rewire rules" model: `growStep(rules, state)` for L-system / CA / spiral; `rewireRule(...)` | `growSelfTest()` — L-system expands, CA obeys B3/S23, spiral turns, rule-edit changes output |
| `src/lib/scale/gameTemplate.ts` | **REUSE** — add `goalKind: "portal" \| "archetype"` to `GameTemplate` so one seam serves both games | extend existing 9-check self-test |
| recognition adapter | interface `Recognizer { recognize(frame): {archetype, confidence, novel}[] }`; a deterministic **MockRecognizer** (seed→archetype) for headless; MediaPipe impl for device | mock is asserted headless; real camera present-checked |

**Render addon** `src/addons/archetype-hunt/ArchetypeHuntModule.tsx` (web-only): camera panel (or mock frame),
recognize button → unlock animation (the object erupts into the live procedural system via `growSystem`), the
map of saved systems, water/grow/rewire controls, the prompt-ladder viewer (see all three sizes), score +
🌟 discovery bonus. Scale switch (Table/Sidewalk/Urban) reusing #1's control.

---

## 9. First shippable increment (loop-green slice — mirror #1's discipline)

Smallest proof that must go **🟢 in `npm test`** (auto-open + auto-click + self-tests asserted headless):

1. `archetypes.ts` registry + `archetypeSelfTest()` (16/16) — the list is real and gated.
2. `promptLadder.ts` + self-test — the Spiral/East-River ladder reproduces small<medium<large deterministically.
3. `growSystem.ts` + self-test — L-system/CA/spiral actually iterate; a rule edit changes the output.
4. `MockRecognizer` (deterministic: a seed / picked fixture → an archetype + a forced "novel" case) so the
   **recognize → unlock → grow → score** loop is proven with **no camera** headlessly; **real camera
   present-checked** (same rule as #1's model-heavy buttons).
5. `ArchetypeHuntModule` + a **"Hunt"** SidePanel tab; e2e checks: tab, both/all self-tests N/N, scale switch,
   "Recognize" → unlock marker, "score: 1", a forced NEW-discovery → bonus marker, prompt-ladder shows 3 sizes.
6. Do **not** commit into the Portals v4 tree (operator's action).

**Acceptance:** headless proves the pure-TS seams + the mock loop; the module visually shows a real object
(webcam or fixture) erupting into a growing L-system on the Table scale, saved to a map, rule-editable — the
"point at a tree, it explodes into your system" magic, at the smallest honest scale.

---

## 10. Roadmap (honest — NOT in the first slice)

Real MediaPipe recognizer + prototype bank from the `ingest/` crawl · fine-grained species/age metadata (§6,
labeled estimates) · AR anchoring on the real object (Unity/RN device path) · the story engine that routes you
to the next unlock from real cityscape/nature items · multiplayer discovery race + shared canonical-list growth
· Powers-of-Ten zoom transitions (reuse SCALE_LADDER §3) · elemental-essence VFX eruption (reuse the device-safe
VFX pool) · curation gate + naming for verified new discoveries.

**Graduation:** `archetypes.ts` + `promptLadder.ts` + `growSystem.ts` port to the RN 3JS V5 + Unity composers
unchanged — the whole point of the shared seam (`SCALE_TEMPLATE.md`).
