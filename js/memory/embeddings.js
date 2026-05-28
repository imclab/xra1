// js/memory/embeddings.js — local sentence embeddings via Transformers.js.
//
// 384-dim Float32Array per text via Xenova/all-MiniLM-L6-v2 (mean-pooled,
// L2-normalized). Loaded lazily on first embed() — ~25MB WASM/model bundle
// fetched once, cached in IndexedDB by Transformers.js itself.
//
// Test seam: setEmbedder(fn) injects a deterministic embedder for unit tests
// so smokes can verify cosine math without downloading the real model.
//
// Storage: vectors live next to records as Float32Array(384). Packing to
// Uint8Array(1536) for IndexedDB is handled in store.js when needed; this
// module stays in float-space for compute.

const MODEL_ID = 'Xenova/all-MiniLM-L6-v2';
const TRANSFORMERS_URL = 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

let _embedFn = null;        // injected stub (tests) or real pipeline wrapper
let _loadPromise = null;    // single-flight load
let _ready = false;

/** Inject a deterministic embedder. fn(text) → Float32Array(dim). */
export function setEmbedder(fn) {
  _embedFn = fn;
  _ready = !!fn;
}

/** Reset to default (real model) state — primarily for tests. */
export function resetEmbedder() {
  _embedFn = null;
  _loadPromise = null;
  _ready = false;
}

export function isReady() { return _ready; }

async function loadRealPipeline() {
  if (_loadPromise) return _loadPromise;
  _loadPromise = (async () => {
    // Dynamic import so Node test runs (which set a stub) never hit the CDN.
    const mod = await import(/* @vite-ignore */ TRANSFORMERS_URL);
    const pipe = await mod.pipeline('feature-extraction', MODEL_ID, { quantized: true });
    _embedFn = async (text) => {
      const out = await pipe(text || '', { pooling: 'mean', normalize: true });
      // out.data is a TypedArray view (Float32Array) of length 384.
      return new Float32Array(out.data);
    };
    _ready = true;
    return _embedFn;
  })();
  return _loadPromise;
}

/** Embed one string. Returns Float32Array. Stub-friendly. */
export async function embed(text) {
  if (!_embedFn) await loadRealPipeline();
  return _embedFn(text || '');
}

/** Cosine similarity. Assumes both are same-length Float32Array. */
export function cosine(a, b) {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

/** Score query embedding against an array of { embed: Float32Array, ...rec }. */
export function rankByCosine(queryEmbed, records, { limit = 8, minScore = 0 } = {}) {
  const scored = [];
  for (const r of records) {
    if (!r.embed) continue;
    const s = cosine(queryEmbed, r.embed);
    if (s > minScore) scored.push({ ...r, _score: s });
  }
  scored.sort((a, b) => b._score - a._score);
  return scored.slice(0, limit);
}

// ── IndexedDB pack/unpack helpers ──────────────────────────────────────────
// Float32Array(384) ⇄ Uint8Array(1536) — IDB structured-clone handles both,
// but Uint8Array is half the storage of a JSON-serialized number array.

export function packEmbed(f32) {
  if (!f32) return null;
  return new Uint8Array(f32.buffer, f32.byteOffset, f32.byteLength);
}

export function unpackEmbed(u8) {
  if (!u8) return null;
  // Copy to a fresh buffer so the result owns its memory (safe across stores).
  const copy = new Uint8Array(u8.byteLength);
  copy.set(u8);
  return new Float32Array(copy.buffer);
}

if (typeof window !== 'undefined') {
  window.__embeddings = { embed, cosine, rankByCosine, packEmbed, unpackEmbed, setEmbedder, resetEmbedder, isReady };
}
