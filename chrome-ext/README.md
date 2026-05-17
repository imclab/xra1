# XRAI Chrome Extension

Every webpage, every graphic, every idea → transparent, remixable, sharable in real time across virtual and real worlds.

## What it does

- Injects a shadow-DOM dashboard onto any page (⌘⇧X to toggle)
- Sniffs page assets (images, videos, canvases, iframes, GLB/USDZ links)
- Pops out:
  - **3D node graph** of the page + linked content (`?mode=graph`)
  - **Remix layer** for editing images/text/shaders (`?mode=remix`)
  - **WGSL live shader editor** to reprogram any graphic (`?mode=shader`)
  - **Needle AR viewer** for glTF/USDZ → Quick Look / Scene Viewer / WebXR (`?mode=ar`)
- Context-menu actions: Grab / Remix / Reprogram with WGSL / View in AR
- Side panel: page tab + your XRAI library + discovery feed + agent forest
- MCP relay: page asks → local hub (`localhost:8787`) → user's MCP servers (UnityMCP, mempalace, gmail, context7, needle)
- Hub-offline graceful degrade: extension still works for local capture + library

## Install (dev)

```sh
# 1. Build / link icons (TODO — placeholder 16/48/128 png)
# 2. chrome://extensions → enable Developer mode → Load unpacked → select chrome-ext/
```

## Architecture

```
┌─ content.js (per-tab, shadow-DOM dock + sniffer)
│    │
│    ├─ msg → background.js
│    │            │
│    │            ├─ chrome.windows.create(popout.html?mode=…) → loads runtimes/*/adapter.js from GH-Pages
│    │            └─ fetch(localhost:8787/mcp) → user's hub
│    │
│    └─ chrome.runtime.openSidePanel() → sidepanel.html
│
└─ keyboard: ⌘⇧X toggle, ⌘⇧G popout 3D graph
```

## Runtimes used

Hosted at `https://imclab.github.io/xra1/runtimes/`:

| Mode | Adapter | Stack |
|------|---------|-------|
| `graph` | `echarts/adapter.js` | ECharts 3D node graph |
| `remix` | `remix/adapter.js` | universal capture + edit |
| `shader` | `shader/adapter.js` | WebGPU + WGSL live editor |
| `ar` | `_ar-needle/adapter.js` | Needle Engine + USDZ Quick Look |
| `xrai` | `xrai/adapter.js` | scene + KG loader |
| `gesture` | `gesture/adapter.js` | MediaPipe hand tracking |

## Hub sidecar (optional)

`runtimes/_bridge/server.js` exposes `/health`, `/ask`, `/mcp`, `/ws` — relays to user's local MCP servers and Claude Code CLI. Without it the extension still captures + edits locally.

## TODO

- [ ] Icons (16/48/128 PNGs in `icons/`)
- [ ] `runtimes/_bridge/server.js` — Node WS + MCP relay + Claude subprocess
- [ ] PayPal/Google Pay tier gate → `mcp/xrai-ledger`
- [ ] `runtimes/forest/` — agent forest viewer (VRM avatars, OTALA tick loop)
- [ ] Mempalace-per-user (cookie → wing)
- [ ] WebRTC room for live remix sync between extension instances
