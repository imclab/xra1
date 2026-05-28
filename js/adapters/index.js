// js/adapters/index.js — universal encode/decode registry
// ─────────────────────────────────────────────────────────────────────────────
// Every adapter is: `async (input, opts) => xraiDoc`.
// Register once, consume anywhere (web / node / RN / Unity bridge).
//
// Adoption rule: adapters MUST only touch globalThis.fetch + xrai-core.
// No DOM, no node:fs — runtimes supply I/O via `opts.loadText` when needed.
// ─────────────────────────────────────────────────────────────────────────────

import {
  registerAdapter, newScene, entity, relation, event, httpGet,
} from '../xrai-core.js';

// Side-effect imports — adapters self-register on load
import './voxel.js';
import './icosa.js';
// 4-modal procgen (voxel/shader/particle/icosa + mix) under `procgen.*` namespace
import '../procgen/index.js';
// Data-source dataviz (webpage/github/xrai-kg/social) under `dataviz.*` namespace
import '../dataviz/index.js';
// KG-from-seed (book/concept/paper/code/prompt) → `graph.seed`
import '../graph/seed.js';

/* ─── 1. Webpage / website — DOM or URL → nodes-per-section ─────────────── */
registerAdapter('webpage', async (input) => {
  // input: URL string OR {html, url}
  const url = typeof input === 'string' ? input : input.url;
  const html = typeof input === 'string' ? await httpGet(url) : (input.html || '');
  const doc = newScene({ origin: 'webpage' });
  const title = (html.match(/<title[^>]*>([^<]+)<\/title>/i) || [])[1] || url;
  doc.metadata = { sourceUrl: url, title };
  const root = entity(`page:${url}`, 'object.web-container', {
    label: title, glyph: '▦', group: 'doc', url, params: { viewport: [1200, 800] },
  });
  doc.scene.entities.push(root);
  // Pull headings as sub-nodes
  const headings = [...html.matchAll(/<h([1-3])[^>]*>([^<]+)<\/h\1>/gi)].slice(0, 32);
  headings.forEach((m, i) => {
    const id = `${root.id}#h${i}`;
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    doc.scene.entities.push(entity(id, 'object.web-subtree', {
      label: text, glyph: '▤', group: 'structure',
      params: { level: +m[1], selector: `h${m[1]}:nth-of-type(${i + 1})` },
    }));
    doc.scene.relations.push(relation(root.id, id, 'parent-of'));
  });
  return doc;
});

