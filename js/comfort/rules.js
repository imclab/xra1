// js/comfort/rules.js — web port of src/services/rn-jarvis/portals/comfortRules.ts
// ─────────────────────────────────────────────────────────────────────────────
// Spec 029 §Goals — Adaptive Intent-Sensing Auto-Loop, behavioral layer.
// Pattern A: NO new brain primitives — uses AgentKB rule-eval (kb.js).
//
// Threshold table is DATA, a verbatim mirror of soul/RULES.md §Comfort Loop and
// the iOS COMFORT_RULES. DO NOT drift these numbers — they are the cross-platform
// sentiment-classification contract (smoke-jarvis-comfort.mjs gates it).
// ─────────────────────────────────────────────────────────────────────────────

/** @typedef {import('./kb.js').AgentKB} AgentKB */
/** @typedef {'frustration'|'flow'|'discovery'|'confusion'|'delight'|'neutral'} SentimentState */
/** @typedef {{ retryRate:number, cancelRate:number, timeToFirstActionMs:number, repeatedNoChangeCount:number, newEntityTypes:number }} BehavioralSignals */
/** @typedef {{ valence:number, arousal:number, state:SentimentState, confidence:number, source_layer:'behavioral'|'verbal'|'physiological', t:string }} Sentiment */

/** Cheap behavioral-layer rules. Verbal/physiological add rows in same shape. */
export const COMFORT_RULES = [
  {
    id: 'comfort.frustration.high_retry',
    state: 'frustration',
    valence: -0.6, arousal: 0.7, confidence: 0.7,
    when: [['userState.v.retryRate', '>=', 0.4]],
  },
  {
    id: 'comfort.frustration.high_cancel',
    state: 'frustration',
    valence: -0.5, arousal: 0.6, confidence: 0.65,
    when: [['userState.v.cancelRate', '>=', 0.3]],
  },
  {
    id: 'comfort.confusion.repeat_no_change',
    state: 'confusion',
    valence: -0.3, arousal: 0.4, confidence: 0.7,
    when: [['userState.v.repeatedNoChangeCount', '>=', 3]],
  },
  {
    id: 'comfort.discovery.new_entities',
    state: 'discovery',
    valence: 0.6, arousal: 0.5, confidence: 0.6,
    when: [['userState.v.newEntityTypes', '>=', 2]],
  },
  {
    id: 'comfort.flow.low_friction',
    state: 'flow',
    valence: 0.5, arousal: 0.5, confidence: 0.55,
    when: [
      ['userState.v.retryRate', '<', 0.1],
      ['userState.v.cancelRate', '<', 0.05],
      ['userState.v.repeatedNoChangeCount', '<', 2],
    ],
  },
];

/** Register one KBRule per spec (idempotent — addRule replaces by id). */
export function registerComfortRules(kb) {
  for (const spec of COMFORT_RULES) {
    kb.addRule({
      id: spec.id,
      when: spec.when,
      do: [{ call: 'set_sentiment_state', args: { state: spec.state, valence: spec.valence, arousal: spec.arousal } }],
      hits: 0,
      misses: 0,
      confidence: spec.confidence,
    });
  }
}

function neutral() {
  return { valence: 0, arousal: 0, state: 'neutral', confidence: 0.5, source_layer: 'behavioral' };
}

function nowIso() {
  return new Date().toISOString();
}

/**
 * Sentiment extraction — uses kb.evaluate(), no new eval logic.
 * @param {AgentKB} kb
 * @param {BehavioralSignals} signals
 * @returns {Sentiment}
 */
export function extractSentiment(kb, signals) {
  // Push observation as a single KB node (mirrors iOS userState node).
  kb.setNode('userState', { ...signals });

  const fired = kb.evaluate();
  if (fired.length === 0) return { ...neutral(), t: nowIso() };

  // Aggregate: highest-confidence rule's state wins; fired rules average into
  // valence/arousal so partially-matching states still influence the output.
  let best = null;
  let bestConf = -1;
  let valSum = 0, arSum = 0, count = 0;
  for (const f of fired) {
    const action = f.actions.find((a) => a.call === 'set_sentiment_state');
    if (!action || !action.args) continue;
    const state = action.args.state;
    valSum += action.args.valence ?? 0;
    arSum += action.args.arousal ?? 0;
    count += 1;
    if (f.rule.confidence > bestConf) {
      bestConf = f.rule.confidence;
      best = { rule: f.rule, state };
    }
  }

  if (!best) return { ...neutral(), t: nowIso() };

  return {
    valence: count > 0 ? valSum / count : 0,
    arousal: count > 0 ? arSum / count : 0,
    state: best.state,
    confidence: best.rule.confidence,
    source_layer: 'behavioral',
    t: nowIso(),
  };
}
