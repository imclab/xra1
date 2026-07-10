# Provenance, Ownership & Licensing Standards for XRAI Assets

Research spike · 2026-07-10 · Portals/XRAI venture
Scope: identify open, secure, transparent, interoperable W3C + worldwide-web standards for
provenance/ownership/licensing of user-created spatial/AI assets (`*.xrai` / `XRAI.json`), and map
them to a 3-tier starter ownership model. Primary sources only, fetched this run. UNVERIFIED where
a claim could not be confirmed from a primary source in this session.

---

## 0. TL;DR — recommended minimal stack

For the `provenance` / `license` block inside `XRAI.json`, five building blocks cover the five
required facets (who / when / what-rights / lineage / integrity) with **zero net-new protocol
design** — every piece is an existing W3C Recommendation, an existing industry spec with
open-source SDKs, or a plain string identifier:

| Facet | Standard | Status |
|---|---|---|
| **who** (creator + co-authors) | `did:` URI (W3C DID Core) as the identifier; optionally wrapped in a **W3C Verifiable Credential 2.0** for the claim, secured by **W3C Data Integrity** | All 3 are W3C Recommendations (DID Core 19 Jul 2022; VC 2.0 + Data Integrity both 15 May 2025) |
| **when** | ISO 8601 timestamp inside the VC (`validFrom`) or C2PA assertion | N/A (existing ISO standard, referenced by VC 2.0) |
| **license / rights** | **SPDX license identifier** (e.g. `CC-BY-4.0`, `CC0-1.0`, `LicenseRef-XRAI-all-rights-reserved`) as the human/legal label, optionally expanded into an **ODRL Policy** for machine-enforceable permissions/prohibitions/duties | SPDX List: Linux Foundation project, de facto web standard; ODRL Information Model 2.2: W3C Recommendation, 15 Feb 2018 |
| **lineage** (remix parents) | **W3C PROV-O** relations `wasDerivedFrom` / `used` / `wasGeneratedBy`, expressed as a small JSON-LD fragment, `parents: [xrai-id, ...]` | W3C Recommendation, 30 Apr 2013 |
| **integrity signature** | **C2PA manifest** (assertions + ingredients + digital signature) embedded in the asset, cross-signed with a **CAWG identity assertion** that itself carries a W3C VC | C2PA: Joint Development Foundation industry spec, not a W3C standard (v2.3 current, 10 steering members incl. Adobe/Google/Microsoft/Meta/OpenAI/Amazon/BBC/Sony/Truepic/Publicis); CAWG builds directly on W3C VC/DID |

