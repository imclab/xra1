// xrai · runtimes/jarvis — ambient observer + suggestion engine
// not an adapter (no stage mount). attaches to the host bus and exposes a panel API.
// usage:
//   import { attach, panel } from './jarvis/observer.js';
//   attach(bus);
//   document.body.appendChild(panel());

const PREFS_KEY = 'xrai.jarvis.prefs';
const HISTORY_MAX = 200;

const state = {
  prefs: load(),         // { [adapterId]: count }
  history: [],           // {t, type, payload}
  lastNudgeAt: 0,
  bus: null,
  panelEl: null,
  log: null,
  prefList: null,
  nudgeArea: null,
};

function load(){ try{ return JSON.parse(localStorage.getItem(PREFS_KEY)||'{}'); }catch{ return {}; } }
function save(){ try{ localStorage.setItem(PREFS_KEY, JSON.stringify(state.prefs)); }catch{} }

export function attach(bus){
  state.bus = bus;
  bus.on('*', (type, payload)=> observe(type, payload));
}

function observe(type, payload){
  state.history.push({ t: Date.now(), type, payload });
  if(state.history.length > HISTORY_MAX) state.history.shift();
  if(type === 'adapter.mount' && payload?.id){
    state.prefs[payload.id] = (state.prefs[payload.id]||0) + 1;
    save();
  }
  updatePanel();
  maybeNudge(type, payload);
}

function maybeNudge(type, payload){
  const now = Date.now();
  if(now - state.lastNudgeAt < 8000) return;
  let msg = null;
  if(type === 'gsplat.loaded')      msg = 'splat loaded · open xrai-scene to save provenance?';
  else if(type === 'icosa.mount')   msg = 'GLB in stage · drop into a multiplayer room?';
  else if(type === 'gesture.pinch') msg = 'pinch detected · bind to active adapter?';
  else if(type === 'webrtc.join')   msg = 'room joined · share link in widget panel';
  else if(type === 'xrai.scene')    msg = 'scene loaded · dispatch entities to gsplat?';
  if(msg){ nudge(msg); state.lastNudgeAt = now; }
}

function nudge(text){
  if(!state.nudgeArea) return;
  const t = document.createElement('div');
  t.textContent = '◉ ' + text;
  t.style.cssText = `
    background:rgba(127,255,228,.08);border:1px solid rgba(127,255,228,.4);
    color:#7fffe4;padding:6px 10px;margin-top:6px;
    font:500 10px/1.4 'JetBrains Mono',monospace;letter-spacing:.04em;
    animation:jarvis-fade .4s ease-out;cursor:pointer`;
  t.onclick = ()=> t.remove();
  state.nudgeArea.prepend(t);
  while(state.nudgeArea.children.length > 4) state.nudgeArea.lastChild.remove();
  setTimeout(()=> t.style.opacity = '.4', 12000);
}

export function panel(){
  if(state.panelEl) return state.panelEl;
  const el = document.createElement('div');
  el.id = 'jarvis-panel';
  el.style.cssText = `
    display:flex;flex-direction:column;gap:8px;
    background:#0d0c0a;border:1px solid #211e18;padding:10px 12px;
    font:500 10px/1.3 'JetBrains Mono',ui-monospace,monospace;color:#f4ecd8;
    min-width:240px;max-width:320px;max-height:100%;overflow:hidden`;
  el.innerHTML = `
    <style>@keyframes jarvis-fade{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}</style>
    <div style="display:flex;align-items:center;gap:8px;color:#ffb000;text-transform:uppercase;letter-spacing:.22em;font-size:9px;padding-bottom:6px;border-bottom:1px solid #211e18">
      <span style="display:inline-block;width:6px;height:6px;background:#62ff7a;border-radius:50%;box-shadow:0 0 8px #62ff7a"></span>
      jarvis · ambient
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:9px">
      <div><div style="opacity:.5;text-transform:uppercase;letter-spacing:.18em">health</div><div id="jv-health" style="color:#62ff7a">nominal</div></div>
      <div><div style="opacity:.5;text-transform:uppercase;letter-spacing:.18em">model</div><div id="jv-model" style="color:#7fffe4">local</div></div>
      <div><div style="opacity:.5;text-transform:uppercase;letter-spacing:.18em">events</div><div id="jv-evt" style="color:#ffb000">0</div></div>
      <div><div style="opacity:.5;text-transform:uppercase;letter-spacing:.18em">tick</div><div id="jv-tick" style="color:#c9b3ff">—</div></div>
    </div>
    <div>
      <div style="opacity:.5;text-transform:uppercase;letter-spacing:.18em;font-size:9px;margin-bottom:4px">top adapters</div>
      <ol id="jv-prefs" style="margin:0;padding-left:18px;font-size:10px;line-height:1.4"></ol>
    </div>
    <div>
      <div style="opacity:.5;text-transform:uppercase;letter-spacing:.18em;font-size:9px;margin-bottom:4px">subagents · skills · tools</div>
      <div style="display:flex;gap:4px;flex-wrap:wrap;font-size:9px">
        <span style="background:#1a1813;color:#ffb000;padding:2px 5px;border:1px solid #2a2519">Explore</span>
        <span style="background:#1a1813;color:#ffb000;padding:2px 5px;border:1px solid #2a2519">Plan</span>
        <span style="background:#1a1813;color:#7fffe4;padding:2px 5px;border:1px solid #2a2519">UnityMCP</span>
        <span style="background:#1a1813;color:#7fffe4;padding:2px 5px;border:1px solid #2a2519">context7</span>
        <span style="background:#1a1813;color:#c9b3ff;padding:2px 5px;border:1px solid #2a2519">MemPalace</span>
      </div>
    </div>
    <div style="flex:1;min-height:80px;overflow-y:auto;border-top:1px solid #211e18;padding-top:6px">
      <div id="jv-nudge"></div>
      <div id="jv-log" style="font:300 9px/1.4 'JetBrains Mono',monospace;color:#5a5240;margin-top:6px"></div>
    </div>`;
  state.panelEl = el;
  state.log = el.querySelector('#jv-log');
  state.prefList = el.querySelector('#jv-prefs');
  state.nudgeArea = el.querySelector('#jv-nudge');
  setInterval(()=>{
    el.querySelector('#jv-tick').textContent = new Date().toISOString().slice(11,19);
  }, 1000);
  updatePanel();
  return el;
}

function updatePanel(){
  if(!state.panelEl) return;
  state.panelEl.querySelector('#jv-evt').textContent = state.history.length;
  const top = Object.entries(state.prefs).sort((a,b)=>b[1]-a[1]).slice(0,5);
  state.prefList.innerHTML = top.length
    ? top.map(([k,v])=>`<li><span style="color:#ffb000">${k}</span> <span style="opacity:.6">×${v}</span></li>`).join('')
    : '<li style="opacity:.5;list-style:none;padding-left:0">—</li>';
  const last = state.history.slice(-6).reverse();
  state.log.innerHTML = last.map(h=>{
    const ts = new Date(h.t).toISOString().slice(11,19);
    return `<div>${ts} <span style="color:#7fffe4">${h.type}</span></div>`;
  }).join('');
}

export function getStats(){
  return {
    events: state.history.length,
    prefs: { ...state.prefs },
    lastTypes: state.history.slice(-10).map(h=>h.type),
  };
}
