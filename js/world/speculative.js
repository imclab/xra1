// js/world/speculative.js — optimistic spawn → commit/replace.
//
// Flow:
//   1. voice/stream.js emits intent:partial as the user speaks.
//   2. We classify each partial via js/intent/local.js (zero-LLM, ~1ms).
//   3. First partial with confidence ≥0.6 → spawn a PROXY entity now.
//      Proxy = primitive/scale/color/vfx/motion from archetype table.
//      bus emits `spawn:proxy` with the XRAI entity fragment.
//   4. voice/stream.js emits intent:final once user stops.
//      • Same archetype as proxy → emit `spawn:commit` (proxy upgraded in place).
//      • Different archetype → emit `spawn:replace` (cross-fade swap).
//      • No archetype match → emit `spawn:replace` w/ fallback OR hand off to cloud LLM.
//   5. Each commit/replace writes to memory (js/memory/index.js).
//
// The renderer (callers can subscribe to bus) reads the entity fragment
// directly. We do NOT touch three.js here — separation of concerns.

import { on, emit } from './bus.js';
import { classify, classifySync, loadArchetypes, getFallback } from '../intent/local.js';
import { classifyMeta } from '../intent/meta.js';
import { entity, uuid } from '../xrai-core.js';
import { rememberSpawn } from '../memory/index.js';

// Per-turn state: turnId → { proxyId, archetype, mods, transcript }
const _turns = new Map();
let _currentSceneId = null;
let _enabled = false;

export function setSceneId(id) { _currentSceneId = id; }
export function getSceneId() { return _currentSceneId; }

function buildEntity({ archetype, mods, fallback = false }) {
  const base = archetype || getFallback();
  const id = `e_${uuid().slice(0, 8)}`;
  const scaleMul = mods.scale_mul || 1.0;
  const scale = (base.scale || [1, 1, 1]).map(v => v * scaleMul);
  const color = mods.color || base.color || '#aaaaff';
  const motion = mods.motion || base.motion || 'idle';
  const vfx = base.vfx || 'none';
  const primitive = base.primitive || 'sphere';

  return entity(id, 'object.primitive', {
    transform: {
      position: [
        (Math.random() - 0.5) * 2,
        Math.max(0.5, scale[1] / 2),
        -2 - Math.random() * 1.5,
      ],
      rotation: [0, Math.random() * Math.PI * 2, 0],
      scale,
    },
    params: { primitive, color, vfx, motion, _speculative: fallback ? 'fallback' : 'proxy' },
    label: archetype?.match?.[0] || 'object',
  });
}

async function onPartial({ transcript, turnId }) {
  if (!_enabled) return;
  // Meta verbs short-circuit spawn. Don't fire mid-utterance — partials only
  // ever observe; final is when we dispatch.
  if (classifyMeta(transcript)) return;
  const cls = classifySync(transcript);
  if (cls.confidence < 0.6) return;

  const existing = _turns.get(turnId);
  if (existing && existing.archetype?.match?.[0] === cls.archetype?.match?.[0]) {
    // already spawned for this turn + same archetype → ignore further partials
    return;
  }

  if (existing) {
    // Different archetype mid-utterance → live-replace
    const next = buildEntity(cls);
    emit('spawn:replace', { id: existing.proxyId, oldEntity: existing.entity, newEntity: next, turnId, sceneId: _currentSceneId });
    _turns.set(turnId, { proxyId: next.id, archetype: cls.archetype, mods: cls.mods, transcript, entity: next });
    return;
  }

  const ent = buildEntity(cls);
  _turns.set(turnId, { proxyId: ent.id, archetype: cls.archetype, mods: cls.mods, transcript, entity: ent });
  emit('spawn:proxy', { id: ent.id, entity: ent, turnId, sceneId: _currentSceneId, archetype: cls.archetype });
}

async function onFinal({ transcript, turnId }) {
  if (!_enabled) return;
  // Pre-pass: scene-level verbs (save/load/share/remix/delete/download/list).
  // If matched, skip spawn ladder entirely — caller dispatches via scene/io.js.
  const meta = classifyMeta(transcript);
  if (meta) {
    emit('intent:meta', { meta, turnId, sceneId: _currentSceneId });
    // If a proxy was already spawned mid-utterance (race vs partial), cancel it.
    const existing = _turns.get(turnId);
    if (existing) {
      emit('spawn:cancel', { id: existing.proxyId, turnId, sceneId: _currentSceneId });
      _turns.delete(turnId);
    }
    return;
  }
  const cls = await classify(transcript);
  const existing = _turns.get(turnId);

  if (!existing && cls.confidence >= 0.4) {
    // Final-only match (no partial fired) — spawn fresh
    const ent = buildEntity(cls);
    emit('spawn:commit', { id: ent.id, entity: ent, turnId, sceneId: _currentSceneId, archetype: cls.archetype });
    await rememberSpawn({ entity: ent, transcript, scene_id: _currentSceneId, archetype: cls.archetype, mods: cls.mods });
    return;
  }

  if (existing) {
    const sameArch = existing.archetype?.match?.[0] === cls.archetype?.match?.[0];
    if (sameArch || !cls.archetype) {
      emit('spawn:commit', { id: existing.proxyId, entity: existing.entity, turnId, sceneId: _currentSceneId, archetype: existing.archetype });
      await rememberSpawn({ entity: existing.entity, transcript, scene_id: _currentSceneId, archetype: existing.archetype, mods: existing.mods });
    } else {
      const next = buildEntity(cls);
      emit('spawn:replace', { id: existing.proxyId, oldEntity: existing.entity, newEntity: next, turnId, sceneId: _currentSceneId });
      await rememberSpawn({ entity: next, transcript, scene_id: _currentSceneId, archetype: cls.archetype, mods: cls.mods });
    }
    _turns.delete(turnId);
    return;
  }

  // No partial, no final match → defer to cloud LLM (caller decides)
  emit('intent:unresolved', { transcript, turnId, sceneId: _currentSceneId });
}

export async function enable() {
  if (_enabled) return;
  await loadArchetypes();
  on('intent:partial', onPartial);
  on('intent:final', onFinal);
  _enabled = true;
  emit('speculative:enabled', { sceneId: _currentSceneId });
}

export function disable() {
  _enabled = false;
  _turns.clear();
}

export function isEnabled() { return _enabled; }

if (typeof window !== 'undefined') {
  window.__speculative = { enable, disable, isEnabled, setSceneId, getSceneId };
}
