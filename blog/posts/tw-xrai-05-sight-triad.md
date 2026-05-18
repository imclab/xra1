---
title: This Week in XRAI #5 — The Sight Triad
slug: tw-xrai-05-sight-triad
date: 2026-05-30
description: x-ray · god's-eye · infinite zoom. The philosophy behind why XRAI looks the way it does.
tags: weekly,manifesto
---

**Publish:** 2026-05-30 (Friday)
**Register:** voice B (manifesto)

---

## Hook

Every format is a philosophy in disguise. XRAI's philosophy is the Sight Triad.

## The problem, one more time

We are blind. We are island minds. Code is opaque. AI is black-boxed. The web is flat. Every medium we inherited narrows the aperture further. The medium we build next either widens it or narrows it. Nothing is neutral.

## The triad

Three complementary ways of seeing, each healing a different facet of the blindness:

- **X-ray vision** — see *through* opacity. Through AI black boxes. Through code. Through provenance chains. Through invisible infrastructure costs. Reasoning becomes inspectable. Computation becomes accountable.
- **God's-eye view** — see *over* topology. The landscape of a field. The dynamics of a market. The shape of a civilizational problem. Zoom out until the pattern is obvious.
- **Infinite zoom** — see *across* four axes. Time (past → present → future, including counterfactuals). Possibilities (branches, what-ifs). Minds (your graph + mine + the agent's, federated). Scales (molecule → cosmos).

A format that advances only one is incomplete. A feature that activates all three is gold-standard.

## How XRAI carries this

- **X-ray** → every XRAI event has optional `causedBy` / `causes` fields (RFC 0001). Any agent's decision chain is auditable in the graph, not hidden behind a prompt.
- **God's-eye** → XRAI's typed hypergraph (RFC 0002) + relation types (`parent-of`, `wire-binds`, `reacts-to-audio`, `tracks`) let a viewer render a scene as topology, not just geometry. The KB visualizer spec (006) is the reference UI.
- **Infinite zoom** → temporal fields (`validFrom` / `validTo`), counterfactual `branch` field (RFC 0001), federated-graph metadata (planned RFC for v2.0). All four axes addressable.

## What this means for runtimes

If you're building an XRAI runtime, you're building a seeing instrument. Think less "how do I render a cube" and more "what does this scene let a user *see* that a flat UI wouldn't?" The 20 use cases in [USE_CASES.md](../USE_CASES.md) are all answers to that question.

## Gold-standard specs (per the Sight Triad Spec Audit)

Three Portals specs activate all three pillars today:

- **Spec 006 kb-visualizer** — x-ray (KB provenance) + god's-eye (topology of knowledge) + zoom (into nodes)
- **Spec 016 definitive-answer-engine** — x-ray (calibrated confidence) + god's-eye (research landscape) + zoom (across minds, cross-CLI swarm)
- **Spec 021 PTHI** — x-ray (inspectable properties) + god's-eye (topology around every object) + zoom (detail scales)

If you're evaluating where XRAI goes next, these are the features to watch.

## Metric of the week

- External scenes authored that activate ≥ 2 pillars: [N]
- Reference runtimes with passing conformance: [N]

## Cross-reference

- `constitution.md § The Affirmative Mirror — Vision` (load-bearing)
- `docs/audits/sight_triad_spec_audit_20260422.md` (all 26 Portals specs classified)
- `specs/XXX-zero-to-one/xrai-website/VISION.md` (canonical vision source, verbatim)

— @jamestunick
