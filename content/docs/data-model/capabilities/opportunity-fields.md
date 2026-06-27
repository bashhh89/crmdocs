---
title: Opportunity fields
description: Every field on the Opportunity object.
---

# Opportunity fields

Full field reference for the fields users see on Opportunities.

## Native CRM fields

| Field | Type | Purpose |
|---|---|---|
| `name` | TEXT | Deal name |
| `stage` | SELECT | NEW / SCREENING / MEETING / PROPOSAL / CUSTOMER |
| `amount` | CURRENCY | Realized/recognized revenue |
| `closeDate` | DATE_TIME | Expected or actual close |
| `company` | RELATION | FK to Company |

## ANC-added fields

| Field | Type | Notes |
|---|---|---|
| `probability` | NUMBER | 0–100 |
| `proposalDueDate` | DATE_TIME | Primary sort for the proposal pipeline |
| `substantialCompletionDate` | DATE | Backlog key date |
| `paidAmount` | CURRENCY | Finance |
| `percentPaid` | NUMBER | Payment progress |
| `accountExecutive` | TEXT | Owner name |
| `accountExecutiveEmail` | TEXT | Owner email |
| `margin` | CURRENCY | Amount minus cost |
| `revenue2026` | CURRENCY | Flat per-year revenue |
| `margin2026` | CURRENCY | Flat per-year margin |
| `revenue2027` | CURRENCY | Flat per-year revenue |
| `margin2027` | CURRENCY | Flat per-year margin |
| `proposalStage` | SELECT | RFP / Sales Lead / BAFO / LOI / Existing Client Budget |
| `priority` | SELECT | Priority 1 RFP / Best and Final / Pricing Complete |
| `pricingComplete` | BOOLEAN | Flips true on one-pager generation |
| `pricingCompleteDate` | DATE_TIME | Auto-stamped |
| `technologyVendorPartner` | TEXT | Technology partner |
| `businessUnit` | SELECT | Technology / Venue Services / Media & Sponsorship |
| `league` | SELECT | Mirrors Company league |
| `bidStatus` | SELECT | ANC bid flow |
| `dealValue` | CURRENCY | What customer pays |
| `rfpSource` | SELECT | Where RFP came from |

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

For bulk changes, export the target view, confirm the intended update with the record owner, and ask an admin to run the controlled update.
