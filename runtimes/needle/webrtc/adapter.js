// xrai · runtimes/needle/webrtc — token-free multiplayer
// contract: { mount(stage, scene, ctx), unmount() }
//
// Stack: trystero (https://github.com/dmotz/trystero) — serverless P2P via public BitTorrent / Nostr / IPFS
// trackers. No tokens, no auth, no backend, works out of the box.
//
// Surface: room name + nick + avatar puck + voice + screenshare. Progresses toward Needle Engine
// holographic-conf style: avatar Transform → XRAI scene entities, voice stream → spatial audio,
// screenshare → texture sourced VFX. Drop-in to Needle Engine when the project pulls in
// `@needle-tools/engine` — replace the room/voice surface with engine.networking primitives.

import { joinRoom } from 'https://esm.sh/trystero@0.20.0/torrent';

let host = null, room = null, onEv = null, nick = '';
let peers = {};                       // { id: { nick, color, x, y } }
let cleanups = [];

export const id   = 'needle-webrtc';
export const meta = { needsNet:true, p2p:true, tokenFree:true };

const COLORS = ['#ffb000','#7fffe4','#ff3b3b','#62ff7a','#c9b3ff','#ff7fa9','#ffd866','#7fc9ff'];
const rndNick = () => 'guest-' + Math.floor(Math.random()*9000+1000);

