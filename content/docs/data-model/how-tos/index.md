---
title: How-Tos
---

# Data Model — How-Tos

Recipes for querying and modifying the data model.

## Look up a field ID

```graphql
query {
  object(input: {id: "c779922d-cf25-4a5e-9382-23eb1c02199e"}) {
    fields { id name type options { value label } }
  }
}
```

Substitute any object ID — see [Opportunity fields](/docs/data-model/capabilities/opportunity-fields) for the opportunity UUID, or [Field IDs Reference](/docs/operators/field-ids-reference) for the full table.

## Add a new field to Opportunity

Via GraphQL metadata:

```graphql
mutation {
  createOneField(input: {
    objectMetadataId: "c779922d-cf25-4a5e-9382-23eb1c02199e",
    name: "newFieldName",
    label: "New Field Label",
    type: TEXT
  }) { id }
}
```

Twenty will auto-generate the column and expose it through REST + GraphQL.

## Add a tab to a record detail page

Use the pattern described in [field reference](/docs/operators/field-ids-reference) — a FIELD-type widget with `fieldDisplayMode: VIEW` pointing at the reverse-relation field ID.

## Bulk update a field across many records

```graphql
mutation {
  updateOpportunities(
    data: {probability: 75},
    filter: {bidStatus: {eq: "SHORTLISTED"}}
  ) { affectedCount }
}
```

Cap: 200 records per call. For more, chunk. See [Rate Limits](/docs/operators/rate-limits).
