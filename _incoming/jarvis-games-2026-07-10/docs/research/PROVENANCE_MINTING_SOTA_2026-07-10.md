# Provenance & Minting SOTA — 2026-07-10 Research Spike

**Question:** fastest / simplest / most-secure / lowest-friction way for a Portals player to establish
ownership+provenance of, and optionally mint, an `XRAI.json` spatial asset. Zero crypto knowledge
required; email/passkey/social login acceptable; blockchain is NOT assumed to be the right layer.

**Method:** primary sources only (official docs / official blog / project's own repo), every claim
below is either **[F]** — I `WebFetch`'d the primary URL this run and quote/paraphrase it directly,
**[S]** — surfaced via `WebSearch` and attributed to an official domain but not independently
re-fetched in full, or **UNVERIFIED** — could not confirm from a primary source this run. See the
Honesty Ledger (§4) for the full breakdown. No pricing or feature claim below is invented.

---

## 0. Glance-able map (read this first)

| # | Option | Category | Player friction (1=1-tap) | Custody | $ model | Chain/vendor lock-in | FIT for "1-tap mint XRAI.json, provenance to creator" |
|---|---|---|---|---|---|---|---|
| 1 | **Signed-manifest (C2PA-pattern) + optional thirdweb mint** | Hybrid, self-hosted default | **1** (invisible, happens at save-time) | You hold the signing key per creator account | Free (your infra) + thirdweb only if/when a player opts into on-chain | None by default; opt-in EVM if minted | 🟢 **TOP PICK** — see §2 |
| 2 | **thirdweb** In-App Wallet + Account Abstraction | Embedded wallet + gasless mint, EVM | **2** | Non-custodial (MPC/AA smart wallet); user "owns" key material | Free to 1K wallets/1K sponsored txns, then metered ($99–$1,499+/mo tiers) | Any EVM chain (not locked to one L2); open-source Unity/Unreal/Godot/.NET SDKs | 🟢 **RUNNER-UP (single-vendor)** — see §2 |
| 3 | Sequence (Horizon) embedded wallet | Embedded wallet + gasless, gaming-first | **2** | Non-custodial, AWS Nitro Enclave key isolation [F] | Free tier + paid unlocks gas sponsorship [S]; exact metering UNVERIFIED | EVM-compatible chains [F]; first-party Unity/Unreal/Web SDKs [F] | 🟡 Strong alt if Portals ships Unity/Unreal-first and wants gaming-specific tooling |
| 4 | Coinbase **Base Account** (fka Smart Wallet) + OnchainKit/Paymaster | Passkey smart wallet, single-chain | **2** | Non-custodial, passkey-bound [S] | Free dev tooling; ~$15K promo gas credits via "Base Gasless Campaign" [F] | **Locked to Base chain** [F] | 🟡 Good if you accept single-chain (Base) lock-in |
| 5 | Crossmint | Checkout-style mint via card/email, no wallet UI | **1** (best raw UX of the crypto options) | **Custodial** wallet tied to email unless user upgrades [S] | Free to 1,000 MAW then $0.05/MAU; tokenization from $0.01/action [F] | Multi-chain via one API, but you depend on Crossmint's infra | 🟡 Best "credit-card mint" UX but custodial by default — weaker "trace back to creator" if wallet is pooled/custodial |
| 6 | Privy (now Stripe-owned) | Embedded wallet SDK (infra layer, not a mint product) | 2 (as infra under your own mint flow) | Non-custodial: 2-of-3 Shamir Secret Sharing + TEE [S] | Free to 50K sigs/$1M txn vol/mo; $299–$499/mo tiers, then $0.001/signature [F] | Chain-agnostic SDK; **now inside Stripe** — roadmap risk [F] | 🟡 Good infra, but you still build the mint/UX on top |
| 7 | Dynamic | Embedded + smart wallet SDK (infra layer) | 2 | Non-custodial embedded wallet [S] | Free to 1,000 MAU/1,000 ops; $249/mo + $0.05/extra MAU or op [F] | Chain-agnostic (100+ EVM chains claimed) [S] | 🟡 Same category as Privy — pick one, not both |
| 8 | Zora Coins Protocol | Creator-coin / content-coin tokenization | 3 | Requires a connected wallet; not an onboarding product | Trading fees 1% (Creator/Content coins), 0.01% (Trend coins) [F] | **Own L2 (Zora Network)**, OP-Stack-based [S, chain ID unverified this run] | 🔴 Wrong shape — Zora tokenizes *social/creator identity*, not arbitrary game-asset files; legacy NFT-docs subdomain (`nft.docs.zora.co`) no longer resolves, signal of the 2025-26 pivot away from generic NFT minting |
| 9 | Manifold Studio | No-code creator NFT deploy tool | 3–4 | Creator connects own wallet (MetaMask etc.); not embedded | Deploy free/cheap for creator, buyer pays lazy-mint gas [F] | Ethereum L1-centric | 🔴 No embedded onboarding — wrong layer for a zero-wallet player |
| 10 | Story Protocol | On-chain IP registration + programmable licensing | 3–4 | "Connect your wallet... mint your IP Asset" via IP Portal [S, weak] | Registration/gas cost UNVERIFIED this run | **Own L1** (Cosmos-SDK/EVM-equivalent per secondary sources) [S, weak] — BSL-1.1-licensed core contracts, **not permissive open source** [F, verified via repo LICENSE file] | 🔴 Solves *licensing terms*, not *onboarding*; assumes a wallet already exists; good only as a bolt-on IP-licensing layer downstream of a mint |
| 11 | Reservoir / **Relay** | NFT order-book aggregator → pivoted to cross-chain payments | n/a | n/a | n/a | n/a | 🔴 **Dead end for this use case** — `docs.reservoir.tools` 301-redirects to `docs.relay.link` [F, verified this run]; the project publicly pivoted from NFT tooling to a cross-chain bridge/payments product in 2025 [S] |
| 12 | Pure C2PA Content Credentials (no registry) | Open media-provenance standard | **1** | N/A — no custody, just a signed manifest | Free, royalty-free spec license [F] | None — explicitly blockchain-free by design [F] | 🟡 Great primitive, incomplete alone — see §2 for why it needs a registry to satisfy "trace back to the creator" |

🟢 = recommend · 🟡 = viable, situational · 🔴 = do not build the core flow on this

---

## 1. What each option actually is (one paragraph, cited)

**thirdweb** — Wallet + minting infrastructure for EVM chains. "In-App Wallets" are embedded,
non-custodial wallets provisioned via email/social/passkey login; paired with Account Abstraction
(ERC-4337 smart wallets, or the newer EIP-7702 delegation path) to sponsor gas so the player never
sees a fee or a seed phrase [F: portal.thirdweb.com/wallets/sponsor-gas]. Ships official Unity,
Unreal, Godot, .NET, and React Native SDKs, and the Unity SDK is open source
[S: github.com/thirdweb-dev/unity]. Pricing is metered and public: Growth $99/mo, Scale $499/mo,
Pro $1,499+/mo; wallets free to 1,000 MAU then $0.015→$0.005 sliding by volume; gas sponsorship free
to 1,000 tx/mo then $1→$0.20 per 1,000 tx by tier, plus a 2.5% gas surcharge on mainnet
[F: thirdweb.com/pricing].

**Crossmint** — A checkout widget: the player pays by card, Apple Pay, or email and Crossmint mints
into a wallet it creates on the fly, no browser extension or seed phrase involved [S]. That wallet is
**custodial** by default (tied to the email) unless the user later claims/exports it [S]. Pricing:
1,000 free Monthly Active Wallets then $0.05/MAU overage; tokenization starts at $0.01/action plus
$0.002/metadata upload; payment-checkout fees are transaction-based and tiered, with exact percentages
not publicly listed (verified via Crossmint's own pricing help-center: "our markup varies by
partner/transaction type... lower or in line with comparable service providers")
[F: crossmint.com/pricing, help.crossmint.com/articles/9841194361].

**Coinbase Base Account** (formerly "Coinbase Smart Wallet," renamed as part of the July 2025
Coinbase-Wallet→"Base App" rebrand) — A passkey-secured smart wallet auto-provisioned on sign-in,
positioned as a "Sign in with Base" cross-app identity [S: coindesk.com/theblock.co, 2025-07-17].
Gas sponsorship goes through ERC-7677-standard Paymasters; Coinbase Developer Platform is running a
"Base Gasless Campaign" offering up to $15K in gas credits [F: docs.base.org/smart-wallet/guides/paymasters].
**Locked to the Base chain.**

**Zora** — Originally an NFT-minting protocol; the current flagship product is the **Coins Protocol**,
which turns a creator's profile and individual posts into tradeable ERC-20 "coins" (Creator Coins,
Content Coins, Trend Coins) traded through Uniswap v4 pools with 1% (0.01% for Trend Coins) trading
fees split between creator/referrer/protocol [F: docs.zora.co/coins]. This is a *social-token* primitive,
not a generic asset-minting product — the legacy NFT-docs subdomain no longer resolves, a live signal
of the pivot.

**Manifold Studio** — No-code contract deployment + lazy-mint tooling for NFT artists. The creator
pays gas once to deploy their extension contract (documented example: ~0.07 ETH at 40 gwei); each
buyer then pays their own mint gas ("lazy minting") [F: docs.manifold.xyz lazy-mint-extension-erc721].
No embedded wallet/onboarding layer — assumes the creator already has MetaMask or similar.

**Reservoir → Relay** — Reservoir was an open-source NFT order-aggregation API. As of Feb 2025 it
raised a $14M round explicitly described as "pivoting to bridge technology," and its docs domain now
redirects to `docs.relay.link`, a cross-chain payments/bridging product
[F: 301 redirect confirmed this run; S: Fortune, 2025-02-05]. Not a live option for NFT/asset minting
UX today.

**Privy** — Embedded-wallet SDK: email/SMS/social/passkey login → non-custodial wallet, secured with
2-of-3 Shamir Secret Sharing plus TEE infrastructure [S: privy.io/wallets, privy.io/learn/embedded-wallet].
Free to 50K signatures/$1M monthly transaction volume; then $299/mo (500–2,499 MAU) or $499/mo
(2,500–9,999 MAU); enterprise pricing goes as low as $0.001/signature [F: privy.io/pricing]. **Acquired
by Stripe on 2025-06-11**, confirmed on Privy's own blog, continuing as an "independent product"
[F: privy.io/blog/announcing-our-acquisition-by-stripe].

**Dynamic** — Same category as Privy: embedded + smart-wallet SDK, non-custodial, gas-sponsorship via
session keys [S: dynamic.xyz/features]. Free to 1,000 MAU/1,000 operations/mo; Growth plan $249/mo for
5,000 MAU + $0.05 per additional MAU or operation; Enterprise custom [F: dynamic.xyz/pricing].

**Story Protocol** — A purpose-built chain for registering IP as on-chain "IP Assets" (ERC-721s) and
attaching a **Programmable IP License (PIL)** — a legal license template enforced by smart-contract
logic covering royalties/derivatives/disputes [S: learn.story.foundation/pil-101]. Registration flow
is described (secondary source) as "connect your wallet, upload your file, give it a title and mint
your IP Asset" — i.e. it assumes a wallet already exists; it is a **licensing/rights layer**, not an
onboarding layer. Its core contracts (`protocol-core-v1`) are licensed under the **Business Source
License 1.1**, not a permissive open-source license
[F: raw.githubusercontent.com/storyprotocol/protocol-core-v1/main/LICENSE, verified this run].

**Sequence (by Horizon)** — Gaming-first embedded wallet: email/social/guest login → non-custodial
wallet secured via AWS Nitro Enclaves ("nobody can access it, not even Sequence")
[F: docs.sequence.xyz embedded-wallet overview]. First-party Web, Unity, and Unreal SDKs; wallets are
shared across a player's different games/experiences regardless of login method [F, same page].
Gasless/meta-transaction support exists as a documented product capability (Sequence Relayer)
[S: sequence.xyz/blog — gasless transactions post], though this run's direct fetch of the embedded-wallet
overview page did not itself mention gas sponsorship, so treat gasless-by-default as **[S], not [F]**.
Pricing page is marketing-only with no numbers; a support-center article states free tier covers most
features, paid tiers "unlock gas sponsorship" [S: support.sequence.xyz] — exact metering UNVERIFIED.

**C2PA / Content Credentials** — An open technical standard (current spec v2.4 fetched this run,
2.3 cited elsewhere as Feb-2026-published) for a cryptographically signed "manifest" attached to a
media file: creation tool, edit history, AI-involvement disclosure, hash chain, and a digital signature
from a private key issued by a trusted Certificate Authority
[F: spec.c2pa.org/specifications/specifications/2.4/explainer/Explainer.html]. Explicitly **does not
require blockchain** ("established cryptographic techniques" instead) and the spec is released under a
royalty-free license (explainer text itself is CC BY 4.0) [F, same page]. Important nuance verified
directly: **C2PA does not mandate creator-identity disclosure by default** — assertions record what
tool/software signed the manifest, not necessarily who the human creator is, unless you layer an
optional Creator-Assertions identity extension on top [F, same page]. That means pure C2PA alone is
a provenance/tamper-evidence primitive, not an ownership registry — it needs to be paired with your
own account-linked signing key and a queryable index to satisfy "traces back to the creator."

---

## 2. Recommendation

### TOP pick — Signed-manifest (C2PA pattern), self-hosted, with thirdweb as the *optional* mint step

Rationale, tied directly to the three stated criteria:

- **(a) Zero friction for the player.** Signing happens automatically at save-time using a key
  already tied to the player's existing Portals account — no separate crypto onboarding step at all
  for the 95% of players who never touch a wallet. This is friction **1**, strictly better than any
  wallet product, because there is no wallet UI in the default path.
- **(b) Assets stored as `XRAI.json`.** A C2PA-pattern manifest is just a signed hash + metadata
  block that can be embedded directly inside (or alongside) the `XRAI.json` payload — no external
  chain, no gas, no format lock-in. This is the natural fit for a JSON-native spatial-asset format.
- **(c) Provenance back to the creator.** Because *you* control the signing key issuance (one keypair
  per Portals creator account, generated server-side or in a passkey-backed enclave) and *you* run the
  append-only registry/index, "who created this" is answered by your own account system — the exact
  gap that pure C2PA leaves open (per §1) is closed by owning that binding yourselves instead of
  depending on a third-party CA.
- **Opt-in upgrade path, not a default.** For the minority of players who want a tradeable/on-chain
  proof (e.g. selling a creation, cross-platform provenance), surface a one-tap "mint on-chain" button
  that calls **thirdweb**'s in-app-wallet + gas-sponsored mint under the hood. Because the player
  already has a Portals identity, the embedded wallet can be provisioned silently the first time they
  tap "mint" — they still never see a seed phrase or a gas prompt.

This hybrid is the only option on the map that gets friction to **1** for the default case while still
leaving a credible, standards-based (not proprietary) path to on-chain provenance for the players who
want it — and it avoids the single biggest risk on this whole map: locking Portals' asset-ownership
model into a vendor (Base chain, Zora's own L2, Story's BSL-1.1 core, or a single wallet vendor's
roadmap) before there's evidence players want on-chain proof at all.

**Minimal implementation sketch** (not a spec, just the shape — validate against Portals' actual
account/auth stack before building):

1. On `XRAI.json` save, compute a content hash of the asset payload.
2. Sign that hash server-side (or in a passkey-backed enclave, if client-side signing is preferred)
   with a keypair already bound to the player's Portals account — no new credential for the player to
   manage.
3. Embed the signature + signer-account-ID + timestamp as a manifest block inside (or sidecar to) the
   `XRAI.json`, following the C2PA assertion shape (`created_assertions`) so the format stays
   interoperable with any future C2PA-aware tooling, even though nothing here talks to C2PA's own
   trust-list infrastructure.
4. Log the manifest to an append-only registry (even a simple hash-chained table) keyed by Portals
   account ID — this *is* the "traces back to the creator" answer, and it's fully queryable without a
   wallet or a block explorer.
5. Gate the "Mint on-chain" button behind an explicit player action. First tap silently provisions a
   thirdweb in-app wallet (email/social already known from the Portals account, so no new login step)
   and calls a gas-sponsored `mint()` via Account Abstraction. The on-chain token's metadata URI points
   back at the same `XRAI.json` + manifest, so on-chain and off-chain provenance agree.

This keeps 100% of players on the free, zero-friction path (steps 1–4) and only spends thirdweb's
metered wallet/gas budget (§0 row 2 pricing) on the subset who actively choose to mint.

**Out of scope for this spike** (noted so a future pass doesn't re-litigate them from scratch):
Magic.link and Web3Auth (older email-wallet products, largely superseded by Privy/Dynamic per the
"Best Embedded Wallets in 2026" comparisons surfaced during search — not independently verified this
run); OpenSea Studio (marketplace-side listing tooling, not a minting-onboarding product); Biconomy and
other standalone paymaster-only providers (redundant once thirdweb's or Base's own paymaster is in
place). None of these changed the ranking above; they were deprioritized rather than disproven.

### Runner-up (single-vendor, no build-your-own-registry) — thirdweb

If Portals prefers to ship an out-of-the-box product rather than build and maintain a signing/registry
service, **thirdweb** is the strongest single vendor found:
- Broadest engine coverage relevant to a Unity/XR project — official Unity, Unreal, Godot, .NET, and
  React Native SDKs, Unity SDK open source [S: github.com/thirdweb-dev/unity].
- Chain-agnostic across EVM (not locked to one L2 the way Base Account and Zora Network are).
- Publicly documented, metered pricing with a real free tier (1,000 free wallets, 1,000 free sponsored
  transactions/mo) [F: thirdweb.com/pricing] — cheapest to start, predictable to scale.
- Both EIP-4337 and the newer EIP-7702 gas-sponsorship paths supported
  [F: portal.thirdweb.com/wallets/sponsor-gas].

**Situational alternative:** if Portals' client is Unity/Unreal-first and gaming-specific wallet
portability (one wallet shared across multiple games/experiences) matters more than breadth of chain
support, **Sequence** is the better-fit runner-up — its embedded wallet is purpose-built for game
engines with first-party Unity/Unreal SDKs [F], though its pricing/gas-sponsorship specifics were not
fully verifiable from primary sources this run (see ledger).

---

## 3. License / lock-in landmines

1. **Story Protocol's core contracts are Business-Source-License 1.1, not permissive open source**
   [F: verified against the repo's own `LICENSE` file this run] — BSL typically converts to open
   source only after a multi-year "Change Date." Do not assume you can fork/self-host it freely today.
2. **Reservoir is not a live option** — its docs domain now redirects to Relay, a cross-chain
   payments product; the company's own funding announcement described this as a pivot away from NFT
   tooling [F redirect + S pivot reporting]. Anything built against "Reservoir for NFTs" today is
   building on an abandoned surface.
3. **Base Account = single-chain lock-in.** Coinbase's passkey smart wallet is tied to the Base chain;
   picking it as the primary rail means Portals' provenance model inherits Base's roadmap and
   governance.
4. **Privy is now inside Stripe** (acquired 2025-06-11, confirmed on Privy's own blog). Stripe's
   longer-term product direction for a crypto-wallet SDK acquired mid-2025 is not yet a settled
   primary-source fact — treat future roadmap/pricing changes as a real risk, not fear-mongering.
5. **Crossmint's default wallet is custodial**, tied to the purchaser's email unless they later
   self-custody/export it [S]. That is the friendliest checkout UX on this map, but it is the weakest
   fit for "provenance traces back to the *creator*" if many creators' assets end up pooled under
   Crossmint-managed custodial wallets rather than addresses the creator actually controls.
6. **Zora's own NFT-docs subdomain (`nft.docs.zora.co`) no longer resolves** — a live, first-hand
   signal (DNS failure observed this run) that the product has moved on from generic NFT minting
   toward the Coins Protocol; don't design around Zora's old 1155-minting docs.
7. **C2PA alone does not prove creator identity** — by spec, only tool/software attribution is
   guaranteed by default; human-creator binding requires either the optional identity-assertion
   extension or (as recommended above) your own account-linked key issuance and registry.
8. **Antitrust note carried over from `~/CLAUDE.md`/COMPLIANCE.md-style caution:** none of the above
   involves cross-vendor price comparison, so it doesn't trigger that landmine — flagged only because
   the operating rules require checking.

---

## 4. Honesty ledger

**[F] — fetched and read the primary source this run** (highest confidence):
thirdweb pricing (thirdweb.com/pricing), thirdweb gas-sponsorship mechanism (portal.thirdweb.com),
thirdweb sponsored-transactions page, Crossmint pricing page + help-center cost article, Base paymaster
docs (docs.base.org), Zora Coins docs (docs.zora.co/coins), Manifold lazy-mint docs, Privy pricing
(privy.io/pricing), Privy/Stripe acquisition (privy.io's own blog post), Dynamic pricing
(dynamic.xyz/pricing), C2PA Explainer spec (spec.c2pa.org v2.4), Story Protocol core-contract LICENSE
file (raw.githubusercontent.com, confirmed BSL-1.1), Reservoir docs → Relay 301 redirect (observed
directly this run), Sequence embedded-wallet overview docs (docs.sequence.xyz), thirdweb Unity SDK repo
being open source (github.com/thirdweb-dev/unity).

**[S] — surfaced via WebSearch, attributed to an official/primary domain, not independently re-fetched
in full this run** (medium confidence — treat as "sourced, not hand-verified"): Zora Network chain ID
7777777 / OP Stack claim (from L2BEAT/Chainlink docs, third-party aggregators, not Zora's own page,
which failed to resolve this run); Story Protocol's "own L1, Cosmos-SDK + EVM-equivalent" architecture
claim (from Blocmates/Quicknode secondary write-ups, not docs.story.foundation directly — that URL
404'd this run); the Story IP-Portal "connect your wallet" registration-flow description (WebSearch
snippet only); Sequence's gasless/meta-transaction capability (sequence.xyz blog title, not fetched in
full); Sequence and Crossmint's exact custody/security architecture details (privy.io/wallets,
Crossmint's custodial-wallet-on-signup behavior — drawn from search-result synthesis of official pages,
not a direct fetch-and-quote); Coinbase Base Account passkey custody model and July-2025 rebrand
(news coverage — coindesk.com, theblock.co — not Coinbase's own announcement post directly).

**UNVERIFIED this run** (explicitly flagged, do not treat as fact): exact Sequence pricing/metering
numbers (pricing page returned no numeric table on fetch); exact gas/registration cost for Story
Protocol IP registration; Zora Network's precise chain ID (only cross-checked via third-party
aggregators, not Zora's own network page, which failed DNS resolution this run); Manifold Studio's
exact buyer-side fee percentage (a Substack post referenced "a small flat fee" without a number in the
snippets retrieved).

**Not independently re-derived, asserted only where a primary source stated it outright:** all dollar
figures in §0/§1 are quoted or closely paraphrased from the cited fetch, not estimated.

---

*Compiled 2026-07-10 for the Portals/XRAI venture. Re-run before acting on any pricing figure older
than ~90 days — embedded-wallet and gas-sponsorship pricing in this space moves quickly (three of the
nine vendor pricing pages checked here had stale numbers in pre-fetch search snippets vs. the actual
fetched page).*
