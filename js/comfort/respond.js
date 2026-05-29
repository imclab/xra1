// js/comfort/respond.js — web port of rn-jarvis/portals/comfortRespond.ts
// ─────────────────────────────────────────────────────────────────────────────
// Constitution mandate (§ Doing Without Doing): "Closed-loop response
// (mandatory; no telemetry without action)." Two surfaces, byte-faithful to iOS:
//   1. respondToSentiment(s, sendBridge) — fires a `jarvis_ui_hint` message.
//      On iOS sendBridge → Unity. On web sendBridge → the comfort HUD
//      (comfort-hud.js) which renders the equivalent affordance.
//   2. persistSentiment(s) — encodes codon.sentiment as an additive XRAI delta
//      against the active doc, so the sentiment trail rides with spatial memory.
//
// Rate-limit: 1 emission per state-transition; identical-state repeats within
// REPEAT_THROTTLE_MS are suppressed (prevents UI flicker). Identical to iOS.
// ─────────────────────────────────────────────────────────────────────────────

import { applyDelta, getActive } from './active-doc.js';

/** @typedef {import('./rules.js').Sentiment} Sentiment */
/** @typedef {import('./rules.js').SentimentState} SentimentState */
/** @typedef {(type: string, payload: Record<string, unknown>) => void} SendBridge */

const REPEAT_THROTTLE_MS = 10_000;

/** state → UI-hint kind (null = neutral, no response). Mirror of iOS table. */
export const UI_HINT_BY_STATE = {
  frustration: 'ghost_hand_demo',
  discovery: 'silent_particle_burst',
  confusion: 'modality_switch',
  flow: 'suppress_chrome',
  delight: 'gentle_ack',
  neutral: null,
};

/** @type {{ state: SentimentState, t: number } | null} */
let lastEmitted = null;

/**
 * Fire a `jarvis_ui_hint` message if state changed or throttle elapsed.
 * @param {Sentiment} s
 * @param {SendBridge} sendBridge
 * @returns {boolean} true if a hint was emitted
 */
export function respondToSentiment(s, sendBridge) {
  const kind = UI_HINT_BY_STATE[s.state];
  if (!kind) return false; // neutral → no UI response

  const now = Date.now();
  if (lastEmitted && lastEmitted.state === s.state && now - lastEmitted.t < REPEAT_THROTTLE_MS) {
    return false;
  }

  sendBridge('jarvis_ui_hint', {
    kind,
    state: s.state,
    valence: s.valence,
    arousal: s.arousal,
    confidence: s.confidence,
  });
  lastEmitted = { state: s.state, t: now };
  return true;
}

/**
 * Encode the sentiment as a codon.sentiment XRAI entity and persist it.
 * @param {Sentiment} s
 * @returns {boolean} true if persisted
 */
export function persistSentiment(s) {
  if (!getActive()) return false; // no active doc — nothing to persist into

  const node = { id: `codon.sentiment.${s.t}`, type: 'codon.sentiment', anchor: s.source_layer };
  const ok = applyDelta({ op: 'add', ts: Date.now(), actor: 'jarvis', node });
  if (!ok) return false;

  // Write the schema fields directly into the freshly-added entity (Pattern A —
  // no new schema, single add). Identical to the iOS add+inline-params approach.
  const doc = getActive();
  if (!doc) return false;
  const entity = doc.scene.entities.find((e) => e.id === node.id);
  if (entity) {
    entity.params = {
      ...(entity.params ?? {}),
      valence: s.valence,
      arousal: s.arousal,
      state: s.state,
      confidence: s.confidence,
      source_layer: s.source_layer,
    };
  }
  return true;
}

/** Test seam — clear throttle state so the smoke can re-init between cases. */
export function _resetRespondThrottle() {
  lastEmitted = null;
}
