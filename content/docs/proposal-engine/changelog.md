---
title: Proposal Engine Changelog
description: Auto-generated record of changes shipped to proposals.anc.com (rag2 repo).
---

# Proposal Engine Changelog

> Auto-generated. Every new commit on `rag2` `phase2/product-database` branch that's user-facing lands here within 15 min.

<!-- AUTO-ENTRIES-BELOW -->




















## 2026-05-18

- **Contract modes displayed in header dropdown**: The header dropdown now shows all contract modes, letting you view and select the appropriate mode directly from the main menu. This resolves the previous issue where those options were hidden.

- **Pending scope controls now hidden**: The pending scope controls are no longer displayed, giving you a cleaner interface and preventing accidental changes.
- **Responsibility Matrix controls are now visible**: You can now see and use the Responsibility Matrix controls in the Operations Workspace, letting you adjust responsibility settings directly.
- **Updated Responsibility Matrix to 2026 Version**: The Responsibility Matrix in the Operations Workspace is now the finalized 2026 version. You’ll see the latest role assignments and duties reflected immediately.
- **Interactive Catalog App Now Available**: The Operations Workspace now includes an interactive catalog where you can view, filter, and explore items in real time. This makes finding the right equipment faster and more intuitive.
- **Premium AI‑powered catalog experience**: The catalog has been rebuilt with AI reasoning and data‑driven evidence, delivering richer product insights and a smoother, premium UI. You’ll now browse items with clearer information and a more responsive design, making it easier to find exactly what you need.
- **Catalog rebuilt as a standalone consulting-grade page**: The catalog is now a dedicated page built for consulting workflows, giving you a cleaner, focused view of products. You can browse and manage items directly from this page without navigating through other sections, making product lookup faster and easier.
- **Strategy Narrative Rebuilt with Persona Lanes & AI Scores**: You can now explore strategy narratives organized into persona journey lanes, see AI‑generated scores for each item, and add reactions or comments. The view supports up to 30 items across three linked systems, making it easier to track and collaborate on strategies.
## 2026-05-17

- **New API to analyze attachments**: You can now submit an attachment to the Operations Workspace and receive a detailed analysis in JSON format. This makes it easier to extract key data without manual review.

- **PDF download and estimate line sync added**: You can now pull PDFs directly from rag2 and have the estimate lines written back into the Operations Workspace automatically. This keeps your estimates up‑to‑date without any manual copying.
## 2026-05-16

- **M&S and CMS pricing flags re-enabled**: We've turned the M&S and CMS pricing flags back on, so your quotes and invoices will now reflect the correct rates for those services.
- **Pricing disabled until payment confirmed**: Pricing for M&S and CMS will no longer appear until the customer's payment is confirmed. This prevents premature charges and ensures only paid orders show pricing.

## 2026-05-15

- **Rename Short Form Agreement & add Change Order**: The Operations Workspace now lists the Short Form Agreement under its new name, and a new Change Order document type is available. You can create, edit, and share these documents just like any other proposal.

- **Add Change Order # to header and Description of Work table**: You’ll now see the Change Order number displayed in the header and a dedicated Description of Work table in the Operations Workspace, making it easier to track order details.
- **Correct PDF filenames and report intro for Change Orders**: When you generate a Change Order PDF, the file now uses the proper naming convention and the report’s introductory section matches the standard layout, making the document easier to locate and read.
## 2026-05-13

- **CMS Pricing Picker, Admin, and Banner Enabled**: The CMS Pricing picker, admin controls, and banner are now live. You can now select pricing options directly in the CMS, manage pricing settings, and see the new banner indicating pricing status.
- **CMS Pricing Module now available via feature flag**: Operators can now configure control‑system pricing directly in the CMS. The new pricing module is gated behind the FEATURES.CMS_PRICING flag, so it can be enabled when ready. This gives you more precise cost control without leaving the Operations Workspace.

- **Strategic Extras option now gated behind feature flag**: Option 3 – Strategic Extras – is hidden in the CMS picker unless the CMS Pricing Strategic feature is enabled. This keeps the picker tidy for users who don’t have that capability turned on.
## 2026-05-09

