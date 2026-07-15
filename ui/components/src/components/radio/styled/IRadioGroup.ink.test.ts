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

const IRADIOGROUP = resolveComponent(import.meta.url, "./IRadioGroup.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

describe("IRadioGroup (styled)", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(IRADIOGROUP);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro two-way notice (INK0045)", async () => {
    // The `value` model is two-way; on the static Astro target it lowers to one-way and the compiler
    // emits a single info-level notice (INK0045). No hasSlot here, so no INK0068.
    const result = await compileComponent(IRADIOGROUP);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
    expect(result.diagnostics.filter((d) => d.code === "INK0045")).toHaveLength(1);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(IRADIOGROUP);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(IRADIOGROUP);
    assertConformance(result);
  });

  it("composes every radio-family headless part", async () => {
    const result = await compileComponent(IRADIOGROUP);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      const files = out(result, target);
      expectOutputContains(files, "IRadioGroupBase");
      expectOutputContains(files, "IRadioBase");
      expectOutputContains(files, "IRadioFieldBase");
    }
  });

  it("pulls all three radio recipes from virtual:styleframe", async () => {
    const result = await compileComponent(IRADIOGROUP);
    for (const target of ["react", "vue", "solid"] as const) {
      expectImports(out(result, target), "virtual:styleframe", [
        "radioGroupRecipe",
        "radioRecipe",
        "radioFieldRecipe",
      ]);
    }
  });

  it("renders one radio per option, keyed by value, on every target", async () => {
    const result = await compileComponent(IRADIOGROUP);
    expectOutputContains(out(result, "react"), "items.map((option) =>");
    expectOutputContains(out(result, "react"), "key={option.value}");
    expectOutputContains(out(result, "vue"), 'v-for="option in items"');
    expectOutputContains(out(result, "vue"), ':key="option.value"');
    expectOutputContains(out(result, "svelte"), "{#each items as option (option.value)}");
    expectOutputContains(out(result, "solid"), "<For each={items()}>");
    expectOutputContains(out(result, "angular"), "@for (option of items(); track option.value)");
    expectOutputContains(out(result, "qwik"), "items.value.map((option) =>");
  });

  it("derives each radio's checked state from the shared value", async () => {
    const result = await compileComponent(IRADIOGROUP);
    expectOutputContains(out(result, "react"), "checked={props.value === option.value}");
    expectOutputContains(out(result, "vue"), ':checked="value === option.value"');
    expectOutputContains(out(result, "angular"), '[checked]="value() === option.value"');
  });

  it("wires the two-way value update on selection per target", async () => {
    const result = await compileComponent(IRADIOGROUP);
    expectOutputContains(out(result, "react"), "props.onUpdateValue?.(option.value)");
    expectOutputContains(out(result, "vue"), "value = option.value");
    expectOutputContains(out(result, "svelte"), "value = option.value");
    expectOutputContains(out(result, "angular"), "value.set(option.value)");
    expectOutputContains(out(result, "qwik"), "props.onUpdateValue$?.(option.value)");
  });

  it("shares a native name across the group for mutual exclusivity", async () => {
    const result = await compileComponent(IRADIOGROUP);
    expectOutputContains(out(result, "react"), "name={props.name}");
    expectOutputContains(out(result, "angular"), '[name]="name()"');
  });

  it("forwards readonly to the group container and every field", async () => {
    const result = await compileComponent(IRADIOGROUP);
    // The group gets aria-readonly via IRadioGroupBase; each field gets the interaction guard.
    expectOutputContains(out(result, "vue"), ':readonly="readonly"');
    expectOutputContains(out(result, "angular"), '[readonly]="readonly()"');
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(IRADIOGROUP);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});

