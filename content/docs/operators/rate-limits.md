---
title: Rate Limits
description: Quotas, bulk caps, and backoff strategy.
---

# Rate Limits

## Global quotas

| Limit | Value |
|---|---|
| API calls | **100 per 60 seconds** (REST and GraphQL share) |
| Bulk update per call | **200 records** |
| Bulk create per call | **50 records** (safety — the server allows more but 50 is the tested safe chunk) |
| Per-record REST PATCH pace | **~1.5 req/s (0.65s between calls)** with exponential backoff on 429 |

## Pattern: chunked bulk update

```python
import time, httpx

IDS = [...]  # 10,000 opportunity IDs
CHUNK = 200

for i in range(0, len(IDS), CHUNK):
    chunk = IDS[i:i+CHUNK]
    query = """
    mutation($ids: [UUID!]!) {
      updateOpportunities(
        data: {probability: 75},
        filter: {id: {in: $ids}}
      ) { affectedCount }
    }
    """
    r = client.post("/graphql", json={"query": query, "variables": {"ids": chunk}})
    r.raise_for_status()
    time.sleep(0.9)  # stay comfortably under the 100-per-minute quota
```

10,000 records → 50 calls × 0.9s = **~45 seconds**.

## Pattern: per-record PATCH with backoff

Some updates can't be done in bulk (e.g., each record needs a unique value). REST PATCH with backoff:

```python
import time, random

def patch_with_backoff(record_id, data, max_tries=5):
    for attempt in range(max_tries):
        r = client.patch(f"/rest/opportunities/{record_id}", json=data)
        if r.status_code == 429:
            wait = (2 ** attempt) + random.random()
            time.sleep(wait)
            continue
        r.raise_for_status()
        return r.json()
    raise RuntimeError("max retries")

for rec in records:
    patch_with_backoff(rec["id"], rec["updates"])
    time.sleep(0.65)  # ~1.5 req/s
```

## Pattern: bulk create

Creates are allowed in larger batches but **50 is the tested safe chunk**:

```python
for i in range(0, len(ROWS), 50):
    chunk = ROWS[i:i+50]
    client.post("/graphql", json={
        "query": "mutation($d: [OpportunityCreateInput!]!) { createOpportunities(data: $d) { id } }",
        "variables": {"d": chunk}
    })
    time.sleep(0.9)
```

## What to do when you hit 429

1. **Wait** — exponential backoff (1s, 2s, 4s, 8s, 16s)
2. **Don't retry forever** — cap at 5 attempts
3. **Log the failed batch** — so you can re-run just the failures, not the whole job

## Observability

- Check your current quota in the workspace settings → API section
- For long jobs, log progress every 500 records so you can see if a job stalls
