---
title: Opportunities
description: The deal lifecycle — proposal stage, pricing, revenue splits, team allocations.
---

# Opportunities

An Opportunity is a deal — RFP, sales lead, or budgeted project. It's the most-used object in the CRM. ~8,360 records as of April 2026.

## Lifecycle

Two fields drive the lifecycle:

- **`stage`** — the native lifecycle stage (NEW / SCREENING / MEETING / PROPOSAL / CUSTOMER)
- **`bidStatus`** — ANC's bid flow (RFP_RECEIVED / SCOPING / BID_SUBMITTED / SHORTLISTED / WON / LOST / NO_BID)

In practice the team looks at `bidStatus`. That's what the **Bid Tracker** Kanban runs on.

## Amount vs. deal value vs. project totals

The CRM tracks three different revenue concepts and they are NOT interchangeable:

| Field | What it means | Source |
|---|---|---|
| `dealValue` | What the customer will pay | SF `Sale_Price__c` |
| `amount` (label: "Total Deal Revenue") | Auto-rollup of `revenue2026` + `revenue2027` + ... + `revenue2030` | Computed |
| `margin` (label: "Total Deal Margin") | Auto-rollup of `margin2026` + ... + `margin2030` | Computed |
| `totalProjectRevenue` | SF `Actual_Revenue__c` mirror — what SF says about the deal | SF mirror |
| `totalProjectMargin` | SF `Actual_Margin__c` mirror | SF mirror |
| `paidAmount` / `percentPaid` | Finance status | Manually maintained |

**`amount` vs `totalProjectRevenue`:** they usually match but diverge on records where SF has an Actual_Revenue but no per-FY split (~6,000 such records). The Deal panel at the top of every record uses `amount` (FY rollup); the Estimation & Proposals report uses `totalProjectRevenue` (SF mirror). Both are kept in sync but they represent different sources of truth.

## Per-year revenue + margin (5 fiscal years)

Deals often split across fiscal years. We track this two ways:

1. **Flat fields on Opportunity** for FY 2026, 2027, 2028, 2029, 2030 — `revenue2026`, `margin2026`, etc. Used by dashboard widgets.
2. **`opportunityRevenueSplit` child records** — full per-FY normalized, with `splitType` (INSTALL / SERVICE / LICENSING / OTHER).

### Auto-rollup

A logic function `rollup-opportunity-totals` fires automatically whenever any of the per-FY fields changes. It sums `revenue2026..revenue2030` into `amount` and `margin2026..margin2030` into `margin`. No manual recalculation needed — edit any FY field, save, and the totals refresh in the same save cycle.

The rollup is loop-safe: `amount` and `margin` themselves are not in the trigger field list, so updating them does not retrigger the rollup.

## Estimations team workflow (added 2026-04-27 to mirror SF)

11 fields drive the Estimation & Proposals Report. These mirror Salesforce exactly so Natalia's daily report still works:

| Field | Type | Purpose |
|---|---|---|
| `assignedEstimatorName` | TEXT | Who's pricing the deal |
| `proposalOwner` | TEXT | Natalia's role on the deal — second assigned estimator |
| `bidDueTime` | TEXT | Free-form due time (e.g., "5pm CT") |
| `interviewDate` | DATE_TIME | Client interview / oral presentation slot |
| `submitToEstimationsTeam` | BOOLEAN | Flag set when the deal is queued for estimation |
| `submittedToEstimationsDate` | DATE_TIME | When it hit the queue |
| `removeFromEstimationsReporting` | BOOLEAN | Manual override to hide from the report |
| `cmsType` | SELECT | NO / LIVESYNC / ROSS / INTEGRATION_EXISTING_CMS / OTHER |
| `renderings` | SELECT | Whether renderings are required and at what level |
| `totalProjectRevenue` | CURRENCY | SF Actual_Revenue mirror (see above) |
| `totalProjectMargin` | CURRENCY | SF Actual_Margin mirror |

These were backfilled from SF on 2026-04-27 — 1,113 opps got the 9 estimation fields populated, 6,311 opps got `totalProjectRevenue` + `totalProjectMargin`.

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

`pricingComplete = TRUE` flips `pricingCompleteDate` automatically. It flips as soon as a one-pager is generated from the Proposal Engine — the [Universal CRM Push](/docs/proposal-engine/features/universal-crm-push) handles this.

The **Estimation & Proposals** view groups by this flag so the proposal team can see what's ready to send versus still being priced.

## League

`league` SELECT (added 2026-04-18) mirrors `Company.league` — 20 values including NFL, NBA, MLB, NHL, NCAA, MLS, WNBA, NWSL. About 4,200 opps backfilled from their parent Company. The remaining un-classified are corporate accounts (Live Nation, JP Morgan, Disney) where league doesn't apply.

This is what powers the **Win/Loss by League** view.

## Linked records

An Opportunity links to:

- **Company** (required) — who we're selling to
- **Revenue Splits** — per-FY per-type amounts (normalized child records)
- **Team Allocations** — for media deals spread across multiple teams (Hankook MLB pattern). 472 records migrated from SF.
- **Estimates** — priced one-pagers from the Proposal Engine
- **Service Tickets** — post-win work (linked when ticket's venue resolves to this opp's account)
- **Events** — game-day events at the linked venue (auto-discovered via the Service Dashboard)
- **Design Requests** — graphics/content under the deal
- **RFP Analyses** — RFP pipeline output

## Fast answers

- **"Which deals are due this week?"** → Proposal Pipeline view, sorted `proposalDueDate` ASC
- **"What's the live estimations queue?"** → Estimation & Proposals Report view (mirrors SF exactly — 69 rows / ~$327M / ~$48M as of last refresh)
- **"What's my WON backlog?"** → Backlog view, sorted `substantialCompletionDate` ASC
- **"Win/loss by league?"** → Win/Loss by League view
- **"Top open deals?"** → Top Open Deals view, sorted `dealValue` DESC
- **"What's our current FY rollup?"** → just open any deal — `amount` and `margin` are auto-summed
