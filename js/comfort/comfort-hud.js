// js/comfort/comfort-hud.js — the web sentiment-response surface.
// ─────────────────────────────────────────────────────────────────────────────
// iOS fires `jarvis_ui_hint` at Unity (ghost-hand demo, particle burst, modality
// switch, chrome-suppress, gentle-ack). The web needs an equivalent receiver for
// TRUE parity — otherwise respondToSentiment fires into a void. This is it.
//
// One distinct, brand-native intervention per sentiment state. No generic
// toasts, no rounded cards, no drop-shadow blobs:
//   frustration → ghost_hand_demo     · edge-red assist + a tracing ghost cursor
//   confusion   → modality_switch      · amber alt-input rail slides in
//   discovery   → silent_particle_burst· iris-green burst from the reticle
//   flow        → suppress_chrome      · accent-glow minimal; dims page chrome
//   delight     → gentle_ack           · periwinkle pulse + check
//
// Design language mirrors handoff #20 viewer HUD: JetBrains Mono micro-labels,
// scan-line, corner brackets, 2px-sharp corners, brand tokens from brand.css
// (with literal fallbacks so it stands alone). Node-safe: with no `document`,
// createComfortHud returns a no-op sendBridge that records emissions for tests.
// ─────────────────────────────────────────────────────────────────────────────

const BRAND = {
  bg: '#000000',
  fg: '#FFFFFF',
  accent: '#F7FFA8',       // iris-glow
  secondary: '#A8A8FF',    // periwinkle (delight)
  green: '#2ecc71',        // iris-hand (discovery)
  amber: '#f39c12',        // (confusion)
  red: '#e74c3c',          // sem-edge (frustration)
  mono: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
};

const STATE_THEME = {
  frustration: { color: BRAND.red,       label: 'I SEE FRICTION',  glyph: '⌖', verb: 'let me show you' },
  confusion:   { color: BRAND.amber,     label: 'STUCK?',          glyph: '⊞', verb: 'try another way' },
  discovery:   { color: BRAND.green,     label: 'NICE FIND',       glyph: '✦', verb: 'keep exploring' },
  flow:        { color: BRAND.accent,    label: 'IN FLOW',         glyph: '∿', verb: 'staying out of your way' },
  delight:     { color: BRAND.secondary, label: 'LOVE THAT',       glyph: '◈', verb: '' },
};

const STYLE_ID = 'cmf-style';

function injectStyleOnce() {
  if (document.getElementById(STYLE_ID)) return;
  const css = `
.cmf-hud{position:fixed;right:20px;bottom:20px;z-index:2147483600;width:min(320px,calc(100vw - 40px));
  font-family:${BRAND.mono};color:${BRAND.fg};pointer-events:none;opacity:0;transform:translateY(8px);
  transition:opacity .32s ${BRAND.ease},transform .32s ${BRAND.ease}}
.cmf-hud.cmf-show{opacity:1;transform:translateY(0)}
.cmf-card{position:relative;background:rgba(0,0,0,.985);border:1px solid var(--cmf-c,${BRAND.accent});
  border-radius:2px;padding:14px 16px;overflow:hidden;box-shadow:0 0 24px -6px var(--cmf-c,${BRAND.accent})}
.cmf-card::before,.cmf-card::after{content:'';position:absolute;width:10px;height:10px;border:1px solid var(--cmf-c,${BRAND.accent})}
.cmf-card::before{top:-1px;left:-1px;border-right:0;border-bottom:0}
.cmf-card::after{bottom:-1px;right:-1px;border-left:0;border-top:0}
.cmf-scan{position:absolute;inset:0;pointer-events:none;opacity:.5;
  background:linear-gradient(transparent,rgba(255,255,255,.025) 50%,transparent);background-size:100% 4px;
  animation:cmf-scan 6s linear infinite}
@keyframes cmf-scan{to{background-position:0 -120px}}
.cmf-row{display:flex;align-items:center;gap:10px}
.cmf-glyph{font-size:22px;line-height:1;color:var(--cmf-c,${BRAND.accent});filter:drop-shadow(0 0 6px var(--cmf-c,${BRAND.accent}))}
.cmf-label{font-size:10px;letter-spacing:.22em;font-weight:700;color:var(--cmf-c,${BRAND.accent})}
.cmf-verb{font-size:13px;color:${BRAND.fg};margin-top:2px;letter-spacing:.01em}
.cmf-meter{height:2px;margin-top:10px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden}
.cmf-meter>i{display:block;height:100%;width:var(--cmf-conf,50%);background:var(--cmf-c,${BRAND.accent});
  transition:width .4s ${BRAND.ease}}
.cmf-foot{display:flex;justify-content:space-between;margin-top:8px;font-size:9px;letter-spacing:.14em;color:#666}
/* confusion: alternate-input rail */
.cmf-rail{display:flex;gap:6px;margin-top:10px}
.cmf-chip{flex:1;text-align:center;font-size:10px;letter-spacing:.12em;padding:6px 0;border:1px solid var(--cmf-c,${BRAND.amber});
  color:var(--cmf-c,${BRAND.amber});border-radius:2px;opacity:0;transform:translateY(6px);animation:cmf-chip .4s ${BRAND.ease} forwards}
.cmf-chip:nth-child(2){animation-delay:.07s}.cmf-chip:nth-child(3){animation-delay:.14s}
@keyframes cmf-chip{to{opacity:1;transform:translateY(0)}}
/* ghost cursor (frustration) */
.cmf-ghost{position:fixed;width:18px;height:18px;border:2px solid ${BRAND.red};border-radius:50%;
  left:0;top:0;z-index:2147483601;pointer-events:none;opacity:0;
  box-shadow:0 0 12px ${BRAND.red};animation:cmf-ghost 2.4s ${BRAND.ease} forwards}
@keyframes cmf-ghost{0%{opacity:0}12%{opacity:.9}80%{opacity:.9}100%{opacity:0}}
/* discovery burst canvas */
.cmf-burst{position:fixed;right:20px;bottom:20px;width:240px;height:160px;z-index:2147483599;pointer-events:none}
/* flow: page-chrome suppression */
body.cmf-flow header,body.cmf-flow nav,body.cmf-flow .topnav,body.cmf-flow footer{
  transition:opacity .6s ${BRAND.ease};opacity:.28}
@media (prefers-reduced-motion:reduce){.cmf-scan,.cmf-ghost{animation:none}}
`;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = css;
  document.head.appendChild(el);
}

