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

const ISWITCH = resolveComponent(import.meta.url, "./ISwitch.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

describe("ISwitch (styled)", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(ISWITCH);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro two-way notice (INK0045); no hasSlot INK0068", async () => {
    const result = await compileComponent(ISWITCH);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
    expect(result.diagnostics.filter((d) => d.code === "INK0068")).toHaveLength(0);
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(ISWITCH));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(ISWITCH));
  });

  it("composes every headless part (shell, control, label)", async () => {
    const result = await compileComponent(ISWITCH);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      const files = out(result, target);
      expectOutputContains(files, "ISwitchBase");
      expectOutputContains(files, "ISwitchControlBase");
      expectOutputContains(files, "ISwitchLabelBase");
    }
  });

  it("pulls both Switch recipes from virtual:styleframe", async () => {
    const result = await compileComponent(ISWITCH);
    for (const target of ["react", "vue", "solid"] as const) {
      expectImports(out(result, target), "virtual:styleframe", [
        "switchRecipe",
        "switchFieldRecipe",
      ]);
    }
  });

  it("forwards a two-way `checked` to the control per target", async () => {
    const result = await compileComponent(ISWITCH);
    expectOutputContains(out(result, "react"), "onUpdateChecked");
    expectOutputContains(out(result, "vue"), 'v-model:checked="checked"');
    expectOutputContains(out(result, "svelte"), "bind:checked={checked}");
    expectOutputContains(out(result, "angular"), "(checkedChange)=");
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(ISWITCH))).toMatchSnapshot();
  });
});

// Real-DOM verification on the Angular target (SSR via @angular/platform-server): the recipe classes
// land on the right elements (shell `<label>`, native `<input>`), the switch ARIA contract is
// present, the label text projects, and the disabled/checked states reflect onto the control.
describe("ISwitch (styled) on Angular SSR", () => {
  const HEADLESS = [
    "../headless/ISwitchBase.ink.tsx",
    "../headless/ISwitchControlBase.ink.tsx",
    "../headless/ISwitchLabelBase.ink.tsx",
  ];

  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(import.meta.url, "./ISwitch.ink.tsx", HEADLESS, props);

  it("renders the composed toggle: shell label with recipe classes wrapping the native switch", async () => {
    const { html } = await mount({
      label: "Airplane mode",
      name: "airplane",
      size: "md",
      color: "light",
    });

    expect(html).toMatch(/<label[^>]*class="switch switch--size-md"/);
    expect(html).toMatch(
      /<input[^>]*class="switch-field switch-field--color-light switch-field--size-md"/,
    );
    expect(html).toMatch(/<input[^>]*type="checkbox"/);
    expect(html).toMatch(/<input[^>]*role="switch"/);
    expect(html).toMatch(/<input[^>]*name="airplane"/);
  });

  it("announces the toggle state via aria-checked and projects the label text", async () => {
    const { html } = await mount({ label: "Airplane mode", checked: true });

    expect(html).toMatch(/<input[^>]*aria-checked="true"/);
    expect(html).toMatch(/<input[^>]*checked/);
    expect(html).toMatch(/<span[^>]*class="switch-label">Airplane mode<\/span>/);
  });

  it("renders aria-checked=false and an unchecked control when the model is unset", async () => {
    const { html } = await mount({ label: "Off" });

    expect(html).toMatch(/<input[^>]*aria-checked="false"/);
    expect(html).not.toMatch(/<input[^>]*aria-checked="true"/);
  });

  it("keeps the label span empty when no label is provided (the CSS :empty contract)", async () => {
    const { html } = await mount({ name: "bare" });

    expect(html).toMatch(/<span[^>]*class="switch-label"><\/span>/);
  });

  it("reflects the disabled state onto the native control", async () => {
    const { html } = await mount({ label: "Off", disabled: true });

    expect(html).toMatch(/<input[^>]*disabled/);
  });

  it("forwards id to the control only, not the shell label", async () => {
    const { html } = await mount({ id: "wifi", label: "Wi-Fi" });

    expect(html).toMatch(/<input[^>]*id="wifi"/);
    expect(html).not.toMatch(/<label[^>]*id="wifi"/);
  });

  // The collapsed host variant inlines the composite onto native elements: the shell is the <label>
  // host, the control is a bare native <input ink-switch-control-base>, the label a <span> — zero
  // display:contents wrapper elements anywhere.
  it("host variant renders a zero-wrapper toggle (label > input / span)", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./ISwitch.ink.tsx",
      HEADLESS,
      { label: "Dark mode", checked: true, color: "dark", size: "lg" },
      "ISwitchHostComponent",
    );

    expect(html).toMatch(/<label[^>]*ink-switch[^>]*class="switch switch--size-lg"/);
    expect(html).toMatch(/<input[^>]*ink-switch-control-base[^>]*class="switch-field/);
    expect(html).toMatch(/<span ink-switch-label-base[^>]*>Dark mode<\/span>/);
    expect(html).not.toContain("<ink-switch"); // no display:contents wrapper elements
  });
});
