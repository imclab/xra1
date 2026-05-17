// xrai · geo-map — maplibre base + xrai pin layer
// every idea, anywhere on earth. click to drop, drag to move, bus to sync.
// API: mount(host, scene, ctx) — no build, CDN-loaded
//
// bus events:
//   geo.pin.add    { id, lng, lat, label, kind }
//   geo.pin.move   { id, lng, lat }
//   geo.pin.remove { id }
//   geo.view       { lng, lat, zoom, bearing, pitch }

const ML_CSS = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css';
const ML_JS  = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js';
const STYLE  = 'https://tiles.openfreemap.org/styles/liberty'; // free, no key

const LS_KEY = 'xrai.geo.pins.v1';
const BC_NAME = 'xrai.geo.pins';

function loadPins(){
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
  catch { return []; }
}
function savePins(pinsMap){
  try {
    const arr = [];
    for (const { data } of pinsMap.values()) arr.push(data);
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
  } catch {}
}

function loadOnce(){
  if(window.__maplibre_loading) return window.__maplibre_loading;
  return window.__maplibre_loading = new Promise((res, rej)=>{
    if(window.maplibregl) return res(window.maplibregl);
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = ML_CSS;
    document.head.appendChild(css);
    const s = document.createElement('script'); s.src = ML_JS;
    s.onload = ()=> res(window.maplibregl);
    s.onerror = ()=> rej(new Error('maplibre cdn fail'));
    document.head.appendChild(s);
  });
}

