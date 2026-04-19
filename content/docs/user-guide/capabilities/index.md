---
title: Capabilities
description: What the CRM can do out of the box and what was built specifically for ANC.
---

# Capabilities

## Out of the box (standard Twenty)

- Companies, People, Opportunities, Notes, Tasks
- Table, Kanban, Kalendar views with filter/sort
- Native email + calendar sync (Microsoft 365 / Google)
- Dashboards with bar, pie, gauge, number, and line widgets
- REST and GraphQL APIs
- Custom agents (Helper is the default)
- File storage

## Built specifically for ANC

### Fields added to Opportunity
| Field | Purpose |
|---|---|
| `probability` | SF-style 0-100 likelihood |
| `proposalDueDate` | Natalia's daily sort column |
| `substantialCompletionDate` | Backlog key date |
| `paidAmount` / `percentPaid` | Finance status |
| `accountExecutive` / `accountExecutiveEmail` | Owner (text — we don't issue seats for 30+ SF sellers) |
| `margin` / `revenue2026` / `margin2026` / `revenue2027` / `margin2027` | Jireh's dashboard math |
| `proposalStage` | RFP / SALES_LEAD / BAFO / LOI / EXISTING_CLIENT_BUDGET |
| `priority` | PRIORITY_1_RFP / BEST_AND_FINAL / PRICING_COMPLETE |
| `pricingComplete` + `pricingCompleteDate` | Flips TRUE when one-pager generated |
| `technologyVendorPartner` | LG / Yaham / etc. |
| `businessUnit` | TECHNOLOGY / VENUE_SERVICES / MEDIA_SPONSORSHIP |
| `league` | NFL, NBA, MLB, NHL, NCAA, MLS, WNBA, NWSL + 12 more |
| `bidStatus` | RFP_RECEIVED → WON/LOST/NO_BID |

### Custom objects
- **`opportunityRevenueSplit`** — per-fiscal-year INSTALL / SERVICE / LICENSING / OTHER splits
- **`opportunityTeamAllocation`** — per-team sale price + expense for advertising-style deals (e.g., Hankook MLB across 9 teams)
- **`serviceTicket`**, **`designRequest`**, **`estimate`**, **`rfpAnalysis`** — linked to both Company and Opportunity

### Custom views
Built for Jireh + Natalia's workflow — see [Views](./views) for the full list and what each one sorts by.

### Custom AI
- **Boyka** — 30 ANC-specific skills (pipeline-tracker, rfp-analyzer, sow-generator, designer-ai, ticket-triage, etc.)
- **Designer AI** — generate venue mockup images in ~20 seconds, auto-create Design Requests

### Tab layouts per record
- **Company detail:** 9 tabs including Tickets, Estimates, Design Requests, RFP Analyses, Venues, Team Allocations
- **Opportunity detail:** Revenue Splits, Estimates, Team Allocations tabs
- **Venue detail:** Tickets, Events, Opportunities, Estimates, RFP Analyses tabs

## Intentionally not built

- **Ops workflows inside the CRM.** Joe's team uses the Service Dashboard; the CRM shows linked tickets at the account level but doesn't re-implement the ticket lifecycle UI.
- **Einstein-style auto-capture.** Didn't work for ANC in Salesforce — we don't try to replicate it.
- **Deep financial tracking on advertising opps.** Per Jireh's ask, advertising opps are "minimal detail, tracking only."
