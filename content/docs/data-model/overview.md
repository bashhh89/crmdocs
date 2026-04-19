---
title: Data Model Overview
description: Objects, relations, and how they connect in the ANC CRM.
---

# Data Model Overview

The CRM runs on Twenty's object model. Every row is a record; every record has an object type; objects relate to each other through typed relations.

## Core objects

```
Company ──┬── Opportunity ──┬── OpportunityRevenueSplit
          │                 ├── OpportunityTeamAllocation
          │                 ├── Estimate
          │                 ├── RfpAnalysis
          │                 ├── DesignRequest
          │                 └── ServiceTicket (WON opps only)
          ├── Person
          ├── Venue ─────────── ServiceTicket / Event
          └── (reverse relations of all above)
```

## Object IDs (for API use)

| Object | ID |
|---|---|
| Company | `ccd95b3f-4a9a-443c-b8f2-01bff6c479ab` |
| Opportunity | `c779922d-cf25-4a5e-9382-23eb1c02199e` |
| OpportunityTeamAllocation | `7416ebb0-94d9-4551-bc2e-1991690849c2` |

For all others, query metadata:
```graphql
query { objects { id nameSingular } }
```

## Relations cheat sheet

| From | Field | To | Type |
|---|---|---|---|
| Opportunity | `company` | Company | MANY_TO_ONE |
| Opportunity | `revenueSplits` | OpportunityRevenueSplit | ONE_TO_MANY (reverse) |
| Opportunity | `teamAllocations` | OpportunityTeamAllocation | ONE_TO_MANY (reverse) |
| Opportunity | `serviceTickets` | ServiceTicket | ONE_TO_MANY (reverse) |
| Opportunity | `estimates` | Estimate | ONE_TO_MANY (reverse) |
| Company | `opportunities` | Opportunity | ONE_TO_MANY |
| Company | `serviceTickets` | ServiceTicket | ONE_TO_MANY |
| Company | `teamAllocations` | OpportunityTeamAllocation | ONE_TO_MANY |
| Venue | `company` | Company | MANY_TO_ONE |
| ServiceTicket | `venue` | Venue | MANY_TO_ONE |
| ServiceTicket | `opportunity` | Opportunity | MANY_TO_ONE (new 2026-04) |
| ServiceTicket | `company` | Company | MANY_TO_ONE (via legacy `companyIdId`) |

## Enum values

### Opportunity.businessUnit
`TECHNOLOGY`, `VENUE_SERVICES`, `MEDIA_SPONSORSHIP`

### Opportunity.bidStatus
`RFP_RECEIVED`, `SCOPING`, `BID_SUBMITTED`, `SHORTLISTED`, `WON`, `LOST`, `NO_BID`

### Opportunity.stage
`NEW`, `SCREENING`, `MEETING`, `PROPOSAL`, `CUSTOMER`

### Opportunity.proposalStage
`RFP`, `SALES_LEAD`, `BAFO`, `LOI`, `EXISTING_CLIENT_BUDGET`

### Opportunity.priority
`PRIORITY_1_RFP`, `BEST_AND_FINAL`, `PRICING_COMPLETE`

### Opportunity.rfpSource
`BUILDING_CONNECTED`, `DIRECT`, `REFERRAL`, `COLD_OUTREACH`

### Company.revenueType
`TECHNOLOGY`, `VENUE_SERVICES`, `MEDIA_SPONSORSHIP`, `MULTIPLE_VERTICALS`

### Company.league
20 values: `NFL`, `NBA`, `MLB`, `NHL`, `NCAA`, `MLS`, `WNBA`, `NWSL`, `NASCAR`, `GOLF_PGA`, `GOLF_LPGA`, `GOLF_ALL`, `NON_SPORTS`, `OTHER`, and 6 more for international and minor leagues.

### opportunityRevenueSplit.splitType
`INSTALL`, `SERVICE`, `LICENSING`, `OTHER`

## Denormalizations (on purpose)

We flattened some relations for dashboard performance:

- **Per-year revenue + margin** on Opportunity: `revenue2026`, `margin2026`, `revenue2027`, `margin2027` — denormalized from `opportunityRevenueSplit` so dashboard widgets don't have to group.
- **League on Opportunity** — mirrors Company.league, backfilled from the company. Simpler filtering on opp-level views.
- **Account Executive as TEXT, not RELATION** — we don't issue Twenty seats for 30+ SF sellers. TEXT field lets bar charts group by name without creating workspaceMembers.

## When to use child records vs. flat fields

| Use child records | Use flat fields |
|---|---|
| You need per-split detail (INSTALL vs SERVICE) | You need a single yearly total |
| Accounting consumes it | Dashboard widgets consume it |
| Split crosses fiscal-year boundaries | Single-year deal |

For Team Allocations (Hankook pattern), always use child records — each team is a real allocation, not a split.
