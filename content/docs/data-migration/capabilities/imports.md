---
title: Imports (CSV & API)
description: How to bulk-import data into the CRM.
---

# Imports

Two ways to import: CSV through the UI, or API calls.

## CSV import (UI)

1. Open the target object (e.g., Companies)
2. Right-side **Import** → upload CSV
3. Map columns to CRM fields
4. Preview → Import

Best for: one-time data loads, user-driven imports, under 5,000 rows.

## API import (GraphQL)

For programmatic or larger imports.

### Companies
```graphql
mutation {
  createCompanies(data: [
    {name: "Acme Corp", league: "NFL", revenueType: "TECHNOLOGY"},
    {name: "Beta Inc",  league: "NBA", revenueType: "VENUE_SERVICES"}
  ]) { id name }
}
```
Chunk size: 50 rows per call.

### People
```graphql
mutation {
  createPeople(data: [
    {firstName: "Alice", lastName: "Smith", email: "a@acme.com", companyId: "company-uuid"},
    ...
  ]) { id }
}
```

### Opportunities
```graphql
mutation {
  createOpportunities(data: [
    {name: "Acme 2026 RFP", companyId: "uuid", stage: "PROPOSAL", bidStatus: "RFP_RECEIVED", dealValue: 500000},
    ...
  ]) { id }
}
```

### Revenue splits
```graphql
mutation {
  createOpportunityRevenueSplits(data: [
    {opportunityId: "uuid", fiscalYear: 2026, allocatedAmount: 300000, splitType: "INSTALL"},
    ...
  ]) { id }
}
```

## Rate limits

- **100 API calls / 60 seconds** (REST and GraphQL share this quota)
- **Bulk updates:** `updateOpportunities(data, filter)` capped at **200 records per call**
- **Bulk creates:** use **50-row chunks** for safety
- **Per-record PATCH:** REST, paced at **0.65s (~1.5/s)** with exponential backoff on 429

See [Rate Limits](/docs/operators/rate-limits) for detail.

## Critical: don't create duplicate Companies

When importing People or Opportunities, **always match to an existing Company first**. If the match fails, either:
1. Create the Company first, then reference its `id` in the People/Opportunity import
2. Or flag the row for manual triage

Duplicate Companies are the #1 data-quality issue. Every Person needs a `companyId`, every Opportunity needs a `companyId`.

## Field mapping helpers

For SF → CRM imports, see the [Salesforce Field Map](./salesforce-field-map) table. Key gotchas:

- `businessUnit` has 3 values, SF has 5 RecordTypes — do the roll-up
- `stage` + `bidStatus` together replace SF's `StageName`
- `accountExecutive` is TEXT, not a RELATION — paste the name string directly
- `league` on Opportunity mirrors Company.league — backfill from company if not specified

## Verification

After every bulk import:

1. Count via GraphQL: `query { opportunities { totalCount } }`
2. Spot-check 5 random records via UI
3. Run Scout: *"any opportunities with null company in the last 24 hours"* — catches broken links
