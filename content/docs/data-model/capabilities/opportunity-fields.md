---
title: Opportunity fields
description: Every field on the Opportunity object.
---

# Opportunity fields

Full field reference. Field IDs are used by dashboard widget filters, GraphQL queries, and bulk scripts.

## Native Twenty fields

| Field | Type | Purpose |
|---|---|---|
| `name` | TEXT | Deal name |
| `stage` | SELECT | NEW / SCREENING / MEETING / PROPOSAL / CUSTOMER |
| `amount` | CURRENCY | Realized/recognized revenue |
| `closeDate` | DATE_TIME | Expected or actual close |
| `company` | RELATION | FK to Company |

## ANC-added fields

| Field | Type | Field ID | Notes |
|---|---|---|---|
| `probability` | NUMBER | `22d629a5` | 0–100 |
| `proposalDueDate` | DATE_TIME | `65b6da7e` | Natalia's primary sort |
| `substantialCompletionDate` | DATE | `f41a1659` | Backlog key date |
| `paidAmount` | CURRENCY | `c592d989` | Finance |
| `percentPaid` | NUMBER | `724c5d5a` | |
| `accountExecutive` | TEXT | `8ae86200` | Owner name (no seat issued) |
| `accountExecutiveEmail` | TEXT | `037bae0d` | |
| `margin` | CURRENCY | `44ea22b6` | amount − cost |
| `revenue2026` | CURRENCY | `3741f86c` | Flat per-FY denorm |
| `margin2026` | CURRENCY | `58096d7b` | |
| `revenue2027` | CURRENCY | `3339789a` | |
| `margin2027` | CURRENCY | `b60145ca` | |
| `proposalStage` | SELECT | `0c4f3e5a` | RFP/SALES_LEAD/BAFO/LOI/EXISTING_CLIENT_BUDGET |
| `priority` | SELECT | `619db9a8` | PRIORITY_1_RFP/BEST_AND_FINAL/PRICING_COMPLETE |
| `pricingComplete` | BOOLEAN | `f58790ec` | Flips TRUE on one-pager generation |
| `pricingCompleteDate` | DATE_TIME | `a8ae65db` | Auto-stamped |
| `technologyVendorPartner` | TEXT | `ad068a2a` | LG / Yaham / etc. |
| `businessUnit` | SELECT | `d04948e5` | TECHNOLOGY/VENUE_SERVICES/MEDIA_SPONSORSHIP |
| `league` | SELECT | `891db6b2` | Mirrors Company.league |
| `bidStatus` | SELECT | `ad436148` | ANC bid flow |
| `dealValue` | CURRENCY | `6cbd4fc1` | What customer pays |
| `rfpSource` | SELECT | | Where RFP came from |

## Relations

| Field | Points to | Type |
|---|---|---|
| `company` | Company | MANY_TO_ONE |
| `revenueSplits` | OpportunityRevenueSplit | ONE_TO_MANY (reverse) |
| `teamAllocations` | OpportunityTeamAllocation | ONE_TO_MANY (reverse `bcc340a7`) |
| `serviceTickets` | ServiceTicket | ONE_TO_MANY (reverse) |
| `estimates` | Estimate | ONE_TO_MANY (reverse) |

## Tab layout (Opportunity detail page)

Layout ID: `c98edd03`

| Pos | Tab |
|---|---|
| 10 | Overview |
| 20 | Notes |
| 30 | Tasks |
| 40 | Files |
| 80 | Revenue Splits |
| 81 | Estimates |
| 80 | Team Allocations (tab id `426a229c`) |
| — | Tickets (backfilled only for WON opps) |

## Bulk update pattern

GraphQL supports batch updates with filter. Example — set `bidStatus = WON` for a list of opp IDs:

```graphql
mutation {
  updateOpportunities(
    data: {bidStatus: "WON"},
    filter: {id: {in: ["uuid1","uuid2","uuid3"]}}
  ) { affectedCount }
}
```

Cap: 200 records per call. For more, chunk.
