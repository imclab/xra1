// js/intent/local.js — zero-LLM keyword intent classifier.
//
// Loads data/archetypes.json once. For each transcript fragment:
//   • lowercase + word-split
//   • find FIRST noun match against archetype.match[] arrays
//   • detect scale word, count word, color, motion verb
//   • return { archetype, mods, confidence, matched_word }
//
// Confidence:
//   1.0 — noun match + any modifier match
//   0.7 — noun match alone
//   0.4 — modifier match but no noun → likely follow-up clause
//   0   — nothing recognized (caller falls through to cloud LLM)

let _data = null;
let _loading = null;

export async function loadArchetypes(url = './data/archetypes.json') {
  if (_data) return _data;
  if (_loading) return _loading;
  _loading = fetch(url, { cache: 'force-cache' })
    .then(r => r.json())
    .then(j => { _data = j; _loading = null; return j; })
    .catch(e => { _loading = null; throw e; });
  return _loading;
}

function tokenize(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
}

function findArchetype(tokens, archetypes) {
  for (const t of tokens) {
    for (const a of archetypes) {
      if (a.match.includes(t)) return { archetype: a, matched_word: t };
    }
  }
  return null;
}

function findMods(tokens, modifiers) {
  const mods = {};
  for (const t of tokens) {
    if (modifiers.scale && t in modifiers.scale) mods.scale_mul = modifiers.scale[t];
    if (modifiers.count_words && t in modifiers.count_words) mods.count = modifiers.count_words[t];
    if (modifiers.colors && t in modifiers.colors) mods.color = modifiers.colors[t];
    if (modifiers.motion_verbs && t in modifiers.motion_verbs) mods.motion = modifiers.motion_verbs[t];
    if (/^\d+$/.test(t)) {
      const n = parseInt(t, 10);
      if (n > 0 && n < 500) mods.count = n;
    }
  }
  return mods;
}

export async function classify(transcript) {
  const data = await loadArchetypes();
  const tokens = tokenize(transcript);
  if (!tokens.length) return { archetype: null, mods: {}, confidence: 0, matched_word: null };

  const hit = findArchetype(tokens, data.archetypes);
  const mods = findMods(tokens, data.modifiers || {});
  const hasMods = Object.keys(mods).length > 0;

  if (hit) return { archetype: hit.archetype, mods, confidence: hasMods ? 1.0 : 0.7, matched_word: hit.matched_word };
  if (hasMods) return { archetype: null, mods, confidence: 0.4, matched_word: null };
  return { archetype: null, mods: {}, confidence: 0, matched_word: null };
}

// Synchronous variant once loaded — for use inside hot speculative paths.
export function classifySync(transcript) {
  if (!_data) return { archetype: null, mods: {}, confidence: 0, matched_word: null, error: 'archetypes_not_loaded' };
  const tokens = tokenize(transcript);
  if (!tokens.length) return { archetype: null, mods: {}, confidence: 0, matched_word: null };
  const hit = findArchetype(tokens, _data.archetypes);
  const mods = findMods(tokens, _data.modifiers || {});
  const hasMods = Object.keys(mods).length > 0;
  if (hit) return { archetype: hit.archetype, mods, confidence: hasMods ? 1.0 : 0.7, matched_word: hit.matched_word };
  if (hasMods) return { archetype: null, mods, confidence: 0.4, matched_word: null };
  return { archetype: null, mods: {}, confidence: 0, matched_word: null };
}

export function getFallback() {
  return _data?.fallback || { primitive: 'sphere', scale: [0.5, 0.5, 0.5], color: '#aaaaff', vfx: 'glow', motion: 'hover' };
}

if (typeof window !== 'undefined') {
  window.__intent = { loadArchetypes, classify, classifySync, getFallback };
}
