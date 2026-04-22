---
title: Universal CRM Push
description: Every export, PDF, and SOW automatically lands in Twenty CRM.
---

# Universal CRM Push

Shipped 2026-04-20. Removes the "okay now I have to upload this to the CRM" step from everyone's workflow.

## What it does

Every action in the Proposal Engine that produces a document — a PDF proposal, an Excel estimator, an Audit report, a Premium SOW, an Installation SOW — automatically:

1. Creates a **Company** in Twenty if it doesn't already exist (deduped by exact name)
2. Creates or finds the **Opportunity**
3. Uploads the generated document as a Note attachment on that Opportunity
4. Drops a timeline activity event ("Natalia generated Installation SOW — [link]")
5. Stores the Twenty Opportunity ID back on the Proposal record so the second time around everything links instantly

## What triggers a push

- PDF export
- Estimator / Excel export
- Audit export
- Premium SOW generation
- Installation SOW generation

Every one of those is a "push moment." Everyone on the team can see what was sent, when, from their CRM.

## Why this matters

Before Universal Push, export-to-CRM was a manual two-step (generate the file, then attach it in Twenty). About 40% of the time that second step didn't happen. After Universal Push, that gap disappears — 100% of artifacts are in the CRM automatically, indexed against the right Account and Opportunity.

## See also

- [Pipeline](./pipeline) — where the same Opportunities live on the Proposal Engine side
- [Twenty CRM docs → Opportunities](../../user-guide/capabilities/opportunities)
