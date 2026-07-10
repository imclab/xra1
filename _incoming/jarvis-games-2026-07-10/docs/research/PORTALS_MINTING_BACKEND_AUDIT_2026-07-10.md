# Portals v4 — Minting / Blockchain / Provenance Backend Audit

**Date:** 2026-07-10
**Scope:** Read-only code audit. `src/`, `unity/Assets/`, `server/` (does not exist — see below), `functions/`, `specs/`, `.xrai/`. Excludes `node_modules`, `dist`, `.git`, third-party vendored code under `.xrai/_ref/`.
**Question:** Does real minting/blockchain/wallet/web3/coin/token infra exist, and what creator-ownership/provenance model already exists to build frictionless XRAI-asset minting on top of?

---

## (a) Real blockchain/wallet/mint/NFT/web3/coin code — verdict: GREENFIELD, confirmed

No blockchain SDK, wallet-connect library, smart-contract code, or on-chain minting logic exists anywhere in the app or Unity trees. Evidence:

- `package.json` — zero hits for `web3`, `ethers`, `wallet`, `solana`, `thirdweb`, `moralis`, `walletconnect`, `@solana/*`, `coinbase`. No such dependency exists.
- `unity/**/manifest.json` (Unity Package Manager manifests) — zero hits for `web3`/`wallet`/`blockchain`/`thirdweb`/`moralis`.
- `functions/` (Firebase Cloud Functions) — zero hits for `web3`/`wallet`/`blockchain`/`mint`/`nft`/`coin`.
- Repo-wide grep for `web3|blockchain|wallet|solidity|ethereum|erc-?721|erc-?1155|nft` across `src/`, `unity/Assets/`, `server/`, `specs/`, `.xrai/` returned only:
  - Legal boilerplate text: `src/screens/PrivacyPolicyScreen.tsx:27-194` and `src/screens/TermsOfServiceScreen.tsx:26-217` — a generic "crypto/staking/wallet-connection" privacy policy and ToS template with **no corresponding implementation**. It references "public wallet address," "blockchain indexers," "staking eligibility" as legal boilerplate only; no code path produces or consumes any of these.
  - One string label: `src/mock/index.ts:72` — `description: 'Display your NFTs in style.'` (mock marketing copy for a demo profile card, not functional).
  - Third-party vendored/reference code unrelated to this product: `.xrai/_ref/TamagotchU` (RayFire physics asset, "RFMaterial"/"RFPhysic" false-positive on "coin"-adjacent terms), `.xrai/_ref/echarts-6.0.0` (province map data, false positives), `.xrai/_ref/MediaPipeUnityPlugin`, `.xrai/_ref/URP-WebRTC-Convai-2025/OpenCVForUnity` — all unrelated open-source dependencies pulled into `.xrai/_ref/` as reference material, not Portals code.
  - `unity/Assets/Imported/MetavidoLiveARKit/.../LiveARKitFeeder.cs` — false positive (matched on unrelated substring, not "wallet").
