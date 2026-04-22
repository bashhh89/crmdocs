---
title: Venues
description: 200+ venues across college, OOH, and sports — where everything is configured.
---

# Venues

Every venue ANC services has a record in **Venues** (`/venues`). List view, card view, and a searchable map (`/venues/map`) are all available.

![Venues list](/img/screenshots/service-dashboard/06-venues-list.png)

## What's on a venue record

- Name, address, timezone, city/state
- Market (which region / operations team owns it)
- Client(s) linked to the venue (clients own contracted services that cascade to the venue)
- Contracted services: White Glove Maintenance, Break/Fix, Event Support, Walkthroughs, Operations, Scheduling, Tech Support, LiveSync, VisionStats, Parts
- Slack channel ID (where notifications for this venue go)
- Installed screens (model, resolution, pixel pitch — synced from Proposal Engine)
- Feed URL (only if the venue has a special custom calendar page to scrape)
- Requires staffing toggle (if off, events at this venue default to "warranty only")

## Linking venues to clients

Each venue can be linked to one or more clients. The client carries the service contract. When a client has a service enabled (e.g., Event Support), every venue under that client inherits it automatically — no need to toggle per-venue. Venue-level overrides exist if you need them.

## Auto-discovery and enrichment

- **Discover Events** button (on each venue detail page) pulls upcoming games and concerts from Ticketmaster and AI search — no manual feed URL needed
- **Geocode** — addresses without coordinates get resolved automatically so they show up on the map
- **Venue specs** sync from the Proposal Engine when a project goes live — no double entry

## Duplicates

Venues occasionally get created twice with slightly different names ("Crypto.com Arena" + "Crypto Arena"). Admins can merge duplicate venue records; events, tickets, and staff links all move to the keeper record automatically.

## See also

- [Client Portal](./client-portal) — each venue has a shareable client-facing page
- [Events](./events) — events live under venues
