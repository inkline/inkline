---
name: docs-writing-style
description: How Styleframe documentation is written — apps/docs structure, page anatomy, Nuxt Content components, framework switcher, numbering hygiene, and freshness rules. Use for any apps/docs or AGENTS.md work.
---

# Writing Styleframe docs

The docs site is `apps/docs` (Nuxt Content + Markdown, i18n-ready, deployed at styleframe.dev/docs). Its own `apps/docs/AGENTS.md` is the authoritative style guide — read it before writing; this skill is the operational summary.

## Page anatomy (the house structure)

`Overview → Why → main content → Examples → Best Practices → FAQ`. Every page opens with **working code within the first screen** — a reader five minutes from giving up should paste something and see it work before any theory.

Markdown components available: `::tabs` (framework/bundler switching), `::steps` (sequential setup), `::story-preview` (live component embeds), `::accordion` (FAQ). Frontmatter per the docs AGENTS.md format.

**Framework parity**: composable/usage pages support the persistent framework switcher (Vue/React/Vanilla via `useFramework()` + localStorage). New usage docs provide all three variants — a page that only shows Vue is incomplete.

## Content tree (know where things go)

```
01.getting-started/  install (vite/nuxt/manual), guides (15-min design system,
                     theme switcher), comparisons (vanilla-extract, tailwind), licensing
02.api/              instance, variables, selectors, at-rules, media-queries, keyframes,
                     interpolation, utilities, utility-modifiers, themes, recipes/,
                     composables, imports, merging
03.design-tokens/    per-token-category pages + fluid-design/
04.elements/         semantic HTML base styles
05.components/       ~55 recipe pages by category (actions/navigation/feedback/forms/
                     overlays/layout/ai-chat)
06.utilities/        19 category pages
07.modifiers/        11 category pages
08.tooling/          cli, scanner
09.integrations/     dtcg, figma-plugin, storybook
```

## Voice

Direct, second person, present tense. Plain words over jargon; define terms on first use. Show, then explain. Code blocks must be complete enough to paste (imports included). No marketing superlatives inside docs pages — the code is the pitch.

## Hygiene duties (active problems, own them)

1. **Numbering collisions**: the content tree has duplicate prefixes and stale dupes (e.g. two `13.` files in `02.api/`, both `03.guides.md` and `03.guides/`, parallel installation trees). When touching a section, fix its numbering; never add a new collision.
2. **Doc drift is this repo's disease.** Docs and AGENTS.md have materially lagged source (theme AGENTS claimed 2 recipes vs 39 shipped families). Weekly sweep: diff claims against source (`ls theme/src/recipes`, plugin adapters list, CLI command list, default variant values). Every drift found → fix PR or `docs-drift` issue same day.
3. **Every behavior-changing PR carries docs.** You review-support Warden here: if an API PR lacks its docs update, the gate fails.
4. Snippets must compile: extract and run non-trivial examples against the current build before publishing.

## Known holes (backlog seeds)

Toast/notification and other missing-recipe pages (blocked on Palette), migration guides (from Tailwind/vanilla-extract/Panda), troubleshooting page, theming-architecture overview, per-framework usage guides beyond install, VS Code/tooling docs beyond CLI+scanner, ai-chat category has a single page.
