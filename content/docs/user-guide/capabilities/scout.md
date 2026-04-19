---
title: Scout — the CRM's AI operator
description: The CRM's named AI agent. A persona-driven assistant that knows ANC's data, vocabulary, and workflows.
---

# Scout

Scout is the CRM's named AI agent. It lives inside the workspace, knows every field, view, and record, and can take action on your behalf — running queries, generating proposals and mockups, triaging tickets, and building dashboards.

## Why a named persona

A CRM without a persona is a tool. A CRM with a persona becomes a teammate. That distinction is small in words and large in practice.

- **It sets expectations.** Users who know they're talking to Scout — an agent with a defined scope and vocabulary — ask sharper questions. Generic "AI assistants" invite generic interactions and drift into chat-for-chat's-sake.
- **It creates a shared memory point.** Teams develop shorthand: *"ask Scout for the backlog", "Scout handles RFP triage", "Scout drafts the first SOW"*. That shorthand becomes institutional knowledge and accelerates onboarding.
- **It scales cleanly.** If a second agent is ever added — one for finance, one for design — the boundary is obvious. Without names, the line between agents blurs and so does accountability.
- **It's a trust anchor.** Users come to recognize Scout's tone, response style, and reliability. That reliability compounds. A nameless AI doesn't accumulate trust the same way a named one does.

## Why *Scout*

In sports, a scout is the operator whose job is to find what matters, verify it, and report back with judgment. Not a generalist. Not a replacement for the coach. A specialist who watches, knows the terrain, and surfaces signal.

That's exactly the role Scout plays in the CRM:

- **Scouts the pipeline** — open deals, overdue RFPs, top opportunities by value
- **Scouts for patterns** — recurring ticket themes, designer hours over budget, accounts going quiet
- **Scouts past work** — similar designs, comparable deals, historical win/loss by league
- **Scouts the market** — enriches accounts with web data, pulls LinkedIn context, finds decision-maker emails

The verb does the work. "Scout the overdue deals" already tells you both who is doing it and what is happening.

## Where to find Scout

Open the chat panel from the top-right of any screen, or the **Scout** icon in any record's sidebar.

## What Scout can do

Natural language → action. Examples:

| You say | Scout does |
|---|---|
| *"top 10 open deals by value"* | Queries opportunities, returns a sorted list with links |
| *"margin on Knicks deals this year"* | Filters by company + year, sums the margin field |
| *"generate a touchdown graphic for Louisville"* | Calls Designer AI, creates a Design Request, embeds the image |
| *"who hasn't been contacted in 60 days"* | Filters people by last activity |
| *"create a pricing-complete one-pager for opp 12345"* | Triggers the SOW generator skill |
| *"what's overdue this week"* | Cross-references `proposalDueDate` + `bidStatus` |

## When Scout shines

- You know what you want but not which view has it
- You want an action, not just a lookup (Scout writes back to the CRM, not just reads)
- You're on mobile and can't filter columns

## When to bypass Scout

- Bulk work — use a view + CSV export, or the API
- Exact matching across 1,000+ records — a filtered view is faster
- First-query warmup: the very first query of the day can take a few seconds to index

## How Scout is different from the default "Helper" agent

| | Helper | Scout |
|---|---|---|
| Built by | Platform default | ANC (custom) |
| Renamable | No | Yes |
| ANC-specific fields | Generic | All new fields (probability, proposalStage, etc.) |
| Custom skills | Standard set | 30 ANC-specific skills |
| System prompt | Generic | Covers vocabulary, view routing, workflow notes |

## Keeping Scout current

When the CRM gets a new field, view, or widget, Scout's system prompt should be updated so it knows to use it. See [Operators — API Access](/docs/operators/api-access) for the `updateOneAgent` call.
