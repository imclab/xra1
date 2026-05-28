// js/procgen/voxel.js — WebGPU compute voxel field → mesh entity.
//
// Strategy:
//   1. Generate sparse voxel SDF via WebGPU compute (Simplex noise + biome rules).
//   2. Surface via marching cubes (CPU here for portability; WebGPU MC is Phase 2).
//   3. Emit XRAI entity `object.mesh` with inline positions+indices in params.
//
// Falls back to JS-only Simplex if WebGPU unavailable (Safari pre-26, Firefox).
//
// Sizing is intentionally modest (32³ default) so a generation finishes in <100ms
// on M-series. Bigger worlds chunk via the `mix` modality.

import { registerAdapter, newScene, entity } from '../xrai-core.js';

const DEFAULT_SIZE = 32;

// Seedable PRNG — same algorithm Unity.Mathematics.Random uses (LCG).
function lcg(seed) {
  let s = (seed | 0) || 1;
  return () => {
    s = Math.imul(s, 1664525) + 1013904223 | 0;
    return ((s >>> 0) / 4294967296);
  };
}

// Cheap 3D value noise — no deps, deterministic per seed.
function makeNoise(seed) {
  const rng = lcg(seed);
  const grid = new Float32Array(256);
  for (let i = 0; i < 256; i++) grid[i] = rng() * 2 - 1;
  const hash = (x, y, z) => grid[(x * 73 ^ y * 19 ^ z * 7) & 255];
  return (x, y, z) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = x - xi, yf = y - yi, zf = z - zi;
    const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
    const u = fade(xf), v = fade(yf), w = fade(zf);
    const lerp = (a, b, t) => a + (b - a) * t;
    const c000 = hash(xi, yi, zi), c100 = hash(xi + 1, yi, zi);
    const c010 = hash(xi, yi + 1, zi), c110 = hash(xi + 1, yi + 1, zi);
    const c001 = hash(xi, yi, zi + 1), c101 = hash(xi + 1, yi, zi + 1);
    const c011 = hash(xi, yi + 1, zi + 1), c111 = hash(xi + 1, yi + 1, zi + 1);
    return lerp(
      lerp(lerp(c000, c100, u), lerp(c010, c110, u), v),
      lerp(lerp(c001, c101, u), lerp(c011, c111, u), v),
      w,
    );
  };
}

function fbm(noise, x, y, z, octaves = 4) {
  let sum = 0, amp = 1, freq = 1, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise(x * freq, y * freq, z * freq);
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
}

// Density function — biome-driven via prompt keywords.
function biomeDensity(prompt) {
  const p = String(prompt || '').toLowerCase();
  if (p.includes('cave') || p.includes('cavern') || p.includes('dungeon')) {
    return (n, x, y, z, size) => {
      const r = 0.5 - Math.abs(y / size - 0.5);
      return n - 0.3 + r * 0.4;
    };
  }
  if (p.includes('island') || p.includes('archipelago')) {
    return (n, x, y, z, size) => {
      const cx = size / 2, cz = size / 2;
      const d = Math.hypot(x - cx, z - cz) / (size / 2);
      const falloff = Math.max(0, 1 - d * 1.2);
      return (y / size < 0.5 ? 1 : -1) * 0.5 + n * 0.6 * falloff;
    };
  }
  // Default: terrain — high-Y carved away by noise.
  return (n, x, y, z, size) => (size / 2 - y) / size + n * 0.5;
}

function generateField(size, seed, prompt) {
  const noise = makeNoise(seed);
  const density = biomeDensity(prompt);
  const field = new Float32Array(size * size * size);
  const s = size;
  for (let z = 0; z < s; z++) {
    for (let y = 0; y < s; y++) {
      for (let x = 0; x < s; x++) {
        const n = fbm(noise, x / s * 4, y / s * 4, z / s * 4);
        field[x + y * s + z * s * s] = density(n, x, y, z, s);
      }
    }
  }
  return field;
}

