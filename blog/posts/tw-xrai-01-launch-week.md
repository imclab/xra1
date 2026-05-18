---
title: This Week in XRAI #1 — Launch Week
slug: tw-xrai-01-launch-week
date: 2026-05-02
description: First week of the public spec: HN, X, GitHub, what landed and what's next.
tags: weekly,launch
---

**Publish date:** 2026-05-02 (Friday after launch).
**Channels:** blog post on xrai.dev, dev.to cross-post, X thread (link to blog), LinkedIn.
**Template note:** every Friday. Consistency > volume. Three paragraphs + a metric + a call-to-action. Never skip a week.

---

## Template

### Launch Week — 2026-04-29 → 2026-05-02

**What shipped**
- v1.0 spec public at github.com/imclab/xra1
- xrai.dev landing page + manifesto + SPEC
- Reference runtime: Portals (Unity 6 + React Native) in production
- MCP server scaffold at `/mcp-server` (9 tools defined, implementation week 2)

**What the week looked like**
<!-- fill in: HN / X / LinkedIn response, issue count, interesting critiques, early adopters -->

Example:
- HN: [XX] upvotes, [YY] comments, top critiques were [Z1, Z2, Z3]
- X thread: [XX] impressions, [YY] retweets, [ZZ] reply threads worth continuing
- GitHub: [XX] stars, [YY] forks, [ZZ] issues filed — [most interesting issue] at [link]
- First external contribution: [name] → [PR link] ([type of contribution])

**What's next**
- Three.js reference adapter (week 2 stretch)
- MCP server tool implementations (week 2)
- Conformance suite skeleton (week 3)
- Event primitive RFC opens [date]

**Metric of the week**
[count] scenes authored in XRAI by external users this week.
(Baseline: 0 on launch day. If this isn't growing, we have a problem.)

**You can help by**
Filing an issue if you tried authoring XRAI with an LLM and hit a wall. We can't fix what we don't see.

— @jamestunick

---

## Weekly rhythm (cadence doc, not part of the post)

**Every Friday 3pm Pacific:**
1. Draft the week's post in this template (30 min).
2. Update `CHANGELOG.md [Unreleased]` with anything shipped during the week.
3. Close out the week's GitHub milestone, open next week's.
4. Publish on blog → cross-post dev.to → short X thread linking to blog → LinkedIn paragraph.
5. Reply to top 3 most substantive critiques from previous week.

**If the week was slow:**
- Post anyway. A short post ("shipped parser fix, closed 3 issues, next week: X") beats no post.
- Dead repos signal death. Rhythm = credibility.

**If the week was catastrophic (server down, breaking change merged by mistake, etc.):**
- Acknowledge + fix + retrospective. Public mistakes + public recovery > silent retreat.

## Anti-patterns to refuse

- Hype posts without shipped artifacts ("excited to announce we're excited")
- Vague forward-looking statements ("soon we'll have...")
- Company-first framing. This is a project update, not a press release.
- Skipping weeks to "save up" a bigger post. Momentum > batch releases.
