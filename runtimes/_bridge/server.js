#!/usr/bin/env node
// xrai · localhost:8787 hub — http + ws + mcp relay + claude subprocess
// run: node runtimes/_bridge/server.js  (no deps; pure node stdlib)
//
// endpoints:
//   GET  /health                       → { ok, ts, mcp:[...], rooms:n }
//   POST /ask    { q, page, ctx? }     → forwards to claude CLI (or echo fallback)
//   POST /mcp    { tool, args, source }→ dispatch to local MCP servers (registry below)
//   GET  /rooms                        → list active webrtc rooms
//   WS   /ws?room=xxx&id=yyy           → relay signaling for remix room sync

import http from 'node:http';
import { WebSocketServer } from 'ws';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';

const PORT = +(process.env.XRAI_HUB_PORT || 8787);

// MCP registry (extend with user's actual local servers)
const MCP = {
  'jarvis.ask':    async (a)=> ({ text: await claude(a.q || a.prompt || '') }),
  'tabs.capture':  async ()=> ({ error: 'browser-side only — use chrome.tabs.captureVisibleTab' }),
  'memory.search': async (a)=> mempalace('search', a),
  'memory.add':    async (a)=> mempalace('add', a),
  // add more: gmail, context7, needle, unity, etc.
};

async function claude(prompt){
  return new Promise((res, rej)=>{
    const cli = spawn('claude', ['-p', prompt, '--output-format', 'text'], {
      stdio:['ignore','pipe','pipe'], env: process.env,
    });
    let out='', err='';
    cli.stdout.on('data', d=> out += d);
    cli.stderr.on('data', d=> err += d);
    cli.on('error', e=> res('claude unavailable: ' + e.message));
    cli.on('close', code=> res(code===0 ? out.trim() : ('claude err: ' + (err.trim() || out.trim() || code))));
    setTimeout(()=> { cli.kill(); res('claude timeout'); }, 30_000);
  });
}

async function mempalace(action, args){
  // optional: shell out to mempalace CLI if installed
  return new Promise(res=>{
    const c = spawn('mempalace', [action, JSON.stringify(args || {})], { stdio:['ignore','pipe','pipe'] });
    let out='';
    c.stdout.on('data', d=> out += d);
    c.on('error', ()=> res({ error:'mempalace not installed' }));
    c.on('close', ()=> { try { res(JSON.parse(out)); } catch { res({ raw: out }); } });
  });
}

const rooms = new Map(); // room -> Set<ws>

function json(res, code, body){
  res.writeHead(code, {
    'content-type':'application/json',
    'access-control-allow-origin':'*',
    'access-control-allow-methods':'GET,POST,OPTIONS',
    'access-control-allow-headers':'content-type',
  });
  res.end(JSON.stringify(body));
}

async function readBody(req){
  return new Promise((res, rej)=>{
    let b=''; req.on('data', c=> b += c); req.on('end', ()=> { try { res(b ? JSON.parse(b) : {}); } catch(e){ rej(e); } });
  });
}

const server = http.createServer(async (req, res)=>{
  if(req.method === 'OPTIONS') return json(res, 204, {});
  const u = new URL(req.url, `http://localhost:${PORT}`);
  try {
    if(u.pathname === '/health'){
      return json(res, 200, { ok:true, ts:Date.now(), mcp:Object.keys(MCP), rooms: rooms.size });
    }
    if(u.pathname === '/ask' && req.method === 'POST'){
      const body = await readBody(req);
      const text = await claude(body.q || body.prompt || '');
      return json(res, 200, { text, ts:Date.now() });
    }
    if(u.pathname === '/mcp' && req.method === 'POST'){
      const body = await readBody(req);
      const fn = MCP[body.tool];
      if(!fn) return json(res, 404, { error:`unknown tool: ${body.tool}` });
      const r = await fn(body.args || {});
      return json(res, 200, r);
    }
    if(u.pathname === '/rooms'){
      return json(res, 200, { rooms: [...rooms.entries()].map(([k,v])=>({ room:k, peers:v.size })) });
    }
    return json(res, 404, { error:'not found', path:u.pathname });
  } catch(e){
    return json(res, 500, { error: e.message });
  }
});

// WebSocket signaling relay for remix rooms (full mesh)
const wss = new WebSocketServer({ server, path:'/ws' });
wss.on('connection', (ws, req)=>{
  const u = new URL(req.url, 'http://localhost');
  const room = u.searchParams.get('room') || 'default';
  const id   = u.searchParams.get('id')   || Math.random().toString(36).slice(2,10);
  ws._id = id; ws._room = room;
  if(!rooms.has(room)) rooms.set(room, new Set());
  const peers = rooms.get(room);
  peers.add(ws);

  // tell newcomer about existing peers
  ws.send(JSON.stringify({ kind:'hello', id, peers: [...peers].filter(p=>p!==ws).map(p=>p._id) }));
  // tell others
  for(const p of peers) if(p !== ws && p.readyState === 1)
    p.send(JSON.stringify({ kind:'join', id }));

  ws.on('message', m=>{
    let msg; try { msg = JSON.parse(m); } catch { return; }
    msg.from = id;
    // direct or broadcast
    if(msg.to){
      for(const p of peers) if(p._id === msg.to && p.readyState === 1) p.send(JSON.stringify(msg));
    } else {
      for(const p of peers) if(p !== ws && p.readyState === 1) p.send(JSON.stringify(msg));
    }
  });

  ws.on('close', ()=>{
    peers.delete(ws);
    if(peers.size === 0) rooms.delete(room);
    else for(const p of peers) if(p.readyState === 1) p.send(JSON.stringify({ kind:'leave', id }));
  });
});

server.listen(PORT, ()=>{
  console.log(`[xrai-hub] http+ws  http://localhost:${PORT}`);
  console.log(`[xrai-hub] tools     ${Object.keys(MCP).join(', ')}`);
  console.log(`[xrai-hub] ws path   ws://localhost:${PORT}/ws?room=<id>&id=<peer>`);
});
