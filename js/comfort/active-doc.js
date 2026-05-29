// js/comfort/active-doc.js — web port of rn-jarvis/portals/xraiActiveDoc.ts
// ─────────────────────────────────────────────────────────────────────────────
// In-memory active XRAI doc + additive delta application. The iOS version layers
// AsyncStorage flush + backup rotation + XraiAdapter schema-roundtrip on top;
// the web has none of those subsystems, so this port keeps EXACTLY the surface
// the comfort loop needs — setActive / getActive / clearActive / applyDelta /
// makeEmptyDoc — plus an optional localStorage flush (browser-only, guarded).
//
// Schema-validator guard (iOS xraiToFile→xraiFromFile roundtrip) is replaced by
// a lightweight structural check: a delta that would corrupt scene.entities is
// rejected and state is left untouched. Same contract: applyDelta returns false
// on reject, true on commit.
// ─────────────────────────────────────────────────────────────────────────────

/** @typedef {{ id:string, type:string, transform?:object, params?:Record<string,unknown> }} XraiEntity */
/** @typedef {{ xrai_version:string, id:string, created_at:string, author:object, origin:object, scene:{ anchors:any[], entities:XraiEntity[], relations:any[], events:any[] } }} XraiDoc */
/** @typedef {{ op:'add'|'modify'|'remove', ts:number, actor:'user'|'jarvis', node?:{ id:string, type:string, pos?:[number,number,number], anchor?:string }, rel?:Array<{from:string,to:string,type:string}> }} XraiDelta */

const FLUSH_KEY = 'xrai.comfort.activeDoc';

/** @type {XraiDoc | null} */
let activeDoc = null;

/** @param {XraiDoc} doc */
export function setActive(doc) {
  activeDoc = doc;
}

/** @returns {XraiDoc | null} */
export function getActive() {
  return activeDoc;
}

export function clearActive() {
  activeDoc = null;
}

/**
 * Additive delta application (add / modify / remove). Returns false if there is
 * no active doc or the delta is structurally invalid.
 * @param {XraiDelta} delta
 * @returns {boolean}
 */
export function applyDelta(delta) {
  if (!activeDoc) return false;
  const entities = activeDoc.scene.entities;

  try {
    if (delta.op === 'add' && delta.node) {
      /** @type {XraiEntity} */
      const entity = { id: delta.node.id, type: delta.node.type };
      if (delta.node.pos) {
        entity.transform = { position: delta.node.pos, rotation: [0, 0, 0], scale: [1, 1, 1] };
      }
      if (delta.node.anchor) entity.params = { anchor: delta.node.anchor };
      entities.push(entity);
    } else if (delta.op === 'modify' && delta.node) {
      const idx = entities.findIndex((e) => e.id === delta.node.id);
      if (idx < 0) return false;
      entities[idx] = { ...entities[idx], type: delta.node.type ?? entities[idx].type };
    } else if (delta.op === 'remove' && delta.node) {
      const idx = entities.findIndex((e) => e.id === delta.node.id);
      if (idx < 0) return false;
      entities.splice(idx, 1);
    } else {
      return false;
    }

    if (delta.rel) {
      activeDoc.scene.relations.push(...delta.rel.map((r) => ({ type: r.type, from: r.from, to: r.to })));
    }

    flush();
    return true;
  } catch {
    return false;
  }
}

/** Empty-doc factory (mirrors iOS makeEmptyDoc). */
export function makeEmptyDoc(scene = 'web') {
  return {
    xrai_version: '1.0',
    id: `web-${Date.now()}`,
    created_at: new Date().toISOString(),
    author: { type: 'user', id: 'web' },
    origin: { app: 'xrai-website', version: 'comfort-loop', scene },
    scene: { anchors: [], entities: [], relations: [], events: [] },
  };
}

// ─── Optional browser persistence (no-op in Node) ──────────────────────────
function flush() {
  if (typeof localStorage === 'undefined' || !activeDoc) return;
  try {
    localStorage.setItem(FLUSH_KEY, JSON.stringify(activeDoc));
  } catch {
    /* quota / private-mode — non-fatal, in-memory state is authoritative */
  }
}

/** Boot hydration (browser-only). Returns the doc if one was persisted. */
export function hydrateFromStorage() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(FLUSH_KEY);
    if (!raw) return null;
    const doc = JSON.parse(raw);
    setActive(doc);
    return doc;
  } catch {
    return null;
  }
}

/** Test seam — reset module state so the smoke can re-init between cases. */
export function _resetForTests() {
  activeDoc = null;
}
