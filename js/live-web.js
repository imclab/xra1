// live-web.js
// ─────────────────────────────────────────────────────────────────────────────
// LiveKit-backed live session for xrai.dev.
// Reuses patterns from portals_v4/web/rgbd-viewer/src/LiveKitReceiver.ts +
// portals_v4/src/services/livekit/LiveKitService.ts — same server / room model,
// so a single room ID is interoperable between the Portals iOS app and
// xrai.dev browsers.
//
// v0 scope:
//   • Automate room creation — URL ?room=<id> = canonical room pointer
//   • One-tap invite (clipboard + share sheet where supported)
//   • Connect w/ LiveKit server URL + access token
//     - Prefer /api/livekit-token?room&identity (Cloudflare Worker stub)
//     - Fallback: paste-your-own-token modal (same pattern as rgbd-viewer)
//   • Publish local camera (optional — explicit button click)
//   • Subscribe remote video → small corner video tile (draggable later)
//   • DataChannel pass-through for XRAI deltas (scene edits) — reuses same
//     message shape as spec 001 bridge types
//   • Cross-surface interop: Portals iOS app + xrai.dev browsers in same room
//
// v1 upgrade (not shipped here):
//   • RGBD hologram reconstruction (reuse RGBDPointCloud + HueDepthCodec
//     from web/rgbd-viewer/src/)
//   • Head + hand pose broadcast (WebXR / MediaPipe landmarks over DataChannel)
//   • Record3D iOS client interop (MetavidoLiveARKit feeder + cameraParams)
//
// References:
//   • Needle multiplayer — WebRTC + sample rooms (share transport API style)
//   • PlayCanvas collaboration — session-based multi-user sync (URL room id)
//   • Record3D → Portals — MetavidoLiveARKit/LiveARKitFeeder.cs (iOS client)
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_LK_URL = 'wss://portals-dev.livekit.cloud';
const LK_CLIENT_CDN = 'https://esm.sh/livekit-client@2.7.0';

function uuid() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

function getRoomFromURL() {
  const p = new URLSearchParams(location.search);
  return p.get('room') || null;
}
function setRoomInURL(id) {
  const p = new URLSearchParams(location.search);
  p.set('room', id);
  history.replaceState(null, '', `${location.pathname}?${p.toString()}${location.hash}`);
}

export class Live {
  constructor({ showToast }) {
    this.showToast = showToast || (m => console.log(m));
    this.room = null;
    this.client = null;
    this.active = false;
    this.toggleBtn = null;
    this.tile = null;
    this.videoEl = null;
    this.overlay = null;
    this.roomId = getRoomFromURL();
  }

  async _loadClient() {
    if (this.client) return this.client;
    try {
      this.client = await import(LK_CLIENT_CDN);
      return this.client;
    } catch (e) {
      this.showToast('LiveKit client failed to load — check network.', 4500);
      throw e;
    }
  }

