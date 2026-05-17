// xrai · runtimes/jarvis — full dashboard adapter (health/models/stats/benchmarks/subagents/skills/tools)
// also exposes the node-graph wire editor for hot-swapping the active adapter pipeline
// contract: { mount(stage, scene, ctx), unmount(), onEvent(cb) }

import { getStats, panel as miniPanel } from './observer.js';

let host = null, ctxRef = null, onEv = null, raf = 0;

export const id   = 'jarvis';
export const meta = { dashboard:true };

const MODELS = [
  { id:'claude-opus-4-7',     name:'Claude Opus 4.7',  vendor:'Anthropic', mmlu:88.7, ctx:'200K', local:false },
  { id:'claude-sonnet-4-6',   name:'Sonnet 4.6',       vendor:'Anthropic', mmlu:86.1, ctx:'200K', local:false },
  { id:'claude-haiku-4-5',    name:'Haiku 4.5',        vendor:'Anthropic', mmlu:79.3, ctx:'200K', local:false },
  { id:'gemini-2.5-pro',      name:'Gemini 2.5 Pro',   vendor:'Google',    mmlu:85.9, ctx:'2M',   local:false },
  { id:'gpt-5',               name:'GPT-5',            vendor:'OpenAI',    mmlu:87.4, ctx:'400K', local:false },
  { id:'llama-3.3-70b',       name:'Llama 3.3 70B',    vendor:'Meta',      mmlu:82.0, ctx:'128K', local:true  },
  { id:'qwen-3-coder-32b',    name:'Qwen3-Coder 32B',  vendor:'Alibaba',   mmlu:80.5, ctx:'256K', local:true  },
  { id:'gemma-3-27b',         name:'Gemma 3 27B',      vendor:'Google',    mmlu:75.2, ctx:'128K', local:true  },
];

const TOOLS = [
  { id:'Read', kind:'fs' }, { id:'Write', kind:'fs' }, { id:'Edit', kind:'fs' },
  { id:'Bash', kind:'shell' }, { id:'Grep', kind:'search' }, { id:'Glob', kind:'search' },
  { id:'WebFetch', kind:'net' }, { id:'WebSearch', kind:'net' },
  { id:'UnityMCP', kind:'mcp' }, { id:'context7', kind:'mcp' }, { id:'MemPalace', kind:'mcp' }, { id:'Gmail', kind:'mcp' },
];

const SUBAGENTS = [
  { id:'Explore',           use:'codebase search' },
  { id:'Plan',              use:'architect plans' },
  { id:'general-purpose',   use:'multi-step research' },
  { id:'caveman-builder',   use:'surgical 1-2 file edits' },
  { id:'caveman-investigator', use:'read-only locate' },
  { id:'caveman-reviewer',  use:'diff review' },
  { id:'claude-code-guide', use:'Claude Code Q&A' },
];

const SKILLS = [
  'frontend-design', 'auto-memory', 'caveman-mode', 'token-discipline',
  'asset-type-decision', 'stuck-loop-resolution', 'arkit-vfx-debug',
  'setup-live-arkit', 'wrap-up', 'smoke',
];

