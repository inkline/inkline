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

const ISELECT = resolveComponent(import.meta.url, "./ISelect.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

describe("ISelect (styled)", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(ISELECT);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro two-way notice (INK0045)", async () => {
    // The `value` model is two-way; on the static Astro target it lowers to one-way and the compiler
    // emits a single info-level notice (INK0045). No hasSlot is used, so no INK0068.
    const result = await compileComponent(ISELECT);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
    expect(result.diagnostics.filter((d) => d.code === "INK0045")).toHaveLength(1);
  });

  it("produces correct file extensions per target", async () => {
    const result = await compileComponent(ISELECT);
    expectCorrectFileExtensions(result);
  });

  it("passes conformance invariants for all targets", async () => {
    const result = await compileComponent(ISELECT);
    assertConformance(result);
  });

  it("composes every select-family headless part", async () => {
    const result = await compileComponent(ISELECT);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      const files = out(result, target);
      expectOutputContains(files, "ISelectBase");
      expectOutputContains(files, "ISelectTriggerBase");
      expectOutputContains(files, "ISelectListboxBase");
      expectOutputContains(files, "ISelectOptionBase");
    }
  });

  it("pulls all four select recipes from virtual:styleframe", async () => {
    const result = await compileComponent(ISELECT);
    for (const target of ["react", "vue", "solid"] as const) {
      expectImports(out(result, target), "virtual:styleframe", [
        "selectRecipe",
        "selectPanelRecipe",
        "selectOptionRecipe",
        "selectArrowRecipe",
      ]);
    }
  });

  it("renders the listbox only while open (Show gating) on every target", async () => {
    const result = await compileComponent(ISELECT);
    // Opening the listbox never shifts page content because it is absolutely positioned; it is also
    // absent from the DOM entirely until open.
    expectOutputContains(out(result, "react"), "open ? <ISelectListboxBase");
    expectOutputContains(out(result, "react"), ": null");
    expectOutputContains(out(result, "vue"), 'v-if="open"');
    expectOutputContains(out(result, "angular"), "@if (open())");
  });

  it("renders one option per enriched entry, keyed by value, on every target", async () => {
    const result = await compileComponent(ISELECT);
    expectOutputContains(out(result, "react"), "enriched.map((option) =>");
    expectOutputContains(out(result, "react"), "key={option.value}");
    expectOutputContains(out(result, "vue"), 'v-for="option in enriched"');
    expectOutputContains(out(result, "vue"), ':key="option.value"');
    expectOutputContains(out(result, "svelte"), "{#each enriched as option (option.value)}");
    expectOutputContains(out(result, "solid"), "<For each={enriched()}>");
    expectOutputContains(out(result, "angular"), "@for (option of enriched(); track option.value)");
    expectOutputContains(out(result, "qwik"), "enriched.value.map((option) =>");
  });

  it("derives each option's selected state from the shared value", async () => {
    const result = await compileComponent(ISELECT);
    expectOutputContains(out(result, "react"), "selected={props.value === option.value}");
    expectOutputContains(out(result, "vue"), ':selected="value === option.value"');
    expectOutputContains(out(result, "angular"), '[selected]="value() === option.value"');
  });

  it("marks the virtually-focused row via the active/activeIndex binding", async () => {
    const result = await compileComponent(ISELECT);
    expectOutputContains(out(result, "react"), "active={activeIndex === option.index}");
    expectOutputContains(out(result, "angular"), '[active]="activeIndex() === option.index"');
  });

  it("commits the option value and closes on select, per target", async () => {
    const result = await compileComponent(ISELECT);
    expectOutputContains(out(result, "react"), "props.onUpdateValue?.(option.value)");
    expectOutputContains(out(result, "vue"), "value = option.value");
    expectOutputContains(out(result, "svelte"), "value = option.value");
    expectOutputContains(out(result, "angular"), "value.set(option.value)");
    expectOutputContains(out(result, "qwik"), "props.onUpdateValue$?.(option.value)");
  });

  it("syncs the active row with the pointer via activate", async () => {
    const result = await compileComponent(ISELECT);
    expectOutputContains(out(result, "react"), "setActiveIndex(option.index)");
    expectOutputContains(out(result, "angular"), "activeIndex.set(option.index)");
  });

  it("writes each keyboard-driven signal exactly once so assignment targets stay valid", async () => {
    // Guarding a signal write with `&&` (`cond && setX(v)`) is a valid call on React/Solid/Angular
    // but lowers to a bare assignment on Vue/Svelte/Qwik, where `a && b && x = v` is a syntax error.
    // The handlers fold the branches into a single ternary RHS, so each signal is written once.
    const result = await compileComponent(ISELECT);
    // On the assignment-lowering targets every signal write must be a plain `x = <ternary>`, never
    // the invalid `... && x = v` produced by guarding an assignment with `&&`.
    for (const target of ["svelte", "vue", "qwik"] as const) {
      const src = out(result, target)[0]?.contents ?? "";
      expect(src, `${target}: guarded activeIndex assignment`).not.toMatch(
        /&&\s*activeIndex(?:\.value)?\s*=[^=]/,
      );
      expect(src, `${target}: guarded open assignment`).not.toMatch(
        /&&\s*open(?:\.value)?\s*=[^=]/,
      );
      expect(src, `${target}: guarded value assignment`).not.toMatch(
        /&&\s*value(?:\.value)?\s*=[^=]/,
      );
    }
  });

  it("output matches snapshots", async () => {
    const result = await compileComponent(ISELECT);
    expect(snapshotOutput(result)).toMatchSnapshot();
  });
});

