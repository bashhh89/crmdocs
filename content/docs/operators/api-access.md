---
title: API Access
description: REST and GraphQL, auth, cheat sheets for bulk operations.
---

# API Access

Twenty exposes REST and GraphQL at the same base. REST is simpler for one-off CRUD; GraphQL is required for bulk operations and metadata.

## Endpoints

- **GraphQL:** `https://crm.ancsports.net/graphql`
- **REST base:** `https://crm.ancsports.net/rest`
- **Metadata GraphQL:** `https://crm.ancsports.net/metadata`

## Auth

Workspace-scoped JWT. The key ANC scripts use lives in:

```
/root/rag2/services/integrations/twenty/crmAutomation.ts
```

All our bulk scripts read it from there. Request header:

```http
Authorization: Bearer <JWT>
Content-Type: application/json
```

## REST vs GraphQL — when to use each

| Use REST | Use GraphQL |
|---|---|
| One record CRUD | Bulk create/update/delete |
| Per-record PATCH loops | Filter-based bulk update |
| Uploading files | Metadata queries/mutations |
| Favorites, reactions | Complex nested fetches |

## Common GraphQL snippets

### Get opportunities by bidStatus
```graphql
query {
  opportunities(filter: {bidStatus: {in: ["RFP_RECEIVED", "SCOPING"]}}) {
    edges { node { id name dealValue proposalDueDate } }
  }
}
```

### Bulk update (filter-based)
```graphql
mutation {
  updateOpportunities(
    data: {probability: 75},
    filter: {bidStatus: {eq: "SHORTLISTED"}}
  ) { affectedCount }
}
```

### Bulk create
```graphql
mutation {
  createOpportunities(data: [
    {name: "Deal A", companyId: "uuid", stage: "PROPOSAL"},
    {name: "Deal B", companyId: "uuid", stage: "PROPOSAL"}
  ]) { id }
}
```

### Soft delete + restore
```graphql
mutation { deleteCompanies(filter: {id: {in: ["uuid"]}}) { affectedCount } }
mutation { restoreCompany(id: "uuid") { id name } }
```

## Company-merge cheat sheet

After identifying canonical + duplicate Company IDs:

```graphql
# Reassign opportunities
mutation {
  updateOpportunities(
    data: {companyId: "CANONICAL"},
    filter: {companyId: {eq: "DUPLICATE"}}
  ) { affectedCount }
}

# Reassign people
mutation {
  updatePeople(
    data: {companyId: "CANONICAL"},
    filter: {companyId: {eq: "DUPLICATE"}}
  ) { affectedCount }
}

# Reassign venues
mutation {
  updateVenues(
    data: {companyId: "CANONICAL"},
    filter: {companyId: {eq: "DUPLICATE"}}
  ) { affectedCount }
}

# Reassign service tickets (note: companyIdId, not companyId)
mutation {
  updateServiceTickets(
    data: {companyIdId: "CANONICAL"},
    filter: {companyIdId: {eq: "DUPLICATE"}}
  ) { affectedCount }
}

# Soft-delete the duplicate
mutation {
  deleteCompanies(filter: {id: {in: ["DUPLICATE"]}}) { affectedCount }
}
```

**DesignRequest / Estimate / RfpAnalysis** don't have direct Company relations — they chain via Opportunity. Don't try to merge them through company.

## REST: favorites

```http
POST /rest/favorites
Content-Type: application/json

{
  "forWorkspaceMemberId": "uuid",
  "position": 0,
  "dashboardId": "uuid"  // or viewId, or opportunityId
}
```

## Metadata queries

List all objects:
```graphql
query { objects { id nameSingular namePlural isCustom } }
```

List all fields on Opportunity:
```graphql
query {
  object(input: {id: "c779922d-cf25-4a5e-9382-23eb1c02199e"}) {
    fields { id name type options { value label } }
  }
}
```

List all agents (Boyka):
```graphql
query { agents { id name prompt isCustom } }
```

## Uploading files (multipart)

Twenty's FILES fields take multipart via `uploadFilesFieldFile`:

```bash
curl https://crm.ancsports.net/metadata \
  -H "Authorization: Bearer $JWT" \
  -F 'operations={"query":"mutation($input: UploadFilesFieldFileInput!) { uploadFilesFieldFile(input: $input) { name fileId } }","variables":{"input":{"recordId":"uuid","fieldName":"generatedImage","files":[null]}}}' \
  -F 'map={"0":["variables.input.files.0"]}' \
  -F '0=@image.jpg'
```

This is how Designer AI uploads generated images.

## Python client pattern

Our bulk scripts (at `/root/rag2/scripts/`) use this shape:

```python
import httpx
JWT = open("/root/.twenty-jwt").read().strip()
client = httpx.Client(
    base_url="https://crm.ancsports.net",
    headers={"Authorization": f"Bearer {JWT}"},
    timeout=30.0,
)
r = client.post("/graphql", json={"query": "...", "variables": {...}})
r.raise_for_status()
```
