# Creator provenance & minting — recommendation (synthesis)

**2026-07-10.** Synthesizes three cited spikes into one plan. Sources:
`PROVENANCE_MINTING_SOTA_2026-07-10.md` · `PROVENANCE_STANDARDS_W3C_2026-07-10.md` · `PORTALS_MINTING_BACKEND_AUDIT_2026-07-10.md`.

> **Honesty gate.** Legal/licensing choices below are engineering-mappings of primary standards, **not legal
> advice** — counsel before publishing a license chooser. License/vendor landmines are flagged inline. Any claim
> not directly fetched from a primary source is marked UNVERIFIED in the source docs.

## The one-line answer

**Ship invisible, account-keyed signed provenance in `XRAI.json` NOW (zero friction, no chain, no wallet); make
on-chain minting an OPT-IN button LATER (thirdweb, gas-sponsored, no seed phrase).** All three spikes point here:
minting is greenfield, the standards are plug-and-play SDKs, and the only real gap is a `license` field.

## Why this shape (what the three spikes agreed on)

1. **Backend audit → greenfield + rails already exist.** No wallet/chain/contract code anywhere. But
   `XraiDoc.author {type,id}` (`XraiWebBridge.ts:23-27`), remix **lineage** `metadata.parents[]` (`shareCodec.ts:99-118`),
   Firestore `scenes.ownerId`/`posts.userId`, and an **immutable write-once `assets/{assetId}` registry**
   (`firestore.rules:145-150`) are already there. **Only gap: a `license` field** (format spec flags it unimplemented,
   `XRAI_FORMAT_SPECIFICATION_V2.md:105`). The "old coin" = **HMMM token** (2022, being scrubbed) — unrelated to the
   live off-chain **Fuel** points system. So: build a `license`+signature stamp on the existing model → nearly free.
2. **Standards → nothing to invent, all SDKs exist.** creator/coAuthors = W3C **DID**; when = ISO 8601; rights =
   **SPDX** id (+ **ODRL** only for negotiated co-author terms); lineage = `parents[]` (PROV-O `wasDerivedFrom`);
   integrity = W3C **Data Integrity proof**, plus optional embedded **C2PA** manifest for Content-Credentials interop.
3. **Minting SOTA → hybrid beats chain-first.** A self-signed C2PA-style manifest keyed to the Portals account =
   **friction 1** (invisible, no wallet). **thirdweb** (official Unity/Unreal/.NET SDKs, chain-agnostic, gas-sponsored
   Account Abstraction, free ≤1K wallets) is the opt-in on-chain layer *if/when* players want tradeable proof.
   **Landmines:** pure C2PA does **not** prove creator identity (tool-attribution only) → must pair with an
   account-linked signing key; **Story Protocol** core is **BSL-1.1** (not permissive); **Reservoir** pivoted away
   from NFT tooling. → don't chain-lock before there's evidence players want on-chain proof.

## The `XRAI.json` provenance/license block (concrete schema)

Additive, backward-compatible; reuses `author`+`parents` already in the format. `_` = optional.

```jsonc
{
  "provenance": {
    "creator": "did:web:portals.app:u:jamestunick",   // W3C DID — upgrades existing author {type,id}
    "coAuthors": [],                                    // tier 3 only: [did, ...]
    "created": "2026-07-10T18:00:00Z",                  // ISO 8601
    "app": "portals/jarvis-hyperjam@0.1.0",
    "parents": [],                                      // remix lineage = existing metadata.parents[] (PROV-O wasDerivedFrom)
    "license": {
      "tier": "private-reserved | private-remix | collective",
      "spdx": "LicenseRef-AllRightsReserved",           // or CC-BY-4.0 / CC0-1.0 / CC-BY-SA-4.0 / GPL-3.0-only …
      "_odrl": null                                     // tier 3 only: ODRL Agreement (machine-readable co-author terms)
    },
    "proof": {                                          // W3C Data Integrity — signs the canonicalized asset
      "type": "DataIntegrityProof",
      "created": "2026-07-10T18:00:00Z",
      "verificationMethod": "did:web:portals.app:u:jamestunick#key-1",
      "proofValue": "z…"                                // tier 3 → array (one signature per co-author)
    },
    "_c2pa": null                                       // optional embedded C2PA manifest where the asset supports binary embed
  }
}
```

### The 3-tier chooser (start simple — the only thing the player sees)

| tier | player picks | spdx | coAuthors | odrl | proof |
|---|---|---|---|---|---|
| **Private · all rights reserved** | 🔒 "Mine, all rights reserved" | `LicenseRef-AllRightsReserved` | — | — | 1 |
| **Private · Creative-Commons remix** | 🔁 "Mine, but others may remix (CC)" | `CC-BY-4.0` / `CC-BY-SA-4.0` / `CC0-1.0` | — | — | 1 |
| **Collective · co-authored** | 👥 "Made together" → invite co-authors → pick © or copyleft | group-chosen | `[did,…]` | Agreement | N (multi-sig) |

Default = **Private · all rights reserved** (safest). The player sees a 1-tap choice; everything else is automatic.

## Phased plan

- **Phase 1 — invisible provenance (build now, zero friction, no chain).** At "save my creation": stamp the block
  above, sign with the Portals-account key (closes the C2PA identity gap), write the record to the immutable
  `assets/{assetId}` registry. Pure-TS `provenance.ts` seam (graduates to Unity + RN like every other seam) +
  a loop-green self-test. Player friction = the 1-tap tier choice, nothing more.
- **Phase 2 — opt-in on-chain mint (later, only if wanted).** A "Mint on-chain" button → thirdweb embedded wallet
  (email/passkey, no seed phrase) + gas-sponsored AA → anchors the asset hash. An *anchor on top*, never a prerequisite.
- **Phase 3 — interop.** Embed a real C2PA manifest for assets that support it; optional VC/CAWG identity wrapper.

## Copyright of OUR work vs player creations

- The **templates/engine** (Blades, Archetype Hunt, the scale-template + seams) are **© James Tunick**, provenance to
  him — stamp the same block with `creator = James's DID`, `LicenseRef-AllRightsReserved` on the template assets.
- **Player creations** get the **player's** DID as creator; if they remix a Portals template, that template's id goes
  in `parents[]` (lineage back to us) — "provenance just like any portal," automatically.

## Recommendation

Adopt the schema above; **build Phase 1** as the next loop-green increment (the `license`/signature stamp is the one
missing piece and it's small); defer thirdweb minting to an opt-in button once there's demand. Reuse SDKs
(`spdx-license-list`, `digitalbazaar/vc` + `did-key`, `c2pa-rs`, ODRL JSON-LD) — Portals designs no new protocol.
