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

## How it works

1. The assistant turns your prompt into a venue-aware creative brief.
2. The image is generated and saved to the Design Request.
3. The result appears inline so the team can review, revise, or share it.

## Auto-follow-on: proof share link

When a Design Request moves to client review, the proof workflow runs:

1. A proof link is generated.
2. The Design Request is updated.
3. The client review flow kicks off.

## Safety net

A background safety check also picks up requests if the primary automation is delayed.

## Tested on

Reference test: **"Celtics TD Garden – 3 Boards"**. Image generated in about 20 seconds and attached to a Design Request.
