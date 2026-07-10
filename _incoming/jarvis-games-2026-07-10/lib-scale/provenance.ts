// provenance.ts — Phase 1 creator provenance + license stamp for XRAI assets. Pure TS (no three/DOM).
//
// Recommendation: docs/research/PROVENANCE_RECOMMENDATION_2026-07-10.md. Invisible, account-keyed signed
// provenance embedded in the asset NOW (zero player friction); on-chain mint is a later opt-in. Standards
// mapping: creator = W3C DID · license = SPDX id · lineage = parents[] (PROV-O wasDerivedFrom) · integrity
// = a proof. The proof here is a deterministic keyed hash — an HONEST MOCK stand-in; real W3C Data Integrity
// (Ed25519) / C2PA signing is the next increment. Graduates to Unity + RN 3JS V5 unchanged.

export type LicenseTier = "private-reserved" | "private-remix" | "collective";

export interface TierInfo { tier: LicenseTier; label: string; spdx: string; remixable: boolean; needsCoAuthors: boolean; }

// The operator's 3 starter tiers (keep it simple). Default = safest (all rights reserved).
export const TIERS: Record<LicenseTier, TierInfo> = {
  "private-reserved": { tier: "private-reserved", label: "Mine · all rights reserved", spdx: "LicenseRef-AllRightsReserved", remixable: false, needsCoAuthors: false },
  "private-remix": { tier: "private-remix", label: "Mine · others may remix (CC)", spdx: "CC-BY-4.0", remixable: true, needsCoAuthors: false },
  "collective": { tier: "collective", label: "Made together · co-authored", spdx: "CC-BY-SA-4.0", remixable: true, needsCoAuthors: true },
};
export const CC_OPTIONS = ["CC-BY-4.0", "CC-BY-SA-4.0", "CC0-1.0", "CC-BY-NC-4.0"]; // remix/collective may pick

export interface License { tier: LicenseTier; spdx: string; odrl: unknown | null; }
export interface Proof { type: string; created: string; verificationMethod: string; proofValue: string; }
export interface ProvenanceBlock {
  creator: string;      // did:web:…
  coAuthors: string[];  // DIDs (collective tier)
  created: string;      // ISO 8601
  app: string;
  parents: string[];    // remix lineage (PROV-O wasDerivedFrom)
  contentHash: string;
  license: License;
  proof: Proof;         // first signature (creator)
  proofs: Proof[];      // one per signer (creator + co-authors) — multi-sig for collective
}

export function didFor(userId: string): string { return `did:web:portals.app:u:${(userId || "anon").replace(/[^a-zA-Z0-9._-]/g, "")}`; }

// Stable stringify (sorted keys) → canonical bytes so the hash is deterministic regardless of key order.
export function canonicalize(v: any): string {
  if (v === null || typeof v !== "object") return JSON.stringify(v) ?? "null";
  if (Array.isArray(v)) return "[" + v.map(canonicalize).join(",") + "]";
  return "{" + Object.keys(v).sort().map((k) => JSON.stringify(k) + ":" + canonicalize(v[k])).join(",") + "}";
}

// FNV-1a → a synchronous, dependency-free content hash (a real SHA-256 / C2PA hard-binding is the next step).
function fnv(s: string, seed: number): number { let h = seed >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; }
const hex8 = (n: number) => (n >>> 0).toString(16).padStart(8, "0");
export function contentHash(asset: unknown): string { const s = canonicalize(asset); return hex8(fnv(s, 0x811c9dc5)) + hex8(fnv(s, 0xabcdef01)); }
function signHash(hash: string, vm: string): string { return "z" + hex8(fnv(vm + ":" + hash, 0x243f6a88)) + hex8(fnv(hash + ":" + vm, 0x85a308d3)); }

export interface StampInput { asset: unknown; userId: string; tier: LicenseTier; spdx?: string; coAuthors?: string[]; parents?: string[]; app?: string; createdISO: string; }

