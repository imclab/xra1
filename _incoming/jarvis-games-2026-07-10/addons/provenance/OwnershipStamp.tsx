// OwnershipStamp.tsx — the creator provenance/license control embedded in every game (Phase 1).
//
// Zero-friction: the player taps ONE of three tiers and "Claim & sign"; everything else (creator DID, SPDX
// license, content hash, signature, immutable registry record) is automatic. Logic lives in the pure-TS
// provenance.ts seam (gated headless by provenanceSelfTest); this is just the UI. Real Data-Integrity/C2PA
// signing + the on-chain "Mint" button are later increments (docs/research/PROVENANCE_RECOMMENDATION_2026-07-10.md).
import { useMemo, useRef, useState } from "react";
import {
  TIERS, CC_OPTIONS, stampProvenance, verifyProvenance, provenanceSelfTest, AssetRegistry,
  type LicenseTier, type ProvenanceBlock,
} from "../../lib/scale/provenance";

const btn = { padding: "7px 9px", borderRadius: 9, border: "1px solid #333", background: "#000", color: "#fff", cursor: "pointer", fontSize: 12 } as const;
const on = (a: boolean) => ({ ...btn, background: a ? "#101a30" : "#000", borderColor: a ? "#3b78d6" : "#333" });

export function OwnershipStamp({ userId, asset, assetId, parents }: { userId: string; asset: unknown; assetId: string; parents?: string[] }) {
  const [tier, setTier] = useState<LicenseTier>("private-reserved");
  const [spdx, setSpdx] = useState("CC-BY-4.0");
  const [coauthors, setCoauthors] = useState("");
  const [block, setBlock] = useState<ProvenanceBlock | null>(null);
  const [minted, setMinted] = useState("");
  const [msg, setMsg] = useState("");
  const registry = useRef(new AssetRegistry());
  const self = useMemo(() => provenanceSelfTest(), []);
  const pass = self.filter((c) => c.ok).length;
  const info = TIERS[tier];

  const claim = () => {
    const coAuthors = tier === "collective" ? coauthors.split(",").map((s) => s.trim()).filter(Boolean) : [];
    const b = stampProvenance({ asset, userId, tier, spdx: info.remixable ? spdx : undefined, coAuthors, parents, createdISO: new Date().toISOString() });
    const id = `${assetId}:${b.contentHash.slice(0, 8)}`;
    const r = registry.current.mint(id, b);
    setBlock(b); setMinted(id);
    setMsg(r.ok ? `signed ✓ · minted · ${verifyProvenance(asset, b) ? "verified" : "INVALID"}` : `already minted (immutable): ${id}`);
  };

  return (
    <div style={{ marginTop: 6, padding: 12, borderRadius: 12, border: "1px solid #22304a", background: "#080b14" }}>
      <div style={{ fontWeight: 600, fontSize: 13 }}>🔏 Ownership & license <span style={{ opacity: 0.6, fontWeight: 400 }}>· your creation, signed to you</span></div>
      <div style={{ fontSize: 11, marginTop: 4 }}>ownership self-test: <b style={{ color: pass === self.length ? "#8cff8c" : "#ff6b6b" }}>{pass}/{self.length}</b></div>

      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
        {Object.values(TIERS).map((t) => <button key={t.tier} style={on(tier === t.tier)} onClick={() => setTier(t.tier)}>{t.label}</button>)}
      </div>

      {info.remixable && (
        <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center", fontSize: 12 }}>
          <span style={{ opacity: 0.6 }}>license:</span>
          <select value={spdx} onChange={(e) => setSpdx(e.target.value)} style={{ background: "#0a0a12", color: "#fff", border: "1px solid #333", borderRadius: 8, padding: "5px 7px", fontSize: 12 }}>
            {CC_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      )}
      {tier === "collective" && (
        <input value={coauthors} onChange={(e) => setCoauthors(e.target.value)} placeholder="invite co-authors (comma-separated user ids)"
          style={{ width: "100%", marginTop: 8, padding: "6px 8px", borderRadius: 8, border: "1px solid #333", background: "#0a0a12", color: "#fff", fontSize: 12, boxSizing: "border-box" }} />
      )}

      <div style={{ marginTop: 8 }}>
        <button style={{ ...btn, background: "#101a30", borderColor: "#3b78d6" }} onClick={claim}>🔏 Claim &amp; sign</button>
      </div>

      {block && (
        <div style={{ fontSize: 11, marginTop: 8, lineHeight: 1.6, fontFamily: "ui-monospace, monospace", wordBreak: "break-all" }}>
          <div style={{ color: "#8cff8c" }}>{msg}</div>
          <div>creator: <b>{block.creator}</b></div>
          <div>license: <b>{block.license.spdx}</b> ({block.license.tier}){block.license.odrl ? " · +ODRL agreement" : ""}</div>
          <div>lineage: {block.parents.length ? block.parents.join(", ") : "original (no parents)"}</div>
          <div>content-hash: {block.contentHash} · proof: {block.proof.proofValue.slice(0, 20)}… ({block.proofs.length} sig)</div>
          <div>registry id: {minted}</div>
        </div>
      )}

      <div style={{ fontSize: 10.5, opacity: 0.55, marginTop: 8 }}>
        creator=W3C DID · license=SPDX · lineage=PROV-O parents · integrity=proof. The signature here is a mock keyed
        hash; real Data-Integrity/C2PA signing + an opt-in on-chain <b>Mint</b> button are next. Saved as XRAI.json.
      </div>
    </div>
  );
}
