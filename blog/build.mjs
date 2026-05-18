#!/usr/bin/env node
// blog/build.mjs — markdown → static HTML + index + RSS. Zero deps.
// Usage: node blog/build.mjs
// Source: blog/posts/*.md (YAML-lite frontmatter)
// Output: blog/<slug>.html, blog/index.html, blog/rss.xml

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, "posts");
const OUT_DIR = __dirname;
const SITE_URL = "https://xra1.com";

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: src };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.+)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
  }
  return { meta, body: m[2] };
}

// Minimal markdown subset: headings, paragraphs, lists, inline code, bold, italic, links, code fences, hr
function md(src) {
  const lines = src.split("\n");
  const out = [];
  let inCode = false, codeLang = "", codeBuf = [];
  let inList = false, listType = "";
  let para = [];

  const flushPara = () => {
    if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; }
  };
  const flushList = () => {
    if (inList) { out.push(`</${listType}>`); inList = false; }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.match(/^```/)) {
      if (inCode) {
        out.push(`<pre><code${codeLang ? ` class="lang-${esc(codeLang)}"` : ""}>${esc(codeBuf.join("\n"))}</code></pre>`);
        inCode = false; codeBuf = []; codeLang = "";
      } else {
        flushPara(); flushList();
        inCode = true; codeLang = line.slice(3).trim();
      }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }

    if (line.match(/^---+\s*$/)) { flushPara(); flushList(); out.push("<hr/>"); continue; }

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { flushPara(); flushList(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }

    const ul = line.match(/^[-*]\s+(.*)$/);
    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ul || ol) {
      flushPara();
      const wantType = ul ? "ul" : "ol";
      if (!inList) { out.push(`<${wantType}>`); inList = true; listType = wantType; }
      else if (listType !== wantType) { out.push(`</${listType}>`); out.push(`<${wantType}>`); listType = wantType; }
      out.push(`<li>${inline((ul || ol)[1])}</li>`);
      continue;
    } else if (inList && line.trim() === "") {
      flushList();
    }

    if (line.trim() === "") { flushPara(); continue; }
    para.push(line);
  }
  flushPara(); flushList();
  return out.join("\n");
}

function inline(s) {
  let out = esc(s);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `<a href="${h}">${t}</a>`);
  return out;
}

const HEAD = (title, desc, slug) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${esc(title)} — XRAI</title>
<meta name="description" content="${esc(desc)}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${SITE_URL}/blog/${slug}.html" />
<link rel="preconnect" href="https://api.fontshare.com" />
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" />
<link rel="stylesheet" href="../styles/brand.css" />
<link rel="stylesheet" href="../styles/blog.css" />
<link rel="alternate" type="application/rss+xml" title="XRAI blog" href="./rss.xml" />
</head>`;

const HEADER = `<header class="blog-header">
  <a class="blog-home" href="../index.html">xrai</a>
  <nav><a href="./index.html">blog</a><a href="../rfcs/">rfcs</a><a href="../SPEC.md">spec</a><a href="https://github.com/imclab/xra1">github</a></nav>
</header>`;

const FOOTER = `<footer class="blog-footer"><p>MIT · <a href="https://github.com/imclab/xra1">imclab/xra1</a> · <a href="./rss.xml">rss</a></p></footer>`;

function build() {
  let files;
  try { files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_")); }
  catch { console.error("no posts dir at", POSTS_DIR); process.exit(1); }

  const posts = files.map((f) => {
    const src = readFileSync(join(POSTS_DIR, f), "utf8");
    const { meta, body } = parseFrontmatter(src);
    const slug = meta.slug || f.replace(/\.md$/, "");
    const title = meta.title || slug;
    const date = meta.date || "1970-01-01";
    const desc = meta.description || "";
    const tags = (meta.tags || "").split(",").map((t) => t.trim()).filter(Boolean);
    return { slug, title, date, desc, tags, body, file: f };
  }).sort((a, b) => b.date.localeCompare(a.date));

  for (const p of posts) {
    const html = `${HEAD(p.title, p.desc, p.slug)}
<body class="blog-post">
${HEADER}
<article>
  <p class="meta"><time datetime="${p.date}">${p.date}</time>${p.tags.length ? " · " + p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join(" ") : ""}</p>
  <h1>${esc(p.title)}</h1>
  ${md(p.body)}
</article>
${FOOTER}
</body>
</html>`;
    writeFileSync(join(OUT_DIR, `${p.slug}.html`), html);
    console.log("wrote", `${p.slug}.html`);
  }

  // index
  const list = posts.map((p) => `
    <li class="post-row">
      <time datetime="${p.date}">${p.date}</time>
      <a href="./${p.slug}.html">${esc(p.title)}</a>
      ${p.desc ? `<p class="post-desc">${esc(p.desc)}</p>` : ""}
    </li>`).join("");

  const indexHtml = `${HEAD("blog", "Writing from the XRAI team — releases, weekly notes, design decisions.", "index")}
<body class="blog-index">
${HEADER}
<main>
  <h1>blog</h1>
  <p class="lede">Weekly notes, releases, design decisions. <a href="./rss.xml">RSS</a>.</p>
  <ul class="post-list">${list}</ul>
</main>
${FOOTER}
</body>
</html>`;
  writeFileSync(join(OUT_DIR, "index.html"), indexHtml);
  console.log("wrote index.html");

  // rss
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>XRAI blog</title>
<link>${SITE_URL}/blog/</link>
<description>Writing from the XRAI team.</description>
<language>en-us</language>
${posts.map((p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${SITE_URL}/blog/${p.slug}.html</link>
  <guid>${SITE_URL}/blog/${p.slug}.html</guid>
  <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  <description>${esc(p.desc)}</description>
</item>`).join("\n")}
</channel>
</rss>`;
  writeFileSync(join(OUT_DIR, "rss.xml"), rss);
  console.log("wrote rss.xml");

  console.log(`\nbuilt ${posts.length} posts`);
}

build();
