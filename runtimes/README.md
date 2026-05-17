# XRAI runtime adapters

One XRAI document. Many renderers. Each adapter ingests the same v1.0 JSON and produces engine-native scene.

## Current / planned

| Engine | Directory | Status | Target |
|---|---|---|---|
| **Three.js** | `threejs/` | ⏳ stub | **Week 2** (primary web demo, simplest to validate spec) |
| **PlayCanvas** | `playcanvas/` | ⏳ stub | Week 2 (shares JS ecosystem w/ Three.js) |
| **Unity** | `unity/` | ✅ reference in Portals app, standalone extraction Week 3 | Week 3 |
| **WebXR** | `webxr/` | ⏳ stub (thin glue over Three.js) | Week 3 |
| **Unreal** | `unreal/` | ⏳ stub | Month 2 |
| **visionOS RealityKit** | `visionos/` | ⏳ stub | Month 2 |
| **Godot** | `godot/` (not yet) | — | Community-welcomed |
| **Bevy** | `bevy/` (not yet) | — | Community-welcomed |

## Live ESM adapters (hub-loadable, no build)

These ship the `mount(host, scene, ctx)` contract and load directly into `runtimes/_hub.html` via dynamic ESM import. No engine-native parse — they consume bus events + `scene.entities[]` and render with CDN libs.

| Adapter | Directory | Renders |
|---|---|---|
| **echarts** | `echarts/` | force graph |
| **remix** | `remix/` | document remix |
| **shader** | `shader/` | shader playground |
| **_ar-needle** | `_ar-needle/` | AR (Needle engine) |
| **xrai** | `xrai/` | reference XRAI viewer |
| **gesture** | `gesture/` | gesture playground |
| **forest** | `forest/` | forest scene |
| **geo-map** | `geo-map/` | MapLibre + persistent pins + cross-tab sync ([README](geo-map/README.md)) |
| **geo-ar** | `geo-ar/` | phone-camera AR companion to geo-map ([README](geo-ar/README.md)) |
| **jarvis** | `jarvis/` | node-graph wire editor (reads `ctx.registry`, emits `hub.swap`) |

Persistence convention for adapters that hold user state: `localStorage` key `xrai.<adapter>.<resource>.v1` + `BroadcastChannel('xrai.<resource>')` for cross-tab sync. See `geo-map/adapter.js` for the canonical pattern.

## Normative contract (every runtime MUST implement)

```
parse(doc: string | object) -> XraiGraph | ParseError
  // Validate against v1.0 schema. Throw or return structured error. Never silently corrupt.

buildScene(graph: XraiGraph) -> EngineNativeScene
  // Entities + relations + transforms applied. Returns engine's scene root type.

(optional) mergeInto(existingScene, graph: XraiGraph) -> EngineNativeScene
  // Apply changeset to existing scene. Idempotent by entity id.
```

## Conformance tests (shared across all runtimes)

A conformance-test corpus lives at `runtimes/_conformance/` (planned):
- Each test = `{input.xrai.json, expected_scene_description.yaml}`
- Every runtime's CI runs the corpus
- Runtime passes if scene description matches expected (within tolerance)

This guarantees XRAI documents are truly portable across engines.

## How to contribute a new runtime

1. Read [`../SPEC.md`](../SPEC.md) v1.0
2. Copy a stub directory (e.g., `threejs/`) as starting point
3. Implement `parse()` + `buildScene()`
4. Run conformance tests
5. PR with runtime + sample project + MIT license
6. BDFL-merged (Year 1); community-merged (Year 2+)

## Handedness / unit conventions (MUST read before implementing)

XRAI canonical convention:
- **Meters** (not cm, not inches)
- **Left-handed Y-up** (Unity native — arbitrary but fixed)
- **Rotations as quaternions** `[x, y, z, w]` (not Euler)

Your engine's native convention may differ. **Convert once in `parse()`**, not scattered through the builder. Detect via `graph.origin.handedness` hint; default to left-handed Y-up.

Examples:
- Three.js / PlayCanvas / RealityKit / Godot: right-handed Y-up → negate z on ingest
- Unreal: left-handed Z-up + centimeters → swap Y↔Z + multiply 100
- Bevy: right-handed Y-up, meters → negate z
