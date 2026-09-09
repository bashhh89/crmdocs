# Parked lessons — hidden on purpose

Ahmad, 2026-09-09: *"find every wrong thing that shouldn't be on docs yet and hide it … basically anything that has to do with this new thing we do. Hide it until I say so."*

Everything under `parked/` is OUT of the site build: Fumadocs only reads `content/docs`, and Next only serves `public/`. The pages answer 404 and the Academy shows no card for them. The files stay in git, byte-identical, so restoring a lesson is one move back and a redeploy:

```
git mv parked/content/docs/workflows/<slug>.mdx content/docs/workflows/
git mv parked/public/videos/training/<slug>* public/videos/training/
git mv parked/public/img/academy/<slug>* public/img/academy/
# then add <slug> back to content/docs/workflows/meta.json and its card to src/app/academy/catalog.tsx
```

Parked here (the creative / presentation line + ANC Studio, none of it announced yet):
client-presentations, tracked-client-link, venue-showroom, anc-sales-kits, inside-the-work, shared-client-brief, classroom-design, classroom-proposal — with their videos, captions, posters and audio.

Do not "fix" a 404 on these routes. They are parked until Ahmad says otherwise.
