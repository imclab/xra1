// js/procgen/index.js — 4-modal procedural generation router.
//
// Modalities:
//   • voxel    — WebGPU compute (3D scalar field → marching cubes mesh)
//   • shader   — Shadertoy-like WGSL/GLSL fragment, web→Unity via Spec 012 macro
//   • particle — three.js Points / VFX Graph equivalent on web
//   • icosa    — Icosa Gallery GLB (existing adapter at js/adapters/icosa.js)
//
// Output: XRAI doc with entities marked `params._procgen = <modality>`.
// Renderer side reads modality and dispatches to the right runtime.
//
// Dispatch strategies (passed as opts.strategy):
//   'auto'    — modality picked from archetype hint OR prompt heuristics
//   'mix'     — combine multiple modalities (terrain=voxel, sky=shader, fx=particle, props=icosa)
//   'voxel' | 'shader' | 'particle' | 'icosa' — force one modality
//
// All four are pure adapters: they take a prompt + opts and return XRAI doc.
// They register with xrai-core so pipelines-web.js node editor + Pipeline.run()
// pick them up automatically.

import { registerAdapter, newScene, entity, relation } from '../xrai-core.js';
import './voxel.js';
import './shader.js';
import './particle.js';
import './mix.js';
// icosa already registers itself when imported elsewhere; we just delegate via encode.

const HINTS = {
  voxel:    /terrain|landscape|world|island|cave|mountain|valley|dungeon|maze|voxel|block/i,
  shader:   /sky|nebula|fractal|sunset|aurora|portal|warp|kaleidoscope|shader|glow|fluid/i,
  particle: /fire|sparkle|smoke|dust|snow|rain|magic|aura|trail|swarm|particle|stars/i,
  icosa:    /\b(dragon|tree|cactus|sword|chair|car|house|robot|crystal|cat|dog)\b/i,
};

function pickModality(prompt) {
  for (const [mode, rx] of Object.entries(HINTS)) {
    if (rx.test(prompt)) return mode;
  }
  return 'shader'; // safe default — runs anywhere with WebGL2
}

function tagDoc(doc, modality) {
  for (const e of doc.scene.entities) {
    e.params = e.params || {};
    if (!e.params._procgen) e.params._procgen = modality;
  }
  doc.metadata = { ...(doc.metadata || {}), _procgen: modality };
  return doc;
}

export async function generate(prompt, { strategy = 'auto', seed, ...opts } = {}) {
  // delayed import so cycles don't trip
  const { encode } = await import('../xrai-core.js');
  const mode = strategy === 'auto' ? pickModality(prompt) : strategy;
  const input = { prompt, seed: seed ?? (Date.now() & 0xffffffff), ...opts };
  if (mode === 'mix') return encode('procgen.mix', input);
  if (mode === 'icosa') return tagDoc(await encode('icosa', prompt, opts), 'icosa');
  return tagDoc(await encode(`procgen.${mode}`, input), mode);
}

registerAdapter('procgen', async (input, opts = {}) => {
  const prompt = typeof input === 'string' ? input : (input?.prompt || '');
  return generate(prompt, { ...opts, ...(typeof input === 'object' ? input : {}) });
});

if (typeof window !== 'undefined') {
  window.__procgen = { generate, pickModality };
}
