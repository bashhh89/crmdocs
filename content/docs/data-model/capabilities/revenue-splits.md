---
title: Revenue Splits
description: Per-fiscal-year, per-type revenue breakdowns on an Opportunity.
---

# Revenue Splits

The `opportunityRevenueSplit` child object stores per-FY, per-type revenue rows for a deal. 5,160 rows migrated from Salesforce.

## Why it exists

Salesforce's `Revenue_Tracker__c` tracked revenue per fiscal year per opportunity, with a `splitType` (what the revenue was for). We mirror that so accounting keeps the per-line breakdown.

For dashboard widgets, we **also denormalize** the yearly totals to flat fields on Opportunity (`revenue2026`, `margin2026`, etc.) so widgets can read without grouping.

## Fields

| Field | Type |
|---|---|
| `opportunity` | RELATION (to Opportunity) |
| `fiscalYear` | NUMBER (e.g., 2026) |
| `allocatedAmount` | CURRENCY |
| `margin` | CURRENCY |
| `splitType` | SELECT — INSTALL / SERVICE / LICENSING / OTHER |
| `notes` | TEXT |

## When to create splits vs. flat fields

**Use splits when:**
- Deal crosses fiscal years (e.g., 50/50 MLB split across 2026/2027)
- Accounting needs per-line detail (e.g., INSTALL revenue vs. SERVICE revenue under same deal)
- Finance imports/exports from the CRM

**Use flat fields (revenue2026, etc.) when:**
- Dashboard widgets read it
- Simple single-year deal
- You're starting the deal and will fill splits later

These aren't mutually exclusive — in practice, both are populated. The flat fields are the sum across all split rows for that FY.

## Bulk create splits

GraphQL supports array create:

```graphql
mutation {
  createOpportunityRevenueSplits(
    data: [
      {opportunityId: "uuid1", fiscalYear: 2026, allocatedAmount: 500000, splitType: "INSTALL"},
      {opportunityId: "uuid1", fiscalYear: 2027, allocatedAmount: 300000, splitType: "SERVICE"}
    ]
  ) { ... }
}
```

## Known inconsistency (from SF)

Salesforce's schema had a weird naming pattern:
- `X2026_Revenue__c` / `X2026_Margin__c` — paired
- `X2027__c` / `X2027_Margin__c` — `X2027__c` is missing the `_Revenue` suffix

We normalize to consistent `revenue<year>` / `margin<year>` on Opportunity, and `fiscalYear` + `allocatedAmount` on the split rows.
