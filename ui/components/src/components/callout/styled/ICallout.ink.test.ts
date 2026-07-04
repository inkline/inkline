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

const ICALLOUT = resolveComponent(import.meta.url, "./ICallout.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

describe("ICallout (styled)", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(ICALLOUT);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected notices (Astro two-way INK0045, Qwik/Angular hasSlot INK0068)", async () => {
    const result = await compileComponent(ICALLOUT);
    const unexpected = result.diagnostics.filter(
      (d) => d.code !== "INK0045" && d.code !== "INK0068",
    );
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
    // INK0068 fires once per target without runtime slot presence (Qwik + Angular).
    expect(result.diagnostics.filter((d) => d.code === "INK0068")).toHaveLength(2);
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(ICALLOUT));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(ICALLOUT));
  });

  it("composes every headless part (shell, icon, content, dismiss)", async () => {
    const result = await compileComponent(ICALLOUT);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      const files = out(result, target);
      expectOutputContains(files, "ICalloutBase");
      expectOutputContains(files, "ICalloutIconBase");
      expectOutputContains(files, "ICalloutContentBase");
      expectOutputContains(files, "ICalloutDismissBase");
    }
  });

  it("pulls the callout recipe from virtual:styleframe", async () => {
    const result = await compileComponent(ICALLOUT);
    for (const target of ["react", "vue", "solid"] as const) {
      expectImports(out(result, target), "virtual:styleframe", ["calloutRecipe"]);
    }
  });

  it("gates the icon addon by slot presence on targets with a runtime API", async () => {
    const result = await compileComponent(ICALLOUT);
    // React/Solid: node-prop presence check.
    expectOutputContains(out(result, "react"), "props.icon != null");
    expectOutputContains(out(result, "solid"), "props.icon != null");
    // Vue: `$slots` presence check via v-if.
    expectOutputContains(out(result, "vue"), "!!$slots.icon");
  });

  it("always renders the icon wrapper on Qwik/Angular (no runtime slot presence)", async () => {
    const result = await compileComponent(ICALLOUT);
    // No `true ?` / `@if (true)` constant condition — the wrapper is emitted unconditionally and
    // collapses via CSS :empty. The named slot is read from props (Qwik) / projected (Angular).
    expectOutputContains(out(result, "qwik"), "{props.icon}");
    expectOutputContains(out(result, "angular"), 'select="[slot=icon]"');
  });

  it("gates the dismiss button by the `dismissible` prop per target", async () => {
    const result = await compileComponent(ICALLOUT);
    expectOutputContains(out(result, "react"), "props.dismissible");
    expectOutputContains(out(result, "vue"), "!!dismissible");
    expectOutputContains(out(result, "angular"), "@if (!!dismissible())");
  });

  it("wires the `visible` model + dismiss to hide the callout per target", async () => {
    const result = await compileComponent(ICALLOUT);
    // The model surfaces on the component's own boundary (not forwarded to a child).
    expectOutputContains(out(result, "react"), "onUpdateVisible");
    expectOutputContains(out(result, "angular"), "visible = model<boolean>()");
    expectOutputContains(out(result, "svelte"), "$bindable()");
    // Dismiss handler sets the internal signal + emits the model update (false).
    expectOutputContains(out(result, "react"), "setDismissed(true)");
    expectOutputContains(out(result, "angular"), "dismissed.set(true); visible.set(false)");
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(ICALLOUT))).toMatchSnapshot();
  });
});

