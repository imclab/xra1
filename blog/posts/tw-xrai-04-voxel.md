---
title: This Week in XRAI #4 — Voxels and the Volumetric Path
slug: tw-xrai-04-voxel
date: 2026-05-23
description: Where representation tier T·10+ stops being theory and starts being a render.
tags: weekly,voxel,t-ladder
---

**Publish:** 2026-05-23 (Friday)
**Register:** voice B (manifesto-flavored, technical backbone)

---

## Hook

"Create a forest world around me." That command in an XRAI-authoring agent should not produce a megabyte of tree geometry. It should produce *a rule* — a seed — that the runtime expands into a forest at load time.

This is the core bet: **XRAI ships the rules, not the pixels**.

## How a parametric scene compresses

The Portals paint module ships four parametric creators today — spiral, sphere, lsystem, tree. Each takes an anchor + params + a seed. Expanded at load time into a stroke or world patch. The XRAI fragment looks like:

```json
{
  "type": "object.parametric-stroke",
  "components": [{
    "type": "paint.parametric",
    "props": {
      "creator": "spiral",
      "seed": 42,
      "anchor": {"x": 0, "y": 0, "z": -1},
      "params": {"turns": 3, "radius": 0.5},
      "brushGuid": "neon_blue"
    }
  }]
}
```

That's ~200 bytes. The expanded stroke is ~30 KB of points when rendered. Ratio: 150:1.

Voxel-world spec 023 pushes this further: biome recipes as JSON, expanded into 3D worlds by deterministic generators. Spec 022 (universal-asset-io) reads the same pattern for federated assets — the XRAI doc references a seed + a provider, not the glTF bytes.

## Why it matters for the open substrate

If XRAI were full geometry, every scene would be the size of a game level. Sparse-seed format:

- **Human-readable.** You can write a forest in 20 lines.
- **LLM-authorable.** The rule surface is small enough for a model to compose without hallucinating coordinates.
- **Streamable.** Generators expand lazily; large worlds don't need a download gate.
- **Remixable.** Change the seed → get a variant. Change a param → get a branch. "Across possibilities" zoom becomes cheap.
- **Editable across sessions.** The seed is stable; re-opening a scene regenerates the same forest. Until you change the params — then you have a new branch.

## The gap we'll fix in v1.2

Today the generators are Portals-runtime-specific. The XRAI_generators extension is spec'd in `specs/XRAI_FORMAT_SPECIFICATION_V2.md § 7` and covered by `specs/023-voxel-world-generator/` — but there's no published normative generator library. Version 1.2 target: ship a reference generator set (spiral, sphere, lsystem, tree, forest, city-block) as a separate spec so any runtime can match Portals' expansion behavior deterministically.

## Metric of the week

- Sparse-seed scenes authored this week (`object.parametric-stroke` or `XRAI_generators.*`): [N]

## Cross-reference

- Portals Spec 023 voxel-world-generator
- `unity/Assets/Scripts/Paint/Parametric/` — SphereCreator / SpiralCreator / LSystemCreator
- `mcp-server/src/index.ts` `paint_emit_parametric` tool

— @jamestunick
