// @xrai/threejs-adapter — legacy-shape → XRAI v1.0 mapper.
// Partial T1412 deliverable (spec 014). Pure functions, zero side effects.
//
// PURPOSE: jarvis-prototype.html emits a legacy semantic-object scene shape
//   {"scene":{"objects":[{"type":"tree","label":"palm","position":[1,0,-3]}]}}
// while the canonical XRAI v1.0 wire format (consumed by loadXRAI in index.js)
// expects:
//   {"xrai_version":"1.0","scene":{"entities":[{"id":..,"type":"object.primitive",..}]}}
//
// This file converts the legacy shape into XRAI v1.0 docs so the existing
// loadXRAI() can render them on Three.js. No changes to jarvis-prototype.html.
// No changes to loadXRAI. iOS round-trip becomes possible via XRAI as the
// lossless transit format.
//
// Reference canonical: examples/02-voice-prompt.xrai.json

// Semantic → XRAI primitive model_id (matches makePrimitive in index.js).
// 0=cube 1=sphere 2=cylinder 3=capsule 4=plane.
const SEMANTIC_TO_PRIMITIVE = {
  cube: 0, box: 0, block: 0,
  sphere: 1, ball: 1, orb: 1, planet: 1,
  cylinder: 2, pillar: 2, column: 2, tube: 2,
  capsule: 3, pill: 3,
  plane: 4, floor: 4, wall: 4, ground: 4,
};

function uuid4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function buildEntity(obj, idx) {
  const id = obj.id || `${obj.type || 'obj'}_${idx}`;
  const pos = obj.position || [0, 0, -1.5];
  const rot = obj.rotation || [0, 0, 0, 1];
  const scl = obj.scale || (typeof obj.size === 'number' ? [obj.size, obj.size, obj.size] : [0.25, 0.25, 0.25]);
  const transform = { position: pos, rotation: rot, scale: scl };

  // Icosa / external model → object.glb
  if (obj.src || obj.modelUrl || obj.icosaAssetId) {
    return {
      id,
      type: 'object.glb',
      model_url: obj.src || obj.modelUrl,
      transform,
      material: obj.material || (obj.color ? { color: obj.color } : undefined),
      metadata: {
        label: obj.label,
        source: obj.source || (obj.icosaAssetId ? 'icosa_cc0' : undefined),
        icosa_asset_id: obj.icosaAssetId,
      },
    };
  }

  // Semantic → primitive fallback
  const t = (obj.type || '').toLowerCase();
  if (SEMANTIC_TO_PRIMITIVE[t] !== undefined) {
    return {
      id,
      type: 'object.primitive',
      model_id: SEMANTIC_TO_PRIMITIVE[t],
      transform,
      material: obj.material || { color: obj.color || '#ffffff', preset: obj.preset || 'default' },
      metadata: obj.label ? { label: obj.label } : undefined,
    };
  }

  // Hologram passthrough
  if (t === 'hologram' || obj.hologramType || obj.hologramUri) {
    return {
      id,
      type: 'object.hologram',
      transform,
      material: obj.material || { color: obj.color || '#3a7afe' },
      components: [{ type: 'vfx.hologram', props: { uri: obj.hologramUri, intensity: obj.intensity ?? 0.5 } }],
      metadata: { label: obj.label, preset: obj.hologramPreset },
    };
  }

  // Unknown semantic type → preserved as primitive cube + label (Postel's law).
  // loadXRAI logs unknown entity types; here we keep the legacy hint as metadata.
  return {
    id,
    type: 'object.primitive',
    model_id: 0,
    transform,
    material: obj.material || { color: obj.color || '#ffffff' },
    metadata: { label: obj.label || obj.type, legacy_type: obj.type },
  };
}

/**
 * Convert legacy jarvis-prototype.html scene output → XRAI v1.0 doc.
 *
 * Input:
 *   { scene: { objects: [ { type, label, position, color?, src?, ... }, ... ] } }
 *
 * Output:
 *   XRAI v1.0 doc — directly consumable by loadXRAI(doc, THREE).
 *
 * @param {object} legacy - { scene: { objects: [...] } } from jarvis output
 * @param {object} [opts] - { author, origin, voicePrompt, sceneId }
 * @returns {object} XRAI v1.0 doc
 */
export function webSceneToXrai(legacy, opts = {}) {
  if (!legacy || !legacy.scene || !Array.isArray(legacy.scene.objects)) {
    throw new Error('webSceneToXrai: input missing { scene: { objects: [] } }');
  }
  const entities = legacy.scene.objects.map((o, i) => buildEntity(o, i));
  return {
    xrai_version: '1.0',
    id: opts.sceneId || uuid4(),
    created_at: new Date().toISOString(),
    author: opts.author || { type: 'llm', id: opts.llmName || 'unknown' },
    origin: opts.origin || { app: 'jarvis-prototype', version: '1.0', scene: 'web' },
    metadata: opts.voicePrompt ? { voice_prompt: opts.voicePrompt } : undefined,
    scene: {
      anchors: [],
      entities,
      relations: [],
      events: [],
    },
  };
}

/**
 * Detect-and-translate helper: takes either legacy or XRAI v1.0 shape and
 * returns a normalized XRAI v1.0 doc. Useful at the viewer entry point so
 * a single consumer code path handles both inputs.
 *
 * @param {object} anyShape - either {xrai_version, scene:{entities}} or {scene:{objects}}
 * @param {object} [opts] - forwarded to webSceneToXrai if conversion needed
 * @returns {object} XRAI v1.0 doc
 */
export function normalizeToXrai(anyShape, opts = {}) {
  if (anyShape && anyShape.xrai_version && anyShape.scene && Array.isArray(anyShape.scene.entities)) {
    return anyShape; // already XRAI v1.0
  }
  return webSceneToXrai(anyShape, opts);
}
