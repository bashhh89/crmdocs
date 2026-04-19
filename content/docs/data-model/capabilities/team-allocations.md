---
title: Team Allocations
description: Per-team sale price + expense for advertising deals spread across multiple teams.
---

# Team Allocations

The `opportunityTeamAllocation` object tracks per-team revenue for advertising deals where ANC spends on behalf of an advertiser across multiple teams.

Canonical example: **Hankook Tire - MLB 2024** — one opportunity, nine team allocations ($750K Red Sox, $550K Yankees, $300K Mets, $285K Mariners, $200K Brewers, $175K Tigers, $165K Angels, $100K Royals, $50K Nationals) summing to $2.575M.

## Why separate from Revenue Splits

| Revenue Split | Team Allocation |
|---|---|
| Per-FY, per-type breakdown | Per-team breakdown |
| Used for accounting | Used for media deal reporting |
| Links to fiscal year | Links to team (a Company) |

A deal can have both: Revenue Splits for the accounting view, Team Allocations for the client view.

## Fields

Object ID: `7416ebb0-94d9-4551-bc2e-1991690849c2`

| Field | Type | Field ID |
|---|---|---|
| `opportunity` | RELATION | `69f054fa` |
| `team` | RELATION (to Company) | `a07aded9` |
| `fiscalYear` | NUMBER | `10ee9a9c` |
| `revenue` | CURRENCY | `3478162c` |
| `margin` | CURRENCY | `1cf59cda` |
| `cost` | CURRENCY | `08525d01` |
| `department` | TEXT | `dff51275` |
| `notes` | TEXT | `431c5f0c` |

## Reverse relations

- `Opportunity.teamAllocations` — field ID `bcc340a7` (tab position 80, tab ID `426a229c`)
- `Company.teamAllocations` — field ID `14ef07fd` (tab position 76, tab ID `ab07a305`)

## Migration

472 allocations migrated from SF's orphan `Revenue_Tracker__c` rows (where the Account didn't match the parent opportunity's Account — the ANC convention for Hankook-style deals). Source: 860 orphan rows total, 537 matched to a parent opportunity by name, 372 had per-FY data.

## Creating a new allocation

Open the Opportunity → **Team Allocations** tab → **+ New**. Or via API:

```graphql
mutation {
  createOpportunityTeamAllocation(data: {
    opportunityId: "opp-uuid",
    teamId: "company-uuid-of-the-team",
    fiscalYear: 2026,
    revenue: 750000,
    cost: 200000,
    margin: 550000,
    department: "MEDIA",
    notes: "Red Sox signage + broadcast"
  }) { id }
}
```
