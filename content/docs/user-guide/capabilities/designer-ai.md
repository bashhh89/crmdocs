---
title: Designer AI
description: Generate venue mockup graphics in 20 seconds.
---

# Designer AI

## Why this exists

Every RFP response needs mockups. The traditional path — loop the design team in, iterate over email, wait days — didn't scale. Designer AI gives the proposal and account teams a way to generate a first-pass venue mockup directly from the CRM, in seconds, without blocking design.

It's not a replacement for the design team. It's a starting point that anyone can produce in 20 seconds.

## How to use it

### From the assistant chat

Type the prompt directly:

> *"touchdown graphic for Louisville, end zone, night game feel"*

The assistant enriches with team palette, venue motifs, and broadcast vocabulary, calls the image model, and returns the image inline. A **Design Request** record is created automatically with the image attached.

### From a Design Request record

1. Open any Design Request
2. Fill `aiPrompt`
3. Save — the worker picks it up and fills `generatedImage` within ~20 seconds

## Under the hood

- **Model:** `gemini-3-pro-image-preview` (Google)
- **Logic function:** `generate-design-image` (id `30ab8a08-1d16-4603-bd9b-4e7925e3adfb`) — Node22 runtime, tool-enabled
- **Flow:**
  1. Prompt → Gemini API
  2. Generated image uploaded to the CRM's file storage via `uploadFilesFieldFile`
  3. New Design Request record created with `generatedImage` FILES field populated
  4. Returns `{url, designRequestId, markdownToEmbed}` for inline embed

## Auto-follow-on: proof share link

When a Design Request flips to `STATUS_CLIENT_REVIEW`, the workflow **Auto-Generate Proof Share Link on Client Review** (id `fdd500af`) fires:

1. HTTP call generates a proof URL
2. Updates `proofShareUrl`
3. Emails `proofClientEmail`
4. Proof review flow kicks off

## Safety net

A Python worker at `scripts/designer_ai_worker.py` (systemd service `designer-ai.service`, 15s poll) also processes any record where `aiPrompt` is set but `generatedImage` is null. Redundancy for when the logic function is unavailable.

## Tested on

Reference record `45fe8bf7-047e-4211-aa6d-490cfb7cc1fb` — **"Celtics TD Garden – 3 Boards"**. Image generated in 20s, URL populated, Design Request created.
