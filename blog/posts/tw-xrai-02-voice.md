---
title: This Week in XRAI #2 — Voice + jARvis
slug: tw-xrai-02-voice
date: 2026-05-09
description: How XRAI scenes compose themselves from speech, and where jARvis fits.
tags: weekly,voice,jarvis
---

**Publish:** 2026-05-09 (Friday after launch week)
**Register:** voice B (manifesto) — deeper technical tour, not hype
**Working title alt:** "How XRAI scenes compose themselves from speech"

---

## Hook

XRAI is a format any LLM can author. That claim has teeth only if *authoring* is frictionless. This week: how Portals (the reference runtime) gets from speech to a valid XRAI scene in under 2 seconds.

## What shipped this week

- [your week's actual ship — update before posting]
- Link to Portals Spec 008 (voice-intelligence-live) status for readers who want the engineering detail

## The pipeline

```
mic (RN side)
  → VAD (Silero local, 95% confidence threshold)
  → STT (Gemini Live Native Audio OR local Whisper fallback)
  → local intent parser (95% of commands resolved with zero cloud cost)
  → Gemini 2.5 Flash fallback for ambiguous utterances
  → JSON-Schema-constrained bridge message
  → Unity SceneComposer.AddObject()
  → XRAI export on save
```

Four facts that matter:

1. **95% of commands are parsed locally.** No round trip to a cloud model for "make a blue cube." The XRAI scene emerges without a network. (See `src/services/voice/localIntentParser.ts` in the Portals repo for the vocab.)
2. **The fallback is grounded.** When local confidence dips below threshold, Gemini Live gets the scene context + the current XRAI graph as additional input. It completes an XRAI fragment, not an English description.
3. **Confidence survives into XRAI.** Every object emitted by voice carries its `voice_prompt` + `latency_ms` in `metadata`. Downstream tooling can see which entities were spoken vs tapped, and with what agent.
4. **jARvis is the agent swarm that authors + queries + evolves XRAI graphs across sessions.** Voice is one input modality; the goal is voice + gesture + gaze + predictive — all emitting the same format.

## What we'd like feedback on

- **Have you tried an LLM authoring XRAI?** Any model (Claude, GPT, Gemini, Llama) — where did it hallucinate? File the failure case as a gist + link in `github.com/imclab/xra1/discussions`.
- **Local intent parsing.** Is 95% a realistic number for your domain? The Portals vocabulary leans AR-composition heavy; medical / civic / scientific domains have different priors. Happy to share the parser pattern.

## Metric of the week

- [N] scenes authored in XRAI this week (target: growing from last week)
- [N] external runtimes with passing conformance (target: 1 by end-of-month)
- [Pull the real numbers from `scripts/governance-readiness.sh` before publishing]

## Cross-reference

- Portals CVPR 2026 paper § 3.3 voice-driven semantic actions
- `specs/008-voice-intelligence-live/spec.md` in the Portals monorepo
- `mcp-server/src/index.ts` `compose_scene` tool — same intent parser, MCP-exposed

— @jamestunick
