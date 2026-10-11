import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../app/app.css", import.meta.url), "utf8");

/**
 * `ui.colors.primary: "purple"` resolves onto Inkline's own purple only while
 * app/app.css defines the scale: without it, Nuxt UI falls back to Tailwind's
 * purple, and the docs lose the brand colour.
 */
describe("the brand palette", () => {
  it("defines the purple scale in a static theme", () => {
    expect(css).toMatch(/@theme static\s*{[^}]*--color-purple: hsl\(263, 90%, 60%\);/);
  });

  it.each([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950])("defines purple-%i", (shade) => {
    expect(css).toContain(`--color-purple-${shade}:`);
  });

  it("maps the primary colour onto it", () => {
    expect(css).toMatch(/:root\s*{\s*--ui-primary: var\(--color-purple\);/);
  });
});
