// js/memory/index.js — public memory API. Cross-platform shape, L0-first.
//
// Shape (one record, identical on web / Unity / RN):
//   { id, ts, kind, topic, text, embed?, source, scene_id?, entity_ids?, meta? }
//
// API:
//   remember(record)          → append to appropriate store + queue for sync
//   recall(topic, { limit })  → keyword + semantic search
//   recallVector(query, n)    → cosine over stored embeddings (after embeddings.js loaded)
//   forget(id)                → delete one record (semantic+procedural only; episodic stays append-only)
//   recent(n)                 → last n episodic turns
//   stats()                   → record counts
//
// Identity:
//   `xrai_user_id` localStorage → stable UUID, generated once.
//   All records stamped with user_id so cross-platform sync keys cleanly.
//
// Sync:
//   Records appended to `_dirty` queue. js/memory/sync.js drains every 30s
//   or on visibilitychange→hidden. Pull on boot rehydrates L0.

import * as store from './store.js';
import * as embeddings from './embeddings.js';

const SOURCE = 'web';
const USER_KEY = 'xrai_user_id';
const DIRTY_KEY = 'xrai_mem_dirty';

function uuid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function getUserId() {
  try {
    let id = localStorage.getItem(USER_KEY);
    if (!id) { id = uuid(); localStorage.setItem(USER_KEY, id); }
    return id;
  } catch { return 'anon'; }
}

function kindToStore(kind) {
  if (kind === 'semantic') return 'semantic';
  if (kind === 'procedural') return 'procedural';
  return 'episodic';
}

function enqueueDirty(rec) {
  try {
    const raw = localStorage.getItem(DIRTY_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.push(rec.id);
    if (list.length > 5000) list.splice(0, list.length - 5000);
    localStorage.setItem(DIRTY_KEY, JSON.stringify(list));
  } catch {}
}

export function getDirtyIds() {
  try { return JSON.parse(localStorage.getItem(DIRTY_KEY) || '[]'); } catch { return []; }
}

export function clearDirty(ids) {
  try {
    const set = new Set(ids);
    const remaining = getDirtyIds().filter(id => !set.has(id));
    localStorage.setItem(DIRTY_KEY, JSON.stringify(remaining));
  } catch {}
}

export async function remember(record) {
  const rec = {
    user_id: getUserId(),
    source: SOURCE,
    kind: record.kind || 'episodic',
    ts: record.ts || new Date().toISOString(),
    ...record,
  };
  // Only embed if model already loaded (or stub injected). Avoid silent 25MB fetch.
  if (!rec.embed && rec.text && embeddings.isReady()) {
    try {
      const vec = await embeddings.embed(rec.text);
      rec.embed = embeddings.packEmbed(vec);
    } catch {}
  }
  const storeName = kindToStore(rec.kind);
  const saved = await store.put(storeName, rec);
  enqueueDirty(saved);
  return saved;
}

/** Force-embed and persist. Triggers model load on first call (~25MB). */
export async function rememberWithEmbed(record) {
  const text = record.text || '';
  const vec = await embeddings.embed(text);
  return remember({ ...record, embed: embeddings.packEmbed(vec) });
}

export async function rememberTurn({ role, text, scene_id, entity_ids, meta } = {}) {
  return remember({
    kind: 'episodic',
    topic: `turn:${role || 'user'}`,
    text: text || '',
    scene_id: scene_id || null,
    entity_ids: entity_ids || [],
    meta: meta || {},
  });
}

export async function rememberSpawn({ entity, transcript, scene_id, archetype, mods } = {}) {
  return remember({
    kind: 'episodic',
    topic: 'spawn',
    text: transcript || '',
    scene_id: scene_id || null,
    entity_ids: entity ? [entity.id] : [],
    meta: { entity, archetype: archetype?.match?.[0] || null, mods: mods || {} },
  });
}

export async function rememberFact({ topic, text, meta } = {}) {
  return remember({ kind: 'semantic', topic: topic || 'fact', text: text || '', meta: meta || {} });
}

export async function rememberPreference({ topic, text, meta } = {}) {
  return remember({ kind: 'procedural', topic: topic || 'preference', text: text || '', meta: meta || {} });
}

function scoreKeyword(rec, q) {
  const hay = `${rec.topic || ''} ${rec.text || ''}`.toLowerCase();
  const needle = q.toLowerCase();
  if (!hay || !needle) return 0;
  if (hay.includes(needle)) return 1.0;
  const words = needle.split(/\s+/).filter(Boolean);
  let hits = 0;
  for (const w of words) if (hay.includes(w)) hits++;
  return words.length ? hits / words.length : 0;
}

export async function recall(query, { limit = 8, stores = ['episodic', 'semantic', 'procedural'] } = {}) {
  const all = [];
  for (const s of stores) {
    const rows = await store.all(s, { limit: 500 });
    for (const r of rows) {
      const score = scoreKeyword(r, query);
      if (score > 0) all.push({ ...r, _score: score, _store: s });
    }
  }
  all.sort((a, b) => b._score - a._score || (b.ts < a.ts ? -1 : 1));
  return all.slice(0, limit);
}

/**
 * Semantic recall via cosine. Embeds the query, ranks all records with stored
 * embeddings. Falls back to keyword `recall` if no embedder is available and
 * none has been loaded yet (avoids surprise 25MB fetch on first call — caller
 * should warm via embeddings.embed() or rememberWithEmbed() first if they want
 * vector recall guaranteed).
 */
export async function recallVector(query, { limit = 8, minScore = 0, stores = ['episodic', 'semantic', 'procedural'] } = {}) {
  if (!embeddings.isReady()) {
    // Don't auto-load here; fall back. Caller can warm explicitly.
    return recall(query, { limit, stores });
  }
  const qvec = await embeddings.embed(query);
  const candidates = [];
  for (const s of stores) {
    const rows = await store.all(s, { limit: 2000 });
    for (const r of rows) {
      if (!r.embed) continue;
      // store.js holds Uint8Array; unpack to Float32 for cosine.
      const f32 = embeddings.unpackEmbed(r.embed);
      candidates.push({ ...r, embed: f32, _store: s });
    }
  }
  return embeddings.rankByCosine(qvec, candidates, { limit, minScore });
}

export async function recent(n = 20) {
  return store.recent('episodic', n);
}

export async function lastSceneId() {
  const r = await store.recent('episodic', 1);
  return r[0]?.scene_id || null;
}

export async function forget(id) {
  for (const s of ['semantic', 'procedural']) {
    const hit = await store.get(s, id);
    if (hit) return store.del(s, id);
  }
  return false;
}

export async function stats() {
  const sizes = await store.size();
  return { user_id: getUserId(), source: SOURCE, ...sizes, dirty: getDirtyIds().length };
}

export async function exportAll() { return store.exportAll(); }
export async function importAll(data, opts) { return store.importAll(data, opts); }

if (typeof window !== 'undefined') {
  window.__memory = { remember, rememberWithEmbed, rememberTurn, rememberSpawn, rememberFact, rememberPreference, recall, recallVector, recent, lastSceneId, forget, stats, exportAll, importAll, getUserId };
}
