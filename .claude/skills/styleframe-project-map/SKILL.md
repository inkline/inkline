---
name: styleframe-project-map
description: Ground-truth map of the Styleframe monorepo — packages, versions, commands, conventions, sibling repos, and known traps. Read before any work in the styleframe codebase.
---

# Styleframe project map

Styleframe: type-safe, composable CSS-in-TypeScript for design systems. MIT core + paid Pro. Repo: `github.com/styleframe-dev/styleframe`, local `~/Workspace/styleframe`. Docs: styleframe.dev. Monorepo: pnpm workspaces + turbo. Node ≥22, pnpm ≥10.7.

## Layout

```
engine/    core (AST + authoring API), loader (jiti config/module loading),
           transpiler (AST → CSS/TS/DTS), runtime (~1.4KB recipe classes),
           scanner (utility extraction + import scanning), styleframe (barrel + bin)
theme/     @styleframe/theme — tokens, utilities, modifiers, elements, states,
           sanitize, recipes (39 families), presets (6)
tooling/   plugin (unplugin, 9 bundlers), cli (citty), figma (bidirectional sync),
           dtcg (W3C token format)
config/    shared TS/Vite build configs
apps/      docs (Nuxt Content, ~140 pages), app (customer dashboard, Supabase),
           storybook (Vue 3 + SB10), playground, shared (Nuxt layer)
testing/   integration (Playwright, 3 browsers), benchmark (visual parity + perf)
.changeset/  pending changesets   .claude/  rules, skills, API reference docs
```

Package versions (snapshot 2026-07-11 — verify with `grep '"version"' */*/package.json` before relying): core 3.6.2, loader 3.0.4, runtime 3.2.2, scanner 3.2.2, styleframe 3.9.1, transpiler 3.4.2, theme 3.9.0, cli 4.1.2, plugin 3.4.1, figma 2.1.1, dtcg 1.1.0 (newest, least mature).

## Commands (root)

```bash
pnpm install                 # setup
pnpm build:nodocs            # build engine + tooling + theme (what tests need)
pnpm test                    # turbo run test (vitest, colocated)
pnpm test:integration        # Playwright end-to-end (builds + packs first)
pnpm typecheck && pnpm lint  # oxlint — NOT eslint
pnpm format                  # oxfmt — NOT prettier
pnpm dev:docs | dev:playground | storybook
```

## Conventions

- **Commits**: conventional, package-scoped — `feat(theme): …`, `fix(plugin): …`.
- **Tests**: colocated `<file>.test.ts` next to source. Never a separate `tests/` dir.
- **Changesets**: every change to a published package needs one. **Ignore list** (no changeset needed): `@styleframe/docs`, `plugin-playground`, `testing-integration`, `app`, `storybook` — see `.changeset/config.json`.
- **Import rule**: consumers import from `styleframe` (barrel) or `styleframe/plugin/<bundler>`, `styleframe/loader`, `styleframe/transpiler` — never `@styleframe/*` sub-packages directly.
- **Index files**: `export *` re-exports only, no named exports.
- Repo guidelines (root AGENTS.md): think before coding, simplicity first, surgical changes, goal-driven execution. They are enforced at review.

## Known traps

1. **Doc drift is real here.** AGENTS.md files have materially lagged source (e.g., theme AGENTS claimed 2 recipes when 39 families existed). **Trust source over docs.** When they disagree: proceed from source, file a `docs-drift` issue.
2. **License coupling**: `@styleframe/license` is a private external package (not in this workspace) but a dependency of core builds. Missing/invalid license env → transpiler injects a CSS watermark. Don't "fix" watermark behavior — it's the business model (see `pro-platform` skill).
3. **Two build paths diverge by design**: CLI `styleframe build` = full output, no tree-shake/scan; bundler plugin = tree-shaken + minified. "Works via CLI" ≠ "works via plugin".
4. **Ordering matters**: recipes must be declared after the utilities/modifiers they reference (hard throw). Composable variables need `{ default: true }`. `merge()` goes general → specific.
5. **Roadmap lives in branches**, not the issue tracker (200+ local branches, issues historically stale). Check recent commits and branch names before declaring something "not started".

## Sibling repos

- `~/Workspace/styleframe-pro` — `@styleframe/pro` (paid composables: fluid design) + `@styleframe/license` (verification SDK). Patron's territory.
- `~/Workspace/styleframe-supabase` — empty stub; the real Supabase backend is hosted (dashboard project). Not a source of truth.
- `~/Workspace/inkline` — **customer zero**: consumes `use<Name>Recipe` from `@styleframe/theme` in `.styleframe.ts` files compiled to 7 frameworks. Breaking recipe/token changes need an Inkline heads-up + migration note.
- `~/Workspace/uxfront` — spec repo for the future AI design-system builder (Tauri + agents) on top of Styleframe/Inkline. Strategic direction; not yet implementation.

Deploy: docs/playground/storybook via Dockerfiles + nixpacks + Dokploy; dashboard at app.styleframe.dev; billing via Polar (external); analytics PostHog.
