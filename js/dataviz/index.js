// js/dataviz/index.js — turn any data source into an XRAI graph.
//
// Sources:
//   • webpage    — fetch URL, extract title/headings/links → node graph
//   • github     — repo URL → files/folders/contributors → tree+graph
//   • xrai-kg    — local memory knowledge graph (recall + relations)
//   • social     — JSON of users/posts/edges → node-link
//
// Output: standard XRAI doc with entities + relations. Renderer picks layout
// (force-directed, tree, cluster) based on entity.params._layout hint.
//
// Each source adapter registers as `dataviz.<name>` so pipelines + the input
// dispatcher can call them directly.

import { registerAdapter } from '../xrai-core.js';
import './webpage.js';
import './github.js';
import './xrai-kg.js';
import './social.js';

const SOURCES = ['webpage', 'github', 'xrai-kg', 'social'];

function sniffSource(input) {
  const url = input?.url || (typeof input === 'string' ? input : '');
  if (/github\.com/.test(url)) return 'github';
  if (/^https?:\/\//.test(url)) return 'webpage';
  if (input?.kind === 'kg' || input?.from === 'memory') return 'xrai-kg';
  if (input?.nodes && input?.edges) return 'social';
  return 'webpage';
}

export async function visualize(input, opts = {}) {
  const source = opts.source || sniffSource(input);
  if (!SOURCES.includes(source)) throw new Error(`unknown dataviz source: ${source}`);
  const { encode } = await import('../xrai-core.js');
  return encode(`dataviz.${source}`, input, opts);
}

registerAdapter('dataviz', async (input, opts = {}) => visualize(input, opts));

if (typeof window !== 'undefined') {
  window.__dataviz = { visualize, sniffSource, SOURCES };
}
