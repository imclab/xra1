// xrai · runtimes/icosa — gallery + inline GLB mount
// contract: { mount(stage, scene, ctx), unmount() }
// API: https://api.icosa.gallery/v1/assets
// Each tile click mounts the GLB into a three.js viewer inside the same stage.

const API = 'https://api.icosa.gallery/v1/assets';
let host = null, three = null, raf = 0, onEv = null;

export const id   = 'icosa-gallery';
export const meta = { needsNet:true, supports:['glb','gltf'] };

export async function mount(stage, scene, ctx = {}){
  host = document.createElement('div');
  host.style.cssText = 'position:absolute;inset:0;display:grid;grid-template-rows:auto 1fr 38% 0;background:#0a0908';
  stage.appendChild(host);

  const bar = document.createElement('div');
  bar.style.cssText = `
    display:flex;gap:10px;align-items:center;
    padding:10px 14px;border-bottom:1px solid #211e18;
    font:500 11px/1 'JetBrains Mono',ui-monospace,monospace;
    color:#ffb000;text-transform:uppercase;letter-spacing:.18em`;
  bar.innerHTML = `
    <span style="opacity:.5">icosa·</span>
    <select id="ic-order" style="background:#0d0c0a;color:#ffb000;border:1px solid #3a3022;font:inherit;padding:4px 8px">
      <option value="NEWEST">newest</option>
      <option value="POPULAR">popular</option>
      <option value="LIKES">most liked</option>
    </select>
    <input id="ic-q" type="search" placeholder="search…" style="flex:1;min-width:120px;background:#0d0c0a;color:#f4ecd8;border:1px solid #3a3022;font:inherit;padding:4px 8px">
    <button id="ic-go" style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">fetch</button>
    <span id="ic-stat" style="opacity:.6;font-style:italic">idle</span>`;
  host.appendChild(bar);

  const grid = document.createElement('div');
  grid.id = 'ic-grid';
  grid.style.cssText = 'overflow-y:auto;padding:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;align-content:start';
  host.appendChild(grid);

  const split = document.createElement('div');
  split.style.cssText = 'border-top:1px solid #211e18;display:flex;flex-direction:column;background:#000;min-height:200px;position:relative';
  split.innerHTML = `
    <div style="position:absolute;top:8px;left:10px;z-index:2;font:500 10px/1 'JetBrains Mono',monospace;color:#7fffe4;text-transform:uppercase;letter-spacing:.22em" id="ic-vname">no model loaded</div>
    <div id="ic-three" style="flex:1;position:relative"></div>`;
  host.appendChild(split);

  const setStat = (m,err)=>{
    const s = host.querySelector('#ic-stat');
    s.style.color = err ? '#ff3b3b' : '#7fffe4';
    s.textContent = m;
  };

  async function fetchList(){
    const order = host.querySelector('#ic-order').value;
    const q     = host.querySelector('#ic-q').value.trim();
    const url   = `${API}?format=GLTF2&pageSize=30&orderBy=${order}${q?`&keywords=${encodeURIComponent(q)}`:''}`;
    setStat('fetching…');
    grid.innerHTML = '<div style="grid-column:1/-1;opacity:.6;font-style:italic;padding:20px">loading icosa.gallery…</div>';
    try{
      const r = await fetch(url);
      if(!r.ok) throw new Error('HTTP '+r.status);
      const j = await r.json();
      const assets = j.assets || [];
      grid.innerHTML = '';
      if(!assets.length){ grid.innerHTML='<div style="grid-column:1/-1;opacity:.6">no results</div>'; setStat('empty'); return; }
      assets.forEach(a => {
        const t = document.createElement('div');
        const thumb = a.thumbnail?.url || '';
        t.style.cssText = 'cursor:pointer;background:#0d0c0a;border:1px solid #211e18;transition:border-color .15s;position:relative';
        t.onmouseenter = ()=> t.style.borderColor = '#ffb000';
        t.onmouseleave = ()=> t.style.borderColor = '#211e18';
        const glb = a.formats?.find(f => /GLTF2|GLB/i.test(f.formatType))?.root?.url
                 || a.formats?.[0]?.root?.url || null;
        t.innerHTML = `
          ${thumb ? `<img loading="lazy" src="${thumb}" style="display:block;width:100%;aspect-ratio:1;object-fit:cover">` : `<div style="aspect-ratio:1;display:grid;place-items:center;color:#3a3022">∅</div>`}
          <div style="padding:6px 8px;font:500 10px/1.3 'JetBrains Mono',monospace;color:#f4ecd8;letter-spacing:.04em">${(a.name||'untitled').slice(0,40)}</div>
          <div style="padding:0 8px 8px;font:300 9px/1 'JetBrains Mono',monospace;color:#8a826f;text-transform:uppercase;letter-spacing:.18em">${a.authorName || ''}</div>`;
        t.onclick = ()=> mountGLB(glb, a.name, a.assetId);
        grid.appendChild(t);
      });
      setStat(`${assets.length} loaded`);
      onEv?.({ type:'icosa.list', count: assets.length });
    }catch(e){
      grid.innerHTML = `<div style="grid-column:1/-1;color:#ff3b3b">${e.message}<br><a style="color:#7fffe4" target="_blank" href="https://icosa.gallery/">open icosa.gallery ↗</a></div>`;
      setStat(e.message, true);
    }
  }

  async function mountGLB(url, name, assetId){
    if(!url){ setStat('no GLB url', true); return; }
    host.querySelector('#ic-vname').textContent = name || assetId;
    if(!three) three = await initThree(host.querySelector('#ic-three'));
    setStat(`loading ${name||assetId}…`);
    try{
      await three.load(url);
      setStat('mounted');
      onEv?.({ type:'icosa.mount', assetId, name });
    }catch(e){ setStat(e.message, true); }
  }

  host.querySelector('#ic-go').onclick = fetchList;
  host.querySelector('#ic-q').addEventListener('keydown', e=> e.key==='Enter' && fetchList());
  fetchList();
}

