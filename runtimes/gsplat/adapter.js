// xrai · runtimes/gsplat — gaussian splat viewer
// stack: three.js + @mkkellogg/gaussian-splats-3d (web) + @spectacular-ai/gsplat-spz-loader (SPZ)
// contract: { mount(stage, scene, ctx), unmount() }
// formats: .ply  .splat  .ksplat  .spz
//
// asset roots tried in order (first 200 wins):
//   1) ctx.url (caller override / xrai scene entity)
//   2) <stage data-asset="..."> attribute
//   3) ../../assets/splats/<name> (xra1/assets/splats symlinks portals_v4/assets/splats)
//   4) user file drop

const PRESETS = [
  { name:'Cherry Blossom Tennis Court',          file:'Cherry%20Blossom%20Tennis%20Court.spz' },
  { name:'Modern Tropical Luxury Residence',     file:'Modern%20Tropical%20Luxury%20Residence.spz' },
  { name:'Futuristic Cityscape Towers Arches',   file:'Futuristic%20Cityscape%20Towers%20Arches.spz' },
  { name:'Traditional Chinese Bedroom',          file:'Traditional%20Chinese%20Bedroom%20Interior.spz' },
  { name:'Misty Lantern-Lit Ancient City',       file:'Misty%20Lantern-Lit%20Ancient%20City.spz' },
  { name:'world-01',                             file:'world-01.spz' },
  { name:'world-02',                             file:'world-02.spz' },
  { name:'world-03',                             file:'world-03.spz' },
  { name:'world-04',                             file:'world-04.spz' },
  { name:'world-05',                             file:'world-05.spz' },
];

const ASSET_ROOT = new URL('../../assets/splats/', import.meta.url);

let viewer = null;
let host   = null;
let onPick = null;

export const id   = 'gsplat';
export const meta = { needsThree:true, supports:['.ply','.splat','.ksplat','.spz'] };

export async function mount(stage, scene, ctx = {}){
  host = document.createElement('div');
  host.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;background:#000';
  stage.appendChild(host);

  const bar = document.createElement('div');
  bar.style.cssText = `
    position:absolute;top:10px;left:10px;right:10px;z-index:5;
    display:flex;gap:8px;flex-wrap:wrap;align-items:center;
    font:500 11px/1 'JetBrains Mono',ui-monospace,monospace;
    color:#ffb000;text-transform:uppercase;letter-spacing:.18em;
    background:rgba(13,12,10,.78);backdrop-filter:blur(8px);
    border:1px solid rgba(255,176,0,.22);padding:8px 10px`;
  bar.innerHTML = `
    <span style="opacity:.5">gsplat·</span>
    <select id="gsp-preset" style="background:#0d0c0a;color:#ffb000;border:1px solid #3a3022;font:inherit;padding:4px 8px">
      <option value="">— preset —</option>
      ${PRESETS.map(p=>`<option value="${p.file}">${p.name}</option>`).join('')}
    </select>
    <input id="gsp-url" type="url" placeholder="https://… .spz/.ply/.splat" style="flex:1;min-width:160px;background:#0d0c0a;color:#f4ecd8;border:1px solid #3a3022;font:inherit;padding:4px 8px">
    <button id="gsp-load" style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">load</button>
    <label style="cursor:pointer;border:1px dashed #ffb000;padding:4px 8px">
      drop file<input id="gsp-file" type="file" accept=".spz,.ply,.splat,.ksplat" style="display:none">
    </label>
    <span id="gsp-stat" style="opacity:.6;font-style:italic">idle</span>`;
  host.appendChild(bar);

  const canvas = document.createElement('div');
  canvas.style.cssText = 'flex:1;position:relative';
  host.appendChild(canvas);

  const setStat = (m,err)=>{
    const s = host.querySelector('#gsp-stat');
    s.style.color = err ? '#ff3b3b' : '#7fffe4';
    s.textContent = m;
  };

  // lazy-load three + GS3D from CDN (no build step)
  setStat('loading three.js + GaussianSplats3D…');
  const THREE = await import('https://esm.sh/three@0.160.1');
  const GS    = await import('https://esm.sh/@mkkellogg/gaussian-splats-3d@0.4.5?deps=three@0.160.1');

  viewer = new GS.Viewer({
    cameraUp:         [0, 1, 0],
    initialCameraPosition: [0, 1, 3],
    initialCameraLookAt:   [0, 0, 0],
    sphericalHarmonicsDegree: 0,
    sharedMemoryForWorkers: false,
    rootElement: canvas,
  });

  host.querySelector('#gsp-load').onclick = ()=>{
    const u = host.querySelector('#gsp-url').value.trim();
    if(u) loadURL(u);
  };
  host.querySelector('#gsp-preset').onchange = e=>{
    if(!e.target.value) return;
    loadURL(new URL(e.target.value, ASSET_ROOT).href);
  };
  host.querySelector('#gsp-file').onchange = async e=>{
    const f = e.target.files[0]; if(!f) return;
    setStat(`reading ${f.name} (${(f.size/1048576).toFixed(1)} MB)…`);
    const buf = await f.arrayBuffer();
    const blobURL = URL.createObjectURL(new Blob([buf]));
    const fmt = f.name.split('.').pop().toLowerCase();
    await loadURL(blobURL, fmt);
  };

  async function loadURL(url, hint){
    try{
      setStat(`fetching ${url.split('/').pop().slice(0,40)}…`);
      const fmt = hint || url.split('?')[0].split('.').pop().toLowerCase();
      const format = ({ ply:0, ksplat:1, splat:2, spz:3 })[fmt] ?? 2;
      await viewer.addSplatScene(url, {
        format,
        progressiveLoad: true,
        showLoadingUI:   false,
        position:        [0,0,0],
        rotation:        [0,0,0,1],
        scale:           [1,1,1],
      });
      viewer.start();
      setStat(`mounted · ${fmt.toUpperCase()}`);
      onPick?.({ type:'gsplat.loaded', url });
    }catch(e){
      console.error(e);
      setStat(e.message || 'load failed', true);
    }
  }

  // auto-load: ctx.url → first preset reachable
  if(ctx?.url){ loadURL(ctx.url); }
  else if(scene?.entities?.length){
    const sp = scene.entities.find(e => e.type==='splat' || /\.(spz|ply|splat|ksplat)$/i.test(e.src||''));
    if(sp) loadURL(sp.src);
  } else {
    // probe first preset; quietly skip if 404 (symlink not deployed)
    const probe = new URL(PRESETS[0].file, ASSET_ROOT).href;
    fetch(probe, { method:'HEAD' }).then(r=>{
      if(r.ok){ host.querySelector('#gsp-preset').value = PRESETS[0].file; loadURL(probe); }
      else setStat('no local splats · drop a file or paste URL');
    }).catch(()=> setStat('no local splats · drop a file or paste URL'));
  }
}

export function unmount(){
  try{ viewer?.dispose?.(); }catch{}
  viewer = null;
  host?.remove(); host = null;
}

export function onEvent(cb){ onPick = cb; }