// Real-DOM verification on the Angular target (SSR via @angular/platform-server): the recipe classes
// land on the right elements, the group exposes role=radiogroup, each option renders a native radio,
// the selected value reflects `checked`, and the disabled state propagates to every control.
describe("IRadioGroup (styled) on Angular SSR", () => {
  const HEADLESS = [
    "../headless/IRadioGroupBase.ink.tsx",
    "../headless/IRadioBase.ink.tsx",
    "../headless/IRadioFieldBase.ink.tsx",
  ];

  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(import.meta.url, "./IRadioGroup.ink.tsx", HEADLESS, props);

  const OPTIONS = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
  ];

  it("renders the composed group: recipe classes on the radiogroup container", async () => {
    const { html } = await mount({
      options: OPTIONS,
      value: "apple",
      name: "fruit",
      orientation: "vertical",
      size: "md",
      color: "light",
    });

    // Codegen emits recipe props in alphabetical key order (orientation before size).
    expect(html).toMatch(
      /<div[^>]*class="radio-group radio-group--orientation-vertical radio-group--size-md"/,
    );
    expect(html).toMatch(/<div[^>]*role="radiogroup"/);
  });

  it("renders one native radio per option with the field recipe classes", async () => {
    const { html } = await mount({
      options: OPTIONS,
      value: "apple",
      name: "fruit",
      size: "md",
      color: "light",
    });

    const inputs = html.match(/<input[^>]*type="radio"/g) ?? [];
    expect(inputs).toHaveLength(2);
    expect(html).toMatch(
      /<input[^>]*class="radio-field radio-field--color-light radio-field--size-md"/,
    );
    expect(html).toMatch(/<label[^>]*class="radio radio--size-md"/);
    expect(html).toContain("Apple");
    expect(html).toContain("Banana");
  });

  it("shares the native name and reflects the selected option as checked", async () => {
    const { html } = await mount({ options: OPTIONS, value: "banana", name: "fruit" });

    expect(html).toMatch(/<input[^>]*value="apple"[^>]*name="fruit"/);
    expect(html).toMatch(/<input[^>]*value="banana"[^>]*name="fruit"/);
    // Exactly one control is checked — the one whose value matches the group value.
    expect(html.match(/<input[^>]*checked/g) ?? []).toHaveLength(1);
  });

  it("propagates the group disabled state to every control", async () => {
    const { html } = await mount({ options: OPTIONS, disabled: true });

    expect(html.match(/<input[^>]*disabled/g) ?? []).toHaveLength(2);
  });

  it("exposes aria-readonly on the radiogroup when read-only", async () => {
    const { html } = await mount({ options: OPTIONS, value: "apple", readonly: true });

    // Read-only keeps the controls focusable (no `disabled`) but marks the set aria-readonly.
    expect(html).toMatch(/<div[^>]*role="radiogroup"/);
    expect(html).toContain('aria-readonly="true"');
    expect(html.match(/<input[^>]*disabled/g) ?? []).toHaveLength(0);
  });

  // The collapsed host variant inlines the composite onto native elements: the group is the <div>
  // host, each row a <label ink-radio-base>, each control a bare <input ink-radio-field-base> — zero
  // display:contents wrapper elements anywhere.
  it("host variant renders a fully zero-wrapper group (div > label > input)", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./IRadioGroup.ink.tsx",
      HEADLESS,
      {
        options: OPTIONS,
        value: "apple",
        name: "fruit",
        orientation: "vertical",
        size: "md",
        color: "light",
      },
      "IRadioGroupHostComponent",
    );

    expect(html).toMatch(
      /<div[^>]*ink-radio-group[^>]*class="radio-group radio-group--orientation-vertical radio-group--size-md"/,
    );
    expect(html).toMatch(/<div[^>]*role="radiogroup"/);
    expect(html).toMatch(/<label ink-radio-base[^>]*class="radio radio--size-md"/);
    expect(html).toMatch(/<input type="radio" ink-radio-field-base/);
    expect(html).not.toContain("<ink-radio"); // no display:contents wrapper elements anywhere
  });
});