- **Show Reverted-from-WON Deals in Activity Window**: You’ll now see any deals that were moved back from WON status right in the activity window of your weekly or monthly reports. This makes it easy to track reversals without digging into separate logs.

- **Top 10 2026 Wins by Revenue added to reports**: The weekly and monthly CRM reports now include a "Top 10 2026 Wins by Revenue" section, so you can instantly see the highest‑earning wins for the year.
- **Weekly/Monthly Report shows BU summary and recent activity**: The weekly and monthly CRM reports now focus on a concise Business Unit summary and include the last seven days of activity for each Jireh. Users will see a cleaner report with the most relevant recent data.
- **CRM report mirrors Salesforce 'Closed Won This Month' layout**: The weekly and monthly CRM reports now use the same layout as Salesforce’s “Closed Won This Month” view, so you can see closed‑won deals in a familiar format and compare results more easily.
## 2026-05-08

- **AI Console now shows revenue metrics**: You can now view revenue details—sale price, total project revenue, deal value, and amount—directly in the AI Console, giving you clearer insight into financial performance.
- **AI Console with Account 360 and AI Narrative**: You can now open the AI Console to see a complete 360‑degree view of any account and receive AI‑generated narratives. The console also lets you search for companies instantly, giving you faster insights for your CRM tasks.

- **Refusal rule added to Account 360 narrative**: The AI Console now automatically includes refusal rules in the Account 360 narrative, so you can instantly see why a request was declined and take appropriate next steps.
- **AI Console UI refreshed with new Account 360 hero and cleaner layout**: The AI Console now displays a new Account 360 hero view and removes the unused chip grid, giving you a clearer, less cluttered interface.
- **Entra SSO login and new Operations Hub**: You can now log in with your Entra (Azure AD) credentials, streamlining access to the system. A brand‑new hub page gives you a central place to view and manage your Operations Workspace.
- **Entra SSO login and new Operations Hub**: You can now sign in using your Entra credentials, and a brand‑new hub provides a single place to launch the Operations Workspace and view key information.
- **Automatic Microsoft sign‑in via login URL**: Add ?microsoft=auto to the login page URL and you’ll be signed in automatically, giving you seamless hub‑driven access.
- **Auto‑generate monthly Nielsen verification tasks**: Each month the system now automatically creates twenty Nielsen verification tasks for every active sponsor‑league pair and links them to the appropriate verification record. These tasks appear directly in the Operations Workspace, so you no longer need to set them up manually.
- **Export M&S inventory as Excel file**: You can now download the M&S inventory from the Operations Workspace as an Excel spreadsheet, simplifying review and sharing of stock data.
- **Add weekly/monthly Won & Forecast report**: You can now pull a weekly or monthly CRM report that mirrors the '2026 Won & Forecast by Business Unit' dashboard right from the Operations Workspace.
- **Simplified weekly/monthly CRM report**: You’ll now see only Closed Won deals by business unit and activity from the past seven days in the weekly/monthly report. The Pipeline section and full deal list have been removed for a cleaner, more focused view.
- **Report now includes bid status WON transitions**: The weekly and monthly CRM reports now capture when a bid moves to WON within the activity window, so you’ll see those conversions reflected in your reports.
## 2026-05-06

- **Closed‑won email grouped by business unit, added data**: Closed‑won notification emails are now organized by business unit, making it easier to see which teams closed deals. The email now includes the opportunity number, direct links to the CRM record, and FY YTD totals for quick reference.

- **LTV report works for zero‑amount migrated accounts**: The Lifetime Value report no longer returns a 404 error when you view Salesforce‑migrated accounts with an amount of zero. You can now open the report for those accounts without interruption.
## 2026-05-05

- **Closed Won Report Can Be Sent Automatically**: You can now trigger a Closed Won report to be sent directly from the Operations Workspace. The latest closed‑won data will be delivered to your inbox without any manual steps.

