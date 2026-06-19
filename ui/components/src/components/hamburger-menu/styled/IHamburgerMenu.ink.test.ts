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

const IHAMBURGER = resolveComponent(import.meta.url, "./IHamburgerMenu.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

describe("IHamburgerMenu (styled)", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(IHAMBURGER);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("emits only the expected Astro two-way notice (INK0045); no hasSlot INK0068", async () => {
    const result = await compileComponent(IHAMBURGER);
    const unexpected = result.diagnostics.filter((d) => d.code !== "INK0045");
    expect(unexpected.map((d) => `${d.code}: ${d.title}`)).toEqual([]);
    expect(result.diagnostics.filter((d) => d.code === "INK0068")).toHaveLength(0);
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(IHAMBURGER));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(IHAMBURGER));
  });

  it("composes the headless base part across targets", async () => {
    const result = await compileComponent(IHAMBURGER);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      expectOutputContains(out(result, target), "IHamburgerMenuBase");
    }
  });

  it("pulls the hamburger-menu recipe from virtual:styleframe", async () => {
    const result = await compileComponent(IHAMBURGER);
    for (const target of ["react", "vue", "solid"] as const) {
      expectImports(out(result, target), "virtual:styleframe", ["hamburgerMenuRecipe"]);
    }
  });

  it("derives the recipe `active` axis from the open model (React memo body + deps)", async () => {
    const result = await compileComponent(IHAMBURGER);
    // Body and useMemo deps must both reference props.open — the regression guarded by the
    // @inkline/compiler model-dep fix (a bare `open` in the deps array is a TDZ ReferenceError).
    expectOutputContains(out(result, "react"), 'active: props.open ? "true" : "false"');
    expectOutputContains(
      out(result, "react"),
      "[props.color, props.size, props.animation, props.open]",
    );
  });

  it("forwards a two-way `open` to the base per target", async () => {
    const result = await compileComponent(IHAMBURGER);
    expectOutputContains(out(result, "react"), "onUpdateOpen");
    expectOutputContains(out(result, "vue"), 'v-model:open="open"');
    expectOutputContains(out(result, "svelte"), "bind:open={open}");
    expectOutputContains(out(result, "angular"), "(openChange)=");
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(IHAMBURGER))).toMatchSnapshot();
  });
});

// Real-DOM verification on the Angular target (SSR via @angular/platform-server): the recipe classes
// land on the native button, the open state drives aria-expanded + the recipe `active` axis, the
// controlled region is linked, and the decorative bars are hidden from assistive tech.
describe("IHamburgerMenu (styled) on Angular SSR", () => {
  const HEADLESS = ["../headless/IHamburgerMenuBase.ink.tsx"];
  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(import.meta.url, "./IHamburgerMenu.ink.tsx", HEADLESS, props);

  it("renders a native button with sorted recipe classes + the decorative inner bars", async () => {
    const { html } = await mount({
      open: true,
      animation: "close",
      color: "dark",
      size: "md",
      ariaLabel: "Open navigation",
      ariaControls: "nav",
    });
    expect(html).toMatch(
      /<button[^>]*class="hamburger-menu hamburger-menu--active-true hamburger-menu--animation-close hamburger-menu--color-dark hamburger-menu--size-md"/,
    );
    expect(html).toContain('class="hamburger-menu-inner"');
    expect(html).toMatch(/<span[^>]*aria-hidden="true"/);
  });

  it("reflects the open state in aria-expanded and links the controlled region", async () => {
    const { html } = await mount({ open: true, ariaLabel: "Open navigation", ariaControls: "nav" });
    expect(html).toMatch(/<button[^>]*aria-expanded="true"/);
    expect(html).toMatch(/<button[^>]*aria-controls="nav"/);
    expect(html).toMatch(/<button[^>]*aria-label="Open navigation"/);
  });

  it("renders aria-expanded=false and the active-false recipe class when closed", async () => {
    const { html } = await mount({ ariaLabel: "Open navigation" });
    expect(html).toMatch(/<button[^>]*aria-expanded="false"/);
    expect(html).toContain("hamburger-menu--active-false");
  });

  it("reflects the disabled state onto the native button", async () => {
    const { html } = await mount({ disabled: true, ariaLabel: "Open navigation" });
    expect(html).toMatch(/<button[^>]*disabled/);
  });

  it("falls back to the default accessible name and an empty aria-controls when unset", async () => {
    // Exercises the `ariaLabel ?? "Toggle menu"` and `ariaControls ?? ""` fallbacks at the DOM level.
    const { html } = await mount({});
    expect(html).toMatch(/<button[^>]*aria-label="Toggle menu"/);
    expect(html).toMatch(/<button[^>]*aria-controls=""/);
  });

  // The collapsed host variant carries the model-driven behavior (aria-expanded, the click that
  // toggles `open`) directly on the native button — zero wrappers, both ink-* attributes.
  it("host variant renders a zero-wrapper <button ink-hamburger-menu ink-hamburger-menu-base>", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./IHamburgerMenu.ink.tsx",
      HEADLESS,
      { open: true, color: "dark", size: "md", ariaLabel: "Open navigation", ariaControls: "nav" },
      "IHamburgerMenuHostComponent",
    );
    expect(html).toMatch(/<button[^>]*class="hamburger-menu[^"]*hamburger-menu--active-true[^"]*"/);
    expect(html).toContain('ink-hamburger-menu=""');
    expect(html).toContain('ink-hamburger-menu-base=""');
    expect(html).toMatch(/<button[^>]*aria-expanded="true"/);
    expect(html).not.toContain("<ink-hamburger-menu"); // no wrapper element
    expect(html).toContain('class="hamburger-menu-inner"');
  });
});