**Practical shape:** a small `provenance` object in `XRAI.json` carrying `creator` (DID), `coAuthors`
(DID array), `createdAt` (ISO 8601), `license` (SPDX id or `LicenseRef-*`), `rights` (optional
embedded ODRL Policy for tier 3's negotiated splits), `parents` (PROV-O-flavored lineage array), and
`proof` — either a VC `proof` object (Data Integrity) for lightweight signing, or a pointer to an
embedded C2PA manifest for asset files that support binary embedding (images/video/glTF/USD).
Nothing here requires Portals to invent a new spec — see §5 for the schema sketch and §6 for the
tools that already implement each piece.

---

## 1. Standards survey — maturity & adoption

| Standard | Governing body | Current status | Publication date | Primary source |
|---|---|---|---|---|
| C2PA (Content Credentials) | Coalition for Content Provenance and Authenticity, a Joint Development Foundation (Linux Foundation family) project | Industry specification, **not** a W3C/ISO standard. Spec v2.2/2.3 live; v2.4 in progress | Rolling (v1.0 → v2.x) | c2pa.org, spec.c2pa.org |
| CAWG identity assertion | Creator Assertions Working Group (built on C2PA) | Technical specification (v1.2 current on cawg.io), builds directly on W3C VC 1.1 data model | Rolling | cawg.io/specs/, cawg.io/identity/1.2/ |
| W3C Verifiable Credentials Data Model 2.0 | W3C | **W3C Recommendation** | 15 May 2025 | w3.org/TR/vc-data-model-2.0/ |
| W3C Data Integrity | W3C | **W3C Recommendation** | 15 May 2025 | w3.org/TR/vc-data-integrity/ |
| W3C Decentralized Identifiers (DID) Core 1.0 | W3C | **W3C Recommendation** | 19 Jul 2022 | w3.org/TR/did-core/ |
| W3C PROV-O | W3C | **W3C Recommendation** | 30 Apr 2013 | w3.org/TR/prov-o/ |
| ODRL Information Model 2.2 | W3C | **W3C Recommendation** | 15 Feb 2018 | w3.org/TR/odrl-model/ |
| Creative Commons license suite (BY, BY-SA, BY-NC…, CC0) | Creative Commons (non-profit) | Legal-tool suite, not a W3C standard; near-universal web adoption | Current versions: 4.0 (licenses), CC0 1.0 | creativecommons.org/share-your-work/cclicenses/, creativecommons.org/publicdomain/zero/1.0/ |
| ccREL (CC Rights Expression Language) | Creative Commons | CC-authored spec (uses W3C RDF/RDFa), not itself a W3C Recommendation | Published 3 Mar 2008 | wiki.creativecommons.org/wiki/CC_REL |
| SPDX License List / SPDX Specification | Linux Foundation (SPDX project) | De facto industry standard; ISO/IEC 5962:2021 covers the SPDX **document format** (UNVERIFIED in this run — not fetched) | List currently v3.28.0 | spdx.org/licenses/ |
| choosealicense.com | GitHub, Inc. + community | Not a standard — a curation/UX tool over SPDX-identified OSS licenses | Live site | choosealicense.com |
| glTF `EXT_structural_metadata` | Multi-vendor (`EXT_`) glTF extension, originated at Cesium, implements the **3D Metadata Specification** | Multi-vendor extension (`EXT_` prefix = implemented by ≥2 vendors), not a core-ratified Khronos (`KHR_`) extension as of this check | Rolling | github.com/KhronosGroup/glTF (registry), search-confirmed via GitHub |
| OpenUSD / Alliance for OpenUSD (AOUSD) Core Specification | Alliance for OpenUSD (Linux Foundation family; Pixar, Adobe, Apple, Autodesk, NVIDIA, Amazon, Meta, Intel et al.) | Core Specification **1.0** released as "production-ready open standard"; explicitly a first step toward future **ISO** standardization (not yet ISO) | 17 Dec 2025 | aousd.org/news/core-spec-announcement/ |
| IPTC Photo Metadata Standard + Digital Source Type | International Press Telecommunications Council | Industry standard, long-standing (embedded via XMP); "Digital Source Type" AI-content vocabulary is a recent extension | Standard is mature; AI guidance is recent (2023–2024-era) | iptc.org/standards/photo-metadata/ |
| ML Model Cards | Academic proposal (Mitchell et al., Google), operationalized by Hugging Face Hub | Not a standards-body spec; de facto convention via YAML front-matter in `README.md` | Paper: FAT* '19 (29–31 Jan 2019) | arxiv.org/abs/1810.03993, huggingface.co/docs/hub/model-cards |

Everything in the "W3C Recommendation" rows is a finished, stable, royalty-free-committed Web
standard — the strongest tier for anything Portals wants to be secure/transparent/interoperable
long-term. C2PA, CAWG, IPTC, OpenUSD/AOUSD, and Model Cards are industry specs/conventions with
real multi-vendor adoption but are not W3C/ISO Recommendations (OpenUSD is explicitly *en route* to
ISO per its own December 2025 announcement).

---

## 2. Standard-by-standard notes

### 2.1 C2PA / Content Credentials
C2PA "addresses the prevalence of misleading information online through the development of
technical standards for certifying the source and history (or provenance) of media content"
(c2pa.org). It is organized as a Joint Development Foundation project — explicitly **not** a formal
standards body like ISO or W3C; the homepage footer reads "established as a 'Joint Development
Foundation' Projects, LLC." Steering members shown on the current homepage: Adobe, Amazon, BBC,
Google, Meta, Microsoft, OpenAI, Publicis Groupe, Sony, Truepic (c2pa.org). Spec v2.3 is the version
linked from the homepage's "Adopt" section as of this fetch; the specifications site (spec.c2pa.org)
lists versions up to 2.4 in progress.

**Manifest structure** (spec.c2pa.org/.../Explainer.html): a C2PA **manifest** ("Content Credential")
is "the set of information about the provenance of an asset consisting of one or more **assertions**
that are digitally signed to ensure their authenticity and integrity." Assertions are data
structures stating facts about the asset (origin, edit actions, content hashes). **Ingredients**
record source assets used to compose a new one — "each ingredient... is recorded in that asset's
provenance, including the addition of the provenance of each individual ingredient. This process
creates a tree of provenance, much like a family tree." Ingredient validity is checked and recorded
at incorporation time. Signing uses SHA-2-256 Merkle-tree-style hashing over a standard X.509
credential. AI-generated content is flagged via `digitalSourceType` on the recorded action. Notably,
"the C2PA specification does not directly address the topic of human or organizational identity" by
design (privacy-preserving) — that gap is filled by CAWG (§2.2).

Content Credentials (contentcredentials.org) is "a project hosted by" C2PA, presented as the
consumer-facing "pin" UI for inspecting a manifest; Adobe products and partner cameras are the
cited implementers. **UNVERIFIED**: concrete device/software adoption counts — none were present
in the fetched pages.

### 2.2 CAWG (Creator Assertions Working Group) — the C2PA ↔ W3C bridge
CAWG "is built on the work of" C2PA and defines the **Identity Assertion**, letting a credential
holder "prove control over a digital identity and... document the named actor's role(s) in an
asset's lifecycle" (cawg.io/about/identity-framework/). Critically for the "who" facet, CAWG's specs
"reference the W3C verifiable credentials data model, with definitions adapted from the W3C
verifiable credentials data model specification" and use **DIDs** as the portable identifier
(cawg.io/specs/, cawg.io/identity/1.2/). Two enrollment paths exist: an X.509 certificate (orgs) or
an identity-claims aggregator (individuals). This is the direct, already-built link between the
C2PA binary-asset-signing world and the W3C VC/DID identity world — Portals does not need to invent
this bridge.

### 2.3 W3C Verifiable Credentials Data Model 2.0
**W3C Recommendation, 15 May 2025** (w3.org/TR/vc-data-model-2.0/). A VC is "a tamper-evident
credential whose authorship can be cryptographically verified." Three roles: **issuer** (asserts
claims), **holder** (possesses the credential), **verifier** (checks it). Core fields: `issuer`,
`credentialSubject` (the claims), and `proof` (cryptographic evidence — embedded via Data Integrity,
or enveloping via JOSE/COSE). This decoupling of issuer/holder/verifier is exactly what "creator
signs an ownership claim that anyone can later verify, without a central registry" needs.