async function initThree(target){
  const THREE = await import('https://esm.sh/three@0.160.1');
  const { OrbitControls } = await import('https://esm.sh/three@0.160.1/examples/jsm/controls/OrbitControls.js');
  const { GLTFLoader }    = await import('https://esm.sh/three@0.160.1/examples/jsm/loaders/GLTFLoader.js');
  const { RoomEnvironment } = await import('https://esm.sh/three@0.160.1/examples/jsm/environments/RoomEnvironment.js');

  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping      = THREE.ACESFilmicToneMapping;
  target.appendChild(renderer.domElement);

  const scene  = new THREE.Scene();
  scene.background = new THREE.Color(0x050403);
  const env    = new RoomEnvironment();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(env, 0.04).texture;

  const camera = new THREE.PerspectiveCamera(40, 1, .01, 1000);
  camera.position.set(2, 1.5, 3);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const loader = new GLTFLoader();
  let current = null;

  function resize(){
    const w = target.clientWidth, h = target.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(target); resize();

  function tick(){
    raf = requestAnimationFrame(tick);
    controls.update();
    renderer.render(scene, camera);
  }
  tick();

  return {
    load(url){
      return new Promise((res, rej)=>{
        loader.load(url, gltf => {
          if(current) scene.remove(current);
          current = gltf.scene;
          // auto-frame
          const box = new THREE.Box3().setFromObject(current);
          const size = box.getSize(new THREE.Vector3()).length();
          const ctr  = box.getCenter(new THREE.Vector3());
          current.position.sub(ctr);
          camera.position.copy(ctr).add(new THREE.Vector3(size, size*0.5, size));
          camera.near = size / 100; camera.far = size * 100;
          camera.updateProjectionMatrix();
          controls.target.set(0,0,0);
          scene.add(current);
          res();
        }, undefined, rej);
      });
    },
    dispose(){
      cancelAnimationFrame(raf); ro.disconnect();
      renderer.dispose(); target.innerHTML = '';
    }
  };
}

export function unmount(){
  try{ three?.dispose?.(); }catch{}
  three = null;
  host?.remove(); host = null;
}

export function onEvent(cb){ onEv = cb; }
