// tests/smoke-jarvis-comfort.mjs — jARvis comfort-loop web parity gate.
// ─────────────────────────────────────────────────────────────────────────────
// Mirrors the iOS jest contract (src/__tests__/services/rn-jarvis-portals/
// comfortRules.test.ts + comfortLoop.test.ts + comfortRespond.test.ts) so the
// web port stays behaviorally identical. Pure Node — no DOM, no browser.
//
// Run: `node tests/smoke-jarvis-comfort.mjs`
// ─────────────────────────────────────────────────────────────────────────────

import { AgentKB } from '../js/comfort/kb.js';
import { registerComfortRules, extractSentiment } from '../js/comfort/rules.js';
import {
  recordAction, getSignals, comfortLoopTick, getLastSentiment, _resetLoop,
} from '../js/comfort/index.js';
import {
  respondToSentiment, persistSentiment, _resetRespondThrottle,
} from '../js/comfort/respond.js';
import {
  setActive, getActive, clearActive, makeEmptyDoc, _resetForTests as _resetActiveDoc,
} from '../js/comfort/active-doc.js';
import { createComfortHud } from '../js/comfort/comfort-hud.js';

const R = [];
const rec = (n, ok, info = '') => R.push({ name: n, ok, info });

const baseline = { retryRate: 0, cancelRate: 0, timeToFirstActionMs: 0, repeatedNoChangeCount: 0, newEntityTypes: 0 };

function freshKb() {
  const kb = new AgentKB();
  registerComfortRules(kb);
  return kb;
}

// ══ comfortRules — Pattern A (kb rule-eval, behavioral layer) ════════════════
{
  let kb = freshKb();

  // dead-zone (retry 0.2: > flow 0.1, < frustration 0.4) → neutral
  let s = extractSentiment(kb, { ...baseline, retryRate: 0.2 });
  rec('rules: dead-zone → neutral', s.state === 'neutral' && s.source_layer === 'behavioral', `→ ${s.state}`);

  s = extractSentiment(kb, { ...baseline, retryRate: 0.5 });
  rec('rules: high retry → frustration', s.state === 'frustration' && s.valence < 0 && s.arousal > 0.5, `v=${s.valence} a=${s.arousal}`);

  s = extractSentiment(kb, { ...baseline, repeatedNoChangeCount: 4 });
  rec('rules: repeat-no-change → confusion', s.state === 'confusion' && s.valence < 0, `→ ${s.state} v=${s.valence}`);

  s = extractSentiment(kb, { ...baseline, newEntityTypes: 3 });
  rec('rules: new entities → discovery (+valence)', s.state === 'discovery' && s.valence > 0, `→ ${s.state} v=${s.valence}`);

  s = extractSentiment(kb, baseline);
  rec('rules: low-friction baseline → flow|neutral', ['flow', 'neutral'].includes(s.state), `→ ${s.state}`);

  s = extractSentiment(kb, { ...baseline, retryRate: 0.05, cancelRate: 0.02, repeatedNoChangeCount: 1 });
  rec('rules: flow wins when only it fires', s.state === 'flow' && s.valence > 0, `→ ${s.state} v=${s.valence}`);

  // compound-confidence: 0.7 + 0.05 = 0.75 after one success
  kb = freshKb();
  extractSentiment(kb, { ...baseline, retryRate: 0.5 });
  kb.recordRuleOutcome('comfort.frustration.high_retry', true);
  extractSentiment(kb, { ...baseline, retryRate: 0.5 });
  const fired = kb.evaluate();
  const r = fired.find((f) => f.rule.id === 'comfort.frustration.high_retry');
  rec('rules: compound-confidence 0.70→0.75', !!r && Math.abs(r.rule.confidence - 0.75) < 1e-5 && r.rule.hits === 1, `conf=${r?.rule.confidence} hits=${r?.rule.hits}`);
}

