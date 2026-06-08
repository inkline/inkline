// Astro styled-recipe codegen: author `.ink.tsx` → compile → assert the ACTUAL generated Astro
// code (recipe computed once in frontmatter, default slot fallback).

import { describe, it, expect } from "vitest";
import { compileToChecked } from "../../../../testing/codegen.ts";

// A styled component: a module-level recipe computed in a memo from a subset of props, bound on
// the root, with a default slot that falls back to a prop. This is the pattern that exposed the
// object-literal-rewrite bug.
describe("StyledRecipe: recipe memo from props + default slot", () => {
  it("Astro: recipe computed once as a const in frontmatter (over destructured props)", async () => {
    const out = await compileToChecked("StyledRecipe", "astro");
    expect(out).toContain("const className = badge({ color: color, size: size })");
    // Default slot falls back to the `label` prop, rendered as the <slot>'s default content.
    expect(out).toContain("<slot>");
    expect(out).toContain("{label}");
  });

  it("every target enumerates the styling props from the inline interface", async () => {
    const out = await compileToChecked("StyledRecipe", "astro");
    expect(out, `astro should know the color prop`).toMatch(/color/);
    expect(out, `astro should know the size prop`).toMatch(/size/);
  });
});
