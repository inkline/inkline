import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectCorrectFileExtensions,
  expectNoDiagnostics,
  expectOutputContains,
  expectImports,
  assertConformance,
  snapshotOutput,
  resolveComponent,
  type ComponentTestResult,
  type TargetName,
} from "@inkline/test-utils";
import { mountStyledOnAngular } from "../../angular-ssr-helper.ts";

const IAVATAR = resolveComponent(import.meta.url, "./IAvatar.ink.tsx");

const out = (result: ComponentTestResult, target: TargetName) => result.files[target] ?? [];

// A deterministic inline portrait (no network) for the image branch.
const PORTRAIT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%236366f1'/%3E%3C/svg%3E";

describe("IAvatar (styled)", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(IAVATAR);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics (no two-way, no hasSlot gating)", async () => {
    expectNoDiagnostics(await compileComponent(IAVATAR));
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(IAVATAR));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(IAVATAR));
  });

  it("composes the base and the status-badge part", async () => {
    const result = await compileComponent(IAVATAR);
    for (const target of ["react", "vue", "solid", "svelte", "qwik", "angular"] as const) {
      expectOutputContains(out(result, target), "IAvatarBase");
      expectOutputContains(out(result, target), "IAvatarBadgeBase");
    }
  });

  it("pulls both avatar recipes from virtual:styleframe", async () => {
    const result = await compileComponent(IAVATAR);
    for (const target of ["react", "vue", "solid"] as const) {
      expectImports(out(result, target), "virtual:styleframe", [
        "avatarRecipe",
        "avatarBadgeRecipe",
      ]);
    }
  });

  it("gates the badge via showBadge, filling the badge slot with a plain element", async () => {
    const result = await compileComponent(IAVATAR);
    // React/Solid/Qwik: showBadge prop forwarded; the badge is a plain node-prop fill (no conditional
    // in attribute position — that would miscompile on React/Qwik).
    expectOutputContains(out(result, "react"), "showBadge={props.badge}");
    expectOutputContains(out(result, "solid"), "showBadge={props.badge}");
    expectOutputContains(out(result, "qwik"), "showBadge={props.badge}");
    // Vue: bound showBadge + a named `#badge` slot fill.
    expectOutputContains(out(result, "vue"), ":showBadge");
    expectOutputContains(out(result, "vue"), "#badge");
    // Angular: showBadge input + projected [slot=badge] content.
    expectOutputContains(out(result, "angular"), '[showBadge]="badge()"');
    expectOutputContains(out(result, "angular"), 'slot="badge"');
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(IAVATAR))).toMatchSnapshot();
  });
});

// Real-DOM verification on the Angular target (SSR via @angular/platform-server). These mounts also
// drive the .ink.tsx coverage remap (React) for IAvatar + its headless parts.
describe("IAvatar (styled) on Angular SSR", () => {
  const HEADLESS = ["../headless/IAvatarBase.ink.tsx", "../headless/IAvatarBadgeBase.ink.tsx"];

  const mount = (props?: Record<string, unknown>) =>
    mountStyledOnAngular(import.meta.url, "./IAvatar.ink.tsx", HEADLESS, props);

  it("renders the initials fallback with the recipe classes when there is no image", async () => {
    const { html } = await mount({
      label: "JD",
      color: "primary",
      variant: "soft",
      shape: "circle",
      size: "md",
    });

    expect(html).toMatch(/<div[^>]*class="avatar[^"]*"/);
    expect(html).toContain("avatar--color-primary");
    expect(html).toContain("avatar--variant-soft");
    expect(html).toContain("avatar--shape-circle");
    expect(html).toContain("avatar--size-md");
    expect(html).toContain("JD");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("avatar-badge");
  });

  it("renders the image (with alt) instead of the initials when a src is set", async () => {
    const { html } = await mount({ src: PORTRAIT, alt: "Ada Lovelace", label: "AL" });

    expect(html).toMatch(/<img[^>]*src="data:image\/svg/);
    expect(html).toMatch(/<img[^>]*alt="Ada Lovelace"/);
    expect(html).not.toContain("AL");
  });

  it("renders an empty alt when the image has no alt (Solid-safe coalesce)", async () => {
    const { html } = await mount({ src: PORTRAIT });

    expect(html).toMatch(/<img[^>]*alt=""/);
  });

  it("renders the status-badge dot with its recipe classes when badge is set", async () => {
    const { html } = await mount({
      label: "ON",
      badge: true,
      badgeColor: "success",
      badgePosition: "top-right",
      size: "lg",
    });

    expect(html).toMatch(/<span[^>]*class="avatar-badge[^"]*"/);
    expect(html).toContain("avatar-badge--color-success");
    expect(html).toContain("avatar-badge--position-top-right");
    expect(html).toContain("avatar-badge--size-lg");
    // aria-hidden falls through to the badge part's host (the element-selector wrapper), not the
    // inner <span> — assert its presence without pinning it to a specific element.
    expect(html).toContain('aria-hidden="true"');
  });

  it("projects custom fallback content in place of the label", async () => {
    const { html } = await mount({ label: "JD", __slots: { default: "<em>ZZ</em>" } });

    expect(html).toContain("<em>ZZ</em>");
    expect(html).not.toContain("JD");
  });

  // The collapsed host variant inlines the composite onto the real <div>: zero display:contents
  // wrapper elements, both ink-* attributes present, recipe classes merged directly.
  it("host variant renders a zero-wrapper avatar shell", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./IAvatar.ink.tsx",
      HEADLESS,
      { label: "JD", color: "primary", size: "md" },
      "IAvatarHostComponent",
    );

    expect(html).toMatch(/<div[^>]*ink-avatar[^>]*class="avatar[^"]*avatar--color-primary/);
    expect(html).toContain("ink-avatar-base");
    expect(html).toContain("JD");
    expect(html).not.toContain("<ink-avatar"); // no display:contents wrapper elements anywhere
  });
});
