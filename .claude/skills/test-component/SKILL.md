---
name: test-component
description: Phase 4 of building an Inkline component — write colocated cross-target tests. Assert compilation to all 7 targets, expected diagnostics, conformance, output composition/imports/bindings, snapshots, and real-DOM behavior via Angular SSR. Targets ~100% line+branch coverage. Use when adding or strengthening a component's tests.
triggers:
  - test a component
  - add tests for the component
  - write component tests
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# Component tests — compile, conform, snapshot, render

Tests are colocated as `<file>.ink.test.ts` (Vitest), next to the source they cover: the headless test in `headless/`, the styled test in `styled/`. They run the real compiler in-memory via `@inkline/test-utils` and assert across all 7 targets, plus real-DOM behavior on Angular SSR. Aim for **~100% line+branch** on the component's own code.

## Read first

1. The **actual** `@inkline/test-utils` exports — `tooling/test-utils/src/index.ts` (the prose `runScenarioAcrossTargets` is gone). Available: `compileComponent`, `expectCompilationSuccess`, `expectNoDiagnostics`, `expectDiagnostics`, `expectCorrectFileExtensions`, `expectOutputContains`, `expectOutputNotContains`, `expectImports`, `assertConformance`, `snapshotOutput`, `resolveComponent`, plus types `ComponentTestResult`, `TargetName`.
2. The exemplar tests: `button/headless/IButtonBase.ink.test.ts` (simple) and `input/styled/IInput.ink.test.ts` (comprehensive + Angular SSR).
3. `ui/components/src/components/angular-ssr-helper.ts` — `mountStyledOnAngular(importMetaUrl, styledRel, headlessRels, props?)`.
4. `.../reference/primitives.md` — the per-target lowering table and expected notices.

## Headless test — the baseline every component clears

```ts
import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectCorrectFileExtensions,
  expectNoDiagnostics,
  assertConformance,
  snapshotOutput,
  resolveComponent,
} from "@inkline/test-utils";

const BADGE = resolveComponent(import.meta.url, "./IBadgeBase.ink.tsx");

describe("Badge", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(BADGE);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });
  it("produces zero diagnostics", async () => {
    expectNoDiagnostics(await compileComponent(BADGE));
  });
  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(BADGE));
  });
  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(BADGE));
  });
  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(BADGE))).toMatchSnapshot();
  });
});
```

If the component uses two-way binding or `hasSlot` gating, replace `expectNoDiagnostics` with an **explicit expected-notice** assertion:

```ts
it("emits only the expected notices (Astro two-way INK0045, Qwik/Angular hasSlot INK0068)", async () => {
  const result = await compileComponent(COMPONENT);
  const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045" && d.code !== "INK0068");
  expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
  expect(result.diagnostics.filter((d) => d.code === "INK0068")).toHaveLength(2); // Qwik + Angular
});
```

## Styled test — add composition, imports, bindings, real DOM

On top of the baseline, assert what the styled layer is responsible for. Use a small helper `const out = (r, t) => r.files[t] ?? [];`.

- **Composition** — every headless part appears in the output: `expectOutputContains(out(result, target), "IInputControlBase")` across targets.
- **Recipe imports** — `expectImports(out(result, "react"), "virtual:styleframe", ["inputRecipe", "inputPrefixRecipe", "inputSuffixRecipe"])`.
- **Slot gating per target** — `props.prefix != null` (React/Solid), `!!$slots.prefix` (Vue), `{props.prefix}` (Qwik), `select="[slot=prefix]"` (Angular).
- **Two-way binding per target** — `onUpdateValue` (React), `v-model:value="value"` (Vue), `bind:value={value}` (Svelte), `(valueChange)=` (Angular).
- **Snapshot** — `expect(snapshotOutput(result)).toMatchSnapshot()`.

### Real-DOM behavior — Angular SSR

The strongest assertion: render the composed component and check actual HTML. List the headless parts, then assert classes, native attribute reflection, ARIA, content projection (via `__slots`), and state. Remember Angular **sorts recipe class keys alphabetically**.

```ts
import { mountStyledOnAngular } from "../../angular-ssr-helper.ts";

describe("IInput (styled) on Angular SSR", () => {
  const HEADLESS = [
    "../headless/IInputBase.ink.tsx",
    "../headless/IInputPrefixBase.ink.tsx",
    "../headless/IInputSuffixBase.ink.tsx",
    "../headless/IInputControlBase.ink.tsx",
  ];
  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(import.meta.url, "./IInput.ink.tsx", HEADLESS, props);

  it("renders the shell with recipe classes + the native control", async () => {
    const { html } = await mount({
      placeholder: "Amount",
      name: "amount",
      size: "md",
      color: "light",
    });
    expect(html).toMatch(/<div[^>]*class="input input--color-light input--size-md"/);
    expect(html).toMatch(/<input[^>]*class="input-field"/);
  });

  it("projects slot content", async () => {
    const { html } = await mount({ __slots: { prefix: "$", suffix: "USD" } });
    expect(html).toMatch(/<span[^>]*class="input-prefix[^"]*">\$<\/span>/);
  });

  it("reflects disabled onto the native control", async () => {
    expect((await mount({ disabled: true })).html).toMatch(/<input[^>]*disabled/);
  });
});
```

## Coverage — exercise every branch

Drive ~100% line+branch on the component's executable code: every variant axis, every boolean state, every `<Show>`/`<For>`/slot branch, the `?? ""` fallbacks, and the `<textarea>`-style alternate branches. Add cases until coverage is full.

## Verify

`cd ui/components && vp test` green, then `vp test --coverage` and confirm ~100% line+branch on the new files. Report the coverage numbers. On the first run, review the new snapshot before committing it.

## Exit criteria

Headless + styled tests pass; expected notices asserted explicitly; composition/imports/bindings/real-DOM covered; coverage ~100% line+branch with the report shown.
