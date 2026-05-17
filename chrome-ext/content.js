// xrai · chrome-ext · content script
// injects a shadow-DOM dashboard overlay onto any page · ctrl/cmd+shift+x
// - shows xrai dock (toggle btn, grab btn, remix btn, AR btn, agent ask)
// - sniffs page for grabbable assets (images/videos/canvases/iframes/GLB links)
// - on demand: serializes selected DOM region as remix capture and posts to hub

(function(){
  if(window.__xrai_ext_loaded) return;
  window.__xrai_ext_loaded = true;

  const HOST_ID = 'xrai-ext-host';
  let shadow = null, dockEl = null, visible = false;

  function ensure(){
    if(shadow) return shadow;
    const root = document.createElement('div');
    root.id = HOST_ID;
    root.style.cssText = 'all:initial;position:fixed;top:0;right:0;width:0;height:0;z-index:2147483647';
    document.documentElement.appendChild(root);
    shadow = root.attachShadow({ mode:'open' });
    shadow.innerHTML = `
      <style>
        :host, * { box-sizing: border-box; font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .dock {
          position: fixed; top: 16px; right: 16px;
          display: flex; flex-direction: column; gap: 6px;
          background: rgba(13,12,10,.85); border: 1px solid #ffb000;
          padding: 8px; min-width: 180px; color: #f4ecd8;
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          font-size: 11px; line-height: 1.3;
          transform: translateX(calc(100% + 24px)); transition: transform .25s ease;
        }
        .dock.show { transform: translateX(0); }
        .hdr { color:#ffb000; text-transform:uppercase; letter-spacing:.2em; font-size:9px;
               padding-bottom:6px; border-bottom:1px solid #211e18; display:flex; gap:6px; align-items:center; }
        .hdr span.dot { width:6px; height:6px; background:#62ff7a; border-radius:50%; box-shadow:0 0 8px #62ff7a; }
        button { background:#1a1813; color:#7fffe4; border:1px solid #2a2519;
                 font:500 10px/1 'JetBrains Mono',monospace; padding:6px 8px; cursor:pointer; text-align:left; }
        button:hover { background:#211e18; color:#ffb000; }
        button.primary { background:#ffb000; color:#0d0c0a; border:0; font-weight:700; }
        .row { display:flex; gap:4px; }
        .row button { flex:1; }
        .count { color:#c9b3ff; font-size:9px; opacity:.7; }
        .ask { display:flex; gap:4px; }
        .ask input { flex:1; background:#0d0c0a; color:#f4ecd8; border:1px solid #2a2519;
                     font:400 10px/1 'JetBrains Mono',monospace; padding:6px 8px; }
        .toast { position:fixed; bottom:16px; right:16px; background:#0d0c0a;
                 border:1px solid #7fffe4; color:#7fffe4; padding:8px 12px;
                 font:500 10px/1.4 'JetBrains Mono',monospace; max-width:300px;
                 animation: xrai-in .3s ease; }
        @keyframes xrai-in { from{ opacity:0; transform:translateY(8px); } to{ opacity:1; transform:translateY(0); } }
        .toggle { position:fixed; top:16px; right:16px; width:28px; height:28px;
                  background:#0d0c0a; border:1px solid #ffb000; color:#ffb000;
                  font:700 12px/26px 'JetBrains Mono',monospace; text-align:center; cursor:pointer; }
      </style>
      <div class="toggle" id="xrai-toggle" title="XRAI · ⌘⇧X">×</div>
      <div class="dock" id="xrai-dock">
        <div class="hdr"><span class="dot"></span> xrai · this page</div>
        <div class="count" id="xrai-count">— assets</div>
        <button class="primary" id="xrai-open">open dashboard</button>
        <div class="row">
          <button id="xrai-grab">grab page</button>
          <button id="xrai-screen">screen</button>
        </div>
        <div class="row">
          <button id="xrai-graph">3D graph</button>
          <button id="xrai-ar">AR view</button>
        </div>
        <button id="xrai-shader">reprogram shaders (WGSL)</button>
        <div class="ask">
          <input id="xrai-ask" placeholder="ask jarvis about this page…">
          <button id="xrai-ask-btn" class="primary">→</button>
        </div>
      </div>`;
    dockEl = shadow.getElementById('xrai-dock');
    wire();
    sniff();
    return shadow;
  }

  function wire(){
    shadow.getElementById('xrai-toggle').onclick = toggle;
    shadow.getElementById('xrai-open').onclick = ()=>
      chrome.runtime.sendMessage({ kind:'xrai.popout', url:'sidepanel.html' });
    shadow.getElementById('xrai-grab').onclick = grabPage;
    shadow.getElementById('xrai-screen').onclick = grabScreen;
    shadow.getElementById('xrai-graph').onclick = ()=>
      chrome.runtime.sendMessage({ kind:'xrai.popout', url:'popout.html?mode=graph&from='+encodeURIComponent(location.href) });
    shadow.getElementById('xrai-ar').onclick = ()=>{
      const glb = findFirst3D();
      const u = glb ? '?ar=' + encodeURIComponent(glb) : '?ar=auto';
      chrome.runtime.sendMessage({ kind:'xrai.popout', url:'popout.html?mode=ar'+u });
    };
    shadow.getElementById('xrai-shader').onclick = ()=>{
      const img = document.querySelector('img, canvas, video');
      const src = img?.src || img?.toDataURL?.() || location.href;
      chrome.runtime.sendMessage({ kind:'xrai.popout', url:'popout.html?mode=shader&src='+encodeURIComponent(src) });
    };
    const ask = ()=>{
      const q = shadow.getElementById('xrai-ask').value.trim(); if(!q) return;
      chrome.runtime.sendMessage({
        kind:'xrai.mcp',
        req:{ tool:'jarvis.ask', args:{ q, page:location.href, title:document.title }}
      }, r=> toast(r?.text || r?.error || 'no response'));
      shadow.getElementById('xrai-ask').value = '';
    };
    shadow.getElementById('xrai-ask-btn').onclick = ask;
    shadow.getElementById('xrai-ask').onkeydown = e=>{ if(e.key === 'Enter') ask(); };
  }

  function sniff(){
    const imgs   = document.querySelectorAll('img').length;
    const vids   = document.querySelectorAll('video').length;
    const cnvs   = document.querySelectorAll('canvas').length;
    const ifrs   = document.querySelectorAll('iframe').length;
    const glbs   = [...document.querySelectorAll('a[href]')].filter(a=> /\.(glb|gltf|usdz|spz)$/i.test(a.href)).length;
    const total = imgs+vids+cnvs+ifrs+glbs;
    shadow.getElementById('xrai-count').textContent =
      `${total} assets · ${imgs} img · ${vids} vid · ${cnvs} cnv · ${ifrs} iframe · ${glbs} 3D`;
  }

  function findFirst3D(){
    const a = [...document.querySelectorAll('a[href]')].find(x=> /\.(glb|gltf|usdz)$/i.test(x.href));
    return a?.href;
  }

  function grabPage(){
    const cap = {
      id: Date.now(), type:'page', src: location.href,
      label: document.title, ts: Date.now(),
      meta: {
        h1: document.querySelector('h1')?.textContent,
        desc: document.querySelector('meta[name="description"]')?.content,
        og: document.querySelector('meta[property="og:image"]')?.content,
        text: document.body.innerText.slice(0, 4000),
      },
    };
    chrome.runtime.sendMessage({ kind:'xrai.capture', cap });
    toast('page → XRAI · ' + (cap.label||location.href).slice(0,60));
  }

  async function grabScreen(){
    try{
      // chrome ext background can use chrome.tabs.captureVisibleTab; we trigger it via msg
      const r = await chrome.runtime.sendMessage({ kind:'xrai.mcp', req:{ tool:'tabs.capture' }});
      if(r?.dataUrl){
        chrome.runtime.sendMessage({ kind:'xrai.capture', cap:{
          id:Date.now(), type:'screen', src:r.dataUrl,
          label:`screen · ${document.title}`, ts:Date.now(),
        }});
        toast('screen → XRAI');
      } else toast('screen capture failed');
    }catch(e){ toast(e.message); }
  }

  function toast(msg){
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    shadow.appendChild(t);
    setTimeout(()=>{ t.style.opacity = '0'; t.style.transition='opacity .4s'; }, 3500);
    setTimeout(()=> t.remove(), 4000);
  }

  function toggle(){
    ensure();
    visible = !visible;
    dockEl.classList.toggle('show', visible);
    shadow.getElementById('xrai-toggle').textContent = visible ? '×' : '◉';
  }

  // listen for keyboard / bg messages
  chrome.runtime.onMessage.addListener(msg=>{
    if(msg?.kind === 'xrai.toggle') toggle();
    if(msg?.kind === 'xrai.sniff')  { ensure(); sniff(); }
  });

  // show first time
  ensure();
  visible = true;
  dockEl.classList.add('show');
  shadow.getElementById('xrai-toggle').textContent = '×';
})();
