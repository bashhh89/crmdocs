---
title: Designer AI
description: Generate venue mockup graphics in 20 seconds.
---

# Designer AI

Designer AI answers the specific ask Jireh made on the 2026-04-17 call: *"can the CRM generate design mockups so we don't have to keep going back and forth with the design team for every RFP?"*

Yes. It ships. It takes about 20 seconds per image.

## How to use it

### From Boyka chat
Type the prompt directly:

> *"touchdown graphic for Louisville, end zone, night game feel"*

Boyka enriches with team palette + venue motifs + broadcast vocabulary, calls the image model, returns the image inline. A **Design Request** record is auto-created with the image attached.

### From a Design Request record

1. Open any Design Request
2. Fill `aiPrompt` field
3. Save — the worker picks it up and fills `generatedImage` within ~20 seconds

## Under the hood

- **Model:** `gemini-3-pro-image-preview` (Google)
- **Logic function:** `generate-design-image` (id `30ab8a08-1d16-4603-bd9b-4e7925e3adfb`) — Node22 runtime, tool-enabled so Boyka can call it directly
- **Flow:**
  1. Prompt → Gemini API
  2. Generated image uploaded to Twenty file storage via `uploadFilesFieldFile`
  3. New Design Request record created with `generatedImage` FILES field populated
  4. Returns `{url, designRequestId, markdownToEmbed}` so Boyka embeds it inline

## Auto-follow-on: proof share link

When a Design Request flips to `STATUS_CLIENT_REVIEW`, the workflow **Auto-Generate Proof Share Link on Client Review** (id `fdd500af`) fires:

1. HTTP call generates a proof URL
2. Updates `proofShareUrl` field
3. Emails `proofClientEmail`
4. Proof review flow kicks off

## Safety net

A Python worker at `scripts/designer_ai_worker.py` (systemd service `designer-ai.service`, 15s poll) also processes any record where `aiPrompt` is set but `generatedImage` is null. Redundancy in case the logic function is down.

## Tested on

Real proof record: `45fe8bf7-047e-4211-aa6d-490cfb7cc1fb` — **"Celtics TD Garden – 3 Boards"**. Image generated in 20s, URL populated, Design Request created.
