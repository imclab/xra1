// js/adapters/voxel.js — JS port of unity/Assets/Scripts/XRAI/VoxelGenV1Reader.cs
// ─────────────────────────────────────────────────────────────────────────────
// Input shape:
//   { kind: 'voxel-gen-v1', plan: [{category, type, x, y, z, rotation}, ...] }
//   OR a raw array [{category, type, x, y, z, rotation}, ...]
// Output: XRAI doc with one `object.primitive` (or `object.glb`) entity per
// placement, scaled+rotated to match the Unity Composer ECS path so a single
// xrai doc round-trips between web viewer and Unity.
//
// Mapping mirrors VoxelGenV1Reader.cs CategoryModel + CategoryScale dicts.
// UnitScale 0.05 → world pos = (x, y, z) * 0.05.
// ─────────────────────────────────────────────────────────────────────────────

import { registerAdapter, newScene, entity } from '../xrai-core.js';

const UNIT_SCALE = 0.05;
const HARD_LIMIT = 1500;

// Category → primitive type + optional glb path
const CATEGORY_MODEL = {
  Trees:        { primitive: 'cone',         model: 7 },
  Plants:       { primitive: 'torus',        model: 6 },
  Flowers:      { glb: 'Assets/Models/Flowers.glb', model: 35 },
  Wildgrass:    { primitive: 'plane',        model: 4 },
  Boulders:     { primitive: 'rounded-cube', model: 8 },
  Terrain:      { primitive: 'plane',        model: 4 },
  Cliffs:       { primitive: 'cube',         model: 0 },
  Props:        { primitive: 'cube-doodad',  model: 13 },
  Architecture: { primitive: 'cube',         model: 0 },
};

// Category → default scale (matches CategoryScale dict)
const CATEGORY_SCALE = {
  Terrain:   [16, 0.1, 16],
  Cliffs:    [1, 4, 1],
  Trees:     [1, 1, 1],
  Wildgrass: [0.5, 0.2, 0.5],
};

function _rotYQuat(rotDeg) {
  const half = (rotDeg * Math.PI) / 360;
  return [0, Math.sin(half), 0, Math.cos(half)];
}

function _scaleFor(cat) {
  return CATEGORY_SCALE[cat] || [1, 1, 1];
}

function _entityFor(p, idx) {
  const cat = p.category || 'Props';
  const m = CATEGORY_MODEL[cat] || CATEGORY_MODEL.Props;
  const id = `vox_${idx}`;
  const pos = [p.x * UNIT_SCALE, p.y * UNIT_SCALE, p.z * UNIT_SCALE];
  const quat = _rotYQuat(p.rotation || 0);
  const scl = _scaleFor(cat);
  const type = m.glb ? 'object.glb' : 'object.primitive';
  const params = m.glb
    ? { src: m.glb, category: cat, voxelType: p.type ?? 0 }
    : { primitive: m.primitive, category: cat, voxelType: p.type ?? 0 };
  return entity(id, type, {
    label: `${cat}:${p.type ?? 0}`,
    glyph: '▦',
    group: 'voxel',
    transform: { position: pos, rotation: quat, scale: scl },
    params,
  });
}

registerAdapter('voxel', async (input) => {
  const plan = Array.isArray(input)
    ? input
    : (input?.plan || []);
  const kind = (typeof input === 'object' && !Array.isArray(input) && input?.kind) || 'voxel-gen-v1';

  const doc = newScene({ origin: 'voxel' });
  doc.origin.scene = kind;
  doc.metadata = { kind, count: plan.length, unitScale: UNIT_SCALE };

  const root = entity('vox_root', 'object.group', {
    label: 'Voxel scene', glyph: '▤', group: 'voxel',
    params: { count: plan.length },
  });
  doc.scene.entities.push(root);

  const n = Math.min(plan.length, HARD_LIMIT);
  for (let i = 0; i < n; i++) {
    const p = plan[i];
    if (!p) continue;
    doc.scene.entities.push(_entityFor(p, i));
  }

  return doc;
});

export const VOXEL_CATEGORY_MODEL = CATEGORY_MODEL;
export const VOXEL_CATEGORY_SCALE = CATEGORY_SCALE;
export const VOXEL_UNIT_SCALE = UNIT_SCALE;
