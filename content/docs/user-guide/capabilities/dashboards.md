---
title: Dashboards
description: Executive and operational dashboards built into the CRM.
---

# Dashboards

The CRM ships with the dashboards the leadership and proposal teams use daily. The centerpiece is the **ANC 2026 Company Dashboard**.

## ANC 2026 — Company Dashboard

The primary executive view — the direct replacement for the Salesforce "Company Performance 2026 by Department" report.

**Structure:** 4 tabs — Company Overview · Technology · Venue Services · Media & Sponsorship

**Widgets per tab** include:
- Booked revenue (current year) — bar chart by business unit
- Forecasted revenue (probability ≥ 50) — bar chart
- Margin by vertical — number widgets
- Pipeline by stage — pie
- Top open deals — list
- Activity trend — line over last 3 months

The 50%-probability filter is the standard cutoff for qualified pipeline across the workspace.

## Other dashboards

| Dashboard | Purpose |
|---|---|
| Pipeline Overview (Last 3 Months) | Recent activity snapshot |
| Sales Pipeline Analytics | Stage/bidStatus breakdown with time-to-close |
| Priority Clients Dashboard | Top accounts + open exposure |
| My Pipeline Dashboard (Current Quarter) | Per-user view for account executives |
| Activity & Performance Tracker | Wins, losses, conversion rates |
| Operations Overview | Services + tickets summary |

## Switching to the ANC app

On first login, the workspace defaults to the "Standard" app. To see the ANC-specific dashboards:

1. Top-left app switcher → **ANC**
2. Dashboards will appear at the top of the sidebar

When sharing a direct link, include the full URL with the app path — the dashboards live in the ANC app, not Standard.

## Favorites

Each user has pinned favorites at the top of their sidebar. Default assignments:

| Workspace member | Pinned |
|---|---|
| Executive | ANC 2026 Dashboard · Revenue Forecast · Pipeline by Business Unit · Top Open Deals |
| Proposal Lead | Estimation & Proposals · Proposal Pipeline · Bid Tracker · ANC 2026 Dashboard |
| Services | Proposal Pipeline · Bid Tracker · Active Pipeline |

To adjust: open any dashboard or view and click the star.

## Adding a new widget

1. Open the dashboard → Edit
2. Click "Add widget"
3. Pick type (bar / pie / number / gauge / line)
4. Filter: use JSON-stringified arrays for SELECT values, e.g. `"value":"[\"WON\"]"`
5. For numeric compare, use string-encoded numbers: `"value":"50"`

See [Operators — Field IDs Reference](/docs/operators/field-ids-reference) for field UUIDs used in widget filters.