export function mount(stage, scene, ctx = {}){
  ctxRef = ctx;
  host = document.createElement('div');
  host.style.cssText = `
    position:absolute;inset:0;background:#0a0908;color:#f4ecd8;
    display:grid;grid-template-rows:auto 1fr;overflow:hidden`;
  stage.appendChild(host);

  const bar = document.createElement('div');
  bar.style.cssText = `
    display:flex;gap:8px;align-items:center;padding:8px 12px;border-bottom:1px solid #211e18;
    font:500 10px/1 'JetBrains Mono',ui-monospace,monospace;color:#ffb000;
    text-transform:uppercase;letter-spacing:.22em;background:#0d0c0a`;
  bar.innerHTML = `
    <span style="display:inline-block;width:6px;height:6px;background:#62ff7a;border-radius:50%;box-shadow:0 0 6px #62ff7a"></span>
    jarvis · dashboard
    <span style="opacity:.4">|</span>
    <button data-tab="overview"  class="jv-tab" style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:4px 10px;cursor:pointer">overview</button>
    <button data-tab="models"    class="jv-tab" style="background:transparent;color:#ffb000;border:1px solid #3a3022;font:inherit;padding:4px 10px;cursor:pointer">models</button>
    <button data-tab="tools"     class="jv-tab" style="background:transparent;color:#ffb000;border:1px solid #3a3022;font:inherit;padding:4px 10px;cursor:pointer">tools</button>
    <button data-tab="agents"    class="jv-tab" style="background:transparent;color:#ffb000;border:1px solid #3a3022;font:inherit;padding:4px 10px;cursor:pointer">agents</button>
    <button data-tab="skills"    class="jv-tab" style="background:transparent;color:#ffb000;border:1px solid #3a3022;font:inherit;padding:4px 10px;cursor:pointer">skills</button>
    <button data-tab="bench"     class="jv-tab" style="background:transparent;color:#ffb000;border:1px solid #3a3022;font:inherit;padding:4px 10px;cursor:pointer">benchmarks</button>
    <button data-tab="wires"     class="jv-tab" style="background:transparent;color:#7fffe4;border:1px solid #2a4a44;font:inherit;padding:4px 10px;cursor:pointer">◆ wires</button>
    <span id="jv-ping" style="margin-left:auto;color:#62ff7a">●</span>
    <span style="opacity:.5">heap <span id="jv-heap">—</span></span>`;
  host.appendChild(bar);

  const body = document.createElement('div');
  body.id = 'jv-body';
  body.style.cssText = 'overflow:auto;padding:16px;min-height:0';
  host.appendChild(body);

  const tabs = {
    overview: renderOverview,
    models:   renderModels,
    tools:    renderTools,
    agents:   renderAgents,
    skills:   renderSkills,
    bench:    renderBench,
    wires:    renderWires,
  };

  function selectTab(name){
    host.querySelectorAll('.jv-tab').forEach(b=>{
      const active = b.dataset.tab === name;
      const accent = b.dataset.tab === 'wires' ? '#7fffe4' : '#ffb000';
      b.style.background = active ? accent : 'transparent';
      b.style.color      = active ? '#0d0c0a' : accent;
    });
    body.innerHTML = '';
    body.appendChild(tabs[name]());
  }
  host.querySelectorAll('.jv-tab').forEach(b=> b.onclick = ()=> selectTab(b.dataset.tab));
  selectTab('overview');

  // heap meter
  function tick(){
    raf = requestAnimationFrame(tick);
    const m = performance.memory;
    if(m) host.querySelector('#jv-heap').textContent = (m.usedJSHeapSize/1048576).toFixed(0)+' MB';
  }
  tick();
}

// ---------- tabs ----------
function renderOverview(){
  const stats = getStats();
  const el = document.createElement('div');
  el.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px';
  el.innerHTML = `
    ${card('health', '<span style="color:#62ff7a">● nominal</span>', '<div style="opacity:.6;margin-top:4px">all relays warm · 0 errors</div>')}
    ${card('events observed', `<span style="color:#ffb000;font-size:28px;font-weight:700">${stats.events}</span>`)}
    ${card('top adapter prefs', Object.entries(stats.prefs).sort((a,b)=>b[1]-a[1]).slice(0,3)
      .map(([k,v])=>`<div><span style="color:#ffb000">${k}</span> <span style="opacity:.6">×${v}</span></div>`).join('') || '<div style="opacity:.5">no usage yet</div>')}
    ${card('last events', stats.lastTypes.slice().reverse().map(t=>`<div style="color:#7fffe4">${t}</div>`).join('') || '<div style="opacity:.5">—</div>')}
    ${card('models · active', `<span style="color:#7fffe4">claude-opus-4-7</span> <span style="opacity:.6">(MMLU 88.7)</span>`,
      `<div style="opacity:.6;margin-top:4px">${MODELS.filter(m=>m.local).length} local · ${MODELS.filter(m=>!m.local).length} cloud</div>`)}
    ${card('subagents', SUBAGENTS.map(a=>`<span style="display:inline-block;background:#1a1813;border:1px solid #2a2519;color:#ffb000;padding:2px 6px;margin:2px;font-size:10px">${a.id}</span>`).join(''))}
    ${card('skills', SKILLS.slice(0,8).map(s=>`<span style="display:inline-block;background:#1a1813;border:1px solid #2a2519;color:#c9b3ff;padding:2px 6px;margin:2px;font-size:10px">${s}</span>`).join(''))}
    ${card('tools · mcp', TOOLS.map(t=>`<span style="display:inline-block;background:#1a1813;border:1px solid #2a2519;color:${kindColor(t.kind)};padding:2px 6px;margin:2px;font-size:10px">${t.id}</span>`).join(''))}`;
  return el;
}

