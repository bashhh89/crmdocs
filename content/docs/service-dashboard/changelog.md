---
title: Service Dashboard Changelog
description: Auto-generated record of changes shipped to services.ancsports.net (anc-services repo).
---

# Service Dashboard Changelog

> Auto-generated. Every new commit on `anc-services` `codex/option-b-client-model` branch that's user-facing lands here within 15 min.

<!-- AUTO-ENTRIES-BELOW -->


## 2026-04-22

- **Add new Operations API endpoints**: You can now access the full set of Operations features—designs, requests, budgets, maintenance, RMA, time entries, and walkthroughs—through new API endpoints that can be enabled as needed.
- **New optional inventory mode with rebuilt foundation**: A new inventory mode is now available, offering a rebuilt foundation and cleaner data. Enable the new mode to see the updated inventory view and use the enhanced item management features.

- **Automatic retry on rate‑limit responses**: When the service hits a rate limit (429), it now automatically waits and retries based on the server’s Retry‑After header. This reduces interruptions and prevents manual retries for users.

- **Native proof upload replaces FTP**: You can now upload proof files directly through the system, eliminating the old FTP step. The new upload process is faster and more reliable.
- **Add new Twenty-backed print request API**: You can now send print requests through the new Twenty-backed API, letting your CRM create and track prints directly without extra steps.
- **Add new Twenty-backed print request module**: You can now submit and track print requests through the new Twenty‑backed workflow, with fresh pages and API endpoints that let you create, view, and manage prints right from the interface.

- **Proof files now accessible via token‑gated link**: You can now retrieve uploaded proof documents through a secure token‑gated link, making it easy to share proof files without exposing them publicly.
- **Content Schedule and Parts Ordering modules released**: The new Content Schedule and Parts Ordering modules are now live. You can create and manage content schedules and place parts orders directly in the platform. Just enable the Content Schedule feature in Settings to start using them.
- **Add filtering and cursor pagination to high‑volume APIs**: You can now apply real filters and use cursor‑based pagination when pulling data from maintenance, time‑entries, and walkthroughs endpoints. This makes it easier to locate specific records and navigate large result sets without overwhelming the system.

- **Parts ordering now uses an internal queue**: You can now place parts orders and watch them move through the new internal queue, giving you clearer visibility of order status. This change makes the ordering process more reliable and lets you track progress directly in the Parts Ordering view.
- **Corrected Twenty status mapping in opening checklists**: We fixed the status mapping for the Twenty checklist, so the correct status now appears when you view or edit opening checklists. This ensures your workflow reflects the right state without confusion.
- **Dashboard phase values now correctly recognized**: We fixed the opening checklists dashboard so phase values are properly translated before filtering or saving. This prevents errors and ensures your filters work as expected.
- **Hours budget alerts now available**: You’ll now receive automatic alerts when a project’s hours budget is exceeded, and you can view each alert’s status directly on the Hours Budgets page.
- **New 30/60/90 Day Stadium Prep Checklists**: You can now access a dedicated 30/60/90 day stadium preparation module in the Opening Checklists area (when the feature is turned on). This gives you a clear, step‑by‑step view of tasks to complete at each milestone before the stadium opens.

- **Docs updated to show Google Calendar sync removed**: The documentation now reflects that Phase 1 no longer includes Google Calendar synchronization. Users should no longer expect that integration to be available.
- **New admin and public pages added to client portal**: You now have a dedicated admin page to manage your client portal settings, and a public page that external users can view. These pages give you direct control and visibility without needing technical assistance.
- **Designs from Twenty now load correctly**: You can now view Twenty-backed designs without errors. The system now pulls these designs via REST, so previously missing rows are no longer a problem.
- **Hours Budget Alert UI and Simulation Added**: You now have a dedicated interface to view and manage hours‑budget alerts, and you can simulate alerts to see how they would trigger before they occur. Adjust thresholds and test alerts instantly from the new UI.

- **Token URLs now work without login**: You can now open a client portal directly using its /portals/<token> link without signing in first. This streamlines access for external users who receive a portal token.
- **Proof files now support versioning and request workflow**: You can now request a proof and see a version history for each uploaded file. The proof page shows the latest version while letting you access earlier revisions when needed.
- **Export option added to Print Requests**: You can now export your print request data directly from the system. This makes it easy to download and share request details.
- **Export print requests now available**: You can now export your print request data straight from the interface. This new export option lets you download the information you need in a convenient format.

- **Walkthrough results now handle missing data safely**: You’ll no longer see errors or broken pages when a walkthrough’s result column is empty—the results display correctly and the view remains stable.
- **Wrike task titles now visible in Issue column**: You can now see the Wrike task title directly in the Issue column, making it easier to identify tasks at a glance.

