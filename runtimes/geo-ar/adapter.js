// xrai · geo-ar — poor-man's AR companion to geo-map
// camera + DeviceOrientation + nearby-pin overlay. URL: ?lng=&lat=&room=
// shares bus + webrtc room with geo-map so pins sync live across viewers.
//
// bus events (mirror geo-map):
//   geo.pin.add     { id, lng, lat, label, kind }
//   geo.pin.remove  { id }
//   geo.pin.move    { id, lng, lat }

const R = 6371000; // earth radius m
const LS_KEY = 'xrai.geo.pins.v1';
const BC_NAME = 'xrai.geo.pins';

function loadPins(){
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
  catch { return []; }
}
function savePins(pinsMap){
  try {
    const arr = [];
    for (const p of pinsMap.values()) arr.push(p);
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
  } catch {}
}

// haversine distance + bearing from (lat1,lng1) to (lat2,lng2)
function geo(a, b){
  const toR = x=> x*Math.PI/180;
  const dLat = toR(b.lat - a.lat), dLng = toR(b.lng - a.lng);
  const la1 = toR(a.lat), la2 = toR(b.lat);
  const h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLng/2)**2;
  const dist = 2*R*Math.asin(Math.sqrt(h));
  const y = Math.sin(dLng)*Math.cos(la2);
  const x = Math.cos(la1)*Math.sin(la2) - Math.sin(la1)*Math.cos(la2)*Math.cos(dLng);
  const bearing = (Math.atan2(y, x)*180/Math.PI + 360) % 360;
  return { dist, bearing };
}