export async function mount(stage, scene, ctx = {}){
  host = document.createElement('div');
  host.style.cssText = 'position:absolute;inset:0;background:#0a0908;display:flex;flex-direction:column;font:500 11px/1 "JetBrains Mono",ui-monospace,monospace;color:#f4ecd8';
  stage.appendChild(host);

  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex;gap:8px;align-items:center;padding:8px 12px;border-bottom:1px solid #211e18;color:#ffb000;text-transform:uppercase;letter-spacing:.18em;font-size:10px;flex-wrap:wrap';
  bar.innerHTML = `
    <span style="opacity:.5">webrtc·</span>
    <input id="nd-room" value="${ctx.room || 'xrai-lobby'}" style="background:#0d0c0a;color:#f4ecd8;border:1px solid #3a3022;font:inherit;padding:4px 8px;letter-spacing:.06em;text-transform:none">
    <input id="nd-nick" placeholder="nick" value="${rndNick()}" style="background:#0d0c0a;color:#f4ecd8;border:1px solid #3a3022;font:inherit;padding:4px 8px;letter-spacing:.06em;text-transform:none;width:120px">
    <button id="nd-join" style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">join</button>
    <button id="nd-leave" disabled style="background:transparent;color:#ff3b3b;border:1px solid #3a3022;font:inherit;padding:5px 10px;cursor:pointer">leave</button>
    <button id="nd-mic"   disabled style="background:transparent;color:#7fffe4;border:1px solid #3a3022;font:inherit;padding:5px 10px;cursor:pointer">🎤 mic</button>
    <button id="nd-cam"   disabled style="background:transparent;color:#7fffe4;border:1px solid #3a3022;font:inherit;padding:5px 10px;cursor:pointer">📷 cam</button>
    <button id="nd-scr"   disabled style="background:transparent;color:#7fffe4;border:1px solid #3a3022;font:inherit;padding:5px 10px;cursor:pointer">🖥 screen</button>
    <button id="nd-share" disabled style="background:transparent;color:#7fffe4;border:1px solid #3a3022;font:inherit;padding:5px 10px;cursor:pointer">⧉ link</button>
    <span id="nd-stat" style="opacity:.6;font-style:italic;text-transform:none;letter-spacing:.04em">idle</span>`;
  host.appendChild(bar);

  const split = document.createElement('div');
  split.style.cssText = 'flex:1;display:grid;grid-template-columns:1fr 240px;gap:0;min-height:0';
  host.appendChild(split);

  const floor = document.createElement('div');
  floor.id = 'nd-floor';
  floor.style.cssText = `
    position:relative;background:
      radial-gradient(ellipse at 50% 50%, rgba(255,176,0,.04) 0%, transparent 60%),
      repeating-linear-gradient(0deg, transparent 0 39px, #1a1812 39px 40px),
      repeating-linear-gradient(90deg, transparent 0 39px, #1a1812 39px 40px),
      #050403;
    overflow:hidden;cursor:crosshair`;
  split.appendChild(floor);

  const side = document.createElement('div');
  side.style.cssText = 'border-left:1px solid #211e18;background:#0d0c0a;display:flex;flex-direction:column;overflow:hidden';
  side.innerHTML = `
    <div style="padding:10px 12px;font-size:10px;text-transform:uppercase;letter-spacing:.22em;color:#ffb000;border-bottom:1px solid #211e18">Peers · <span id="nd-count">0</span></div>
    <div id="nd-peers" style="flex:1;overflow-y:auto;padding:8px 0"></div>
    <div id="nd-media" style="display:grid;grid-template-columns:1fr 1fr;gap:2px;padding:2px;border-top:1px solid #211e18;background:#000"></div>`;
  split.appendChild(side);

  const set = (m, err) => {
    const s = host.querySelector('#nd-stat');
    s.style.color = err ? '#ff3b3b' : '#7fffe4';
    s.textContent = m;
  };

  // local puck
  const localPuck = puckEl(host.querySelector('#nd-nick').value, COLORS[0], true);
  floor.appendChild(localPuck);
  centerPuck(localPuck, floor);

  floor.addEventListener('pointermove', (e) => {
    const r = floor.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    movePuck(localPuck, x, y, floor);
    sendPose?.({ x, y, t: performance.now() });
  });

  // join
  host.querySelector('#nd-join').onclick = async () => {
    if(room){ set('already in room'); return; }
    nick = host.querySelector('#nd-nick').value.trim() || rndNick();
    const roomId = host.querySelector('#nd-room').value.trim() || 'xrai-lobby';
    set('connecting via bittorrent trackers…');
    try{
      room = joinRoom({ appId: 'xrai.dev' }, roomId);
    }catch(e){ set(e.message, true); return; }

    const [sendPoseFn, getPose]   = room.makeAction('pose');
    const [sendChatFn, getChat]   = room.makeAction('chat');
    const [sendNickFn, getNick]   = room.makeAction('nick');
    window.__xrai_send_pose = sendPoseFn;
    sendPose = sendPoseFn;

    sendNickFn({ nick });

    room.onPeerJoin(id => {
      peers[id] = { nick:'?', color: COLORS[Object.keys(peers).length % COLORS.length] };
      const p = puckEl('?', peers[id].color, false);
      p.dataset.peer = id;
      floor.appendChild(p);
      sendNickFn({ nick });
      refreshPeers();
      onEv?.({ type:'webrtc.join', peer:id });
    });
    room.onPeerLeave(id => {
      delete peers[id];
      floor.querySelector(`[data-peer="${id}"]`)?.remove();
      side.querySelector(`#nd-media [data-peer="${id}"]`)?.remove();
      refreshPeers();
      onEv?.({ type:'webrtc.leave', peer:id });
    });

    getNick(({ nick:n }, id) => {
      if(peers[id]){ peers[id].nick = n; const p = floor.querySelector(`[data-peer="${id}"]`); if(p) p.querySelector('.nick').textContent = n; refreshPeers(); }
    });
    getPose(({ x,y }, id) => {
      const p = floor.querySelector(`[data-peer="${id}"]`); if(p) movePuck(p, x, y, floor);
    });
    getChat((msg, id) => onEv?.({ type:'webrtc.chat', from:id, msg }));

    room.onPeerStream((stream, id, meta) => {
      const tile = document.createElement('div');
      tile.dataset.peer = id;
      tile.style.cssText = 'position:relative;background:#000;aspect-ratio:1;overflow:hidden';
      const v = document.createElement(stream.getVideoTracks().length ? 'video' : 'audio');
      v.autoplay = true; v.playsInline = true; v.srcObject = stream;
      v.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
      tile.appendChild(v);
      const lbl = document.createElement('div');
      lbl.style.cssText = 'position:absolute;bottom:0;left:0;right:0;font:500 8px/1 "JetBrains Mono",monospace;color:#fff;background:rgba(0,0,0,.6);padding:2px 4px;letter-spacing:.1em;text-transform:uppercase';
      lbl.textContent = (peers[id]?.nick || '?') + ' · ' + (meta?.kind || 'stream');
      tile.appendChild(lbl);
      side.querySelector('#nd-media').appendChild(tile);
    });

    host.querySelector('#nd-join').disabled  = true;
    ['nd-leave','nd-mic','nd-cam','nd-scr','nd-share'].forEach(b => host.querySelector('#'+b).disabled = false);
    set(`room · ${roomId}`);
    onEv?.({ type:'webrtc.room', room:roomId });
  };

  let sendPose = null;
  let localStreams = {};

  async function shareMedia(kind){
    if(localStreams[kind]){
      localStreams[kind].getTracks().forEach(t => t.stop());
      delete localStreams[kind];
      set(`${kind} stopped`);
      return;
    }
    let stream;
    try{
      stream = kind === 'screen'
        ? await navigator.mediaDevices.getDisplayMedia({ video:true, audio:true })
        : await navigator.mediaDevices.getUserMedia(kind === 'mic' ? { audio:true } : { video:true });
    }catch(e){ set(e.message, true); return; }
    localStreams[kind] = stream;
    if(room) room.addStream(stream, null, { kind });
    set(`${kind} live`);
  }
  host.querySelector('#nd-mic').onclick = () => shareMedia('mic');
  host.querySelector('#nd-cam').onclick = () => shareMedia('cam');
  host.querySelector('#nd-scr').onclick = () => shareMedia('screen');
  host.querySelector('#nd-share').onclick = () => {
    const r = host.querySelector('#nd-room').value.trim();
    const url = new URL(location.href);
    url.searchParams.set('room', r);
    navigator.clipboard.writeText(url.href);
    set('link copied');
  };
  host.querySelector('#nd-leave').onclick = () => {
    Object.values(localStreams).forEach(s => s.getTracks().forEach(t=>t.stop()));
    localStreams = {};
    try{ room?.leave(); }catch{}
    room = null; peers = {};
    floor.querySelectorAll('[data-peer]').forEach(e => e.remove());
    side.querySelector('#nd-media').innerHTML = '';
    refreshPeers();
    host.querySelector('#nd-join').disabled  = false;
    ['nd-leave','nd-mic','nd-cam','nd-scr','nd-share'].forEach(b => host.querySelector('#'+b).disabled = true);
    set('left');
  };

  function refreshPeers(){
    const ul = side.querySelector('#nd-peers');
    const count = Object.keys(peers).length;
    side.querySelector('#nd-count').textContent = count;
    ul.innerHTML = `<div style="padding:6px 14px;color:${COLORS[0]};font-size:11px;letter-spacing:.06em"><span style="display:inline-block;width:8px;height:8px;background:${COLORS[0]};border-radius:50%;margin-right:8px"></span>${nick} <span style="opacity:.5;float:right;font-size:9px">you</span></div>`
      + Object.entries(peers).map(([id,p]) =>
          `<div style="padding:6px 14px;color:${p.color};font-size:11px;letter-spacing:.06em"><span style="display:inline-block;width:8px;height:8px;background:${p.color};border-radius:50%;margin-right:8px"></span>${p.nick}<span style="opacity:.4;float:right;font-size:9px">${id.slice(0,4)}</span></div>`
        ).join('');
  }
  refreshPeers();

  // auto-join from URL ?room=
  const q = new URLSearchParams(location.search);
  if(q.get('room')){
    host.querySelector('#nd-room').value = q.get('room');
    host.querySelector('#nd-join').click();
  }
}

