// js/comfort/loop.js — web port of rn-jarvis/portals/comfortLoop.ts
// ─────────────────────────────────────────────────────────────────────────────
// Behavioral signal collector + tick. Closes the constitution loop:
//   action stream → BehavioralSignals → extractSentiment (kb.evaluate)
//                 → respondToSentiment (HUD hint) + persistSentiment (XRAI delta)
//
// Pattern A: NO new brain. Signal collection is a 60s ring buffer; the brain is
// kb.evaluate(); response + persistence are respond.js. This file is the wire.
// Algorithm (retry/cancel/repeat/discovery detection) is byte-faithful to iOS.
//
// Web hook points (call recordAction from your scene/composer event handlers):
//   recordAction('ADD_OBJECT', uuid, objectType)
//   recordAction('REMOVE_OBJECT', uuid, objectType)
//   recordAction('ROTATE' | 'ZOOM' | 'NAV' | …)
// ─────────────────────────────────────────────────────────────────────────────

import { extractSentiment } from './rules.js';
import { respondToSentiment, persistSentiment } from './respond.js';

const WINDOW_MS = 60_000;
const CANCEL_WINDOW_MS = 5_000;
let SESSION_START = Date.now();

/** @typedef {{ t:number, type:string, uuid?:string, objectType?:string }} ActionEvent */

/** @type {ActionEvent[]} */
const events = [];
/** @type {Map<string, number>} type → first-seen ts */
const seenObjectTypes = new Map();
/** @type {number | null} */
let firstActionAt = null;
/** @type {import('./rules.js').Sentiment | null} */
let lastSentiment = null;

// ─── Public collector API ──────────────────────────────────────────────────

export function recordAction(type, uuid, objectType) {
  const now = Date.now();
  if (firstActionAt === null) firstActionAt = now;
  events.push({ t: now, type, uuid, objectType });
  if (objectType && !seenObjectTypes.has(objectType)) seenObjectTypes.set(objectType, now);
  pruneOld(now);
}

/** @returns {import('./rules.js').BehavioralSignals} */
export function getSignals() {
  const now = Date.now();
  pruneOld(now);

  const recent = events; // already pruned to WINDOW_MS
  const total = recent.length || 1;

  // Cancel rate: REMOVE_OBJECT within CANCEL_WINDOW_MS of an ADD for same uuid.
  let cancels = 0;
  for (let i = 0; i < recent.length; i++) {
    const e = recent[i];
    if (e.type === 'REMOVE_OBJECT' && e.uuid) {
      for (let j = i - 1; j >= 0; j--) {
        const prev = recent[j];
        if (e.t - prev.t > CANCEL_WINDOW_MS) break;
        if (prev.type === 'ADD_OBJECT' && prev.uuid === e.uuid) { cancels += 1; break; }
      }
    }
  }

  // Retry rate: same action.type fired 2+ in a row within 2s with same uuid.
  let retries = 0;
  for (let i = 1; i < recent.length; i++) {
    if (recent[i].type === recent[i - 1].type &&
        recent[i].uuid === recent[i - 1].uuid &&
        recent[i].t - recent[i - 1].t < 2_000) {
      retries += 1;
    }
  }

  // Repeated-no-change: longest run of identical action.type (≥3 counts).
  let repeatedNoChange = 0;
  let runStart = 0, bestRun = 0;
  for (let i = 1; i < recent.length; i++) {
    if (recent[i].type === recent[i - 1].type) {
      const run = i - runStart + 1;
      if (run > bestRun) bestRun = run;
    } else {
      runStart = i;
    }
  }
  if (bestRun >= 3) repeatedNoChange = bestRun;

  // New entity types: unique objectType first-seen within WINDOW_MS.
  let newEntityTypes = 0;
  for (const [, t] of seenObjectTypes) if (now - t <= WINDOW_MS) newEntityTypes += 1;

  return {
    retryRate: retries / total,
    cancelRate: cancels / total,
    timeToFirstActionMs: firstActionAt ? firstActionAt - SESSION_START : 0,
    repeatedNoChangeCount: repeatedNoChange,
    newEntityTypes,
  };
}

// ─── Tick: read signals → fire brain → fan out responses ────────────────────

/**
 * One comfort-loop tick: signals → sentiment → HUD hint + XRAI persist.
 * @param {import('./kb.js').AgentKB} kb
 * @param {import('./respond.js').SendBridge} sendBridge
 */
export function comfortLoopTick(kb, sendBridge) {
  const signals = getSignals();
  const sentiment = extractSentiment(kb, signals);
  lastSentiment = sentiment;
  respondToSentiment(sentiment, sendBridge); // throttled inside
  persistSentiment(sentiment);
}

/** Read-only accessor for HUD / debug surfaces. */
export function getLastSentiment() {
  return lastSentiment;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function pruneOld(now) {
  while (events.length > 0 && now - events[0].t > WINDOW_MS) events.shift();
  for (const [type, t] of seenObjectTypes) if (now - t > WINDOW_MS) seenObjectTypes.delete(type);
}

/** Test seam — reset module state so the smoke can use a clean buffer per case. */
export function _resetForTests() {
  events.length = 0;
  seenObjectTypes.clear();
  firstActionAt = null;
  lastSentiment = null;
  SESSION_START = Date.now();
}
