// js/scene/inputs.js — unified input dispatcher.
//
// One entry point: `dispatch({ kind, payload })` → XRAI doc → bus emit.
// All four input modes route here so renderer + memory + share are uniform.
//
//   kind: 'voice'    payload: { transcript, partial? }
//   kind: 'text'     payload: { prompt, strategy? }
//   kind: 'ui'       payload: { archetype, params }     (drag/drop, palette click)
//   kind: 'gesture'  payload: { gesture, params }       (pinch/swipe + hand pose)
//   kind: 'datasource' payload: { url|data, source }    (webpage, github, kg, social)
//   kind: 'seed'     payload: { seed, kind }            (book, concept, paper, code)
//
// Voice path is identical to text once transcript exists. Gesture+UI bypass
// LLM (cheap path) — they already carry archetype hints from the picker.

import { encode } from '../xrai-core.js';
import { emit, nextTurnId } from '../world/bus.js';

const DEFAULT_STRATEGY = 'auto';

function adapterFor(kind, payload) {
  if (kind === 'datasource') return `dataviz.${payload.source}`;
  if (kind === 'seed') return 'graph.seed';
  if (kind === 'ui' && payload?.archetype) return payload.archetype;
  if (kind === 'gesture' && payload?.archetype) return payload.archetype;
  return 'procgen'; // voice + text fall through to procgen router (strategy='auto')
}

function inputFor(kind, payload) {
  if (kind === 'voice') return { prompt: payload.transcript, strategy: payload.strategy || DEFAULT_STRATEGY };
  if (kind === 'text') return { prompt: payload.prompt, strategy: payload.strategy || DEFAULT_STRATEGY };
  if (kind === 'ui' || kind === 'gesture') return payload.params || {};
  if (kind === 'datasource') return { url: payload.url, data: payload.data, ...(payload.opts || {}) };
  if (kind === 'seed') return { seed: payload.seed, kind: payload.kind };
  return payload || {};
}

export async function dispatch({ kind, payload = {}, opts = {} } = {}) {
  const turnId = opts.turnId || nextTurnId();
  emit('input:received', { kind, payload, turnId });

  // Voice partial: emit speculative hint without LLM call (cheap path)
  if (kind === 'voice' && payload.partial) {
    emit('intent:speculative', { transcript: payload.transcript, turnId });
    return { turnId, kind: 'speculative' };
  }

  const adapter = opts.adapter || adapterFor(kind, payload);
  const input = inputFor(kind, payload);

  try {
    const doc = await encode(adapter, input, opts);
    emit('input:dispatched', { kind, adapter, doc, turnId });
    if (kind === 'voice' || kind === 'text') emit('intent:final', { transcript: payload.transcript || payload.prompt, turnId });
    return { turnId, kind: 'final', adapter, doc };
  } catch (e) {
    emit('input:error', { kind, adapter, error: String(e), turnId });
    throw e;
  }
}

// Convenience wrappers (the call sites don't need to remember the shape)
export const voice = (transcript, opts) => dispatch({ kind: 'voice', payload: { transcript }, opts });
export const voicePartial = (transcript, opts) => dispatch({ kind: 'voice', payload: { transcript, partial: true }, opts });
export const text = (prompt, opts) => dispatch({ kind: 'text', payload: { prompt }, opts });
export const ui = (archetype, params, opts) => dispatch({ kind: 'ui', payload: { archetype, params }, opts });
export const gesture = (g, params, opts) => dispatch({ kind: 'gesture', payload: { gesture: g, params }, opts });
export const datasource = (source, urlOrData, opts) => dispatch({
  kind: 'datasource',
  payload: typeof urlOrData === 'string' ? { source, url: urlOrData } : { source, data: urlOrData },
  opts,
});
export const seed = (seedStr, kind, opts) => dispatch({ kind: 'seed', payload: { seed: seedStr, kind }, opts });

if (typeof window !== 'undefined') {
  window.__sceneInputs = { dispatch, voice, voicePartial, text, ui, gesture, datasource, seed };
}
