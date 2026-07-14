---
name: docs-writing-style
description: How Inkline documentation is written and kept true — the doc surface, pointers-not-duplicates, the drift watch with its current inventory, voice rules, and the future docs website. Use for any docs/, AGENTS.md, README, or apps/website work.
---

# Writing Inkline docs

The doc surface today: `docs/*.md` (architecture, conventions, contributing, release-process, maintenance, authoring-components), **fourteen `AGENTS.md` files** (root + per package — the agent/contributor entry points), `core/compiler/README.md` (the user-facing language reference), and `.github` templates. The public docs site (`apps/website`) is a Vite vanilla placeholder — building it is the standing mission; until it exists, the repo markdown IS the documentation.

## House principles (from `docs/maintenance.md` — the constitution)

1. **Pointers, not duplicates.** Docs point at canonical sources (`vite.config.ts:lint`, `codes.ts`, `package.json:scripts`) rather than restating them. ✅ "Lint config lives in `vite.config.ts` `lint`." ❌ A hand-copied ignore list that will drift. Before writing a paragraph, ask: would a link to source lose anything? If no, link.
2. **The cross-reference table** in maintenance.md says which doc to update when X changes (compiler exports → README+AGENTS+architecture; CLI surface → cli AGENTS + README "CLI"; targets → architecture + README table; ports → contributing + storybook AGENTS…). Use it when reviewing your own PR.
3. **Link integrity is automated**: `tooling/agents-check` is a Vitest test that verifies the agent-facing doc surface's links/paths — it runs with the normal test gate. It catches renames/deletes, **not** semantic drift; semantics are the sweep's job.
4. **Every behavior-changing PR carries its doc updates.** You back @warden's freshness gate: an API PR without its AGENTS.md/README update fails review.

## The drift watch (this repo's disease, actively symptomatic)

Current known drift — the live inventory to burn down and the shape of what to watch for:

- `generated/` vs **`.inkline/`**: `ui/components/AGENTS.md`, the seven `ui/<framework>/AGENTS.md`, and `tooling/storybook/AGENTS.md` describe a `generated/` directory; the real output dir (per `inkline.config.ts` and the filesystem) is `.inkline/`.
- `core/compiler/README.md`: the CLI section documents `build`/`diagnose`/`version` — shipped commands are `compile`/`check`/`init`/`add`; the intro and "Available targets" table show 4 targets; "v0 limitations" still lists Angular/Qwik/Astro as deferred though all 7 ship.
- `docs/authoring-components.md` has drifted from the live badge/button/input source — anchor on source + `inkline.config.ts`.
- `tooling/cli/AGENTS.md` mentions `compile components`/`compile stories` subcommand phrasing; the shipped surface is a single `compile` (+ flags).

**Weekly sweep** (diff claims against source, every mismatch → same-day fix PR or `docs-drift` issue): component/family counts vs `ls ui/components/src/components` · CLI commands vs `tooling/cli/src/commands/` · target list vs `codegen/registry.ts` · diagnostics table vs `codes.ts` (regen: `pnpm docs:diagnostics` in core/compiler) · ports vs root `package.json` scripts · exports maps vs `package.json` files · the maintenance.md audit checklist quarterly.

## Voice

Direct, second person, present tense. Plain words; define terms on first use. Show, then explain — working code before theory, complete enough to paste (imports included). Every non-trivial snippet is compiled/run against the current build before publishing. No "simply", no marketing superlatives — the code is the pitch. Document the system that exists, not the one you wish existed; roadmap lives on the board.

## The future website (`apps/website`)

Today: stock Vite vanilla-TS starter (counter demo), no Inkline dependency, port ~5173 (`vp run dev`). When the real site lands: the stack decision goes through @maestro/Alex; **framework parity is the house rule** — component usage pages must serve all seven frameworks (a switcher, not seven pages); `document-component` stages per-component content in `.context/` until the site exists — drain that queue when it does; update `apps/website/AGENTS.md` with the real layout in the same PR that lands it.

## AGENTS.md style

Each package's AGENTS.md answers, fast: what this package is, the source map, key invariants, how to build/test, pitfalls, see-also links. It is written for the next agent with zero context. Root AGENTS.md is the entry point — keep its repository map and command table exactly true; nearest-wins resolution means per-package files carry the local law.
