---
title: Companies
description: The account-centric view — every deal, ticket, venue, design, and allocation for one account.
---

# Companies

## Why this object exists

The CRM is built as an **account management tool**. A Company record is where relationships, activity, and revenue come together so you can understand — at the account level — what's happening, who's involved, and what it's worth.

Every other object in the workspace surfaces on the Company detail page. Open one account and you see everything connected to it.

## Company detail tabs

| Tab | What it shows |
|---|---|
| Overview | Core fields, recent activity |
| Opportunities | Every deal for this account, past and present |
| Revenue Splits | Per-FY revenue + margin across splits |
| Tickets | Every service ticket linked via venue → company chain |
| Estimates | Priced one-pagers from the Proposal Engine |
| Design Requests | Graphics, mockups, content |
| RFP Analyses | RFP Analyzer outputs |
| Team Allocations | Per-team spend for media deals |
| Venues | Linked venues |

## Key fields

| Field | Purpose |
|---|---|
| `name` | Canonical account name |
| `league` | Primary league (NFL, NBA, etc.) |
| `revenueType` | TECHNOLOGY / VENUE_SERVICES / MEDIA_SPONSORSHIP / MULTIPLE_VERTICALS |
| `employees` | Size indicator |
| Address block | Standard address fields |

## Duplicates

Companies are the object most likely to accumulate duplicate records (team vs. team-with-venue, renamed franchises). When you spot one:

1. Note both IDs
2. Pick the canonical record (usually the one with more linked opps/people)
3. Bulk-reassign linked objects using the GraphQL cheat-sheet in [Operators — API Access](/docs/operators/api-access)
4. Soft-delete the duplicate (reversible via `restoreCompany(id)`)

20 duplicates have been merged so far (Apr 2026). When in doubt, ask the assistant: *"are there duplicate companies for Red Sox"*.

## League classification

- 3,730 companies, ~55% tagged with a specific league
- Rest are OTHER (corporate advertisers, agencies, venues without a team attached)
- To change: edit the `league` SELECT field directly

Don't confuse league with business unit — a Phillies deal can be TECHNOLOGY (installing LED boards) or MEDIA_SPONSORSHIP (ad sales on their network).

## Company → Opportunity revenue roll-up

The **ANC 2026 Company Dashboard** widgets sum per-company:

- Booked revenue by vertical
- Forecasted revenue (opps with probability ≥ 50)
- Margin by vertical
- Activity over last N months

See [Dashboards](./dashboards) for the widget-by-widget breakdown.
