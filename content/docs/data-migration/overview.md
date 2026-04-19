---
title: Data Migration Overview
description: How data moved from Salesforce to the ANC CRM.
---

# Data Migration — Overview

The CRM holds a near-complete mirror of ANC's Salesforce data. Migration was done Apr 2026.

## What came over

| From SF | To Twenty | Records |
|---|---|---|
| Accounts | Companies | 3,730 |
| Contacts | People | 19,966 |
| Opportunities | Opportunities | 8,360 |
| Revenue_Tracker__c | opportunityRevenueSplit | 5,160 |
| Revenue_Tracker__c (orphan rows) | opportunityTeamAllocation | 472 |
| Service Tickets | serviceTicket | 3,900 |
| Design Requests | designRequest | 20,174 |
| Venues | venue | 374 |

**Revenue committed (migrated total):**
- 2026: ~$470M (81% of SF's $578M)
- 2027: ~$356M (81% of SF's $438M)
- 2028: ~$113M (81% of SF's $139M)

The 81% gap is SF revenue rows where the Account didn't match a Twenty Company by name — flagged for manual triage.

## Cleanups done during migration

### 1. 607 junk opportunities soft-deleted
Criteria: `stage=CUSTOMER + bidStatus IN (LOST, NO_BID) + dealValue IS NULL`. These were zombie records from SF. Recovery file: `/root/twenty-backups/junk-deleted-opps-1776448037.txt`. Reversible.

### 2. 20 duplicate Companies merged
Team + team-with-venue pairs. Canonical record kept; linked opps, people, venues moved; duplicate soft-deleted. Merges include: Pacers, Penguins, Cavaliers, 76ers, Stars, Cyclones, Brewers, Trail Blazers, Commanders, Pelicans, Bruins, Tigers, Royals, Liverpool FC, Dodgers, Rainiers, Rays, Temple, Nationals, Montana.

### 3. Pre-2021 data pending deletion
Jireh flagged pre-2021 SF data as "flat out junk". 256 pre-2021 opps + 876 pre-2022 opps queued for deletion — exact cutoff year pending Jireh's decision.

### 4. Due date + completion date backfilled
191 opportunities had `proposalDueDate` backfilled from SF; 336 had `substantialCompletionDate` backfilled. Existing Twenty values were not overwritten.

## Three-vertical roll-up

SF had 5 RecordTypes; the CRM rolls them up to 3 verticals Jireh actually uses:

| Jireh vertical | Twenty value | SF RecordTypes |
|---|---|---|
| Technology | TECHNOLOGY | Technology · LiveSync Hardware · LiveSync Software · Portables · Products |
| Venue Services | VENUE_SERVICES | Service |
| Media/Sponsorship | MEDIA_SPONSORSHIP | Ad Sales · Graphics · Content · Feeds |

## Salesforce access (read-only, ongoing)

Salesforce is **read-only** for cross-reference only. Never create/update/delete there. Credentials at `/root/.sf-creds`.

Typical use: verify a count, look up a record that didn't migrate, check a field that wasn't mapped yet.

## What's next

- Pre-2021 cutoff deletion (pending Jireh)
- 223 venues still unlinked to a Company (81/374 → 152/374 linked so far)
- Email → Opportunity workflow with Company existence check (Phase 2, ~1 week)
- Accounting integration + probability-weighted forecasting (Phase 2, ~2 days)
