#!/usr/bin/env node
(async () => {
  const { buildKnowledgeGraph } = await import('./build-knowledge-graph.mjs');
  await buildKnowledgeGraph();
})();
