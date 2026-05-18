# blog/ — authoring

Markdown source → static HTML. Zero deps. GitHub Pages serves the generated files.

## Write a post

1. Copy `posts/_TEMPLATE.md` → `posts/<slug>.md`
2. Fill in frontmatter (title, slug, date, description, tags)
3. Write body in markdown (headings, lists, code fences, **bold**, *italic*, [links](#))
4. `npm run blog` from site root
5. Commit `posts/<slug>.md` **and** generated `<slug>.html`, `index.html`, `rss.xml`

## Supported markdown

`#`/`##`/`###`/`####` headings · paragraphs · `-`/`*` and numbered lists · ``` ``` ``` fenced code (with optional lang) · inline `` `code` `` · `**bold**` · `*italic*` (rendered in periwinkle, not slanted) · `[links](url)` · `---` hr

Anything fancier (tables, images, footnotes) → extend `build.mjs`.

## Frontmatter

```yaml
---
title: "Human-readable title"
slug: tw-xrai-06-something
date: 2026-06-06
description: "One-sentence dek. Shown in index + meta + RSS."
tags: weekly,topic1,topic2
---
```

`slug` becomes `<slug>.html`. `date` (YYYY-MM-DD) sorts the index descending. `tags` is comma-separated.

## Build output

- `<slug>.html` — one per post
- `index.html` — post list, newest first
- `rss.xml` — full feed

Linked from main nav (`landing.html`, `index.html`) at `/blog/`.
