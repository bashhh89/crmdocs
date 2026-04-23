---
title: Proposal Engine Changelog
description: Auto-generated record of changes shipped to proposals.anc.com (rag2 repo).
---

# Proposal Engine Changelog

> Auto-generated. Every new commit on `rag2` `phase2/product-database` branch that's user-facing lands here within 15 min.

<!-- AUTO-ENTRIES-BELOW -->



## 2026-04-23

- **Resp Matrix PDF readability improvements**: The Resp Matrix PDF now uses a smaller, clearer font, eliminates mid‑sentence line breaks, and shows each header only once, so the document is easier to read and understand.

## 2026-04-22

- **Cleanup status now visible in estimator list**: You can now see a cleanup status column in the estimator list. This lets you quickly identify which estimators require cleanup, streamlining your workflow.
- **Bulk select and delete items in Estimator list**: You can now pick multiple entries in the Estimator list and remove them all at once. This bulk‑selection tool saves time when cleaning up large sets of estimates.
- **Estimator preview empty state improved**: When the estimator preview has no data, the screen now shows a clearer, more helpful message, guiding you on what to do next.
- **Estimator no longer shows blank screen for empty drafts**: Opening an empty draft now displays the estimator correctly instead of a blank screen, so you can continue working without interruption.
- **Estimator no longer crashes on new estimates**: Creating a new estimate will no longer cause the estimator to crash. You can now continue working without interruption.
- **CRM Backfill Gap Report Added**: You can now generate a backfill gap report to identify missing CRM records, and the company ID map has been refreshed for more accurate data matching.
- **Auto-create Companies & Opportunities in Twenty CRM**: Now any action you take will automatically create a Company and an Opportunity in Twenty CRM, so you no longer need to add them manually.
- **New endpoint to fetch proposal text as markdown**: You can now call the get‑proposal‑text API to pull proposal content from Mirror Mode Excel files and receive it formatted as markdown, making it ready for AI processing.
- **Export exact proposal PDFs via Twenty Bridge**: You can now request a precise proposal PDF through the Twenty Bridge export endpoint. The PDF will match the exact proposal details, making it easier to share and archive proposals.
- **Unblocked SOW/PDF agents and refreshed AI rules**: You can now use SOW and PDF agents without hitting the authentication wall, and the AI rules have been updated for smoother operation.
- **Export proposal PDFs from Agent Skill**: You can now generate and download PDF versions of proposals directly from the Agent Skill area in the CRM, making it easier to share and archive proposal details.
- **Currency exchange rates now available**: You can now view and use up‑to‑date currency exchange rates directly in the system, making multi‑currency transactions easier.

- **PDF tax no longer recalculates on zero values**: When you generate a PDF, tax amounts will stay unchanged if the sheet shows zero, eliminating incorrect tax recalculations.

- **Correct currency display for GBP/EUR/CAD pricing**: Pricing documents now show the proper currency—GBP, EUR, or CAD—instead of defaulting to USD. Users will see accurate amounts in the currency that matches their pricing document.
