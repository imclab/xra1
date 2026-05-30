// js/procgen/cascade.js — Zero-latency cascade scheduler (spec 036).
// ONE pure ESM module, shared by: web viewer, visual test, AND (same logic) the
// RN/Unity bridge path. No platform deps. Emits an XRAI graph (entities + relations)
// ordered lightest-first / rising-wow into tiers. Unity + three.js are thin decoders.
//
// Pipeline (all OUTSIDE Unity): prompt → classify (archetypes.json) → buildCascade →
// XRAI doc + ordered tier batches → loadXRAI(THREE) [web] OR bridge→ProcGenBridgeHandler [Unity].

import { entity, relation, newScene } from '../xrai-core.js';

export const TIERS = ['ground-sky', 'primitives-ambience', 'detail-imports', 'hero'];
const TIER_OF = { ground: 0, sky: 0, primitive: 1, vfx: 1, sound: 1, icosa: 2, lod: 2, hero: 3 };
const WEIGHT  = { ground: 1, sky: 2, sound: 3, primitive: 3, vfx: 5, icosa: 40, lod: 10, hero: 100 };
const WOW     = { ground: 0, sky: 1, sound: 2, primitive: 2, vfx: 4, icosa: 6, lod: 5, hero: 10 };
export const tierOf = (k) => TIER_OF[k] ?? 1;
const weight = (e) => e.weight ?? WEIGHT[e.kind] ?? 5;
const wow    = (e) => e.wow ?? WOW[e.kind] ?? 3;

// archetype.primitive → Unity bridge modelId (BridgeTarget.add_object / VoxelGenV1Reader CategoryModel):
// 0=cube 1=sphere 2=capsule 3=cylinder 4=plane 5=quad 6=torus 7=cone 8=rounded-cube.
// So the SAME XRAI doc spawns the right shape via add_object → SpawnObjectAsync (no Unity-side guess).
const MODEL_ID = { cube: 0, sphere: 1, capsule: 2, cylinder: 3, plane: 4, quad: 5, torus: 6, cone: 7, 'rounded-cube': 8 };
export const modelIdFor = (primitive) => MODEL_ID[primitive] ?? 0;

// Relations = the "magic" wiring (ontology RFC 0004). reacts-to-audio on VFX,
// tracks on hand-attractor hero, parent-of for tier grouping.
function relationsFor(e, rootId) {
  const r = [];
  if (rootId) r.push(relation(rootId, e.id, 'parent-of'));
  if (e.kind === 'vfx') r.push(relation(e.id, 'audio.global', 'reacts-to-audio', { bass_gain: 1.0 }));
  if (e.tracksHand) r.push(relation(e.id, 'hand.right', 'tracks'));
  return r;
}

// Order: tier ↑, then weight ↑ (lightest first), then wow ↑, then id (stable + deterministic).
export function planCascade(elements, { memoryBudget = Infinity } = {}) {
  const sorted = [...elements].sort((a, b) =>
    tierOf(a.kind) - tierOf(b.kind) ||
    weight(a) - weight(b) ||
    wow(a) - wow(b) ||
    String(a.id).localeCompare(String(b.id)));
  let spent = 0; const ordered = [], deferred = [];
  for (const e of sorted) {                       // memory-gate the heavy hero; never crash, defer
    if (spent + weight(e) > memoryBudget) { deferred.push(e); continue; }
    spent += weight(e); ordered.push(e);
  }
  return { ordered, deferred, weight: spent };
}

// Hero picker — exactly ONE, by prompt keyword (spec 036 §3 T3). Falls back to volumetric shader.
const HEROES = [
  { rx: /galaxy|cosmos|nebula|stars/i, id: 'hero_galaxy',    label: 'VFX galaxy',      type: 'object.particles', vfx: 'sparkle',   tracksHand: true },
  { rx: /castle|fortress|keep/i,       id: 'hero_castle',    label: 'voxel castle',    type: 'object.voxel',     gen: 'struct.wfc' },
  { rx: /city|cityscape|metropolis/i,  id: 'hero_city',      label: 'VFX cityscape',   type: 'object.voxel',     gen: 'struct.wfc.city' },
  { rx: /planet|orbit|solar/i,         id: 'hero_planets',   label: 'orbiting planets',type: 'object.primitive', tracksHand: true },
  { rx: /lightning|storm|thunder/i,    id: 'hero_lightning', label: 'VFX lightning',   type: 'object.particles', vfx: 'lightning' },
];
const DEFAULT_HERO = { id: 'hero_volumetric', label: 'volumetric shader', type: 'object.shader' };

