// js/procgen/particle.js — particle system entity (web VFX Graph equivalent).
//
// Output: `object.particles` entity carrying:
//   • emitter shape (point/sphere/box/disc/line)
//   • lifetime, count, gravity, color gradient, size curve, blend mode
//   • motion primitive (drift/orbit/swirl/explode/rain)
//
// Renderer maps this to:
//   • Web → three.js Points (BufferGeometry + ShaderMaterial)
//   • Unity → VFX Graph asset by name (params.vfxAsset) OR Particle System fallback
//
// We do NOT instantiate the system here — pure data.

import { registerAdapter, newScene, entity } from '../xrai-core.js';

const PRESETS = {
  fire: {
    emitter: 'disc', radius: 0.15, count: 200, lifetime: 1.4, rate: 140,
    motion: 'drift', velocity: [0, 1.4, 0], spread: 0.3, gravity: [0, -0.2, 0],
    sizeStart: 0.05, sizeEnd: 0.18, blend: 'additive',
    colors: [[1.0, 0.9, 0.3, 1], [1.0, 0.4, 0.05, 1], [0.4, 0.0, 0.0, 0]],
    vfxAsset: 'Fire_Hands_Variant',
  },
  sparkle: {
    emitter: 'sphere', radius: 0.4, count: 80, lifetime: 0.9, rate: 50,
    motion: 'drift', velocity: [0, 0.2, 0], spread: 1.0, gravity: [0, -0.05, 0],
    sizeStart: 0.04, sizeEnd: 0.01, blend: 'additive',
    colors: [[1, 1, 1, 1], [1, 0.9, 0.6, 1], [1, 0.7, 0.3, 0]],
    vfxAsset: 'Sparkle_Default',
  },
  smoke: {
    emitter: 'disc', radius: 0.3, count: 120, lifetime: 3.5, rate: 30,
    motion: 'drift', velocity: [0, 0.5, 0], spread: 0.4, gravity: [0, 0.1, 0],
    sizeStart: 0.1, sizeEnd: 0.6, blend: 'normal',
    colors: [[0.5, 0.5, 0.5, 0.6], [0.3, 0.3, 0.3, 0.3], [0.2, 0.2, 0.2, 0]],
    vfxAsset: 'Smoke_Soft',
  },
  snow: {
    emitter: 'box', size: [6, 0.1, 6], count: 400, lifetime: 6.0, rate: 70,
    motion: 'drift', velocity: [0, -0.5, 0], spread: 0.1, gravity: [0, -0.1, 0],
    sizeStart: 0.04, sizeEnd: 0.04, blend: 'normal',
    colors: [[1, 1, 1, 0.9], [1, 1, 1, 0.7], [1, 1, 1, 0]],
    vfxAsset: 'Snow_Field',
  },
  rain: {
    emitter: 'box', size: [6, 0.1, 6], count: 800, lifetime: 1.0, rate: 800,
    motion: 'drift', velocity: [0, -8, 0], spread: 0.02, gravity: [0, -1, 0],
    sizeStart: 0.02, sizeEnd: 0.02, blend: 'normal',
    colors: [[0.6, 0.7, 1.0, 0.6], [0.5, 0.6, 0.9, 0.4], [0.4, 0.5, 0.8, 0]],
    vfxAsset: 'Rain_Streaks',
  },
  stars: {
    emitter: 'sphere', radius: 8, count: 600, lifetime: 999, rate: 0,
    motion: 'static', velocity: [0, 0, 0], spread: 0, gravity: [0, 0, 0],
    sizeStart: 0.03, sizeEnd: 0.03, blend: 'additive',
    colors: [[1, 1, 1, 1], [0.8, 0.9, 1, 0.8], [1, 0.9, 0.7, 1]],
    vfxAsset: 'Stars_Field',
  },
  magic: {
    emitter: 'sphere', radius: 0.3, count: 150, lifetime: 1.6, rate: 90,
    motion: 'orbit', velocity: [0, 0.4, 0], spread: 0.6, gravity: [0, 0, 0],
    sizeStart: 0.06, sizeEnd: 0.02, blend: 'additive',
    colors: [[0.6, 0.3, 1.0, 1], [1.0, 0.4, 0.8, 1], [0.3, 0.6, 1.0, 0]],
    vfxAsset: 'Magic_Aura',
  },
  electric: {
    emitter: 'line', length: 1.0, count: 120, lifetime: 0.4, rate: 300,
    motion: 'swirl', velocity: [0, 0, 0], spread: 0.15, gravity: [0, 0, 0],
    sizeStart: 0.06, sizeEnd: 0.0, blend: 'additive',
    colors: [[0.6, 0.9, 1.0, 1], [0.3, 0.6, 1.0, 1], [1.0, 1.0, 1.0, 0]],
    vfxAsset: 'Lightning_Arc',
  },
  dust: {
    emitter: 'sphere', radius: 0.6, count: 60, lifetime: 4.0, rate: 15,
    motion: 'drift', velocity: [0.1, 0.05, 0], spread: 0.2, gravity: [0, 0.02, 0],
    sizeStart: 0.03, sizeEnd: 0.05, blend: 'additive',
    colors: [[0.9, 0.8, 0.6, 0.5], [0.8, 0.7, 0.5, 0.3], [0.7, 0.6, 0.4, 0]],
    vfxAsset: 'Dust_Motes',
  },
};

function pickPreset(prompt) {
  const p = String(prompt || '').toLowerCase();
  for (const name of Object.keys(PRESETS)) if (p.includes(name)) return name;
  if (/flame|burn|inferno/.test(p)) return 'fire';
  if (/glitter|twinkle|shimmer/.test(p)) return 'sparkle';
  if (/fog|mist|cloud/.test(p)) return 'smoke';
  if (/lightning|bolt|spark.*electric|thunder/.test(p)) return 'electric';
  if (/aura|spell|enchant/.test(p)) return 'magic';
  if (/galaxy|starfield|cosmos|nebula/.test(p)) return 'stars';
  if (/storm|drizzle|downpour/.test(p)) return 'rain';
  if (/blizzard|flurry/.test(p)) return 'snow';
  if (/dust|pollen|mote/.test(p)) return 'dust';
  return 'sparkle';
}

registerAdapter('procgen.particle', async (input, opts = {}) => {
  const prompt = typeof input === 'string' ? input : (input?.prompt || '');
  const seed = (opts.seed ?? input?.seed ?? Date.now()) | 0;
  const overrides = opts.preset || input?.preset;
  const presetName = overrides && PRESETS[overrides] ? overrides : pickPreset(prompt);
  const base = PRESETS[presetName];

  const doc = newScene({ origin: 'procgen.particle' });
  doc.origin.scene = 'procgen';
  doc.metadata = { source: 'procgen', modality: 'particle', prompt, seed, preset: presetName, _procgen: 'particle' };

  // User param overrides ride on top of the preset.
  const merged = { ...base, ...(typeof input === 'object' ? input.params || {} : {}), ...(opts.params || {}) };

  doc.scene.entities.push(entity(`particle_${seed.toString(36)}`, 'object.particles', {
    label: prompt || `particles:${presetName}`,
    glyph: '✦',
    transform: { position: [0, 0.8, -2], rotation: [0, 0, 0], scale: [1, 1, 1] },
    params: {
      _procgen: 'particle',
      preset: presetName,
      seed,
      ...merged,
    },
  }));
  return doc;
});

if (typeof window !== 'undefined') {
  window.__procgenParticle = { PRESETS, pickPreset };
}