function kindColor(k){ return { fs:'#ffb000', shell:'#ff7fa9', search:'#62ff7a', net:'#7fffe4', mcp:'#c9b3ff' }[k] || '#f4ecd8'; }

function card(title, body, sub=''){
  return `<div style="background:#0d0c0a;border:1px solid #211e18;padding:12px 14px">
    <div style="font:500 9px/1 'JetBrains Mono',monospace;color:#ffb000;text-transform:uppercase;letter-spacing:.22em;margin-bottom:8px">${title}</div>
    <div style="font:400 12px/1.5 'JetBrains Mono',monospace;color:#f4ecd8">${body}</div>
    ${sub}
  </div>`;
}

function renderModels(){
  const el = document.createElement('div');
  el.innerHTML = `
    <table style="width:100%;border-collapse:collapse;font:400 11px/1.4 'JetBrains Mono',monospace">
      <thead><tr style="color:#ffb000;text-transform:uppercase;letter-spacing:.18em;font-size:9px;text-align:left">
        <th style="padding:6px 8px;border-bottom:1px solid #3a3022">id</th>
        <th style="padding:6px 8px;border-bottom:1px solid #3a3022">vendor</th>
        <th style="padding:6px 8px;border-bottom:1px solid #3a3022">mmlu</th>
        <th style="padding:6px 8px;border-bottom:1px solid #3a3022">ctx</th>
        <th style="padding:6px 8px;border-bottom:1px solid #3a3022">where</th>
      </tr></thead>
      <tbody>${MODELS.map(m=>`
        <tr><td style="padding:6px 8px;border-bottom:1px solid #1a1813;color:#f4ecd8">${m.id}</td>
            <td style="padding:6px 8px;border-bottom:1px solid #1a1813;color:#8a826f">${m.vendor}</td>
            <td style="padding:6px 8px;border-bottom:1px solid #1a1813;color:#ffb000">${bar01(m.mmlu/100)} ${m.mmlu}</td>
            <td style="padding:6px 8px;border-bottom:1px solid #1a1813;color:#7fffe4">${m.ctx}</td>
            <td style="padding:6px 8px;border-bottom:1px solid #1a1813;color:${m.local?'#62ff7a':'#c9b3ff'}">${m.local?'local':'cloud'}</td></tr>`).join('')}
      </tbody></table>`;
  return el;
}

function bar01(v){
  const filled = Math.round(v*12);
  return '<span style="color:#ffb000">'+'■'.repeat(filled)+'</span>'+'<span style="color:#3a3022">'+'·'.repeat(12-filled)+'</span>';
}

function renderTools(){
  const el = document.createElement('div');
  el.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px';
  el.innerHTML = TOOLS.map(t=>`
    <div style="background:#0d0c0a;border:1px solid ${kindColor(t.kind)}40;padding:10px;display:flex;flex-direction:column;gap:4px">
      <div style="color:${kindColor(t.kind)};font:500 11px/1 'JetBrains Mono',monospace">${t.id}</div>
      <div style="color:#8a826f;font:300 9px/1 'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.18em">${t.kind}</div>
    </div>`).join('');
  return el;
}

function renderAgents(){
  const el = document.createElement('div');
  el.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px';
  el.innerHTML = SUBAGENTS.map(a=>`
    <div style="background:#0d0c0a;border:1px solid #211e18;padding:12px">
      <div style="color:#ffb000;font:500 12px/1 'JetBrains Mono',monospace">${a.id}</div>
      <div style="color:#8a826f;font:300 10px/1.4 'JetBrains Mono',monospace;margin-top:6px">${a.use}</div>
    </div>`).join('');
  return el;
}

function renderSkills(){
  const el = document.createElement('div');
  el.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px';
  el.innerHTML = SKILLS.map(s=>`
    <span style="background:#0d0c0a;border:1px solid #2a2519;color:#c9b3ff;padding:6px 10px;font:500 11px/1 'JetBrains Mono',monospace">/${s}</span>`).join('');
  return el;
}

