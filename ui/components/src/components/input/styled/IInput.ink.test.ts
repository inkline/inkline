import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectCorrectFileExtensions,
  expectOutputContains,
  expectImports,
  assertConformance,
  snapshotOutput,
  resolveComponent,
  type ComponentTestResult,
  type TargetName,
} from "@inkline/test-utils";

const IINPUT = resolveComponent(import.meta.url, "./IInput.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

describe("IInput (styled)", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(IINPUT);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected notices (Astro two-way INK0045, Qwik/Angular hasSlot INK0068)", async () => {
    const result = await compileComponent(IINPUT);
    const unexpected = result.diagnostics.filter(
      (d) => d.code !== "INK0045" && d.code !== "INK0068",
    );
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
    // INK0068 fires once per target without runtime slot presence (Qwik + Angular).
    expect(result.diagnostics.filter((d) => d.code === "INK0068")).toHaveLength(2);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(IINPUT);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(IINPUT);
    assertConformance(result);
  });

  it("composes every headless part (group, control, addon wrappers)", async () => {
    const result = await compileComponent(IINPUT);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      const files = out(result, target);
      expectOutputContains(files, "IInputGroupBase");
      expectOutputContains(files, "IInputControlBase");
      expectOutputContains(files, "IInputPrefixBase");
      expectOutputContains(files, "IInputAppendBase");
    }
  });

  it("pulls all Input recipes from virtual:styleframe", async () => {
    const result = await compileComponent(IINPUT);
    for (const target of ["react", "vue", "solid"] as const) {
      expectImports(out(result, target), "virtual:styleframe", [
        "inputRecipe",
        "inputGroupRecipe",
        "inputPrefixRecipe",
        "inputSuffixRecipe",
      ]);
    }
  });

  it("gates each addon by slot presence on targets with a runtime API", async () => {
    const result = await compileComponent(IINPUT);
    // React: render-prop presence check.
    expectOutputContains(out(result, "react"), "props.renderPrefix != null");
    expectOutputContains(out(result, "react"), "props.renderAppend != null");
    // Vue: `$slots` presence check via v-if.
    expectOutputContains(out(result, "vue"), "!!$slots.prefix");
    expectOutputContains(out(result, "vue"), "!!$slots.append");
    // Solid: slot-prop presence check.
    expectOutputContains(out(result, "solid"), "props.prefix != null");
  });

  it("always renders the addon wrappers on Qwik/Angular (no runtime slot presence)", async () => {
    const result = await compileComponent(IINPUT);
    // No `true ?` / `@if (true)` constant condition — the wrapper is emitted unconditionally and
    // collapses via CSS :empty.
    expectOutputContains(out(result, "qwik"), '<Slot name="prefix" />');
    expectOutputContains(out(result, "angular"), 'select="[slot=prefix]"');
  });

  it("forwards a two-way value to the control per target", async () => {
    const result = await compileComponent(IINPUT);
    expectOutputContains(out(result, "react"), "onUpdateValue");
    expectOutputContains(out(result, "vue"), 'v-model:value="value"');
    expectOutputContains(out(result, "svelte"), "bind:value={value}");
    expectOutputContains(out(result, "angular"), "(valueChange)=");
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(IINPUT);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});
