---
title: Companies
description: The account-centric view — every deal, ticket, venue, design, and allocation for one account.
---

# Companies

Jireh's mental model is **account-centric**:

> "I don't know who's talking to who over at the Hornets. When we think about CRM, an account management tool is really what we're looking for so we can understand these things at an account level, and then all the revenue associated with it."

Every object in the CRM surfaces on the Company detail page, so you can sit on one account and see everything.

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
| Address block | Standard Twenty fields |

## Duplicates

Companies are the object most likely to get duplicate records (team vs. team-with-venue, renamed franchises). When you spot one:

1. Note both IDs
2. Pick the canonical record (usually the one with more linked opps/people)
3. Bulk-reassign linked objects using the GraphQL cheat-sheet in [Operators — API Access](/docs/operators/api-access)
4. Soft-delete the duplicate (reversible via `restoreCompany(id)`)

20 duplicates have been merged so far (Apr 2026). When in doubt, ask Boyka: *"are there duplicate companies for Red Sox"*.

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

See [Dashboards](./dashboards) for widget-by-widget breakdown.
