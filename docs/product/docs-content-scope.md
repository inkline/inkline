# RFC: content scope for the Inkline v5 documentation site

**Status:** proposed · **Owner:** product · **Tracking:** UXF-171 (item 3 of the UXF-158 gap audit)
**Scope:** what `apps/website` documents at launch, and what it deliberately does not. No page is authored by this document.

> **Assumption in force — ASSUMED, labelled so it is cheap to reverse.**
> "Ready for usage" means **public production launch**. The Operator was asked twice (Aug 6, Aug 8) and the question is still open; @trigger's call on Aug 8 was to stop stalling the tree and scope for public launch. If the answer comes back "internal preview", see [If this is a preview](#if-this-is-a-preview) — the honest recommendation collapses to _defer this entire workstream_, and this RFC is 20 minutes of reversal, not a rewrite.

Every claim below is labelled **VERIFIED** (read from the tree or a registry), **INFERRED**, or **ASSUMED**.

---

## 1. The reframe: this is not a smaller styleframe

The framing question — "styleframe has 148 docs pages, inkline has 3, close the gap" — measures the wrong thing.

**styleframe** is a styling engine with one audience and one enormous reference surface. **VERIFIED** from `apps/docs/content`: of its **148** docs pages, **111** are _theme reference_ — design tokens, elements, components, utilities, modifiers. That surface documents CSS that styleframe generates. It is 75% of the page count.

**Inkline v5 is two products sharing a repo** — **VERIFIED** from `docs/scope.md`, `core/compiler/README.md`, and the workspace layout:

|                           | what it is                                                                     | packages                                                                                          | audience                                      |
| ------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **The compiler**          | Author once in `.ink.tsx`, emit idiomatic output for 7 frameworks. No runtime. | `@inkline/compiler`, `@inkline/core`, `@inkline/cli`, `@inkline/plugin`, `@inkline/config-loader` | people building their own component libraries |
| **The component library** | 8 components, compiled from one source to 7 targets                            | `@inkline/{react,vue,svelte,solid,angular,qwik,astro}`                                            | people who want a Button                      |

Inkline has **no theme reference surface at all**. It consumes styleframe for that — **VERIFIED**, `tooling/cli/src/lib/styleframe-config.ts` exists and the CLI reads a styleframe config. Copying styleframe's tree would mean writing 111 pages documenting a surface Inkline does not own.

**The consequence:** inkline's page count is driven by _the compiler's authoring surface_ plus _8 components_. Not by parity with 148. The target tree below is **37 docs pages**, and the minimum publishable set is **23**. That is not a shortfall against styleframe — it is the correct size for this product.

---

## 2. Question 2 first: the framework multiplier is already solved

This was named the biggest lever — "a factor of up to 7 on content volume." **It is not, and the tree already proves it.**

**VERIFIED, three ways:**

1. **Components are authored once.** `ui/components/src/components/` holds 8 components. `ui/react/src/index.ts` is one line: `export * from "../.inkline/index.ts"` — the framework packages are _generated_, not written. Same for the other six.
2. **Stories are authored once.** There are **8** story files total (`ui/components/src/components/*/stories/*.ink.stories.ts`) and **zero** hand-written stories in any of `ui/{react,vue,svelte,solid,angular,qwik,astro}/src`. They compile per target.
3. **The docs pattern already serves 7 frameworks from one page.** `apps/website/content/docs/03.components/01.button.md` is a single file containing `::framework-switcher` with seven `:storybook-embed` blocks, driven by `docsTheme.frameworks` in `app.config.ts`.

So "does every page carry all 7 variants?" — **yes, and the marginal cost per framework is one line of MDC.** The factor-of-7 fear applies to _deployment_, not content.

Where seven frameworks genuinely cost something:

| cost                                                    | size                     | owner                                           |
| ------------------------------------------------------- | ------------------------ | ----------------------------------------------- |
| 7 Storybook deployments (embeds 404 today)              | M                        | @merge, already scoped on UXF-170 — not content |
| Per-framework install/setup prose (genuinely divergent) | 7 short blocks, one page | docs                                            |
| Per-target caveats                                      | 1 page (a matrix)        | engineering                                     |

The caveats are small and known — **VERIFIED** from `docs/scope.md`: five targets are "first-class"; **angular** unwraps `<Transition>` (animation needs consumer setup) and ships no bundled CSS export; **astro** is static-first and also unwraps `<Transition>`.

### Recommendation (Q2)

**All seven frameworks get first-class treatment in the component reference and in installation — because it is nearly free — and depth-tiering happens in one honest support matrix, never by hiding a framework.**

