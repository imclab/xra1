// js/voice/stream.js — streaming STT via Web Speech API.
//
// Emits on the shared bus:
//   intent:partial  { transcript, turnId, isFinal: false }
//   intent:final    { transcript, turnId, isFinal: true }
//
// Each new utterance gets a fresh turnId. Interim results stream as
// `intent:partial` so the speculative spawner can react before the user
// finishes speaking. The first interim that yields a confident archetype
// match (see js/intent/local.js) materializes a proxy entity.
//
// Falls back to no-op + warning when SpeechRecognition is unavailable
// (Firefox, Safari pre-iOS-14.5 desktop). Caller can poll `isSupported()`.

import { emit, nextTurnId } from '../world/bus.js';

let _rec = null;
let _running = false;
let _turnId = null;

export function isSupported() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

function build() {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  const r = new Ctor();
  r.continuous = true;
  r.interimResults = true;
  r.lang = (navigator.language || 'en-US');
  r.maxAlternatives = 1;

  r.onresult = (e) => {
    if (!_turnId) _turnId = nextTurnId();
    let interim = '';
    let final = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const res = e.results[i];
      const t = res[0]?.transcript || '';
      if (res.isFinal) final += t;
      else interim += t;
    }
    if (interim) emit('intent:partial', { transcript: interim.trim(), turnId: _turnId, isFinal: false });
    if (final) {
      emit('intent:final', { transcript: final.trim(), turnId: _turnId, isFinal: true });
      _turnId = nextTurnId(); // next utterance starts a new turn
    }
  };

  r.onerror = (e) => {
    emit('voice:error', { error: e.error, message: e.message });
    // 'no-speech' and 'aborted' are routine; restart silently.
    if (_running && (e.error === 'no-speech' || e.error === 'aborted')) {
      setTimeout(() => { try { r.start(); } catch {} }, 250);
    }
  };

  r.onend = () => {
    emit('voice:end', { turnId: _turnId });
    if (_running) { try { r.start(); } catch {} }
  };

  r.onstart = () => emit('voice:start', { turnId: _turnId });

  return r;
}

export function start() {
  if (!isSupported()) {
    emit('voice:error', { error: 'unsupported', message: 'SpeechRecognition not available in this browser.' });
    return false;
  }
  if (_running) return true;
  if (!_rec) _rec = build();
  _turnId = nextTurnId();
  _running = true;
  try { _rec.start(); return true; }
  catch (e) { _running = false; emit('voice:error', { error: 'start_failed', message: String(e) }); return false; }
}

export function stop() {
  _running = false;
  try { _rec && _rec.stop(); } catch {}
}

export function abort() {
  _running = false;
  try { _rec && _rec.abort(); } catch {}
}

export function isRunning() { return _running; }

if (typeof window !== 'undefined') {
  window.__voice = { start, stop, abort, isRunning, isSupported };
}
