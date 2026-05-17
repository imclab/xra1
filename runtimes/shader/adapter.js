// xrai · runtimes/shader — live WGSL/WebGPU shader editor
// inspired by ShaderVine + lab-webgpu-editor + WebGPU Shader Toy (all MIT/Apache)
// every shader on every page becomes transparent + remixable + sharable
// contract: { mount(stage, scene, ctx), unmount(), onEvent(cb) }

let host = null, onEv = null, ctxRef = null;
let device = null, ctx = null, pipeline = null, raf = 0, t0 = 0;
let mouse = { x: 0.5, y: 0.5 };

export const id   = 'shader';
export const meta = { needsGPU:true };

const DEFAULT_WGSL = `// xrai · live wgsl · ctrl+enter to recompile
struct Uniforms { time: f32, w: f32, h: f32, mx: f32, my: f32 };
@group(0) @binding(0) var<uniform> U: Uniforms;

@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  var p = array(vec2f(-1,-1), vec2f(3,-1), vec2f(-1,3));
  return vec4f(p[i], 0, 1);
}

@fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let uv = pos.xy / vec2f(U.w, U.h);
  let m  = vec2f(U.mx, U.my);
  let d  = distance(uv, m);
  let r  = 0.5 + 0.5 * sin(U.time + uv.x*8.0);
  let g  = 0.5 + 0.5 * sin(U.time*1.3 + uv.y*6.0);
  let b  = 0.5 + 0.5 * sin(U.time*1.7 + d*12.0);
  let glow = smoothstep(0.3, 0.0, d);
  return vec4f(vec3f(r, g, b) + glow*vec3f(1.0, 0.7, 0.1), 1.0);
}`;

const SAMPLES = {
  'plasma':   DEFAULT_WGSL,
  'voronoi':  `struct Uniforms { time: f32, w: f32, h: f32, mx: f32, my: f32 };
@group(0) @binding(0) var<uniform> U: Uniforms;
@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  var p = array(vec2f(-1,-1), vec2f(3,-1), vec2f(-1,3)); return vec4f(p[i], 0, 1);
}
fn h2(p: vec2f) -> vec2f { return fract(sin(vec2f(dot(p,vec2f(127.1,311.7)),dot(p,vec2f(269.5,183.3))))*43758.5453); }
@fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let uv = pos.xy / vec2f(U.w, U.h) * 8.0;
  let g = floor(uv); let f = fract(uv);
  var md = 1.0; var mp = vec2f(0);
  for(var y=-1; y<=1; y++){ for(var x=-1; x<=1; x++){
    let n = g + vec2f(f32(x), f32(y));
    let p = vec2f(f32(x), f32(y)) + h2(n) - f;
    let d = length(p);
    if(d < md){ md = d; mp = h2(n); }
  }}
  return vec4f(mp.x, mp.y, 0.5 + 0.5*sin(U.time + md*4.0), 1.0);
}`,
  'raymarch': `struct Uniforms { time: f32, w: f32, h: f32, mx: f32, my: f32 };
@group(0) @binding(0) var<uniform> U: Uniforms;
@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  var p = array(vec2f(-1,-1), vec2f(3,-1), vec2f(-1,3)); return vec4f(p[i], 0, 1);
}
fn sdf(p: vec3f) -> f32 {
  let q = p; var d = length(q) - 1.0;
  d = min(d, length(q - vec3f(sin(U.time)*1.5, 0, 0)) - 0.5);
  return d;
}
@fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let uv = (pos.xy / vec2f(U.w, U.h)) * 2.0 - 1.0;
  let aspect = U.w / U.h;
  let ro = vec3f(0, 0, -3); let rd = normalize(vec3f(uv.x*aspect, uv.y, 1.5));
  var t = 0.0; var hit = 0.0;
  for(var i=0; i<64; i++){ let d = sdf(ro + rd*t); if(d < 0.001){ hit = 1.0; break; } t += d; if(t > 10.0){ break; } }
  return vec4f(vec3f(hit) * (1.0 - t*0.1), 1.0);
}`,
};

