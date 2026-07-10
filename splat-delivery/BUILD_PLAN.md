# XRAI Splat Delivery — v0 build plan

**Product:** the Vercel/Cloudinary for AI-generated Gaussian splats. Import a splat from any generator → clean + compress + LOD → fast, embeddable, shareable WebGPU viewer. Monetize hosting/optimization/embed — **not** the spec.

## Status (2026-07-10)
| Piece | State | Verified |
|---|---|---|
| Viewer + progressive load | ✅ `viewer.html` + `splat-app.mjs` (CDN, no build) | node --check ✅ · serves 200 ✅ · **in-browser render = needs your phone** |
| Upload/URL → share-link + embed + `.xrai` manifest | ✅ `index.html` (client-side v0) | same |
| XRAI interchange manifest emit | ✅ `xraiManifest()` reuses XRAI 2.0 format | ✅ shape |
| Sub-2s load measurement (HUD) | ✅ | **needs phone** |
| Cloud hosting (upload → CDN) | ⛔ needs your account | — |
| Payments / paywall | ⛔ needs your account | — |
| `.ksplat`/SOGS compression worker | ⛔ next | — |
| WebGPU renderer swap (Spark/three-WebGPU) | ⛔ later | — |

## What only YOU can do (the two gates)
1. **Phone render test** — open the live URL, drop a real Marble/Luma `.ply`, read `to-first-frame`. <2000ms = wedge confirmed.
2. **Accounts** (when ready to charge): Cloudflare R2 (storage) + Pages (deploy — this repo already has `_headers`/`_redirects`), Paddle (merchant-of-record, skip tax), PostHog (analytics). I wire them once the keys exist.

## Build order (once wedge confirmed)
1. **Compression pipeline** — server/worker: `.ply` → `.ksplat`/SOGS on upload (biggest sub-2s win).
2. **Storage + upload** — drop → R2 → public/private URL → viewer.
3. **Accounts + Paddle paywall** — free (public, watermark, size cap) → paid (private, custom domain, bigger, analytics).
4. **Embed hardening** — `<iframe>` allowlist, lazy-load, poster image.
5. **WebGPU renderer** — swap when the load-time spike says the backend is the bottleneck.
6. **XRAI-native** — publish the manifest as the interchange others import (the moat/network effect).

## PLG (winners' playbook: Cursor/Vercel)
Free public *watermarked* splats = viral share = distribution → frictionless upgrade to private/custom-domain/analytics → API + white-label runtime.

## Next reuse (convergent)
ADR-001 visual+voice 3D try-on = this render core + on-device retrieval + voice restyle. Delivery layer ships first; try-on is the consumer app on top.