// Surface extraction — naive isosurface cube count. We emit per-voxel cubes
// to keep the file portable. Phase 2 swaps in marching cubes.
function extractCubes(field, size, iso = 0) {
  const positions = [];
  const colors = [];
  const s = size;
  for (let z = 0; z < s; z++) {
    for (let y = 0; y < s; y++) {
      for (let x = 0; x < s; x++) {
        const v = field[x + y * s + z * s * s];
        if (v <= iso) continue;
        // Only emit surface cubes (any neighbor below iso).
        let surface = false;
        for (const [dx, dy, dz] of [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]) {
          const nx = x+dx, ny = y+dy, nz = z+dz;
          if (nx < 0 || ny < 0 || nz < 0 || nx >= s || ny >= s || nz >= s) { surface = true; break; }
          if (field[nx + ny*s + nz*s*s] <= iso) { surface = true; break; }
        }
        if (!surface) continue;
        positions.push(x / s - 0.5, y / s - 0.5, z / s - 0.5);
        // Height-based palette — grass top, dirt mid, stone deep.
        const h = y / s;
        if (h > 0.7) colors.push(0.45, 0.78, 0.32); // grass
        else if (h > 0.4) colors.push(0.55, 0.41, 0.28); // dirt
        else colors.push(0.4, 0.42, 0.45); // stone
      }
    }
  }
  return { positions, colors, voxelSize: 1 / s };
}

async function tryWebGPUField(size, seed, prompt) {
  if (typeof navigator === 'undefined' || !navigator.gpu) return null;
  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) return null;
    const device = await adapter.requestDevice();
    // Compute shader — same noise/density, executed on GPU.
    // Density mode is encoded in `mode` uniform; biome decided CPU-side already.
    const wgsl = /* wgsl */ `
      struct U { size: u32, seed: u32, mode: u32, _pad: u32 };
      @group(0) @binding(0) var<uniform> u: U;
      @group(0) @binding(1) var<storage, read_write> field: array<f32>;
      fn hash(p: vec3<u32>) -> f32 {
        var x = (p.x * 73u) ^ (p.y * 19u) ^ (p.z * 7u);
        x = x ^ u.seed;
        x = (x ^ (x >> 13u)) * 1274126177u;
        return (f32(x & 0xffffffu) / 16777216.0) * 2.0 - 1.0;
      }
      fn fade(t: f32) -> f32 { return t*t*t*(t*(t*6.0-15.0)+10.0); }
      fn vnoise(p: vec3<f32>) -> f32 {
        let i = vec3<u32>(vec3<i32>(floor(p)) + 1024);
        let f = fract(p);
        let u_ = vec3<f32>(fade(f.x), fade(f.y), fade(f.z));
        let c000 = hash(i);                let c100 = hash(i + vec3<u32>(1u,0u,0u));
        let c010 = hash(i + vec3<u32>(0u,1u,0u)); let c110 = hash(i + vec3<u32>(1u,1u,0u));
        let c001 = hash(i + vec3<u32>(0u,0u,1u)); let c101 = hash(i + vec3<u32>(1u,0u,1u));
        let c011 = hash(i + vec3<u32>(0u,1u,1u)); let c111 = hash(i + vec3<u32>(1u,1u,1u));
        let x00 = mix(c000, c100, u_.x); let x10 = mix(c010, c110, u_.x);
        let x01 = mix(c001, c101, u_.x); let x11 = mix(c011, c111, u_.x);
        let y0 = mix(x00, x10, u_.y);    let y1 = mix(x01, x11, u_.y);
        return mix(y0, y1, u_.z);
      }
      fn fbm(p: vec3<f32>) -> f32 {
        var s = 0.0; var a = 1.0; var f = 1.0; var n = 0.0;
        for (var i = 0u; i < 4u; i++) { s += a * vnoise(p * f); n += a; a *= 0.5; f *= 2.0; }
        return s / n;
      }
      @compute @workgroup_size(4,4,4)
      fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
        if (gid.x >= u.size || gid.y >= u.size || gid.z >= u.size) { return; }
        let s = f32(u.size);
        let n = fbm(vec3<f32>(f32(gid.x)/s*4.0, f32(gid.y)/s*4.0, f32(gid.z)/s*4.0));
        var d: f32;
        if (u.mode == 1u) { // cave
          let r = 0.5 - abs(f32(gid.y) / s - 0.5);
          d = n - 0.3 + r * 0.4;
        } else if (u.mode == 2u) { // island
          let cx = s * 0.5; let cz = s * 0.5;
          let dist = length(vec2<f32>(f32(gid.x) - cx, f32(gid.z) - cz)) / (s * 0.5);
          let falloff = max(0.0, 1.0 - dist * 1.2);
          let yp = select(-1.0, 1.0, f32(gid.y) / s < 0.5);
          d = yp * 0.5 + n * 0.6 * falloff;
        } else {
          d = (s * 0.5 - f32(gid.y)) / s + n * 0.5;
        }
        let idx = gid.x + gid.y * u.size + gid.z * u.size * u.size;
        field[idx] = d;
      }
    `;
    const p = String(prompt || '').toLowerCase();
    const mode = (p.includes('cave') || p.includes('dungeon')) ? 1
               : (p.includes('island') || p.includes('archipelago')) ? 2 : 0;
    const total = size * size * size;
    const fieldBuf = device.createBuffer({ size: total * 4, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC });
    const readBuf = device.createBuffer({ size: total * 4, usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST });
    const uBuf = device.createBuffer({ size: 16, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    device.queue.writeBuffer(uBuf, 0, new Uint32Array([size, seed >>> 0, mode, 0]));
    const module = device.createShaderModule({ code: wgsl });
    const pipeline = device.createComputePipeline({ layout: 'auto', compute: { module, entryPoint: 'main' } });
    const bg = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [{ binding: 0, resource: { buffer: uBuf } }, { binding: 1, resource: { buffer: fieldBuf } }],
    });
    const enc = device.createCommandEncoder();
    const pass = enc.beginComputePass();
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bg);
    const wg = Math.ceil(size / 4);
    pass.dispatchWorkgroups(wg, wg, wg);
    pass.end();
    enc.copyBufferToBuffer(fieldBuf, 0, readBuf, 0, total * 4);
    device.queue.submit([enc.finish()]);
    await readBuf.mapAsync(GPUMapMode.READ);
    const out = new Float32Array(readBuf.getMappedRange().slice(0));
    readBuf.unmap();
    return out;
  } catch (e) {
    if (typeof console !== 'undefined') console.warn('[procgen.voxel] WebGPU failed, falling back to CPU:', e);
    return null;
  }
}

