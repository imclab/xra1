// js/intent/meta.js — scene-level verb classifier (save / load / share / remix).
//
// Sibling to `local.js` which handles spawn intents. This module recognizes
// scene meta-actions in transcripts and returns a structured dispatch record
// so callers (voice pipeline, text input, mobile bridge) can invoke
// `scene/io.js` (or RN bridge equivalent) without re-parsing.
//
// Pure + sync — no IndexedDB / no LLM. Caller does the I/O.
//
// Grammar examples (case/punctuation-insensitive):
//   "save"                          → { action: 'save' }
//   "save scene"                    → { action: 'save' }
//   "save as my galaxy"             → { action: 'save', title: 'my galaxy' }
//   "save as 'sunset day 3'"        → { action: 'save', title: 'sunset day 3' }
//   "load my galaxy"                → { action: 'load', query: 'my galaxy' }
//   "open scene called sunset"      → { action: 'load', query: 'sunset' }
//   "list scenes" / "my scenes"     → { action: 'list' }
//   "share this"                    → { action: 'share' }
//   "share scene"                   → { action: 'share' }
//   "remix"                         → { action: 'remix' }
//   "remix as funky galaxy"         → { action: 'remix', title: 'funky galaxy' }
//   "delete sunset"                 → { action: 'delete', query: 'sunset' }
//   "download" / "export"           → { action: 'download' }
//
// Anything outside this verb set returns null so the spawn classifier (or LLM
// ladder) gets first crack on the next pass.
//
// Confidence:
//   1.0 — verb + complete args extracted (e.g. "save as X")
//   0.9 — bare verb (e.g. "save", "share")
//   0.7 — verb + query but query is ambiguous (e.g. very short)
//   0    — no verb match

// Verb lexicon. Order matters — longer phrases first so "save as" beats "save".
const VERBS = [
  { action: 'save',     phrases: ['save as', 'save scene as', 'save it as'],          takesTitle: true  },
  { action: 'download', phrases: ['save to file'],                                     takesNothing: true },
  { action: 'save',     phrases: ['save scene', 'save it', 'save this', 'save'],      takesTitle: false },
  { action: 'load',     phrases: ['load scene called', 'open scene called',
                                  'load scene', 'open scene', 'load', 'open'],         takesQuery: true  },
  { action: 'list',     phrases: ['list scenes', 'show scenes', 'my scenes',
                                  'show my scenes', 'list my scenes', 'scenes'],       takesNothing: true },
  { action: 'share',    phrases: ['share this scene', 'share scene', 'share this',
                                  'share it', 'share'],                                takesNothing: true },
  { action: 'remix',    phrases: ['remix as', 'fork as', 'copy as', 'variant of'],     takesTitle: true  },
  { action: 'remix',    phrases: ['remix this', 'remix it', 'remix',
                                  'fork this', 'fork it', 'fork', 'make a copy'],      takesNothing: true },
  { action: 'delete',   phrases: ['delete scene', 'remove scene', 'delete', 'remove'], takesQuery: true  },
  { action: 'download', phrases: ['download scene', 'export scene',
                                  'download', 'export'],                                takesNothing: true },
];

function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[.,!?;:]+$/g, '')        // strip trailing punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

function stripQuotes(s) {
  const t = s.trim();
  if (t.length >= 2) {
    const a = t[0], b = t[t.length - 1];
    if ((a === '"' && b === '"') || (a === "'" && b === "'")) return t.slice(1, -1).trim();
  }
  return t;
}

/**
 * Classify a transcript. Returns null if no scene verb is present, or
 * { action, title?, query?, confidence, matched_phrase, raw }.
 */
export function classifyMeta(transcript) {
  const n = normalize(transcript);
  if (!n) return null;

  for (const v of VERBS) {
    for (const phrase of v.phrases) {
      // Match phrase as a whole word boundary at start, or after a leading
      // filler like "please" / "can you" — accept either.
      const re = new RegExp(`(?:^|^(?:please|can you|could you|hey|ok)\\s+)${phrase}(?:\\b|$)`, 'i');
      const m = n.match(re);
      if (!m) continue;

      const rest = n.slice(m[0].length).trim();
      const result = { action: v.action, matched_phrase: phrase, raw: transcript };

      if (v.takesTitle) {
        const title = stripQuotes(rest);
        if (title) { result.title = title; result.confidence = 1.0; return result; }
        // "save as" with no title → treat as bare save
        result.confidence = 0.9;
        return result;
      }
      if (v.takesQuery) {
        const query = stripQuotes(rest);
        if (query) {
          result.query = query;
          result.confidence = query.length >= 3 ? 1.0 : 0.7;
          return result;
        }
        // "load" with no query → bare verb — caller can prompt for which
        result.confidence = 0.9;
        return result;
      }
      // takesNothing
      result.confidence = 0.9;
      return result;
    }
  }
  return null;
}

/**
 * Convenience: dispatch a classified result against a `scene/io.js` module
 * (or any object with the same shape). `activeDoc` is the current XRAI doc.
 * Returns a promise resolving to whatever the io function returns; the caller
 * still owns the active-doc swap on load/remix.
 *
 *   const meta = classifyMeta(text);
 *   if (meta) { const res = await dispatchMeta(meta, sceneIO, activeDoc); ... }
 */
export async function dispatchMeta(meta, sceneIO, activeDoc) {
  if (!meta || !sceneIO) return { ok: false, error: 'bad_args' };
  switch (meta.action) {
    case 'save':
      if (!activeDoc) return { ok: false, error: 'no_active_doc' };
      return { ok: true, result: await sceneIO.saveScene(activeDoc, { title: meta.title }) };
    case 'load': {
      if (!sceneIO.listScenes || !sceneIO.loadScene) return { ok: false, error: 'io_incomplete' };
      const all = await sceneIO.listScenes({ limit: 200 });
      if (!meta.query) return { ok: true, result: { needs: 'pick', candidates: all } };
      const q = meta.query.toLowerCase();
      const match = all.find(s => (s.title || '').toLowerCase() === q)
                 || all.find(s => (s.title || '').toLowerCase().includes(q));
      if (!match) return { ok: false, error: 'not_found', query: meta.query };
      const doc = await sceneIO.loadScene(match.id);
      return { ok: true, result: { doc, scene: match } };
    }
    case 'list':
      return { ok: true, result: await sceneIO.listScenes({ limit: 50 }) };
    case 'share':
      if (!activeDoc) return { ok: false, error: 'no_active_doc' };
      return { ok: true, result: { url: sceneIO.shareURL(activeDoc) } };
    case 'remix':
      if (!activeDoc) return { ok: false, error: 'no_active_doc' };
      return { ok: true, result: sceneIO.remix(activeDoc, { title: meta.title }) };
    case 'delete': {
      if (!meta.query) return { ok: false, error: 'no_query' };
      const all = await sceneIO.listScenes({ limit: 200 });
      const q = meta.query.toLowerCase();
      const match = all.find(s => (s.title || '').toLowerCase() === q)
                 || all.find(s => (s.title || '').toLowerCase().includes(q));
      if (!match) return { ok: false, error: 'not_found', query: meta.query };
      await sceneIO.deleteScene(match.id);
      return { ok: true, result: { deleted: match } };
    }
    case 'download':
      if (!activeDoc) return { ok: false, error: 'no_active_doc' };
      return { ok: true, result: { filename: sceneIO.toDownload(activeDoc) } };
  }
  return { ok: false, error: 'unknown_action' };
}

if (typeof window !== 'undefined') {
  window.__intentMeta = { classifyMeta, dispatchMeta };
}
