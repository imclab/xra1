// hue-codec.js
// ─────────────────────────────────────────────────────────────────────────────
// JS port of web/rgbd-viewer/src/HueDepthCodec.ts. Mirrors Metavido
// DepthHueEncoder.compute / mtvd_EncodeDepth / mtvd_DecodeDepth byte-for-byte.
// Used by rgbd-cloud.js to decode hue-encoded depth video frames into Float32
// depth maps for shader-side reconstruction.
// ─────────────────────────────────────────────────────────────────────────────

const DEPTH_HUE_MARGIN = 0.01;
const DEPTH_HUE_PADDING = 0.01;

function hue2rgb(hue) {
  const h = hue * 6 - 2;
  const r = Math.min(1, Math.max(0, Math.abs(h - 1) - 1));
  const g = Math.min(1, Math.max(0, 2 - Math.abs(h)));
  const b = Math.min(1, Math.max(0, 2 - Math.abs(h - 2)));
  return [r, g, b];
}

function rgb2hue(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (delta < 1e-6) return 0;
  let h;
  if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h /= 6;
  if (h < 0) h += 1;
  return h;
}

export function encodeDepthToHue(depthMeters, range = [0.3, 3.0]) {
  const [minDepth, maxDepth] = range;
  let d = (depthMeters - minDepth) / (maxDepth - minDepth);
  d = d * (1 - DEPTH_HUE_PADDING * 2) + DEPTH_HUE_PADDING;
  d = Math.min(1, Math.max(0, d));
  d = d * (1 - DEPTH_HUE_MARGIN * 2) + DEPTH_HUE_MARGIN;
  const [r, g, b] = hue2rgb(d);
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function decodeHueToDepth(r, g, b, range = [0.3, 3.0]) {
  const [minDepth, maxDepth] = range;
  let d = rgb2hue(r / 255, g / 255, b / 255);
  d = (d - DEPTH_HUE_MARGIN) / (1 - DEPTH_HUE_MARGIN * 2);
  d = (d - DEPTH_HUE_PADDING) / (1 - DEPTH_HUE_PADDING * 2);
  return d * (maxDepth - minDepth) + minDepth;
}

export function encodeDepthMap(depths, width, height, range = [0.3, 3.0]) {
  const rgba = new Uint8Array(width * height * 4);
  for (let i = 0; i < depths.length; i++) {
    const d = depths[i];
    if (d <= range[0] || d >= range[1] || d <= 0) {
      rgba[i * 4 + 3] = 0;
    } else {
      const [r, g, b] = encodeDepthToHue(d, range);
      rgba[i * 4] = r; rgba[i * 4 + 1] = g; rgba[i * 4 + 2] = b; rgba[i * 4 + 3] = 255;
    }
  }
  return rgba;
}

export function decodeDepthMap(rgba, width, height, range = [0.3, 3.0]) {
  const depths = new Float32Array(width * height);
  for (let i = 0; i < depths.length; i++) {
    if (rgba[i * 4 + 3] === 0) { depths[i] = 0; continue; }
    depths[i] = decodeHueToDepth(rgba[i * 4], rgba[i * 4 + 1], rgba[i * 4 + 2], range);
  }
  return depths;
}
