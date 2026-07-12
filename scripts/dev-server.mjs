// dev-server.mjs — LOCAL DEV ONLY: serves the static site AND a same-origin
// /api/livekit-token?room&identity endpoint so 2 browser tabs can join a real
// LiveKit room without CORS/token-paste. NOT for production — production uses
// web/livekit-token-worker/worker.js (Cloudflare). Neither the Worker (env-based,
// Cloudflare runtime) nor mint-livekit-token.mjs (CLI, prints a join URL) is a
// local HTTP server, so this thin glue is the missing piece for local verify.
//
// Reuses: livekit-server-sdk (installed) + ~/.livekit/cli-config.yaml (same creds
// as mint-livekit-token.mjs + rgbd-viewer). Response shape matches live-web.js
// _fetchToken(): { token, serverUrl }.
//
//   node scripts/dev-server.mjs [port]     # default 8131
import { AccessToken } from 'livekit-server-sdk';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..'); // xra1/
const PORT = Number(process.argv[2]) || 8131;

// Minimal cli-config.yaml reader (same shape as mint-livekit-token.mjs / rgbd-viewer).
function lkCreds() {
  const raw = readFileSync(join(homedir(), '.livekit', 'cli-config.yaml'), 'utf-8');
  let def = null; const projects = []; let cur = {}, inP = false;
  for (const line of raw.split('\n')) {
    const t = line.trimEnd();
    if (t.startsWith('default_project:')) def = t.split(':').slice(1).join(':').trim();
    else if (t === 'projects:') inP = true;
    else if (inP && t.startsWith('    - name:')) { if (cur.name) projects.push(cur); cur = { name: t.replace('    - name:', '').trim() }; }
    else if (inP && t.startsWith('      url:')) cur.url = t.replace('      url:', '').trim();
    else if (inP && t.startsWith('      api_key:')) cur.api_key = t.replace('      api_key:', '').trim();
    else if (inP && t.startsWith('      api_secret:')) cur.api_secret = t.replace('      api_secret:', '').trim();
  }
  if (cur.name) projects.push(cur);
  return projects.find(p => p.name === def) || projects[0];
}
const CREDS = lkCreds();

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.wasm': 'application/wasm', '.ico': 'image/x-icon' };

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname === '/api/livekit-token') {
    try {
      const room = url.searchParams.get('room') || 'xrai-demo';
      const identity = url.searchParams.get('identity') || `viewer-${Math.random().toString(36).slice(2, 8)}`;
      const at = new AccessToken(CREDS.api_key, CREDS.api_secret, { identity, ttl: '2h' });
      at.addGrant({ roomJoin: true, room, canPublish: true, canSubscribe: true, canPublishData: true });
      const token = await at.toJwt();
      res.writeHead(200, { 'content-type': 'application/json', 'access-control-allow-origin': '*' });
      res.end(JSON.stringify({ token, serverUrl: CREDS.url }));
    } catch (e) {
      res.writeHead(500, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: String(e) }));
    }
    return;
  }
  // static
  let p = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (p === '/' || p === '') p = '/index.html';
  let fp = join(ROOT, p);
  if (existsSync(fp) && statSync(fp).isDirectory()) fp = join(fp, 'index.html');
  if (!existsSync(fp)) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'content-type': MIME[extname(fp)] || 'application/octet-stream' });
  res.end(readFileSync(fp));
}).listen(PORT, () => console.log(`dev-server: http://localhost:${PORT}  (token: /api/livekit-token, project=${CREDS?.name}, url=${CREDS?.url})`));