function puckEl(nick, color, self){
  const e = document.createElement('div');
  e.style.cssText = `
    position:absolute;width:38px;height:38px;border-radius:50%;
    background:${color};box-shadow:0 0 24px ${color},inset 0 -8px 14px rgba(0,0,0,.35);
    transform:translate(-50%,-50%);transition:left .12s linear,top .12s linear;pointer-events:none;
    display:grid;place-items:center;font:700 9px/1 'JetBrains Mono',monospace;color:#0d0c0a;letter-spacing:.05em`;
  e.innerHTML = `<span class="nick" style="position:absolute;top:42px;left:50%;transform:translateX(-50%);background:rgba(13,12,10,.8);padding:2px 6px;color:${color};text-transform:uppercase;letter-spacing:.18em;font-size:8px;white-space:nowrap">${nick}</span><span>${self?'•':'○'}</span>`;
  return e;
}
function centerPuck(el, floor){ el.style.left = '50%'; el.style.top = '50%'; }
function movePuck(el, x, y){ el.style.left = (x*100)+'%'; el.style.top = (y*100)+'%'; }

export function unmount(){
  try{ room?.leave(); }catch{}
  room = null; peers = {}; cleanups.forEach(c => c()); cleanups = [];
  host?.remove(); host = null;
}

export function onEvent(cb){ onEv = cb; }
