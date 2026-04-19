---
title: Boyka — ANC Operations Copilot
description: The custom AI agent with 30 ANC-specific skills.
---

# Boyka

Boyka is ANC's custom AI agent — trained on the CRM's fields, views, and workflows. Not a generic chatbot: an operator that can actually take action.

## Where to find it

Open the chat panel from the top-right of any screen, or the **Boyka** icon in any record's sidebar.

## What it can do

Natural language → action. Examples:

| You say | Boyka does |
|---|---|
| *"top 10 open deals by value"* | Queries opportunities, returns a sorted list with links |
| *"margin on Knicks deals this year"* | Filters by company + year, sums the margin field |
| *"generate a touchdown graphic for Louisville"* | Calls Designer AI, creates a Design Request, embeds the image |
| *"who hasn't been contacted in 60 days"* | Filters people by last activity |
| *"create a pricing-complete one-pager for opp 12345"* | Triggers the SOW generator skill |
| *"what's overdue this week"* | Cross-references `proposalDueDate` + `bidStatus` |

## When it shines

- You know what you want but not which view has it
- You want an action, not just a lookup (Boyka writes back to the CRM, not just reads)
- You're on mobile and can't filter columns

## When to bypass it

- Bulk work — use a view + CSV export, or the API
- Exact matching across 1,000+ records — a filtered view is faster
- First-query warmup: the very first query of the day can take a few seconds to index

## How it's different from the "Helper" agent

| | Helper | Boyka |
|---|---|---|
| Built by | Platform default | ANC (custom) |
| Renamable | No | Yes |
| ANC-specific fields | Generic | All new fields (probability, proposalStage, etc.) |
| Custom skills | Standard set | 30 ANC-specific skills |
| System prompt | Generic | Covers vocabulary, view routing, workflow notes |

## Keeping Boyka up to date

When the CRM gets a new field, view, or widget, Boyka's system prompt should be updated so it knows to use it. See [Operators — API Access](/docs/operators/api-access) for the `updateOneAgent` call.
