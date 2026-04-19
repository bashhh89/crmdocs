---
title: Changelog
description: Comprehensive record of Twenty CRM migrations, architectural changes, and AI Agent skill updates.
---

# Changelog & Platform Architecture Notes

> **Twenty Workspace Footprint (as of late April 2026):**
> **8,360** Opportunities • **3,730** Companies • **19,966** People • **5,160** Revenue Splits • **3,900** Service Tickets • **20,174** Design Requests.
> Currently tracking **~$470M** in 2026 pipeline revenue splits (81% volume parity with Salesforce).

## 2026-04-20

- **GraphQL Metadata Expansion**: Provisioned `Event Follow-Up Manager` and `Event Coordinator` AI skills into Twenty via `CreateSkill` mutations. System now natively handles event renewals and production checklist generations via Scout.
- **IDE Automation Synchronized**: Persisted 10 ephemeral AI workflows (including `twenty-app-builder`, `crm-knowledge`, and `twenty-crm`) down to localized VS Code Copilot `.prompt.md` files.
- **Documentation Subsystem**: Expanded the `scout-skills` definitions in the ANC Docs to spotlight the event operations tier.

## 2026-04-19

- **Operator Docs Re-platforming**: Shipped `docs.ancsports.net` on Next.js 16/Fumadocs under the `abc_crmdoc` EasyPanel configuration. Replaced Docusaurus to perfectly replicate Mintlify's Twenty aesthetic.
- **Ollama Cloud Assistant**: Integrated `@ai-sdk/openai-compatible` with `gpt-oss:120b` directly into Fumadocs, delivering a 131k context window search routed via Orama indexing natively on edge.
- **Agent Identity Shipped**: Renamed core ops AI from "Boyka" to **Scout** (`c73dcdc4`). Configured a 3,944-character system prompt strictly mapping all new table views, relation IDs, and workflow definitions.

## 2026-04-18

- **Team Allocations Object (`7416ebb0`)**: Architected the new schema overlay for handling multi-team ad-sales splits (used fundamentally on Hankook MLB). Built 8 dedicated fields (`fiscalYear`, `revenue`, `margin`, `cost`, `department`, etc) + bi-directional mappings (`bcc340a7`, `14ef07fd`).
- **Allocations Data Backfill**: Transferred 472 standalone records out of SF's orphan `Revenue_Tracker__c` to lock team allocations native to Twenty's structure.
- **Opportunity League Matrix**: Pushed the native `League` property up from the Company origin down to the Opportunity layer. Safely backfilled values across ~4,200 deals.
- **Ops Control Views (`d468e33e`)**: Piped Natalia's custom sorting architectures—producing the `Backlog` (`1c775cd3`) and `Win/Loss by League` (`6aae4c98`) views keyed dynamically by chronological `substantialCompletionDate`.
- **Chronological Restorations**: Resurrected timeline values; injected 191 blank opportunities with `proposalDueDate` and mapped 336 `substantialCompletionDate` voids.
- **Proposals & Estimation (Designer AI)**: Hooked Gemini 3 Pro inline chat structures for physical dimension verification directly alongside product catalog overlays.
- **Entity Deduplication (Pass 2)**: Stitched together 10 multi-state accounts (e.g. Dodgers, Rainiers, Rays, Nationals) into absolute sources of truth.

## 2026-04-17

- **Core Schema Replication**: Merged 17 explicit Salesforce fields into Twenty Opportunity instances (`probability`, `proposalDueDate`, `substantialCompletionDate`, `paidAmount`, `percentPaid`, `accountExecutive`, `accountExecutiveEmail`, `margin`, `revenue2026/2027`, `margin2026/2027`, `proposalStage`, `priority`, `pricingComplete`, `technologyVendorPartner`, `pricingCompleteDate`).
- **Jireh's "ANC 2026" Execution Engine (`b992711d`)**: Engineered President-tier dashboard overviews mirroring SF footprints. Embedded 11 deep-tier widgets governed by JSON-serialized array constraints (e.g., `[\"WON\"]`).
- **Scout AI Foundational Loading**: Provisioned the original 30 discrete execution pathways defining Scout's intelligence (skills spanning from `rfp-analyzer` to `ticket-triage` and `quick-estimator`). 
- **System Linkage (`193c5f7a`)**: Interconnected standalone ANC service ticketing engines dynamically to the core CRM Opportunity spine. Discarded 15-minute polling for 1s fire-and-forget sync.
- **Data Pruning & Pass 1 Dedup**: Nuked 607 phantom SF entries (`null dealValue` + dead stages). Re-parented 10 franchises (Cavaliers, Penguins, etc.).
- **Front-end Viewport Realignment**: Compacted 18 nav roots to 11 explicit directories; isolated Estimates, Design Requests, and RFP properties into separate Company tab hierarchies.

## Notes on Deferred Frameworks

- **Pre-2021 Annihilation Rules**: Awaiting operational finalization on the hard deletion year.
- **Email → Opportunity Routing (Phase 2)**: Pending systemic interceptor rules for preventing shadow wrapper Company creations.
- **Formatting Hotfixes (Phase 2)**: Transition `fiscalYear` property schemas from `NUMBER` back to `SELECT` strings to patch the comma delimiter UI bug ("2,026").
- **Accounting Bridges (Phase 2)**: Need probability-weighted matrices to drive forecasting widgets dynamically off closed-won confidence integers.