// Real-DOM verification on the Angular target (SSR via @angular/platform-server): the composed
// callout renders with recipe classes on the shell, the icon/dismiss addons project and gate, the
// role reflects, and dismissal collapses via the `hidden` attribute. Angular sorts recipe class
// keys alphabetically (color, orientation, size, variant).
describe("ICallout (styled) on Angular SSR", () => {
  const HEADLESS = [
    "../headless/ICalloutBase.ink.tsx",
    "../headless/ICalloutIconBase.ink.tsx",
    "../headless/ICalloutContentBase.ink.tsx",
    "../headless/ICalloutDismissBase.ink.tsx",
  ];

  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(import.meta.url, "./ICallout.ink.tsx", HEADLESS, props);

  it("renders the shell with sorted recipe classes, role=note, and the content label", async () => {
    const { html } = await mount({
      label: "Heads up",
      color: "success",
      variant: "soft",
      size: "md",
      orientation: "vertical",
    });

    expect(html).toMatch(
      /<div[^>]*class="callout callout--color-success callout--orientation-vertical callout--size-md callout--variant-soft"/,
    );
    expect(html).toMatch(/<div[^>]*role="note"/);
    expect(html).toMatch(/<div[^>]*class="callout-content[^"]*">Heads up<\/div>/);
  });

  it("renders a bare `callout` class with no variant modifiers when unstyled", async () => {
    const { html } = await mount({ label: "Plain" });
    expect(html).toMatch(/<div[^>]*class="callout"/);
    expect(html).not.toContain("callout--");
  });

  it("reflects a custom role for dynamically-inserted messages", async () => {
    const { html } = await mount({ label: "Saved", role: "status" });
    expect(html).toMatch(/<div[^>]*role="status"/);
  });

  it("projects icon slot content into the icon wrapper", async () => {
    const { html } = await mount({ label: "Info", __slots: { icon: "★" } });
    expect(html).toMatch(/<span[^>]*class="callout-icon[^"]*">★<\/span>/);
  });

  it("keeps the unused icon wrapper present but empty (the CSS :empty contract)", async () => {
    const { html } = await mount({ label: "No icon" });
    // Angular always renders the wrapper (hasSlot → true); it must be truly empty so the shipped
    // `.callout-icon:empty` rule collapses it.
    expect(html).toMatch(/<span[^>]*class="callout-icon[^"]*"><\/span>/);
  });

  it("lets the default slot override the label fallback", async () => {
    const { html } = await mount({
      label: "fallback",
      __slots: { default: "<strong>rich content</strong>" },
    });
    expect(html).toContain("<strong>rich content</strong>");
    expect(html).not.toContain("fallback");
  });

  it("renders a dismiss button with the default accessible name when dismissible", async () => {
    const { html } = await mount({ label: "Closable", dismissible: true });
    expect(html).toMatch(/<button[^>]*class="callout-dismiss"/);
    expect(html).toMatch(/<button[^>]*aria-label="Dismiss"/);
    expect(html).toContain("×");
  });

  it("uses a custom dismiss accessible name", async () => {
    const { html } = await mount({
      label: "Closable",
      dismissible: true,
      dismissAriaLabel: "Close",
    });
    expect(html).toMatch(/<button[^>]*aria-label="Close"/);
  });

  it("lets the dismiss slot override the default × glyph", async () => {
    const { html } = await mount({
      label: "Closable",
      dismissible: true,
      __slots: { dismiss: "Close" },
    });
    expect(html).toMatch(/<button[^>]*class="callout-dismiss"[^>]*>[\s\S]*Close[\s\S]*<\/button>/);
  });

  it("omits the dismiss button when not dismissible", async () => {
    const { html } = await mount({ label: "Static" });
    expect(html).not.toContain("callout-dismiss");
  });

  it("hides the shell (hidden attribute) when the visible model is false", async () => {
    const { html } = await mount({ label: "Gone", visible: false });
    expect(html).toMatch(/<div[^>]*class="callout"[^>]* hidden/);
  });

  it("keeps the shell visible (no hidden attribute) when the visible model is true", async () => {
    const { html } = await mount({ label: "Shown", visible: true });
    const shell = html.match(/<div[^>]*class="callout"[^>]*>/);
    expect(shell).toBeTruthy();
    expect(shell![0]).not.toContain("hidden");
  });

  // The collapsed host variant inlines the whole composite onto native elements: the shell is the
  // <div> host carrying the recipe classes + role, with zero display:contents wrapper elements.
  it("host variant renders a zero-wrapper shell (div[ink-callout]) with recipe classes + role", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./ICallout.ink.tsx",
      HEADLESS,
      { label: "Hosted", color: "primary", size: "md" },
      "ICalloutHostComponent",
    );
    expect(html).toMatch(
      /<div[^>]*ink-callout[^>]*class="callout callout--color-primary callout--size-md"/,
    );
    expect(html).toMatch(/<div[^>]*role="note"/);
    expect(html).not.toContain("<ink-callout"); // no display:contents wrapper elements anywhere
  });
});
