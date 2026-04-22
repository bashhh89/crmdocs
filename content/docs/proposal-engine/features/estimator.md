---
title: Estimator
description: Price deals, generate Excel workbooks, handle revisions and alternates.
---

# Estimator

The Estimator is the core pricing tool. Take a requirement, turn it into a priced line-item list, ship it to the client as a branded Excel or PDF.

Open from an Opportunity detail page, or go to `/estimator` for the full list.

## What the Estimator does

- **Line items** — pixels, modules, hardware, spares, install, travel, everything
- **Rate card integration** — pulls current pricing from `/admin/rate-card` so numbers are always up-to-date
- **Multi-alternate support** — Alt 1 / Alt 2 / Alt 3 pricing shown side-by-side
- **Revisions** — every saved estimate creates a revision; the revision compare tool shows exactly what changed between two versions
- **Excel export (Univer format)** — Natalia's preferred handoff format; lives at `/api/estimator/export-unified`
- **AI reasoning** — "why is this line item priced this way?" the estimator explains the math behind each figure
- **AI chat** — natural-language estimating ("give me pricing for a 10-panel 4mm videowall with full install")

## Typical workflow

1. Open the Opportunity in the pipeline
2. Click "New Estimate" — starts a fresh estimate pre-populated with known requirements
3. Add or adjust line items; AI chat helps you fill gaps
4. Compare revisions as you iterate
5. Export as Excel or PDF — export automatically attaches to the Opportunity in Twenty
6. Client receives the doc; you track their signature back in the Pipeline

## Cleanup and bulk actions

The estimator list supports bulk selection and deletion for stale drafts. Mark cleanup status on any estimate to flag it for archive. Helpful when the list gets long and you want to retire old revisions in bulk.

## See also

- [SOW Generation](./sow-generation) — once pricing is locked, generate the Installation or Premium SOW
- [Universal CRM Push](./universal-crm-push) — how every export lands in Twenty automatically
