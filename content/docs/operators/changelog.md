---
title: Changelog
description: What shipped and when.
---

# Changelog

## 2026-04-18

- **Team Allocations object** shipped (8 fields, reverse relations on Opportunity + Company)
- **472 team allocations migrated** from SF orphan `Revenue_Tracker__c` rows
- **League field added to Opportunity** (mirrors `Company.league`), backfilled ~4,200 opps
- **2 new proposal views:** Backlog (`1c775cd3`), Win/Loss by League (`6aae4c98`)
- **Due/completion backfill** — 191 opps got `proposalDueDate`, 336 got `substantialCompletionDate`
- **Designer AI shipped** — Gemini 3 Pro Image Preview integration, inline-in-chat flow, Scout skill `designer-ai`
- **Second dedup pass** — 10 more Company merges (Montana, Bruins, Tigers, Royals, Liverpool FC, Dodgers, Rainiers, Rays, Temple, Nationals)

## 2026-04-17

- **17 new Opportunity fields** — probability, proposalDueDate, substantialCompletionDate, paidAmount, percentPaid, accountExecutive, accountExecutiveEmail, margin, revenue2026, margin2026, revenue2027, margin2027, proposalStage, priority, pricingComplete, technologyVendorPartner, pricingCompleteDate
- **11 new dashboard widgets** on ANC 2026 Company Dashboard
- **2 new proposal views:** Proposal Pipeline, Estimation & Proposals
- **Scout custom agent** — 30 ANC-specific skills
- **Navigation reshuffle** — 18 root / 8 folders → 11 ANC app / 7 folders
- **Per-user favorites** pinned to sidebar for executive, proposal, and services workflows
- **607 junk opps soft-deleted** (CUSTOMER + LOST/NO_BID + null dealValue)
- **10 duplicate Companies merged** (Pacers, Penguins, Cavaliers, 76ers, Stars, Cyclones, Brewers, Trail Blazers, Commanders, Pelicans)
- **Real-time ticket sync** from ANC Services → CRM (was 15-min cron, now ~1s fire-and-forget)
- **Additional page-layout tabs** — Estimates, Design Requests, RFP Analyses, Venues on Company; Revenue Splits, Estimates on Opportunity; Tickets, Events, Opps on Venue
- **New relation** `serviceTicket.opportunity` (MANY_TO_ONE, `193c5f7a`)

## Notes on deferred items

- Pre-2021 data deletion — pending final cutoff year decision
- Email → Opportunity workflow with Company-existence check — Phase 2 (~1 week)
- Accounting integration + probability-weighted forecasting — Phase 2 (~2 days)
- fiscalYear NUMBER → SELECT migration (fixes "2,026" comma display) — Phase 2 (~1 day)
- League inference on top-200 OTHER companies — ~2 hours when prioritized
