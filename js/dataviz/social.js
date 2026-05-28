// js/dataviz/social.js — social-network style JSON → XRAI graph.
//
// Input shapes accepted:
//   { nodes: [{id, label?, group?, ...}], edges: [{from, to, type?, weight?}] }
//   { users: [...], posts: [...], follows: [...] }
//
// Pure data adapter — no fetch. Caller passes JSON (loaded from file / API /
// websocket). We do NOT prescribe a schema; we adapt to whichever shape is given.

import { registerAdapter, newScene, entity, relation } from '../xrai-core.js';

function fromGenericGraph(data) {
  const nodes = data.nodes || [];
  const edges = data.edges || data.links || [];
  return {
    entities: nodes.map(n => entity(String(n.id), n.type || 'object.user', {
      label: n.label || n.name || String(n.id),
      glyph: n.glyph || '☉',
      group: n.group || n.cluster,
      params: { _dataviz: 'social', _layout: 'force', ...(n.params || {}) },
    })),
    relations: edges.map(e => relation(String(e.from || e.source), String(e.to || e.target), e.type || 'links-to', {
      weight: e.weight || 1,
    })),
  };
}

function fromUsersPosts(data) {
  const ents = [];
  const rels = [];
  for (const u of data.users || []) {
    ents.push(entity(`u_${u.id}`, 'object.user', {
      label: u.handle || u.name || u.id, glyph: '☉',
      params: { _dataviz: 'social', _layout: 'force', followers: u.followers || 0 },
    }));
  }
  for (const p of data.posts || []) {
    const pid = `p_${p.id}`;
    ents.push(entity(pid, 'object.post', {
      label: String(p.text || '').slice(0, 80),
      glyph: '∎',
      params: { _dataviz: 'social', likes: p.likes || 0, ts: p.ts },
    }));
    if (p.author) rels.push(relation(`u_${p.author}`, pid, 'posted'));
  }
  for (const f of data.follows || []) {
    rels.push(relation(`u_${f.from}`, `u_${f.to}`, 'follows'));
  }
  return { entities: ents, relations: rels };
}

registerAdapter('dataviz.social', async (input, opts = {}) => {
  const data = input?.data || input || {};
  const doc = newScene({ origin: 'dataviz.social' });
  doc.metadata = { source: 'dataviz', kind: 'social' };

  let projected;
  if (data.users || data.posts || data.follows) projected = fromUsersPosts(data);
  else projected = fromGenericGraph(data);

  doc.scene.entities.push(...projected.entities);
  doc.scene.relations.push(...projected.relations);
  doc.metadata.nodeCount = projected.entities.length;
  doc.metadata.edgeCount = projected.relations.length;
  return doc;
});

if (typeof window !== 'undefined') {
  window.__dataviz_social = { fromGenericGraph, fromUsersPosts };
}
