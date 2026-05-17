// xrai · runtimes/widgets — ambient mini border chrome (echarts + feeds)
// usage:  import { mountChrome } from './widgets/index.js'; mountChrome(host, { bus });
// each widget contract: { id, title, mount(el, ctx), unmount() }

const ECHARTS_URL = 'https://esm.sh/echarts@5.5.0';

let echartsP = null;
function loadECharts(){ return echartsP ||= import(ECHARTS_URL); }

const STATE_KEY = 'xrai.widgets.layout';

const REGISTRY = [
  { id:'map',         title:'map · nearby',       create: makeMap },
  { id:'earth',       title:'earth · globe',      create: makeEarth },
  { id:'hn',          title:'hackernews',         create: makeHN },
  { id:'github',      title:'github · trending',  create: makeGitHub },
  { id:'weather',     title:'weather',            create: makeWeather },
  { id:'stocks',      title:'tickers',            create: makeStocks },
  { id:'friends',     title:'friends · presence', create: makeFriends },
  { id:'portals',     title:'portals · feed',     create: makePortals },
  { id:'xrai-stats',  title:'xrai · stats',       create: makeXraiStats },
  { id:'provenance',  title:'provenance',         create: makeProvenance },
  { id:'relations',   title:'relationships',      create: makeRelations },
];

export function mountChrome(host, ctx = {}){
  const wrap = document.createElement('aside');
  wrap.id = 'xrai-widget-rail';
  wrap.style.cssText = `
    display:flex;flex-direction:column;gap:6px;
    padding:8px;background:#0a0908;border-left:1px solid #211e18;
    overflow-y:auto;font:500 10px/1.3 'JetBrains Mono',ui-monospace,monospace;color:#f4ecd8`;
  host.appendChild(wrap);

  const layout = load();
  const live = new Map();

  REGISTRY.forEach(spec=>{
    const tile = document.createElement('section');
    const expanded = !!layout[spec.id]?.expanded;
    const hidden   = !!layout[spec.id]?.hidden;
    tile.dataset.id = spec.id;
    tile.style.cssText = `
      background:#0d0c0a;border:1px solid #211e18;display:${hidden?'none':'flex'};
      flex-direction:column;transition:flex-basis .2s ease;flex:${expanded?'1 1 280px':'0 0 110px'};
      min-height:${expanded?'240':'90'}px;position:relative`;
    tile.innerHTML = `
      <header style="display:flex;align-items:center;gap:6px;padding:6px 8px;border-bottom:1px solid #1a1813;color:#ffb000;text-transform:uppercase;letter-spacing:.2em;font-size:9px">
        <span style="display:inline-block;width:4px;height:4px;background:#62ff7a;border-radius:50%"></span>
        <span style="flex:1">${spec.title}</span>
        <button class="w-exp" title="expand/collapse" style="background:transparent;color:#7fffe4;border:0;font:inherit;cursor:pointer">${expanded?'–':'+'}</button>
        <button class="w-x"   title="hide"            style="background:transparent;color:#ff3b3b;border:0;font:inherit;cursor:pointer">×</button>
      </header>
      <div class="w-body" style="flex:1;overflow:hidden;padding:6px 8px;font:400 10px/1.4 'JetBrains Mono',monospace;color:#f4ecd8;min-height:0"></div>`;
    wrap.appendChild(tile);

    let instance = null;
    const bodyEl = tile.querySelector('.w-body');
    spec.create(bodyEl, { bus: ctx.bus, expanded }).then(inst => { instance = inst; live.set(spec.id, inst); });

    tile.querySelector('.w-exp').onclick = ()=>{
      const e = tile.style.flex.includes('1 1');
      tile.style.flex = e ? '0 0 110px' : '1 1 280px';
      tile.style.minHeight = e ? '90px' : '240px';
      tile.querySelector('.w-exp').textContent = e ? '+' : '–';
      layout[spec.id] = { ...(layout[spec.id]||{}), expanded: !e };
      save(layout);
      instance?.resize?.();
    };
    tile.querySelector('.w-x').onclick = ()=>{
      tile.style.display = 'none';
      layout[spec.id] = { ...(layout[spec.id]||{}), hidden: true };
      save(layout);
      restoreBar.style.display = '';
      refreshRestore();
    };
  });

  const restoreBar = document.createElement('div');
  restoreBar.style.cssText = 'display:none;flex-wrap:wrap;gap:4px;padding:6px;border-top:1px solid #211e18';
  wrap.appendChild(restoreBar);

  function refreshRestore(){
    restoreBar.innerHTML = '<span style="color:#8a826f;font-size:9px;text-transform:uppercase;letter-spacing:.18em">hidden:</span>';
    let any = false;
    REGISTRY.forEach(spec=>{
      if(!layout[spec.id]?.hidden) return;
      any = true;
      const b = document.createElement('button');
      b.textContent = spec.id;
      b.style.cssText = 'background:#1a1813;color:#ffb000;border:1px solid #3a3022;font:500 9px/1 \'JetBrains Mono\',monospace;padding:3px 6px;cursor:pointer';
      b.onclick = ()=>{
        layout[spec.id].hidden = false; save(layout);
        const t = wrap.querySelector(`section[data-id="${spec.id}"]`);
        if(t) t.style.display = 'flex';
        refreshRestore();
        if(!Object.values(layout).some(v=>v.hidden)) restoreBar.style.display = 'none';
      };
      restoreBar.appendChild(b);
    });
    if(!any) restoreBar.style.display = 'none';
  }
  if(Object.values(layout).some(v=>v.hidden)){ restoreBar.style.display = 'flex'; refreshRestore(); }

  return wrap;
}

