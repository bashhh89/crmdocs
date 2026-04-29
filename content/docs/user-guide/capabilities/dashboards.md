---
title: Dashboards
description: The leadership and proposal dashboards built into the CRM.
---

# Dashboards

The CRM ships with the dashboards leadership and the proposal team use daily. The centerpiece is the **ANC 2026 Company Dashboard** — Jireh's direct replacement for the Salesforce "Company Performance 2026 by Department" report.

## ANC 2026 — Company Dashboard

The primary executive view. Four tabs structured the way Jireh thinks about the business:

- **Company Overview** — the rollup. Booked revenue, forecast, margin, pipeline by stage, top deals, and an activity trend line.
- **Technology** — the same widgets, scoped to Technology deals
- **Venue Services** — same widgets, scoped to Venue Services
- **Media & Sponsorship** — same widgets, scoped to advertising and sponsorship

Forecast widgets only count deals at 50% probability or above, the same convention used in Salesforce.

The dashboard layout was rebuilt in April 2026 to match Jireh's exact SF layout. It's pinned to every executive's sidebar by default.

## Natalia's daily reports

Three views the proposal team relies on every morning:

| View | What it shows |
|---|---|
| **Proposal Pipeline** | Daily queue, sorted by Bid Due Date |
| **Estimation & Proposals Report** | Live estimations queue — same column order, same filters as Natalia's existing Salesforce report |
| **Estimation & Proposals** | The simpler "what's ready to send" group, filtered by Pricing Complete |

The two "Estimation & Proposals" views look similar by name. The one with **"Report"** in the title is the literal Salesforce mirror. The other is the simpler in-CRM view. Both are pinned for Natalia.

## Other dashboards

| Dashboard | Purpose |
|---|---|
| Pipeline Overview (Last 3 Months) | Recent activity snapshot |
| Sales Pipeline Analytics | Stage / Bid Status breakdown with time-to-close |
| Priority Clients Dashboard | Top accounts and open exposure |
| My Pipeline (Current Quarter) | Per-user view for account executives |
| Activity & Performance Tracker | Wins, losses, conversion rates |
| Operations Overview | Services and tickets summary |
| Backlog | Won deals + substantial completion + percent unpaid |
| Win/Loss by League | RFP performance per league per fiscal year |

## Switching to the ANC app

On first login, the workspace defaults to the "Standard" app. To see the ANC dashboards:

1. Click the app switcher (top-left)
2. Pick **ANC**

The dashboards will appear at the top of the sidebar. The CRM remembers your last app choice across sessions.

## Universal pinned views

Two views are pinned at the top of every team member's sidebar by default:

- **Active Pricing Priority List** — first
- **Pipeline by Business Unit** — second

This keeps everyone looking at the same starting view. Rolled out in late April 2026 in response to Jireh's note that *"the views I'm seeing aren't the same as other people."*

## Per-user favorites

Beyond the universal pins, each user has additional favorites for the dashboards relevant to their role:

| Role | Pinned (in addition to the universal pins) |
|---|---|
| Executive (Jireh) | ANC 2026 Dashboard · Revenue Forecast · Top Open Deals |
| Proposal Lead (Natalia) | Estimation & Proposals Report · Estimation & Proposals · Proposal Pipeline · Bid Tracker · ANC 2026 Dashboard |
| Services (Alexis) | Proposal Pipeline · Bid Tracker · Active Pipeline |
| Account Executive | ANC 2026 Dashboard · Proposal Pipeline |

Adjust your own: open any dashboard or view and click the star.

## Adding a new widget

1. Open the dashboard → Edit
2. Click **Add widget**
3. Pick a chart type (bar / pie / number / gauge / line)
4. Choose what data the widget reads, and any filter

That's it. No code, no formulas.

## See also

- [Views](./views) — the saved searches that back every dashboard list
- [Opportunities](./opportunities) — the deal data behind every pipeline widget
