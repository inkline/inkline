---
name: component-document
description: Phase 5 of building an Inkline component — finalize docs and the release. Complete TSDoc on the prop interfaces, add a changeset for the affected framework packages, confirm exports/freshness, and stage the future docs-site page (the docs website is not built yet — TBD). Use when wrapping up a component for release.
triggers:
  - document a component
  - finalize a component
  - add a changeset for the component
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# Component documentation & release prep

The public docs website **does not exist yet** — so the "document" phase today means: make the API self-documenting (TSDoc), prepare the release (changeset), keep the repo's own docs honest, and stage the future docs-site content without shipping anything speculative.

## Read first

- The spec at `.context/component-<name>-spec.md` (the source of the user-facing description and examples).
- `docs/release-process.md` for changeset conventions; `IInput`'s prop interfaces for the TSDoc bar.

## Steps

### 1. TSDoc completeness pass

Every prop on every public interface (headless `*BaseProps` and styled `*Props`) gets a one-line `/** … */` describing its effect — the bar is `IInput`'s interfaces. Document slots, models, and emitted events too. This is the de-facto API reference until the website exists, and it powers editor intellisense in all 7 framework packages.

### 2. Changeset

The component ships through the **per-framework packages**, not the private `@inkline/components`. Run `pnpm changeset` and select the affected framework packages (`@inkline/react`, `@inkline/vue`, `@inkline/svelte`, `@inkline/solid`, `@inkline/angular`, `@inkline/qwik`, `@inkline/astro`) — all 7 for a new component. Use a `minor` bump for a new component (`feat`), `patch` for a fix. Write a clear, user-facing summary (what the component is, key props).

### 3. Freshness

- Confirm the styled + headless exports are in `ui/components/src/components/index.ts`.
- If any `AGENTS.md` or `docs/*.md` maintains a component list or examples, update it. **Do not** treat `docs/authoring-components.md` as a code template — it has drifted; the live source is canonical.
- Do **not** edit generated dirs (`ui/<framework>/.inkline/`, `.styleframe/`) or `.old/`.

### 4. Docs website — TBD (stage, don't ship)

The website (`apps/website`) has no component-doc pages yet. Do not invent a docs framework. Instead, capture the intended page content in the spec (or `.context/component-<name>-docs.md`) so it's ready when the site lands. A component doc page will eventually carry:

- a one-paragraph description and an import snippet,
- the **anatomy** (parts + the styled composition),
- a **props/slots/events table** (generated from the TSDoc'd interfaces),
- **accessibility notes** (the APG pattern, keyboard map, ARIA from the spec),
- **live examples** mirroring the Storybook variants.

Leave a short note in the changeset or PR description that the website page is pending the docs-site implementation.

### 5. Final verify

`vp run ready` (build + check + test) from the repo root must be green. When reading `vp check`, ignore the ~290 pre-existing `TS17004` fixture errors (standing baseline — see `.../reference/verification.md`); trust `vp test`.

## Exit criteria

Every prop/slot/event has TSDoc, a changeset exists for the 7 framework packages with a clear summary, exports and repo docs are current, the future docs-page content is staged, and `vp run ready` is green.
