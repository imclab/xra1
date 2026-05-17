// xrai · runtimes/remix — universal remix layer
// every webpage, every graphic, every idea → transparent · editable · sharable
// captures DOM nodes, images, canvases, videos from any tab (via chrome ext or
// in-page invocation) → opens them as remixable nodes on the xrai bus.
// contract: { mount(stage, scene, ctx), unmount(), onEvent(cb) }

let host = null, onEv = null, ctxRef = null;
let captures = []; // { id, type, src, label, ts, edits }

export const id   = 'remix';
export const meta = { capture:true, share:true };

export async function mount(stage, scene, ctx = {}){
  ctxRef = ctx;
  host = document.createElement('div');
  host.style.cssText = 'position:absolute;inset:0;background:#0a0908;display:grid;grid-template-rows:auto 1fr auto;color:#f4ecd8';
  stage.appendChild(host);

  const bar = document.createElement('div');
  bar.style.cssText = `
    display:flex;gap:10px;align-items:center;padding:8px 12px;border-bottom:1px solid #211e18;
    font:500 10px/1 'JetBrains Mono',monospace;color:#ffb000;text-transform:uppercase;letter-spacing:.2em`;
  bar.innerHTML = `
    <span style="opacity:.5">remix·any·</span>
    <input id="rx-url" type="url" placeholder="paste url to remix" style="flex:1;background:#0d0c0a;color:#f4ecd8;border:1px solid #3a3022;font:inherit;padding:4px 8px;text-transform:none;letter-spacing:.04em">
    <button id="rx-grab"   style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">grab</button>
    <button id="rx-screen" style="background:#7fffe4;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">screen</button>
    <button id="rx-paste"  style="background:#c9b3ff;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">paste</button>
    <button id="rx-share"  style="background:#0d0c0a;color:#62ff7a;border:1px solid #3a3022;font:inherit;padding:5px 10px;cursor:pointer">share room</button>`;
  host.appendChild(bar);

  const grid = document.createElement('div');
  grid.id = 'rx-grid';
  grid.style.cssText = `
    display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;
    padding:12px;overflow-y:auto;align-content:start;min-height:0;background:#050403`;
  host.appendChild(grid);

  const foot = document.createElement('div');
  foot.style.cssText = 'padding:6px 12px;border-top:1px solid #211e18;font:300 10px/1.4 \'JetBrains Mono\',monospace;color:#8a826f';
  foot.innerHTML = `<span id="rx-stat">drop · paste · screen-capture · or url → grab</span> · <span style="color:#62ff7a">webrtc room</span>: <span id="rx-room">—</span>`;
  host.appendChild(foot);

  const setStat = (m, err)=>{
    const s = host.querySelector('#rx-stat');
    s.style.color = err ? '#ff3b3b' : '#7fffe4';
    s.textContent = m;
  };

  function add(cap){
    captures.push(cap);
    render();
    ctxRef?.bus?.emit?.('remix.capture', cap);
    onEv?.({ type:'remix.capture', cap });
  }

  function render(){
    grid.innerHTML = captures.map((c,i)=>{
      const preview = c.type === 'image' || c.type === 'screen'
        ? `<img src="${c.src}" style="width:100%;height:140px;object-fit:cover;display:block">`
        : c.type === 'video'
        ? `<video src="${c.src}" muted autoplay loop playsinline style="width:100%;height:140px;object-fit:cover;display:block"></video>`
        : c.type === 'iframe'
        ? `<div style="position:relative;width:100%;height:140px;overflow:hidden;background:#000">
             <iframe src="${c.src}" style="width:600px;height:420px;transform:scale(.33);transform-origin:0 0;border:0;pointer-events:none"></iframe></div>`
        : c.type === 'text'
        ? `<div style="padding:8px;height:140px;overflow:hidden;font:400 10px/1.4 'JetBrains Mono',monospace;color:#f4ecd8;background:#0d0c0a">${escapeHtml(c.src.slice(0,400))}</div>`
        : `<div style="padding:8px;height:140px;display:grid;place-items:center;color:#7fffe4">${c.type}</div>`;
      return `
        <div data-i="${i}" style="background:#0d0c0a;border:1px solid #211e18;display:flex;flex-direction:column">
          ${preview}
          <div style="padding:6px 8px;font:400 10px/1.3 'JetBrains Mono',monospace;color:#f4ecd8;border-top:1px solid #1a1813;display:flex;gap:6px;align-items:center">
            <span style="color:#ffb000;flex:0 0 auto">${c.type}</span>
            <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:.7">${c.label||c.src.slice(0,60)}</span>
            <button class="rx-edit"  data-i="${i}" style="background:#1a1813;color:#7fffe4;border:0;font:inherit;cursor:pointer;padding:2px 5px">edit</button>
            <button class="rx-send"  data-i="${i}" style="background:#1a1813;color:#c9b3ff;border:0;font:inherit;cursor:pointer;padding:2px 5px">→bus</button>
            <button class="rx-del"   data-i="${i}" style="background:#1a1813;color:#ff3b3b;border:0;font:inherit;cursor:pointer;padding:2px 5px">×</button>
          </div>
        </div>`;
    }).join('') || `<div style="opacity:.4;font-style:italic;grid-column:1/-1;text-align:center;padding:40px">no captures yet · drag, paste, or grab</div>`;
    grid.querySelectorAll('.rx-edit').forEach(b=> b.onclick = ()=> openEditor(+b.dataset.i));
    grid.querySelectorAll('.rx-send').forEach(b=> b.onclick = ()=>{
      const c = captures[+b.dataset.i];
      ctxRef?.bus?.emit?.('scene.entity', { type: c.type, src: c.src, name: c.label });
      setStat('→ bus · ' + c.label);
    });
    grid.querySelectorAll('.rx-del').forEach(b=> b.onclick = ()=>{
      captures.splice(+b.dataset.i, 1); render();
    });
  }

  function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  function openEditor(i){
    const c = captures[i];
    const ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:grid;place-items:center;padding:24px';
    const panel = document.createElement('div');
    panel.style.cssText = 'background:#0a0908;border:1px solid #ffb000;width:min(900px,100%);max-height:90vh;display:flex;flex-direction:column;color:#f4ecd8';
    panel.innerHTML = `
      <div style="padding:10px 14px;border-bottom:1px solid #211e18;display:flex;gap:10px;align-items:center;font:500 10px/1 'JetBrains Mono',monospace;color:#ffb000;text-transform:uppercase;letter-spacing:.2em">
        edit · ${c.type}
        <button id="rx-close" style="margin-left:auto;background:transparent;color:#ff3b3b;border:0;font:inherit;cursor:pointer">close</button>
      </div>
      <div style="padding:14px;overflow-y:auto;display:grid;gap:10px">
        <label>label: <input id="rx-lbl" value="${c.label||''}" style="background:#0d0c0a;color:#f4ecd8;border:1px solid #3a3022;font:inherit;padding:4px 8px;width:100%;font-family:'JetBrains Mono',monospace"></label>
        ${c.type === 'image' || c.type === 'screen'
          ? `<canvas id="rx-cv" style="max-width:100%;background:#000;display:block"></canvas>
             <div style="display:flex;gap:6px;flex-wrap:wrap">
               <button data-f="invert" class="rx-fx" style="background:#1a1813;color:#ffb000;border:0;font:inherit;cursor:pointer;padding:4px 10px">invert</button>
               <button data-f="bw"     class="rx-fx" style="background:#1a1813;color:#ffb000;border:0;font:inherit;cursor:pointer;padding:4px 10px">b&amp;w</button>
               <button data-f="glitch" class="rx-fx" style="background:#1a1813;color:#ffb000;border:0;font:inherit;cursor:pointer;padding:4px 10px">glitch</button>
               <button data-f="reset"  class="rx-fx" style="background:#1a1813;color:#7fffe4;border:0;font:inherit;cursor:pointer;padding:4px 10px">reset</button>
             </div>`
          : c.type === 'text'
          ? `<textarea id="rx-txt" style="width:100%;height:240px;background:#0d0c0a;color:#f4ecd8;border:1px solid #3a3022;font:400 12px/1.5 'JetBrains Mono',monospace;padding:10px">${escapeHtml(c.src)}</textarea>`
          : `<div style="opacity:.6">no inline editor for ${c.type} yet · send to shader runtime for wgsl pass</div>`}
        <button id="rx-save" style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:8px 14px;cursor:pointer">save · publish</button>
      </div>`;
    ov.appendChild(panel);
    document.body.appendChild(ov);

    if(c.type === 'image' || c.type === 'screen'){
      const cv = panel.querySelector('#rx-cv');
      const img = new Image(); img.crossOrigin = 'anonymous'; img.src = c.src;
      img.onload = ()=>{
        cv.width = img.width; cv.height = img.height;
        const g = cv.getContext('2d'); g.drawImage(img, 0, 0);
        panel.querySelectorAll('.rx-fx').forEach(b=> b.onclick = ()=> applyFx(g, cv, b.dataset.f, img));
      };
    }

    panel.querySelector('#rx-close').onclick = ()=> ov.remove();
    panel.querySelector('#rx-save').onclick = ()=>{
      c.label = panel.querySelector('#rx-lbl').value;
      if(c.type === 'text'){ c.src = panel.querySelector('#rx-txt').value; }
      else if(c.type === 'image' || c.type === 'screen'){
        const cv = panel.querySelector('#rx-cv');
        c.src = cv.toDataURL('image/png');
      }
      c.edits = (c.edits||0) + 1;
      ov.remove(); render();
      ctxRef?.bus?.emit?.('remix.edit', c);
      setStat('saved · ' + c.label);
    };
  }

  function applyFx(g, cv, f, img){
    if(f === 'reset'){ g.drawImage(img, 0, 0); return; }
    const d = g.getImageData(0, 0, cv.width, cv.height);
    const p = d.data;
    if(f === 'invert'){ for(let i=0;i<p.length;i+=4){ p[i]=255-p[i]; p[i+1]=255-p[i+1]; p[i+2]=255-p[i+2]; } }
    if(f === 'bw'){ for(let i=0;i<p.length;i+=4){ const y = .3*p[i]+.59*p[i+1]+.11*p[i+2]; p[i]=p[i+1]=p[i+2]=y; } }
    if(f === 'glitch'){
      for(let y=0;y<cv.height;y+=Math.floor(Math.random()*40)+10){
        const off = (Math.random()*40-20)|0;
        const row = g.getImageData(0, y, cv.width, Math.min(8, cv.height-y));
        g.putImageData(row, off, y);
      }
      return;
    }
    g.putImageData(d, 0, 0);
  }

  host.querySelector('#rx-grab').onclick = async ()=>{
    const u = host.querySelector('#rx-url').value.trim(); if(!u) return;
    if(/\.(png|jpe?g|gif|webp|avif)$/i.test(u))      add({ id:Date.now(), type:'image',  src:u, label:u.split('/').pop(), ts:Date.now() });
    else if(/\.(mp4|webm|mov)$/i.test(u))            add({ id:Date.now(), type:'video',  src:u, label:u.split('/').pop(), ts:Date.now() });
    else                                              add({ id:Date.now(), type:'iframe', src:u, label:new URL(u).hostname, ts:Date.now() });
  };

  host.querySelector('#rx-screen').onclick = async ()=>{
    try{
      const s = await navigator.mediaDevices.getDisplayMedia({ video:true });
      const v = document.createElement('video'); v.srcObject = s; await v.play();
      const cv = document.createElement('canvas'); cv.width = v.videoWidth; cv.height = v.videoHeight;
      cv.getContext('2d').drawImage(v, 0, 0);
      s.getTracks().forEach(t=> t.stop());
      add({ id:Date.now(), type:'screen', src: cv.toDataURL('image/png'), label:'screen ' + new Date().toLocaleTimeString(), ts:Date.now() });
    }catch(e){ setStat(e.message, true); }
  };

  host.querySelector('#rx-paste').onclick = async ()=>{
    try{
      const items = await navigator.clipboard.read();
      for(const it of items){
        for(const type of it.types){
          if(type.startsWith('image/')){
            const blob = await it.getType(type);
            const src = URL.createObjectURL(blob);
            add({ id:Date.now(), type:'image', src, label:'clipboard image', ts:Date.now() });
          } else if(type === 'text/plain'){
            const blob = await it.getType(type); const txt = await blob.text();
            add({ id:Date.now(), type:'text', src:txt, label:'clipboard text', ts:Date.now() });
          }
        }
      }
    }catch(e){ setStat(e.message, true); }
  };

  host.querySelector('#rx-share').onclick = ()=>{
    const room = 'xrai-' + Math.random().toString(36).slice(2,8);
    host.querySelector('#rx-room').textContent = room;
    ctxRef?.bus?.emit?.('webrtc.create', { room });
    const url = `${location.origin}${location.pathname}?room=${room}`;
    navigator.clipboard?.writeText(url).then(()=> setStat('room link copied · ' + room));
  };

  // drag-and-drop
  host.addEventListener('dragover', e=>{ e.preventDefault(); host.style.outline = '2px solid #ffb000'; });
  host.addEventListener('dragleave', ()=> host.style.outline = '');
  host.addEventListener('drop', e=>{
    e.preventDefault(); host.style.outline = '';
    [...e.dataTransfer.files].forEach(f=>{
      const src = URL.createObjectURL(f);
      const type = f.type.startsWith('image') ? 'image'
                 : f.type.startsWith('video') ? 'video'
                 : f.type.startsWith('text')  ? 'text'  : 'file';
      add({ id:Date.now(), type, src, label:f.name, ts:Date.now() });
    });
    const text = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
    if(text){ host.querySelector('#rx-url').value = text; host.querySelector('#rx-grab').click(); }
  });

  // listen for captures from chrome ext
  window.addEventListener('message', e=>{
    if(e.data?.kind === 'xrai.remix.capture') add(e.data.cap);
  });

  // consume bus events (jarvis observer routes interesting things here)
  ctx?.bus?.on?.('remix.import', cap=> add(cap));

  render();
}

export function unmount(){ host?.remove(); host = null; ctxRef = null; captures = []; }
export function onEvent(cb){ onEv = cb; }