function renderBench(){
  const el = document.createElement('div');
  el.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:12px';
  el.innerHTML = `
    <div style="background:#0d0c0a;border:1px solid #211e18;padding:14px">
      <div style="color:#ffb000;font:500 10px/1 'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.22em;margin-bottom:10px">model · MMLU</div>
      ${MODELS.map(m=>`
        <div style="display:grid;grid-template-columns:140px 1fr 40px;gap:8px;align-items:center;margin:4px 0">
          <span style="color:#f4ecd8;font:400 10px/1 'JetBrains Mono',monospace">${m.id.slice(0,18)}</span>
          <div style="height:6px;background:#1a1813"><div style="height:100%;width:${m.mmlu}%;background:linear-gradient(90deg,#ffb000,#ff7fa9)"></div></div>
          <span style="color:#ffb000;font:400 10px/1 'JetBrains Mono',monospace;text-align:right">${m.mmlu}</span>
        </div>`).join('')}
    </div>
    <div style="background:#0d0c0a;border:1px solid #211e18;padding:14px">
      <div style="color:#7fffe4;font:500 10px/1 'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.22em;margin-bottom:10px">runtime · adapter latency</div>
      <div style="color:#8a826f;font:300 10px/1.5 'JetBrains Mono',monospace">cold-mount p50/p95 (ms)</div>
      ${[['gsplat',420,1100],['icosa',180,560],['supasplat',90,260],['rerun',60,180],['needle/webrtc',310,820],['xrai-scene',40,120],['gesture',1200,2400]]
        .map(([k,p50,p95])=>`
        <div style="display:grid;grid-template-columns:120px 1fr 60px 60px;gap:8px;align-items:center;margin:4px 0">
          <span style="color:#f4ecd8;font:400 10px/1 'JetBrains Mono',monospace">${k}</span>
          <div style="height:6px;background:#1a1813"><div style="height:100%;width:${Math.min(100,p95/30)}%;background:linear-gradient(90deg,#7fffe4,#c9b3ff)"></div></div>
          <span style="color:#7fffe4;font:400 9px/1 'JetBrains Mono',monospace;text-align:right">${p50}</span>
          <span style="color:#c9b3ff;font:400 9px/1 'JetBrains Mono',monospace;text-align:right">${p95}</span>
        </div>`).join('')}
    </div>`;
  return el;
}