// Real-DOM verification on the Angular target (SSR via @angular/platform-server). The select renders
// closed by default (internal `open` signal starts false), so SSR exercises the closed surface: the
// positioning container, the combobox trigger with its recipe class and ARIA, and the displayed
// value/placeholder. The open listbox + option rendering is covered by the codegen assertions above.
describe("ISelect (styled) on Angular SSR", () => {
  const HEADLESS = [
    "../headless/ISelectBase.ink.tsx",
    "../headless/ISelectTriggerBase.ink.tsx",
    "../headless/ISelectListboxBase.ink.tsx",
    "../headless/ISelectOptionBase.ink.tsx",
  ];

  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(import.meta.url, "./ISelect.ink.tsx", HEADLESS, props);

  const OPTIONS = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
  ];

  it("renders the composed container with the combobox trigger and recipe classes", async () => {
    const { html } = await mount({
      options: OPTIONS,
      value: "apple",
      label: "Fruit",
      size: "md",
      color: "light",
      variant: "solid",
    });

    // Container is the positioning context; the trigger carries the recipe class and combobox role.
    expect(html).toMatch(/<div[^>]*class="select-container"/);
    expect(html).toMatch(/<div[^>]*role="combobox"/);
    expect(html).toMatch(/<div[^>]*class="select[^"]*"/);
    // Closed by default: no listbox in the DOM.
    expect(html).not.toContain('role="listbox"');
  });

  it("shows the selected option's label and marks the trigger collapsed", async () => {
    const { html } = await mount({ options: OPTIONS, value: "banana", label: "Fruit" });

    expect(html).toContain("Banana");
    expect(html).toMatch(/<div[^>]*aria-expanded="false"/);
    expect(html).toMatch(/<span[^>]*class="select-value"/);
  });

  it("shows the placeholder with its modifier when nothing is selected", async () => {
    const { html } = await mount({
      options: OPTIONS,
      placeholder: "Pick one",
      label: "Fruit",
    });

    expect(html).toContain("Pick one");
    expect(html).toMatch(/<span[^>]*class="select-value -placeholder"/);
  });

  it("exposes aria-controls / aria-haspopup and the accessible name", async () => {
    const { html } = await mount({ options: OPTIONS, value: "apple", label: "Fruit" });

    expect(html).toMatch(/aria-haspopup="listbox"/);
    expect(html).toMatch(/aria-controls="[^"]*-listbox"/);
    expect(html).toMatch(/aria-label="Fruit"/);
  });

  it("marks the trigger invalid and disabled from the matching props", async () => {
    const { html } = await mount({
      options: OPTIONS,
      value: "apple",
      label: "Fruit",
      invalid: true,
      disabled: true,
    });

    expect(html).toMatch(/aria-invalid="true"/);
    expect(html).toMatch(/aria-disabled="true"/);
    // Disabled removes the tab stop.
    expect(html).toMatch(/tabindex="-1"/);
  });

  // The collapsed host variant inlines the composite onto native elements: the container is the
  // <div> host, the trigger a <div ink-select-trigger-base>, with no display:contents wrappers.
  it("host variant renders a zero-wrapper container + combobox", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./ISelect.ink.tsx",
      HEADLESS,
      { options: OPTIONS, value: "apple", label: "Fruit", size: "md", color: "light" },
      "ISelectHostComponent",
    );

    expect(html).toMatch(/<div[^>]*ink-select-base[^>]*class="select-container"/);
    expect(html).toMatch(/<div[^>]*role="combobox"[^>]*ink-select-trigger-base/);
    expect(html).toMatch(/<div[^>]*ink-select-trigger-base[^>]*class="select /);
    expect(html).not.toContain("<ink-select"); // no display:contents wrapper elements anywhere
  });
});
