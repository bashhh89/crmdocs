---
title: People
description: Contacts at client accounts — linked to Companies, never duplicated.
---

# People

People are contacts at client accounts. There are 19,966 in the CRM (migrated from Salesforce).

## Core fields

- `firstName`, `lastName`, `email`, `phone`
- `jobTitle`
- `company` — RELATION to Company
- Address block

## Rule: don't create duplicate Companies when creating People

When you import a new contact, **always match to an existing Company first**. The Email-to-Opportunity workflow (Phase 2) does this automatically. For manual creation:

1. Search the Company name first
2. If it exists, link — don't create a new one
3. If it's a new account, then create the Company, then the Person

This is Natalia's explicit rule — we got burned in Salesforce by duplicate accounts diluting revenue reports.

## What links to a Person

- Their Company (required)
- Opportunities they're listed on (`pointOfContact`, or referenced in notes)
- Tasks assigned to them
- Notes

## Not imported from SF

- **Activity history** (calls, meetings) — Jireh said the timeline feed is "less important here"
- **Einstein activity capture** — didn't work in SF, not replicated

## Bulk operations

For per-person bulk updates, use REST PATCH paced at ~1.5/s — see [Rate Limits](/docs/operators/rate-limits).

For bulk creates (e.g., importing a new contact list), use GraphQL `createPeople(data: [...])` in 50-row chunks.