- **Expose full Twenty fields and normalize status**: You’ll now see all twenty design‑request fields displayed, and status values are standardized so they behave consistently across the system.
- **RMA status now reflects actual values and all fields displayed**: We've removed the hard‑coded status on RMA records, so you’ll now see the true current status. All twenty data fields are now surfaced, giving you the full details you need.
- **Walkthroughs now show real venue, technician, and standardized results**: The walkthroughs API now returns the actual venue and the assigned technician, and result values are normalized. This means the data you see in the CRM will be accurate and consistent when reviewing or reporting on walkthroughs.

- **Accurate hours budgets with refined UI**: Hours budgets now use the real contracted hours from Twenty, so the totals you see are accurate. The detail view has been polished for a cleaner, easier‑to‑read layout.
- **Time entries now show correct hours and dates**: Time entry records now display the actual hours spent and the correct date instead of zeros, so you’ll see accurate work logs.
- **Kanban lanes now reflect correct status and show all fields**: Designs now land in the proper Kanban lane based on their status, so you’ll see them where you expect. Any previously missing fields are now displayed, giving you a complete view of each design.
- **Sidebar navigation cleaned up into five sections**: The sidebar now displays five clean sections and removes all WIP badges and duplicate items, making it easier to find what you need.

- **Content schedule API now uses correct field names**: We updated the content schedule endpoints to match Twenty’s actual field names—startDate, endDate, and scheduleClient—so your integrations will now sync correctly without needing manual field mapping.

- **Corrected field names in Parts Orders**: We updated the Parts Orders view to use Twenty's actual field names. Requestor name, email, photo URL, and venue name now appear correctly for users.
- **Print request amounts now return valid numbers**: We fixed the print‑request API so currency values are unpacked into proper numbers, eliminating $NaN errors and ensuring your reports show accurate amounts.

- **Design proof upload auto‑advances status and emails client**: When you upload a design proof, the request status advances automatically and an email is sent to the client. No extra steps are required to update the status or trigger the notification.

- **Redesigned Design Detail Page with Reactive Stages**: I've rebuilt the design detail page to walk you through each stage, updating instantly as you make changes. The new reactive workflow means you see your edits in real time, so you don't need to refresh the page.

- **Dashboard status now saved as proper STATUS enum**: When you update a design request from the dashboard, the status is now correctly translated into the system’s STATUS_* enum, so the request reflects the right state.

- **Proof-share now serves files for Twenty-backed designs**: When you share a design that uses the Twenty backend, any uploaded files are now delivered correctly, so recipients can view or download them without error.
- **Fix missing stub for Twenty‑only design uploads**: When you upload a proof for a Twenty‑only design, the system now creates the required placeholder automatically, so the upload no longer fails with a “not found” error.
- **Corrected design request status for new stages UI**: We fixed the design request detail view so the status now aligns with the new stages UI. When you open a design request, the stage information displays correctly, reflecting the current status of the request.

- **Delete tickets directly from the system**: You can now delete tickets you no longer need, making it easy to clean up spam and keep your ticket list tidy.
- **AI-powered design request search and management**: You can now ask the system to locate design requests, automatically assign a designer, and update design details using AI. This streamlines your workflow by handling these steps with simple commands.

- **Stop automatic client email on proof upload**: Uploading a proof no longer triggers an automatic email to the client; the first quality check is now handled by Alexis.
- **Custom notification preferences with daily digests**: We've toned down the noise by stopping immediate check‑in and game‑ready submission alerts. Instead, you'll receive a concise summary of events twice a day at 9 am and 5 pm.

- **Default password for imported staff set to anc123**: When you import staff members, they’ll now be assigned the default password “anc123” as requested. This lets you log in with that password immediately after the import.
- **Admins can bulk‑delete tickets from list**: You can now select multiple tickets and delete them all at once from the tickets list, but this action is limited to admin users only.

- **Per-designer dashboards and ad‑hoc Randos flag**: You can now view a dedicated dashboard for each designer, showing only their own design requests. Additionally, the new “randos” flag lets you mark requests for ad‑hoc handling as requested by Alexis.

- **Filter bar added to walkthroughs list**: You can now narrow down walkthroughs by venue, result, technician, or a custom date range directly from the list view. Just select the desired criteria in the new filter bar to see only the records you need.
- **Expanded Maintenance Form with Rich Details, Escort, and Asset Link**: The maintenance request form now includes richer detail fields, an escort option, and a direct link to the associated asset. This lets you capture more context and quickly navigate to the asset while submitting a request.
- **Kanban PATCH fixed; new inventory form launched**: We've fixed the Kanban PATCH so board updates now work correctly, and introduced the Phase‑2 Wave 1 inventory form, letting you submit and manage inventory items directly.
