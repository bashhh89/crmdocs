---
title: Proposal Engine Changelog
description: Auto-generated record of changes shipped to proposals.anc.com (rag2 repo).
---

# Proposal Engine Changelog

> Auto-generated. Every new commit on `rag2` `phase2/product-database` branch that's user-facing lands here within 15 min.

<!-- AUTO-ENTRIES-BELOW -->





## 2026-04-26

- **Product save now returns CRM sync status**: When you save a product, the response now includes a sync status so you can instantly see whether the product was successfully synced with the CRM.
- **Product updates now auto-sync to Twenty CRM**: Whenever you add or edit a product, the changes are automatically sent to the Twenty CRM, keeping your catalog in sync without any manual steps.

- **Add “View in CRM” pill to all proposal pages**: You’ll now see a “View in CRM” pill on every proposal page, letting you jump directly to the associated CRM record with a single click. This speeds up navigation and keeps your workflow in sync.
- **Universal CRM push no longer fails silently**: The CRM push integration now reports success correctly instead of failing without notice. Users will see accurate push status and can trust that data is being transferred.
- **Product API now syncs to CRM asynchronously**: Product updates now fire‑and‑forget to the CRM, so your workflow continues without waiting for the sync to finish. The CRM will be updated shortly after your change.
- **Resolved runtime error on linked proposal pages**: The linked proposal pages no longer crash due to a missing identifier. Users can now open and work with linked proposals without encountering the runtime error.
- **Bid status auto-updates on PDF/SOW export**: When you export a PDF or generate a Statement of Work, the opportunity’s bid status now automatically changes to BID_SUBMITTED, so you no longer need to update it manually.
- **CRM activity logging now updates automatically**: When you add or view activities, the system now automatically pushes those changes to the universal CRM, keeping your records in sync without any extra steps.
- **Added two Jireh‑style report capabilities**: You can now generate Jireh‑style reports using the two new skills, and workflow #1 has been marked as verified.
- **Jireh Reports API now bypasses middleware**: You can now call the /api/jireh-reports endpoint directly, as it’s been added to the allowed list, so your requests won’t be blocked by middleware.
- **Added API access for Jireh reports and Twenty Bridge**: You can now call the Jireh reports and Twenty Bridge APIs without authentication barriers, allowing seamless data retrieval.
- **New repeat‑clients report endpoint with Excel export**: You can now request the repeat‑clients report through a dedicated API endpoint and receive a ready‑to‑use Excel file generated on the server. This simplifies pulling repeat‑client data for analysis and sharing.
- **New Account LTV Report API (Excel)**: You can now request an Account Lifetime Value report through the /api/jireh-reports/account-ltv endpoint. The report is delivered as a two‑sheet Excel file using the Hankook style layout.
- **Simplified repeat‑client report layout**: The repeat‑client report now omits the title, subtitle, and rank column, giving you a cleaner, bare‑bones view.
## 2026-04-24

- **Pricing editor now respects inclusion settings**: The pricing editor now correctly includes or excludes items as intended, fixing the previous mismatch. Users will see accurate pricing calculations when editing.
- **Corrected grand total in Margin Analysis**: The margin analysis report now displays the correct grand total, so your financial summaries are accurate and reliable.

- **RFP row editing works correctly**: You can now edit rows directly in the RFP preview and see the changes reflected instantly. The previous issue that prevented row updates has been resolved.
- **Grand Total now updates correctly when adding line items**: When you add new line items to a project, the Grand Total now recalculates instantly and accurately, fixing the previous discrepancy.
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