### 2.4 W3C Data Integrity
**W3C Recommendation, 15 May 2025** (w3.org/TR/vc-data-integrity/), published alongside VC 2.0. Adds
the `proof` mechanics: `type` (e.g. `DataIntegrityProof`), `cryptosuite` (e.g. `eddsa-rdfc-2022`),
`verificationMethod`, `proofValue`. Three-step pipeline: transform (canonicalize) → hash → sign;
verification reverses it. This is the concrete signature format that turns a JSON-LD "who owns
this" claim into a cryptographically checkable one — the lightweight alternative to embedding a
full C2PA manifest for asset types where binary embedding isn't practical (e.g. a small metadata
side-file).

### 2.5 W3C Decentralized Identifiers (DID) Core 1.0
**W3C Recommendation, 19 Jul 2022** (w3.org/TR/did-core/). A DID is "designed so that [it] may be
decoupled from centralized registries, identity providers, and certificate authorities" — format
`did:method:method-specific-id` (e.g. `did:example:123456789abcdefghi`). The DID Document holds
verification methods (public keys), verification relationships (authentication, assertion, key
agreement), and service endpoints. For XRAI, a DID is the natural `creator`/`coAuthors` identifier:
self-sovereign, no Portals-run identity server required, and directly what CAWG and VC already
expect.

