// xrai · runtimes/_ar-needle — Needle Engine AR viewer adapter
// stack: Needle Engine web component (<needle-engine>) — USDZ on-the-fly for iOS
//        Quick Look, Scene Viewer on Android, WebXR everywhere else, App Clip
//        for iOS WebXR. Works for glTF/GLB and Everywhere Actions scenes.
// contract: { mount(stage, scene, ctx), unmount(), onEvent(cb) }
// docs: https://engine.needle.tools/docs/how-to-guides/everywhere-actions/

let host = null, onEv = null, ctxRef = null, ne = null;

export const id   = 'ar-needle';
export const meta = { supports:['.glb','.gltf','.usdz'], xr:true, ios:'quicklook' };

const NEEDLE_SRC = 'https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js';

const SAMPLES = [
  { name:'cube',  url:'https://engine.needle.tools/projects/showcase/assets/cube.glb' },
  { name:'avatar', url:'https://engine.needle.tools/samples/characters-everywhere-actions/scene.glb' },
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
    <span style="opacity:.5">ar·needle·</span>
    <input id="ne-url" type="url" placeholder="glb / gltf / usdz url" style="flex:1;background:#0d0c0a;color:#f4ecd8;border:1px solid #3a3022;font:inherit;padding:4px 8px;text-transform:none;letter-spacing:.04em">
    <select id="ne-sample" style="background:#0d0c0a;color:#7fffe4;border:1px solid #3a3022;font:inherit;padding:4px 8px">
      <option value="">samples…</option>
      ${SAMPLES.map(s=>`<option value="${s.url}">${s.name}</option>`).join('')}
    </select>
    <button id="ne-load" style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">load</button>
    <button id="ne-ar"   style="background:#7fffe4;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">enter AR</button>
    <button id="ne-qr"   style="background:#0d0c0a;color:#c9b3ff;border:1px solid #3a3022;font:inherit;padding:5px 10px;cursor:pointer">QR</button>`;
  host.appendChild(bar);

  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:relative;background:#000;overflow:hidden;min-height:0';
  host.appendChild(wrap);

  const foot = document.createElement('div');
  foot.style.cssText = 'padding:6px 12px;border-top:1px solid #211e18;font:300 10px/1.4 \'JetBrains Mono\',monospace;color:#8a826f';
  foot.innerHTML = `<span id="ne-stat">idle</span> · iOS→Quick Look · Android→Scene Viewer · Quest/Vision→WebXR · iOS-WebXR→App Clip`;
  host.appendChild(foot);

  const setStat = (m, err)=>{
    const s = host.querySelector('#ne-stat');
    s.style.color = err ? '#ff3b3b' : '#7fffe4';
    s.textContent = m;
  };

  async function loadEngine(){
    if(customElements.get('needle-engine')) return;
    setStat('loading needle…');
    await new Promise((res, rej)=>{
      const s = document.createElement('script');
      s.type = 'module'; s.src = NEEDLE_SRC;
      s.onload = res; s.onerror = ()=> rej(new Error('needle load fail'));
      document.head.appendChild(s);
    });
    setStat('needle ready');
  }

  async function load(url){
    try{
      await loadEngine();
      wrap.innerHTML = '';
      ne = document.createElement('needle-engine');
      ne.setAttribute('src', url);
      ne.setAttribute('environment-image', 'studio');
      ne.setAttribute('loading', 'eager');
      ne.style.cssText = 'width:100%;height:100%;display:block';
      // DOM overlay slot for AR UI
      ne.innerHTML = `
        <div slot="dom-overlay" class="desktop ar only-in-ar" style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(13,12,10,.85);color:#ffb000;padding:8px 14px;font:500 11px/1 'JetBrains Mono',monospace;border:1px solid #ffb000">
          xrai · ${url.split('/').pop()}
        </div>`;
      wrap.appendChild(ne);
      ne.addEventListener('loadstart', ()=> setStat('loading scene…'));
      ne.addEventListener('loaded', ()=>{
        setStat(`ready · ${url.split('/').pop()}`);
        ctxRef?.bus?.emit?.('needle.loaded', { url });
        onEv?.({ type:'needle.loaded', url });
      });
      ne.addEventListener('xr-session-start', ()=> ctxRef?.bus?.emit?.('xr.start', { runtime:'needle' }));
      ne.addEventListener('xr-session-end',   ()=> ctxRef?.bus?.emit?.('xr.end',   { runtime:'needle' }));
    }catch(e){ setStat(e.message, true); }
  }

  function enterAR(){
    if(!ne){ setStat('load a scene first', true); return; }
    const api = ne.needle || ne;
    // try programmatic XR
    if(api?.startXR){ api.startXR('immersive-ar').catch(e=> setStat(e.message, true)); return; }
    // fallback: synthesize click on needle's own AR button
    const arBtn = ne.shadowRoot?.querySelector('[data-xr="ar"], button.ar, .needle-ar-button');
    if(arBtn){ arBtn.click(); } else { setStat('AR button not found · use overlay UI', true); }
  }

  function showQR(){
    const url = host.querySelector('#ne-url').value.trim() || SAMPLES[0].url;
    const target = `${location.origin}${location.pathname}?ar=${encodeURIComponent(url)}`;
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(target)}&bgcolor=0d0c0a&color=ffb000`;
    wrap.innerHTML = `<div style="display:grid;place-items:center;height:100%;color:#f4ecd8;font:500 11px/1.4 'JetBrains Mono',monospace;gap:10px">
      <img src="${qr}" style="border:1px solid #ffb000">
      <div style="color:#7fffe4">scan on phone → opens needle AR</div>
      <div style="opacity:.5;font-size:9px;max-width:280px;text-align:center;word-break:break-all">${target}</div>
    </div>`;
    setStat('share link → phone');
  }

  host.querySelector('#ne-load').onclick = ()=>{
    const u = host.querySelector('#ne-url').value.trim() || SAMPLES[0].url;
    load(u);
  };
  host.querySelector('#ne-sample').onchange = e=>{
    if(!e.target.value) return;
    host.querySelector('#ne-url').value = e.target.value;
    load(e.target.value);
  };
  host.querySelector('#ne-ar').onclick = enterAR;
  host.querySelector('#ne-qr').onclick = showQR;

  // auto-load from ?ar= deeplink
  const ar = new URLSearchParams(location.search).get('ar');
  if(ar){
    host.querySelector('#ne-url').value = ar;
    load(ar);
  } else if(scene?.entities?.length){
    const first = scene.entities.find(e=> /\.(glb|gltf|usdz)$/i.test(e.src||''));
    if(first){ host.querySelector('#ne-url').value = first.src; load(first.src); }
  }
}

export function unmount(){
  ne?.remove(); ne = null;
  host?.remove(); host = null; ctxRef = null;
}
export function onEvent(cb){ onEv = cb; }
