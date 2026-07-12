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
import { mountStyledOnAngular } from "../../angular-ssr-helper.ts";

const ICHECKBOX = resolveComponent(import.meta.url, "./ICheckbox.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

describe("ICheckbox (styled)", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(ICHECKBOX);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro two-way notice (INK0045); no hasSlot INK0068", async () => {
    // The styled `$bind:checked` is two-way → INK0045 on Astro. This family has no `hasSlot`
    // gating, so INK0068 must never fire.
    const result = await compileComponent(ICHECKBOX);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
    expect(result.diagnostics.filter((d) => d.code === "INK0068")).toHaveLength(0);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(ICHECKBOX);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(ICHECKBOX);
    assertConformance(result);
  });

  it("composes both headless parts (label wrapper + native control)", async () => {
    const result = await compileComponent(ICHECKBOX);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      const files = out(result, target);
      expectOutputContains(files, "ICheckboxBase");
      expectOutputContains(files, "ICheckboxControlBase");
    }
  });

  it("pulls both Checkbox recipes from virtual:styleframe", async () => {
    const result = await compileComponent(ICHECKBOX);
    for (const target of ["react", "vue", "solid"] as const) {
      expectImports(out(result, target), "virtual:styleframe", [
        "checkboxRecipe",
        "checkboxFieldRecipe",
      ]);
    }
  });

  it("forwards a two-way checked to the control per target", async () => {
    const result = await compileComponent(ICHECKBOX);
    expectOutputContains(out(result, "react"), "onUpdateChecked");
    expectOutputContains(out(result, "vue"), 'v-model:checked="checked"');
    expectOutputContains(out(result, "svelte"), "bind:checked={checked}");
    expectOutputContains(out(result, "angular"), "(checkedChange)=");
  });

  it("forwards indeterminate to the control per target", async () => {
    const result = await compileComponent(ICHECKBOX);
    expectOutputContains(out(result, "react"), "indeterminate={props.indeterminate}");
    expectOutputContains(out(result, "vue"), ':indeterminate="indeterminate"');
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(ICHECKBOX);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});

// Real-DOM verification on the Angular target (SSR via @angular/platform-server): the composed
// checkbox renders the `<label>` wrapper and the native `<input type="checkbox">` with the right
// recipe classes on each element, projects the label text, and reflects native state.
describe("ICheckbox (styled) on Angular SSR", () => {
  const HEADLESS = [
    "../headless/ICheckboxBase.ink.tsx",
    "../headless/ICheckboxControlBase.ink.tsx",
  ];

  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(import.meta.url, "./ICheckbox.ink.tsx", HEADLESS, props);

  it("renders the label wrapper + native checkbox with recipe classes and projected label", async () => {
    const { html } = await mount({
      label: "Accept terms",
      name: "terms",
      size: "md",
      color: "neutral",
    });

    expect(html).toMatch(/<label[^>]*class="checkbox[^"]*"/);
    expect(html).toMatch(/<input[^>]*type="checkbox"/);
    expect(html).toMatch(/<input[^>]*class="checkbox-field[^"]*"/);
    expect(html).toMatch(/<input[^>]*name="terms"/);
    expect(html).toContain("Accept terms");
  });

  it("reflects the checked state onto the native control", async () => {
    const { html } = await mount({ label: "On", checked: true });

    expect(html).toMatch(/<input[^>]*checked/);
  });

  it("reflects the disabled state onto the native control", async () => {
    const { html } = await mount({ label: "Off", disabled: true });

    expect(html).toMatch(/<input[^>]*disabled/);
  });

  // The collapsed host variant inlines the composite onto native elements: the wrapper is the
  // <label ink-checkbox> host and the control is a bare native <input ink-checkbox-control-base> —
  // no display:contents wrapper elements anywhere.
  it("host variant collapses to label[ink-checkbox] > input[ink-checkbox-control-base]", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./ICheckbox.ink.tsx",
      HEADLESS,
      { label: "Accept", size: "md", color: "neutral" },
      "ICheckboxHostComponent",
    );

    expect(html).toMatch(/<label[^>]*ink-checkbox[^>]*class="checkbox/);
    expect(html).toMatch(/<input[^>]*ink-checkbox-control-base[^>]*class="checkbox-field/);
    expect(html).not.toContain("<ink-checkbox");
  });
});
