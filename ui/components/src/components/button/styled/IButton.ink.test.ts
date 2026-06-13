import { describe, it, expect } from "vitest";
import { mountStyledOnAngular } from "../../angular-ssr-helper.ts";

// Real-DOM verification of the styled Button on the Angular target: SSR via
// @angular/platform-server.
describe("IButton (styled) on Angular SSR", () => {
  it("renders the recipe classes merged onto the headless <button> root", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./IButton.ink.tsx",
      ["../headless/IButtonBase.ink.tsx"],
      { label: "Save", color: "primary", size: "md" },
    );

    expect(html).toMatch(/<button[^>]*class="button button--color-primary button--size-md"/);
    expect(html).toContain("Save");
  });

  it("appends the block modifier alongside the recipe classes", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./IButton.ink.tsx",
      ["../headless/IButtonBase.ink.tsx"],
      { label: "Wide", block: true },
    );

    expect(html).toMatch(/<button[^>]*class="button button--block"/);
  });

  it("reflects the disabled state onto the native button", async () => {
    const { html } = await mountStyledOnAngular(
      import.meta.url,
      "./IButton.ink.tsx",
      ["../headless/IButtonBase.ink.tsx"],
      { label: "Off", disabled: true },
    );

    expect(html).toMatch(/<button[^>]*disabled/);
  });
});