/* ─── 2. Wikipedia — article → concepts + references ───────────────────── */
registerAdapter('wikipedia', async (input) => {
  const title = typeof input === 'string' ? input : input.title;
  const api = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const summary = await httpGet(api);
  const doc = newScene({ origin: 'wikipedia' });
  const rootId = `wiki:${summary.title}`;
  doc.scene.entities.push(entity(rootId, 'concept', {
    label: summary.title, glyph: '◆', group: 'concept',
    url: summary.content_urls?.desktop?.page, inlineMd: `# ${summary.title}\n\n${summary.extract || ''}`,
  }));
  // Try links endpoint for top outbound references
  try {
    const linksApi = `https://en.wikipedia.org/w/api.php?action=query&prop=links&titles=${encodeURIComponent(title)}&pllimit=30&format=json&origin=*`;
    const lj = await httpGet(linksApi);
    const pages = lj?.query?.pages || {};
    const first = Object.values(pages)[0];
    (first?.links || []).slice(0, 24).forEach(l => {
      const id = `wiki:${l.title}`;
      doc.scene.entities.push(entity(id, 'concept', {
        label: l.title, glyph: '◆', group: 'concept',
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(l.title.replace(/ /g, '_'))}`,
      }));
      doc.scene.relations.push(relation(rootId, id, 'references'));
    });
  } catch {}
  return doc;
});

/* ─── 3. arXiv paper citations (to + from) ─────────────────────────────── */
registerAdapter('arxiv', async (input) => {
  const id = typeof input === 'string' ? input : input.id;
  // Abstract via export.arxiv.org (plain text)
  const atom = await httpGet(`https://export.arxiv.org/api/query?id_list=${encodeURIComponent(id)}`);
  const title = (atom.match(/<title[^>]*>([\s\S]+?)<\/title>/) || [])[1]?.trim();
  const authors = [...atom.matchAll(/<name>([^<]+)<\/name>/g)].map(m => m[1]);
  const summary = (atom.match(/<summary[^>]*>([\s\S]+?)<\/summary>/) || [])[1]?.trim();
  const doc = newScene({ origin: 'arxiv' });
  const rootId = `arxiv:${id}`;
  doc.scene.entities.push(entity(rootId, 'concept', {
    label: `arXiv ${id}`, glyph: '◆', group: 'concept',
    url: `https://arxiv.org/abs/${id}`,
    inlineMd: `# ${title || id}\n\n${authors.join(', ')}\n\n${summary || ''}`,
  }));
  authors.forEach(a => {
    const aid = `author:${a}`;
    doc.scene.entities.push(entity(aid, 'person', { label: a, glyph: '●', group: 'person' }));
    doc.scene.relations.push(relation(aid, rootId, 'authored'));
  });
  return doc;
});

/* ─── 4. Twitter / X user + friends ────────────────────────────────────── */
// NOTE: X API requires auth. When opts.bearer absent, this emits a minimal
// stub with the handle node only — still useful for pipeline wiring.
registerAdapter('twitter', async (input, opts = {}) => {
  const handle = (typeof input === 'string' ? input : input.handle).replace(/^@/, '');
  const doc = newScene({ origin: 'twitter' });
  const rootId = `tw:${handle}`;
  doc.scene.entities.push(entity(rootId, 'person', {
    label: `@${handle}`, glyph: '●', group: 'person',
    url: `https://twitter.com/${handle}`,
  }));
  if (!opts.bearer) return doc;
  try {
    const u = await httpGet(`https://api.twitter.com/2/users/by/username/${handle}`, {
      headers: { Authorization: `Bearer ${opts.bearer}` },
    });
    if (u?.data?.id) {
      const fr = await httpGet(`https://api.twitter.com/2/users/${u.data.id}/following?max_results=50`, {
        headers: { Authorization: `Bearer ${opts.bearer}` },
      });
      (fr?.data || []).forEach(f => {
        const id = `tw:${f.username}`;
        doc.scene.entities.push(entity(id, 'person', {
          label: `@${f.username}`, glyph: '●', group: 'person',
          url: `https://twitter.com/${f.username}`,
        }));
        doc.scene.relations.push(relation(rootId, id, 'follows'));
      });
    }
  } catch (e) { /* quietly fall back to stub */ }
  return doc;
});

/* ─── 5. LinkedIn network ──────────────────────────────────────────────── */
// LinkedIn API requires OAuth. Stub only — still plugs into pipeline.
registerAdapter('linkedin', async (input) => {
  const handle = typeof input === 'string' ? input : input.handle;
  const doc = newScene({ origin: 'linkedin' });
  doc.scene.entities.push(entity(`li:${handle}`, 'person', {
    label: handle, glyph: '●', group: 'person',
    url: `https://linkedin.com/in/${handle}`,
  }));
  doc.metadata.note = 'LinkedIn adapter requires OAuth; stub only.';
  return doc;
});

/* ─── 6. Calendar / timeline (ICS) ─────────────────────────────────────── */
registerAdapter('calendar', async (input) => {
  const text = typeof input === 'string' ? input : input.ics;
  const doc = newScene({ origin: 'calendar' });
  const blocks = text.split(/BEGIN:VEVENT/).slice(1);
  blocks.forEach((b, i) => {
    const summary = (b.match(/SUMMARY:([^\r\n]+)/) || [])[1] || `event ${i}`;
    const dtstart = (b.match(/DTSTART[^:]*:([^\r\n]+)/) || [])[1];
    const id = `evt:${i}`;
    doc.scene.entities.push(entity(id, 'object.event', {
      label: summary, glyph: '○', group: 'demo',
      params: { dtstart },
    }));
    if (dtstart) {
      doc.scene.events.push(event('calendar', id, {
        t: _icsToIso(dtstart), label: summary,
      }));
    }
  });
  return doc;
});
function _icsToIso(d) {
  const m = /^(\d{4})(\d{2})(\d{2})T?(\d{2})?(\d{2})?(\d{2})?Z?/.exec(d || '');
  if (!m) return new Date().toISOString();
  return `${m[1]}-${m[2]}-${m[3]}T${m[4] || '00'}:${m[5] || '00'}:${m[6] || '00'}Z`;
}

/* ─── 7. GitHub repo (files + languages + contributors) ────────────────── */
registerAdapter('github-repo', async (input, opts = {}) => {
  const { owner, repo } = typeof input === 'string'
    ? { owner: input.split('/')[0], repo: input.split('/')[1] }
    : input;
  const h = opts.token ? { Authorization: `Bearer ${opts.token}` } : {};
  const r = await httpGet(`https://api.github.com/repos/${owner}/${repo}`, { headers: h });
  const doc = newScene({ origin: 'github-repo' });
  const rootId = `gh:${owner}/${repo}`;
  doc.scene.entities.push(entity(rootId, 'object.code-repo', {
    label: `${owner}/${repo}`, glyph: '▤', group: 'structure',
    url: r.html_url, params: { stars: r.stargazers_count, lang: r.language },
  }));
  try {
    const tree = await httpGet(`https://api.github.com/repos/${owner}/${repo}/git/trees/${r.default_branch}?recursive=1`, { headers: h });
    (tree.tree || []).filter(t => t.type === 'blob').slice(0, 80).forEach(t => {
      const id = `${rootId}:${t.path}`;
      doc.scene.entities.push(entity(id, 'object.code-module', {
        label: t.path.split('/').pop(), glyph: '▦', group: 'doc',
        params: { path: t.path, size: t.size },
      }));
      doc.scene.relations.push(relation(rootId, id, 'contains'));
    });
  } catch {}
  return doc;
});

/* ─── 8. GitHub commit history ─────────────────────────────────────────── */
registerAdapter('github-commits', async (input, opts = {}) => {
  const { owner, repo, since } = typeof input === 'string'
    ? { owner: input.split('/')[0], repo: input.split('/')[1] }
    : input;
  const h = opts.token ? { Authorization: `Bearer ${opts.token}` } : {};
  const qs = since ? `?since=${encodeURIComponent(since)}&per_page=60` : '?per_page=60';
  const commits = await httpGet(`https://api.github.com/repos/${owner}/${repo}/commits${qs}`, { headers: h });
  const doc = newScene({ origin: 'github-commits' });
  const rootId = `gh:${owner}/${repo}`;
  doc.scene.entities.push(entity(rootId, 'object.code-repo', {
    label: `${owner}/${repo}`, glyph: '▤', group: 'structure',
  }));
  (commits || []).forEach(c => {
    const cid = `commit:${c.sha.slice(0, 7)}`;
    doc.scene.entities.push(entity(cid, 'object.commit', {
      label: c.commit.message.split('\n')[0].slice(0, 60),
      glyph: '○', group: 'demo',
      url: c.html_url, params: { sha: c.sha, author: c.commit.author?.name },
    }));
    doc.scene.relations.push(relation(cid, rootId, 'commit-of'));
    doc.scene.events.push(event('commit', cid, {
      t: c.commit.author?.date, message: c.commit.message,
    }));
  });
  return doc;
});

/* ─── 9. Code dependencies (package.json / Cargo.toml / pyproject) ────── */
registerAdapter('code-deps', async (input) => {
  const text = typeof input === 'string' ? input : input.text;
  const kind = (typeof input === 'object' && input.kind) || _guessDepKind(text);
  const doc = newScene({ origin: 'code-deps' });
  const rootId = `pkg:root`;
  doc.scene.entities.push(entity(rootId, 'object.package', {
    label: 'package', glyph: '▤', group: 'structure', params: { kind },
  }));
  const deps = _parseDeps(text, kind);
  Object.entries(deps).forEach(([name, ver]) => {
    const id = `dep:${name}`;
    doc.scene.entities.push(entity(id, 'object.dependency', {
      label: name, glyph: '▦', group: 'doc', params: { version: ver },
    }));
    doc.scene.relations.push(relation(rootId, id, 'depends-on'));
  });
  return doc;
});
function _guessDepKind(t) {
  if (/\"dependencies\"\s*:/.test(t)) return 'npm';
  if (/\[dependencies\]/.test(t)) return 'cargo';
  if (/\[tool\.poetry\.dependencies\]/.test(t) || /\[project\.dependencies\]/.test(t)) return 'poetry';
  return 'unknown';
}
function _parseDeps(t, kind) {
  if (kind === 'npm') {
    try {
      const j = JSON.parse(t);
      return { ...(j.dependencies || {}), ...(j.devDependencies || {}) };
    } catch { return {}; }
  }
  if (kind === 'cargo') {
    const m = t.match(/\[dependencies\]([\s\S]*?)(\n\[|$)/);
    if (!m) return {};
    const o = {};
    [...m[1].matchAll(/^([\w-]+)\s*=\s*"([^"]+)"/gm)].forEach(x => { o[x[1]] = x[2]; });
    return o;
  }
  return {};
}

/* ─── 10. Tech spec (markdown) → concepts + sections ───────────────────── */
registerAdapter('markdown-spec', async (input) => {
  const text = typeof input === 'string' ? input : input.text;
  const doc = newScene({ origin: 'markdown-spec' });
  const title = (text.match(/^#\s+(.+)$/m) || [])[1] || 'spec';
  const rootId = `spec:root`;
  doc.scene.entities.push(entity(rootId, 'file', {
    label: title, glyph: '▦', group: 'doc', inlineMd: text.slice(0, 1200),
  }));
  [...text.matchAll(/^##\s+(.+)$/gm)].slice(0, 30).forEach((m, i) => {
    const id = `sec:${i}`;
    doc.scene.entities.push(entity(id, 'concept', {
      label: m[1].trim(), glyph: '◆', group: 'concept',
    }));
    doc.scene.relations.push(relation(rootId, id, 'parent-of'));
  });
  return doc;
});

/* ─── 11. Test workflow — steps + pass/fail events ─────────────────────── */
registerAdapter('test-workflow', async (input) => {
  // input: { name, steps: [{id, label, status, t?}] }
  const doc = newScene({ origin: 'test-workflow' });
  const rootId = `test:${input.name}`;
  doc.scene.entities.push(entity(rootId, 'object.test-suite', {
    label: input.name, glyph: '▤', group: 'structure',
  }));
  (input.steps || []).forEach(s => {
    const id = `step:${s.id}`;
    doc.scene.entities.push(entity(id, 'object.test-step', {
      label: s.label, glyph: '○', group: 'demo',
      params: { status: s.status },
    }));
    doc.scene.relations.push(relation(rootId, id, 'has-step'));
    if (s.status) {
      doc.scene.events.push(event(s.status, id, { t: s.t || new Date().toISOString() }));
    }
  });
  return doc;
});

/* ─── 12. Concept graph (free-form) ────────────────────────────────────── */
registerAdapter('concept-graph', async (input) => {
  // input: { concepts: [{id, label}], edges: [{from, to, type?}] }
  const doc = newScene({ origin: 'concept-graph' });
  (input.concepts || []).forEach(c => {
    doc.scene.entities.push(entity(c.id, 'concept', {
      label: c.label || c.id, glyph: '◆', group: 'concept',
    }));
  });
  (input.edges || []).forEach(e => {
    doc.scene.relations.push(relation(e.from, e.to, e.type || 'links-to'));
  });
  return doc;
});

/* ─── Available adapter list (for hub / configs UI) ──────────────────── */
export const AVAILABLE = [
  { name: 'webpage',         label: 'Webpage / website',        inputHint: 'URL or HTML string' },
  { name: 'wikipedia',       label: 'Wikipedia article',        inputHint: 'article title' },
  { name: 'arxiv',           label: 'arXiv paper',              inputHint: 'paper ID (e.g. 2401.12345)' },
  { name: 'twitter',         label: 'Twitter / X user',         inputHint: '@handle (needs bearer token)' },
  { name: 'linkedin',        label: 'LinkedIn network',         inputHint: 'profile slug (OAuth stub)' },
  { name: 'calendar',        label: 'Calendar / timeline',      inputHint: '.ics text' },
  { name: 'github-repo',     label: 'GitHub repo structure',    inputHint: 'owner/repo' },
  { name: 'github-commits',  label: 'GitHub commit history',    inputHint: 'owner/repo' },
  { name: 'code-deps',       label: 'Code dependencies',        inputHint: 'package.json / Cargo.toml text' },
  { name: 'markdown-spec',   label: 'Tech spec (Markdown)',     inputHint: 'markdown text' },
  { name: 'test-workflow',   label: 'Test workflow',            inputHint: '{name, steps[]}' },
  { name: 'concept-graph',   label: 'Concept graph',            inputHint: '{concepts[], edges[]}' },
  { name: 'voxel',           label: 'Voxel generator scene',    inputHint: '{kind, plan:[{category,type,x,y,z,rotation}]}' },
  { name: 'icosa',           label: 'Icosa Gallery search',     inputHint: 'keywords (e.g. "dragon")' },
];

export default AVAILABLE;
