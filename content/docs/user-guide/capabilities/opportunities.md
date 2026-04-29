---
title: Opportunities
description: The deal lifecycle — proposal stage, pricing, revenue splits, team allocations.
---

# Opportunities

A deal — RFP, sales lead, or budgeted project. The most-used record in the CRM. About 8,360 deals as of April 2026.

## Lifecycle

A deal moves through two flows:

- **Stage** — the high-level lifecycle: New → Screening → Meeting → Proposal → Customer
- **Bid Status** — ANC's bid flow: RFP Received → Scoping → Bid Submitted → Shortlisted → Won / Lost / No Bid

In practice the team looks at **Bid Status**. That's what the **Bid Tracker** Kanban runs on.

## Money on a deal

The CRM tracks revenue and margin in three layers, and they're all visible at the top of every deal:

| Field | What it is |
|---|---|
| **Deal Value** | What the customer will pay (the contract price) |
| **Total Deal Revenue** | The deal's revenue, summed across the years it spans |
| **Total Deal Margin** | The margin, summed across years |
| **Total Project Revenue / Margin** | What Salesforce historically said about the deal — kept for cross-reference during the migration |
| **Paid Amount / Percent Paid** | Finance status |

The "Total" rows above are calculated automatically — when you edit any year's revenue, the total updates.

## Per-year revenue and margin

Deals often split across fiscal years. Each deal has revenue and margin fields for **2026, 2027, 2028, 2029, and 2030**. Edit any one, and the deal's totals refresh in the same save.

If a deal needs a finer breakdown (split between Install / Service / Licensing), use the **Revenue Splits** child records under the deal.

## Estimations team workflow

These fields exist on every deal so Natalia's daily report still works the way it did in Salesforce:

- **Assigned Estimator Name** — who's pricing the deal
- **Proposal Owner** — Natalia's role; the second assigned estimator
- **Bid Due Time** — free-form text (e.g., "5pm CT")
- **Interview Date** — client interview / oral presentation slot
- **Submit to Estimations Team** — checked when the deal is queued for estimation
- **Submitted to Estimations Date** — when it hit the queue
- **Remove from Estimations Reporting** — manual override to hide from the report
- **CMS Type** — None / LiveSync / Ross / Integration with existing CMS / Other
- **Renderings** — whether renderings are required and at what level

These were backfilled from Salesforce in late April 2026.

## Proposal stage

The proposal pipeline uses **Proposal Stage**:

| Value | Meaning |
|---|---|
| RFP | Inbound RFP, scoping |
| Sales Lead | Proactive outreach |
| BAFO | Best And Final Offer requested |
| LOI | Letter of intent received |
| Existing Client Budget | Renewal or expansion already in client's budget |

And **Priority**:

- **Priority 1 — RFP** — top priority this week
- **Best And Final** — BAFO in flight
- **Pricing Complete** — auto-set when pricing is done

## Pricing complete

When the Proposal Engine generates a one-pager for a deal, the deal automatically gets **Pricing Complete = True** with today's date. The **Estimation & Proposals** view groups by this flag, so the proposal team can see what's ready to send versus what's still being priced.

## League

Every deal carries a **League** — NFL, NBA, MLB, NHL, NCAA, MLS, WNBA, NWSL, and the rest. Inherited from the parent Company. Powers the **Win/Loss by League** view.

## What's linked to a deal

Open a deal and you'll see tabs for:

- **Company** — who you're selling to
- **Revenue Splits** — per-year, per-type amounts
- **Team Allocations** — for advertising deals spread across multiple teams (Hankook MLB pattern)
- **Estimates** — priced one-pagers from the Proposal Engine
- **Service Tickets** — post-win operational work
- **Events** — game-day events at the linked venue
- **Design Requests** — graphics and content under the deal
- **RFP Analyses** — RFP pipeline output

## Quick answers

- *"Which deals are due this week?"* → **Proposal Pipeline** view, sorted by Bid Due Date
- *"What's the live estimations queue?"* → **Estimation & Proposals Report** view (mirrors SF exactly)
- *"What's the WON backlog?"* → **Backlog** view, sorted by Substantial Completion
- *"Win/loss by league?"* → **Win/Loss by League** view
- *"Top open deals?"* → **Top Open Deals** view, sorted by Deal Value
