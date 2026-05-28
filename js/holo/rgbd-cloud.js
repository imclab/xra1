// rgbd-cloud.js
// ─────────────────────────────────────────────────────────────────────────────
// JS port of web/rgbd-viewer/src/RGBDPointCloud.ts. Builds a THREE.Points
// instance whose vertex shader decodes hue-encoded depth + samples color
// to reconstruct 3D positions from incoming RGBD video frames.
//
// Usage (per remote peer):
//   const cloud = new RGBDPointCloud(THREE, { width: 256, height: 192 });
//   scene.add(cloud.points);
//   cloud.updateDepth(depthRGBA, 256, 192);
//   cloud.updateColor(colorRGBA, 256, 192);
//   cloud.setRayParams([offsetX, offsetY, tanHalfFovX, tanHalfFovY]);
// ─────────────────────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  uniform sampler2D depthMap;
  uniform sampler2D colorMap;
  uniform vec4 rayParams;
  uniform vec2 depthRange;
  uniform float pointSize;
  uniform float mirrorX;

  varying vec3 vColor;
  varying float vAlpha;

  float rgb2hue(vec3 c) {
    float mx = max(max(c.r, c.g), c.b);
    float mn = min(min(c.r, c.g), c.b);
    float delta = mx - mn;
    if (delta < 0.001) return 0.0;
    float h;
    if (mx == c.r) h = mod((c.g - c.b) / delta, 6.0);
    else if (mx == c.g) h = (c.b - c.r) / delta + 2.0;
    else h = (c.r - c.g) / delta + 4.0;
    h /= 6.0;
    if (h < 0.0) h += 1.0;
    return h;
  }

  float decodeDepth(vec3 rgb, vec2 range) {
    float d = rgb2hue(rgb);
    d = (d - 0.01) / (1.0 - 0.02);
    d = (d - 0.01) / (1.0 - 0.02);
    return d * (range.y - range.x) + range.x;
  }

  void main() {
    float u = position.x;
    float v = 1.0 - position.y;
    if (mirrorX > 0.5) u = 1.0 - u;
    vec2 uv = vec2(u, v);

    vec4 depthSample = texture2D(depthMap, uv);
    float depth = decodeDepth(depthSample.rgb, depthRange);
    vAlpha = (depthSample.a > 0.1 && depth > depthRange.x && depth < depthRange.y) ? 1.0 : 0.0;

    vec4 colorSample = texture2D(colorMap, uv);
    vColor = colorSample.rgb;

    float nx = (position.x - 0.5) * 2.0;
    float ny = (position.y - 0.5) * 2.0;
    if (mirrorX > 0.5) nx = -nx;
    vec3 ray = vec3(nx, ny, 1.0);
    ray.xy = (ray.xy + rayParams.xy) * rayParams.zw;
    vec3 worldPos = ray * depth;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
    gl_PointSize = pointSize / gl_Position.w;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    if (vAlpha < 0.5) discard;
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

export class RGBDPointCloud {
  constructor(THREE, options = {}) {
    this.THREE = THREE;
    const width = options.width ?? 256;
    const height = options.height ?? 192;
    const depthRange = options.depthRange ?? [0.3, 3.0];

    const positions = new Float32Array(width * height * 3);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 3;
        positions[i] = x / width;
        positions[i + 1] = y / height;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.depthTexture = new THREE.DataTexture(new Uint8Array(width * height * 4), width, height, THREE.RGBAFormat);
    this.colorTexture = new THREE.DataTexture(new Uint8Array(width * height * 4), width, height, THREE.RGBAFormat);

    this.material = new THREE.ShaderMaterial({
      vertexShader, fragmentShader,
      uniforms: {
        depthMap: { value: this.depthTexture },
        colorMap: { value: this.colorTexture },
        rayParams: { value: new THREE.Vector4(0, 0, 1.0, 0.75) },
        depthRange: { value: new THREE.Vector2(depthRange[0], depthRange[1]) },
        pointSize: { value: options.pointSize ?? 4.0 },
        mirrorX: { value: 0.0 },
      },
      transparent: false,
      depthWrite: true,
    });

    this.points = new THREE.Points(geometry, this.material);
    this.points.frustumCulled = false;
  }

  updateDepth(data, width, height) {
    if (this.depthTexture.image.width !== width || this.depthTexture.image.height !== height) {
      this.depthTexture.dispose();
      this.depthTexture = new this.THREE.DataTexture(data.slice(), width, height, this.THREE.RGBAFormat);
      this.material.uniforms.depthMap.value = this.depthTexture;
    } else {
      this.depthTexture.image.data.set(data);
    }
    this.depthTexture.needsUpdate = true;
  }

  updateColor(data, width, height) {
    if (this.colorTexture.image.width !== width || this.colorTexture.image.height !== height) {
      this.colorTexture.dispose();
      this.colorTexture = new this.THREE.DataTexture(data.slice(), width, height, this.THREE.RGBAFormat);
      this.material.uniforms.colorMap.value = this.colorTexture;
    } else {
      this.colorTexture.image.data.set(data);
    }
    this.colorTexture.needsUpdate = true;
  }

  setRayParams(p) { this.material.uniforms.rayParams.value.set(p[0], p[1], p[2], p[3]); }
  setDepthRange(near, far) { this.material.uniforms.depthRange.value.set(near, far); }
  setPointSize(s) { this.material.uniforms.pointSize.value = s; }
  setMirrorX(m) { this.material.uniforms.mirrorX.value = m ? 1.0 : 0.0; }

  dispose() {
    this.depthTexture.dispose();
    this.colorTexture.dispose();
    this.material.dispose();
    this.points.geometry.dispose();
  }
}
