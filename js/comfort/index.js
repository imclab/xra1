// js/comfort/index.js — jARvis comfort-loop web subsystem (public barrel).
// ─────────────────────────────────────────────────────────────────────────────
// Web parity port of iOS src/services/rn-jarvis/portals/ comfort loop.
// Spec 029 §Adaptive Intent-Sensing. Closes the iOS↔web MVP-parity gap (WEB-08).
//
// Quick start (browser):
//   import { startComfortLoop, recordAction } from './js/comfort/index.js';
//   const loop = startComfortLoop();              // mounts HUD + ticks every 10s
//   recordAction('ADD_OBJECT', 'cube_1', 'cube'); // wire into your event stream
//   // …later: loop.stop();
// ─────────────────────────────────────────────────────────────────────────────

export { AgentKB } from './kb.js';
export { COMFORT_RULES, registerComfortRules, extractSentiment } from './rules.js';
export {
  recordAction, getSignals, comfortLoopTick, getLastSentiment,
  _resetForTests as _resetLoop,
} from './loop.js';
export {
  respondToSentiment, persistSentiment, UI_HINT_BY_STATE,
  _resetRespondThrottle,
} from './respond.js';
export {
  setActive, getActive, clearActive, applyDelta, makeEmptyDoc, hydrateFromStorage,
  _resetForTests as _resetActiveDoc,
} from './active-doc.js';
export { createComfortHud } from './comfort-hud.js';

import { AgentKB } from './kb.js';
import { registerComfortRules } from './rules.js';
import { comfortLoopTick } from './loop.js';
import { setActive, getActive, makeEmptyDoc } from './active-doc.js';
import { createComfortHud } from './comfort-hud.js';

/**
 * Wire the whole subsystem and start ticking: KB + rules + HUD + active doc.
 * @param {{ intervalMs?: number, mount?: HTMLElement, kb?: AgentKB }} [opts]
 * @returns {{ kb: AgentKB, hud: ReturnType<typeof createComfortHud>, tick: ()=>void, stop: ()=>void }}
 */
export function startComfortLoop(opts = {}) {
  const kb = opts.kb || new AgentKB();
  registerComfortRules(kb);
  if (!getActive()) setActive(makeEmptyDoc());

  const hud = createComfortHud({ mount: opts.mount });
  const tick = () => comfortLoopTick(kb, hud.sendBridge);

  const intervalMs = opts.intervalMs ?? 10_000;
  let timer = null;
  if (typeof setInterval !== 'undefined' && intervalMs > 0) {
    timer = setInterval(tick, intervalMs);
  }

  return {
    kb,
    hud,
    tick,
    stop() {
      if (timer) clearInterval(timer);
      hud.destroy();
    },
  };
}