### 2.6 W3C PROV-O
**W3C Recommendation, 30 Apr 2013** (w3.org/TR/prov-o/). Three core classes: **Entity** ("a
physical, digital, conceptual, or other kind of thing"), **Activity** ("something that occurs over
a period of time and acts upon or with entities"), **Agent** ("bears some form of responsibility").
Core relations directly usable for remix lineage: `wasGeneratedBy` (activity → new entity),
`wasAttributedTo` (entity → responsible agent), `used` (activity consumed an entity), and — the
most relevant one for XRAI remixes — `wasDerivedFrom` (new entity ← parent entity). Portals does not
need the full PROV-O RDF/OWL graph; borrowing just the relation *names* as flat JSON keys
(`parents`, `derivedFrom`) keeps the vocabulary standards-aligned without requiring an RDF store.

### 2.7 ODRL Information Model 2.2
**W3C Recommendation, 15 Feb 2018** (w3.org/TR/odrl-model/). Policy types: **Set** (generic
permission/prohibition/duty rules), **Offer** (assigner proposes, no rights yet granted),
**Agreement** (rights actually granted assigner→assignee). Core concepts: **Rule** (parent of
Permission/Prohibition/Duty), **Party**, **Asset**, **Action** (hierarchical, e.g. `use`/`transfer`),
**Constraint** (boolean refinements). ODRL is the machine-readable layer *above* a human-readable
license string — e.g. expressing "co-author B may remix but must attribute and share revenue 30/70"
as an enforceable policy, which a bare SPDX/CC string cannot capture. Recommended as opt-in for
tier-3 (collectively-earned) assets where negotiated terms exceed what a stock license expresses;
tiers 1–2 need only the SPDX/CC identifier.

### 2.8 Creative Commons license suite + ccREL
creativecommons.org/share-your-work/cclicenses/ lists six current licenses "from most to least
permissive": **CC BY** → **CC BY-SA** → **CC BY-ND** → **CC BY-NC** → **CC BY-NC-SA** → **CC
BY-NC-ND**, built from four elements: **BY** (attribution required), **SA** (ShareAlike — "adaptations
must be shared under the same terms," i.e. the copyleft element), **NC** (noncommercial only), **ND**
(no derivatives). Separately, **CC0** (creativecommons.org/publicdomain/zero/1.0/) is a public-domain
dedication: "waiving all... rights," permitting commercial use "without asking permission" — distinct
from the BY-family, which retains attribution (and, for SA, share-alike) obligations.

Machine-readability: **ccREL** (published 3 Mar 2008, wiki.creativecommons.org/wiki/CC_REL) is CC's
own RDF-based rights-expression spec — "not a W3C standard" itself but built on W3C RDF/RDFa. The
practical mechanism every implementer actually uses is simpler: the license's canonical **URI**
(e.g. `https://creativecommons.org/licenses/by/4.0/`) *is* the machine-readable identifier, typically
paired with `rel="license"` in HTML/RDFa or embedded via XMP in binary files.

### 2.9 SPDX License List
spdx.org/licenses/: "an integral part of the SPDX Specification," maintained by the **Linux
Foundation**, giving every common license a short identifier (`MIT`, `Apache-2.0`, `CC-BY-4.0`,
`CC0-1.0`, `GPL-3.0-only`), full text, and a permanent URL. Supports expressions with `WITH`
(exceptions) and `+` (or-later). SPDX identifiers are the de facto short-form vocabulary the whole
open-source and now open-content ecosystem (npm, GitHub, Hugging Face `license:` field) already
converged on — reusing it means Portals' `license` field is instantly machine-parseable by
every downstream tool without inventing a new enum.

### 2.10 choosealicense.com
choosealicense.com is run by **GitHub, Inc.** "curated with community" contributions; it is a
decision-tree UX over a small curated set of OSS licenses (MIT, GPL v3, etc.), not a standard and
not (per this fetch) explicitly SPDX-labeled on its own landing page — GitHub's repository license
picker, however, is documented elsewhere to store the resulting choice as an SPDX id in the repo's
API metadata. Relevant to XRAI only as UX precedent: a simple 3–5-option chooser in the Portals save
flow, backed by SPDX ids under the hood, is the proven pattern.

### 2.11 glTF `EXT_structural_metadata`
Implements the vendor-neutral **3D Metadata Specification** (used across glTF and 3D Tiles). Per
the GitHub-indexed README: it defines a **schema** (classes + properties) and three storage
mechanisms — **Property Tables** (column-based binary arrays keyed by row/feature index), **Property
Attributes** (per-vertex values tied to a metadata class), and **Property Textures** (per-texel
values for high-frequency, low-poly-surface data). It carries the `EXT_` (multi-vendor) prefix in
the Khronos extension-prefix taxonomy — meaning ≥2 vendors implement it — rather than the `KHR_`
prefix reserved for extensions ratified into core by the Khronos 3D Formats Working Group; treat its
governance status as **multi-vendor, not (yet) Khronos-core-ratified** per this check. Practically:
this is where XRAI's glTF-shaped payloads would attach arbitrary structured metadata (including a
provenance block) at glTF-object granularity, separate from any file-level JSON sidecar.

### 2.12 OpenUSD / Alliance for OpenUSD (AOUSD)
OpenUSD's glossary (openusd.org) confirms generic extensibility: "[Metadata] is a dictionary that
can be applied to any UsdPrim" and other scene objects; **`assetInfo`** is the promoted dictionary
for asset identity ("identifier, name, version, and dependency information" — "advisory data...for
client applications to use"); **`customLayerData`** carries layer-level custom annotations. Governance
sits with **AOUSD** (Alliance for OpenUSD), whose members include Pixar, Adobe, Apple, Autodesk,
NVIDIA, Amazon, Meta, Intel, and others. AOUSD's **Core Specification 1.0** was announced
**17 Dec 2025** as a "production-ready open standard," explicitly framed by AOUSD chair Steve May as
"the critical first step toward ISO standardization" — i.e. **not yet an ISO standard**
(aousd.org/news/core-spec-announcement/). No dedicated provenance/licensing metadata fields were
found in the fetched glossary/announcement beyond the generic `assetInfo`/`customLayerData`
extension points — **UNVERIFIED** whether AOUSD has a first-class provenance field; treat XRAI's
provenance block as living in `customLayerData` if/when USD payloads are involved.

### 2.13 IPTC Photo Metadata Standard + Digital Source Type
iptc.org/standards/photo-metadata/: IPTC "sets the industry standard for administrative,
descriptive, and copyright information about images," maintained by the International Press
Telecommunications Council and embedded via XMP. Search-confirmed (iptc.org news items, not
independently re-fetched line-by-line in this session — treat the exact enum below as
**search-sourced, cross-check before shipping**): the **Digital Source Type** field flags AI
involvement, with values including `trainedAlgorithmicMedia` (output of a trained generative
model), `compositeSynthetic` (composite containing synthetic elements), and `algorithmicMedia`
(algorithmically produced, not sampled/trained). Reported adopters of this vocabulary include Meta,
Google, Microsoft, Adobe, OpenAI, Pinterest, Shutterstock. Relevant to XRAI for any 2D image/texture
asset embedded in a spatial scene — IPTC/XMP is the pre-existing place to flag "this texture/photo
was AI-generated," complementary to (not competing with) a C2PA manifest on the same file.

### 2.14 ML Model Cards
Originates from Mitchell, Wu, Zaldivar, Barnes, Vasserman, Hutchinson, Spitzer, Raji, Gebru,
**"Model Cards for Model Reporting,"** FAT* '19 (29–31 Jan 2019, Atlanta) — arxiv.org/abs/1810.03993.
Proposes short accompanying documents covering intended use, evaluation across demographic slices,
and limitations, to "clarify the intended use cases of machine learning models and minimize their
usage in contexts for which they are not well suited." **Hugging Face Hub** operationalized this as
a convention, not a formal spec: every model repo's `README.md` carries a YAML front-matter block
(`license`, `tags`, `datasets`, `base_model`, `library_name`, structured `model-index` eval results)
rendered as the page's model card (huggingface.co/docs/hub/model-cards). Relevant to XRAI only if/when
XRAI assets bundle or reference a trained model (e.g. a personalized style/generation model) — the
Hugging Face YAML-front-matter pattern, including its reuse of the SPDX `license` field, is the
proven low-effort convention to imitate rather than reinvent.

---

## 3. Minimal standards → XRAI.json mapping

No new protocol. Five fields, five existing standards:

1. **who** → `did:` (W3C DID Core) for `creator` and each `coAuthors[]` entry; optionally wrapped
   as a **W3C VC 2.0** credential if the claim needs to be independently issued/verified (e.g. a
   platform-issued "verified creator" credential), following the CAWG pattern of adapting the VC
   model for content-provenance identity.
2. **when** → ISO 8601 string (`createdAt`), the same timestamp format VC 2.0 already uses for
   `validFrom`.
3. **license/rights** → SPDX identifier string (`license`) as the required, always-present field;
   an optional embedded **ODRL Policy** object (`rights`) only for tier-3 negotiated terms.
4. **lineage** → flat `parents: [xraiId, ...]` array, semantically equivalent to PROV-O
   `wasDerivedFrom`; add `activity` free-text (equivalent to PROV-O `Activity`) only if useful for
   UI ("remixed in Portals Composer").
5. **integrity signature** → `proof` object per **W3C Data Integrity** (lightweight, always
   available for the JSON sidecar) **and/or** a pointer to an embedded **C2PA manifest** (`c2paManifestUrl`
   or in-band for glTF/USD/image payloads) when the asset type supports binary embedding and
   Portals wants Content-Credentials-ecosystem interoperability (verifiable in Adobe/CAI-aware
   tools, not just Portals).

---

## 4. 3-tier ownership model → standards mapping

| Tier | Description | `license` (SPDX/CC id) | `rights` (ODRL) | `coAuthors` / DID | `parents` (PROV-O lineage) | `proof` |
|---|---|---|---|---|---|---|
| **1 — Private, all rights reserved** | Creator keeps everything; no remix grant | `LicenseRef-XRAI-all-rights-reserved` (SPDX allows custom `LicenseRef-*` ids for non-catalog terms; there is no CC/SPDX-catalog id for "no license granted," so a `LicenseRef-*` or simply omitting `license` + `allRightsReserved: true` is the correct minimal encoding) | Omitted (default-deny; no ODRL Permission needed when nothing is granted) | `creator` only (single DID) | `[]` (or the parent id if privately remixed from another asset, with `rights` still closed) | Data Integrity `proof`, signed by creator's DID key. C2PA optional. |
| **2 — Private + CC remix license** | Creator publishes with a CC license permitting remix | One of `CC-BY-4.0`, `CC-BY-SA-4.0`, `CC-BY-NC-4.0`, etc. (SPDX-cataloged CC ids) | Omitted for the common case — the CC license text *is* the ODRL-equivalent Offer; add an ODRL fragment only if Portals wants an in-app enforceable permission check (e.g. gate "remix" button on `Permission{action: derive}`) | `creator` only | `[]`, or parent id(s) if this asset is itself a remix | Data Integrity `proof` and/or C2PA manifest (recommended here specifically, since the asset is now leaving the creator's direct control) |
| **3 — Collectively earned** | Initial creator invites co-authors; group chooses copyright (all-rights-reserved-by-group) or copyleft (CC BY-SA / CC0) | Group's chosen SPDX/CC id (catalog id for copyleft, or `LicenseRef-*` for a custom group-owned "all rights reserved to the group" term) | **Recommended**: an ODRL `Agreement` Policy listing each co-author `Party`, their `Permission`/`Duty` (e.g. attribution duty, revenue-share constraint) — this is the one tier where ODRL's extra structure earns its keep over a bare license string | `creator` + `coAuthors[]`, each a DID; each co-author's join event ideally itself a small VC ("X accepted co-authorship of asset Y at time T") | `parents` lists prior asset(s) if the collective work is itself a remix; PROV-O `wasAttributedTo` maps to attributing each contribution to its DID | Multi-signature: each co-author's Data Integrity `proof` over the terms they agreed to, or a C2PA manifest with multiple CAWG identity assertions (one per co-author) |

---

## 5. `XRAI.json` provenance/license block — schema sketch

Illustrative, not final — field names chosen to read naturally while mapping 1:1 to the standards
above; no new semantics invented beyond what §2–§4 already define.

```jsonc
{
  "xraiId": "urn:xrai:asset:9f3e2b7c-...",
  "provenance": {
    "creator": "did:key:z6Mkh...",                 // W3C DID Core — required
    "coAuthors": [ "did:web:example.org:alice" ],   // W3C DID Core — tier 3 only
    "createdAt": "2026-07-10T18:04:00Z",            // ISO 8601 (as used by VC 2.0 validFrom)
    "activity": "remix",                            // free text, echoes PROV-O Activity (optional)
    "parents": [ "urn:xrai:asset:1a2b3c4d-..." ],    // PROV-O wasDerivedFrom, flat array
    "c2paManifestUrl": null                         // pointer to embedded C2PA manifest, if any
  },
  "license": {
    "id": "CC-BY-SA-4.0",                           // SPDX identifier (catalog) or LicenseRef-*
    "allRightsReserved": false,                     // true only for tier 1
    "rights": {                                     // optional ODRL Policy — tier 3 (or tier 2 opt-in)
      "@context": "http://www.w3.org/ns/odrl.jsonld",
      "@type": "Agreement",
      "uid": "urn:xrai:rights:9f3e2b7c-...",
      "permission": [{
        "target": "urn:xrai:asset:9f3e2b7c-...",
        "assigner": "did:key:z6Mkh...",
        "assignee": "did:web:example.org:alice",
        "action": "derive",
        "duty": [{ "action": "attribute" }]
      }]
    }
  },
  "proof": {                                        // W3C Data Integrity — required
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-rdfc-2022",
    "created": "2026-07-10T18:04:00Z",
    "verificationMethod": "did:key:z6Mkh...#z6Mkh...",
    "proofPurpose": "assertionMethod",
    "proofValue": "z58DA..."
  }
}
```

For glTF/USD-shaped XRAI payloads, the same object can additionally be mirrored into
`EXT_structural_metadata` property tables (glTF) or `customLayerData`/`assetInfo` (USD) so the
provenance travels with the geometry payload itself, not only the JSON sidecar — see §2.11–2.12.

---

## 6. Tools/libraries that already implement each piece (build vs. reuse)

| Standard | Reuse this — do not reinvent |
|---|---|
| C2PA manifests | `c2pa-rs` / `c2pa-node` / `c2pa-python` (official C2PA SDKs, per c2pa.org "Adopt" section); Adobe CAI open-source tools at opensource.contentauthenticity.org |
| CAWG identity assertion | CAWG reference code linked from cawg.io/specs/; SSL.com issues CAWG identity-assertion certificates |
| W3C VC 2.0 / Data Integrity | `@digitalbazaar/vc` (JS), `did-jwt-vc`, or any W3C-conformant VC library implementing `eddsa-rdfc-2022` |
| W3C DID Core | `did:key` method needs no registry/network (simplest bootstrap for XRAI); `did-resolver` (JS) for resolution across methods |
| ODRL | `odrl-manager`/ODRL JSON-LD context at `w3.org/ns/odrl.jsonld`; W3C's own ODRL vocabulary + validator tooling |
| SPDX identifiers | `spdx-license-list` npm/PyPI packages; GitHub's own license-detection API (`licensee`) |
| Creative Commons | CC's own license-chooser widget (creativecommons.org/choose/); license URIs used as-is, no library needed |
| glTF metadata | `EXT_structural_metadata` reference tooling from CesiumJS / glTF-Transform (`gltf-transform.dev/extensions`) |
| OpenUSD metadata | Pixar's official `usd-core` Python/C++ libraries read/write `assetInfo`/`customLayerData` natively |
| IPTC/XMP | Adobe XMP Toolkit (open source) for reading/writing IPTC Photo Metadata + Digital Source Type |
| Model Cards | `huggingface_hub` Python library's model-card templating/YAML front-matter tooling |

---

## 7. Gaps / UNVERIFIED / follow-ups

- **SPDX ↔ ISO/IEC 5962:2021**: SPDX's *document format* is reportedly an ISO standard, but this
  was not fetched/confirmed from a primary source in this run — **UNVERIFIED**, cross-check
  spdx.org or iso.org before citing externally.
  - Note: SPDX's `LicenseRef-*` mechanism (used above for "all rights reserved") is documented as
    part of the SPDX Specification per spdx.org/licenses/, which was fetched.
- **`EXT_structural_metadata` exact ratification state**: confirmed as `EXT_` (multi-vendor) prefix
  via GitHub search results, not a direct fetch of the current README (two direct-fetch attempts
  404'd — GitHub blocks the WebFetch tool's UA on raw/tree URLs in this environment). Re-verify
  directly with `gh api` or a browser before treating the ratification claim as final.
- **IPTC Digital Source Type exact enum + adopter list**: sourced from WebSearch snippets of IPTC
  news pages, not an in-session direct fetch of the controlled-vocabulary spec page itself (two
  direct fetches 404'd). Re-fetch `iptc.org/std/photometadata/...` or the specific news URL before
  shipping copy that cites the enum externally.
- **AOUSD provenance/license metadata fields**: no dedicated field found in what was fetched; if
  USD interop becomes load-bearing for XRAI, do a follow-up pass once AOUSD publishes fuller Core
  Spec 1.0/1.1 documentation (1.1 targeted for 2026 per aousd.org).
- **C2PA concrete adoption numbers** (device/software counts): not present in the fetched pages —
  left as a gap rather than guessed.

---

## Sources (fetched this run)

- https://spec.c2pa.org/specifications/specifications/2.2/index.html
- https://spec.c2pa.org/specifications/specifications/2.2/explainer/Explainer.html
- https://c2pa.org/
- https://contentcredentials.org/
- https://cawg.io/specs/ , https://cawg.io/about/identity-framework/ (via search)
- https://www.w3.org/TR/vc-data-model-2.0/
- https://www.w3.org/TR/vc-data-integrity/
- https://www.w3.org/TR/did-core/
- https://www.w3.org/TR/prov-o/
- https://www.w3.org/TR/odrl-model/
- https://creativecommons.org/share-your-work/cclicenses/
- https://creativecommons.org/publicdomain/zero/1.0/
- https://wiki.creativecommons.org/wiki/CC_REL
- https://spdx.org/licenses/
- https://choosealicense.com/
- https://github.com/KhronosGroup/glTF (extension registry, via search)
- https://openusd.org/release/glossary.html
- https://aousd.org/news/core-spec-announcement/
- https://iptc.org/standards/photo-metadata/ (+ AI guidance news pages via search)
- https://arxiv.org/abs/1810.03993
- https://huggingface.co/docs/hub/model-cards