// Build the cascade element list from a prompt using the REAL archetype classifier.
// `classify` is injected (the production js/intent/local.js#classifySync) — no mocks.
export function composeWorld(prompt, { classify }, { seed = 1 } = {}) {
  const night = /night|dark|spooky|moon|midnight/i.test(prompt);
  const els = [];

  // T0 — ground + sky (instant, lightweight)
  els.push({ id: 'ground', kind: 'ground', entity: entity('ground', 'object.primitive', {
    model_id: MODEL_ID.cube,            // flattened cube slab
    transform: { position: [0, -0.5, 0], rotation: [0, 0, 0, 1], scale: [20, 0.1, 20] },
    material: { color: night ? '#243024' : '#3a5f3a', preset: 'ground' },
    params: { texture: /water|ocean|lake/i.test(prompt) ? 'water' : /stone|rock|desert/i.test(prompt) ? 'stone' : 'grass' } }) });
  els.push({ id: 'sky', kind: 'sky', entity: entity('sky', 'object.primitive', {
    model_id: MODEL_ID.sphere,          // inverted skysphere
    transform: { position: [0, 0, 0], rotation: [0, 0, 0, 1], scale: [100, 100, 100] },
    material: { color: night ? '#0a0a23' : '#87ceeb', preset: 'skysphere' },
    params: { skysphere: night ? 'night' : 'day' } }) });

  // T1 — centerpiece archetype (real classifier) + its VFX + ambience + sound
  const hit = classify(prompt);
  const a = hit?.archetype;
  if (a) {
    const name = a.match?.[0] || 'thing';
    els.push({ id: `arch_${name}`, kind: 'primitive', archetype: a, entity: entity(`arch_${name}`, 'object.primitive', {
      model_id: modelIdFor(a.primitive),
      transform: { position: [0, 0.4, -2], rotation: [0, 0, 0, 1], scale: a.scale || [1, 1, 1] },
      material: { color: a.color || '#ffffff' },
      params: { archetype: name, primitive: a.primitive, vfx: a.vfx, motion: a.motion } }) });
    if (a.vfx && a.vfx !== 'none') {
      els.push({ id: `vfx_${name}`, kind: 'vfx', entity: entity(`vfx_${name}`, 'object.particles', {
        transform: { position: [0, 0.7, -2], rotation: [0, 0, 0, 1], scale: [1, 1, 1] },
        params: { effect: a.vfx, template: 'Hand_Fire', spawnRate: 64 } }) });
    }
  }
  // base ambience (always — the "alive" feel): mist + fireflies
  els.push({ id: 'amb_mist', kind: 'vfx', entity: entity('amb_mist', 'object.particles', {
    transform: { position: [0, 0.2, -2], scale: [6, 1, 6] }, params: { effect: 'mist', spawnRate: 32 } }) });
  els.push({ id: 'amb_fireflies', kind: 'vfx', entity: entity('amb_fireflies', 'object.particles', {
    transform: { position: [0, 1, -2], scale: [5, 3, 5] }, params: { effect: 'fireflies', spawnRate: 24 } }) });
  // point sound
  els.push({ id: 'snd_ambient', kind: 'sound', entity: entity('snd_ambient', 'object.emitter', {
    transform: { position: [0, 0.5, -2] },
    params: { sound: night ? 'spooky' : 'birdsong', spatial: true } }) });

  // T3 — exactly ONE hero
  const h = HEROES.find((x) => x.rx.test(prompt)) || DEFAULT_HERO;
  els.push({ id: h.id, kind: 'hero', tracksHand: !!h.tracksHand, entity: entity(h.id, h.type, {
    ...(h.type === 'object.primitive' ? { model_id: MODEL_ID.sphere } : {}),
    transform: { position: [0, 2.5, -3], rotation: [0, 0, 0, 1], scale: [2, 2, 2] },
    params: { label: h.label, ...(h.vfx ? { effect: h.vfx } : {}), ...(h.gen ? { generator: h.gen } : {}), seed } }) });

  return els;
}

// Full build: prompt → ordered XRAI doc (save/share/Unity) + per-tier batches (cascade animation).
export function buildCascade(prompt, deps, opts = {}) {
  const els = composeWorld(prompt, deps, opts);
  const { ordered, deferred } = planCascade(els, opts);

  const doc = newScene({ origin: 'portals-cascade' });
  doc.origin.scene = prompt.slice(0, 64);
  doc.metadata = { prompt, seed: opts.seed ?? 1, tiers: TIERS, deferred: deferred.map((e) => e.id) };

  const batches = [];
  for (let t = 0; t < TIERS.length; t++) {
    const tierEls = ordered.filter((e) => tierOf(e.kind) === t);
    if (!tierEls.length) continue;
    const rootId = `tier_${TIERS[t]}`;
    const ents = [entity(rootId, 'object.group', { label: TIERS[t], group: 'cascade', params: { tier: t } })];
    const rels = [];
    for (const e of tierEls) { ents.push(e.entity); rels.push(...relationsFor(e, rootId)); }
    doc.scene.entities.push(...ents);
    doc.scene.relations.push(...rels);
    batches.push({ tier: t, tierName: TIERS[t], entities: ents, relations: rels });
  }
  return { doc, batches, deferred };
}
