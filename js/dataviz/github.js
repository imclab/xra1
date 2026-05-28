// js/dataviz/github.js — GitHub repo URL → XRAI tree+graph.
//
// Calls the public GitHub REST API (no auth needed for low rate). For private
// repos or higher rate, pass opts.token (PAT).
//
// Output entities:
//   • repo                      (object.repo, root)
//   • directories (recursive)   (object.dir, contains)
//   • top-N source files        (object.file, contains)
//   • top contributors          (object.user, contributes-to)
//   • languages                 (object.lang, written-in)
//
// Rate-budgeted: 3 API calls per visualization (repo meta, tree, contributors).
// Languages comes free with repo meta.

import { registerAdapter, newScene, entity, relation } from '../xrai-core.js';

function parseRepoUrl(url) {
  const m = String(url || '').match(/github\.com[/:]([^/]+)\/([^/?#]+?)(?:\.git)?(?:[/?#]|$)/);
  if (!m) return null;
  return { owner: m[1], repo: m[2] };
}

async function gh(path, token) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub ${res.status} ${path}`);
  return res.json();
}

registerAdapter('dataviz.github', async (input, opts = {}) => {
  const url = typeof input === 'string' ? input : input?.url || '';
  const ref = parseRepoUrl(url);
  if (!ref) throw new Error(`not a github URL: ${url}`);
  const token = opts.token || input?.token;

  const [meta, tree, contributors] = await Promise.all([
    gh(`/repos/${ref.owner}/${ref.repo}`, token),
    gh(`/repos/${ref.owner}/${ref.repo}/git/trees/HEAD?recursive=1`, token).catch(() => ({ tree: [] })),
    gh(`/repos/${ref.owner}/${ref.repo}/contributors?per_page=8`, token).catch(() => []),
  ]);

  const doc = newScene({ origin: 'dataviz.github' });
  doc.metadata = { source: 'dataviz', kind: 'github', url, owner: ref.owner, repo: ref.repo, stars: meta.stargazers_count };

  const repoId = `repo_${ref.owner}_${ref.repo}`;
  doc.scene.entities.push(entity(repoId, 'object.repo', {
    label: `${ref.owner}/${ref.repo}`,
    glyph: '⬢',
    url: meta.html_url,
    params: { _layout: 'tree', _dataviz: 'github', stars: meta.stargazers_count, forks: meta.forks_count, language: meta.language, description: meta.description },
  }));

  // Languages
  if (meta.language) {
    const langId = `lang_${meta.language}`;
    doc.scene.entities.push(entity(langId, 'object.lang', { label: meta.language, glyph: '⌨', params: { _dataviz: 'github' } }));
    doc.scene.relations.push(relation(repoId, langId, 'written-in'));
  }

  // Tree: dirs + top files
  const dirs = new Map();
  dirs.set('', repoId);
  const files = (tree.tree || []).filter(t => t.type === 'blob' || t.type === 'tree');
  const TOP_N = Math.min(60, files.length);

  // Sort: dirs first (so contains works), then files by size desc
  files.sort((a, b) => (a.type === 'tree' ? -1 : 1) - (b.type === 'tree' ? -1 : 1) || (b.size || 0) - (a.size || 0));

  let emitted = 0;
  for (const node of files) {
    if (emitted >= TOP_N) break;
    const parts = node.path.split('/');
    const name = parts.pop();
    const parentPath = parts.join('/');
    const parentId = dirs.get(parentPath);
    if (!parentId) continue; // parent dir wasn't emitted, skip
    const nodeId = `n_${node.sha.slice(0, 8)}`;
    if (node.type === 'tree') {
      dirs.set(node.path, nodeId);
      doc.scene.entities.push(entity(nodeId, 'object.dir', {
        label: name, glyph: '▸',
        params: { _dataviz: 'github', path: node.path },
      }));
    } else {
      doc.scene.entities.push(entity(nodeId, 'object.file', {
        label: name, glyph: '∎',
        url: `${meta.html_url}/blob/HEAD/${node.path}`,
        params: { _dataviz: 'github', path: node.path, size: node.size || 0 },
      }));
    }
    doc.scene.relations.push(relation(parentId, nodeId, 'contains'));
    emitted++;
  }

  // Contributors
  for (const c of contributors.slice(0, 8)) {
    const id = `user_${c.login}`;
    doc.scene.entities.push(entity(id, 'object.user', {
      label: c.login, glyph: '☉',
      url: c.html_url,
      params: { _dataviz: 'github', commits: c.contributions, avatar: c.avatar_url },
    }));
    doc.scene.relations.push(relation(id, repoId, 'contributes-to', { weight: c.contributions }));
  }

  return doc;
});

if (typeof window !== 'undefined') {
  window.__dataviz_github = { parseRepoUrl };
}