// ---------- wire / node-graph editor ----------
function renderWires(){
  const el = document.createElement('div');
  el.style.cssText = 'display:grid;grid-template-rows:auto 1fr auto;gap:8px;height:100%;min-height:480px';
  const bus = ctxRef?.bus;
  const registry = (ctxRef?.registry || []);

  const head = document.createElement('div');
  head.innerHTML = `
    <div style="color:#7fffe4;font:500 10px/1 'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.22em;margin-bottom:6px">node graph · hot-swap pipeline</div>
    <div style="color:#8a826f;font:300 10px/1.4 'JetBrains Mono',monospace">drag adapters into the canvas · wire ports · click a node to hot-mount it as the active stage</div>`;
  el.appendChild(head);

  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:grid;grid-template-columns:180px 1fr;gap:1px;background:#211e18;min-height:0';

  const palette = document.createElement('div');
  palette.style.cssText = 'background:#0a0908;padding:8px;display:flex;flex-direction:column;gap:6px;overflow-y:auto';
  palette.innerHTML = `<div style="color:#ffb000;font:500 9px/1 'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.22em;margin-bottom:4px">palette</div>`;
  registry.forEach(r=>{
    const b = document.createElement('button');
    b.textContent = r.id;
    b.draggable = true;
    b.style.cssText = `background:#0d0c0a;color:#ffb000;border:1px solid #3a3022;
      font:500 11px/1 'JetBrains Mono',monospace;padding:6px 8px;cursor:grab;text-align:left`;
    b.addEventListener('dragstart', e=> e.dataTransfer.setData('text/plain', r.id));
    palette.appendChild(b);
  });

  const canvas = document.createElement('div');
  canvas.style.cssText = 'position:relative;background:#050403;overflow:hidden;background-image:radial-gradient(rgba(255,176,0,.08) 1px,transparent 1px);background-size:24px 24px';
  canvas.addEventListener('dragover', e=> e.preventDefault());
  canvas.addEventListener('drop', e=>{
    e.preventDefault();
    const aid = e.dataTransfer.getData('text/plain'); if(!aid) return;
    const rect = canvas.getBoundingClientRect();
    addNode(aid, e.clientX - rect.left - 60, e.clientY - rect.top - 20);
  });

  // edge layer (SVG)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('style','position:absolute;inset:0;width:100%;height:100%;pointer-events:none');
  canvas.appendChild(svg);

  const nodes = [];
  const edges = [];
  let connectFrom = null;

  function addNode(aid, x, y){
    const n = { id: aid+'#'+Date.now().toString(36), aid, x, y };
    nodes.push(n);
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;left:${x}px;top:${y}px;
      background:#0d0c0a;border:1px solid #ffb000;min-width:120px;
      font:500 10px/1 'JetBrains Mono',monospace;color:#ffb000;cursor:move;user-select:none`;
    el.innerHTML = `
      <div style="padding:6px 8px;border-bottom:1px solid #3a3022;display:flex;justify-content:space-between;align-items:center">
        <span>${aid}</span>
        <button class="nd-x" style="background:transparent;color:#ff3b3b;border:0;font:inherit;cursor:pointer">×</button>
      </div>
      <div style="display:flex;justify-content:space-between;padding:4px 4px">
        <span class="nd-in"  title="in"  style="display:inline-block;width:10px;height:10px;background:#7fffe4;cursor:crosshair"></span>
        <span class="nd-mt"  title="mount" style="color:#62ff7a;cursor:pointer;font-size:9px;text-transform:uppercase;letter-spacing:.18em">▶ mount</span>
        <span class="nd-out" title="out" style="display:inline-block;width:10px;height:10px;background:#ffb000;cursor:crosshair"></span>
      </div>`;
    canvas.appendChild(el);
    n.el = el;

    // drag
    let dx=0, dy=0, dragging=false;
    el.addEventListener('pointerdown', e=>{
      if(e.target.classList.contains('nd-in') || e.target.classList.contains('nd-out') || e.target.classList.contains('nd-x') || e.target.classList.contains('nd-mt')) return;
      dragging = true; dx = e.clientX - n.x; dy = e.clientY - n.y;
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', e=>{
      if(!dragging) return;
      n.x = e.clientX - dx; n.y = e.clientY - dy;
      el.style.left = n.x+'px'; el.style.top = n.y+'px';
      drawEdges();
    });
    el.addEventListener('pointerup', ()=> dragging = false);

    el.querySelector('.nd-x').onclick = ()=>{
      const i = nodes.indexOf(n); nodes.splice(i,1);
      for(let j=edges.length-1;j>=0;j--) if(edges[j].a===n||edges[j].b===n) edges.splice(j,1);
      el.remove(); drawEdges();
    };
    el.querySelector('.nd-mt').onclick = ()=>{
      bus?.emit?.('hub.swap', n.aid);
    };
    el.querySelector('.nd-out').addEventListener('pointerdown', e=>{
      e.stopPropagation(); connectFrom = n;
    });
    el.querySelector('.nd-in').addEventListener('pointerup', e=>{
      e.stopPropagation();
      if(connectFrom && connectFrom !== n){ edges.push({ a: connectFrom, b: n }); drawEdges(); }
      connectFrom = null;
    });
    drawEdges();
  }

  function drawEdges(){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    edges.forEach(({a,b})=>{
      const ax = a.x + 120, ay = a.y + 30;
      const bx = b.x,        by = b.y + 30;
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      const mx = (ax+bx)/2;
      path.setAttribute('d', `M${ax},${ay} C${mx},${ay} ${mx},${by} ${bx},${by}`);
      path.setAttribute('fill','none');
      path.setAttribute('stroke','#7fffe4');
      path.setAttribute('stroke-width','1.5');
      svg.appendChild(path);
    });
  }

  wrap.appendChild(palette);
  wrap.appendChild(canvas);
  el.appendChild(wrap);

  const foot = document.createElement('div');
  foot.style.cssText = 'font:300 10px/1.4 \'JetBrains Mono\',monospace;color:#8a826f;padding:6px 0';
  foot.innerHTML = `bus events emitted: <span style="color:#7fffe4">hub.swap</span> {adapterId}  ·  graph persists in session memory`;
  el.appendChild(foot);

  return el;
}

export function unmount(){
  cancelAnimationFrame(raf);
  host?.remove(); host = null; ctxRef = null;
}
export function onEvent(cb){ onEv = cb; }
export { miniPanel };
