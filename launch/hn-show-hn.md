# Hacker News — Show HN

**Submit window:** Tue–Thu, 8–10am Pacific (highest HN traffic).
**Title character limit:** 80. Do not editorialize. No emoji. No buzzwords.
**URL:** `https://xra1.com` (or `https://github.com/imclab/xra1` if xra1.com not live).

---

## Title

```
Show HN: XRAI – an open spatial graph format for AI agents (MIT)
```

*(alt if above feels too dry: `Show HN: An open spatial graph format, MIT-licensed, looking for feedback`)*

## URL

```
https://xra1.com
```

## Body (first comment, post immediately after submitting)

**XRAI — X-ray vision. God's-eye view. Infinite zoom. For everyone.** Open format for spatial cognition: typed hypergraphs of entities, relationships, events, and intentions, anchored in space and time, renderable by any engine, authored by any LLM, queryable by any agent. See *through* AI black boxes. See *over* topology. See *across* time, possibilities, and minds.

Shipping proof: the reference implementation (Portals, CVPR 2026 workshop paper) runs at 60 FPS on iPhone 14 Pro (2.7–4.1× speedup), drives 360+ VFX from a shared compute substrate, and persists stateful worlds across sessions + devices + users. On-device intent parsing, cloud fallback, no-code authoring, web viewers for Apple Vision Pro.

The 80-year version of "why now": Bush's memex, Nelson's Xanadu, Berners-Lee's WWW + Giant Global Graph, Huxley's doors of perception — each hit the same wall: structured cognition needs structured authoring, and humans won't pay the cost. LLMs dropped that cost to zero. Cameras in glasses ground the symbols. MCP standardizes how agents share context. The singularity, arriving — open, or captured. We are choosing now.

v1.0 is extracted from what our AR app (Portals) ships today. Not designed in a committee room. Whatever works in production is the spec.

What it is:
- JSON schema, MIT spec text, CC0 schema
- Entities (cube, sphere, glb, hologram, light, emitter) + n-ary relations + events
- LLM-authorable: any model can emit valid XRAI from natural input
- MCP-native: agents read/write/query via standard tools

What it is NOT:
- A company's proprietary format
- A committee-designed artifact
- A replacement for glTF/USD/USDZ — it composes with them

Governance: BDFL for year 1 (me), move to Apache Software Foundation or W3C Community Group once we hit 1000+ external adopters. Never to a single-vendor foundation.

Known gaps (v1.0 ships with them by design — perfection is how Xanadu died): event primitives are a stub, only one reference runtime (Unity + React Native), no validator CLI yet. Roadmap in CHANGELOG.md.

I'd like feedback on three things specifically:
1. What primitives are missing to describe the scenes you actually want AI agents to compose?
2. What breaks when you try to author a non-trivial scene with an LLM?
3. What about the governance plan worries you?

Repo: https://github.com/imclab/xra1
Spec: https://xra1.com/SPEC.md
Manifesto: https://xra1.com/MANIFESTO.md

---

## Response guide (first 2 hours)

**Expected critiques + canned responses (answer in comments, not in OP):**

- *"Why not USD/glTF/USDZ?"* → "XRAI composes with them. USD is great for rendering; it's not a graph. glTF is great for assets; it's not a scene + agent-memory format. USDZ is Apple-captured. XRAI sits one layer up."
- *"This is just JSON."* → "Yes. And HTML is just SGML. The value is the primitives + the conventions, not the syntax."
- *"How is this different from Matterport / OpenStreetMap / Wikidata?"* → "Those are data stores for specific domains. XRAI is a format any renderer/agent can consume. Closer to the glTF-of-agent-memory than to a database."
- *"BDFL is a single point of failure."* → "Year 1 only. Transition criterion is public (1000+ external adopters). Open issue to discuss."
- *"Why MIT not Apache 2.0?"* → "Patent grant was considered. MIT chosen for schema neutrality. Arguable. File an issue if strong preference."
- *"Show the code / show a demo, don't tell me about lineage."* → Reply with a 60-second voice-to-scene demo video + a 5-line XRAI scene example.

**Do NOT:**
- Argue with bad-faith commenters. Don't feed the downvote spiral.
- Mention valuation, funding, acquirer angles.
- Make it about Portals-the-company. Keep it about the spec.

## Pre-submit checklist

- [ ] Repo public at `github.com/imclab/xra1`
- [ ] README.md + MANIFESTO.md + SPEC.md + LICENSE + CONTRIBUTING.md + CODE_OF_CONDUCT.md + CHANGELOG.md present
- [ ] `xra1.com` resolves (placeholder OK)
- [ ] At least 1 working example in `examples/`
- [ ] Demo video link ready (can be unlisted YouTube; will drop in first comment reply)
- [ ] James online + available for 2+ hours after submit to respond
