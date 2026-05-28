// agent-signal-flow.js — ESM module for embeddable agent signal-flow SVG.
// Mount on any container; configure nodes/wires/sequence at runtime.
//
// Usage:
//   import { createSignalFlow } from './js/agent-signal-flow.js';
//   const flow = createSignalFlow({
//     mount: document.getElementById('flow-host'),
//     nodes: [{ id:'user', label:'user', sub:'voice·text', x:30, y:30 }, ...],
//     wires: [{ from:'user', to:'core' }, ...],
//     sequence: ['user','core','backend','core','out'],
//     tickMs: 900,
//   });
//   flow.start(); flow.pulse('backend'); flow.setLabel('backend','opus 4.7');
//   flow.update({ nodes, wires, sequence }); flow.stop();

const SVG_NS = 'http://www.w3.org/2000/svg';
const DEFAULT_NODE_W = 80;
const DEFAULT_NODE_H = 60;

const DEFAULT_NODES = [
  { id: 'user',    label: 'user',    sub: 'voice · text',   x: 30,  y: 30  },
  { id: 'core',    label: 'core',    sub: 'react loop',     x: 220, y: 150, active: true },
  { id: 'backend', label: 'opus',    sub: 'stop_reason',    x: 420, y: 30  },
  { id: 'tools',   label: 'tools',   sub: 'bridge · notes', x: 420, y: 150 },
  { id: 'memory',  label: 'memory',  sub: 'sqlite · soul',  x: 420, y: 270 },
  { id: 'out',     label: 'out',     sub: 'bridge · tts',   x: 540, y: 150 },
];

const DEFAULT_WIRES = [
  { from: 'user',    to: 'core'    },
  { from: 'core',    to: 'backend' },
  { from: 'backend', to: 'core'    },
  { from: 'core',    to: 'tools'   },
  { from: 'tools',   to: 'core'    },
  { from: 'core',    to: 'memory'  },
  { from: 'memory',  to: 'core'    },
  { from: 'core',    to: 'out'     },
];

const DEFAULT_SEQUENCE = ['user','core','backend','core','tools','core','memory','core','out'];

function el(tag, attrs = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function nodeCenter(n) {
  return { cx: n.x + DEFAULT_NODE_W / 2, cy: n.y + DEFAULT_NODE_H / 2 };
}

export function createSignalFlow(opts = {}) {
  const mount = opts.mount;
  if (!mount) throw new Error('agent-signal-flow: opts.mount required');

  let nodes = opts.nodes ?? DEFAULT_NODES;
  let wires = opts.wires ?? DEFAULT_WIRES;
  let sequence = opts.sequence ?? DEFAULT_SEQUENCE;
  let tickMs = opts.tickMs ?? 900;
  const viewW = opts.viewW ?? 640;
  const viewH = opts.viewH ?? 360;
  const onTick = opts.onTick; // (nodeId, idx) => void

  let svg, gWires, gNodes;
  let seqIdx = 0;
  let timer = null;

  function build() {
    mount.innerHTML = '';
    svg = el('svg', {
      viewBox: `0 0 ${viewW} ${viewH}`,
      preserveAspectRatio: 'xMidYMid meet',
      width: '100%',
      style: 'display:block;height:100%;',
      'data-agent-signal-flow': '1',
    });
    gWires = el('g', { class: 'wires' });
    gNodes = el('g', { class: 'nodes' });
    svg.appendChild(gWires);
    svg.appendChild(gNodes);
    mount.appendChild(svg);

    renderWires();
    renderNodes();
  }

  function renderWires() {
    gWires.innerHTML = '';
    const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
    for (const w of wires) {
      const a = byId[w.from], b = byId[w.to];
      if (!a || !b) continue;
      const { cx: x1, cy: y1 } = nodeCenter(a);
      const { cx: x2, cy: y2 } = nodeCenter(b);
      gWires.appendChild(el('line', {
        class: 'wire',
        x1, y1, x2, y2,
        'data-from': w.from,
        'data-to': w.to,
      }));
    }
  }

  function renderNodes() {
    gNodes.innerHTML = '';
    for (const n of nodes) {
      const g = el('g', {
        class: 'node' + (n.active ? ' active' : ''),
        id: `agent-node-${n.id}`,
        transform: `translate(${n.x},${n.y})`,
      });
      g.appendChild(el('circle', { class: 'halo', cx: DEFAULT_NODE_W/2, cy: DEFAULT_NODE_H/2 }));
      g.appendChild(el('rect', { x: 0, y: 0, width: DEFAULT_NODE_W, height: DEFAULT_NODE_H, rx: 2 }));
      const lbl = el('text', { x: DEFAULT_NODE_W/2, y: 26, 'text-anchor': 'middle' });
      lbl.textContent = n.label;
      lbl.setAttribute('data-role', 'label');
      g.appendChild(lbl);
      const sub = el('text', { class: 'label', x: DEFAULT_NODE_W/2, y: 46, 'text-anchor': 'middle' });
      sub.textContent = n.sub ?? '';
      sub.setAttribute('data-role', 'sub');
      g.appendChild(sub);
      gNodes.appendChild(g);
    }
  }

  function pulse(id) {
    if (!svg) return;
    svg.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
    const target = svg.querySelector(`#agent-node-${id}`);
    if (target) target.classList.add('active');
    svg.querySelectorAll('.wire').forEach(l => {
      const live = (l.dataset.to === id) || (l.dataset.from === id);
      l.classList.toggle('live', live);
    });
  }

  function setLabel(id, label, sub) {
    const target = svg?.querySelector(`#agent-node-${id}`);
    if (!target) return;
    if (label != null) {
      const t = target.querySelector('[data-role="label"]');
      if (t) t.textContent = label;
    }
    if (sub != null) {
      const t = target.querySelector('[data-role="sub"]');
      if (t) t.textContent = sub;
    }
  }

  function tick() {
    if (sequence.length === 0) return;
    const id = sequence[seqIdx % sequence.length];
    pulse(id);
    if (typeof onTick === 'function') {
      try { onTick(id, seqIdx); } catch (e) { console.warn('[agent-signal-flow] onTick threw:', e); }
    }
    seqIdx++;
  }

  function start() { if (!timer) timer = setInterval(tick, tickMs); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  function update(next = {}) {
    if (next.nodes) nodes = next.nodes;
    if (next.wires) wires = next.wires;
    if (next.sequence) sequence = next.sequence;
    if (next.tickMs && next.tickMs !== tickMs) {
      tickMs = next.tickMs;
      if (timer) { stop(); start(); }
    }
    build();
  }

  build();

  return { svg: () => svg, pulse, setLabel, tick, start, stop, update };
}