Concretely:

- Component pages: 7-tab switcher, all seven. Cost per framework ≈ 0.
- Installation: **one** page with a 7-tab switcher (not 7 pages) for the MPS; split into 7 dedicated pages in v-next when each has enough framework-specific prose to deserve one.
- One **Target support matrix** page that states the angular and astro caveats in plain language.
- Integration _guides_ (bundler wiring, SSR, monorepo setup) are written for the five first-class targets only, and the matrix says so.

### Steelmanned alternative — rejected

_"React and Vue get first-class docs; the other five get a compatibility note. Ship in a third of the time."_

This is the cheaper option and it matches where the audience probably is. **Reject it**, for one reason: the product's entire claim — printed on the landing page, in `seo.description`, and in the first paragraph of Getting Started — is _write-once, compile-everywhere for seven frameworks_. Documenting two of them invites every reader to ask "so does Svelte actually work?", and the honest answer would be "yes, we just didn't write it down." That is a credibility cost far larger than the content cost, which is ≈0 because the variants are generated.

**But the alternative's real insight survives, as a kill criterion:** seven tabs that 404 are worse than two tabs that work. See [Kill criteria](#7-kill-criteria).

---

## 3. Question 1: what Inkline v5 documents

Four sections, in IA order. Source material in the right-hand column is **VERIFIED** to exist and is already written — this workstream is substantially a _re-cut_, not net-new authoring.

### Target tree — 37 docs pages

```
content/
├─ index.md                                    (landing — owned by UXF-172, not counted)
├─ docs/
│  ├─ 01.getting-started/                      12 pages
│  │  ├─ 00.index.md                           Introduction — what Inkline is, who it's for
│  │  ├─ 01.installation.md                    Install the compiler + core
│  │  ├─ 02.quickstart.md                      Author → compile → run, end to end
│  │  ├─ 03.frameworks/00.index.md             Framework setup (index)
│  │  ├─ 03.frameworks/{react,vue,svelte,      7 pages — one per target
│  │  │   solid,angular,qwik,astro}.md
│  │  └─ 04.target-support.md                  Support matrix + per-target caveats
│  │
│  ├─ 02.authoring/                            10 pages   ← core/compiler/README.md (982 ln)
│  │  ├─ 00.index.md                              + docs/authoring-components.md (180 ln)
│  │  ├─ 01.components.md                      defineComponent, multiple per file
│  │  ├─ 02.props.md                           parameter-type + options-object forms
│  │  ├─ 03.state.md                           createSignal / createMemo / createEffect
│  │  ├─ 04.control-flow.md                    <Show> <For> <Switch>/<Match>
│  │  ├─ 05.slots.md                           <Slot>, defineSlot, named + scoped
│  │  ├─ 06.events.md                          events, two-way binding
│  │  ├─ 07.refs-lifecycle.md                  createRef, onMount, onCleanup
│  │  ├─ 08.styling.md                         .ink.css siblings, headless/styled split
│  │  └─ 09.limitations.md                     v0 limits + roadmap  ← docs/scope.md (78 ln)
│  │
│  ├─ 03.components/                           9 pages    ← ui/components/src/components/
│  │  ├─ 00.index.md                           overview + headless/styled explanation
│  │  └─ {badge,button,checkbox,field-group,   8 pages, all shipped components
│  │      hamburger-menu,input,radio,switch}.md
│  │
│  └─ 04.reference/                            6 pages
│     ├─ 00.index.md
│     ├─ 01.cli.md                             compile · check · init
│     ├─ 02.config.md                          inkline.config.ts
│     ├─ 03.core-api.md                        @inkline/core public API
│     ├─ 04.compiler-api.md                    programmatic API + plugin hooks
│     └─ 05.diagnostics.md                     INK0001–INK0100 registry
│
├─ changelog/5.0.0.md                          see §5
└─ license.md                                  see §5
```

**⚠️ Accuracy trap for whoever writes `04.reference/01.cli.md` — VERIFIED.** `core/compiler/README.md` says the CLI "exposes four commands" and lists `add`. Only **three** exist: `tooling/cli/src/commands/` contains `init.ts`, `compile.ts`, `check.ts`, and the pending changeset `.changeset/remove-unimplemented-add-command.md` unregisters `add` explicitly. The re-cut must verify against source, not the README. Treat this as representative: the README is a snapshot, the source is the truth.

### Non-goals — explicit, and not up for negotiation without a new decision

