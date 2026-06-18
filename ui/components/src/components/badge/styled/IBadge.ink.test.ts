import { describe, it, expect } from "vitest";
import { mountStyledOnAngular } from "../../angular-ssr-helper.ts";

// Real-DOM verification of the styled Badge on the Angular target (the one target whose styled
// rendering needed a dedicated compiler redesign): SSR via @angular/platform-server.
describe("IBadge (styled) on Angular SSR", () => {
  it("renders the recipe classes merged onto the headless root element", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./IBadge.ink.tsx",
      ["../headless/IBadgeBase.ink.tsx"],
      { label: "New", color: "primary", size: "md" },
    );

    // The badge IS the native <div> (an element-component host) with the styling directive stacked
    // on it; Ivy unions the base class and the recipe class. No <ink-badge-base> wrapper, no
    // display:contents — so the badge is a real element in the consumer's DOM.
    expect(html).toMatch(/<div[^>]*class="badge badge--color-primary badge--size-md"/);
    expect(html).toContain("New");
    expect(html).not.toContain("ink-badge-base");
  });

  it("renders the base class alone when no styling props are set", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./IBadge.ink.tsx",
      ["../headless/IBadgeBase.ink.tsx"],
      { label: "Plain" },
    );

    expect(html).toMatch(/<div[^>]*class="badge"/);
    expect(html).not.toContain("badge--");
    expect(html).toContain("Plain");
  });

  it("projects slotted content in place of the label fallback", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./IBadge.ink.tsx",
      ["../headless/IBadgeBase.ink.tsx"],
      { label: "fallback", __slots: { default: "<em>slotted</em>" } },
    );

    expect(html).toContain("<em>slotted</em>");
    expect(html).not.toContain("fallback");
  });
});
