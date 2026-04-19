---
title: Field IDs Reference
description: UUID lookups for dashboard widget filters and scripts.
---

# Field IDs Reference

Widget filters, GraphQL metadata calls, and Scout's skills all take field UUIDs. This page is the lookup table.

## Object IDs

| Object | ID |
|---|---|
| Company | `ccd95b3f-4a9a-443c-b8f2-01bff6c479ab` |
| Opportunity | `c779922d-cf25-4a5e-9382-23eb1c02199e` |
| OpportunityTeamAllocation | `7416ebb0-94d9-4551-bc2e-1991690849c2` |

## Opportunity field IDs

| Field | Type | ID |
|---|---|---|
| `probability` | NUMBER | `22d629a5-c8e4-488a-85fc-f2650dac66bf` |
| `proposalDueDate` | DATE_TIME | `65b6da7e-a84b-4603-af7e-1bfbb14d808f` |
| `substantialCompletionDate` | DATE | `f41a1659` |
| `paidAmount` | CURRENCY | `c592d989` |
| `percentPaid` | NUMBER | `724c5d5a` |
| `accountExecutive` | TEXT | `8ae86200` |
| `accountExecutiveEmail` | TEXT | `037bae0d` |
| `margin` | CURRENCY | `44ea22b6` |
| `revenue2026` | CURRENCY | `3741f86c` |
| `margin2026` | CURRENCY | `58096d7b` |
| `revenue2027` | CURRENCY | `3339789a` |
| `margin2027` | CURRENCY | `b60145ca` |
| `proposalStage` | SELECT | `0c4f3e5a` |
| `priority` | SELECT | `619db9a8` |
| `pricingComplete` | BOOLEAN | `f58790ec` |
| `pricingCompleteDate` | DATE_TIME | `a8ae65db` |
| `technologyVendorPartner` | TEXT | `ad068a2a` |
| `businessUnit` | SELECT | `d04948e5-4118-4975-b811-1f1e39002c9e` |
| `league` | SELECT | `891db6b2-8973-4004-8ae7-b204a3f28c45` |
| `bidStatus` | SELECT | `ad436148-604e-4b05-a5a7-9bcc35117410` |
| `dealValue` | CURRENCY | `6cbd4fc1-b457-49b0-b1aa-2252fd3ba216` |
| `amount` | CURRENCY | `abe371af-8f95-413f-8e57-eee130a03d3d` |
| `stage` | SELECT | `09da76a4-8deb-4ea6-a819-42ad92eada4f` |
| `closeDate` | DATE_TIME | `56c90982-6391-4cdf-8b61-9d0097226807` |
| `company` | RELATION | `fa5178b8-6881-444d-9ed4-8150949129e1` |

## OpportunityTeamAllocation field IDs

| Field | Type | ID |
|---|---|---|
| `opportunity` | RELATION | `69f054fa` |
| `team` | RELATION | `a07aded9` |
| `fiscalYear` | NUMBER | `10ee9a9c` |
| `revenue` | CURRENCY | `3478162c` |
| `margin` | CURRENCY | `1cf59cda` |
| `cost` | CURRENCY | `08525d01` |
| `department` | TEXT | `dff51275` |
| `notes` | TEXT | `431c5f0c` |

## Reverse-relation field IDs

| On object | Reverse relation | Points to | Field ID |
|---|---|---|---|
| Opportunity | `teamAllocations` | OpportunityTeamAllocation | `bcc340a7` |
| Opportunity | `serviceTickets` | ServiceTicket | (via `serviceTicket.opportunity`) |
| Company | `teamAllocations` | OpportunityTeamAllocation | `14ef07fd` |
| Company | `serviceTickets` | ServiceTicket | `397aa8e1-0445-4580-9a7a-cb6ddca2e73e` |

## Widget filter JSON format

Dashboard widgets take a filter object. Format:

```json
{
  "operator": "AND",
  "children": [
    {
      "fieldMetadataId": "<uuid>",
      "operand": "IS_NOT",
      "value": "[\"WON\"]"
    }
  ]
}
```

**Important formatting rules:**
- **SELECT values are JSON-stringified arrays** — use `"[\"WON\"]"`, not `"WON"`
- **Numeric compare values are string-encoded** — `"value":"50"`, not `50`

## Operand enum (ViewFilterOperand)

```
IS · IS_NOT · IS_NOT_NULL · GREATER_THAN_OR_EQUAL · LESS_THAN_OR_EQUAL ·
IS_BEFORE · IS_AFTER · CONTAINS · DOES_NOT_CONTAIN · IS_EMPTY · IS_NOT_EMPTY ·
IS_RELATIVE · IS_IN_PAST · IS_IN_FUTURE · IS_TODAY · VECTOR_SEARCH
```

## How to look up more field IDs

```graphql
query {
  object(input: {id: "c779922d-cf25-4a5e-9382-23eb1c02199e"}) {
    fields {
      id
      name
      type
      options { value label }
    }
  }
}
```

Substitute the object ID for any object. Output includes every field's UUID.
