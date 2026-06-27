---
title: How-Tos
---

# Data Migration — How-Tos

## Bulk-import a new contact list

Use the CRM import flow or ask an admin to run a controlled import. Always match to an existing Company first — don't create duplicates. See [Imports](/docs/data-migration/capabilities/imports).

## Match SF accounts by name

Three-tier matching:

1. Exact name
2. Normalized (strip "LLC", "Inc", etc.)
3. Manual triage for ambiguous cases

97.7% of SF accounts found a match during migration. The remaining 2.3% went to a flag-for-review queue.

## Merge duplicate Companies after import

See [User Guide — How-Tos / Merge duplicate Companies](/docs/user-guide/how-tos/all-recipes#how-to-merge-duplicate-companies) for the operator process.

## Backfill a field from Salesforce

Use the migration archive as the source, confirm the mapping table, then ask an admin to run the backfill. Backfills should be tested on a small sample before a full run.

## Cross-reference Salesforce

SF access is **read-only**. Never create, update, or delete records there. Admins manage access for cross-reference checks.
