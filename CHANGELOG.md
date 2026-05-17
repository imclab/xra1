# Changelog

All notable changes to the XRAI spec + reference implementations.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning follows [Semantic Versioning](https://semver.org/): MAJOR.MINOR.PATCH. Breaking spec changes → MAJOR. New primitives or optional fields → MINOR. Docs / typo / clarifications → PATCH.

## [Unreleased]

### Hub + hands + geo persistence — 2026-05-17

- **Hub registry exposure** (`runtimes/_hub.html`): generic adapter loader now passes `registry` through `ctx` and subscribes to `bus.on('hub.swap', id)`. Jarvis node-graph adapter can read available runtimes and request a hot-swap mount via the bus. Commit `f1632c4`.
- **Hands-web double-pinch fix** (`js/hands-web.js`): replaced single threshold + naive rising-edge with hysteresis (`PINCH_GRIP_NORM=0.035` / `PINCH_RELEASE_NORM=0.060`) plus per-hand 280ms cooldown gate. Exactly one `hands:click` per genuine pinch; two-hand simultaneous pinch still fires two clicks (one per hand, intended). Commit `a379c10`.
- **Geo pin persistence + cross-tab sync** (`runtimes/geo-map/adapter.js`, `runtimes/geo-ar/adapter.js`): pins now survive reload via `localStorage` (key `xrai.geo.pins.v1`) and propagate live across tabs/windows via `BroadcastChannel('xrai.geo.pins')`. Wire format `{ kind: 'add'|'remove'|'move', ... }`. `fromBus=true` flag short-circuits re-emit to prevent loops. Zero infra, ships immediately on push. Commit `d9b70d1`.

### Site — public preview refresh — 2026-04-30

- **Topnav**: surface `agent` (jarvis.html), `conf` (LiveKit hologram demo), `runtimes` (RUNTIMES.md scoreboard) — three buried pages now first-class.
- **New pages live** on `imclab.github.io/xra1/`: `landing`, `dev`, `priorities`, `replay`, `conf`, plus 4 runtime stubs (`runtimes/{echarts,icosa,needle,playcanvas}/viewer.html`).
- **Examples**: 10 new XRAI fixtures (05–14 + INDEX.xrai.json).
- **RFCs**: 6 new (0004 relation types, 0009 stream ingestion, 0010 archetypes, 0011 blueprints, 0012 decoder contract, 0013 master ontology).
- **JS modules**: 13 new (auth, gemini, jarvis, kb-browser, memory-sync, sessions-connector, stack-inspector, trace, xray-graph, dimension-morph, essence-distiller, perceptual-frame, reticle).
- **Data privacy**: `data/*.json` snapshots replaced with sanitized public stubs (no session content, no internal priorities, no KB index). Real telemetry stays in the private monorepo only.
- **Hygiene**: removed two `../../../` path-escapes (`jarvis.html` arch-cards) and one in `priorities.html`.
- Spec content (SPEC.md, MANIFESTO.md, etc.) unchanged — still v1.0.0.

### Planned for v1.1
- Event primitives beyond stub (temporal scheduling, triggers, reaction chains).
- Conformance suite (`runtimes/_conformance/`) with minimum viable pass bar.
- Three.js + PlayCanvas reference adapters (alpha).
- MCP server tool surface finalized (`mcp-server/`).

### Planned for v1.2
- visionOS + Unreal reference adapters.
- Federated query (`xrai-fed://`).
- Signed graphs (author attestation, optional).

---

## [1.0.0] — 2026-04-29

First public release. Extracted from the Portals codebase (h3m.ai) as shipped on the CVPR 2026 camera-ready (2026-04-10).

### Added
- Top-level schema: `xrai_version`, `id`, `author`, `scene`, `relations`, `events` (stub).
- Entity primitives: `cube`, `sphere`, `cylinder`, `capsule`, `plane`, `glb`, `hologram`, `light`, `emitter`.
- Relation types: `parent-of`, `wire-binds`, `reacts-to-audio`, `tracks`.
- URI scheme: `xrai://<uuid>/node/<id>`.
- MIME type: `application/vnd.xrai+json`.
- Minimal example scene in `SPEC.md §Examples`.
- LLM authoring guidance in `MANIFESTO.md`.
- 10 design principles.
- BDFL governance (Year 1), transition-to-foundation criteria documented.
- MIT license for spec text, reference implementations, and prompt libraries. CC0 for the normative JSON schema.

### Known gaps
- Event primitives are a stub. Temporal scheduling + triggers ship in 1.1.
- Reference runtimes beyond Portals (Unity) are README-only. Three.js + PlayCanvas adapters are week-2 deliverables.
- No standalone validator CLI yet. Conformance tests ship with 1.1.
- `demos/jarvis_demos.md` scripts are documented but videos are not yet recorded.

### Out of scope for v1
- Physics simulation semantics (engine-defined).
- Rendering quality or LOD hints (renderer-defined).
- Multiplayer sync protocol (separate spec, planned).
- Rights + monetization layer (intentionally absent — spec is neutral).

---

## How to read this changelog

- **[Unreleased]** shows what's in flight. No guarantees until versioned.
- Each release section is frozen once tagged. Fixes applied post-release go to the next version.
- Breaking changes are called out explicitly. Migration notes live at `docs/migrations/<from>-<to>.md`.

If you depend on XRAI and a change would break you, file an issue before we tag — we'd rather know.
