// js/memory/store.js — L0 persistence: IndexedDB.
//
// One DB, one DB version, three stores:
//   • episodic   — append-only log (turns, spawn events, perception frames)
//   • semantic   — distilled facts (essence-distiller output)
//   • procedural — preferences / habits / patterns
//
// Each record: { id, ts, kind, topic, text, embed?, source, scene_id?, entity_ids?, meta? }
//   id     — auto from ts+rand (sortable)
//   ts     — ISO string
//   kind   — episodic|semantic|procedural|spawn
//   embed  — Float32Array(384) stored as Uint8Array(1536) bytes (optional)
//   source — web|unity|rn  (for conflict tracing across platforms)
//
// Vectors live alongside records, not in OPFS yet — keep flat until >5MB.
// Migrating to OPFS Float32Array files is one swap behind this module.

const DB_NAME = 'xrai_memory';
const DB_VERSION = 1;
const STORES = ['episodic', 'semantic', 'procedural'];

let _dbPromise = null;

function openDb() {
  if (_dbPromise) return _dbPromise;
  _dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      for (const s of STORES) {
        if (!db.objectStoreNames.contains(s)) {
          const store = db.createObjectStore(s, { keyPath: 'id' });
          store.createIndex('ts', 'ts', { unique: false });
          store.createIndex('topic', 'topic', { unique: false });
          store.createIndex('kind', 'kind', { unique: false });
        }
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return _dbPromise;
}

function tx(db, storeName, mode = 'readonly') {
  return db.transaction(storeName, mode).objectStore(storeName);
}

function nextId() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function put(storeName, record) {
  if (!STORES.includes(storeName)) throw new Error(`unknown store: ${storeName}`);
  const db = await openDb();
  const rec = {
    id: record.id || nextId(),
    ts: record.ts || new Date().toISOString(),
    ...record,
  };
  return new Promise((resolve, reject) => {
    const req = tx(db, storeName, 'readwrite').put(rec);
    req.onsuccess = () => resolve(rec);
    req.onerror = () => reject(req.error);
  });
}

export async function get(storeName, id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = tx(db, storeName).get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function del(storeName, id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = tx(db, storeName, 'readwrite').delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

export async function all(storeName, { limit = 1000, since = null } = {}) {
  const db = await openDb();
  const store = tx(db, storeName);
  const out = [];
  return new Promise((resolve, reject) => {
    const range = since ? IDBKeyRange.lowerBound(since, true) : null;
    const req = store.index('ts').openCursor(range, 'prev');
    req.onsuccess = (e) => {
      const cur = e.target.result;
      if (cur && out.length < limit) {
        out.push(cur.value);
        cur.continue();
      } else {
        resolve(out);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

export async function byTopic(storeName, topic, { limit = 100 } = {}) {
  const db = await openDb();
  const store = tx(db, storeName);
  return new Promise((resolve, reject) => {
    const out = [];
    const req = store.index('topic').openCursor(IDBKeyRange.only(topic), 'prev');
    req.onsuccess = (e) => {
      const cur = e.target.result;
      if (cur && out.length < limit) { out.push(cur.value); cur.continue(); }
      else resolve(out);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function recent(storeName, n = 20) {
  return all(storeName, { limit: n });
}

export async function size() {
  const db = await openDb();
  const out = {};
  for (const s of STORES) {
    out[s] = await new Promise((resolve) => {
      const req = tx(db, s).count();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(0);
    });
  }
  return out;
}

export async function clearStore(storeName) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = tx(db, storeName, 'readwrite').clear();
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

export async function exportAll() {
  const out = {};
  for (const s of STORES) out[s] = await all(s, { limit: 100000 });
  return out;
}

export async function importAll(data, { merge = true } = {}) {
  let n = 0;
  for (const s of STORES) {
    if (!Array.isArray(data?.[s])) continue;
    if (!merge) await clearStore(s);
    for (const rec of data[s]) { await put(s, rec); n++; }
  }
  return n;
}

if (typeof window !== 'undefined') {
  window.__memStore = { put, get, del, all, byTopic, recent, size, clearStore, exportAll, importAll };
}
