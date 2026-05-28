// js/graph/seed.js — KG generation from any seed.
//
// Seed kinds: book, paper, concept, word, code, prompt, repo, url.
//
// Two paths:
//   • LLM available  → ask provider for {nodes, edges} JSON, parse, emit
//   • Offline/no-key → local heuristic: split into sentences, key nouns as nodes,
//                      adjacency = edge. Coarse but never blocks.
//
// Output: XRAI doc with object.concept entities + relates-to relations.
// Renderer hint: params._layout = 'force'

import { registerAdapter, newScene, entity, relation, uuid } from '../xrai-core.js';

const PROMPT_SYSTEM = `You build knowledge graphs as compact JSON.
Given a seed (text/code/concept), extract 8-20 key concepts and their relationships.
Output ONLY valid JSON, no prose, no markdown:
{
  "nodes": [{"id": "short_snake_case", "label": "Display Label", "type": "concept|entity|method|claim", "weight": 1-5}],
  "edges": [{"from": "id", "to": "id", "type": "relates-to|is-a|part-of|causes|cites|contradicts", "weight": 1-3}]
}`;

function buildPrompt(seed, kind) {
  const k = kind || 'text';
  return `Seed kind: ${k}\n\nSeed:\n${String(seed).slice(0, 4000)}\n\nReturn the knowledge graph JSON only.`;
}

async function askLlm(seed, kind) {
  try {
    const { ask } = await import('../llm/index.js');
    const res = await ask(buildPrompt(seed, kind), { frame: { system: PROMPT_SYSTEM } });
    if (!res.ok || !res.text) return null;
    const m = res.text.match(/\{[\s\S]*\}/);
    if (!m) return null;
    return JSON.parse(m[0]);
  } catch (e) {
    if (typeof console !== 'undefined') console.warn('[graph.seed] llm path failed:', e?.message || e);
    return null;
  }
}

// ── Offline fallback ───────────────────────────────────────────────────────
const STOP = new Set('the a an of and or but to in for on at by from with as is are was were be been being it this that those these their them they i we you he she him her his its our your my mine yours'.split(' '));

function offlineGraph(seed) {
  const text = String(seed || '').slice(0, 8000);
  // Sentence split
  const sents = text.split(/[.!?\n]+/).map(s => s.trim()).filter(s => s.length > 12).slice(0, 30);
  // Token frequency (3+ char, non-stop)
  const freq = new Map();
  for (const s of sents) {
    for (const w of s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/)) {
      if (w.length < 4 || STOP.has(w)) continue;
      freq.set(w, (freq.get(w) || 0) + 1);
    }
  }
  // Top 16 tokens become nodes
  const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 16);
  const nodes = top.map(([w, c]) => ({ id: w, label: w, type: 'concept', weight: Math.min(5, c) }));
  // Edges: co-occurrence in same sentence
  const nodeIds = new Set(nodes.map(n => n.id));
  const seen = new Set();
  const edges = [];
  for (const s of sents) {
    const sw = new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => nodeIds.has(w)));
    const arr = [...sw];
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const k = arr[i] < arr[j] ? `${arr[i]}|${arr[j]}` : `${arr[j]}|${arr[i]}`;
        if (seen.has(k)) continue;
        seen.add(k);
        edges.push({ from: arr[i], to: arr[j], type: 'co-occurs', weight: 1 });
      }
    }
  }
  return { nodes, edges };
}

const GLYPH = { concept: '◎', entity: '☉', method: '⚙', claim: '✦' };

registerAdapter('graph.seed', async (input, opts = {}) => {
  const seed = typeof input === 'string' ? input : (input?.seed || input?.prompt || '');
  const kind = opts.kind || input?.kind || 'text';
  const useLlm = opts.useLlm !== false && (typeof window !== 'undefined');

  let g = useLlm ? await askLlm(seed, kind) : null;
  if (!g || !Array.isArray(g.nodes) || !g.nodes.length) g = offlineGraph(seed);

  const doc = newScene({ origin: 'graph.seed' });
  doc.metadata = {
    source: 'graph.seed',
    seed_kind: kind,
    seed_preview: String(seed).slice(0, 160),
    nodeCount: g.nodes.length,
    edgeCount: g.edges?.length || 0,
    via: useLlm && g === g ? 'llm' : 'offline',
  };

  for (const n of g.nodes) {
    doc.scene.entities.push(entity(String(n.id || uuid().slice(0, 8)), `object.${n.type || 'concept'}`, {
      label: n.label || n.id,
      glyph: GLYPH[n.type] || '◎',
      params: { _layout: 'force', _dataviz: 'graph.seed', weight: n.weight || 1 },
    }));
  }
  for (const e of g.edges || []) {
    doc.scene.relations.push(relation(String(e.from), String(e.to), e.type || 'relates-to', { weight: e.weight || 1 }));
  }
  return doc;
});

if (typeof window !== 'undefined') {
  window.__graphSeed = { offlineGraph };
}
