---
title: Universal CRM Push
description: How every proposal, SOW, and Excel export ends up in the matching CRM Opportunity automatically.
---

# Universal CRM Push

Every artifact the Proposal Engine produces — proposal PDFs, SOWs, Excel cost sheets, RFP scoping workbooks — is pushed into the matching Twenty CRM Opportunity automatically. The sales team never has to "also update the CRM."

## What triggers a push

The Proposal Engine fires a CRM push on every one of these actions:

| Action in Proposal Engine | Result in CRM |
|---|---|
| Save a new proposal | Company auto-created if missing, Opportunity auto-created and linked |
| Generate proposal PDF | File attached to Opportunity, timeline activity logged, `bidStatus` advanced to `BID_SUBMITTED` |
| Generate Premium SOW or Installation SOW | DOCX attached, timeline activity logged, `bidStatus` set to `BID_SUBMITTED` |
| Export Excel cost sheet | XLSX attached to Opportunity, timeline activity logged |
| Mirror Mode one-pager generated | Opportunity `pricingComplete=true` and `pricingCompleteDate` stamped |
| RFP Analyzer scoping workbook generated | Workbook attached, RFP analysis record cross-linked |

## What gets pushed

Beyond the artifact file itself, each push updates the Opportunity record:

- **Company name** — created in CRM if missing (deduped by exact name)
- **Opportunity stage** — advances based on the action (PDF export → BID_SUBMITTED, etc.)
- **Amount / dealValue** — synced from the Proposal Engine's totals
- **Owner / contact** — resolved from the rag2 user
- **Timeline activity** — every push leaves a Note with what was generated, when, by whom
- **Twenty Opportunity ID stored back** on the rag2 record so subsequent pushes link instantly

## Why this matters

Before Universal Push, attaching an artifact to the CRM was a manual two-step (generate the file, then upload it to Twenty). About 40% of the time the second step didn't happen — proposals went out without ever appearing on the right Account. After Universal Push, that gap disappears: 100% of artifacts land in the CRM automatically against the right Account and Opportunity.

## Where it lives in the code

- Service: `services/integrations/twenty/crmAutomation.ts` — the dispatcher, fires events like `pdf_exported`, `sow_generated`, `proposal_created`
- Trigger points: `app/api/proposals/export`, `app/api/sow/generate-premium`, `app/api/sow/generate-installation`, the RFP analyzer pipeline

## Failure mode (and the 2026-04-24 fix)

The push is **fire-and-forget** — it runs after the local save returns success. If Twenty is briefly unreachable, the Proposal Engine still completes the local action and the user sees no error.

Before 2026-04-24, this was *too quiet*: failures were silently swallowed and never surfaced. The fix wires every CRM push through the activity-feed endpoint with structured logging. Failures now show up in `/api/admin/ops/activity-feed` so they can be replayed.

For RFP analyses specifically, there's a manual replay endpoint:

```
POST /api/rfp/analyses/[id]/sync-twenty
```

Use it when the initial sync failed because Twenty was cold-starting.

## Companion: Product Catalog Sync

A separate sync keeps the LED product catalog in lockstep:

- `services/integrations/twenty/productSync.ts` upserts the matching Twenty `LedProduct` (keyed on `modelNumber`) every time a `ManufacturerProduct` is saved or imported
- Soft-deletes propagate (rag2 `isActive=false` → CRM `isActive=false`)
- Bulk reconciliation: `POST /api/admin/sync-products-to-crm` walks every active product and re-pushes (0.7s pacing)
- 158 products kept in lockstep as of 2026-04-29

## Twenty calling back into the Proposal Engine

The relationship is bidirectional. Twenty's **Quick Estimate** AI skill creates an `Estimate` plus `EstimateLines` inside the CRM, then calls back to the Proposal Engine to render the scoping workbook:

- `GET /api/twenty-bridge/export-excel?estimateId=<uuid>` — renders the Excel
- `GET /api/twenty-bridge/export-proposal-pdf?opportunityId=<uuid>` — renders the proposal PDF

These bridge routes are unauthenticated by design — Twenty already authorizes the user; rag2 trusts the call and serves the file.

## See also

- [Architecture / Data flow](/docs/architecture/data-flow) — every cross-system sync mapped
- [AI agents](./ai-agents) — Copilot, RFP Analyzer AI, Intelligence Mode
- [RFP Analyzer](./rfp-analyzer) — the analyzer that pushes RFP scoping into Twenty