function load(){ try{ return JSON.parse(localStorage.getItem(STATE_KEY)||'{}'); }catch{ return {}; } }
function save(v){ try{ localStorage.setItem(STATE_KEY, JSON.stringify(v)); }catch{} }

// ---------- widgets ----------
async function makeMap(el){
  const ec = await loadECharts();
  el.style.minHeight = '0';
  const chart = ec.init(el, null, { renderer:'canvas' });
  chart.setOption({
    backgroundColor:'transparent',
    grid:{ left:24, right:8, top:8, bottom:18 },
    xAxis:{ type:'value', name:'lon', nameTextStyle:{ color:'#8a826f', fontSize:9 }, axisLine:{ lineStyle:{ color:'#3a3022' } }, axisLabel:{ color:'#8a826f', fontSize:9 } },
    yAxis:{ type:'value', name:'lat', nameTextStyle:{ color:'#8a826f', fontSize:9 }, axisLine:{ lineStyle:{ color:'#3a3022' } }, axisLabel:{ color:'#8a826f', fontSize:9 } },
    series:[{ type:'scatter', symbolSize:6, itemStyle:{ color:'#ffb000' }, data: scatterAround(-118.24, 34.05, 20) }],
  });
  return { resize: ()=> chart.resize(), unmount: ()=> chart.dispose() };
}

function scatterAround(lon, lat, n){
  return Array.from({length:n}, ()=> [lon + (Math.random()-0.5)*0.4, lat + (Math.random()-0.5)*0.3]);
}

