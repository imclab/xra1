// js/dataviz/webpage.js — webpage URL → XRAI node graph.
//
// Strategy: fetch page (with permissive CORS fallback), parse DOMParser, extract:
//   • page node              (object.page)
//   • headings h1-h3         (object.heading, contains)
//   • links a[href]          (object.link, links-to)
//   • images img[src] count  (rolled into page.params, no per-image nodes — noise)
//
// CORS: if fetch fails, fall through to manually-pasted text in input.html.
// Renderer hint: params._layout = 'tree' (heading hierarchy is natural).

import { registerAdapter, newScene, entity, relation } from '../xrai-core.js';

async function fetchPage(url) {
  if (!url) return null;
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (e) {
    if (typeof console !== 'undefined') console.warn('[dataviz.webpage] fetch failed, falling back:', e.message);
    return null;
  }
}

function parseHtml(html, baseUrl) {
  if (typeof DOMParser === 'undefined') return null;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const title = doc.querySelector('title')?.textContent?.trim() || baseUrl || 'page';
  const headings = [...doc.querySelectorAll('h1, h2, h3')]
    .map(h => ({ level: +h.tagName[1], text: h.textContent.trim() }))
    .filter(h => h.text)
    .slice(0, 40);
  const links = [...doc.querySelectorAll('a[href]')]
    .map(a => ({ href: a.getAttribute('href'), text: a.textContent.trim() }))
    .filter(l => l.href && !l.href.startsWith('#') && !l.href.startsWith('javascript:'))
    .slice(0, 60);
  const imgCount = doc.querySelectorAll('img').length;
  return { title, headings, links, imgCount };
}

registerAdapter('dataviz.webpage', async (input, opts = {}) => {
  const url = typeof input === 'string' ? input : input?.url || '';
  const html = input?.data || input?.html || (await fetchPage(url));
  const parsed = html ? parseHtml(html, url) : { title: url || 'unknown', headings: [], links: [], imgCount: 0 };

  const doc = newScene({ origin: 'dataviz.webpage' });
  doc.metadata = { source: 'dataviz', kind: 'webpage', url, title: parsed.title };

  const pageId = `page_${Math.random().toString(36).slice(2, 8)}`;
  doc.scene.entities.push(entity(pageId, 'object.page', {
    label: parsed.title,
    glyph: '◉',
    url,
    params: { _layout: 'tree', _dataviz: 'webpage', images: parsed.imgCount },
  }));

  parsed.headings.forEach((h, i) => {
    const id = `h_${i}`;
    doc.scene.entities.push(entity(id, 'object.heading', {
      label: h.text.slice(0, 80),
      glyph: h.level === 1 ? '◆' : h.level === 2 ? '◇' : '∙',
      params: { _dataviz: 'webpage', level: h.level },
    }));
    doc.scene.relations.push(relation(pageId, id, 'contains'));
  });

  parsed.links.forEach((l, i) => {
    const id = `l_${i}`;
    doc.scene.entities.push(entity(id, 'object.link', {
      label: l.text.slice(0, 60) || l.href.slice(0, 60),
      glyph: '→',
      url: l.href,
      params: { _dataviz: 'webpage' },
    }));
    doc.scene.relations.push(relation(pageId, id, 'links-to'));
  });

  return doc;
});

if (typeof window !== 'undefined') {
  window.__dataviz_webpage = { parseHtml };
}
