// xrai · runtimes/xrai — scene + knowledge-graph loader
// contract: { mount(stage, scene, ctx), unmount(), onEvent(cb) }
// dispatches loaded scenes to peer adapters via shared bus (ctx.bus.emit('scene.load', {scene, kg}))
// formats:
//   - .xrai.json  → { meta, entities[], graph?:{nodes,edges} }
//   - .json       → guessed by shape
//   - drop folder → first .xrai.json wins, .gltf/.glb/.spz tracked as entities

let host = null, onEv = null, ctxRef = null;

export const id   = 'xrai-scene';
export const meta = { supports:['.xrai.json','.json','.glb','.gltf','.spz'] };

const SAMPLES = [
  { name:'empty stage',  url:'data:application/json,' + encodeURIComponent(JSON.stringify({
      meta:{ id:'empty', title:'empty stage' }, entities:[], graph:{ nodes:[], edges:[] }
    })) },
];

export async function mount(stage, scene, ctx = {}){
  ctxRef = ctx;
  host = document.createElement('div');
  host.style.cssText = 'position:absolute;inset:0;background:#0a0908;display:grid;grid-template-rows:auto 1fr auto;color:#f4ecd8';
  stage.appendChild(host);

  const bar = document.createElement('div');
  bar.style.cssText = `
    display:flex;gap:10px;align-items:center;padding:8px 12px;border-bottom:1px solid #211e18;
    font:500 10px/1 'JetBrains Mono',ui-monospace,monospace;color:#ffb000;
    text-transform:uppercase;letter-spacing:.2em`;
  bar.innerHTML = `
    <span style="opacity:.5">xrai·scene·</span>
    <input id="xr-url" type="url" placeholder="https://… .xrai.json" style="flex:1;background:#0d0c0a;color:#f4ecd8;border:1px solid #3a3022;font:inherit;padding:4px 8px;text-transform:none;letter-spacing:.04em">
    <button id="xr-fetch" style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">fetch</button>
    <label style="cursor:pointer;border:1px dashed #ffb000;padding:4px 8px">
      drop<input id="xr-file" type="file" accept=".json,.gltf,.glb,.spz" multiple style="display:none">
    </label>
    <button id="xr-dispatch" title="emit scene.load to host bus" style="background:#7fffe4;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">→ stage</button>`;
  host.appendChild(bar);

  const split = document.createElement('div');
  split.style.cssText = 'display:grid;grid-template-columns:1.1fr 1fr;gap:1px;background:#211e18;overflow:hidden;min-height:0';
  split.innerHTML = `
    <div style="background:#0a0908;display:flex;flex-direction:column;min-height:0">
      <div style="padding:6px 12px;font:500 9px/1 'JetBrains Mono',monospace;color:#ffb000;text-transform:uppercase;letter-spacing:.22em;border-bottom:1px solid #211e18">entities</div>
      <ul id="xr-ents" style="margin:0;padding:8px 12px;list-style:none;overflow-y:auto;flex:1;font:400 11px/1.5 'JetBrains Mono',monospace"></ul>
    </div>
    <div style="background:#0a0908;display:flex;flex-direction:column;min-height:0">
      <div style="padding:6px 12px;font:500 9px/1 'JetBrains Mono',monospace;color:#7fffe4;text-transform:uppercase;letter-spacing:.22em;border-bottom:1px solid #211e18">knowledge graph</div>
      <canvas id="xr-kg" style="flex:1;display:block;background:#050403"></canvas>
    </div>`;
  host.appendChild(split);

  const foot = document.createElement('div');
  foot.style.cssText = 'padding:6px 12px;border-top:1px solid #211e18;font:300 10px/1.4 \'JetBrains Mono\',monospace;color:#8a826f';
  foot.innerHTML = `<span id="xr-stat">idle</span> · <span style="opacity:.6">scene-shape: { meta, entities[{type,src,xform}], graph?:{ nodes[], edges[] } }</span>`;
  host.appendChild(foot);

  const setStat = (m, err)=>{
    const s = host.querySelector('#xr-stat');
    s.style.color = err ? '#ff3b3b' : '#7fffe4';
    s.textContent = m;
  };

  const entsEl = host.querySelector('#xr-ents');
  const kgCanvas = host.querySelector('#xr-kg');
  let current = scene || { meta:{}, entities:[], graph:{ nodes:[], edges:[] } };

  function render(){
    entsEl.innerHTML = (current.entities||[]).map((e,i)=>`
      <li style="padding:4px 6px;border-bottom:1px solid #1a1813;display:flex;gap:8px;align-items:center">
        <span style="color:#ffb000;width:60px">${(e.type||'?').slice(0,10)}</span>
        <span style="flex:1;color:#f4ecd8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.src || e.id || '—'}</span>
        <button data-i="${i}" class="xr-pick" style="background:#0d0c0a;color:#7fffe4;border:1px solid #2a2519;font:inherit;cursor:pointer;padding:2px 6px">load</button>
      </li>`).join('') || '<li style="opacity:.5;font-style:italic">no entities</li>';
    entsEl.querySelectorAll('.xr-pick').forEach(b=> b.onclick = ()=>{
      const e = current.entities[+b.dataset.i];
      ctxRef?.bus?.emit?.('scene.entity', e);
      onEv?.({ type:'xrai.entity', entity:e });
      setStat(`→ ${e.type} · ${e.src||e.id}`);
    });
    drawKG();
  }

  function drawKG(){
    const c = kgCanvas, dpr = devicePixelRatio || 1;
    const w = c.clientWidth, h = c.clientHeight;
    c.width = w*dpr; c.height = h*dpr;
    const g = c.getContext('2d'); g.scale(dpr, dpr);
    g.fillStyle = '#050403'; g.fillRect(0,0,w,h);
    const nodes = current.graph?.nodes || [];
    const edges = current.graph?.edges || [];
    if(!nodes.length){
      g.fillStyle = '#3a3022'; g.font = '11px JetBrains Mono';
      g.fillText('no knowledge graph', 14, 24); return;
    }
    // simple radial layout
    const cx = w/2, cy = h/2, r = Math.min(w,h)*0.36;
    const pos = new Map();
    nodes.forEach((n,i)=>{
      const a = (i/nodes.length)*Math.PI*2 - Math.PI/2;
      pos.set(n.id ?? i, { x: cx + Math.cos(a)*r, y: cy + Math.sin(a)*r, n });
    });
    g.strokeStyle = 'rgba(127,255,228,.25)'; g.lineWidth = 1;
    edges.forEach(e=>{
      const a = pos.get(e.from ?? e.src), b = pos.get(e.to ?? e.dst);
      if(!a||!b) return;
      g.beginPath(); g.moveTo(a.x,a.y); g.lineTo(b.x,b.y); g.stroke();
    });
    pos.forEach(({x,y,n})=>{
      g.fillStyle = '#ffb000';
      g.beginPath(); g.arc(x,y,4,0,Math.PI*2); g.fill();
      g.fillStyle = '#f4ecd8'; g.font = '10px JetBrains Mono';
      g.fillText(String(n.label ?? n.id ?? ''), x+7, y+3);
    });
  }
  new ResizeObserver(drawKG).observe(kgCanvas);

  async function loadJSON(text, sourceLabel){
    try{
      const j = JSON.parse(text);
      current = normalize(j);
      setStat(`loaded ${sourceLabel} · ${current.entities.length} ent · ${current.graph.nodes.length} nodes`);
      onEv?.({ type:'xrai.scene', scene: current });
      render();
    }catch(e){ setStat('parse error: '+e.message, true); }
  }

  function normalize(j){
    return {
      meta: j.meta || { id: j.id, title: j.title },
      entities: j.entities || j.objects || [],
      graph: j.graph || j.kg || { nodes: j.nodes||[], edges: j.edges||j.links||[] }
    };
  }

  host.querySelector('#xr-fetch').onclick = async ()=>{
    const u = host.querySelector('#xr-url').value.trim(); if(!u) return;
    setStat('fetching…');
    try{ const r = await fetch(u); loadJSON(await r.text(), u.split('/').pop()); }
    catch(e){ setStat(e.message, true); }
  };
  host.querySelector('#xr-file').onchange = async e=>{
    const files = [...e.target.files];
    const scn = files.find(f=>/\.(xrai\.json|json)$/i.test(f.name));
    if(scn){ loadJSON(await scn.text(), scn.name); }
    const assets = files.filter(f=>/\.(glb|gltf|spz|ply|splat|ksplat)$/i.test(f.name));
    if(assets.length){
      assets.forEach(f=>{
        current.entities.push({
          type: /\.(spz|ply|splat|ksplat)$/i.test(f.name) ? 'splat' : 'mesh',
          src:  URL.createObjectURL(f),
          name: f.name,
        });
      });
      render();
      setStat(`+${assets.length} assets`);
    }
  };
  host.querySelector('#xr-dispatch').onclick = ()=>{
    ctxRef?.bus?.emit?.('scene.load', current);
    onEv?.({ type:'xrai.dispatch', scene: current });
    setStat('dispatched to host bus');
  };

  if(scene) current = normalize(scene);
  render();
}

export function unmount(){ host?.remove(); host = null; ctxRef = null; }
export function onEvent(cb){ onEv = cb; }
