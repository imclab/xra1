// js/procgen/mix.js — composite scene blending all 4 modalities.
//
// Strategy: parse prompt into roles, dispatch each role to its modality, merge.
//   • terrain   → voxel
//   • sky/fx    → shader (skybox-like backdrop)
//   • weather   → particle
//   • props     → icosa
//
// User can pin roles via opts.roles = { terrain: 'voxel', sky: 'shader', ... }
// or replace any role with 'none' to skip.

import { registerAdapter, newScene, entity, relation } from '../xrai-core.js';

const DEFAULT_ROLES = { terrain: 'voxel', sky: 'shader', weather: 'particle', props: 'icosa' };

// Tease prompt into role-specific sub-prompts so each adapter sees the right hint.
function extractRolePrompts(prompt) {
  const p = String(prompt || '').toLowerCase();
  const roles = {};
  // Terrain
  if (/(forest|desert|mountain|cave|island|ocean|tundra|jungle|swamp)/.test(p)) {
    const m = p.match(/(forest|desert|mountain|cave|island|ocean|tundra|jungle|swamp)/);
    roles.terrain = m ? m[1] + ' terrain' : prompt;
  }
  // Sky / atmospheric
  if (/(sunset|sunrise|night|stormy|aurora|nebula|alien sky|sky)/.test(p)) {
    const m = p.match(/(sunset|sunrise|night|stormy|aurora|nebula|alien sky)/);
    roles.sky = m ? m[1] + ' sky' : 'sky';
  }
  // Weather
  if (/(rain|snow|sandstorm|sparkle|fire|fog|magic|dust|stars)/.test(p)) {
    const m = p.match(/(rain|snow|sandstorm|sparkle|fire|fog|magic|dust|stars)/);
    roles.weather = m ? m[1] : prompt;
  }
  // Props — fall back to nouns extracted by intent classifier
  if (/(tree|rock|crystal|dragon|cactus|house|robot|sword|chair|cat|dog|tower)/.test(p)) {
    const m = p.match(/(tree|rock|crystal|dragon|cactus|house|robot|sword|chair|cat|dog|tower)/);
    roles.props = m ? m[1] : null;
  }
  return roles;
}

async function runRole(role, modality, prompt, seed) {
  if (!prompt || modality === 'none') return null;
  const { encode } = await import('../xrai-core.js');
  try {
    if (modality === 'icosa') return await encode('icosa', prompt, { pageSize: 4 });
    return await encode(`procgen.${modality}`, { prompt, seed });
  } catch (e) {
    if (typeof console !== 'undefined') console.warn(`[procgen.mix] role=${role} modality=${modality} failed:`, e);
    return null;
  }
}

registerAdapter('procgen.mix', async (input, opts = {}) => {
  const prompt = typeof input === 'string' ? input : (input?.prompt || '');
  const seed = (opts.seed ?? input?.seed ?? Date.now()) | 0;
  const roleMap = { ...DEFAULT_ROLES, ...(opts.roles || input?.roles || {}) };

  const rolePrompts = extractRolePrompts(prompt);
  // Roles the prompt did NOT mention → still try default with the full prompt,
  // but skip props if no noun matched (icosa returns nothing useful).
  if (!rolePrompts.terrain) rolePrompts.terrain = prompt;
  if (!rolePrompts.sky) rolePrompts.sky = 'sky';
  if (!rolePrompts.weather) rolePrompts.weather = null;
  // rolePrompts.props left null when no noun

  const doc = newScene({ origin: 'procgen.mix' });
  doc.origin.scene = 'procgen-mix';
  doc.metadata = { source: 'procgen.mix', modality: 'mix', prompt, seed, _procgen: 'mix', roleMap, rolePrompts };

  const subDocs = await Promise.all([
    runRole('terrain', roleMap.terrain, rolePrompts.terrain, seed ^ 0x11),
    runRole('sky',     roleMap.sky,     rolePrompts.sky,     seed ^ 0x22),
    runRole('weather', roleMap.weather, rolePrompts.weather, seed ^ 0x33),
    runRole('props',   roleMap.props,   rolePrompts.props,   seed ^ 0x44),
  ]);

  const root = entity(`mix_${seed.toString(36)}`, 'object.group', {
    label: prompt || 'procgen-mix', glyph: '◆', group: 'procgen-mix',
    params: { _procgen: 'mix', prompt, seed },
  });
  doc.scene.entities.push(root);

  const rolesOrder = ['terrain', 'sky', 'weather', 'props'];
  subDocs.forEach((sub, i) => {
    if (!sub) return;
    const role = rolesOrder[i];
    for (const ent of sub.scene.entities) {
      ent.params = ent.params || {};
      ent.params._role = role;
      // Position roles so they don't all stack at origin.
      const tx = ent.transform || { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] };
      if (role === 'sky') tx.position = [0, 3, -5];
      else if (role === 'terrain') tx.position = [0, -0.5, -2];
      else if (role === 'weather') tx.position = [0, 1.5, -2];
      else if (role === 'props') {
        // scatter props
        const idx = doc.scene.entities.filter(e => e.params?._role === 'props').length;
        tx.position = [(idx % 3 - 1) * 1.5, 0, -2 - Math.floor(idx / 3) * 0.5];
      }
      ent.transform = tx;
      doc.scene.entities.push(ent);
      doc.scene.relations.push(relation(root.id, ent.id, 'contains'));
    }
    // Carry sub-doc metadata so renderer knows which modality produced what.
    doc.metadata[role] = sub.metadata || null;
  });

  return doc;
});

if (typeof window !== 'undefined') {
  window.__procgenMix = { extractRolePrompts, DEFAULT_ROLES };
}
