// xrai · runtimes/gesture — hand-tracked gesture interface
// stack: MediaPipe Tasks Vision HandLandmarker (Google AI Studio cosmos-style)
// runs as universal overlay; emits ctx.bus 'gesture.*' events for any adapter to consume
// contract: { mount(stage, scene, ctx), unmount(), onEvent(cb) }

let host = null, video = null, canvas = null, stream = null, raf = 0;
let lm = null, running = false, onEv = null, ctxRef = null;
let lastPinch = false, lastFist = false;

export const id   = 'gesture';
export const meta = { needsCam:true, overlay:true };

const VISION = 'https://esm.sh/@mediapipe/tasks-vision@0.10.14';
const MODEL  = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const WASM   = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';

export async function mount(stage, scene, ctx = {}){
  ctxRef = ctx;
  host = document.createElement('div');
  host.style.cssText = 'position:absolute;inset:0;background:#000;color:#f4ecd8;display:grid;grid-template-rows:auto 1fr auto';
  stage.appendChild(host);

  const bar = document.createElement('div');
  bar.style.cssText = `
    display:flex;gap:10px;align-items:center;padding:8px 12px;border-bottom:1px solid #211e18;
    font:500 10px/1 'JetBrains Mono',ui-monospace,monospace;color:#ffb000;
    text-transform:uppercase;letter-spacing:.2em;background:#0d0c0a`;
  bar.innerHTML = `
    <span style="opacity:.5">gesture·</span>
    <button id="g-start" style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">start cam</button>
    <button id="g-stop"  style="background:#0d0c0a;color:#ffb000;border:1px solid #3a3022;font:inherit;padding:5px 10px;cursor:pointer">stop</button>
    <label style="display:flex;gap:6px;align-items:center;cursor:pointer">
      <input id="g-emit" type="checkbox" checked> emit to bus
    </label>
    <span id="g-stat" style="opacity:.6;font-style:italic;margin-left:auto">idle</span>`;
  host.appendChild(bar);

  const stageWrap = document.createElement('div');
  stageWrap.style.cssText = 'position:relative;overflow:hidden;background:#000;min-height:0';
  stageWrap.innerHTML = `
    <video id="g-vid" autoplay playsinline muted style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scaleX(-1)"></video>
    <canvas id="g-cv" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;transform:scaleX(-1)"></canvas>
    <div id="g-hud" style="position:absolute;top:10px;left:10px;font:500 11px/1.4 'JetBrains Mono',monospace;color:#7fffe4;text-shadow:0 1px 2px #000;background:rgba(13,12,10,.6);padding:6px 10px;border:1px solid rgba(127,255,228,.3)">no hands</div>`;
  host.appendChild(stageWrap);

  const foot = document.createElement('div');
  foot.style.cssText = 'padding:6px 12px;border-top:1px solid #211e18;font:300 10px/1.4 \'JetBrains Mono\',monospace;color:#8a826f;background:#0a0908';
  foot.innerHTML = `events: <span style="color:#62ff7a">gesture.pinch</span> · <span style="color:#ffb000">gesture.fist</span> · <span style="color:#7fffe4">gesture.point</span> · <span style="color:#c9b3ff">gesture.frame</span> {hands:[{landmarks,handedness}]}`;
  host.appendChild(foot);

  video  = host.querySelector('#g-vid');
  canvas = host.querySelector('#g-cv');

  const setStat = (m, err)=>{
    const s = host.querySelector('#g-stat');
    s.style.color = err ? '#ff3b3b' : '#7fffe4';
    s.textContent = m;
  };

  async function init(){
    if(lm) return;
    setStat('loading mediapipe…');
    const vis = await import(VISION);
    const filesetResolver = await vis.FilesetResolver.forVisionTasks(WASM);
    lm = await vis.HandLandmarker.createFromOptions(filesetResolver, {
      baseOptions: { modelAssetPath: MODEL, delegate: 'GPU' },
      numHands: 2,
      runningMode: 'VIDEO',
    });
    setStat('mediapipe ready');
  }

  async function start(){
    try{
      await init();
      stream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:'user', width:1280, height:720 } });
      video.srcObject = stream;
      await video.play();
      running = true;
      setStat('tracking');
      loop();
    }catch(e){ setStat(e.message, true); }
  }
  function stop(){
    running = false; cancelAnimationFrame(raf);
    stream?.getTracks().forEach(t=>t.stop()); stream = null;
    video.srcObject = null;
    const g = canvas.getContext('2d'); g.clearRect(0,0,canvas.width,canvas.height);
    setStat('stopped');
  }

  function loop(){
    if(!running) return;
    raf = requestAnimationFrame(loop);
    if(video.readyState < 2) return;
    const w = video.videoWidth, h = video.videoHeight;
    if(canvas.width !== w){ canvas.width = w; canvas.height = h; }
    const res = lm.detectForVideo(video, performance.now());
    const g = canvas.getContext('2d');
    g.clearRect(0,0,w,h);
    const emit = host.querySelector('#g-emit').checked;
    const hands = (res.landmarks||[]).map((lms, i)=>{
      drawHand(g, lms, w, h);
      const hand = { landmarks: lms, handedness: res.handedness?.[i]?.[0]?.categoryName || '?' };
      detectGestures(hand, emit);
      return hand;
    });
    host.querySelector('#g-hud').textContent = hands.length
      ? `${hands.length} hand${hands.length>1?'s':''} · ${hands.map(h=>h.handedness).join(' / ')}`
      : 'no hands';
    if(emit && hands.length){ ctxRef?.bus?.emit?.('gesture.frame', { hands }); }
  }

  function drawHand(g, lms, w, h){
    const CONN = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]];
    g.strokeStyle = '#7fffe4'; g.lineWidth = 2.5;
    CONN.forEach(([a,b])=>{
      g.beginPath();
      g.moveTo(lms[a].x*w, lms[a].y*h);
      g.lineTo(lms[b].x*w, lms[b].y*h);
      g.stroke();
    });
    g.fillStyle = '#ffb000';
    lms.forEach((p,i)=>{
      g.beginPath();
      g.arc(p.x*w, p.y*h, i===8||i===4?6:3, 0, Math.PI*2);
      g.fill();
    });
  }

  function detectGestures(hand, emit){
    const lms = hand.landmarks;
    const d = (a,b)=> Math.hypot(lms[a].x-lms[b].x, lms[a].y-lms[b].y, (lms[a].z||0)-(lms[b].z||0));
    const pinch = d(4,8) < 0.05;
    const fist  = d(8,0) < 0.18 && d(12,0) < 0.18 && d(16,0) < 0.18 && d(20,0) < 0.18;
    const point = !fist && d(8,0) > 0.18 && d(12,0) < 0.18;
    const tip = lms[8]; // index tip
    if(pinch && !lastPinch && emit) ctxRef?.bus?.emit?.('gesture.pinch', { hand, tip });
    if(fist  && !lastFist  && emit) ctxRef?.bus?.emit?.('gesture.fist',  { hand });
    if(point && emit) ctxRef?.bus?.emit?.('gesture.point', { hand, tip });
    lastPinch = pinch; lastFist = fist;
  }

  host.querySelector('#g-start').onclick = start;
  host.querySelector('#g-stop').onclick  = stop;
}

export function unmount(){
  running = false; cancelAnimationFrame(raf);
  stream?.getTracks().forEach(t=>t.stop()); stream = null;
  host?.remove(); host = null; ctxRef = null;
}

export function onEvent(cb){ onEv = cb; }
