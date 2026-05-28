// js/world/bus.js — tiny event bus for spawn pipeline.
//
// Events:
//   intent:speculative  { transcript, archetype, mods, confidence, turnId }
//   intent:final        { transcript, turnId }
//   spawn:proxy         { id, entity, turnId }      // optimistic placeholder
//   spawn:commit        { id, entity, turnId }      // cloud confirmed proxy
//   spawn:replace       { id, oldEntity, newEntity, turnId }
//   spawn:cancel        { id, turnId, reason }
//
// Each user utterance gets a turnId. Speculative spawns key on turnId so a
// later final/cancel for the same turn can find and replace/remove them.

const listeners = new Map(); // event -> Set<fn>

export function on(event, fn) {
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event).add(fn);
  return () => off(event, fn);
}

export function off(event, fn) {
  const set = listeners.get(event);
  if (set) set.delete(fn);
}

export function emit(event, payload) {
  const set = listeners.get(event);
  if (!set) return;
  for (const fn of set) {
    try { fn(payload); }
    catch (e) { console.warn(`[bus] ${event} listener threw:`, e); }
  }
}

export function clear(event) {
  if (event) listeners.delete(event);
  else listeners.clear();
}

let _turn = 0;
export function nextTurnId() { return `t${Date.now().toString(36)}_${(++_turn).toString(36)}`; }

if (typeof window !== 'undefined') {
  window.__bus = { on, off, emit, clear, nextTurnId };
}
