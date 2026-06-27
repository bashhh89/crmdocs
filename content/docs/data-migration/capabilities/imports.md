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

## Admin import

For programmatic or larger imports, ask an admin to run a controlled import.

### Companies
Admins should test a small sample first, then run the full import in reviewed batches.

### People
Always match each Person to an existing Company before import.

### Opportunities
Always match each Opportunity to the canonical Company before import.

### Revenue splits
Revenue splits should only be imported after the parent Opportunities are confirmed.

## Rate limits

- Run imports in reviewed batches.
- Spot-check a sample before and after import.
- Pause if errors or duplicate Companies appear.

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

1. Compare counts before and after import.
2. Spot-check 5 random records in the CRM.
3. Run Scout: *"any opportunities with null company in the last 24 hours"* — catches broken links.