function discoveryBurst(color) {
  const c = document.createElement('canvas');
  c.className = 'cmf-burst';
  c.width = 240; c.height = 160;
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  const N = 36;
  const ox = 200, oy = 130; // near the reticle / HUD corner
  const parts = Array.from({ length: N }, () => {
    const a = Math.random() * Math.PI * 2;
    const sp = 1.5 + Math.random() * 3.5;
    return { x: ox, y: oy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1, life: 1 };
  });
  let raf = 0;
  const t0 = Date.now();
  const tick = () => {
    ctx.clearRect(0, 0, 240, 160);
    let alive = false;
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life -= 0.018;
      if (p.life <= 0) continue;
      alive = true;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = color;
      ctx.fillRect(p.x, p.y, 2, 2);
    }
    if (alive && Date.now() - t0 < 2000) raf = requestAnimationFrame(tick);
    else { cancelAnimationFrame(raf); c.remove(); }
  };
  tick();
}

function ghostTrace() {
  const g = document.createElement('div');
  g.className = 'cmf-ghost';
  document.body.appendChild(g);
  const startX = window.innerWidth - 200, startY = window.innerHeight - 160;
  const endX = window.innerWidth / 2, endY = window.innerHeight / 2;
  const t0 = Date.now();
  const dur = 1900;
  const step = () => {
    const k = Math.min(1, (Date.now() - t0) / dur);
    const e = 1 - Math.pow(1 - k, 3); // easeOutCubic
    g.style.transform = `translate(${startX + (endX - startX) * e}px, ${startY + (endY - startY) * e}px)`;
    if (k < 1) requestAnimationFrame(step);
    else setTimeout(() => g.remove(), 600);
  };
  step();
}

/**
 * Create a comfort HUD bound to the page. Returns a `sendBridge` compatible with
 * respondToSentiment, plus the root element and a destroy().
 * @param {{ mount?: HTMLElement }} [opts]
 * @returns {{ sendBridge: (type:string, payload:Record<string,unknown>)=>void, el: HTMLElement|null, destroy: ()=>void, emissions: any[] }}
 */
export function createComfortHud(opts = {}) {
  const emissions = []; // always recorded — the test/Node path reads these

  // Node / SSR: no DOM. Return a recording no-op so the loop still runs + parity
  // holds in the smoke (it asserts on emissions, not pixels).
  if (typeof document === 'undefined') {
    return { sendBridge: (type, payload) => emissions.push({ type, payload }), el: null, destroy() {}, emissions };
  }

  injectStyleOnce();
  const mount = opts.mount || document.body;
  const hud = document.createElement('div');
  hud.className = 'cmf-hud';
  hud.setAttribute('role', 'status');
  hud.setAttribute('aria-live', 'polite');
  mount.appendChild(hud);

  let hideTimer = 0;

  const render = (payload) => {
    const theme = STATE_THEME[payload.state];
    if (!theme) return;
    const conf = Math.round((payload.confidence ?? 0.5) * 100);

    // flow = suppress chrome (calm), not a loud card.
    if (payload.kind === 'suppress_chrome') {
      document.body.classList.add('cmf-flow');
      clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => document.body.classList.remove('cmf-flow'), 8000);
    } else {
      document.body.classList.remove('cmf-flow');
    }

    const railHtml = payload.kind === 'modality_switch'
      ? `<div class="cmf-rail"><div class="cmf-chip">VOICE</div><div class="cmf-chip">TYPE</div><div class="cmf-chip">TAP</div></div>`
      : '';

    hud.style.setProperty('--cmf-c', theme.color);
    hud.style.setProperty('--cmf-conf', conf + '%');
    hud.innerHTML = `
      <div class="cmf-card">
        <div class="cmf-scan"></div>
        <div class="cmf-row">
          <span class="cmf-glyph">${theme.glyph}</span>
          <div>
            <div class="cmf-label">${theme.label}</div>
            ${theme.verb ? `<div class="cmf-verb">jARvis — ${theme.verb}</div>` : ''}
          </div>
        </div>
        ${railHtml}
        <div class="cmf-meter"><i></i></div>
        <div class="cmf-foot"><span>${String(payload.state).toUpperCase()}</span><span>CONF ${conf}%</span></div>
      </div>`;
    hud.classList.add('cmf-show');

    if (payload.kind === 'silent_particle_burst') discoveryBurst(theme.color);
    if (payload.kind === 'ghost_hand_demo') ghostTrace();

    clearTimeout(hideTimer);
    // flow stays subtle (chrome handled above); others auto-dismiss.
    if (payload.kind !== 'suppress_chrome') {
      hideTimer = window.setTimeout(() => hud.classList.remove('cmf-show'), 5200);
    }
  };

  const sendBridge = (type, payload) => {
    emissions.push({ type, payload });
    if (type === 'jarvis_ui_hint') render(payload);
  };

  return {
    sendBridge,
    el: hud,
    emissions,
    destroy() {
      clearTimeout(hideTimer);
      hud.remove();
      document.body.classList.remove('cmf-flow');
    },
  };
}
