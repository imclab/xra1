#!/usr/bin/env node
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(REPO_ROOT, 'data');

const SOURCE_ROOTS = [
  {
    key: 'kb',
    label: 'Unity-XR-AI KnowledgeBase',
    root: process.env.KB_ROOT || '/Users/jamestunick/Documents/GitHub/Unity-XR-AI/KnowledgeBase',
    rawBase: 'https://raw.githubusercontent.com/imclab/Unity-XR-AI/main/KnowledgeBase',
    ignore: [/\/scripts\//, /\/node_modules\//, /\.git\//],
  },
  {
    key: 'specs',
    label: 'Portals v4 Specs',
    root: process.env.PORTALS_SPECS_ROOT || '/Users/jamestunick/RiderProjects/portals_v4/specs',
    rawBase: 'https://raw.githubusercontent.com/ryanjbrant/portals_v4/main/specs',
    ignore: [/\/node_modules\//, /\.git\//],
  },
];

const OUTPUTS = {
  xrai: path.join(DATA_DIR, 'portals-knowledge-graph.xrai.json'),
  view: path.join(DATA_DIR, 'portals-knowledge-graph-view.json'),
  index: path.join(DATA_DIR, 'kb-index.json'),
};

const GROUPS = {
  structure: { glyph: '▤', size: 18 },
  concept: { glyph: '◆', size: 16 },
  external: { glyph: '◆', size: 16 },
  rfc: { glyph: '◇', size: 13 },
  spec: { glyph: '▦', size: 12 },
  task: { glyph: '▦', size: 10 },
  plan: { glyph: '▦', size: 10 },
  archive: { glyph: '▤', size: 9 },
  doc: { glyph: '▦', size: 9 },
  person: { glyph: '●', size: 12 },
};

const CONCEPT_SEEDS = [
  {
    id: 'concept:karpathy-llm-wiki',
    label: 'Karpathy LLM Wiki',
    type: 'concept',
    group: 'external',
    glyph: '◆',
    size: 18,
    file: 'https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f',
    summary: 'Persistent compiled wiki pattern: raw sources + compiled wiki + schema + ingest/query/lint loops, where knowledge compounds instead of being rediscovered at query time.',
    tags: ['karpathy', 'wiki', 'compiled', 'knowledge-base', 'ingest', 'query', 'lint'],
    trustTier: 'T1',
    sourceRoot: 'external',
  },
  {
    id: 'concept:raw-sources',
    label: 'Raw Sources',
    type: 'concept',
    group: 'concept',
    glyph: '◆',
    size: 12,
    summary: 'Immutable source documents that the system reads but does not rewrite.',
    tags: ['karpathy', 'raw-sources', 'immutability'],
    trustTier: 'T1',
    sourceRoot: 'external',
  },
  {
    id: 'concept:compiled-wiki',
    label: 'Compiled Wiki',
    type: 'concept',
    group: 'concept',
    glyph: '◆',
    size: 13,
    summary: 'The persistent, interlinked knowledge layer built from sources and continuously updated over time.',
    tags: ['karpathy', 'compiled', 'wiki', 'knowledge-graph'],
    trustTier: 'T1',
    sourceRoot: 'external',
  },
  {
    id: 'concept:schema-layer',
    label: 'Schema Layer',
    type: 'concept',
    group: 'concept',
    glyph: '◆',
    size: 12,
    summary: 'Agent instructions and schema conventions that constrain how the wiki is structured and maintained.',
    tags: ['schema', 'agents', 'rules', 'conventions'],
    trustTier: 'T1',
    sourceRoot: 'external',
  },
  {
    id: 'concept:index-log-lint',
    label: 'Index / Log / Lint',
    type: 'concept',
    group: 'concept',
    glyph: '◆',
    size: 12,
    summary: 'Karpathy’s three maintenance loops: content index, chronological log, and periodic lint/health checks.',
    tags: ['index', 'log', 'lint', 'health'],
    trustTier: 'T1',
    sourceRoot: 'external',
  },
  {
    id: 'concept:realtime-collab',
    label: 'Realtime Collaboration',
    type: 'concept',
    group: 'concept',
    glyph: '◆',
    size: 12,
    summary: 'Shared multi-user graph viewing/editing with room URLs, presence, and conflict-safe synchronization.',
    tags: ['collaboration', 'multiplayer', 'presence', 'webrtc'],
    trustTier: 'T2',
    sourceRoot: 'external',
  },
  {
    id: 'concept:webxr-cross-platform',
    label: 'WebXR Cross-Platform',
    type: 'concept',
    group: 'concept',
    glyph: '◆',
    size: 12,
    summary: 'One browser-first graph surface spanning mobile, desktop, visionOS Safari, and Quest browser with XR where available.',
    tags: ['webxr', 'cross-platform', 'visionos', 'quest', 'browser'],
    trustTier: 'T2',
    sourceRoot: 'external',
  },
  {
    id: 'concept:telepresence-bridge',
    label: 'Telepresence Bridge',
    type: 'concept',
    group: 'concept',
    glyph: '◆',
    size: 12,
    summary: 'Optional audio/video and holographic room interop layered on top of the collaborative graph substrate.',
    tags: ['telepresence', 'livekit', 'hologram', 'bridge'],
    trustTier: 'T2',
    sourceRoot: 'external',
  },
  {
    id: 'person:karpathy',
    label: 'Andrej Karpathy',
    type: 'person',
    group: 'person',
    glyph: '●',
    size: 12,
    summary: 'Author of the LLM Wiki gist that popularized the compiled-wiki maintenance pattern used here as an architectural reference.',
    tags: ['karpathy', 'llm', 'wiki'],
    trustTier: 'T1',
    sourceRoot: 'external',
  },
];

const CONCEPT_KEYWORDS = [
  { id: 'concept:compiled-wiki', keywords: ['compiled wiki', 'knowledge graph', 'knowledge base', 'wiki'] },
  { id: 'concept:schema-layer', keywords: ['schema', 'claude.md', 'agents.md', 'constitution', 'spec'] },
  { id: 'concept:index-log-lint', keywords: ['index', 'log', 'lint', 'health', 'audit'] },
  { id: 'concept:realtime-collab', keywords: ['multi-user', 'multiplayer', 'collab', 'collaborative', 'normcore', 'yjs', 'webrtc', 'livekit'] },
  { id: 'concept:webxr-cross-platform', keywords: ['webxr', 'visionos', 'quest', 'browser', 'cross-platform', 'needle', 'playcanvas'] },
  { id: 'concept:telepresence-bridge', keywords: ['telepresence', 'hologram', 'voice chat', 'livekit', 'conference', 'rgbd'] },
];

function exists(p) {
  return fsSync.existsSync(p);
}

async function walkMarkdown(root, ignore = []) {
  const out = [];
  async function visit(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (ignore.some((rx) => rx.test(full))) continue;
      if (entry.isDirectory()) {
        await visit(full);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!/\.(md|txt)$/i.test(entry.name)) continue;
      out.push(full);
    }
  }
  await visit(root);
  return out.sort((a, b) => a.localeCompare(b));
}

function stableId(prefix, input) {
  const hash = createHash('sha1').update(input).digest('hex').slice(0, 10);
  const cleaned = input
    .replace(/\\/g, '/')
    .replace(/[^a-zA-Z0-9/_-]+/g, '-')
    .replace(/^[-/]+|[-/]+$/g, '')
    .split('/')
    .slice(-4)
    .join('__')
    .toLowerCase();
  return `${prefix}:${cleaned}:${hash}`;
}

function normalizeRelPath(p) {
  return p.replace(/\\/g, '/');
}

function extractTitle(content, fallback) {
  const m = content.match(/^#\s+(.+)$/m);
  return (m?.[1] || fallback).trim();
}

function extractSummary(content) {
  const lines = content.split('\n');
  const chunks = [];
  let inCode = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    if (!line) {
      if (chunks.length) break;
      continue;
    }
    if (/^#/.test(line)) continue;
    if (/^(\*\*|>|\||- \[)/.test(line) && !chunks.length) continue;
    chunks.push(line);
    if (chunks.join(' ').length > 260) break;
  }
  const summary = chunks.join(' ').replace(/\s+/g, ' ').trim();
  return summary ? summary.slice(0, 320) : 'No summary extracted.';
}

function extractHeadings(content) {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim()).slice(0, 12);
}

function inferStatus(rel, title, content) {
  const text = `${title}\n${content}`.toLowerCase();
  if (rel.includes('/_archive/') || rel.startsWith('_archive/')) return 'archived';
  const m = text.match(/\*\*status:\*\*\s*([^\n]+)/i);
  if (m) return m[1].replace(/[*`]/g, '').trim();
  if (text.includes('draft')) return 'draft';
  if (text.includes('frozen')) return 'frozen';
  if (text.includes('complete')) return 'complete';
  if (text.includes('active')) return 'active';
  return 'documented';
}

function inferTrust(rel, status, content) {
  const text = content.toLowerCase();
  if (rel.includes('/_archive/') || status === 'archived' || status.includes('draft')) return 'T3';
  if (/\[t1\b|battle-tested|99% confidence|status:\s*complete/i.test(text) || status.includes('complete')) return 'T1';
  return 'T2';
}

function tokenize(value) {
  return value
    .toLowerCase()
    .replace(/[`*()[\]{}:]/g, ' ')
    .split(/[^a-z0-9+]+/)
    .filter((token) => token.length > 2 && !['with', 'that', 'from', 'this', 'into', 'todo', 'specs'].includes(token));
}

function extractTags(rel, title, summary, headings) {
  const parts = normalizeRelPath(rel).split('/');
  const stem = path.basename(rel).replace(/\.(md|txt)$/i, '');
  const all = [...parts, stem, title, summary, ...headings].flatMap(tokenize);
  return [...new Set(all)].slice(0, 18);
}

function inferPlatforms(text) {
  const platforms = [];
  const lc = text.toLowerCase();
  if (lc.includes('ios')) platforms.push('ios');
  if (lc.includes('android')) platforms.push('android');
  if (lc.includes('visionos') || lc.includes('vision pro')) platforms.push('visionos');
  if (lc.includes('quest')) platforms.push('quest');
  if (lc.includes('webxr') || lc.includes('browser') || lc.includes('web')) platforms.push('web');
  if (lc.includes('macos') || lc.includes('windows') || lc.includes('desktop')) platforms.push('desktop');
  return [...new Set(platforms)];
}

function classifyDoc(rootKey, rel, title, status) {
  const base = path.basename(rel).toLowerCase();
  const norm = normalizeRelPath(rel).toLowerCase();
  if (norm.includes('/rfcs/') || /^rfc\b/.test(title.toLowerCase())) return { group: 'rfc', type: 'rfc' };
  if (norm.includes('/_archive/') || rel.startsWith('_archive/')) return { group: 'archive', type: 'structure' };
  if (base === 'spec.md' || base === 'spec.md' || base === 'spec.md') return { group: 'spec', type: 'doc' };
  if (base === 'tasks.md') return { group: 'task', type: 'doc' };
  if (['plan.md', 'design.md', 'research.md', 'readme.md', 'index.md', 'summary.md'].includes(base)) return { group: 'plan', type: 'doc' };
  if (/constitution|vision|manifesto|semantics strategy|viewer architecture/i.test(title)) return { group: 'concept', type: 'concept' };
  if (rootKey === 'kb') return { group: status === 'archived' ? 'archive' : 'doc', type: 'doc' };
  return { group: 'doc', type: 'doc' };
}

function rawUrlFor(source, rel) {
  return `${source.rawBase}/${normalizeRelPath(rel).split('/').map(encodeURIComponent).join('/')}`;
}

function specNumberFromRel(rel) {
  const m = normalizeRelPath(rel).match(/(^|\/)(\d{3})-[^/]+\/spec\.md$/i);
  return m?.[2] || null;
}

function resolveRelativeRef(ref, sourceRoot, currentFile) {
  const clean = ref.split('#')[0].trim();
  if (!clean || /^https?:\/\//i.test(clean)) return null;
  if (!/\.(md|txt)$/i.test(clean)) return null;
  if (clean.startsWith('/')) return path.resolve(sourceRoot, `.${clean}`);
  return path.resolve(path.dirname(currentFile), clean);
}

function extractReferences(content, sourceRoot, currentFile) {
  const refs = new Set();
  for (const m of content.matchAll(/\]\(([^)\n]+)\)/g)) {
    const resolved = resolveRelativeRef(m[1], sourceRoot, currentFile);
    if (resolved) refs.add(resolved);
  }
  for (const m of content.matchAll(/`([^`\n]+\.(?:md|txt))(?:#[^`\n]+)?`/gi)) {
    const resolved = resolveRelativeRef(m[1], sourceRoot, currentFile);
    if (resolved) refs.add(resolved);
  }
  return [...refs];
}

function primaryStructure(sourceKey, rel) {
  const parts = normalizeRelPath(rel).split('/');
  if (sourceKey === 'specs') return parts[0] || 'root';
  if (parts.length > 1) return parts[0];
  const base = path.basename(rel);
  const m = base.match(/^_([A-Z0-9]+)_/);
  return m ? `_${m[1]}` : 'misc';
}

function ensureRelation(relations, seen, from, to, type, props = {}) {
  if (!from || !to || from === to) return;
  const key = `${from}|${type}|${to}`;
  if (seen.has(key)) return;
  seen.add(key);
  relations.push({
    id: stableId('rel', key),
    type,
    from,
    to,
    ...props,
  });
}

export async function buildKnowledgeGraph() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  const entities = [];
  const relations = [];
  const relationSeen = new Set();
  const pathToId = new Map();
  const docs = [];
  const kbIndexEntries = [];
  const structureByKey = new Map();
  const specNumberToId = new Map();

  for (const source of SOURCE_ROOTS) {
    if (!exists(source.root)) {
      console.warn(`[build-knowledge-graph] skipping missing root: ${source.root}`);
      continue;
    }

    const rootId = `structure:${source.key}:root`;
    entities.push({
      id: rootId,
      type: 'structure',
      group: 'structure',
      glyph: GROUPS.structure.glyph,
      size: 22,
      label: source.label,
      summary: `${source.label} corpus root.`,
      sourceRoot: source.key,
      trustTier: 'T1',
      tags: [source.key, 'root', 'corpus'],
    });

    const files = await walkMarkdown(source.root, source.ignore);
    for (const full of files) {
      const rel = normalizeRelPath(path.relative(source.root, full));
      const content = await fs.readFile(full, 'utf8');
      const title = extractTitle(content, path.basename(rel));
      const summary = extractSummary(content);
      const headings = extractHeadings(content);
      const status = inferStatus(rel, title, content);
      const trustTier = inferTrust(rel, status, content);
      const tags = extractTags(rel, title, summary, headings);
      const platforms = inferPlatforms(`${title}\n${summary}\n${content}`);
      const { group, type } = classifyDoc(source.key, rel, title, status);
      const structureKey = `${source.key}:${primaryStructure(source.key, rel)}`;

      if (!structureByKey.has(structureKey)) {
        const label = primaryStructure(source.key, rel);
        const structureId = `structure:${structureKey}`;
        structureByKey.set(structureKey, structureId);
        entities.push({
          id: structureId,
          type: 'structure',
          group: 'structure',
          glyph: GROUPS.structure.glyph,
          size: 16,
          label: `${source.key === 'kb' ? 'KB' : 'Specs'} · ${label}`,
          summary: `${source.label} subsection: ${label}`,
          sourceRoot: source.key,
          trustTier: 'T1',
          tags: [source.key, label.toLowerCase(), 'structure'],
        });
        ensureRelation(relations, relationSeen, rootId, structureId, 'contains');
      }

      const id = stableId(source.key, rel);
      const groupSpec = GROUPS[group] || GROUPS.doc;
      const entity = {
        id,
        type,
        group,
        glyph: groupSpec.glyph,
        size: /constitution|vision|manifesto|index/i.test(title) ? groupSpec.size + 4 : groupSpec.size,
        label: title,
        file: rawUrlFor(source, rel),
        summary,
        headings,
        tags,
        sourceRoot: source.key,
        sourcePath: rel,
        status,
        trustTier,
        platforms,
        cluster: structureByKey.get(structureKey),
      };

      entities.push(entity);
      docs.push({ source, id, full, rel, title, summary, content, tags, status });
      pathToId.set(path.resolve(full), id);
      kbIndexEntries.push({
        file: rel,
        title,
        summary,
        tag: group,
        trustTier,
        sourceRoot: source.key,
        path_global: full,
        path_project: source.key === 'kb' ? `KnowledgeBase/${rel}` : `specs/${rel}`,
        url: entity.file,
        tags,
      });
      ensureRelation(relations, relationSeen, structureByKey.get(structureKey), id, 'contains');

      const specNo = specNumberFromRel(rel);
      if (specNo && !specNumberToId.has(specNo)) specNumberToId.set(specNo, id);
    }
  }

  for (const seed of CONCEPT_SEEDS) {
    entities.push(seed);
  }

  ensureRelation(relations, relationSeen, 'person:karpathy', 'concept:karpathy-llm-wiki', 'authored-by');
  ensureRelation(relations, relationSeen, 'concept:karpathy-llm-wiki', 'concept:raw-sources', 'describes');
  ensureRelation(relations, relationSeen, 'concept:karpathy-llm-wiki', 'concept:compiled-wiki', 'describes');
  ensureRelation(relations, relationSeen, 'concept:karpathy-llm-wiki', 'concept:schema-layer', 'describes');
  ensureRelation(relations, relationSeen, 'concept:karpathy-llm-wiki', 'concept:index-log-lint', 'describes');

  for (const doc of docs) {
    const refs = extractReferences(doc.content, doc.source.root, doc.full);
    for (const ref of refs) {
      const targetId = pathToId.get(path.resolve(ref));
      if (targetId) ensureRelation(relations, relationSeen, doc.id, targetId, 'references');
    }

    for (const m of doc.content.matchAll(/\bSpec\s+0?(\d{2,3})\b/gi)) {
      const targetId = specNumberToId.get(m[1].padStart(3, '0'));
      if (targetId) ensureRelation(relations, relationSeen, doc.id, targetId, 'depends-on');
    }

    const keywordCorpus = `${doc.title}\n${doc.summary}\n${doc.tags.join(' ')}\n${doc.content}`.toLowerCase();
    for (const concept of CONCEPT_KEYWORDS) {
      if (concept.keywords.some((keyword) => keywordCorpus.includes(keyword))) {
        ensureRelation(relations, relationSeen, doc.id, concept.id, 'relates-to');
      }
    }

    if (/karpathy/i.test(keywordCorpus)) {
      ensureRelation(relations, relationSeen, doc.id, 'concept:karpathy-llm-wiki', 'references');
      ensureRelation(relations, relationSeen, doc.id, 'person:karpathy', 'references');
    }
  }

  const spec006 = specNumberToId.get('006');
  const spec004 = specNumberToId.get('004');
  const spec010 = specNumberToId.get('010');
  const spec014 = specNumberToId.get('014');
  const spec015 = specNumberToId.get('015');
  if (spec006) ensureRelation(relations, relationSeen, spec006, 'concept:compiled-wiki', 'implements');
  if (spec004) ensureRelation(relations, relationSeen, spec004, 'concept:compiled-wiki', 'implements');
  if (spec010) ensureRelation(relations, relationSeen, spec010, 'concept:realtime-collab', 'implements');
  if (spec010) ensureRelation(relations, relationSeen, spec010, 'concept:telepresence-bridge', 'implements');
  if (spec014) ensureRelation(relations, relationSeen, spec014, 'concept:webxr-cross-platform', 'implements');
  if (spec015) ensureRelation(relations, relationSeen, spec015, 'concept:webxr-cross-platform', 'implements');
  if (spec006) ensureRelation(relations, relationSeen, spec006, 'concept:webxr-cross-platform', 'enables');

  const xraiDoc = {
    xrai_version: '1.0',
    id: 'portals-knowledge-graph',
    created_at: new Date().toISOString(),
    author: { type: 'agent', id: 'oz-build-knowledge-graph' },
    origin: { app: 'xrai-site-builder', version: '1.0', scene: 'portals-knowledge-graph' },
    scene: {
      anchors: [],
      entities,
      relations,
      events: [
        {
          id: `event:${Date.now()}`,
          t: new Date().toISOString(),
          type: 'graph-built',
          entity: 'structure:kb:root',
          metadata: {
            entityCount: entities.length,
            relationCount: relations.length,
            corpusRoots: SOURCE_ROOTS.map((root) => root.label),
          },
        },
      ],
    },
    metadata: {
      title: 'Portals × KnowledgeBase × Karpathy Wiki Graph',
      summary: 'Unified XRAI knowledge graph compiled from the Unity-XR-AI KnowledgeBase, the full Portals v4 specs tree, and Karpathy’s compiled-wiki pattern.',
      built_at: new Date().toISOString(),
      counts: {
        entities: entities.length,
        relations: relations.length,
        documents: docs.length,
        knowledgebase: docs.filter((doc) => doc.source.key === 'kb').length,
        specs: docs.filter((doc) => doc.source.key === 'specs').length,
      },
    },
  };

  const graphView = {
    built_at: xraiDoc.metadata.built_at,
    meta: xraiDoc.metadata,
    nodes: entities.map((entity) => ({
      id: entity.id,
      label: entity.label,
      type: entity.type,
      group: entity.group,
      glyph: entity.glyph,
      size: entity.size,
      file: entity.file || null,
      summary: entity.summary || '',
      sourceRoot: entity.sourceRoot || 'external',
      sourcePath: entity.sourcePath || null,
      tags: entity.tags || [],
      trustTier: entity.trustTier || 'T2',
      cluster: entity.cluster || null,
      status: entity.status || null,
      platforms: entity.platforms || [],
    })),
    links: relations.map((relation) => ({
      id: relation.id,
      source: relation.from,
      target: relation.to,
      type: relation.type,
      scope: relation.scope || 'overview',
    })),
  };

  const kbIndex = {
    built_at: xraiDoc.metadata.built_at,
    count: kbIndexEntries.length,
    entries: kbIndexEntries.sort((a, b) => a.file.localeCompare(b.file)),
  };

  await fs.writeFile(OUTPUTS.xrai, JSON.stringify(xraiDoc, null, 2));
  await fs.writeFile(OUTPUTS.view, JSON.stringify(graphView, null, 2));
  await fs.writeFile(OUTPUTS.index, JSON.stringify(kbIndex, null, 2));

  return {
    entities: entities.length,
    relations: relations.length,
    documents: docs.length,
    outputs: OUTPUTS,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildKnowledgeGraph()
    .then((result) => {
      console.log(`[build-knowledge-graph] entities=${result.entities} relations=${result.relations} documents=${result.documents}`);
      console.log(`[build-knowledge-graph] wrote ${result.outputs.xrai}`);
      console.log(`[build-knowledge-graph] wrote ${result.outputs.view}`);
      console.log(`[build-knowledge-graph] wrote ${result.outputs.index}`);
    })
    .catch((error) => {
      console.error('[build-knowledge-graph] failed:', error);
      process.exit(1);
    });
}
