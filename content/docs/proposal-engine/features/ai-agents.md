---
title: AI Inside the Proposal Engine
description: What the AI helps you with — Copilot, the RFP Analyzer, and quick estimates.
---

# AI Inside the Proposal Engine

The Proposal Engine has AI built into the workflow, not bolted on the side. Here's where you'll meet it and what each one does for you.

## The Copilot

The slide-out **Copilot panel** on every proposal page is the most visible AI surface. It does two different things, automatically picking the right one based on what you ask.

### Quick changes to the form

For requests like *"set the bond to 3%"*, *"change margin to 45%"*, *"swap to Yaham 3.9mm"* — the Copilot makes the change directly on the proposal. No clicking through menus. The form just updates.

### Knowledge questions

For requests like *"what's the difference between Yaham Halo and Aura?"*, *"what should I use for an outdoor scoreboard?"* — the Copilot answers from the LED Product Knowledge Base, with citations.

You don't have to pick which mode — just ask, and the Copilot routes itself.

## In the Estimator

Three AI helpers sit inside the Estimator:

- **AI Quick** — type a natural-language requirement (e.g. "10-panel 4mm videowall, full install and commissioning"), get back a first-pass list of line items
- **AI Reason** — on any line item, ask "why is this priced this way?" and the AI explains the math, referencing the current rate card
- **AI Chat** — open-ended estimating conversations, with the deal context, rate card, and prior estimates already loaded

## RFP Analyzer

Drop in a client's RFP PDF. The Analyzer:

1. Reads the document (text and images)
2. Pulls out the requirements, pricing tables, schedules, and drawings
3. Drafts a structured response with a compliance matrix
4. Generates a scoping workbook ready to share

This was tested across many real ANC RFPs and is locked in production. Every output also lands in the CRM under the deal.

## Quick estimates from the CRM

Sales can also ask Scout (the CRM's AI helper) for a quick estimate without opening the Proposal Engine at all:

> *"Scout, give me a back-of-napkin price for a 100-foot ribbon at 6mm."*

Scout builds the estimate inside the CRM and asks the Proposal Engine to render the cost sheet. The result lands right in chat. The full proposal still happens in the Proposal Engine when ready, but the 30-second ballpark is one Slack message away.

## Multi-currency

Proposals can be priced in USD, CAD, EUR, or GBP. Pick the currency once at the top of the wizard, and everything threads through — wizard, PDF, cost sheet, Excel, margin, rate card. Live since April 2026.

## Things that exist but aren't yet enabled

A few capabilities are fully built and tested but waiting on a billing decision before being switched on:

- **Intelligence Mode** — preset margin tiers (Aggressive / Standard / Premium / Strategic) with a full audit table and P&L breakdown
- **Strategic Match Badge** — a "17/20 Strategic Match" badge on proposals
- **Client Requests Portal** — a share link so clients can submit change requests directly
- **Verification Studio** — side-by-side Excel-vs-PDF comparison

When Ahmad flips them on, they appear in the workflow with no extra setup needed.

## See also

- [Estimator](./estimator)
- [RFP Analyzer](./rfp-analyzer)
- [Everything lands in the CRM automatically](./universal-crm-push)
