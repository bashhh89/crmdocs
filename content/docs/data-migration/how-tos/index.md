---
title: How-Tos
---

# Data Migration — How-Tos

## Bulk-import a new contact list

Via GraphQL, 50 rows per chunk:

```graphql
mutation {
  createPeople(data: [
    {firstName: "Alice", lastName: "Smith", email: "a@acme.com", companyId: "uuid"},
    ...
  ]) { id }
}
```

Always match to an existing Company first — don't create duplicates. See [Imports](/docs/data-migration/capabilities/imports).

## Match SF accounts by name

Three-tier matching:

1. Exact name
2. Normalized (strip "LLC", "Inc", etc.)
3. Manual triage for ambiguous cases

97.7% of SF accounts found a Twenty match during migration. Remaining 2.3% went to a flag-for-review queue.

## Merge duplicate Companies after import

See [User Guide — How-Tos / Merge duplicate Companies](/docs/user-guide/how-tos/all-recipes#how-to-merge-duplicate-companies) for the GraphQL cheat-sheet.

## Backfill a field from Salesforce

Use the SF data pickles at `/tmp/sf-migration.pkl` as the source. Python script pattern:

```python
import pickle, httpx, time

sf = pickle.load(open("/tmp/sf-migration.pkl", "rb"))
client = httpx.Client(
    base_url="https://crm.ancsports.net",
    headers={"Authorization": f"Bearer {JWT}"},
)

for sf_opp in sf["opps"]:
    twenty_id = match_by_name(sf_opp["Name"])
    if not twenty_id: continue
    client.patch(f"/rest/opportunities/{twenty_id}", json={
        "probability": sf_opp["Probability"]
    })
    time.sleep(0.65)
```

See [Rate Limits](/docs/operators/rate-limits) for pacing.

## Cross-reference Salesforce

SF access is **read-only**. Never create/update/delete there. Credentials at `/root/.sf-creds`. Use the `salesforce-crm` skill for queries.
