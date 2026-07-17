# System capability comparison — detailed comparison matrix

SSOT for what the **Portals / XRAI** system can do, per surface, with honest verification status.
Companion to the [CVPR 2026 Workshop paper](#PORTALS_PROOF) (*Persistent, Editable 4D Spatial World Models on Edge Devices*) and to [SPEC.md](SPEC.md) (XRAI v1.0), [RUNTIMES.md](RUNTIMES.md), and [VISION.md](VISION.md).

**Legend:** ✅ verified on that surface (evidence linked) · 🔨 built, verification in progress · ⏳ planned · — n/a.
No cell is marked ✅ without a run on that surface against real media or shipping code. Every metric below cites its source.

---

## 1 · System capabilities × surface

| Capability | iOS app | Unity hub | Web | visionOS | Source |
|---|---|---|---|---|---|
| Voice / gesture → 4D scene authoring (XRAI pipeline) | ✅ | 🔨 | ✅ | ⏳ | voice → LLM → `batch_execute` pipeline (site + app) |
| Persistent, **editable** 4D scene state (re-open · mutate · version) | ✅ | 🔨 | ✅ | ⏳ | paper §4D state; XRAI doc round-trips on any runtime |
| On-device / edge runtime — no cloud required | ✅ 360+ VFX @ **60 FPS** (iPhone 14 Pro), **2.7–4.1× speedup** vs baseline | 🔨 | 🔨 | ⏳ | CVPR 2026 paper |
| Encode **anything** → XRAI (12 adapters shipped) | ✅ | ✅ | ✅ | ✅ | adapters: Wikipedia · GitHub · arXiv · calendars · commit history · any webpage |
| Decode **on anything** (one file, every renderer) | ✅ | ✅ | ✅ | 🔨 | 3d-force-graph · ECharts GL (WebGPU) · PlayCanvas · Needle · Icosa · Three.js · Portals iOS · Unity WebView |
| Live pipeline editor — swap modules live (`.pipeline.json`) | ⏳ | 🔨 | ✅ | ⏳ | 2D node editor on site + Unity WebView tab |
| Provenance / X-ray (cost · model · lineage per action) | 🔨 | 🔨 | 🔨 | ⏳ | Sight Triad constitution — [VISION.md](VISION.md) |
| Open schema · reference code | ✅ CC0 schema · MIT code | ✅ | ✅ | ✅ | MIT · CC0 · no CLA — [MANIFESTO.md](MANIFESTO.md) |

## 2 · Live perception ("what am I looking at / how fast is that")

Sourced from the internal Visual-Perception Capabilities Matrix SSOT (verified 2026-07-15; Mac pipeline `~/.agents/tools/video-analysis/`). Ship-license note: the Mac speed pipeline uses ultralytics YOLO (**AGPL-3.0**) for internal analysis only; shippable perception layer is **MediaPipe Tasks (Apache-2.0)** / exported ONNX via Sentis/onnxruntime.

| Capability | Mac (tools) | Composer (iOS/Unity) | Web | Method |
|---|---|---|---|---|
| Person detection + multi-object tracking | ✅ | ⏳ (ARKit-ready) | 🔨 coco-ssd | YOLO11s + ByteTrack |
| Real-world speed from monocular video | ✅ (Forrest 10.2 mph) | ⏳ | 🔨 | bbox-height px→m + gap-aware segments |
| Projectile / trajectory (ball flight) | ✅ golf-verified (945 frames, 120 trajectories) | ⏳ (Apple ships `VNDetectTrajectoriesRequest`) | ⏳ | Vision framework (native) |
| Body / pose / 52 face blendshapes | ✅ (Vision) | 🔨 (ARKit body + face) | ⏳ | ARHumanBodyManager / ARFaceManager |
| Scene mesh · depth · plane · occlusion | — | 🔨 (ARFoundation 6.3.4 + LiDAR, wire per-scene) | ⏳ | AROcclusionManager / ARMeshManager |
| Holographic video conference (RGB+D) | — | 🔨 (Metavido building blocks in composer) | ⏳ | Metavido → VFX hologram + peer session |

## 3 · Approach differences (architectural — not benchmarks)

How the XRAI/Portals *approach* differs from conventional 3D-generation and metaverse platforms. These are design-stance facts, not performance claims.

| Dimension | XRAI / Portals | Conventional one-shot 3D-gen / closed metaverse |
|---|---|---|
| Scene lifecycle | Persistent, editable 4D state — re-open, mutate, re-version | One-shot generation → static output |
| Authoring modality | Voice · gesture · predictive, agentic swarm | Manual DCC tooling, or a single text prompt |
| Runtime target | On-device edge (iPhone, 60 FPS) | Cloud render / high-end GPU dependency |
| Portability | One `.xrai` file decodes on 9+ renderers | Engine-locked / proprietary format |
| Openness | Schema CC0, reference code MIT, no CLA | Proprietary, closed schema |
| Provenance | X-ray of cost / model / lineage per action | Opaque black box |

---

## Sources & provenance

- **Paper metrics** (60 FPS, 360+ VFX, 2.7–4.1× speedup, iPhone 14 Pro): *Portals — Persistent, Editable 4D Spatial World Models on Edge Devices*, CVPR 2026 Workshop on 4D World Models (submitted 2026-04-10). See [CITATION.cff](CITATION.cff).
- **Adapters / renderers / licensing**: this site's own module hub ([configs.html](configs.html)), [RUNTIMES.md](RUNTIMES.md), [SPEC.md](SPEC.md), [MANIFESTO.md](MANIFESTO.md).
- **Perception rows**: internal Visual-Perception Capabilities Matrix (evidence-linked, 2026-07-15) — Mac runs against real media; ⏳/🔨 cells are honest gaps, not shipped claims.

*A cell flips to ✅ only with a verified run on that surface. Corrections welcome via issue/PR.*