export async function mount(host, scene, ctx){
  const wrap = document.createElement('div');
  wrap.style.cssText = `position:relative;width:100%;height:100%;background:#050403;
    color:#f4ecd8;display:grid;grid-template-rows:auto 1fr;font:11px/1.4 'JetBrains Mono',monospace`;
  wrap.innerHTML = `
    <div style="padding:8px 12px;background:#0a0908;border-bottom:1px solid #211e18;display:flex;gap:10px;align-items:center;color:#ffb000;text-transform:uppercase;letter-spacing:.2em;font-size:10px">
      <span>xrai · geo-map</span>
      <input id="gm-search" placeholder="lng,lat or label · pin" style="flex:1;background:#0d0c0a;color:#f4ecd8;border:1px solid #2a2519;font:inherit;padding:5px 8px;text-transform:none;letter-spacing:.04em">
      <button id="gm-pin"  style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">drop</button>
      <button id="gm-here" style="background:#7fffe4;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">here</button>
      <button id="gm-ar"   style="background:#0d0c0a;color:#c9b3ff;border:1px solid #2a2519;font:inherit;padding:5px 10px;cursor:pointer">→ ar</button>
    </div>
    <div id="gm-map" style="position:relative;width:100%;height:100%"></div>`;
  host.appendChild(wrap);
  const mapEl = wrap.querySelector('#gm-map');

  let ml;
  try { ml = await loadOnce(); }
  catch(e){
    mapEl.innerHTML = `<div style="padding:24px;color:#ff3b3b">maplibre cdn unreachable · ${e.message}</div>`;
    return;
  }

  const map = new ml.Map({
    container: mapEl,
    style: STYLE,
    center: [-122.4194, 37.7749], // sf default
    zoom: 11,
    attributionControl: { compact: true },
  });

  const pins = new Map(); // id → { marker, data }
  let pickMode = false;
  const bc = ('BroadcastChannel' in window) ? new BroadcastChannel(BC_NAME) : null;

  function makeEl(kind){
    const d = document.createElement('div');
    d.style.cssText = `width:18px;height:18px;border-radius:50%;cursor:pointer;
      background:${kind==='ar'?'#c9b3ff':kind==='asset'?'#7fffe4':'#ffb000'};
      border:2px solid #0d0c0a;box-shadow:0 0 0 1px #ffb000,0 0 12px currentColor`;
    return d;
  }

  function addPin(p, fromBus){
    if(pins.has(p.id)) return;
    const el = makeEl(p.kind);
    const m = new ml.Marker({ element: el, draggable: true })
      .setLngLat([p.lng, p.lat])
      .setPopup(new ml.Popup({ offset: 14 }).setHTML(
        `<div style="font:11px/1.4 'JetBrains Mono',monospace;color:#0d0c0a;min-width:120px">
           <b style="color:#ffb000">${(p.label||p.id).slice(0,40)}</b><br>
           <small style="color:#666">${p.lng.toFixed(5)}, ${p.lat.toFixed(5)}</small><br>
           <button data-rm="${p.id}" style="margin-top:4px;background:#ff3b3b;color:#fff;border:0;font:inherit;cursor:pointer;padding:2px 6px">remove</button>
         </div>`))
      .addTo(map);
    m.on('dragend', ()=>{
      const ll = m.getLngLat();
      p.lng = ll.lng; p.lat = ll.lat;
      ctx?.bus?.emit?.('geo.pin.move', { id:p.id, lng:p.lng, lat:p.lat });
      savePins(pins);
      bc?.postMessage({ kind:'move', id:p.id, lng:p.lng, lat:p.lat });
    });
    m.getElement().addEventListener('click', ()=> setTimeout(()=>{
      const btn = document.querySelector(`[data-rm="${p.id}"]`);
      if(btn) btn.onclick = ()=> removePin(p.id);
    }, 50));
    pins.set(p.id, { marker: m, data: p });
    if(!fromBus){
      ctx?.bus?.emit?.('geo.pin.add', p);
      savePins(pins);
      bc?.postMessage({ kind:'add', pin:p });
    }
  }

  function removePin(id, fromBus){
    const e = pins.get(id); if(!e) return;
    e.marker.remove(); pins.delete(id);
    if(!fromBus){
      ctx?.bus?.emit?.('geo.pin.remove', { id });
      savePins(pins);
      bc?.postMessage({ kind:'remove', id });
    }
  }

  // map click → drop pin (when pick mode active)
  map.on('click', e=>{
    if(!pickMode) return;
    pickMode = false;
    wrap.querySelector('#gm-pin').style.background = '#ffb000';
    addPin({
      id: 'p' + Date.now().toString(36),
      lng: e.lngLat.lng, lat: e.lngLat.lat,
      label: 'pin ' + pins.size, kind:'pin',
    });
  });

  // emit view updates (debounced)
  let t; map.on('moveend', ()=>{
    clearTimeout(t);
    t = setTimeout(()=>{
      const c = map.getCenter();
      ctx?.bus?.emit?.('geo.view', {
        lng: c.lng, lat: c.lat,
        zoom: map.getZoom(), bearing: map.getBearing(), pitch: map.getPitch(),
      });
    }, 250);
  });

  // bus listeners (other peers / runtimes can push pins in)
  ctx?.bus?.on?.('geo.pin.add',    (_t,p)=> addPin(p, true));
  ctx?.bus?.on?.('geo.pin.remove', (_t,p)=> removePin(p.id, true));
  ctx?.bus?.on?.('geo.pin.move',   (_t,p)=>{
    const e = pins.get(p.id); if(!e) return;
    e.marker.setLngLat([p.lng, p.lat]); e.data.lng = p.lng; e.data.lat = p.lat;
  });

  // cross-tab sync via BroadcastChannel — fromBus=true short-circuits the re-emit
  if(bc) bc.onmessage = (ev)=>{
    const m = ev.data || {};
    if(m.kind === 'add' && m.pin) addPin(m.pin, true);
    else if(m.kind === 'remove' && m.id) removePin(m.id, true);
    else if(m.kind === 'move' && m.id){
      const e = pins.get(m.id); if(!e) return;
      e.marker.setLngLat([m.lng, m.lat]); e.data.lng = m.lng; e.data.lat = m.lat;
    }
  };

  // restore persisted pins (before scene seed, so seed wins on id collision)
  for(const p of loadPins()) addPin(p, true);

  // ui
  wrap.querySelector('#gm-pin').onclick = (e)=>{
    pickMode = !pickMode;
    e.target.style.background = pickMode ? '#62ff7a' : '#ffb000';
    mapEl.style.cursor = pickMode ? 'crosshair' : '';
  };

  wrap.querySelector('#gm-here').onclick = ()=>{
    if(!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos=>{
      const { longitude, latitude } = pos.coords;
      map.flyTo({ center: [longitude, latitude], zoom: 16 });
      addPin({ id:'me-' + Date.now().toString(36), lng:longitude, lat:latitude, label:'me', kind:'ar' });
    }, err=> alert('geo · ' + err.message));
  };

  wrap.querySelector('#gm-ar').onclick = ()=>{
    const c = map.getCenter();
    const params = new URLSearchParams({ mode:'geo-ar', lng:c.lng, lat:c.lat });
    window.open(`${location.pathname}?${params}`, '_blank');
  };

  wrap.querySelector('#gm-search').addEventListener('keydown', e=>{
    if(e.key !== 'Enter') return;
    const v = e.target.value.trim(); if(!v) return;
    const m = v.match(/^\s*(-?\d+\.?\d*)\s*[,\s]\s*(-?\d+\.?\d*)\s*$/);
    if(m){
      const [_, a, b] = m;
      // accept either lng,lat or lat,lng (assume lng,lat unless |a|>90)
      const lng = Math.abs(+a) > 90 ? +b : +a;
      const lat = Math.abs(+a) > 90 ? +a : +b;
      map.flyTo({ center: [lng, lat], zoom: 14 });
      addPin({ id:'p' + Date.now().toString(36), lng, lat, label:v, kind:'pin' });
    } else {
      // nominatim free geocode
      fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(v))
        .then(r=> r.json()).then(j=>{
          if(!j[0]) return;
          const lng = +j[0].lon, lat = +j[0].lat;
          map.flyTo({ center: [lng, lat], zoom: 14 });
          addPin({ id:'p' + Date.now().toString(36), lng, lat, label:j[0].display_name.slice(0,60), kind:'pin' });
        });
    }
    e.target.value = '';
  });

  // seed from scene.entities of type 'geo'
  if(scene?.entities) for(const x of scene.entities){
    if(x.type === 'geo' && typeof x.lng === 'number' && typeof x.lat === 'number'){
      addPin({ id: x.id || ('p'+Date.now().toString(36)), lng:x.lng, lat:x.lat, label:x.name||x.label||'', kind:x.kind||'pin' });
    }
  }
}
