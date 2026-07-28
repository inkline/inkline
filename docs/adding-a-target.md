# Adding a compilation target

How to teach `@inkline/compiler` to emit a new framework's component code.

> **This is an in-repo contribution path, not an extension point.**
> Adding a target means opening a pull request against this repository. You cannot register a new
> target from outside the package — see [Why you cannot add a target from outside](#why-you-cannot-add-a-target-from-outside)
> for the two constraints that block it, and [What you _can_ do from outside](#what-you-can-do-from-outside)
> for the consumer-side customization that does work.

This is a deep-end contributor task. Read [architecture.md](./architecture.md) first — especially "Cross-framework strategy" and "Code IR" — so the vocabulary below is familiar.

## Why you cannot add a target from outside

Two constraints in the compiler close the door, in this order.

**1. `TargetName` is a closed union.** `Target.name` is typed `TargetName`, which enumerates exactly the seven built-ins ([`core/compiler/src/codegen/context.ts`](../core/compiler/src/codegen/context.ts)):

```ts
export type TargetName = "react" | "solid" | "vue" | "svelte" | "angular" | "qwik" | "astro";
```

An out-of-repo `defineTarget({ name: "lit", … })` does not typecheck:

```
scratch.ts(4,3): error TS2322: Type '"lit"' is not assignable to type 'TargetName'.
```

Note that `defineTarget` is an identity function — it gives you the type annotation, it does not validate anything at runtime.

**2. `ALL_TARGETS` is checked before your registry is.** `resolveOptions` rejects any unknown target name _before_ it looks at a custom `registry` ([`core/compiler/src/core/options.ts`](../core/compiler/src/core/options.ts)). Supplying your own registry does not open the door:

```ts
const registry = createRegistry();
registry.register(myLitTarget);
resolveOptions({ targets: ["lit"], registry }); // throws
```

```
code: INK0085
title: Unknown target "lit"
help: Available targets: react, solid, vue, svelte, angular, qwik, astro.
```

Both constraints live in the compiler, so both have to change in a PR here. Whether they _should_ change is a design question, not a documentation one — it is not settled by this page.

## What you _can_ do from outside

A custom registry lets you **replace the implementation of a built-in target**. The name still has to be one of the seven, but the `rewrites` and `emit` behind it are yours:

```ts
import { compile, createRegistry, defineTarget, reactTarget } from "@inkline/compiler";

const registry = createRegistry();
registry.register(
  defineTarget({
    ...reactTarget,
    rewrites: { ...reactTarget.rewrites, eventNameCase: "kebab" },
  }),
);

const result = await compile(input, { targets: ["react"], registry });
```

This passes both checks: `"react"` is in `ALL_TARGETS`, and the registry has it. Note that a registry you build with `createRegistry()` starts empty — every target you list in `targets` must be registered in it, or `compile` throws `INK0086`.

Use this when the difference you need is a `RewriteRules` change (attribute casing, ref-access pattern, event-name case) over an existing target's output. Everything below is for the case where you need a genuinely new `emit` — a new syntax flavor or a materially different render model — and are contributing it to this repo.

## The `Target` contract

A target is a small object ([`core/compiler/src/codegen/context.ts`](../core/compiler/src/codegen/context.ts)):

```ts
interface Target {
  readonly name: TargetName;
  readonly rewrites: RewriteRules;
  readonly conformance?: TargetConformanceSpec;
  readonly defaultOptions?: Readonly<Record<string, unknown>>;
  emit(component: IRComponent, ctx: CodegenContext): CodeModule;
}
```

Four pieces:

1. **`rewrites`** — how to map IR-level expressions/attributes/events into your target's idioms.
2. **`emit`** — the function that walks an `IRComponent` and builds a `CodeModule` (a tree of `Code` nodes).
3. **`conformance`** (optional) — typecheck + lint config that asserts the emitted code compiles cleanly under the target's own toolchain.
4. **`defaultOptions`** (optional) — declares the keys this target accepts in the user's `targetOptions`. It is the allowlist `compile` validates against; an unrecognised key warns as INK0080. Declaring it does not merge the values into anything — read them yourself from `ctx.options.targetOptions`.

## Step 1 — Scaffold the target package

```
core/compiler/src/codegen/targets/<name>/
├── index.ts         # exports `<name>: Target`
├── conformance.ts   # optional — typecheck/lint config
└── *.test.ts        # snapshot + behavior tests
```

Use [`core/compiler/src/codegen/targets/react/`](../core/compiler/src/codegen/targets/react/) as a template for JSX-flavored targets or [`svelte/`](../core/compiler/src/codegen/targets/svelte/) for template-flavored targets. Pick whichever is closer to your target.

The target file ends with:

```ts
export const <name>: Target = {
  name: "<name>",
  rewrites: REWRITES,
  conformance: <name>Conformance,
  emit,
};
export default <name>;
```

## Step 2 — Define `RewriteRules`

`RewriteRules` ([`core/compiler/src/codegen/context.ts`](../core/compiler/src/codegen/context.ts)) is small but load-bearing. Five fields are required:

| Rule            | Options                                                                                                                                      | What it controls                                                                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `reactiveRead`  | `{ kind: "strip-call" }` \| `{ kind: "preserve-call" }` \| `{ kind: "field-access", field }`                                                 | How `signal()` reads become target syntax. React/Svelte/Astro strip the call (`count`); Solid/Angular preserve it (`count()`); Vue/Qwik field-access (`count.value`).          |
| `setterStyle`   | `{ kind: "function-call" }` \| `{ kind: "field-assignment", field }` \| `{ kind: "direct-assignment" }` \| `{ kind: "method-call", method }` | How `setSignal(x)` becomes a write. React/Solid call (`setX(x)`); Vue/Qwik assign a field (`x.value = …`); Svelte/Astro assign directly (`x = …`); Angular calls (`x.set(…)`). |
| `refAccess`     | `{ kind: "field", field }` \| `{ kind: "bare", unwrap? }`                                                                                    | How `ref.current` is mapped — React `current`, Vue/Qwik `value`, Solid/Svelte/Astro bare, Angular bare with `unwrap: "nativeElement"`.                                         |
| `jsxAttrCasing` | `"react"` \| `"html"`                                                                                                                        | Attribute name casing in emitted output. Only React uses `"react"`.                                                                                                            |
| `eventNameCase` | `"camel"` \| `"kebab"` \| `"lower"`                                                                                                          | Event handler attribute case (`onClick` / `@click` / `onclick`).                                                                                                               |

The rest are optional and target-specific — `members` (per-IR-member props/slots rewrites), `hasSlotCheck`, `stringQuote`, `emit`, plus a set of Angular-only fields. `context.ts` documents each one inline and is the source of truth; read it rather than trusting a list here. [`react/index.ts`](../core/compiler/src/codegen/targets/react/index.ts) `REWRITES` is the canonical minimal example, [`angular/index.ts`](../core/compiler/src/codegen/targets/angular/index.ts) the maximal one.

## Step 3 — Write `emit`

The `emit` function receives:

- `component: IRComponent` — the fully-analyzed component to emit.
- `ctx: CodegenContext` — registers + lookups (`componentImports`, `externalImports`, etc.) + `ctx.diagnostics`, the diagnostic sink.

It must return a `CodeModule` — a `Code` tree built with the builders in [`codegen/code-ir/builders.ts`](../core/compiler/src/codegen/code-ir/builders.ts).

Strategy per target syntax flavor:

- **JSX-emitting (React, Solid, Qwik)** — use `cJsxElement`, `cJsxAttr`, `cJsxText`. Wrap the render tree in a top-level function or component declaration via `cStmt`.
- **Template-emitting (Vue, Svelte)** — use `cTmplElement`, `cTmplDirective`, `cTmplAttr`, `cTmplMustache`. Vue's `<script setup>` body is built with `cScript` blocks.
- **String-template (Angular, Astro)** — use `cRaw` for the template and `cStmt` for the class or frontmatter. Less expressive but simpler.

Walk the IR with `walkRenderTree` (exported from `@inkline/compiler`) or recurse on `IRNode` directly. Apply the rewrite rules to every expression via the helpers in [`codegen/shared/expr-rewrite.ts`](../core/compiler/src/codegen/shared/expr-rewrite.ts) — `rewriteExpr`, `rewriteAttrName`, `rewriteEventName`, and friends.

> **Repo-internal, not package imports.** Everything under [`codegen/shared/`](../core/compiler/src/codegen/shared/) and [`src/testing/codegen.ts`](../core/compiler/src/testing/codegen.ts) is referenced above by repository path because that is the only way to reach it. None of it is exported from `@inkline/compiler` — see [`src/index.ts`](../core/compiler/src/index.ts) for what is. Inside the repo, import them by relative path (`../../shared/expr-rewrite.ts`) the way the built-in targets do. The `Code` builders (`cFile`, `cJsxElement`, …), `walkRenderTree`, and the `Target`/`RewriteRules` types _are_ public exports.

When the IR has a case your target cannot express, push a diagnostic via `ctx.diagnostics.push(code, loc, params)` rather than throwing. The compiler reports compile-time failures gracefully; it crashes on uncaught throws.

## Step 4 — Conformance (optional but recommended)

A `TargetConformanceSpec` tells [`@inkline/test-utils`](../tooling/test-utils/) `assertConformance` how to verify emitted code against the target's own toolchain (typecheck + lint). Use it when:

- The target has its own typechecker that can validate output (`tsc`, `svelte-check`, `ng`, `vue-tsc`).
- You want CI to catch output regressions in a way snapshot tests can't.

Skip it when conformance would only re-test what snapshots already cover.

## Step 5 — Register

Add the name to the `TargetName` union and to `ALL_TARGETS` in [`codegen/context.ts`](../core/compiler/src/codegen/context.ts). This is the step that makes the target expressible at all — until it lands, nothing below typechecks or resolves.

Then register the target in [`core/compiler/src/codegen/registry.ts`](../core/compiler/src/codegen/registry.ts):

```ts
import { mytarget } from "./targets/mytarget/index.ts";
// …
_builtin.register(mytarget);
```

Re-export it from [`core/compiler/src/index.ts`](../core/compiler/src/index.ts) at the bottom (`export { mytarget as mytargetTarget }`), alongside the other built-in targets, so consumers can compose against it without reaching into internals.

## Step 6 — Tests

Three layers required:

1. **Per-target tests** under `codegen/targets/<name>/` — add unit-emit snapshots in [`<name>/index.test.ts`](../core/compiler/src/codegen/targets/) (hand-build a few `IRComponent` inputs with the shared helpers in [`src/testing/codegen.ts`](../core/compiler/src/testing/codegen.ts) and snapshot the output), plus real-fixture integration tests under `<name>/__tests__/`. Each test targets a single framework — no iteration over a target list.
2. **Conformance tests** if you wrote a conformance spec — see [`@inkline/test-utils`](../tooling/test-utils/) → `assertConformance`.
3. **Scenario tests** under [`core/compiler/src/__fixtures__/`](../core/compiler/src/__fixtures__/) — pick a handful of representative fixtures (counter, list, slot, transition) and add the new target to the per-fixture target list so cross-target HTML equivalence is asserted.

## Step 7 — Downstream wiring

Once the new target is built-in, add the consumer-facing UI package:

1. Create `ui/<new-target>/` matching the shape of [`ui/react/`](../ui/react/) (with the framework-specific tweaks documented in that package's [`AGENTS.md`](../ui/react/AGENTS.md)).
2. Update [`ui/components/inkline.config.ts`](../ui/components/inkline.config.ts) `targetOutDir` so the cross-framework compile writes into `ui/<new-target>/.inkline/`.
3. Update the root [`package.json`](../package.json) `storybook:frameworks` script and the `wait-on` list in `storybook:app` with the new port.
4. Add the new subpath to [`core/inkline/package.json`](../core/inkline/package.json) `exports` (`./<new-target>`) and to its [`AGENTS.md`](../core/inkline/AGENTS.md).
5. Touch [docs/contributing.md](./contributing.md) → "Dev loops" and [scope.md](./scope.md) → "Compilation targets".

## Checklist before opening the PR

- [ ] Target lives under `core/compiler/src/codegen/targets/<name>/` with `index.ts` exporting a `Target`.
- [ ] `RewriteRules` reviewed against [`context.ts`](../core/compiler/src/codegen/context.ts).
- [ ] `TargetName` union **and** `ALL_TARGETS` updated.
- [ ] Registered in `builtinRegistry`.
- [ ] Re-exported from `core/compiler/src/index.ts`.
- [ ] Per-target tests under `codegen/targets/<name>/` (`index.test.ts` + `__tests__/`).
- [ ] Scenario coverage in `__fixtures__/scenarios.ts`.
- [ ] (Optional) Conformance spec + `assertConformance` test.
- [ ] (If publishing) `ui/<new-target>/` package created and wired.
- [ ] `core/inkline` barrel subpath added.
- [ ] Docs updated: [scope.md](./scope.md), [architecture.md](./architecture.md), [contributing.md](./contributing.md), [`core/compiler/README.md`](../core/compiler/README.md).
- [ ] Changeset added for `@inkline/compiler` (and `@inkline/<new-target>` if shipping a UI package).

## See also

- [architecture.md](./architecture.md) — pipeline, IR, codegen overview.
- [`core/compiler/AGENTS.md`](../core/compiler/AGENTS.md) → "How to… Add a new target" — quick reference.
- The seven existing target directories under [`core/compiler/src/codegen/targets/`](../core/compiler/src/codegen/targets/) — concrete examples in JSX, template, and string-template flavors.
