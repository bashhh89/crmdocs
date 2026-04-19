---
title: Opportunities
description: The deal lifecycle — proposal stage, pricing, revenue splits, team allocations.
---

# Opportunities

An Opportunity is a deal — RFP, sales lead, or budgeted project. It's the most-used object in the CRM.

## Lifecycle

Two fields drive the lifecycle:

- **`stage`** — the native lifecycle stage (NEW / SCREENING / MEETING / PROPOSAL / CUSTOMER)
- **`bidStatus`** — ANC's bid flow (RFP_RECEIVED / SCOPING / BID_SUBMITTED / SHORTLISTED / WON / LOST / NO_BID)

In practice the team looks at `bidStatus`. That's what the **Bid Tracker** Kanban runs on.

## Amount vs. deal value

| Field | What it means |
|---|---|
| `dealValue` | What the customer will pay (SF `Sale_Price__c`) |
| `amount` | Recognized revenue (SF `Actual_Revenue__c`) — the primary reporting source |
| `margin` | `amount − cost` |
| `paidAmount` / `percentPaid` | Finance status |

Always set `dealValue` when pricing completes. `amount` + `margin` become populated through the proposal + invoicing flow.

## Per-year revenue + margin

Deals often split across fiscal years. We track this two ways:

1. **Flat fields on Opportunity** — `revenue2026`, `margin2026`, `revenue2027`, `margin2027`. Used by dashboard widgets.
2. **`opportunityRevenueSplit` child records** — full per-FY normalized, with `splitType` (INSTALL / SERVICE / LICENSING / OTHER).

The flat fields are a denormalization for performance — dashboard widgets read them directly instead of grouping child rows. See [Data Model — Revenue Splits](/docs/data-model/capabilities/revenue-splits).

## Proposal stage

The proposal pipeline uses `proposalStage`:

| Value | Meaning |
|---|---|
| `RFP` | Inbound RFP, scoping |
| `SALES_LEAD` | Proactive outreach lead |
| `BAFO` | Best And Final Offer requested |
| `LOI` | Letter of intent received |
| `EXISTING_CLIENT_BUDGET` | Renewal / expansion in client's budget |

And the **Priority** field:
- `PRIORITY_1_RFP` — top priority this week
- `BEST_AND_FINAL` — BAFO in flight
- `PRICING_COMPLETE` — auto-set when pricing is done

## Pricing complete flag

`pricingComplete = TRUE` flips `pricingCompleteDate` automatically. It should flip as soon as a one-pager is generated from the Proposal Engine. The **Estimation & Proposals** view groups by this flag so the proposal team can see what's ready to send versus still being priced.

## Linked records

An Opportunity links to:

- **Company** (required) — who we're selling to
- **Revenue Splits** — per-FY per-type amounts
- **Team Allocations** — for media deals spread across multiple teams (Hankook MLB pattern)
- **Estimates** — priced one-pagers from the Proposal Engine
- **Service Tickets** — post-win work (backfilled for WON opps only)
- **Design Requests** — graphics/content under the deal
- **RFP Analyses** — RFP pipeline output

## Fast answers

- **"Which deals are due this week?"** → Proposal Pipeline view, sorted `proposalDueDate` ASC
- **"What's my WON backlog?"** → Backlog view, sorted `substantialCompletionDate` ASC
- **"Win/loss by league?"** → Win/Loss by League view
- **"Top open deals?"** → Top Open Deals view, sorted `dealValue` DESC
