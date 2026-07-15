import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectCorrectFileExtensions,
  expectOutputContains,
  assertConformance,
  snapshotOutput,
  resolveComponent,
  type ComponentTestResult,
  type TargetName,
} from "@inkline/test-utils";

const SWITCH_CONTROL = resolveComponent(import.meta.url, "./ISwitchControlBase.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

describe("SwitchControlBase", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(SWITCH_CONTROL);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro two-way notice (INK0045)", async () => {
    // The `checked` model is two-way; on the static Astro target it lowers to a read-only value and
    // emits an info notice (INK0045). No slots, so no INK0068. Every other target is clean.
    const result = await compileComponent(SWITCH_CONTROL);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
    expect(result.diagnostics.filter((d) => d.code === "INK0068")).toHaveLength(0);
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(SWITCH_CONTROL));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(SWITCH_CONTROL));
  });

  it("renders a native checkbox with the switch ARIA contract across targets", async () => {
    const result = await compileComponent(SWITCH_CONTROL);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      const files = out(result, target);
      expectOutputContains(files, "switch-field");
      expectOutputContains(files, "checkbox");
      expectOutputContains(files, "aria-checked");
    }
  });

  it("keeps the Enter-toggle handler intact on every interactive target", async () => {
    // Regression: authored as an `if` block, the Enter handler lowered to an empty `(keydown)=""` on
    // Angular, whose event bindings carry only expression statements — the `if` was dropped. Authored
    // as guarded `&&` expression statements that synthesise the native click, it survives on all six
    // interactive targets: both actions are method calls, so there is no assignment left-hand side for
    // the `&&` to bind too tightly (which would break Vue/Svelte, where a model set lowers to `= …`).
    const result = await compileComponent(SWITCH_CONTROL);

    // Angular: a non-empty keydown binding that fires the native click on Enter.
    expectOutputContains(out(result, "angular"), "(keydown)=");
    expectOutputContains(out(result, "angular"), "$event.currentTarget.click()");
    expect(out(result, "angular").some((f) => f.contents.includes('(keydown)=""'))).toBe(false);

    // Vue / Svelte / React / Solid / Qwik: guarded method-call statements, never an assignment LHS.
    for (const target of ["vue", "svelte", "react", "solid", "qwik"] as const) {
      expectOutputContains(out(result, target), "e.currentTarget.click()");
    }
  });

  it("forwards the toggle to the two-way model on change per target", async () => {
    const result = await compileComponent(SWITCH_CONTROL);
    expectOutputContains(out(result, "angular"), "(change)=");
    expectOutputContains(out(result, "vue"), "checked = e.currentTarget.checked");
    expectOutputContains(out(result, "svelte"), "checked = e.currentTarget.checked");
  });

  it('coalesces the bound checked value so an unset model renders unchecked, not "undefined"', async () => {
    const result = await compileComponent(SWITCH_CONTROL);
    expectOutputContains(out(result, "solid"), "checked={props.checked ?? false}");
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(SWITCH_CONTROL))).toMatchSnapshot();
  });
});
