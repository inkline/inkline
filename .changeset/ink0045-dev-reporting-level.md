---
"@inkline/compiler": minor
"@inkline/cli": patch
---

Reclassify the Astro two-way-binding notice (INK0045) from `warning` to `info`, and add a diagnostics reporting level (`meetsLevel`). The CLI dev/watch loop (`inkline compile --watch`) now reports `warning` and above, so INK0045 stays quiet during development while genuine warnings still surface; it still prints on a one-shot `inkline compile` and on `inkline check`.
