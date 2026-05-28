// js/scene/io.js — save / load / share / remix XRAI scenes.
//
// Scene = XRAI doc. We do not invent a new format — the doc IS the saveable thing.
//
// Surfaces:
//   • IndexedDB (semantic store, kind='scene')        → local persistence
//   • URL hash (#scene=<base64>)                       → small docs (<6KB) shareable as link
//   • Blob URL / File download                         → big docs (>6KB)
//   • Cloud sync (rides existing js/memory-sync.js)    → cross-device
//   • RN bridge (xrai-web-bridge.ts)                   → web ↔ mobile parity
//
// Remix:
//   • clone(doc) duplicates with new id + parent_id + new author
//   • lineage is doc.metadata.parents[] for full chain

import { validate, newScene, uuid } from '../xrai-core.js';
import * as memStore from '../memory/store.js';

const STORE = 'semantic';
const KIND = 'scene';

function nowIso() { return new Date().toISOString(); }

function safeAuthor() {
  try {
    const id = localStorage.getItem('xrai_user_id') || 'anon';
    return { type: 'human', id };
  } catch { return { type: 'human', id: 'anon' }; }
}

// ── Local persistence ──────────────────────────────────────────────────────
export async function saveScene(doc, { title, tags } = {}) {
  const v = validate(doc);
  if (!v.valid) throw new Error(`refusing to save invalid scene: ${v.errors.join(', ')}`);
  const sceneId = doc.id || uuid();
  doc.id = sceneId;
  doc.metadata = { ...(doc.metadata || {}), title: title || doc.metadata?.title || 'untitled', tags: tags || [], saved_at: nowIso() };
  const rec = {
    id: sceneId,
    ts: nowIso(),
    kind: KIND,
    topic: `scene:${doc.metadata.title}`,
    text: doc.metadata.title,
    meta: { doc },
    source: 'web',
  };
  await memStore.put(STORE, rec);
  return { id: sceneId, ts: rec.ts };
}

export async function loadScene(id) {
  const rec = await memStore.get(STORE, id);
  if (!rec || rec.kind !== KIND) return null;
  return rec.meta?.doc || null;
}

export async function listScenes({ limit = 50 } = {}) {
  const rows = await memStore.all(STORE, { limit: limit * 4 });
  return rows
    .filter(r => r.kind === KIND)
    .slice(0, limit)
    .map(r => ({
      id: r.id,
      title: r.meta?.doc?.metadata?.title || r.topic.replace(/^scene:/, ''),
      ts: r.ts,
      entities: r.meta?.doc?.scene?.entities?.length || 0,
      tags: r.meta?.doc?.metadata?.tags || [],
    }));
}

export async function deleteScene(id) {
  return memStore.del(STORE, id);
}

// ── Encoding: URL hash + blob ──────────────────────────────────────────────
function b64encode(str) {
  if (typeof btoa !== 'undefined') return btoa(unescape(encodeURIComponent(str)));
  return Buffer.from(str, 'utf-8').toString('base64');
}
function b64decode(str) {
  if (typeof atob !== 'undefined') return decodeURIComponent(escape(atob(str)));
  return Buffer.from(str, 'base64').toString('utf-8');
}

const URL_LIMIT = 6 * 1024; // chars in hash, conservative for all browsers

export function toHash(doc) {
  const json = JSON.stringify(doc);
  const b = b64encode(json);
  if (b.length > URL_LIMIT) return null; // caller should fall through to blob
  return b;
}

export function fromHash(hash) {
  try { return JSON.parse(b64decode(hash)); } catch { return null; }
}

export function toBlob(doc) {
  const json = JSON.stringify(doc, null, 2);
  return new Blob([json], { type: 'application/xrai+json' });
}

export function toDownload(doc, filename) {
  if (typeof document === 'undefined') return null;
  const blob = toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `${doc.metadata?.title || 'scene'}.xrai.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 0);
  return a.download;
}

export async function fromFile(file) {
  const text = await file.text();
  const doc = JSON.parse(text);
  const v = validate(doc);
  if (!v.valid) throw new Error(`invalid XRAI file: ${v.errors.join(', ')}`);
  return doc;
}

// ── Share ──────────────────────────────────────────────────────────────────
export function shareURL(doc, { base } = {}) {
  const origin = base || (typeof location !== 'undefined' ? `${location.origin}${location.pathname}` : '');
  const hash = toHash(doc);
  if (hash) return `${origin}#scene=${hash}`;
  // fallback: scene id only (recipient must have it locally or sync layer pulls it)
  return `${origin}#scene_id=${doc.id}`;
}

export function readShareURL(href) {
  const u = typeof href === 'string' ? href : (typeof location !== 'undefined' ? location.href : '');
  const m = u.match(/[#&]scene=([^&]+)/);
  if (m) return { kind: 'inline', doc: fromHash(m[1]) };
  const m2 = u.match(/[#&]scene_id=([^&]+)/);
  if (m2) return { kind: 'id', id: m2[1] };
  return null;
}

export async function maybeLoadFromURL() {
  const ref = readShareURL();
  if (!ref) return null;
  if (ref.kind === 'inline') return ref.doc;
  if (ref.kind === 'id') return loadScene(ref.id);
  return null;
}

// ── Remix ──────────────────────────────────────────────────────────────────
export function remix(doc, { author, title } = {}) {
  const parents = [...(doc.metadata?.parents || []), doc.id];
  const cloned = JSON.parse(JSON.stringify(doc));
  cloned.id = uuid();
  cloned.created_at = nowIso();
  cloned.author = author ? { type: 'human', id: author } : safeAuthor();
  cloned.metadata = {
    ...(cloned.metadata || {}),
    parents,
    parent_id: doc.id,
    title: title || `${doc.metadata?.title || 'scene'} (remix)`,
    remixed_at: nowIso(),
  };
  return cloned;
}

if (typeof window !== 'undefined') {
  window.__sceneIO = {
    saveScene, loadScene, listScenes, deleteScene,
    toHash, fromHash, toBlob, toDownload, fromFile,
    shareURL, readShareURL, maybeLoadFromURL, remix,
  };
}