export async function mount(stage, scene, _ctx = {}){
  ctxRef = _ctx;
  host = document.createElement('div');
  host.style.cssText = 'position:absolute;inset:0;background:#0a0908;display:grid;grid-template-rows:auto 1fr 1fr auto;color:#f4ecd8';
  stage.appendChild(host);

  const bar = document.createElement('div');
  bar.style.cssText = `
    display:flex;gap:10px;align-items:center;padding:8px 12px;border-bottom:1px solid #211e18;
    font:500 10px/1 'JetBrains Mono',monospace;color:#ffb000;text-transform:uppercase;letter-spacing:.2em`;
  bar.innerHTML = `
    <span style="opacity:.5">shader·wgsl·</span>
    <select id="sh-sample" style="background:#0d0c0a;color:#7fffe4;border:1px solid #3a3022;font:inherit;padding:4px 8px">
      ${Object.keys(SAMPLES).map(k=>`<option value="${k}">${k}</option>`).join('')}
    </select>
    <button id="sh-run"   style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">compile · ⌘↵</button>
    <button id="sh-share" style="background:#7fffe4;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">share</button>
    <button id="sh-fork"  style="background:#0d0c0a;color:#c9b3ff;border:1px solid #3a3022;font:inherit;padding:5px 10px;cursor:pointer">fork→bus</button>
    <span id="sh-fps" style="margin-left:auto;color:#62ff7a">— fps</span>`;
  host.appendChild(bar);

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;background:#000';
  host.appendChild(canvas);

  const ed = document.createElement('textarea');
  ed.id = 'sh-code';
  ed.spellcheck = false;
  ed.style.cssText = `
    width:100%;height:100%;background:#0d0c0a;color:#f4ecd8;border:0;border-top:1px solid #211e18;
    font:400 12px/1.5 'JetBrains Mono',ui-monospace,monospace;padding:10px 12px;resize:none;outline:none;tab-size:2`;
  ed.value = DEFAULT_WGSL;
  host.appendChild(ed);

  const foot = document.createElement('div');
  foot.style.cssText = 'padding:6px 12px;border-top:1px solid #211e18;font:300 10px/1.4 \'JetBrains Mono\',monospace;color:#8a826f;background:#0a0908';
  foot.innerHTML = `<span id="sh-stat">idle</span> · uniforms: time, w, h, mx, my · target: webgpu`;
  host.appendChild(foot);

  const setStat = (m, err)=>{
    const s = host.querySelector('#sh-stat');
    s.style.color = err ? '#ff3b3b' : '#7fffe4';
    s.textContent = m;
  };

  if(!navigator.gpu){ setStat('webgpu unavailable · chrome 113+ / safari 18+ required', true); return; }
  const adapter = await navigator.gpu.requestAdapter();
  if(!adapter){ setStat('no gpu adapter', true); return; }
  device = await adapter.requestDevice();
  ctx = canvas.getContext('webgpu');
  const fmt = navigator.gpu.getPreferredCanvasFormat();
  ctx.configure({ device, format: fmt, alphaMode:'premultiplied' });

  const ubuf = device.createBuffer({ size:32, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
  let bindGroup = null, bgLayout = null;

  function compile(){
    const src = ed.value;
    try{
      const mod = device.createShaderModule({ code: src });
      const pl  = device.createRenderPipeline({
        layout:'auto',
        vertex:   { module: mod, entryPoint:'vs' },
        fragment: { module: mod, entryPoint:'fs', targets:[{ format: fmt }] },
        primitive:{ topology:'triangle-list' },
      });
      bgLayout = pl.getBindGroupLayout(0);
      bindGroup = device.createBindGroup({ layout: bgLayout, entries:[{ binding:0, resource:{ buffer: ubuf }}]});
      pipeline = pl;
      setStat('compiled · ' + new Date().toLocaleTimeString());
      ctxRef?.bus?.emit?.('shader.compile', { src, ok:true });
    }catch(e){ setStat('compile: ' + e.message, true); ctxRef?.bus?.emit?.('shader.compile', { ok:false, err:e.message }); }
  }

  let frames = 0, fpsT = performance.now();
  function frame(){
    raf = requestAnimationFrame(frame);
    const dpr = devicePixelRatio || 1;
    const w = canvas.clientWidth * dpr, h = canvas.clientHeight * dpr;
    if(canvas.width !== w || canvas.height !== h){ canvas.width = w; canvas.height = h; }
    if(!pipeline) return;
    const t = (performance.now() - t0) / 1000;
    device.queue.writeBuffer(ubuf, 0, new Float32Array([t, w, h, mouse.x*w, (1-mouse.y)*h]));
    const enc = device.createCommandEncoder();
    const pass = enc.beginRenderPass({ colorAttachments:[{
      view: ctx.getCurrentTexture().createView(),
      clearValue:{r:0,g:0,b:0,a:1}, loadOp:'clear', storeOp:'store'
    }]});
    pass.setPipeline(pipeline); pass.setBindGroup(0, bindGroup); pass.draw(3); pass.end();
    device.queue.submit([enc.finish()]);
    frames++;
    const now = performance.now();
    if(now - fpsT > 500){
      host.querySelector('#sh-fps').textContent = Math.round(frames * 1000 / (now - fpsT)) + ' fps';
      frames = 0; fpsT = now;
    }
  }

  canvas.onpointermove = e=>{
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width;
    mouse.y = (e.clientY - r.top)  / r.height;
  };

  host.querySelector('#sh-run').onclick = compile;
  host.querySelector('#sh-sample').onchange = e=>{ ed.value = SAMPLES[e.target.value]; compile(); };
  host.querySelector('#sh-share').onclick = ()=>{
    const url = `${location.origin}${location.pathname}#shader=${btoa(encodeURIComponent(ed.value))}`;
    navigator.clipboard?.writeText(url).then(()=> setStat('share url copied'));
  };
  host.querySelector('#sh-fork').onclick = ()=>{
    ctxRef?.bus?.emit?.('shader.fork', { src: ed.value });
    setStat('forked → bus');
  };
  ed.addEventListener('keydown', e=>{
    if((e.metaKey || e.ctrlKey) && e.key === 'Enter'){ e.preventDefault(); compile(); }
    if(e.key === 'Tab'){
      e.preventDefault();
      const s = ed.selectionStart, en = ed.selectionEnd;
      ed.value = ed.value.slice(0,s) + '  ' + ed.value.slice(en);
      ed.selectionStart = ed.selectionEnd = s + 2;
    }
  });

  // deeplink: #shader=<base64>
  const hash = location.hash.match(/shader=([^&]+)/);
  if(hash){ try{ ed.value = decodeURIComponent(atob(hash[1])); }catch{} }

  t0 = performance.now();
  compile();
  frame();
}

export function unmount(){
  cancelAnimationFrame(raf);
  host?.remove(); host = null; ctxRef = null;
  device?.destroy?.(); device = null; ctx = null; pipeline = null;
}
export function onEvent(cb){ onEv = cb; }
