---
title: This Week in XRAI #3 — The Bridge
slug: tw-xrai-03-bridge
date: 2026-05-16
description: RN↔Unity bridge, the part that nobody wants to write twice.
tags: weekly,bridge,unity
---

**Publish:** 2026-05-16 (Friday)
**Register:** voice C (technical)

---

## Hook

Most "open" formats fall apart at the integration boundary — the format is clean, but the bridge between authoring UI and rendering runtime is a JSON blob with no contract. XRAI in Portals goes the other way: **the bridge IS the contract**.

## What's on the other side of `compose_scene`?

Portals runs React Native + Unity-as-library. Every user action — voice command, button tap, paint stroke — becomes a typed bridge message. There are 69 of them.

```ts
// src/types/bridge.ts — single source of truth
interface AddObjectMessage {
  type: 'add_object';
  id: string;
  type_name: 'Cube' | 'Sphere' | 'Cylinder' | ...;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  material?: MaterialPreset;
  // ... typed through
}
```

Three properties emerge from this:

1. **XRAI-shaped on both sides.** Every bridge message is a subset of an XRAI mutation. `add_object` = "append an entity to scene.entities"; `set_animation` = "set entity.animation"; `save_scene` = "export the current XRAI doc"; etc. No translation layer.
2. **Type guards at the edges.** `BridgeRouter.parseMessage()` is hand-rolled (allocation-free in Unity); TS side has `isAddObjectMessage()` discriminators. The 69 types can't silently drift.
3. **The MCP server is the third side of the triangle.** `paint_emit_stroke` and `compose_scene` (in `mcp-server/src/index.ts`) emit the same shapes that RN sends to Unity. Any MCP-compatible agent composes scenes through the same typed contract.

## Why this matters for anyone building an XRAI runtime

If your runtime has a rendering-side API, expose it through the same mental model. `add_entity / update_transform / set_animation / apply_relation / save / load` is the minimum useful surface. Anything more is optimization; anything less loses round-trip.

The [@xrai/threejs-adapter](https://xrai.dev/runtimes/threejs/) ships with exactly this shape: `loadXRAI(doc, THREE, opts)` is the import; `exportXRAI(scene)` preserves unknown fields for round-trip; `opts.on*` callbacks are the equivalent of bridge messages for live updates.

## Worth calling out

- **Silent message drops are banned.** `sendToUnity()` returns `bool` — callers only update local state on success. This prevented a week's worth of "why doesn't the scene update?" bugs in early Portals. Copy the pattern.
- **Every message is logged.** Persistent `bridge_log.txt` on device. When a user reports "I said X and nothing happened," the answer is always in the log.

## Metric of the week

- Conformance runtimes pass count: [N]
- External XRAI docs in the wild (GitHub code search): [N]

## Cross-reference

- Spec 001 unity-rn-bridge (Portals repo)
- `src/types/bridge.ts` + `src/types/bridge.generated.ts`
- RFC 0003 conformance tests — the external equivalent of this type safety

— @jamestunick
