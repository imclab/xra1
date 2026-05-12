// knowledge-sync.js — Yjs + WebRTC collaborative graph sync layer
// Multi-user knowledge graph editing with presence, selection sharing,
// and conflict-safe map transactions. Works from static hosting (no backend).
// Spec: Portals v4 § Multiplayer + Karpathy compiled-wiki § collaboration.

const YJS_CDN = 'https://cdn.jsdelivr.net/npm/yjs@13.6.18/+esm';
const WEBRTC_CDN = 'https://cdn.jsdelivr.net/npm/y-webrtc@10.3.0/+esm';

const DEFAULT_SIGNALING = [
  'wss://signaling.yjs.dev',
  'wss://y-webrtc-signaling-eu.herokuapp.com',
  'wss://y-webrtc-signaling-us.herokuapp.com',
];

function randomHandle() {
  return `xrai-${Math.random().toString(36).slice(2, 8)}`;
}

const PEER_COLORS = [
  '#F7FFA8', '#A8A8FF', '#5eff8a', '#ff6b6b', '#4ecdc4',
  '#f39c12', '#9b59b6', '#3498db', '#e74c3c', '#1abc9c',
];

export class KnowledgeSync extends EventTarget {
  constructor(options = {}) {
    super();
    this.room = options.room || 'xrai-knowledge';
    this.localUser = options.localUser || randomHandle();
    this.signalings = options.signaling || DEFAULT_SIGNALING;
    this.connected = false;
    this._applyingRemote = false;
    this._Y = null;
    this._provider = null;
    this._doc = null;
    this._nodes = null;
    this._links = null;
    this._meta = null;
    this._awareness = null;
    this._ready = false;
  }

  /** Lazy-load Yjs + WebRTC from CDN, then connect */
  async connect() {
    if (this._ready) return;
    const [Y, { WebrtcProvider }] = await Promise.all([
      import(YJS_CDN),
      import(WEBRTC_CDN),
    ]);
    this._Y = Y;
    this._doc = new Y.Doc();
    this._nodes = this._doc.getMap('nodes');
    this._links = this._doc.getMap('links');
    this._meta = this._doc.getMap('meta');
    this._provider = new WebrtcProvider(this.room, this._doc, {
      signaling: this.signalings,
    });
    this._awareness = this._provider.awareness;
    this._awareness.setLocalStateField('user', {
      id: this.localUser,
      name: this.localUser,
      color: PEER_COLORS[Math.floor(Math.random() * PEER_COLORS.length)],
      joinedAt: new Date().toISOString(),
    });

    this._provider.on('status', ({ status }) => {
      this.connected = status === 'connected';
      this.dispatchEvent(new CustomEvent('status', { detail: { status, room: this.room } }));
    });

    this._awareness.on('change', () => {
      this.dispatchEvent(new CustomEvent('presence', { detail: { peers: this.getPeers() } }));
    });

    this._nodes.observeDeep(() => this._dispatchGraph('nodes'));
    this._links.observeDeep(() => this._dispatchGraph('links'));
    this._meta.observeDeep(() => this._dispatchGraph('meta'));

    this._ready = true;
    this.connected = true;
    this.dispatchEvent(new CustomEvent('ready'));
  }

  _dispatchGraph(scope) {
    if (this._applyingRemote) return;
    this.dispatchEvent(new CustomEvent('graph-updated', {
      detail: { scope, graph: this.snapshot() },
    }));
  }

  getPeers() {
    if (!this._awareness) return [];
    return [...this._awareness.getStates().values()]
      .map(s => s?.user).filter(Boolean);
  }

  snapshot() {
    if (!this._nodes) return { nodes: [], links: [], meta: {} };
    return {
      nodes: [...this._nodes.values()],
      links: [...this._links.values()],
      meta: this._meta?.toJSON() || {},
    };
  }

  /** Seed the shared doc from generated graph data (only if empty) */
  seed(graph) {
    if (!this._nodes || this._nodes.size > 0) return false;
    this._applyingRemote = true;
    try {
      this._doc.transact(() => {
        for (const node of graph.nodes || []) this._nodes.set(node.id, node);
        for (const link of graph.links || []) {
          const key = link.id || `${link.source}:${link.target}:${link.type || 'link'}`;
          this._links.set(key, link);
        }
        this._meta.set('seededAt', new Date().toISOString());
        if (graph.meta) this._meta.set('graphMeta', graph.meta);
      }, 'seed');
    } finally {
      this._applyingRemote = false;
    }
    this._dispatchGraph('seed');
    return true;
  }

  upsertNode(node) {
    if (!node?.id || !this._nodes) return;
    this._doc.transact(() => {
      const existing = this._nodes.get(node.id) || {};
      this._nodes.set(node.id, { ...existing, ...node, updatedAt: new Date().toISOString() });
    }, 'upsert-node');
  }

  removeNode(nodeId) {
    if (!nodeId || !this._nodes) return;
    this._doc.transact(() => {
      this._nodes.delete(nodeId);
      for (const [key, link] of this._links.entries()) {
        if (link.source === nodeId || link.target === nodeId) this._links.delete(key);
      }
    }, 'remove-node');
  }

  upsertLink(link) {
    if (!link?.source || !link?.target || !this._links) return;
    const id = link.id || `${link.source}:${link.target}:${link.type || 'relates-to'}`;
    this._doc.transact(() => {
      const existing = this._links.get(id) || {};
      this._links.set(id, { id, ...existing, ...link, updatedAt: new Date().toISOString() });
    }, 'upsert-link');
    return id;
  }

  removeLink(linkId) {
    if (!linkId || !this._links) return;
    this._links.delete(linkId);
  }

  setSelection(nodeId) {
    this._awareness?.setLocalStateField('selection', {
      nodeId: nodeId || null, ts: Date.now(),
    });
  }

  setPointer(pointer) {
    this._awareness?.setLocalStateField('pointer', pointer || null);
  }

  destroy() {
    this._awareness?.setLocalState(null);
    this._provider?.destroy();
    this._doc?.destroy();
    this._ready = false;
    this.connected = false;
  }
}
