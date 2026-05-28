// js/dataviz/xrai-kg.js — local memory knowledge graph → XRAI doc.
//
// Pulls records from js/memory (episodic + semantic + procedural), groups by
// topic, and emits a graph where:
//   • topic clusters   → object.cluster
//   • records          → object.memory (label = first 60 chars of text)
//   • cluster-contains → relation('contains')
//   • cross-topic refs → relation('mentions') when text shares >=2 tokens
//
// Renderer hint: params._layout = 'cluster'

import { registerAdapter, newScene, entity, relation } from '../xrai-core.js';
import * as memory from '../memory/index.js';

const TOK_MIN_LEN = 4;
const TOK_STOP = new Set(['this', 'that', 'with', 'from', 'have', 'about', 'they', 'them', 'were', 'been', 'will', 'just', 'also', 'their', 'which', 'when', 'what', 'where']);

function tokenize(text) {
  return new Set(
    String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= TOK_MIN_LEN && !TOK_STOP.has(w))
  );
}

function intersect(a, b) {
  let n = 0;
  for (const x of a) if (b.has(x)) n++;
  return n;
}

registerAdapter('dataviz.xrai-kg', async (input, opts = {}) => {
  const limit = opts.limit || input?.limit || 200;
  const query = input?.query || opts.query;

  // Pull recent records from all 3 stores
  let records;
  if (query) {
    records = await memory.recall(query, { limit, stores: ['episodic', 'semantic', 'procedural'] });
  } else {
    const eps = await memory.recent(limit);
    records = eps.map(r => ({ ...r, _store: 'episodic' }));
  }

  // Group by topic
  const clusters = new Map();
  for (const r of records) {
    const t = r.topic || 'misc';
    if (!clusters.has(t)) clusters.set(t, []);
    clusters.get(t).push(r);
  }

  const doc = newScene({ origin: 'dataviz.xrai-kg' });
  doc.metadata = { source: 'dataviz', kind: 'xrai-kg', count: records.length, clusters: clusters.size };

  // Cluster nodes + member nodes
  const memTokens = new Map(); // memId → token set
  for (const [topic, members] of clusters) {
    const cid = `c_${topic.replace(/[^a-z0-9]/gi, '_').slice(0, 20)}`;
    doc.scene.entities.push(entity(cid, 'object.cluster', {
      label: topic, glyph: '◎',
      params: { _layout: 'cluster', _dataviz: 'xrai-kg', size: members.length },
    }));
    for (const r of members) {
      const id = `m_${(r.id || '').slice(0, 12)}`;
      doc.scene.entities.push(entity(id, 'object.memory', {
        label: String(r.text || '').slice(0, 60) || topic,
        glyph: r._store === 'semantic' ? '◈' : r._store === 'procedural' ? '◐' : '○',
        params: { _dataviz: 'xrai-kg', kind: r.kind, source: r.source, ts: r.ts, scene_id: r.scene_id },
      }));
      doc.scene.relations.push(relation(cid, id, 'contains'));
      memTokens.set(id, tokenize(r.text));
    }
  }

  // Cross-topic mentions (cheap O(n²) — capped at 200, so 40k pairs max)
  const ids = [...memTokens.keys()];
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const a = memTokens.get(ids[i]);
      const b = memTokens.get(ids[j]);
      if (a.size < 2 || b.size < 2) continue;
      const shared = intersect(a, b);
      if (shared >= 2) {
        doc.scene.relations.push(relation(ids[i], ids[j], 'mentions', { weight: shared }));
      }
    }
  }

  return doc;
});

if (typeof window !== 'undefined') {
  window.__dataviz_xraiKg = { tokenize };
}
