// js/procgen/shader.js — Shadertoy-like shader entity (WGSL + GLSL).
//
// Output: an entity of type `object.shader` carrying:
//   • fragment source (WGSL native; GLSL provided when caller wants Shadertoy parity)
//   • uniforms schema (time/resolution/mouse/seed + user-declared)
//   • Unity-target HLSL HINT via Spec 012 v2 macro wrapper (build-time conversion)
//
// We do NOT compile the shader here. Renderer (three.js / WebGPU canvas / Unity)
// picks the right backend. The shader source travels in the XRAI doc, so save/
// share/remix work for free.
//
// Two prompt paths:
//   • opts.code provided → wrap & emit as-is
//   • prompt only        → emit a curated WGSL template tagged by archetype
//     (sky/portal/fluid/fractal/aurora). Caller can upgrade via Claude/Gemini.
//
// Spec 012 alignment:
//   • Web preview = WGSL (WebGPU) → GLSL fallback (WebGL2)
//   • iOS Unity = HLSL ported via v2 macro at build time
//   • iOS runtime JIT shader compile prohibited — pre-compile via converter

import { registerAdapter, newScene, entity } from '../xrai-core.js';

const TEMPLATES = {
  sky: {
    description: 'Animated gradient sky with sun + stars',
    wgsl: `
@group(0) @binding(0) var<uniform> u_time: f32;
@group(0) @binding(1) var<uniform> u_res: vec2<f32>;
@fragment
fn fs(@builtin(position) p: vec4<f32>) -> @location(0) vec4<f32> {
  let uv = p.xy / u_res;
  let horizon = smoothstep(0.45, 0.55, uv.y);
  let sky = mix(vec3<f32>(0.9, 0.6, 0.3), vec3<f32>(0.1, 0.3, 0.6), horizon);
  let sunPos = vec2<f32>(0.7, 0.45 + sin(u_time*0.1)*0.05);
  let d = distance(uv, sunPos);
  let sun = smoothstep(0.06, 0.03, d) * vec3<f32>(1.0, 0.9, 0.6);
  return vec4<f32>(sky + sun, 1.0);
}`,
    glsl: `
uniform float iTime; uniform vec2 iResolution;
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  float horizon = smoothstep(0.45, 0.55, uv.y);
  vec3 sky = mix(vec3(0.9,0.6,0.3), vec3(0.1,0.3,0.6), horizon);
  vec2 sunPos = vec2(0.7, 0.45 + sin(iTime*0.1)*0.05);
  float d = distance(uv, sunPos);
  vec3 sun = smoothstep(0.06, 0.03, d) * vec3(1.0,0.9,0.6);
  fragColor = vec4(sky+sun, 1.0);
}`,
  },
  portal: {
    description: 'Swirling portal with chromatic ring',
    wgsl: `
@group(0) @binding(0) var<uniform> u_time: f32;
@group(0) @binding(1) var<uniform> u_res: vec2<f32>;
@fragment
fn fs(@builtin(position) p: vec4<f32>) -> @location(0) vec4<f32> {
  let uv = (p.xy - 0.5*u_res) / min(u_res.x, u_res.y);
  let r = length(uv);
  let a = atan2(uv.y, uv.x) + u_time*0.4;
  let swirl = sin(a*6.0 + r*20.0 - u_time*2.0)*0.5 + 0.5;
  let ring = smoothstep(0.42, 0.4, r) * smoothstep(0.3, 0.32, r);
  let col = vec3<f32>(swirl*0.6, swirl*0.3 + 0.4, 1.0 - r);
  return vec4<f32>(col * (0.3 + ring*2.0), 1.0);
}`,
    glsl: `
uniform float iTime; uniform vec2 iResolution;
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (fragCoord - 0.5*iResolution.xy) / min(iResolution.x, iResolution.y);
  float r = length(uv);
  float a = atan(uv.y, uv.x) + iTime*0.4;
  float swirl = sin(a*6.0 + r*20.0 - iTime*2.0)*0.5+0.5;
  float ring = smoothstep(0.42,0.4,r) * smoothstep(0.3,0.32,r);
  vec3 col = vec3(swirl*0.6, swirl*0.3+0.4, 1.0-r);
  fragColor = vec4(col * (0.3 + ring*2.0), 1.0);
}`,
  },
  fluid: {
    description: '2D fluid-ish curl-noise flow',
    wgsl: `
@group(0) @binding(0) var<uniform> u_time: f32;
@group(0) @binding(1) var<uniform> u_res: vec2<f32>;
fn hash(p: vec2<f32>) -> f32 { return fract(sin(dot(p, vec2<f32>(127.1, 311.7))) * 43758.5453); }
@fragment
fn fs(@builtin(position) p: vec4<f32>) -> @location(0) vec4<f32> {
  let uv = p.xy / u_res;
  let q = uv * 6.0 + vec2<f32>(u_time*0.3, u_time*0.2);
  let n = hash(floor(q)) * 0.7 + hash(floor(q*2.0)) * 0.3;
  let col = vec3<f32>(0.1+n*0.4, 0.3+n*0.6, 0.8);
  return vec4<f32>(col, 1.0);
}`,
    glsl: `
uniform float iTime; uniform vec2 iResolution;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  vec2 q = uv*6.0 + vec2(iTime*0.3, iTime*0.2);
  float n = hash(floor(q))*0.7 + hash(floor(q*2.0))*0.3;
  vec3 col = vec3(0.1+n*0.4, 0.3+n*0.6, 0.8);
  fragColor = vec4(col, 1.0);
}`,
  },
  fractal: {
    description: 'Mandelbrot-style iterative escape',
    wgsl: `
@group(0) @binding(0) var<uniform> u_time: f32;
@group(0) @binding(1) var<uniform> u_res: vec2<f32>;
@fragment
fn fs(@builtin(position) p: vec4<f32>) -> @location(0) vec4<f32> {
  let uv = (p.xy - 0.5*u_res) / min(u_res.x, u_res.y) * 3.0;
  let c = uv + vec2<f32>(-0.5, 0.0) + vec2<f32>(sin(u_time*0.1), cos(u_time*0.1))*0.1;
  var z = vec2<f32>(0.0);
  var i = 0u;
  loop {
    if (i >= 64u || dot(z,z) > 4.0) { break; }
    z = vec2<f32>(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
    i = i + 1u;
  }
  let v = f32(i) / 64.0;
  return vec4<f32>(v, v*v, sqrt(v), 1.0);
}`,
    glsl: `
uniform float iTime; uniform vec2 iResolution;
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (fragCoord - 0.5*iResolution.xy) / min(iResolution.x, iResolution.y) * 3.0;
  vec2 c = uv + vec2(-0.5, 0.0) + vec2(sin(iTime*0.1), cos(iTime*0.1))*0.1;
  vec2 z = vec2(0.0); int i = 0;
  for (; i < 64; i++) { if (dot(z,z) > 4.0) break; z = vec2(z.x*z.x-z.y*z.y, 2.0*z.x*z.y) + c; }
  float v = float(i)/64.0;
  fragColor = vec4(v, v*v, sqrt(v), 1.0);
}`,
  },
  aurora: {
    description: 'Aurora-borealis wave bands',
    wgsl: `
@group(0) @binding(0) var<uniform> u_time: f32;
@group(0) @binding(1) var<uniform> u_res: vec2<f32>;
@fragment
fn fs(@builtin(position) p: vec4<f32>) -> @location(0) vec4<f32> {
  let uv = p.xy / u_res;
  let y = uv.y - 0.4 + sin(uv.x*8.0 + u_time)*0.15 + sin(uv.x*3.0 + u_time*0.6)*0.05;
  let band = exp(-abs(y)*8.0);
  let col = vec3<f32>(0.1, 0.9, 0.5) * band + vec3<f32>(0.4, 0.2, 0.9) * band * sin(u_time + uv.x*2.0);
  return vec4<f32>(col, 1.0);
}`,
    glsl: `
uniform float iTime; uniform vec2 iResolution;
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  float y = uv.y - 0.4 + sin(uv.x*8.0 + iTime)*0.15 + sin(uv.x*3.0 + iTime*0.6)*0.05;
  float band = exp(-abs(y)*8.0);
  vec3 col = vec3(0.1,0.9,0.5)*band + vec3(0.4,0.2,0.9)*band*sin(iTime + uv.x*2.0);
  fragColor = vec4(col, 1.0);
}`,
  },
};

