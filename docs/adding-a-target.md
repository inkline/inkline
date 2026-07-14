# Adding a compilation target

How to teach `@inkline/compiler` to emit a new framework's component code.

This is a deep-end contributor task. Read [architecture.md](./architecture.md) first — especially "Cross-framework strategy" and "Code IR" — so the vocabulary below is familiar.

## When you need a new target vs. just tweaking an existing one

You need a new target when the output language or runtime model is meaningfully different from any existing built-in. If you can express the difference as a `RewriteRules` change to an existing target (different attribute casing, different ref-access pattern, different event-name case), that's not a new target — it's a `Target` that wraps the same `emit` with different rewrites, registered alongside the built-in.

Add a new target only when you genuinely need a new `emit` function (new syntax flavor, materially different render model).

## The `Target` contract

A target is a small object ([`core/compiler/src/codegen/context.ts`](../core/compiler/src/codegen/context.ts)):

```ts
interface Target {
  readonly name: TargetName;
  readonly rewrites: RewriteRules;
  readonly conformance?: TargetConformanceSpec;
  emit(component: IRComponent, ctx: CodegenContext): CodeModule;
}
```

Three pieces:

1. **`rewrites`** — how to map IR-level expressions/attributes/events into your target's idioms.
2. **`emit`** — the function that walks an `IRComponent` and builds a `CodeModule` (a tree of `Code` nodes).
3. **`conformance`** (optional) — typecheck + lint config that asserts the emitted code compiles cleanly under the target's own toolchain.

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

`RewriteRules` ([`core/compiler/src/codegen/context.ts`](../core/compiler/src/codegen/context.ts)) is small but load-bearing. Decisions to make per target:

