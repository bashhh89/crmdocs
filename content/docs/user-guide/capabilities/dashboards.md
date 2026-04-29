---
title: Dashboards
description: Executive and operational dashboards built into the CRM.
---

# Dashboards

The CRM ships with the dashboards the leadership and proposal teams use daily. The centerpiece is the **ANC 2026 Company Dashboard** — Jireh's direct replacement for the Salesforce "Company Performance 2026 by Department" report.

## ANC 2026 — Company Dashboard

The primary executive view. 4 tabs structured to match the way Jireh thinks about the business:

- **Company Overview** — the rollup. 11 + 3 + 8 widgets covering booked revenue, forecast, margin, pipeline stage, top deals, activity trend
- **Technology** — same widgets scoped to the Technology vertical
- **Venue Services** — same widgets scoped to Venue Services
- **Media & Sponsorship** — same widgets scoped to advertising/sponsorship deals

The 50% probability cutoff is applied as the standard "qualified pipeline" filter across all forecast widgets — this matches the SF convention.

The 11 new widgets (added 2026-04-17) replicate Jireh's SF layout exactly. The dashboard is pinned to every executive's sidebar by default.

## Natalia's daily reports

Three views the proposal team relies on every morning:

| View | What it shows |
|---|---|
| **Proposal Pipeline** | Daily queue, sorted `proposalDueDate` ASC |
| **Estimation & Proposals Report** | SF-mirror of the live estimations queue — same column order, same filters as Natalia's existing SF report (`AND` / `OR` filter group: pricing not complete, recent submission, not WON). Refreshed 2026-04-27. |
| **Estimation & Proposals** | The simpler "what's ready to send" group, filtered by `pricingComplete` |

The two "Estimation & Proposals" views look similar by name — the one with **"Report"** in the title is the literal SF mirror Jireh asked for; the other is the simpler in-CRM view. Both are pinned for Natalia.

## Other dashboards

| Dashboard | Purpose |
|---|---|
| Pipeline Overview (Last 3 Months) | Recent activity snapshot |
| Sales Pipeline Analytics | Stage / bidStatus breakdown with time-to-close |
| Priority Clients Dashboard | Top accounts + open exposure |
| My Pipeline Dashboard (Current Quarter) | Per-user view for account executives |
| Activity & Performance Tracker | Wins, losses, conversion rates |
| Operations Overview | Services + tickets summary |
| Backlog | WON opps + substantial completion date + total contract + % unpaid |
| Win/Loss by League | RFP performance per league per FY |

## Switching to the ANC app

On first login, the workspace defaults to the "Standard" app. To see the ANC-specific dashboards:

1. Top-left app switcher → **ANC**
2. Dashboards will appear at the top of the sidebar

When sharing a direct link, include the full URL with the app path — the dashboards live in the ANC app, not Standard. The CRM remembers your last app choice across sessions.

## Universal pinned views

Two views are pinned to every workspace member by default so the team always sees them at the top of the sidebar:

- **Active Pricing Priority List** — pos 0 (top of every sidebar)
- **Pipeline by Business Unit** — pos 1

Universal pins were rolled out 2026-04-28 in response to Jireh's *"the views I'm seeing aren't the same as other people"* observation. The mechanism: the same view, pinned individually to every workspace member's favorites — Twenty doesn't have a "default view for everyone" toggle, but pinning achieves the same result.

## Per-user favorites

Beyond the universal pins, each user has additional favorites for the dashboards/views relevant to their role:

| Role | Pinned (in addition to the universal pins) |
|---|---|
| Executive (Jireh) | ANC 2026 Dashboard · Revenue Forecast · Top Open Deals |
| Proposal Lead (Natalia) | Estimation & Proposals Report · Estimation & Proposals · Proposal Pipeline · Bid Tracker · ANC 2026 Dashboard |
| Services (Alexis) | Proposal Pipeline · Bid Tracker · Active Pipeline |
| Account Executive | ANC 2026 Dashboard · Proposal Pipeline |

To adjust your own: open any dashboard or view and click the star.

## Adding a new widget

1. Open the dashboard → Edit
2. Click "Add widget"
3. Pick type (bar / pie / number / gauge / line)
4. Filter: use JSON-stringified arrays for SELECT values, e.g. `"value":"[\"WON\"]"`
5. For numeric compare, use string-encoded numbers: `"value":"50"`

See [Operators — Field IDs Reference](/docs/operators/field-ids-reference) for field UUIDs used in widget filters.

## See also

- [Views](./views) — the saved-search system that backs every dashboard widget list
- [Opportunities](./opportunities) — the underlying object every pipeline widget reads
