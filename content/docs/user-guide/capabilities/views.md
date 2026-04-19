---
title: Views
description: Pre-built table and kanban views — what each one shows and who uses it.
---

# Views

Views are saved table/kanban/kalendar configurations. The CRM ships with views built specifically for ANC's workflows.

## Proposal & Bid views (Natalia's workflow)

| View | Type | What |
|---|---|---|
| **Proposal Pipeline** | Table | Daily queue, sort by `proposalDueDate` ASC |
| **Estimation & Proposals** | Table | 15-column SF report replica including priority, proposalStage, pricingComplete |
| **Bid Tracker** | Kanban | Kanban on `bidStatus` — drag cards between RFP_RECEIVED → WON |
| **My Active Bids** | Kanban | Per-user bid board |
| **Backlog** | Table | WON opps, sort by `substantialCompletionDate` ASC, cols include dealValue, paidAmount, percentPaid |
| **Win/Loss by League** | Table | `bidStatus IN (WON, LOST, NO_BID)`, grouped by league, `closeDate` DESC |

## Account / Revenue views (Jireh's use)

| View | What |
|---|---|
| **Pipeline by Business Unit** | Table, group by businessUnit |
| **Revenue Forecast** | Table, forecasted opps ≥ 50% probability |
| **Top Open Deals** | Table, sort by `dealValue` DESC, exclude WON/LOST/NO_BID |

## How to create a view

1. Open any object (Deals, Companies, etc.)
2. Apply filter + sort + columns
3. Click "Save as view"
4. Choose Table / Kanban / Kalendar

Views can be shared by URL inside the workspace.

## View IDs (for direct-linking or API use)

| View | ID |
|---|---|
| Proposal Pipeline | `d468e33e-4ed2-49c4-8012-2d3d904a30d0` |
| Estimation & Proposals | `6d488595-b04d-465b-81ea-0eb151418268` |
| Backlog | `1c775cd3-60d6-4c5c-aa6f-172646766b22` |
| Win/Loss by League | `6aae4c98-4a5f-486b-a1ad-d3406534facd` |
| Pipeline by Business Unit | `a5b4cfa5-7dc4-4555-97d8-5d2b3dba8434` |
| Revenue Forecast | `e27a7793-7aae-472e-94b8-334303a15876` |
| Bid Tracker | `3e674b0a-5931-40dc-8fcc-ecb1c3c9f050` |
| My Active Bids | `9a8f88dd-1406-4478-ab8d-7eaae2ddd7c1` |
| Top Open Deals | `1fac7239-c3dc-40ea-9db7-2277846569de` |

Direct URL pattern: `https://crm.ancsports.net/objects/opportunities?view=<id>`