function pickTemplate(prompt) {
  const p = String(prompt || '').toLowerCase();
  if (/portal|warp|wormhole|swirl/.test(p)) return 'portal';
  if (/fluid|flow|smoke|curl|liquid/.test(p)) return 'fluid';
  if (/fractal|mandel|escape|kaleido/.test(p)) return 'fractal';
  if (/aurora|borealis|northern.lights|ribbons/.test(p)) return 'aurora';
  return 'sky';
}

// Spec 012 v2-macro hint — what the build-time converter should produce for Unity.
function unityHintForGlsl(glsl) {
  return {
    target: 'unity-hlsl',
    converter: 'v2-macro',
    spec: 'shadertoy-converter (upstream Portals spec 012)',
    note: 'Build-time only: pass GLSL through CodeGenerator.cs (v2) → HLSL .shader. iOS runtime JIT prohibited.',
    glslSource: glsl,
  };
}

registerAdapter('procgen.shader', async (input, opts = {}) => {
  const prompt = typeof input === 'string' ? input : (input?.prompt || '');
  const userCode = opts.code || input?.code;
  const userLang = (opts.lang || input?.lang || 'wgsl').toLowerCase();
  const seed = (opts.seed ?? input?.seed ?? Date.now()) | 0;

  const doc = newScene({ origin: 'procgen.shader' });
  doc.origin.scene = 'procgen';
  doc.metadata = { source: 'procgen', modality: 'shader', prompt, seed, _procgen: 'shader' };

  let wgsl, glsl, tplName = null, description;
  if (userCode) {
    if (userLang === 'glsl') { glsl = userCode; wgsl = null; }
    else { wgsl = userCode; glsl = null; }
    description = 'user-supplied shader';
  } else {
    tplName = pickTemplate(prompt);
    const tpl = TEMPLATES[tplName];
    wgsl = tpl.wgsl.trim();
    glsl = tpl.glsl.trim();
    description = tpl.description;
  }

  doc.scene.entities.push(entity(`shader_${seed.toString(36)}`, 'object.shader', {
    label: prompt || `shader:${tplName || 'custom'}`,
    glyph: '◈',
    transform: { position: [0, 1, -3], rotation: [0, 0, 0], scale: [2, 2, 1] },
    params: {
      _procgen: 'shader',
      template: tplName,
      description,
      wgsl,
      glsl,
      uniforms: ['u_time:f32', 'u_res:vec2<f32>'],
      seed,
      unityHint: glsl ? unityHintForGlsl(glsl) : null,
    },
  }));
  return doc;
});

if (typeof window !== 'undefined') {
  window.__procgenShader = { TEMPLATES, pickTemplate };
}