// ══ comfortLoop — action stream → signals → tick ═════════════════════════════
{
  const reset = () => { _resetLoop(); _resetActiveDoc(); _resetRespondThrottle(); setActive(makeEmptyDoc()); };

  reset();
  recordAction('ADD_OBJECT', 'cube_1', 'cube');
  recordAction('ADD_OBJECT', 'cube_2', 'cube');
  rec('loop: records actions, same type → newEntityTypes=1', getSignals().newEntityTypes === 1, `n=${getSignals().newEntityTypes}`);

  reset();
  recordAction('ADD_OBJECT', 'cube_1', 'cube');
  recordAction('REMOVE_OBJECT', 'cube_1', 'cube');
  rec('loop: cancel detected (REMOVE within 5s of ADD)', getSignals().cancelRate > 0, `cancel=${getSignals().cancelRate}`);

  reset();
  recordAction('ADD_OBJECT', 'a', 'cube');
  recordAction('ADD_OBJECT', 'b', 'cube');
  recordAction('ADD_OBJECT', 'c', 'cube');
  rec('loop: repeated-no-change ≥3', getSignals().repeatedNoChangeCount >= 3, `rnc=${getSignals().repeatedNoChangeCount}`);

  // tick fires HUD hint when sentiment ≠ neutral; highest-confidence rule wins.
  reset();
  const sent = [];
  const sendBridge = (type, payload) => sent.push({ type, payload });
  const kb = freshKb();
  recordAction('ADD_OBJECT', 'a', 'cube');
  recordAction('ADD_OBJECT', 'b', 'sphere');
  recordAction('ADD_OBJECT', 'c', 'plane');
  comfortLoopTick(kb, sendBridge);
  rec('loop: tick fires 1 jarvis_ui_hint', sent.length === 1 && sent[0].type === 'jarvis_ui_hint', `n=${sent.length}`);
  rec('loop: confusion|discovery hint kind', sent[0] && ['modality_switch', 'silent_particle_burst'].includes(sent[0].payload.kind), `kind=${sent[0]?.payload.kind}`);
  rec('loop: getLastSentiment populated', !!getLastSentiment() && typeof getLastSentiment().state === 'string', `state=${getLastSentiment()?.state}`);
}

// ══ comfortRespond — closed-loop UI hint + XRAI persistence ═══════════════════
{
  const setup = () => { _resetRespondThrottle(); _resetActiveDoc(); };

  setup();
  let kb = freshKb();
  let sent = [];
  const bridge = (type, payload) => sent.push({ type, payload });

  let s = extractSentiment(kb, { ...baseline, retryRate: 0.5 });
  rec('respond: frustration → ghost_hand_demo', respondToSentiment(s, bridge) === true && sent[0]?.payload.kind === 'ghost_hand_demo', `kind=${sent[0]?.payload.kind}`);

  setup(); sent = [];
  s = extractSentiment(kb, { ...baseline, newEntityTypes: 3 });
  rec('respond: discovery → silent_particle_burst', respondToSentiment(s, bridge) === true && sent[0]?.payload.kind === 'silent_particle_burst', `kind=${sent[0]?.payload.kind}`);

  setup(); sent = [];
  s = extractSentiment(kb, { ...baseline, retryRate: 0.2 });
  rec('respond: neutral → no emission', s.state === 'neutral' && respondToSentiment(s, bridge) === false && sent.length === 0, `state=${s.state} n=${sent.length}`);

  setup(); sent = [];
  s = extractSentiment(kb, { ...baseline, retryRate: 0.5 });
  const first = respondToSentiment(s, bridge);
  const second = respondToSentiment(s, bridge); // throttled within 10s
  rec('respond: throttles repeat within 10s', first === true && second === false && sent.length === 1, `n=${sent.length}`);

  setup();
  s = extractSentiment(kb, { ...baseline, retryRate: 0.5 });
  rec('respond: persist false when no active doc', persistSentiment(s) === false, '');

  setup();
  setActive(makeEmptyDoc());
  s = extractSentiment(kb, { ...baseline, retryRate: 0.5 });
  const persisted = persistSentiment(s);
  const entity = getActive()?.scene.entities.find((e) => e.type === 'codon.sentiment');
  rec('respond: persists codon.sentiment entity', persisted === true && !!entity && entity.params?.state === 'frustration' && entity.params?.source_layer === 'behavioral', `state=${entity?.params?.state}`);
  clearActive();
}

// ══ E2E — full subsystem via startComfortLoop path (Node no-DOM HUD) ══════════
{
  _resetLoop(); _resetActiveDoc(); _resetRespondThrottle(); setActive(makeEmptyDoc());
  const kb = freshKb();
  const hud = createComfortHud(); // no document → recording no-op sendBridge

  // Simulate a retry storm: same action+uuid fired fast → high retryRate.
  for (let i = 0; i < 6; i++) recordAction('NUDGE', 'obj_1');
  comfortLoopTick(kb, hud.sendBridge);
  const emitted = hud.emissions.find((e) => e.type === 'jarvis_ui_hint');
  rec('e2e: retry storm → HUD receives a ui_hint', !!emitted, `kind=${emitted?.payload.kind}`);
  rec('e2e: sentiment persisted to active doc', getActive().scene.entities.some((e) => e.type === 'codon.sentiment'), `entities=${getActive().scene.entities.length}`);
  rec('e2e: Node HUD is recording-safe (el null)', hud.el === null && Array.isArray(hud.emissions), '');
}

let pass = 0, fail = 0;
for (const r of R) {
  console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.name.padEnd(48)} · ${r.info}`);
  r.ok ? pass++ : fail++;
}
console.log(`\n${pass}/${pass + fail} jarvis-comfort smoke passed`);
process.exit(fail ? 1 : 0);