| Rule            | Options                                                                                               | What it controls                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reactiveRead`  | `{ kind: "strip-call" }` \| `{ kind: "field-access", field: "value" }` \| `{ kind: "as-is" }`         | How `signal()` reads become target syntax. React strips the call (`count`); Vue field-accesses (`count.value`); Solid keeps the call (`count()`); Svelte strips (`count`). |
| `setterStyle`   | `{ kind: "function-call" }` \| `{ kind: "field-assignment", field: "value" }` \| `{ kind: "direct" }` | How `setSignal(x)` becomes a write. React/Solid call (`setX(x)`); Vue assigns (`x.value = …`); Svelte assigns directly (`x = …`).                                          |
| `refAccess`     | `{ kind: "field", field: "current" }` \| `{ kind: "field", field: "value" }` \| `{ kind: "as-is" }`   | How `ref.current` is mapped (React `current`, Vue `value`, etc.).                                                                                                          |
| `jsxAttrCasing` | `"react" \| "preserve" \| "kebab"`                                                                    | Attribute name casing in emitted output.                                                                                                                                   |
| `eventNameCase` | `"camel" \| "kebab"`                                                                                  | Event handler attribute case (`onClick` vs `@click`).                                                                                                                      |
| `members`       | `Record<string, { strip?, rename? }>`                                                                 | Per-IR-member rewrites (e.g. React strips `slots` from member access and renames `default` → `children`).                                                                  |

Read [`react/index.ts`](../core/compiler/src/codegen/targets/react/) lines 22–32 for the canonical example.

## Step 3 — Write `emit`

The `emit` function receives:

- `component: IRComponent` — the fully-analyzed component to emit.
- `ctx: CodegenContext` — registers + lookups (`componentImports`, `externalImports`, etc.) + the diagnostic sink.

It must return a `CodeModule` — a `Code` tree built with the builders in [`codegen/code-ir/builders.ts`](../core/compiler/src/codegen/code-ir/builders.ts).

Strategy per target syntax flavor:

- **JSX-emitting (React, Solid, Qwik)** — use `cJsxElement`, `cJsxAttr`, `cJsxText`. Wrap the render tree in a top-level function or component declaration via `cStmt`.
- **Template-emitting (Vue, Svelte)** — use `cTmplElement`, `cTmplDirective`, `cTmplAttr`, `cTmplMustache`. Vue's `<script setup>` body is built with `cScript` blocks.
- **String-template (Angular, Astro)** — use `cRaw` for the template, `cScript` for the class. Less expressive but simpler.

Walk the IR with `walkRenderTree` from [`@inkline/compiler`](../core/compiler/) or recurse on `IRNode` directly. Apply the rewrite rules to every expression via the helpers in [`codegen/shared/expr-rewrite.ts`](../core/compiler/src/codegen/shared/expr-rewrite.ts).

When the IR has a case your target cannot express, push a diagnostic via `ctx.pushDiagnostic` rather than throwing. The compiler reports compile-time failures gracefully; it crashes on uncaught throws.

## Step 4 — Conformance (optional but recommended)

A `TargetConformanceSpec` tells [`@inkline/test-utils`](../tooling/test-utils/) `assertConformance` how to verify emitted code against the target's own toolchain (typecheck + lint). Use it when:

- The target has its own typechecker that can validate output (`tsc`, `svelte-check`, `ng`, `vue-tsc`).
- You want CI to catch output regressions in a way snapshot tests can't.

Skip it when conformance would only re-test what snapshots already cover.

## Step 5 — Register

Add the new target to [`core/compiler/src/codegen/registry.ts`](../core/compiler/src/codegen/registry.ts):

```ts
import { mytarget } from "./targets/mytarget/index.ts";
// …
_builtin.register(mytarget);
```

Add it to the `TargetName` union in [`codegen/context.ts`](../core/compiler/src/codegen/context.ts) so types stay tight.

Re-export it from [`core/compiler/src/index.ts`](../core/compiler/src/index.ts) at the bottom (`export { mytarget as mytargetTarget }`) so external consumers can reference it without reaching into internals.

## Step 6 — Tests

Three layers required:

1. **Per-target tests** under `codegen/targets/<name>/` — add unit-emit snapshots in [`<name>/index.test.ts`](../core/compiler/src/codegen/targets/) (hand-build a few `IRComponent` inputs with the shared helpers in [`testing/codegen.ts`](../core/compiler/src/testing/codegen.ts) and snapshot the output), plus real-fixture integration tests under `<name>/__tests__/`. Each test targets a single framework — no iteration over a target list.
2. **Conformance tests** if you wrote a conformance spec — see [`@inkline/test-utils`](../tooling/test-utils/) → `assertConformance`.
3. **Scenario tests** under [`core/compiler/src/__fixtures__/`](../core/compiler/src/__fixtures__/) — pick a handful of representative fixtures (counter, list, slot, transition) and add the new target to the per-fixture target list so cross-target HTML equivalence is asserted.

## Step 7 — Downstream wiring

When the new target is built-in, add the consumer-facing UI package:

1. Create `ui/<new-target>/` matching the shape of [`ui/react/`](../ui/react/) (with the framework-specific tweaks documented in that package's [`AGENTS.md`](../ui/react/AGENTS.md)).
2. Update [`ui/components/inkline.config.ts`](../ui/components/inkline.config.ts) `targetOutDir` so the cross-framework compile writes into `ui/<new-target>/.inkline/`.
3. Update the root [`package.json`](../package.json) `storybook:frameworks` script and the `wait-on` list in `storybook:app` with the new port.
4. Add the new subpath to [`core/inkline/package.json`](../core/inkline/package.json) `exports` (`./<new-target>`) and to its [`AGENTS.md`](../core/inkline/AGENTS.md).
5. Touch [docs/contributing.md](./contributing.md) → "Dev loops" and [scope.md](./scope.md) → "Compilation targets".

## Checklist before opening the PR

- [ ] Target lives under `core/compiler/src/codegen/targets/<name>/` with `index.ts` exporting a `Target`.
- [ ] `RewriteRules` reviewed against [`context.ts`](../core/compiler/src/codegen/context.ts).
- [ ] `TargetName` updated.
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