  // Fetch a token. Order: token endpoint (window.LK_TOKEN_URL cross-origin
  // Worker, else same-origin /api/livekit-token) → LiveKit Cloud sandbox token
  // server (zero-deploy demo; set <meta name="lk-sandbox"> or ?lk_sandbox=) →
  // null (triggers paste-your-own modal). Returns { token, serverUrl } | null.
  async _fetchToken(roomId, identity) {
    const base = (typeof window !== 'undefined' && window.LK_TOKEN_URL) || '/api/livekit-token';
    try {
      const sep = base.includes('?') ? '&' : '?';
      const res = await fetch(`${base}${sep}room=${encodeURIComponent(roomId)}&identity=${encodeURIComponent(identity)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.token) return { token: data.token, serverUrl: data.serverUrl || null };
      }
    } catch {}
    const sandboxId = (typeof document !== 'undefined' && document.querySelector('meta[name="lk-sandbox"]')?.content)
      || (typeof location !== 'undefined' && new URLSearchParams(location.search).get('lk_sandbox'))
      || (typeof window !== 'undefined' && window.LK_SANDBOX_ID) || null;
    if (sandboxId && sandboxId !== 'REPLACE_WITH_SANDBOX_ID') {
      try {
        const res = await fetch('https://cloud-api.livekit.io/api/sandbox/connection-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Sandbox-ID': sandboxId },
          body: JSON.stringify({ roomName: roomId, participantName: identity }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.participantToken) return { token: data.participantToken, serverUrl: data.serverUrl || null };
        }
      } catch {}
    }
    return null;
  }

  // ─── Invite: auto-create room + copy URL ──────────────────────────────────
  async invite() {
    if (!this.roomId) {
      this.roomId = 'xrai-' + Math.random().toString(36).slice(2, 8);
      setRoomInURL(this.roomId);
    }
    const url = location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'xrai live session', text: 'join my xrai hologram room', url });
      } else {
        await navigator.clipboard.writeText(url);
        this.showToast(`invite link copied — room ${this.roomId}`, 4000);
      }
    } catch {
      prompt('copy this invite URL:', url);
    }
    return this.roomId;
  }

  // ─── Connect flow — auto-token or paste ───────────────────────────────────
  async enable({ publishCamera = false } = {}) {
    const LK = await this._loadClient();
    if (!LK) return false;

    // Ensure room ID
    if (!this.roomId) {
      this.roomId = 'xrai-' + Math.random().toString(36).slice(2, 8);
      setRoomInURL(this.roomId);
    }
    const identity = `viewer-${uuid().slice(0, 8)}`;

    // Token
    const fetched = await this._fetchToken(this.roomId, identity);
    let token = fetched?.token || null;
    let serverUrl = fetched?.serverUrl || DEFAULT_LK_URL;
    if (!token) {
      const params = await this._promptForTokenAndUrl(serverUrl);
      if (!params) return false;
      serverUrl = params.url;
      token = params.token;
    }

    this.room = new LK.Room({
      adaptiveStream: true,
      dynacast: true,
    });

    this.room.on(LK.RoomEvent.Connected, () => {
      this.showToast(`live · room ${this.roomId} — ${this.room.numParticipants} here`, 3200);
      this._buildTile();
    });
    this.room.on(LK.RoomEvent.ParticipantConnected, (p) => {
      this.showToast(`+ ${p.identity}`, 2400);
    });
    this.room.on(LK.RoomEvent.ParticipantDisconnected, (p) => {
      this.showToast(`- ${p.identity}`, 2000);
    });
    this.room.on(LK.RoomEvent.TrackSubscribed, (track, publication, participant) => {
      if (track.kind === 'video') this._attachVideo(track, participant);
    });
    this.room.on(LK.RoomEvent.DataReceived, (payload, participant, _kind, topic) => {
      try {
        const text = new TextDecoder().decode(payload);
        const msg = JSON.parse(text);
        document.dispatchEvent(new CustomEvent('live:data', { detail: { msg, participant, topic } }));
      } catch {}
    });
    this.room.on(LK.RoomEvent.Disconnected, () => {
      this.active = false;
      this._updateBtn();
      this._removeTile();
      this.showToast('live · disconnected');
    });

    try {
      await this.room.connect(serverUrl, token);
    } catch (e) {
      this.showToast(`live · connect failed: ${e.message || 'unknown'}`, 5000);
      console.warn('[live-web]', e);
      return false;
    }

    if (publishCamera) {
      try {
        await this.room.localParticipant.enableCameraAndMicrophone();
      } catch (e) {
        this.showToast('camera/mic publish denied — subscribing only');
      }
    }
    this.active = true;
    this._updateBtn();
    return true;
  }

  async disable() {
    if (!this.room) return;
    try { await this.room.disconnect(); } catch {}
    this.room = null;
    this.active = false;
    this._removeTile();
    this._updateBtn();
  }

  async sendData(topic, obj) {
    if (!this.room) return false;
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    try { await this.room.localParticipant.publishData(bytes, { topic, reliable: true }); return true; }
    catch { return false; }
  }

  // ─── UI — tile + prompt ───────────────────────────────────────────────────
  _buildTile() {
    if (this.tile) return;
    this.tile = document.createElement('aside');
    this.tile.id = 'live-tile';
    Object.assign(this.tile.style, {
      position: 'fixed', bottom: '40px', left: '40px', zIndex: '15',
      width: '240px', height: '160px',
      border: '1px solid rgba(247,255,168,0.4)',
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      pointerEvents: 'auto',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', font: '10px "JetBrains Mono", monospace',
      letterSpacing: '0.14em', textTransform: 'uppercase',
    });
    this.tile.innerHTML = `
      <video id="live-video" autoplay playsinline muted style="width:100%;height:100%;object-fit:cover;display:none"></video>
      <div id="live-tile-status" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
        waiting for video…
      </div>
      <div style="position:absolute;top:-22px;left:0;font-size:9px;color:#A8A8FF;letter-spacing:0.2em">room · ${this.roomId}</div>
      <button id="live-hangup" style="position:absolute;top:6px;right:6px;background:transparent;border:1px solid rgba(255,255,255,0.3);color:#fff;font:9px 'JetBrains Mono',monospace;padding:3px 8px;cursor:pointer;letter-spacing:0.15em;text-transform:uppercase">end</button>
    `;
    document.body.appendChild(this.tile);
    this.videoEl = this.tile.querySelector('#live-video');
    this.tile.querySelector('#live-hangup').addEventListener('click', () => this.disable());
  }
  _removeTile() {
    if (this.tile) { this.tile.remove(); this.tile = null; this.videoEl = null; }
  }
  _attachVideo(track, participant) {
    if (!this.videoEl) this._buildTile();
    const statusEl = this.tile?.querySelector('#live-tile-status');
    if (statusEl) statusEl.style.display = 'none';
    this.videoEl.style.display = 'block';
    track.attach(this.videoEl);
    this.showToast(`live video from ${participant.identity}`, 2400);
  }

  _promptForTokenAndUrl(defaultUrl) {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      Object.assign(modal.style, {
        position: 'fixed', inset: '0', zIndex: '40',
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      });
      modal.innerHTML = `
        <form style="background:#0a0a0a;border:1px solid rgba(247,255,168,0.4);padding:28px 32px;max-width:480px;width:calc(100% - 48px);font-family:'Satoshi',sans-serif;color:#fff">
          <h3 style="font-weight:900;font-size:20px;letter-spacing:-0.025em;margin:0 0 6px">join live room</h3>
          <p style="font-size:12.5px;color:#aaa;margin:0 0 20px;line-height:1.5">Paste a LiveKit token from the Portals app ("Share Live Room") or a dev console. Server URL defaults to <code style="color:#F7FFA8">${defaultUrl}</code>.</p>
          <label style="font:10px 'JetBrains Mono',monospace;color:#888;text-transform:uppercase;letter-spacing:0.16em;display:block;margin-bottom:4px">server url</label>
          <input id="lk-url" value="${defaultUrl}" style="width:100%;padding:10px 12px;background:#000;border:1px solid rgba(255,255,255,0.1);color:#fff;font-family:'JetBrains Mono',monospace;font-size:12px;margin-bottom:14px">
          <label style="font:10px 'JetBrains Mono',monospace;color:#888;text-transform:uppercase;letter-spacing:0.16em;display:block;margin-bottom:4px">access token</label>
          <textarea id="lk-tok" rows="4" placeholder="eyJhbGciOi..." style="width:100%;padding:10px 12px;background:#000;border:1px solid rgba(255,255,255,0.1);color:#fff;font-family:'JetBrains Mono',monospace;font-size:11px;resize:vertical"></textarea>
          <div style="display:flex;gap:10px;margin-top:18px;justify-content:flex-end">
            <button type="button" id="lk-cancel" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:#aaa;padding:8px 14px;font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;cursor:pointer">cancel</button>
            <button type="submit" style="background:#F7FFA8;border:1px solid #F7FFA8;color:#000;padding:8px 14px;font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;font-weight:700;cursor:pointer">connect</button>
          </div>
        </form>
      `;
      const close = (v) => { modal.remove(); resolve(v); };
      modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const url = modal.querySelector('#lk-url').value.trim();
        const token = modal.querySelector('#lk-tok').value.trim();
        if (!url || !token) return;
        close({ url, token });
      });
      modal.querySelector('#lk-cancel').addEventListener('click', () => close(null));
      document.body.appendChild(modal);
      modal.querySelector('#lk-tok').focus();
    });
  }

  // ─── DOM wiring ────────────────────────────────────────────────────────────
  wireToDOM() {
    this.toggleBtn = document.getElementById('live-toggle');
    if (!this.toggleBtn) return;
    this.toggleBtn.addEventListener('click', () => {
      if (this.active) this.disable();
      else this.enable({ publishCamera: false });
    });
    this._updateBtn();
    // If URL already has ?room=<id>, suggest joining
    if (this.roomId) {
      this.showToast(`live room ${this.roomId} pending — tap "live" to connect`, 4200);
    }
  }
  _updateBtn() {
    if (!this.toggleBtn) return;
    this.toggleBtn.textContent = this.active ? 'live on' : 'live';
    this.toggleBtn.classList.toggle('live-on', this.active);
  }
}
