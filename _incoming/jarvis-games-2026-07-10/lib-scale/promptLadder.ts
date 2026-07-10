// promptLadder.ts — archetype word = SEED → three prompts of increasing length/complexity (small · medium
// · large), seeded by place × time × a semi-random roll. Pure TS. This is the front-end onto the procedural
// system: prompt length ↔ complexity ↔ the table/sidewalk/urban scales (SCALE_TEMPLATE.md). The small prompt
// makes a simple thing; the large, fully-detailed prompt makes a Blade-Runner set-piece — same generator,
// different seed length (constitution codon path :701). Graduates to both composers unchanged.

import { getArchetype, type ArchetypeId } from "./archetypes";

export interface LadderCtx { placeName: string; epochBucket: number; roll: number; }
export interface PromptLadder { small: string; medium: string; large: string; }

const TIME_WORDS = ["at dawn", "in daylight", "at dusk", "under the night sky"];

// Marquee override — the operator's exact Spiral × East-River example (small whirlpools → drain-vortex → tornado).
const OVERRIDE: Partial<Record<ArchetypeId, (place: string, t: string) => PromptLadder>> = {
  spiral: (place, t) => ({
    small: `small whirlpools spinning ${t} at ${place}'s edge`,
    medium: `a huge drain-vortex opens in the middle of ${place} ${t}`,
    large: `a towering water-tornado whips down ${place} ${t} — lightning forking through its spiral, neon reflections and debris spiraling up its walls, thunder rolling off the skyline`,
  }),
};

export function promptLadder(id: ArchetypeId, ctx: LadderCtx): PromptLadder {
  const a = getArchetype(id);
  const place = ctx.placeName?.trim() || "the river";
  const t = TIME_WORDS[((ctx.epochBucket % 4) + 4) % 4];
  const ov = OVERRIDE[id];
  if (ov) return ov(place, t);
  const nm = a.name.toLowerCase();
  const nat = a.nature[ctx.roll % a.nature.length];
  const nat2 = a.nature[(ctx.roll + 1) % a.nature.length];
  const ess = a.essences.join(", ");
  return {
    small: `small ${nat}-like ${nm} forming ${t} at ${place}'s edge`,
    medium: `a huge ${nm} — like a ${nat2} — opens in the middle of ${place} ${t}`,
    large: `a towering ${nm} sweeps down ${place} ${t}: ${ess} spiraling through it, lightning forking across the skyline, neon reflections and debris whipping up its walls, thunder rolling off the towers`,
  };
}

export function promptLadderSelfTest(): { name: string; ok: boolean; detail: string }[] {
  const out: { name: string; ok: boolean; detail: string }[] = [];
  const ctx: LadderCtx = { placeName: "the East River", epochBucket: 2, roll: 0 };
  const l = promptLadder("spiral", ctx);
  out.push({ name: "sizes-3", ok: !!(l.small && l.medium && l.large), detail: "s/m/l present" });
  out.push({ name: "monotonic-len-all", ok: (["spiral", "lsystem", "voronoi", "attractor", "hex", "dna"] as ArchetypeId[]).every((id) => { const p = promptLadder(id, ctx); return p.small.length < p.medium.length && p.medium.length < p.large.length; }), detail: "s<m<l" });
  out.push({ name: "deterministic", ok: promptLadder("spiral", ctx).large === l.large, detail: "stable" });
  out.push({ name: "place-sensitive", ok: promptLadder("spiral", { ...ctx, placeName: "Central Park" }).small !== l.small, detail: "place in prompt" });
  out.push({ name: "time-sensitive", ok: promptLadder("spiral", { ...ctx, epochBucket: 0 }).small !== l.small, detail: "time in prompt" });
  out.push({ name: "spiral-flavor", ok: /vortex|whirlpool|tornado/.test(l.medium + l.large), detail: "operator example" });
  return out;
}
