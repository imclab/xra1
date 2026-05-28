// js/adapters/icosa.js — Icosa Gallery search → XRAI doc
// ─────────────────────────────────────────────────────────────────────────────
// Pure-fetch JS port of src/services/icosaService.ts. No dependency on
// React Native logger / DevLogger — adapters must only touch globalThis.fetch.
//
// Input:
//   string keywords           e.g. 'dragon'
//   OR { keywords, pageSize, curated, license, maxTriangles, pageToken }
//
// Output: XRAI doc with one `object.glb` entity per asset (gltfUrl in params).
// Unity ECS path `add_object` consumes `object.glb` with `params.src` URL.
//
// API: https://api.icosa.gallery/v1/assets?keywords=...&format=GLTF2&...
// ─────────────────────────────────────────────────────────────────────────────

import { registerAdapter, newScene, entity } from '../xrai-core.js';

const API_BASE = 'https://api.icosa.gallery/v1';

function _extractGltfUrl(formats) {
  if (!Array.isArray(formats)) return null;
  const gltf2 = formats.find(f => f?.formatType === 'GLTF2');
  return gltf2?.root?.url || null;
}

async function _search(keywords, opts) {
  const params = new URLSearchParams({
    keywords,
    format: 'GLTF2',
    pageSize: String(opts.pageSize ?? 20),
  });
  if (opts.curated) params.set('curated', 'true');
  if (opts.license) params.set('license', opts.license);
  if (opts.maxTriangles) params.set('triangleCountMax', String(opts.maxTriangles));
  if (opts.pageToken) params.set('pageToken', opts.pageToken);

  const url = `${API_BASE}/assets?${params.toString()}`;
  const r = await fetch(url);
  if (!r.ok) return { assets: [], totalSize: 0, nextPageToken: null };
  const data = await r.json();
  const assets = (data.assets || []).map(a => ({
    id: a.name,
    displayName: a.displayName || 'Untitled',
    authorName: a.authorName || 'Unknown',
    thumbnail: a.thumbnail?.url || null,
    gltfUrl: _extractGltfUrl(a.formats),
    license: a.license || 'Unknown',
    triangleCount: a.triangleCount || 0,
  }));
  return {
    assets,
    totalSize: data.totalSize || assets.length,
    nextPageToken: data.nextPageToken || null,
  };
}

registerAdapter('icosa', async (input, opts = {}) => {
  const isString = typeof input === 'string';
  const keywords = isString ? input : (input?.keywords || '');
  const searchOpts = isString ? opts : { ...input, ...opts };

  const doc = newScene({ origin: 'icosa' });
  doc.origin.scene = 'gallery-search';
  doc.metadata = { source: 'icosa.gallery', keywords };

  if (!keywords) {
    doc.metadata.note = 'no keywords supplied';
    return doc;
  }

  const root = entity('icosa_root', 'object.group', {
    label: `Icosa: ${keywords}`, glyph: '▤', group: 'gallery',
    params: { query: keywords },
  });
  doc.scene.entities.push(root);

  let result;
  try {
    result = await _search(keywords, searchOpts);
  } catch (e) {
    doc.metadata.error = String(e);
    return doc;
  }

  doc.metadata.totalSize = result.totalSize;
  doc.metadata.nextPageToken = result.nextPageToken;

  for (const a of result.assets) {
    if (!a.gltfUrl) continue;
    const id = `icosa:${a.id}`;
    doc.scene.entities.push(entity(id, 'object.glb', {
      label: a.displayName,
      glyph: '▦',
      group: 'gallery',
      url: a.gltfUrl,
      params: {
        src: a.gltfUrl,
        thumbnail: a.thumbnail,
        author: a.authorName,
        license: a.license,
        triangleCount: a.triangleCount,
      },
    }));
  }
  return doc;
});

export const ICOSA_API_BASE = API_BASE;
