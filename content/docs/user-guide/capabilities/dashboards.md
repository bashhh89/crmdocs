---
title: Dashboards
description: The ANC 2026 Company Dashboard — Jireh's daily view, widget by widget.
---

# Dashboards

The CRM ships with the dashboards Jireh and the team use daily. The centerpiece is the **ANC 2026 Company Dashboard**.

## ANC 2026 — Company Dashboard

This is the dashboard Jireh opens every morning. It's the direct replacement for his Salesforce "Company Performance 2026 by Department" report.

**Structure:** 4 tabs — Company Overview · Technology · Venue Services · Media & Sponsorship

**Widgets per tab** include:
- Booked revenue (current year) — bar chart by business unit
- Forecasted revenue (probability ≥ 50) — bar chart
- Margin by vertical — number widgets
- Pipeline by stage — pie
- Top open deals — list
- Activity trend — line over last 3 months

The 50%-probability filter mirrors SF convention — Jireh explicitly asked for this cutoff.

## Other dashboards

| Dashboard | Purpose |
|---|---|
| Pipeline Overview (Last 3 Months) | Recent activity snapshot |
| Sales Pipeline Analytics | Stage/bidStatus breakdown with time-to-close |
| Priority Clients Dashboard | Top accounts + open exposure |
| My Pipeline Dashboard (Current Quarter) | Per-user view for AEs |
| Activity & Performance Tracker | Wins, losses, conversion rates |
| Operations Overview | Services + tickets summary |

## Switching to the ANC app

**Important:** On first login, Twenty defaults to the "Standard" app. To see the ANC-specific dashboards:

1. Top-left app switcher → **ANC**
2. Dashboards will now appear at the top of the sidebar

If you're sending a direct link to a stakeholder, use the full URL including the app — the dashboards live in the ANC app, not Standard.

## Favorites

Each user has pinned favorites at the top of their sidebar. Out of the box:

| User | Pinned |
|---|---|
| Jireh | ANC 2026 Dashboard · Revenue Forecast · Pipeline by Business Unit · Top Open Deals |
| Natalia | Estimation & Proposals · Proposal Pipeline · Bid Tracker · ANC 2026 Dashboard |
| Alexis | Proposal Pipeline · Bid Tracker · Active Pipeline |

To adjust: go to any dashboard/view → click the star. That's it.

## Adding a new widget

1. Open the dashboard → Edit
2. Click "Add widget"
3. Pick type (bar / pie / number / gauge / line)
4. Filter: use JSON-stringified arrays for SELECT values, e.g. `"value":"[\"WON\"]"`
5. For numeric compare, use string-encoded numbers: `"value":"50"`

See [Operators — Field IDs Reference](/docs/operators/field-ids-reference) for field UUIDs to use in widget filters.