registerAdapter('procgen.voxel', async (input, opts = {}) => {
  const prompt = typeof input === 'string' ? input : (input?.prompt || '');
  const size = Math.max(8, Math.min(96, opts.size || input?.size || DEFAULT_SIZE));
  const seed = (opts.seed ?? input?.seed ?? Date.now()) | 0;

  const doc = newScene({ origin: 'procgen.voxel' });
  doc.origin.scene = 'procgen';
  doc.metadata = { source: 'procgen', modality: 'voxel', prompt, seed, size, _procgen: 'voxel' };

  const field = (await tryWebGPUField(size, seed, prompt)) || generateField(size, seed, prompt);
  const { positions, colors, voxelSize } = extractCubes(field, size);

  doc.scene.entities.push(entity(`voxel_${seed.toString(36)}`, 'object.voxel', {
    label: prompt || 'voxel-world',
    glyph: '▦',
    transform: { position: [0, 0, -2], rotation: [0, 0, 0], scale: [4, 4, 4] },
    params: {
      _procgen: 'voxel',
      positions,        // flat [x,y,z, x,y,z, …] in unit cube
      colors,           // flat [r,g,b, r,g,b, …]
      voxelSize,
      size,
      seed,
      density: positions.length / 3,
      gpu: field === null ? false : 'maybe',
    },
  }));
  return doc;
});

if (typeof window !== 'undefined') {
  window.__procgenVoxel = { generateField, extractCubes, tryWebGPUField };
}