1. **No v4 → v5 migration guide.** **VERIFIED:** the shipping v4 line is `@inkline/inkline@4.7.2`, a Vue-only component library. v5 is a compiler with no runtime. There is no mechanical upgrade path, and a document titled "migration guide" promises one. The honest artifact is a short positioning page — _"Inkline v4 and v5 are different products; here is why, and here is where the v4 docs live"_ — and it is **v-next**, not launch.
2. **No migration of `.old/docs/content/docs`.** **VERIFIED:** ~23 pages documenting v4 components — alert, card, modal, popover, tabs, loader, icon, button-group — **none of which exist** in v5's eight. Source material for tone. Nothing else.
3. **No theme, design-token, utility, modifier, or element reference.** That surface is styleframe's and inkline consumes it. Link out. This is the single largest deletion from the parity framing: 111 of styleframe's 148 pages.
4. **No localized content.** The layer ships 30 locales but inkline never registers `@nuxtjs/i18n` (UXF-169, audit item 8). English only.
5. **No contributor documentation on the site.** `docs/adding-a-target.md`, the six ADRs, `conventions.md`, `release-process.md`, `maintenance.md` stay in the repo where contributors already find them.
6. **No commercial pages.** styleframe's `pricing`, `pro`, `figma`, `scanner` pages exist because styleframe has a paid tier. Inkline is MIT (**VERIFIED**, `license: MIT` across the published packages). Not a gap.
7. **No recipes / cookbook / comparison pages** at launch.

---

## 4. Question 3: the minimum publishable set

**23 docs pages + 1 changelog entry + 1 root page. Roughly 1,800–2,400 lines.**

This is the thinnest slice that is _honestly_ launchable for a compiler claiming seven frameworks — a reader can install it, author a component, compile it, understand every authoring primitive, use all eight components, and look up every CLI flag and diagnostic code.

| section             | MPS                                                                                                                                   | deferred to v-next                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Getting Started** | **4** — Introduction · Installation · Your first component · **Framework setup & support matrix** (one page, 7-tab switcher)          | split the framework page into 7 dedicated pages; bundler/SSR integration guides |
| **Authoring**       | **7** — Overview · Components & props (merged) · State & reactivity · Control flow · Slots · Events & binding · Limitations & roadmap | Refs & lifecycle · Styling · "Build your own design system" guide               |
| **Components**      | **9** — Overview + 8 component pages                                                                                                  | per-component accessibility notes, theming recipes                              |
| **Reference**       | **3** — CLI · Configuration · Diagnostics                                                                                             | `@inkline/core` API · `@inkline/compiler` programmatic API + plugin hooks       |
| **Changelog**       | **1** — `5.0.0`                                                                                                                       | pre-v5 history (never — see §5)                                                 |
| **Root**            | **1** — `license.md`                                                                                                                  | `terms.md`; `privacy.md` + `cookies.md` **only if analytics ship** (§5)         |

Two merges do the heavy lifting and both are proven patterns already in the tree:

- **Framework setup as one switcher page** instead of seven. Same MDC pattern as `button.md`. Saves 6 pages without hiding a framework.
- **Components & props as one authoring page.** They are one concept until the API grows.

The landing page (`content/index.md`) is **not** counted here — it is UXF-172's. Its CTA should point at **`/docs/getting-started`**; that URL is stable in this tree and @palette can wire it without waiting.

---

## 5. Question 4: changelog and root pages

### Changelog — the Operator has confirmed inkline gets one

**Mechanism is free.** **VERIFIED:** styleframe's `apps/docs/content.config.ts` calls `defineDocsCollections(DOCS_SECTIONS, { sitemap: true, changelog: true })`; inkline's passes no options at all. One argument, and `/changelog` + `/changelog/<version>` exist. Layer extraction is tracked separately and is not this document's problem.

**Recommendation — hybrid, two surfaces with different jobs:**

| surface                           | audience                          | generated?                                | lives in                          |
| --------------------------------- | --------------------------------- | ----------------------------------------- | --------------------------------- |
| per-package `CHANGELOG.md`        | engineers, dependabot, `npm view` | **yes** — `changeset version` writes them | the repo, per package             |
| `/changelog/<version>` site entry | users deciding whether to upgrade | **no** — hand-written at release time     | `apps/website/content/changelog/` |

**Do not generate the site changelog from `CHANGELOG.md`.** Two reasons, both verified:

