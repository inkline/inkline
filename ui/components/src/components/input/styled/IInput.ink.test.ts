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
    // React: node-prop presence check.
    expectOutputContains(out(result, "react"), "props.prefix != null");
    expectOutputContains(out(result, "react"), "props.append != null");
    // Vue: `$slots` presence check via v-if.
    expectOutputContains(out(result, "vue"), "!!$slots.prefix");
    expectOutputContains(out(result, "vue"), "!!$slots.append");
    // Solid: slot-prop presence check.
    expectOutputContains(out(result, "solid"), "props.prefix != null");
  });

  it("always renders the addon wrappers on Qwik/Angular (no runtime slot presence)", async () => {
    const result = await compileComponent(IINPUT);
    // No `true ?` / `@if (true)` constant condition — the wrapper is emitted unconditionally and
    // collapses via CSS :empty. The named slot is read from props (Qwik) / projected (Angular).
    expectOutputContains(out(result, "qwik"), "{props.prefix}");
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

// Real-DOM verification on the Angular target (SSR via @angular/platform-server): the composed
// field renders with recipe classes on the right elements, addons project, and unused addon
// wrappers stay present-but-empty (collapsed by the CSS `:empty` layer, since Angular has no
// runtime slot presence).
describe("IInput (styled) on Angular SSR", () => {
  const HEADLESS = [
    "../headless/IInputGroupBase.ink.tsx",
    "../headless/IInputBase.ink.tsx",
    "../headless/IInputPrefixBase.ink.tsx",
    "../headless/IInputSuffixBase.ink.tsx",
    "../headless/IInputPrependBase.ink.tsx",
    "../headless/IInputAppendBase.ink.tsx",
    "../headless/IInputControlBase.ink.tsx",
  ];

  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(import.meta.url, "./IInput.ink.tsx", HEADLESS, props);

  it("renders the composed field: group, shell with recipe classes, native control", async () => {
    const { html } = await mount({
      placeholder: "Amount",
      name: "amount",
      size: "md",
      color: "light",
    });

    expect(html).toMatch(/<div[^>]*class="input-group input-group--size-md"/);
    expect(html).toMatch(/<div[^>]*class="input input--color-light input--size-md"/);
    expect(html).toMatch(/<input[^>]*class="input-field"/);
    expect(html).toMatch(/<input[^>]*placeholder="Amount"/);
    expect(html).toMatch(/<input[^>]*name="amount"/);
  });

  it("keeps unused addon wrappers present but empty (the CSS :empty contract)", async () => {
    const { html } = await mount({ placeholder: "Plain" });

    // Angular always renders the wrappers (hasSlot → true); they must be truly empty so the
    // shipped `:empty` rules collapse them.
    expect(html).toMatch(/<span[^>]*class="input-prefix[^"]*"><\/span>/);
    expect(html).toMatch(/<span[^>]*class="input-suffix[^"]*"><\/span>/);
    expect(html).toMatch(/<div[^>]*class="input-prepend"[^>]*><\/div>/);
    expect(html).toMatch(/<div[^>]*class="input-append"[^>]*><\/div>/);
  });

  it("projects prefix/suffix addon content into the shell (currency field)", async () => {
    const { html } = await mount({
      placeholder: "0.00",
      __slots: { prefix: "$", suffix: "USD" },
    });

    expect(html).toMatch(/<span[^>]*class="input-prefix[^"]*">\$<\/span>/);
    expect(html).toMatch(/<span[^>]*class="input-suffix[^"]*">USD<\/span>/);
  });

  it("projects prepend/append addon content outside the shell (URL field)", async () => {
    const { html } = await mount({
      placeholder: "example",
      __slots: { prepend: "https://", append: ".com" },
    });

    expect(html).toMatch(/<div[^>]*class="input-prepend"[^>]*>https:\/\/<\/div>/);
    expect(html).toMatch(/<div[^>]*class="input-append"[^>]*>\.com<\/div>/);
  });

  it("renders a textarea control for type=textarea", async () => {
    const { html } = await mount({ type: "textarea", placeholder: "Bio" });

    expect(html).toMatch(/<textarea[^>]*class="input-field"/);
    expect(html).not.toContain("<input");
  });

  it("reflects the disabled state onto the native control", async () => {
    const { html } = await mount({ placeholder: "Off", disabled: true });

    expect(html).toMatch(/<input[^>]*disabled/);
  });
});
