// xrai · forest adapter — VRM agent forest (OTALA tick loop)
// lifts jarvis-xrai-cosmos-v2 (mounted at /cosmos/) as an iframe scene
// + lightweight VRM grid fallback via three.js + @pixiv/three-vrm if cosmos missing
//
// API:
//   mount(host, scene, ctx) → null
// ctx.bus events:
//   forest.agent.add     { name, vrm, role }
//   forest.agent.tick    { id, t }
//   forest.agent.message { id, text }

const COSMOS_URL = new URL('../../cosmos/', import.meta.url).href;

const css = `
  :host, * { box-sizing: border-box; font-family: 'JetBrains Mono', ui-monospace, monospace; }
  .wrap { position:relative; width:100%; height:100%; background:#050403; color:#f4ecd8; display:grid; grid-template-rows:auto 1fr; }
  .bar  { padding:8px 14px; background:#0a0908; border-bottom:1px solid #211e18;
          display:flex; gap:10px; align-items:center; font-size:10px;
          color:#ffb000; text-transform:uppercase; letter-spacing:.2em; }
  .bar button { background:#1a1813; color:#7fffe4; border:1px solid #2a2519;
                font:500 10px/1 inherit; padding:5px 9px; cursor:pointer; }
  .bar button:hover { background:#211e18; color:#ffb000; }
  .bar input { flex:1; background:#0d0c0a; color:#f4ecd8; border:1px solid #2a2519;
               font:400 10px/1 inherit; padding:6px 8px; }
  .stage { position:relative; overflow:hidden; }
  iframe { border:0; width:100%; height:100%; background:#050403; display:block; }
  .grid  { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
           gap:10px; padding:14px; overflow:auto; height:100%; align-content:start; }
  .card  { background:#0d0c0a; border:1px solid #211e18; padding:10px;
           display:flex; flex-direction:column; gap:6px; min-height:180px; }
  .card .av { aspect-ratio:1; background:linear-gradient(135deg,#211e18,#1a1813); border:1px solid #2a2519;
              display:grid; place-items:center; color:#ffb000; font-size:38px; font-weight:700; }
  .card .nm { color:#7fffe4; font-size:11px; }
  .card .rl { color:#8a826f; font-size:9px; text-transform:uppercase; letter-spacing:.15em; }
  .card .ms { color:#c9b3ff; font-size:10px; line-height:1.3; min-height:26px; }
  .card.tick { box-shadow: 0 0 0 1px #62ff7a44; }
`;

export async function mount(host, scene, ctx){
  const root = document.createElement('div');
  root.innerHTML = `<style>${css}</style>
    <div class="wrap">
      <div class="bar">
        <span>xrai · forest</span>
        <input id="add" placeholder="add agent · name role">
        <button id="add-btn">+ agent</button>
        <button id="mode">cosmos</button>
        <button id="tick">▶ tick</button>
      </div>
      <div class="stage" id="stage"></div>
    </div>`;
  host.appendChild(root);
  const stage = root.querySelector('#stage');

  const agents = new Map();
  let mode = 'cosmos'; // cosmos | grid
  let ticking = false, tickHandle = null;

  // try cosmos first; fall back to grid on 404
  async function renderCosmos(){
    stage.innerHTML = '';
    const ok = await fetch(COSMOS_URL, { method:'HEAD' }).then(r=>r.ok).catch(()=>false);
    if(!ok){ mode = 'grid'; root.querySelector('#mode').textContent = 'grid'; return renderGrid(); }
    const ifr = document.createElement('iframe');
    ifr.src = COSMOS_URL;
    ifr.allow = 'xr-spatial-tracking; camera; microphone; autoplay';
    stage.appendChild(ifr);
    // post agents into cosmos iframe
    ifr.onload = ()=> postAgents(ifr);
  }
  function postAgents(ifr){
    try { ifr.contentWindow.postMessage({ kind:'xrai.forest.agents', agents:[...agents.values()] }, '*'); } catch {}
  }

  function renderGrid(){
    stage.innerHTML = '<div class="grid" id="grid"></div>';
    const g = stage.querySelector('#grid');
    if(agents.size === 0){
      g.innerHTML = '<div style="opacity:.4;font-style:italic;padding:24px">no agents · add one above</div>';
      return;
    }
    g.innerHTML = [...agents.values()].map(a=>`
      <div class="card" data-id="${a.id}">
        <div class="av">${(a.name||'?').slice(0,1).toUpperCase()}</div>
        <div class="nm">${a.name||a.id}</div>
        <div class="rl">${a.role||'agent'}</div>
        <div class="ms" data-ms>${a.lastMsg||''}</div>
      </div>`).join('');
  }
  function flashTick(id){
    if(mode !== 'grid') return;
    const card = stage.querySelector(`.card[data-id="${id}"]`);
    if(!card) return;
    card.classList.add('tick');
    setTimeout(()=> card.classList.remove('tick'), 220);
  }

  function addAgent(name, role){
    const id = 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2,5);
    const a = { id, name: name || id, role: role || 'jarvis', vrm: null, lastMsg:'' };
    agents.set(id, a);
    ctx?.bus?.emit('forest.agent.add', a);
    if(mode === 'grid') renderGrid(); else postAgents(stage.querySelector('iframe'));
  }

  // OTALA tick loop — every agent observes/thinks/acts/learns/acts on shared bus
  function tick(){
    for(const a of agents.values()){
      ctx?.bus?.emit('forest.agent.tick', { id:a.id, t: Date.now() });
      flashTick(a.id);
    }
  }

  // bus listeners
  ctx?.bus?.on('forest.agent.add', (_t, p)=>{
    if(p && p.id && !agents.has(p.id)){ agents.set(p.id, p); if(mode==='grid') renderGrid(); }
  });
  ctx?.bus?.on('forest.agent.message', (_t, p)=>{
    const a = agents.get(p.id); if(!a) return;
    a.lastMsg = p.text || '';
    if(mode === 'grid'){
      const c = stage.querySelector(`.card[data-id="${a.id}"] [data-ms]`);
      if(c) c.textContent = a.lastMsg;
    }
  });

  // ui
  const addInput = root.querySelector('#add');
  const submit = ()=>{
    const v = addInput.value.trim(); if(!v) return;
    const [n, ...r] = v.split(/\s+/);
    addAgent(n, r.join(' '));
    addInput.value = '';
  };
  root.querySelector('#add-btn').onclick = submit;
  addInput.onkeydown = e=>{ if(e.key==='Enter') submit(); };
  root.querySelector('#mode').onclick = (e)=>{
    mode = mode === 'cosmos' ? 'grid' : 'cosmos';
    e.target.textContent = mode;
    mode === 'cosmos' ? renderCosmos() : renderGrid();
  };
  root.querySelector('#tick').onclick = (e)=>{
    ticking = !ticking;
    e.target.textContent = ticking ? '⏸ stop' : '▶ tick';
    if(ticking){ tick(); tickHandle = setInterval(tick, 2000); }
    else { clearInterval(tickHandle); tickHandle = null; }
  };

  // seed from scene
  if(scene?.entities) for(const e of scene.entities) if(e.type === 'agent') addAgent(e.name, e.role);
  // seed defaults if empty
  if(agents.size === 0){
    addAgent('jarvis', 'orchestrator');
    addAgent('echo',   'memory');
    addAgent('iris',   'vision');
  }

  renderCosmos();
}
