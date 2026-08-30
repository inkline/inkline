# RFC-001: How published unbundled source reaches its styleframe recipes

Date: 2026-08-30 · Status: Proposed · Reversibility: **one-way door for the specifier, two-way for the mechanism**
Author: index · Decides: Project owner · Implements: @palette, on top of [#600](https://github.com/inkline/inkline/pull/600)
Tracking: internal tracker UXF-237 · Parent: UXF-235 · Measured against `main` at `8118157`

**Scope.** How a published file that ships as *source* — not as bundler output — reaches a build-time
virtual module. Astro is today's only such target; the answer becomes the publishing contract for
every future one. No code in this document.

Every claim is labelled **VERIFIED** (read from the tree, the registry tarballs, or PR #600's own
receipts), **INFERRED**, or **ASSUMED**.

---

## 1. Context

### The defect

**VERIFIED** (PR #600, reproduced by @palette on a tarball install into a fresh Astro app):

```
[vite]: Rolldown failed to resolve import "virtual:styleframe"
  from node_modules/@inkline/astro/dist/components/field-group/styled/IFieldGroup.astro
```

`@inkline/astro`'s main entry is unbuildable for any consumer. `@inkline/astro/headless` builds and
renders. This is the second defect in the stack: #600 fixed the `pack.copy` glob so the 67 `.astro`
files ship at all; this is what the styled entry hits next.

### The mechanism, precisely

`virtual:styleframe` is **two-faced** — the same specifier resolves to two different modules
depending on who imports it. **VERIFIED** from `@styleframe/plugin@3.4.1`, `src/plugin/index.ts`
(read from the published sourcemap):

```ts
resolveId(id, importer) {
  if (id === VIRTUAL_TS_MODULE_ID) {
    if (importer && isStyleframeSourceFile(importer)) return RESOLVED_VIRTUAL_EXTENSION_ID;
    return RESOLVED_VIRTUAL_CONSUMER_ID;
  }
  ...
}
```

- **Extension face** — importer matches `/\.styleframe\.ts$/`. Returns the global `styleframe()`
  instance factory. This is what `ui/components/src/components/badge/styled/IBadge.styleframe.ts`
  gets.
- **Consumer face** — everything else, including every emitted component. Returns
  `generateConsumerModule(state, minify, minifyOptions)`, which is
  `transpile(globalInstance, { type: "ts", minify })` from `@styleframe/transpiler` — **a real
  TypeScript module with the recipe runtime data serialised into it.**

That last fact does most of the work below: the module the compiler needs is not conjured at
resolution time out of live bundler state. It is a file the toolchain already knows how to print.

### Why only astro

**VERIFIED.** The compiler treats `virtual:styleframe` as an **external import passthrough** and
emits it verbatim on all seven targets — `core/compiler/src/pipeline/compile.test.ts:409-418`
asserts exactly that ("preserves virtual:styleframe import in all 7 targets"). The difference is
what happens next, in each package's build:

| | build | `virtual:styleframe` at pack time |
| --- | --- | --- |
| react, solid, vue, svelte, angular, qwik | `build.lib` → rollup | in the module graph → resolved and inlined |
| astro | `vp pack` + `pack.copy` | **`.astro` is `neverBundle`d and file-copied → survives verbatim** |

`ui/astro/vite.config.ts:18-19`:

```ts
deps: { neverBundle: [/\.astro$/, /^@inkline\//, /^@storybook-astro\//] },
copy: [{ from: "./.inkline/*.astro", to: "dist/" }],
```

A copied file never enters the module graph. Nothing resolves its imports, and — see §5 — nothing
transforms them either.

### The general question

This is not an astro bug. The compiler's external-import passthrough is target-agnostic; the packaging
step is where the contract is either honoured or silently broken. Any future target that ships source
(`.vue` SFCs unbundled, `.svelte` unbundled, web components as raw files, an RSC target) meets the
identical wall the day it stops going through rollup. **The decision here is: what does an
unbundled-source package owe its consumer, for every build-time specifier its source carries?**

---

## 2. Constraints

Applied to every option below.

1. **Consumer's bundler is not ours.** Rolldown, Vite, Webpack, Turbopack, plain Node ESM. The
   contract may not assume the consumer runs anything of ours.
2. **The failure mode must not be silent.** Today the glob mismatch printed
   `No files matched for copying.` and the build went green (**VERIFIED**, #600). Whatever we choose
   needs a gate that fails the build, not a warning.
3. **Generalises to target N+1.** Judged as the rule, not the patch.
4. **Verified by tarball install, never by inspecting `dist/`.** `pnpm pack`, install the tarball into
   a fresh app, build. The last two defects here were both invisible to `dist/` inspection.
5. **`@inkline/astro`'s consumer-facing shape does not regress.** `.`, `./headless`, `./css`,
   `./stories`.

---

## 3. Options

### Option A — Emit the consumer module into `dist/`, rewrite the import to a relative specifier

The packaging step calls `transpile(instance, { type: "ts" })` — the same call the plugin's `load`
hook makes — writes the result to `dist/styleframe.mjs` (+ `.d.mts`), and rewrites
`from "virtual:styleframe"` in every copied `.astro` file to the relative path
(`../../../styleframe.mjs` from `dist/components/field-group/styled/`).

**Steelman.** The published package becomes *closed*: every specifier in every shipped file resolves
against files inside the tarball, with no consumer configuration, in any bundler and in plain Node
ESM. That is the strongest property on this list and the only one that satisfies constraint 1
outright. It is not speculative work — the artifact is `generateConsumerModule`'s existing output, and
`@styleframe/transpiler` is a public export (`styleframe/transpiler`, **VERIFIED** from the
`styleframe@3.9.1` exports map), so the packaging step calls a supported API rather than
reverse-engineering one. It matches what the other six targets already effectively publish: recipes
frozen at *Inkline's* build, against the theme Inkline compiled with. Astro stops being the exception.
The rewrite is mechanical and gateable — "no shipped file contains a `virtual:` specifier" is a
one-line assertion over the tarball, satisfying constraint 2 with a check that generalises verbatim to
target N+1 (constraint 3).

**Costs, honestly.** Deep relative paths are ugly and depend on the emitted tree's depth, so the
rewrite must be computed per file, not templated. The rewriting step is new machinery in the astro
pack config that every future source-shipping target re-implements unless it is factored out — and
factoring it out prematurely, before a second target exists, is its own mistake. And it hard-freezes
the theme into the tarball: a consumer who wants different tokens gets them via CSS variables in
`./css`, not by re-running recipes. **INFERRED** — that is already true of the six bundled targets, so
Option A makes astro consistent rather than newly restrictive; it is not verified against a stated
theming requirement, because none is written down (see §6).

**Tarball verification.** `pnpm pack` → install into a fresh Astro app → import from `@inkline/astro`
(the `.` entry) → `astro build` completes and renders styled markup. Plus: `tar -tzf` shows
`dist/styleframe.mjs`, and `grep -r "virtual:" package/dist` returns nothing.

---

### Option B — Emit the same module, expose it as a subpath, import it by package specifier

Identical artifact to A. The difference is the specifier the `.astro` files carry:
`from "@inkline/astro/styleframe"` against a new `exports` entry, instead of a relative path.

**Steelman.** The addressing is stable and depth-independent — the rewrite is a constant string, not a
per-file path computation, which removes A's fiddliest moving part and its most likely bug. Node has
resolved a package's self-reference through its own `exports` map since 12.16, and every bundler in
scope implements it, so the file still resolves without consumer configuration. It also makes the
recipes a deliberate, documented, semver-governed surface — a consumer who wants to call `badge(props)`
in their own markup can, and Inkline already tiers export surfaces this way
([ADR-002](../adrs/002-compiler-export-surface-tiers.md)), so this is the house pattern rather than a
new idea.

**Costs, honestly.** Self-reference resolution has a failure mode A does not: it goes through the
consumer's resolver and their `exports`/conditions handling, so a misconfigured or non-conformant
resolver breaks a package that A would leave working. Relative paths cannot be misconfigured. Second,
and more expensive: it makes the recipe module **public API**. Every recipe rename becomes a breaking
change for `@inkline/astro`, and the transpiler's output — including the `minify` behaviour in §5 — is
upstream's to change, so we would be publishing a surface we do not control the shape of. Charging
that price to fix an internal wiring problem is not a good trade unless the surface is wanted for its
own sake.

**Tarball verification.** As A, plus: from the fresh app, `import { badge } from
"@inkline/astro/styleframe"` in consumer code and build — the point of the subpath is that this works,
so it must be asserted, not assumed.

---

### Option C — Make the styleframe plugin a documented peer requirement

`@inkline/astro` declares the requirement; consumers add `styleframe/plugin/astro` to their
`astro.config.mjs`. **VERIFIED** — that integration exists and is published
(`@styleframe/plugin/astro`, an `astro:config:setup` hook that pushes the vite plugin).

**Steelman.** This is the honest reading of what the package *is*: a styleframe-styled library whose
consumers are expected to run styleframe anyway if they want to theme it. It ships the least
machinery — no emit step, no rewrite, no new gate — and it is the only option that lets a consumer
compose their own recipes and utilities with Inkline's in one instance, which is the whole reason
styleframe is a build-time engine rather than a runtime one. Nuxt, Tailwind and Panda all make the
build plugin a consumer requirement and are not thought worse for it. Done properly — with a
`peerDependency` and a resolver hook that throws a named, actionable error rather than
`Could not resolve` — it converts a mystery failure into an instruction, which satisfies constraint 2.

**Costs — and they are decisive here.** The consumer's plugin needs `entry` (the styleframe config)
and `include` (the `*.styleframe.ts` recipe sources) to produce the recipe exports the `.astro` files
import. **VERIFIED: neither ships.** `ui/astro/package.json:4-6` is `"files": ["dist"]`, and both
inputs live in `ui/components/` — a different package, itself unpublished. So Option C as stated does
not work: a consumer who follows the documentation to the letter still gets a consumer module missing
every Inkline recipe. Making it work means publishing the recipe sources and the config, and having
consumers point their plugin into `node_modules` — a materially larger change than A or B, and one
that makes Inkline's *authoring* source a public compatibility surface.

There is a second hazard. The consumer's instance is *their* config plus our recipes, so their class
names are computed by their build, while `./css` was generated by ours. **INFERRED**, from the plugin
source: `minify` defaults on for builds and rewrites class names through a per-instance
`classNameLookup`, so two different instances need not agree. Whether it currently bites depends on
`isBuildCommand = process.argv.includes("build")`, which is **ASSUMED false** under `vp pack` — i.e.
we may be shipping unminified names today by accident rather than by decision. Either way, under
Option C `@inkline/astro/css` stops being trustworthy for astro consumers and they must generate CSS
themselves. That is a much bigger contract change than the one this RFC set out to make.

Finally it fails constraint 3 in the general case: as a rule for all source-shipping targets it says
*"every consumer of any unbundled target must install and configure our styling toolchain"* — the
strictest possible install story, adopted permanently to avoid writing one emit step.

**Tarball verification.** Fresh Astro app + the documented `astro.config.mjs` → `astro build` renders
styled markup **and** the rendered class names match a stylesheet the consumer can actually obtain.
Second assertion: an app *without* the plugin fails with our named error, not with
`Could not resolve "virtual:styleframe"`.

---

## 4. Recommendation

**Option A.** Emit the consumer module into `dist/`, rewrite the copied `.astro` imports to relative
specifiers, and gate on "no shipped file contains a `virtual:` specifier."

The reasoning compresses to one line: **a published package should resolve against itself.** A is the
only option that holds under constraint 1 without asking the consumer for anything, and it makes astro
consistent with the six targets that already inline their recipes rather than making it a
differently-shaped product.

B is a good idea wearing this problem as a disguise. If a public recipes subpath is wanted, it should
be decided on its own merits, priced as public API, and added on top of A — where it is additive and
cheap. Not adopted here to avoid publishing a surface whose shape upstream controls.

C is not viable as stated (its required inputs are not published) and, once made viable, is a strictly
larger change that also invalidates `./css` for astro consumers.

**The general contract this sets, if A is accepted:**

> A target that publishes source rather than bundler output must, for every build-time specifier its
> source carries, publish a real file inside the tarball and rewrite the specifier to reach it. The
> package must resolve against itself with no consumer configuration. A tarball assertion enforces
> this, and it is added in the same PR as the target.

Deliberately **not** generalised now: the emit-and-rewrite step lives in `ui/astro`'s pack config until
a second source-shipping target exists. Two instances is when the abstraction gets designed; one is
when it gets designed wrong.

---

## 5. Two adjacent findings the implementer will hit

Neither is decided here. Both were found while establishing the above and both bear on the work.

- **`@inkline/astro/css` points at a file the build does not produce.** **VERIFIED** from #600's own
  tarball listing on `main`: `package/dist/` contains no `index.css`. `package.json:22` maps
  `"./css": "./dist/index.css"`. Under Option A, the styled entry starts resolving and consumers will
  reach for the stylesheet immediately, so this becomes user-visible the moment the fix lands.
- **Copied `.astro` files bypass `vite.transform` entirely**, so `transformSourceClassNames` — the
  build-time class-name minification the plugin applies to source — never runs on them, while
  `virtual:styleframe.css` is generated with whatever minification the same build chose.
  **INFERRED** from the plugin source and consistent with #600's rendered output
  (`class="button"`, unminified). If minification is ever switched on for `vp pack`, markup and
  stylesheet part company silently. Worth an explicit decision before it is switched on, not after.

---

## 6. Open questions for the Operator

1. **Is consumer re-theming of `@inkline/astro` a requirement?** If yes, A is insufficient on its own
   for reasons that apply equally to the other six targets, and the question is bigger than this RFC.
   If no — the assumption A rests on — say so here and it stops being an assumption.
2. **Is a public recipes subpath (B) wanted for its own sake?** Yes → land A, add B on top, price it
   as public API. No → A only.
3. **Does `./css` get fixed in the same PR as this,** or filed separately? (§5, first item.)

## 7. Review

Comments on internal tracker UXF-237. Timebox: the Operator's decision, then @palette implements on
top of #600 and this RFC is superseded by an ADR recording what shipped.
