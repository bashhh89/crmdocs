---
title: Capabilities
description: What the CRM can do out of the box and what was built specifically for ANC.
---

# Capabilities

## Core capabilities

- Companies, People, Opportunities, Notes, Tasks
- Table, Kanban, Calendar views with filter/sort
- Native email + calendar sync (Microsoft 365 / Google)
- Dashboards with bar, pie, gauge, number, and line widgets
- REST and GraphQL APIs
- Custom agents (Helper is the default)
- File storage

## Built specifically for ANC

### Fields added to Opportunity
| Field | Purpose |
|---|---|
| `probability` | SF-style 0–100 likelihood |
| `proposalDueDate` | Primary sort for the proposal pipeline |
| `substantialCompletionDate` | Key date for the Backlog view |
| `paidAmount` / `percentPaid` | Finance status |
| `accountExecutive` / `accountExecutiveEmail` | Owner (TEXT — no workspace seat issued for every legacy seller) |
| `margin` / `revenue2026` / `margin2026` / `revenue2027` / `margin2027` | Per-year revenue and margin for executive dashboards |
| `proposalStage` | RFP / SALES_LEAD / BAFO / LOI / EXISTING_CLIENT_BUDGET |
| `priority` | PRIORITY_1_RFP / BEST_AND_FINAL / PRICING_COMPLETE |
| `pricingComplete` + `pricingCompleteDate` | Flips TRUE when the one-pager is generated |
| `technologyVendorPartner` | LG / Yaham / etc. |
| `businessUnit` | TECHNOLOGY / VENUE_SERVICES / MEDIA_SPONSORSHIP |
| `league` | NFL, NBA, MLB, NHL, NCAA, MLS, WNBA, NWSL + 12 more |
| `bidStatus` | RFP_RECEIVED → WON / LOST / NO_BID |

### Custom objects
- **`opportunityRevenueSplit`** — per-fiscal-year INSTALL / SERVICE / LICENSING / OTHER splits
- **`opportunityTeamAllocation`** — per-team sale price and expense for advertising-style deals (the Hankook-MLB pattern across 9 teams)
- **`serviceTicket`**, **`designRequest`**, **`estimate`**, **`rfpAnalysis`** — linked to both Company and Opportunity

### Custom views
Views tailored to the proposal and executive reporting workflows — see [Views](./views) for the full list and what each one sorts by.

### Custom AI
- **Boyka** — 30 ANC-specific skills (pipeline-tracker, rfp-analyzer, sow-generator, designer-ai, ticket-triage, and more)
- **Designer AI** — generates venue mockup images in ~20 seconds and auto-creates Design Requests

### Tab layouts per record
- **Company detail:** 9 tabs including Tickets, Estimates, Design Requests, RFP Analyses, Venues, Team Allocations
- **Opportunity detail:** Revenue Splits, Estimates, Team Allocations tabs
- **Venue detail:** Tickets, Events, Opportunities, Estimates, RFP Analyses tabs

## Intentionally not built

- **Operational ticket workflows inside the CRM.** Field operations live on the Service Dashboard. The CRM surfaces linked tickets at the account level for visibility, but doesn't re-implement the ticket lifecycle UI.
- **Einstein-style auto-capture.** Not replicated — it didn't produce reliable results in the previous setup.
- **Deep financial tracking on advertising opportunities.** Advertising opps are intentionally kept lightweight — tracking-only, not full pipeline accounting.