- `"mint("` / "mint-guard" grep hits are false positives unrelated to coins:
  - `.claude/hooks/tasklist-mint-guard.sh` (git commit `3010cd4be`) — a Claude-Code doc-write guard that blocks **minting a new status/handoff doc** (SSOT-ring hygiene), nothing to do with tokens.
  - Git commits `1eb2dac1c` / `0b0555931` "token mint" — **LiveKit access-token minting** (JWT for WebRTC audio/video rooms via LiveKit's `AccessToken` API), a standard auth-token pattern, not a blockchain/coin token.

**Conclusion: (a) CONFIRMED greenfield.** There is no wallet connection, no chain RPC client, no contract ABI, no mint transaction code, no on-chain or off-chain NFT logic anywhere in the implemented product. The only "blockchain" surface area is unused legal-policy prose.

---

## (b) What the "old coin being phased out" refers to

Confirmed via `specs/XXX-zero-to-one/spec.md:166` and `specs/XXX-zero-to-one/SUMMARY.md:124`:

> "**Web3/NFT residue** — HMMM token, staking page, 2022 whitepaper still indexed"

This is **H3M Inc.'s prior product identity** — before the pivot to Portals/XRAI spatial computing, the company (H3M) ran a web3/crypto venture called **"HMMM"** with its own token (the "HMMM token"), a staking page, and a 2022 whitepaper, hosted at the domain `hmmm.exchange` (`specs/XXX-zero-to-one/spec.md:164`, `SUMMARY.md:122`). This is now legacy brand/SEO residue the team is actively trying to **scrub**, not a system still in use:

- `specs/XXX-zero-to-one/spec.md:1068-1069` — task #11/#12 (owner: Ryan, due 2026-04-27 / 2026-05-07): "Crunchbase/PitchBook/LinkedIn V4 update + Web3 scrub … Profiles show V4, no HMMM token refs" and "Consolidate domains (h3m.ai canonical) … `hmmm.exchange` + `h3m.studio` → 301 redirect."
- `docs/archive/kb-followups/20260220_notion_figma_review.md:161,174` — "HMMM token residue … Clean up digital trail — remove or distance from HMMM token associations."
- `src/screens/PrivacyPolicyScreen.tsx` / `TermsOfServiceScreen.tsx` (H3M / PORTALS legal docs, still shipped in-app) are very likely leftover legal templates from that HMMM/crypto era — they are the one place "wallet/staking/crypto" language still lives in the live codebase, and are a scrub candidate consistent with the roadmap task above.

**Conclusion: (b) CONFIRMED.** "Old coin" = the **HMMM token** (H3M's 2022 web3/crypto product, with a staking page and whitepaper), being actively phased out per the product roadmap — not a system currently wired into Portals.

Note: Portals does have a live **off-chain, Firestore-backed in-app point system called "Fuel"** (`src/services/FuelService.ts`, `src/types/index.ts:17,21-26`) — earn-by-walking / spend-to-unlock XP with `fuelBalance` and `fuelStats` fields on the `users/{uid}` document. This is NOT a coin/token/blockchain asset (no chain, no wallet, pure Firestore `increment()` transactions) — flagging it only because it's the closest thing to a "coin-like" concept live in the app today, distinct from the legacy HMMM token.

---

## (c) Existing provenance / ownership model to build the creator-provenance stamp on

Portals already has a real, working, two-layer ownership + lineage model: Firestore security-rule-level ownership, typed document fields, and — most directly reusable — an **XRAI-document-level author + parent-lineage chain** that already does almost exactly what's being asked for ("every creation is an XRAI.json asset, provenance tracks back to the creator").

### C1. XRAI document schema — author + lineage (the direct answer)

`src/services/xrai/XraiWebBridge.ts:23-42` — canonical `XraiDoc` TypeScript interface (every scene/asset saved as XRAI):
```
export interface XraiDoc {
  xrai_version: string;
  id: string;
  created_at: string;
  author: { type: string; id: string };        // <-- creator stamp, line 27
  origin: { app: string; version: string; scene: string };
  agent_dna?: { ... };
  scene: { anchors, entities, relations, events };
  metadata?: Record<string, unknown>;
}
```
- `src/services/xrai/XraiWebBridge.ts:86-100` — `newScene()` stamps `author: { type: 'human', id: opts.author || 'portals-ios' }` on every new XRAI doc (line 91).
- `src/services/xrai/shareCodec.ts:99-118` — `remix()` is the **existing provenance/lineage function**: clones a doc, assigns a new id, and records lineage as `metadata.parents[]` (full ancestor chain, line 104) + `metadata.parent_id` (immediate parent, line 113), while re-stamping `author: { type: 'human', id: opts.author || 'anon' }` (line 109) to the new creator. This is the "provenance tracks back to the creator, just like any portal" mechanism already built and tested (byte-parity with the web port enforced by `src/__tests__/services/xrai/xraiParity.test.ts`).
- `src/services/xrai/XraiSceneIO.ts:42-56` — RN-side `remixScene()` wraps the above for the mobile app: "Clone the active scene as a remix (new id + lineage in metadata.parents[])."
- `src/services/xrai/XraiAdapter.ts:131-133,235,281,487-488` — every scene-construction path (`figmentSceneToXrai`, advanced composer, etc.) threads an `author` option into `newScene()`; `addedBy` field (line 235) tracks per-object contributor within a scene.
- Format spec: `specs/XRAI_FORMAT_SPECIFICATION_V2.md:143` (`"author": "user@example.com"`) and `:174` (`author` field table, optional user identifier) — documents `author` on `XRAI_scene_context.metadata`. **Gap to note:** the same spec doc, line 105, still lists "Collaboration metadata — Author, license, remix chain" as a **future/unimplemented** extension — i.e. the spec doc is stale; the actual `shareCodec.ts`/`XraiWebBridge.ts` code already implements author + full remix/parents lineage. A license field is NOT yet present anywhere in `XraiDoc`/`metadata` — that would be the one net-new field needed for a creator+license stamp.

### C2. Firestore-level ownership (security-rule-enforced)

`firestore.rules`:
- `scenes/{sceneId}` — `ownerId` is the authority field: create requires `request.resource.data.ownerId == request.auth.uid` (line 90); read/update/delete gated on `resource.data.ownerId == request.auth.uid` or membership in `resource.data.collaborators` (lines 85-95); sub-collections `metadata/`, `manifest/`, `versions/`, `objects/` (lines 97-120) all inherit the parent scene's `ownerId` check.
- `drafts/{draftId}` — same pattern keyed on `userId` instead of `ownerId` (lines 124-134).
- `posts/{postId}` — `userId` is the owner field (lines 51-55); `comments` sub-collection owner-gated on `userId` (line 60).
- `users/{userId}` — `isOwner(userId)` helper (lines 10-11) is the root ownership primitive reused everywhere.
- `assets/{assetId}` — a **"global dedup registry"** collection already exists (lines 145-150): any signed-in user may `create`, but `update`/`delete` are permanently disallowed (`allow update, delete: if false`) — i.e. assets are already treated as immutable once minted into this registry. This is the closest existing analog to an on-chain "mint" (write-once, content-addressed-style asset record) and a natural place to attach a creator+license stamp for XRAI assets.

### C3. TypeScript document fields (app-level types)

- `src/types/index.ts:65-110` (`Post` interface) — `userId: string` (line 67, creator), `remixedFrom?: { postId, userId, username, avatar }` (lines 102-107, **existing remix/lineage pointer at the Post level**, parallel to the XRAI `parents[]` mechanism).
- `src/types/index.ts:149-160` (`Draft` interface) — `ownerId?: string // Original creator ID` (line 159), `collaborators?: string[]` (line 158).
- `src/types/portal.ts:212-218` (`PortalLockRecord`) — `userId`/`portalId` pairing for per-user portal locks (Firestore path `portalLocks/{portalId}/locks/{userId}`, line 210) — a different, unrelated ownership concept (access lock, not authorship).

### Reuse recommendation (for the frictionless-minting spike)

The cleanest attach point is `XraiDoc.author: { type, id }` (`XraiWebBridge.ts:27`) plus `metadata.parents[]`/`parent_id` (`shareCodec.ts:104,113`) — already wired through `newScene()`, `remix()`, `remixScene()`, and RN's `DraftService`/`xraiActiveDoc`. To get a "frictionless creator provenance stamp," the missing pieces are: (1) a `license` field alongside `author` in `XraiDoc` (not present today — spec doc flags it as unimplemented at `XRAI_FORMAT_SPECIFICATION_V2.md:105`), and (2) writing that stamp into the already-immutable `assets/{assetId}` Firestore collection (`firestore.rules:145-150`) at save time, keyed the same way `scenes/{sceneId}.ownerId` already is.

---

## File:line index (quick reference)

| Field / mechanism | File:line |
|---|---|
| `XraiDoc.author` | `src/services/xrai/XraiWebBridge.ts:27` |
| `newScene()` author stamp | `src/services/xrai/XraiWebBridge.ts:86-100` (author default line 91) |
| `remix()` lineage (`parents[]`, `parent_id`, re-author) | `src/services/xrai/shareCodec.ts:99-118` |
| RN `remixScene()` wrapper | `src/services/xrai/XraiSceneIO.ts:42-56` |
| `addedBy` per-object attribution | `src/services/xrai/XraiAdapter.ts:235` |
| XRAI format spec `author` field | `specs/XRAI_FORMAT_SPECIFICATION_V2.md:143,174` |
| XRAI spec — license/remix-chain marked unimplemented | `specs/XRAI_FORMAT_SPECIFICATION_V2.md:105` |
| Firestore `scenes.ownerId` rule | `firestore.rules:84-95` (sub-collections 97-120) |
| Firestore `drafts.userId` rule | `firestore.rules:123-135` |
| Firestore `posts.userId` rule | `firestore.rules:50-61` |
| Firestore `assets/{assetId}` immutable registry | `firestore.rules:145-150` |
| `Post.userId` / `Post.remixedFrom` | `src/types/index.ts:67`, `:102-107` |
| `Draft.ownerId` | `src/types/index.ts:159` |
| `FuelService` (off-chain in-app points, NOT a coin) | `src/services/FuelService.ts` (whole file); balance fields `src/types/index.ts:17,21-26` |
| "HMMM token" (old coin) references | `specs/XXX-zero-to-one/spec.md:164,166,1068-1069`; `specs/XXX-zero-to-one/SUMMARY.md:122,124,158,160`; `docs/archive/kb-followups/20260220_notion_figma_review.md:161,174` |
| Legacy crypto/wallet legal boilerplate (unimplemented) | `src/screens/PrivacyPolicyScreen.tsx:27-194`; `src/screens/TermsOfServiceScreen.tsx:26-217` |