export function stampProvenance(inp: StampInput): ProvenanceBlock {
  const creator = didFor(inp.userId);
  const coAuthors = (inp.coAuthors || []).map(didFor);
  const info = TIERS[inp.tier];
  const spdx = info.remixable ? (inp.spdx || info.spdx) : info.spdx; // remixable tiers may pick a CC id
  const hash = contentHash(inp.asset);
  const mkProof = (did: string): Proof => { const vm = `${did}#key-1`; return { type: "MockKeyedProof-2020", created: inp.createdISO, verificationMethod: vm, proofValue: signHash(hash, vm) }; };
  const proofs = [creator, ...coAuthors].map(mkProof);
  return {
    creator, coAuthors, created: inp.createdISO, app: inp.app || "portals/jarvis-hyperjam",
    parents: inp.parents || [], contentHash: hash,
    license: { tier: inp.tier, spdx, odrl: inp.tier === "collective" ? { "@context": "https://www.w3.org/ns/odrl.jsonld", "@type": "Agreement" } : null },
    proof: proofs[0], proofs,
  };
}

// Recompute the hash + every signature → true only if the asset is untampered and all proofs verify.
export function verifyProvenance(asset: unknown, block: ProvenanceBlock): boolean {
  if (contentHash(asset) !== block.contentHash) return false;
  return block.proofs.every((p) => p.proofValue === signHash(block.contentHash, p.verificationMethod));
}

// Write-once registry — mirrors the immutable Firestore `assets/{assetId}` (create-only, no update/delete).
export class AssetRegistry {
  private m = new Map<string, ProvenanceBlock>();
  mint(assetId: string, block: ProvenanceBlock): { ok: boolean; reason?: string } {
    if (this.m.has(assetId)) return { ok: false, reason: "immutable: already minted" };
    this.m.set(assetId, block); return { ok: true };
  }
  get(assetId: string) { return this.m.get(assetId); }
  has(assetId: string) { return this.m.has(assetId); }
  size() { return this.m.size; }
}

export function provenanceSelfTest(): { name: string; ok: boolean; detail: string }[] {
  const out: { name: string; ok: boolean; detail: string }[] = [];
  const iso = "2026-07-10T18:00:00Z", asset = { kind: "test", seed: 42 };
  out.push({ name: "tiers-3", ok: Object.keys(TIERS).length === 3, detail: Object.keys(TIERS).join("/") });
  out.push({ name: "tier-spdx", ok: TIERS["private-reserved"].spdx === "LicenseRef-AllRightsReserved" && TIERS["private-remix"].spdx === "CC-BY-4.0", detail: "reserved/CC" });
  out.push({ name: "did-format", ok: didFor("alice").startsWith("did:web:portals.app:u:alice"), detail: didFor("alice") });
  const b1 = stampProvenance({ asset, userId: "alice", tier: "private-reserved", createdISO: iso });
  const b2 = stampProvenance({ asset, userId: "alice", tier: "private-reserved", createdISO: iso });
  out.push({ name: "stamp-deterministic", ok: b1.contentHash === b2.contentHash && b1.proof.proofValue === b2.proof.proofValue, detail: b1.contentHash });
  out.push({ name: "verify-true", ok: verifyProvenance(asset, b1), detail: "untampered" });
  out.push({ name: "tamper-detected", ok: !verifyProvenance({ kind: "test", seed: 43 }, b1), detail: "hash mismatch" });
  const col = stampProvenance({ asset, userId: "alice", tier: "collective", coAuthors: ["bob", "carol"], createdISO: iso });
  out.push({ name: "collective-multisig", ok: col.coAuthors.length === 2 && col.proofs.length === 3 && !!col.license.odrl, detail: `${col.proofs.length} sigs` });
  const remix = stampProvenance({ asset, userId: "alice", tier: "private-remix", spdx: "CC0-1.0", parents: ["gABC"], createdISO: iso });
  out.push({ name: "lineage-parents", ok: remix.parents[0] === "gABC" && remix.license.spdx === "CC0-1.0", detail: "wasDerivedFrom" });
  const reg = new AssetRegistry();
  out.push({ name: "registry-immutable", ok: reg.mint("a1", b1).ok && !reg.mint("a1", b1).ok, detail: "create-only" });
  return out;
}