- **Closed‑Won reports now sent from CRM mailbox**: Closed‑won report emails are now sent from the CRM mailbox, so they arrive directly in your CRM inbox. This makes it easier to track and manage these reports within the Operations Workspace.
- **Closed‑won reports now emailed via Microsoft mailbox**: You can now have closed‑won reports automatically sent to your Microsoft mailbox, so you can review sales outcomes directly from your inbox without extra steps.
## 2026-05-02

- **Umami sessions now linked to logged‑in users**: You’ll now see analytics sessions tied directly to the user who’s logged in, making it easier to track individual activity in Umami.

## 2026-05-01

- **New 2026 ANC brand assets applied to website**: You’ll now see the fresh 2026 ANC branding on the site – updated logos, colors, and graphics everywhere, giving the portal a modern, consistent look.

- **Umami session recorder now tracks user sessions**: You can now view full session recordings alongside the existing pageview data. This gives you a clearer picture of how users move through the site, helping you spot friction points and improve the experience.
## 2026-04-30

- **Original ANC logo restored across rag2**: The ANC logo has been reverted to its original design across rag2, so you’ll see the familiar branding again.

- **Import now accepts 'Responsibility Matrix' tab**: You can now import proposals from Excel files that use a sheet named "Responsibility Matrix". The parser recognizes this tab name just like the original one, so your existing workflows continue without change.
## 2026-04-29

- **Standardize LED product names to RS and FM**: LED product names have been standardized: items previously labeled ‘HB’ now appear as ‘RS’, and any blank entries are shown as ‘FM’. New LED products will default to ‘RS’.

- **Unified ANC Services logo across all platforms**: The ANC logo is now consistent everywhere you use the system. All screens and communications now display the ANC Services logo, giving a unified brand experience.
## 2026-04-28

- **Yaham Direct rate card updated to 04.28.26 prices**: The Yaham Direct rate card now reflects the latest 04.28.26 pricing, so any new quotes or contracts will use the updated rates.

## 2026-04-27

- **Repeat‑clients margin report now includes all records**: The repeat‑clients margin report no longer filters out any records, so you’ll see the full set of data again. The numbers now reflect the complete client activity as before.
- **Zero-revenue records excluded from repeat-client margin report**: The repeat-client margin report now skips any entries with $0 revenue, so the margin numbers you see are more accurate.

- **Export repeat‑client data as Excel file**: You can now generate and download an XLSX spreadsheet of repeat‑client information directly from the CRM. Use the new render endpoint to get a ready‑to‑use file for your reports.
- **Render API now accessible without login**: You can now call the /api/render/* endpoint without authenticating first. This removes the need for a login step, letting integrations fetch rendered content directly.
- **Render API now accessible without login**: You can now call the /api/render/* endpoints directly without signing in. The system no longer requires authentication for those requests, simplifying your integration workflow.
- **Pricing status auto-updates for Twenty opportunities in Mirror Mode**: In Mirror Mode, the system now automatically flips the Pricing Complete flag on Twenty opportunities, so you’ll see pricing marked as finished without any manual steps.
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
- **Corrected account LTV aggregation**: Account Lifetime Value reports now aggregate accurately, eliminating fuzzy mismatches that could skew totals. Users will see consistent LTV figures across all accounts.
- **LTV section updated with current status and known issues**: The LTV documentation now reflects the current system state and lists three known issues, so you can see the latest information and what to watch out for.
- **Refresh repeat clients report styling**: The repeat clients report now follows the updated template styling, giving you a cleaner and more consistent view. You’ll notice improved alignment and visual cues that make the data easier to scan.
- **Zero‑value rows omitted from Account LTV reports**: Account Lifetime Value reports now hide rows with a zero amount, so you see only the meaningful data without empty entries.
- **Repeat client reports now include won opportunity vertical**: You can now generate repeat client reports that are organized by the vertical of won opportunities, giving you clearer insight into repeat business across different market segments.
- **Show Won Opportunity Count in Repeat Clients Report**: The Repeat Clients report now displays a count of won opportunities for each client. This lets you see at a glance how many deals have been successfully closed, helping you track performance more efficiently.
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