export async function mount(host, scene, ctx){
  const qp = new URLSearchParams(location.search);
  let me = {
    lng: +qp.get('lng') || null,
    lat: +qp.get('lat') || null,
  };
  let heading = 0; // compass deg, 0=N
  const pins = new Map();
  const bc = ('BroadcastChannel' in window) ? new BroadcastChannel(BC_NAME) : null;

  const wrap = document.createElement('div');
  wrap.style.cssText = `position:relative;width:100%;height:100%;background:#000;
    color:#f4ecd8;overflow:hidden;font:11px/1.4 'JetBrains Mono',monospace`;
  wrap.innerHTML = `
    <video id="ga-v" autoplay playsinline muted
      style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000"></video>
    <div id="ga-ovl" style="position:absolute;inset:0;pointer-events:none"></div>
    <div id="ga-hud" style="position:absolute;top:0;left:0;right:0;padding:8px 12px;
      background:linear-gradient(#000a,#0000);display:flex;gap:10px;align-items:center;
      color:#ffb000;text-transform:uppercase;letter-spacing:.2em;font-size:10px;pointer-events:auto">
      <span>xrai · geo-ar</span>
      <span id="ga-pos" style="color:#7fffe4;text-transform:none;letter-spacing:0">—</span>
      <span style="flex:1"></span>
      <button id="ga-cam"  style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">camera</button>
      <button id="ga-orn"  style="background:#0d0c0a;color:#c9b3ff;border:1px solid #2a2519;font:inherit;padding:5px 10px;cursor:pointer">orient</button>
      <button id="ga-here" style="background:#7fffe4;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">drop</button>
    </div>
    <div id="ga-rdr" style="position:absolute;bottom:14px;left:50%;transform:translateX(-50%);
      width:120px;height:120px;border-radius:50%;background:#0009;border:1px solid #2a2519;
      display:grid;place-items:center;pointer-events:none">
      <div id="ga-rdr-n" style="position:absolute;top:4px;color:#ffb000;font-size:9px">N</div>
      <div id="ga-rdr-c" style="position:absolute;inset:0"></div>
      <div style="width:6px;height:6px;background:#7fffe4;border-radius:50%;box-shadow:0 0 8px #7fffe4"></div>
    </div>`;
  host.appendChild(wrap);

  const v   = wrap.querySelector('#ga-v');
  const ovl = wrap.querySelector('#ga-ovl');
  const pos = wrap.querySelector('#ga-pos');
  const rdrC= wrap.querySelector('#ga-rdr-c');

  // ── camera
  async function startCam(){
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video:{ facingMode:{ ideal:'environment' } }, audio:false });
      v.srcObject = s;
    } catch(e){
      pos.textContent = 'camera · ' + e.message;
    }
  }

  // ── orientation
  async function startOrient(){
    const handler = e=>{
      // webkitCompassHeading: iOS; alpha: spec (counter-cw from N)
      const h = (e.webkitCompassHeading != null) ? e.webkitCompassHeading
              : (e.alpha != null) ? (360 - e.alpha) : null;
      if(h != null) heading = h;
    };
    // iOS needs explicit permission (gesture-gated)
    const DM = window.DeviceOrientationEvent;
    if(DM && typeof DM.requestPermission === 'function'){
      try {
        const r = await DM.requestPermission();
        if(r !== 'granted'){ pos.textContent = 'orient · denied'; return; }
      } catch(e){ pos.textContent = 'orient · ' + e.message; return; }
    }
    window.addEventListener('deviceorientationabsolute', handler, true);
    window.addEventListener('deviceorientation',         handler, true);
  }

  // ── geolocation
  function startGeo(){
    if(!navigator.geolocation){ pos.textContent = 'geo · unsupported'; return; }
    navigator.geolocation.watchPosition(p=>{
      me.lng = p.coords.longitude; me.lat = p.coords.latitude;
    }, err=> pos.textContent = 'geo · ' + err.message,
       { enableHighAccuracy:true, maximumAge:1000 });
  }

  // ── render loop: project each pin to screen X via bearing delta
  function loop(){
    requestAnimationFrame(loop);
    if(me.lat == null || me.lng == null){
      pos.textContent = 'waiting for fix…'; return;
    }
    pos.textContent = `${me.lat.toFixed(5)}, ${me.lng.toFixed(5)} · ${heading.toFixed(0)}°`;

    const fov = 70; // assumed phone fov
    const W = wrap.clientWidth, H = wrap.clientHeight;
    let html = '', radar = '';
    for(const [id, p] of pins){
      const g = geo(me, p);
      let delta = ((g.bearing - heading + 540) % 360) - 180; // [-180,180]
      const inView = Math.abs(delta) < fov/2;
      // radar (60m scope)
      const scale = Math.min(g.dist/60, 1) * 50; // px from center
      const rad = (g.bearing - heading) * Math.PI/180;
      const rx = 60 + Math.sin(rad)*scale, ry = 60 - Math.cos(rad)*scale;
      const col = p.kind==='ar'?'#c9b3ff':p.kind==='asset'?'#7fffe4':'#ffb000';
      radar += `<div style="position:absolute;left:${rx-3}px;top:${ry-3}px;width:6px;height:6px;border-radius:50%;background:${col};box-shadow:0 0 6px currentColor;color:${col}"></div>`;
      if(!inView) continue;
      const x = W/2 + (delta/(fov/2)) * (W/2);
      const sz = Math.max(12, 60 / Math.max(1, g.dist/10)); // closer = bigger
      const d = g.dist < 1000 ? `${g.dist.toFixed(0)}m` : `${(g.dist/1000).toFixed(2)}km`;
      html += `<div style="position:absolute;left:${x-sz/2}px;top:${H/2-sz/2}px;
        width:${sz}px;height:${sz}px;border-radius:50%;background:${col};
        border:2px solid #0d0c0a;box-shadow:0 0 0 1px ${col},0 0 16px currentColor;color:${col}"></div>
        <div style="position:absolute;left:${x}px;top:${H/2+sz/2+4}px;transform:translateX(-50%);
          background:#0009;padding:2px 6px;color:#f4ecd8;font-size:10px;white-space:nowrap">
          ${(p.label||id).slice(0,28)} · ${d}</div>`;
    }
    ovl.innerHTML = html;
    rdrC.innerHTML = radar;
  }
  loop();

  // ── bus sync (matches geo-map protocol)
  function addPin(p, fromBus){
    if(pins.has(p.id)) return;
    pins.set(p.id, p);
    if(!fromBus){
      ctx?.bus?.emit?.('geo.pin.add', p);
      savePins(pins);
      bc?.postMessage({ kind:'add', pin:p });
    }
  }
  function rmPin(id, fromBus){
    if(!pins.delete(id)) return;
    if(!fromBus){
      ctx?.bus?.emit?.('geo.pin.remove', { id });
      savePins(pins);
      bc?.postMessage({ kind:'remove', id });
    }
  }
  ctx?.bus?.on?.('geo.pin.add',    (_t,p)=> addPin(p, true));
  ctx?.bus?.on?.('geo.pin.remove', (_t,p)=> rmPin(p.id, true));
  ctx?.bus?.on?.('geo.pin.move',   (_t,p)=>{
    const e = pins.get(p.id); if(!e) return;
    e.lng = p.lng; e.lat = p.lat;
  });

  // cross-tab sync — fromBus=true short-circuits re-emit
  if(bc) bc.onmessage = (ev)=>{
    const m = ev.data || {};
    if(m.kind === 'add' && m.pin) addPin(m.pin, true);
    else if(m.kind === 'remove' && m.id) rmPin(m.id, true);
    else if(m.kind === 'move' && m.id){
      const e = pins.get(m.id); if(!e) return;
      e.lng = m.lng; e.lat = m.lat;
    }
  };

  // restore persisted pins
  for(const p of loadPins()) addPin(p, true);

  // ── ui
  wrap.querySelector('#ga-cam').onclick  = startCam;
  wrap.querySelector('#ga-orn').onclick  = startOrient;
  wrap.querySelector('#ga-here').onclick = ()=>{
    if(me.lat == null){ pos.textContent = 'no fix yet'; return; }
    addPin({
      id: 'p' + Date.now().toString(36),
      lng: me.lng, lat: me.lat,
      label: 'drop ' + pins.size, kind:'ar',
    });
  };

  // seed
  if(scene?.entities) for(const x of scene.entities){
    if(x.type === 'geo' && typeof x.lng === 'number' && typeof x.lat === 'number'){
      addPin({ id: x.id || ('p'+Date.now().toString(36)),
        lng:x.lng, lat:x.lat, label:x.name||x.label||'', kind:x.kind||'pin' }, true);
    }
  }

  // auto-start camera + geo on mount; orientation needs user gesture on iOS
  startCam(); startGeo();
}