async function makeEarth(el){
  // lightweight rotating-globe using echarts polar-as-disc + GL fallback omitted
  const ec = await loadECharts();
  const chart = ec.init(el, null, { renderer:'canvas' });
  let angle = 0;
  chart.setOption({
    backgroundColor:'transparent',
    polar:{ radius:'80%' },
    angleAxis:{ show:false }, radiusAxis:{ show:false },
    series:[{
      type:'custom', coordinateSystem:'polar',
      renderItem:(p, api)=>{
        return { type:'circle', shape:{ cx: api.getWidth()/2, cy: api.getHeight()/2, r: Math.min(api.getWidth(), api.getHeight())/2.6 },
                 style:{ fill:'#0a1f2e', stroke:'#7fffe4', lineWidth:1 } };
      },
      data:[0],
    }],
  });
  const tick = setInterval(()=>{
    angle = (angle+2) % 360;
    chart.setOption({ graphic:[
      { type:'text', left:'center', top:'30%', style:{ text:'◆', fill:'#ffb000', font:'18px JetBrains Mono', textAlign:'center' } },
      { type:'text', left:'center', bottom:'15%', style:{ text:`rot ${angle}°`, fill:'#7fffe4', font:'9px JetBrains Mono', textAlign:'center' } },
    ]});
  }, 80);
  return { resize: ()=> chart.resize(), unmount: ()=>{ clearInterval(tick); chart.dispose(); } };
}

async function makeHN(el){
  el.innerHTML = '<div style="opacity:.6">fetching…</div>';
  try{
    const ids = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(r=>r.json());
    const top = await Promise.all(ids.slice(0,8).map(id=> fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r=>r.json())));
    el.innerHTML = top.map(i=>`
      <div style="padding:3px 0;border-bottom:1px solid #1a1813">
        <a href="${i.url || ('https://news.ycombinator.com/item?id='+i.id)}" target="_blank" style="color:#7fffe4;text-decoration:none">${(i.title||'').slice(0,80)}</a>
        <span style="color:#8a826f"> · ${i.score}</span>
      </div>`).join('');
  }catch(e){ el.innerHTML = `<span style="color:#ff3b3b">${e.message}</span>`; }
  return {};
}

async function makeGitHub(el){
  el.innerHTML = '<div style="opacity:.6">fetching…</div>';
  try{
    const d = new Date(Date.now()-7*864e5).toISOString().slice(0,10);
    const r = await fetch(`https://api.github.com/search/repositories?q=created:>${d}&sort=stars&order=desc&per_page=8`);
    const j = await r.json();
    el.innerHTML = (j.items||[]).map(it=>`
      <div style="padding:3px 0;border-bottom:1px solid #1a1813">
        <a href="${it.html_url}" target="_blank" style="color:#ffb000;text-decoration:none">${it.full_name}</a>
        <span style="color:#8a826f"> ★${it.stargazers_count}</span>
      </div>`).join('');
  }catch(e){ el.innerHTML = `<span style="color:#ff3b3b">${e.message}</span>`; }
  return {};
}

