---
name: starter-templates
description: Anatomy and maintenance of inkline-starter-* repos and examples — the two starter flavors, what every starter must include, per-framework specifics, and the clone-to-rendered-component-under-2-minutes bar. Use when creating or maintaining starters and examples.
---

# Starter templates

None exist yet — they are an open mission, gated on the first npm publish (starters must install published packages; until then, prototype in-repo with workspace/tarball installs and convert on release day). Starters are the top of the adoption funnel — their quality bar is **git clone → pnpm install → pnpm dev → a styled `IButton` on screen in under 2 minutes**, zero decisions required.

## Two flavors (build consumer starters first)

1. **Consumer starters** — `inkline-starter-{react,vue,svelte,solid,angular,qwik,astro}`: a minimal framework app that installs `@inkline/<framework>`, imports styled components + the `@inkline/<framework>/css` bundle, and shows variant props working. This is the 95% case: people who want the components in their stack.
2. **Author starter** — `inkline-starter-library`: for people building their own write-once component library — `.ink.tsx` sources + `@inkline/plugin/<bundler>` (or the CLI compile flow) + `inkline.config.ts` with a couple of targets. One repo, not seven; it demonstrates the compiler, not the catalog.

## Required anatomy (every starter)

```
src/…                    minimal app: one page using 2–3 styled components with
                         visible variant props (color/variant/size), a light/dark
                         toggle via data-theme, and one headless-part example
                         (the "bring your own styling" story)
main/app entry           imports "@inkline/<framework>/css" (consumer flavor)
package.json             framework + @inkline/<framework> + TypeScript — nothing else
README.md                60-second quickstart, "what to look at" file map,
                         link to the docs site (when it exists)
.github/workflows/ci.yml install + build + typecheck smoke on push,
                         against latest published versions
LICENSE                  MIT
```

Author flavor additionally: `inkline.config.ts`, one `.ink.tsx` component with a colocated test, the bundler plugin wired in `vite.config.ts` (note the plugin needs an explicit `target`), `.gitignore` covering the output dir.

## Per-framework specifics

React/Solid/Qwik: recipe class strings arrive via the compiled component — consumers just pass `color`/`variant`/`size` props. Vue: SFC output, `<script setup>` idioms. Svelte 5: runes-based output. Angular: standalone components, `ink-*` attribute selectors — show the `klass` merge. Astro: static SSR — demonstrate what works (rendering, props) and what degrades (no custom events, one-way binding) honestly in the README.

## Rules

1. **Idiomatic per framework, identical in spirit**: same components, same variant demo, same theme toggle everywhere — a reader comparing two starters should see the framework differences, not author drift.
2. Pin `@inkline/*` with `^`; starters must always work against latest published — they're implicit integration tests of every release.
3. No extra dependencies beyond framework + inkline + TypeScript. Every added dep is a decision forced on a newcomer.
4. README code must match the actual files verbatim (copy from source, don't retype).

## Maintenance protocol

- Every release train: Keeper pings; bump starters, run their CI, fix breaks same-day (a broken starter is a p1 — it's many users' first impression).
- Starter CI failing against a new inkline version = regression signal → file against the owning package with the starter as the repro.
- Friction found while building a starter (init papercuts, missing docs, confusing errors) is the team's best dogfooding — file it to the owning seat the moment it bites.
- Examples beyond starters (a kitchen-sink showcase app) can wait; starters stay minimal forever.
