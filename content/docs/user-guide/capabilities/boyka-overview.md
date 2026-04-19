---
title: Boyka — ANC Operations Copilot
description: Our custom AI agent with 30 ANC-specific skills.
---

# Boyka

Boyka is ANC's custom AI agent. It knows the CRM's fields, views, and workflows — not a generic chatbot, but an operator who can actually run actions.

## Where to find it

Click the **Boyka** icon in any record's sidebar, or open the chat panel from the top-right.

## What it can do

Natural language → actions. Examples:

| You say | Boyka does |
|---|---|
| *"top 10 open deals by value"* | Queries opportunities, returns sorted list with links |
| *"margin on Knicks deals this year"* | Filters by company + year, sums margin field |
| *"generate a touchdown graphic for Louisville"* | Calls Designer AI, creates Design Request, embeds image |
| *"who hasn't been contacted in 60 days"* | Filters people by last activity |
| *"create a pricing complete one-pager for opp 12345"* | Triggers SOW generator skill |
| *"what's overdue this week"* | Cross-references proposalDueDate + bidStatus |

## When it shines

- You know what you want but not which view has it
- You want an action, not just a lookup (Boyka writes back to the CRM, not just read)
- You're on mobile and can't filter columns

## When to bypass it

- You're doing bulk work — use the view + CSV export, or the API
- You need exact matching across 1000+ records — the view is faster
- First-query indexing lag: Boyka's first query of the day can take a few seconds to warm up

## How it's different from the "Helper" agent

| | Helper | Boyka |
|---|---|---|
| Built by | Twenty (standard) | ANC (custom) |
| Can be renamed | No | Yes |
| ANC-specific fields | Generic | All new fields (probability, proposalStage, etc.) |
| Custom skills | Standard set | 30 ANC-specific skills |
| System prompt | Generic | Covers vocabulary, view routing, workflow notes |

## Keeping Boyka up to date

When the CRM gets a new field / view / widget, Boyka's system prompt needs to be updated too so it knows to use them. See [Operators — API Access](/docs/operators/api-access) for the `updateOneAgent` call.
