---
title: SOW Generation
description: AI-assisted Installation and Premium Scope of Work documents.
---

# SOW Generation

Two flavors of SOW live in the Proposal Engine, both AI-assisted:

## Installation SOW

For when ANC is doing the install. Covers: site prep, structural requirements, rigging points, cable paths, network drops, crew size, site visits, timeline, acceptance criteria.

- Entry point: `/api/sow/generate-installation` (called from Estimator UI)
- Pulls: line items from the estimate, venue info from CRM, any uploaded venue drawings
- Output: branded PDF + Word (.docx) — both attach automatically to the Opportunity

## Premium SOW

For high-touch engagements — AV integration, content production, ongoing service. Longer, more detailed than Installation SOW.

- Entry point: `/api/sow/generate-premium`
- Adds: creative/design scope, content production line items, training schedule, ongoing support SLA
- Output: branded PDF attached to the Opportunity

## History

Every generated SOW is saved at `/api/sow/history` and viewable per-project. If a client comes back six months later and asks "what did we scope last time?", you have the exact file.

## Scan for content

The `/api/sow/scan` endpoint lets you drop an existing SOW (e.g., a client's RFP) and get back a structured summary — what's in scope, what's out of scope, what acceptance criteria the client expects.

## See also

- [Submittal Compiler](./submittal-compiler) — assembles the spec package that actually goes to the installer
- [RFP Analyzer](./rfp-analyzer) — the matching tool for *inbound* RFPs (client sends us one; we respond)
