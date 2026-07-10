# XRAI splat-delivery — v0 spike

**One question this answers (the collapse test):**
> Can we hit **sub-2s time-to-first-frame on a real mid-tier phone browser** for a real Marble/Luma export, before building the product shell?

**Pass → build the hosting/embed product. Fail → the "sub-2s delivery" wedge is invalid as-is; fix with compression/LOD (below) or reframe.**

## Run it

```bash
cd ~/RiderProjects/xra1/splat-delivery
python3 -m http.server 8080
ipconfig getifaddr en0          # your Mac's LAN IP, e.g. 192.168.1.42
```
- Desktop: open `http://localhost:8080/`
- **Phone (same Wi-Fi):** open `http://<LAN-IP>:8080/` — then **drag/drop or pick** your splat file.

## Get a real splat (don't test on a toy)
Export from **Marble** (worldlabs) / **Luma** / **Scaniverse** as **`.ply`** (works directly).
`.spz` (Niantic/Scaniverse compressed) may need conversion first — start with `.ply`.

## What to record (per device)
| device | file / MB | splats | load+parse+GPU (ms) | **to-first-frame (ms)** | verdict |
|---|---|---|---|---|---|
| (your phone) | | | | | 🟢/🔴 |
| (your Mac) | | | | | |

## If it FAILS (>2s) — the optimization levers, in order
1. **Compress**: convert `.ply` → `.ksplat` (mkkellogg) or **SOGS/self-organizing** — biggest single win.
2. **LOD / progressive load**: coarse splat first (turn `progressiveLoad:true`), refine after first frame.
3. **CDN + range requests**: serve from Cloudflare R2/Pages (this repo already has `_headers`/`_redirects`).
4. **Cap splat count** for the free tier; downsample on upload.

## Honest caveats (this is a spike)
- Renderer = **mkkellogg GaussianSplats3D @0.4.7 via esm.sh CDN**, **WebGL** (not WebGPU). It's the fastest-to-stand-up vehicle to measure *load time*, which is the bottleneck (download + parse + sort + GPU upload), not the render backend. Production likely moves to a **WebGPU** renderer (Spark/three-WebGPU) — benchmark during build.
- If the CDN import errors, pin a different version in `index.html` (`@mkkellogg/gaussian-splats-3d@<ver>`) or vendor it via `npm i` + Vite. Watch the browser console.
- `to-first-frame` is measured from `addSplatScene()` start (fetch is folded into load+parse+GPU). Good enough to accept/reject the sub-2s wedge.

## Next (already queued — reuses THIS core)
**ADR-001 visual + voice 3D try-on** (`portals_v4/decisions/2026-07-03-jarvis-multimodal-search-3d-tryon.md`) is the same splat-render core + on-device retrieval + voice restyle. Ship the delivery layer first; the try-on is the consumer app on top of it. Its riskiest leg is different (ARKit has no native foot mesh) — separate spike when we get there.
