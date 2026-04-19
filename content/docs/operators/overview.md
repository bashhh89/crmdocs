---
title: Operators Overview
description: For admins, API users, and integrators.
---

# Operators

This section is for anyone who writes scripts against the CRM, builds integrations, or administers the workspace.

**Not for day-to-day users.** If you're logging deals, see [User Guide](/docs/user-guide/introduction) instead.

## What's here

- **[API Access](./api-access)** — REST, GraphQL, authentication, cheat sheets
- **[Rate Limits](./rate-limits)** — Request quotas + backoff strategy
- **[Field IDs Reference](./field-ids-reference)** — UUID lookups for widget filters and scripts
- **[Changelog](./changelog)** — What changed and when

## Quick facts

- **Workspace ID:** `d3fbc29a-a635-48b7-9d6e-250941677fd0`
- **Production URL:** https://crm.ancsports.net
- **GraphQL endpoint:** `https://crm.ancsports.net/graphql`
- **REST base:** `https://crm.ancsports.net/rest`
- **Auth:** workspace-scoped JWT (see [API Access](./api-access))

## Common scripting patterns

- **Migrate data from SF:** see `/root/rag2/scripts/` for historical examples
- **Backfill a field:** use `updateOpportunities(data, filter)` chunked at 200
- **Bulk-reassign records after Company merge:** see [API Access](./api-access)
- **Add a dashboard widget via API:** see [Field IDs Reference](./field-ids-reference) for filter JSON format

## Working on Boyka skills

Boyka's system prompt lives as an `Agent` record. To update:

```graphql
mutation {
  updateOneAgent(input: {id: "c73dcdc4-5b5b-442a-bad2-2b1e50bb1df2", prompt: "..."}) {
    id
  }
}
```

Skills are `AgentHandoff` records — same pattern. When you add a new field/view/widget, **update Boyka's prompt** so it knows to use it.
