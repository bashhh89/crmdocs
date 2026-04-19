---
title: Salesforce Field Map
description: Every SF field and where it lives in Twenty.
---

# Salesforce → Twenty Field Map

Complete mapping. If you find a SF field not in this table, it didn't migrate — check with Ahmad before assuming it's lost.

## Opportunity

| SF field | Twenty field | Type | Notes |
|---|---|---|---|
| `Opportunity.Name` | `name` | TEXT | Direct |
| `RecordType.Name` | `businessUnit` | SELECT | 5→3 roll-up |
| `StageName` | `stage` + `bidStatus` | SELECT×2 | 8 SF stages split into Twenty's 5 `stage` + 7 `bidStatus` |
| `Probability` | `probability` | NUMBER | 0-100, backfilled by bidStatus if null |
| `CloseDate` | `closeDate` | DATE_TIME | Direct |
| `Sale_Price__c` | `dealValue` | CURRENCY | 67% populated in SF |
| `Actual_Revenue__c` | `amount` | CURRENCY | Fallback for dealValue; Natalia's report source |
| `Actual_Margin__c` | `margin` | CURRENCY | |
| `Total_Payments_Received__c` | `paidAmount` | CURRENCY | |
| `Bid_Due_Date__c` | `proposalDueDate` | DATE_TIME | |
| `Substantial_Compltion_Date__c` *(sic)* | `substantialCompletionDate` | DATE | SF typo preserved on their side |
| `Contract_Term_End_Date__c` | `contractEndDate` | DATE | |
| `AccountId` | `company` (via name match) | RELATION | 97.7% of SF accounts have Twenty match |
| `Owner.Name` | `accountExecutive` | TEXT | Workaround: no workspace seats for 30+ SF sellers |
| `Owner.Email` | `accountExecutiveEmail` | TEXT | |
| `Proposal_Stage__c` | `proposalStage` | SELECT | |
| `Priority__c` | `priority` | SELECT | |
| `Pricing_complete__c` | `pricingComplete` | BOOLEAN | |
| `Pricing_Complete_Date__c` | `pricingCompleteDate` | DATE_TIME | |
| `Technology_Vendor_Partner__c` | `technologyVendorPartner` | TEXT | |

## Revenue tracker (per-fiscal-year)

| SF field | Twenty field | Notes |
|---|---|---|
| `Revenue_Tracker__c.X2026_Revenue__c` | `Opportunity.revenue2026` + `opportunityRevenueSplit` row | Dual-write |
| `Revenue_Tracker__c.X2026_Margin__c` | `Opportunity.margin2026` | |
| `Revenue_Tracker__c.X2027__c` | `Opportunity.revenue2027` | Note SF dropped `_Revenue` on 2027 |
| `Revenue_Tracker__c.X2027_Margin__c` | `Opportunity.margin2027` | |
| `Revenue_Tracker__c.X2028_Revenue__c` | `opportunityRevenueSplit` row | Not flattened to OpportunityOpportunity |

## Team allocations (Hankook-style)

SF `Revenue_Tracker__c` rows where `Account != parent opp's Account` are treated as **team allocations**, not splits:

| SF field | Twenty field |
|---|---|
| `Account.Name` | `opportunityTeamAllocation.team` (matched to Company) |
| Fiscal year | `opportunityTeamAllocation.fiscalYear` |
| Revenue | `opportunityTeamAllocation.revenue` |
| Margin | `opportunityTeamAllocation.margin` |

860 orphan rows → 537 matched → 472 allocations migrated.

## Account

| SF field | Twenty field |
|---|---|
| `Name` | `name` |
| Address fields | Address block (standard) |
| `League__c` | `league` |
| `Primary_Vertical__c` | `revenueType` |

## Contact

| SF field | Twenty field |
|---|---|
| `FirstName`, `LastName` | Direct |
| `Email`, `Phone` | Direct |
| `Title` | `jobTitle` |
| `AccountId` | `company` RELATION |

## Service Ticket, Design Request, Venue

Migrated with SF field names mapped to camelCase Twenty equivalents. For full per-field detail, check the SF schema dumps at `/root/twenty-backups/sf-schema/`.

## Fields NOT migrated

- **Activity history** (calls, meetings, emails via Einstein) — "less important" per Jireh
- **Tasks from SF** — new tasks go native in Twenty, no backfill
- **Case comments** — service ticket comments get a fresh start in Twenty's `ticketComment` object
- **Custom campaign objects** — didn't exist in ANC's SF org

## How the matching worked

1. **Account → Company match:** exact name, then normalized (strip suffixes like "LLC", "Inc"), then manual triage for ambiguous cases
2. **Contact → Person match:** email first, then first+last+company fallback
3. **Opportunity → Company link:** via parent AccountId already matched in step 1
4. **Revenue Tracker → Opportunity split:** exact parent opp match

Unmatched records logged. See `/root/twenty-backups/` for full match + exception reports.
