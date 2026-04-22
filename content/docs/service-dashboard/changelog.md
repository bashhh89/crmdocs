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
