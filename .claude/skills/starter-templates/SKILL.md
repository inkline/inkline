---
name: starter-templates
description: Anatomy and maintenance of styleframe-starter-* repos — what every starter must include, per-framework specifics, and the clone-to-dev-under-2-minutes bar. Use when creating or maintaining starters and examples.
---

# Starter templates

Open asks: `styleframe-starter-react`, `styleframe-starter-vue`, `styleframe-starter-svelte` (repo issues #11–13); Nuxt/Astro/Solid follow once the pattern proves out. Starters are the top of the adoption funnel — their quality bar is **git clone → pnpm install → pnpm dev → styled page in under 2 minutes**, zero decisions required.

## Required anatomy (every starter)

```
styleframe.config.ts     tokens via useDesignTokensPreset + a small custom-token example
                         (shows both "batteries included" and "make it yours")
src/*.styleframe.ts      ONE extension file using ONE recipe (useButtonRecipe) +
                         one custom selector — demonstrates the extension pattern
src/…                    minimal app: a page using the recipe (variant props visible),
                         a couple of utility classes (shows scanner), and a
                         light/dark theme toggle via data-theme
vite.config.*            styleframe/plugin/<bundler> wired; scanner.content globs set
tsconfig.json            .styleframe includes (what `styleframe init` would write)
.gitignore               includes .styleframe/
README.md                60-second quickstart, "what to look at" file map,
                         link to the 15-minute design-system guide on styleframe.dev
.github/workflows/ci.yml install + build + typecheck smoke on push
LICENSE                  MIT
```

Framework specifics: React (Vite + react plugin; recipe class strings on `className`), Vue (Vite + vue; `:class`), Svelte (svelte plugin; `class:`), Nuxt (module `styleframe/plugin/nuxt` — note it writes tsconfig `paths` for Vue-family type resolution).

## Rules

1. **Idiomatic per framework, identical in spirit**: same tokens, same recipe, same theme toggle everywhere — a reader comparing two starters should see the framework differences, not author drift.
2. Pin styleframe versions with `^`; starters must always work against latest published — they're implicit integration tests.
3. No extra dependencies beyond framework + styleframe + TypeScript. Every added dep is a decision forced on a newcomer.
4. README code must match the actual files verbatim (copy from source, don't retype).

## Maintenance protocol

- Every release train: Keeper pings; bump starters, run their CI, fix breaks same-day (a broken starter is a p1 — it's many users' first impression).
- Starter CI failing against a new styleframe version = regression signal → file against the owning package with the starter as the repro.
- Track a small `examples/` dimension over time: one "kitchen sink" showcase app can wait; starters stay minimal forever.