- There is **no `CHANGELOG.md` anywhere in the repo** — every package is at `0.0.0` with **90** pending changesets. Nothing exists to generate _from_ yet.
- When it does exist, changeset output is commit-level and per-package: _"fix(compiler): carry defineEmits payload types through to codegen"_, _"angular collapse unforwarded prop"_. Accurate, and useless to someone deciding whether to upgrade. styleframe's 17 entries (~16–24 lines each, `title`/`description`/`version`/`date` frontmatter, then **New / Improved / Fixed**) read as narrative because a human wrote them. Match that shape.

**Granularity: one entry per monorepo release, not per package.** Inkline publishes **14 public packages** from one changeset run (**VERIFIED** from the workspace: `inkline`, `@inkline/{compiler,core,config-loader,plugin,cli,test-utils,react,vue,svelte,solid,angular,qwik,astro}`; `website` and `@inkline/components` sit in `.changeset/config.json`'s `ignore` list). Fourteen entries per release is unreadable. **One entry, closing with a "Packages released" table** listing each package and its version — that keeps per-package precision without fragmenting the story.

**Entries at launch: one. `5.0.0`. Do not import pre-v5 history.** **VERIFIED:** v4 is a Vue-only component library published as `@inkline/inkline@4.7.2`; the v5 compiler is a different product. Importing v1–v4 entries would document a product this site does not describe. The `5.0.0` entry should open with one paragraph acknowledging the lineage and linking the v4 docs archive — that is the whole obligation to the old history.

> **⚠️ Release-owner flag — not a product call, but it lands in the changelog.** **VERIFIED:** the unscoped `inkline` package on npm is at **2.6.1**, while the v4 line lives at `@inkline/inkline@4.7.2`, and this repo's `core/inkline` is `0.0.0` locally. Publishing v5 as `inkline@5.0.0` means the unscoped name jumps 2 → 5 and skips two majors that shipped under a different name. Whatever gets decided, the `5.0.0` changelog entry has to explain it in one sentence, or the first issue filed after launch will be "why does npm say 2.6.1?". → release owner / @merge.

### Root pages — 1 at launch, 3 if analytics ship

styleframe's 8 root pages are `cookies · figma · license · pricing · privacy · pro · scanner · terms`. **Four are commercial** (`figma`, `pricing`, `pro`, `scanner`) — styleframe sells a tier; inkline is MIT. Not parity, and copying them would be inventing a product.

| page                                    | launch?         | reasoning                                                         |
| --------------------------------------- | --------------- | ----------------------------------------------------------------- |
| `license.md`                            | **yes**         | MIT (**VERIFIED**). Expected for an OSS library, cheap, one page. |
| `privacy.md`                            | **conditional** | Required _only if_ PostHog analytics are enabled in production.   |
| `cookies.md`                            | **conditional** | Same condition.                                                   |
| `terms.md`                              | no              | No service is being sold.                                         |
| `pricing` / `pro` / `figma` / `scanner` | no              | No equivalents exist.                                             |

> **🔷 Decision needed — Operator: is PostHog analytics enabled on `inkline.io` at launch?**
> The layer ships a PostHog plugin (the one that killed hydration — UXF-168). If `posthog.key` is set in production, `privacy.md` and `cookies.md` are **legal requirements, not nice-to-haves** — 2 pages, largely adaptable from styleframe's. If analytics stay off, root pages collapse to `license.md` and this half of question 4 closes permanently.
>
> This is the **same decision** as the success metric in §6. Answering it once resolves both.

---

## 6. Success metric and guardrail

No spec ships without one.

- **Success:** ≥ **60%** of sessions landing on any Getting Started page reach a Components or Authoring page. Measured 30 days post-launch. This tests the thing that actually matters — whether the docs _route people forward_ — rather than raw traffic, which measures marketing.
- **Guardrail:** **< 10%** of in-site searches return zero results. A docs site can post good funnel numbers precisely because readers are lost and searching constantly; this is the counter-number that catches it.
- **Instrumentation:** both require PostHog enabled — the same decision as the privacy page above. **If analytics stay off, we ship blind.** That is an acceptable choice; it is not an acceptable _unrecorded_ choice. If the answer is "no analytics", this section is replaced by a written acknowledgement that launch success is unmeasurable, and the search-result guardrail moves to a manual monthly spot-check.

---

## 7. Kill criteria

- **Fewer than 5 of 7 Storybooks deploy** (UXF-170). Seven tabs where four 404 is worse than three tabs that work. If this happens: reconfigure `docsTheme.frameworks` down to what actually deploys, and drop the seven-framework claim from the landing page and `seo.description` in the same PR. Documenting frameworks whose live examples 404 is a credibility loss, not a content gap.
- **The MPS is not complete when the rest of the tree is ready to ship.** Ship the sections that are done and gate the nav on authored content only — the section descriptor in `apps/website/app/constants/sections.ts` already works this way by design ("Only sections with authored content are declared, so the nav never shows an empty tab"). Never ship a nav entry that leads nowhere.
- **Props tables cannot be verified against source.** If hand-maintained tables are the only option and no generation path exists, cut the Components section to a shorter live-demo-plus-link shape rather than shipping tables that will be wrong within one release.

---

## 8. Question 5: who writes it, and the split for routing

Split by **source of truth**, not by craft preference. ~23 pages, ~1,800–2,400 lines.

| #     | work                                 | pages | size    | owner                          | notes                                                                                                                                                                                                                                                                                                                                                                           |
| ----- | ------------------------------------ | ----- | ------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A** | **Authoring section**                | 7     | **L**   | engineering-led                | Re-cut of `core/compiler/README.md` (982 ln) + `docs/authoring-components.md` (180 ln) + `docs/scope.md` (78 ln). Correctness-critical. Not net-new writing.                                                                                                                                                                                                                    |
| **B** | **Reference section**                | 3     | **M**   | engineering-led                | CLI · config · diagnostics (INK0001–INK0100). **Verify against `tooling/cli/src/commands/`, not the README** — see the `add` trap in §3.                                                                                                                                                                                                                                        |
| **C** | **Getting Started**                  | 4     | **M**   | docs-led, engineering-paired   | The framework page needs a _working, verified_ install per target. Pairing is not optional; an install command that doesn't work is worse than no page.                                                                                                                                                                                                                         |
| **D** | **Components section**               | 9     | **M–L** | docs-led, engineering-reviewed | ⚠️ **Spike first (≈2h): can the compiler emit a props/events/slots JSON from the IR?** It already builds a full symbol table per component. If yes, these 9 pages are largely generated and D drops to **S**. If no, hand-written tables drift within one release and that risk must be accepted explicitly. This spike changes D's size more than anything else in this table. |
| **E** | **Changelog `5.0.0` + `license.md`** | 2     | **S**   | release owner                  | The entry is written _as part of_ the release, not after it. Carries the `inkline@2.6.1` versioning explanation.                                                                                                                                                                                                                                                                |

**Sequencing for @trigger.** A, B, C, D have no file overlap and can run in parallel. **D's spike should run first and alone** — it is the only unknown that changes a size estimate. E rides with the release, not with this tree. None of these block on UXF-170, but **D cannot be verified** until the Storybooks deploy: the embeds are the page body.

**Dependencies out:**

- **UXF-172** (@palette, landing page): CTA target is **`/docs/getting-started`**. Stable, use it now.
- **UXF-173** (@merge, redirect map): this tree is the destination URL list. Note that the v4 → v5 URL mapping is mostly _not_ one-to-one — `/docs/components/alert` and friends have no v5 destination, which makes the redirect map a real decision (410? redirect to a components index? keep a v4 archive subdomain?), not a mechanical table.

---

## If this is a preview

If the Operator answers "internal preview", the honest recommendation is **not** a smaller version of the above. It is:

**Defer this entire workstream.** Fix the three existing pages (the duplicate `<h1>`s in UXF-169 already cover part of it), ship them, and stop. The only addition worth making is the **8 component pages** — and only if the Storybooks deploy, because the components are the thing a preview exists to show. That is ~9 pages instead of 23, no changelog, no root pages, no framework matrix, no reference section. UXF-173 (the redirect map) becomes irrelevant, since a preview lives on a staging domain and breaks no inbound links.

Do not scope a public launch and call it a preview. The two answers produce genuinely different work.

---

## Open questions

1. **Preview or public launch?** — Operator. Asked Aug 6 and Aug 8. Scoped as public launch per @trigger's Aug 8 call. Cheap to reverse at RFC review; expensive after page authoring starts.
2. **Is PostHog enabled in production?** — Operator. Decides `privacy.md` + `cookies.md` (§5) _and_ whether the success metric in §6 is measurable. One answer, two resolutions.
3. **Can the compiler emit a props/events/slots JSON from the IR?** — engineering, ~2h spike. Decides whether the Components section is generated or hand-maintained, and is the largest single unknown in the sizing table.
4. **Unscoped `inkline` npm versioning** (2.6.1 → 5.0.0, skipping the `@inkline/inkline@4.x` line) — release owner. Not a product call, but it must be explained in the `5.0.0` changelog entry.