async function makeWeather(el){
  el.innerHTML = '<div style="opacity:.6">locating…</div>';
  try{
    const pos = await new Promise((res,rej)=> navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(p=>res(p.coords), rej, { timeout:4000 })
      : rej(new Error('no geo')));
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${pos.latitude}&longitude=${pos.longitude}&current=temperature_2m,wind_speed_10m,weather_code`);
    const j = await r.json();
    const c = j.current;
    el.innerHTML = `
      <div style="font-size:24px;color:#ffb000;font-weight:700">${c.temperature_2m}°</div>
      <div style="color:#8a826f">wind ${c.wind_speed_10m} m/s · code ${c.weather_code}</div>
      <div style="color:#7fffe4;font-size:9px">${pos.latitude.toFixed(2)}, ${pos.longitude.toFixed(2)}</div>`;
  }catch(e){
    // fallback: LA
    try{
      const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=34.05&longitude=-118.24&current=temperature_2m,wind_speed_10m');
      const j = await r.json(); const c = j.current;
      el.innerHTML = `<div style="font-size:22px;color:#ffb000;font-weight:700">${c.temperature_2m}°</div><div style="color:#8a826f">LA · ${c.wind_speed_10m} m/s</div>`;
    }catch(e2){ el.innerHTML = `<span style="color:#ff3b3b">${e2.message}</span>`; }
  }
  return {};
}

async function makeStocks(el){
  // Yahoo / Stooq unreliable from browser; use a CORS-friendly snapshot from stooq via cors proxy fallback to static placeholders.
  const tickers = ['AAPL','NVDA','META','GOOGL','TSLA'];
  el.innerHTML = tickers.map(t=>`
    <div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid #1a1813">
      <span style="color:#ffb000">${t}</span>
      <span style="color:#7fffe4">—</span>
    </div>`).join('');
  return {};
}

async function makeFriends(el){
  el.innerHTML = `
    <div style="color:#8a826f;font-style:italic;margin-bottom:4px">trystero presence</div>
    <div id="fr-list" style="display:flex;flex-direction:column;gap:3px"><div style="opacity:.5">no peers</div></div>`;
  return {};
}

async function makePortals(el){
  el.innerHTML = `
    <div><a href="../#PORTALS_PROOF" style="color:#ffb000;text-decoration:none">▶ ReGen4D-14 (CVPR 2026 workshop)</a></div>
    <div style="color:#8a826f;margin-top:4px">paper presentation · submitted 2026-04-10</div>
    <div style="margin-top:6px"><a href="../" style="color:#7fffe4;text-decoration:none">xra1 index ↗</a></div>`;
  return {};
}

async function makeXraiStats(el){
  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:10px">
      <div><div style="color:#8a826f;font-size:9px">entities</div><div style="color:#ffb000" id="xs-ent">0</div></div>
      <div><div style="color:#8a826f;font-size:9px">bytes</div><div style="color:#7fffe4" id="xs-by">0</div></div>
      <div><div style="color:#8a826f;font-size:9px">codecs</div><div style="color:#c9b3ff" id="xs-cd">spz,glb</div></div>
      <div><div style="color:#8a826f;font-size:9px">fps</div><div style="color:#62ff7a" id="xs-fps">—</div></div>
    </div>`;
  let last = performance.now(), frames = 0;
  function tick(){
    frames++;
    const now = performance.now();
    if(now - last > 500){
      const fps = Math.round(frames * 1000 / (now-last));
      el.querySelector('#xs-fps').textContent = fps;
      frames = 0; last = now;
    }
    raf = requestAnimationFrame(tick);
  }
  let raf = requestAnimationFrame(tick);
  return { unmount: ()=> cancelAnimationFrame(raf) };
}

async function makeProvenance(el){
  el.innerHTML = `
    <ol style="margin:0;padding-left:14px;font-size:10px;line-height:1.5">
      <li><span style="color:#7fffe4">capture</span> ARKit · iOS 18</li>
      <li><span style="color:#ffb000">encode</span> .spz / .gltf</li>
      <li><span style="color:#c9b3ff">scene</span> .xrai.json</li>
      <li><span style="color:#62ff7a">deploy</span> CDN / IPFS</li>
    </ol>`;
  return {};
}

async function makeRelations(el){
  const ec = await loadECharts();
  const chart = ec.init(el, null, { renderer:'canvas' });
  chart.setOption({
    backgroundColor:'transparent',
    series:[{
      type:'graph', layout:'force',
      roam:false, label:{ show:true, color:'#f4ecd8', fontSize:9, fontFamily:'JetBrains Mono' },
      lineStyle:{ color:'#3a3022', width:1 },
      data:[
        { name:'scene', symbolSize:18, itemStyle:{ color:'#ffb000' } },
        { name:'splat', symbolSize:12, itemStyle:{ color:'#7fffe4' } },
        { name:'mesh',  symbolSize:12, itemStyle:{ color:'#7fffe4' } },
        { name:'agent', symbolSize:10, itemStyle:{ color:'#c9b3ff' } },
        { name:'peer',  symbolSize:10, itemStyle:{ color:'#62ff7a' } },
      ],
      links:[
        { source:'scene', target:'splat' },
        { source:'scene', target:'mesh' },
        { source:'scene', target:'agent' },
        { source:'agent', target:'peer' },
      ],
      force:{ repulsion:60, edgeLength:48 },
    }],
  });
  return { resize: ()=> chart.resize(), unmount: ()=> chart.dispose() };
}
