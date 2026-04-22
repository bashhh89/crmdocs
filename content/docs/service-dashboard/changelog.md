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
