// Svelte codegen assertions for the "styled-recipe" feature area: author `.ink.tsx` →
// compile → assert the ACTUAL generated Svelte code. Exercises the full pipeline (parse →
// lower → analyze → codegen), so it catches real bugs in how authored components become output.

import { describe, it, expect } from "vitest";
import { compileToChecked } from "../../../../testing/codegen.ts";

// A styled component: a module-level recipe computed in a memo from a subset of props, bound on
// the root, with a default slot that falls back to a prop. This is the pattern that exposed the
// Svelte whole-prop and object-literal-rewrite bugs.
describe("StyledRecipe: recipe memo from props + default slot", () => {
  it("Svelte: $derived over destructured props (no bare `props`); slot fallback", async () => {
    const out = await compileToChecked("StyledRecipe", "svelte");
    expect(out).toContain("let className = $derived(badge({ color: color, size: size }))");
    expect(out).not.toMatch(/badge\(\{[^}]*props\./); // recipe args must not reference bare `props`
    expect(out).toContain("<slot>");
  });

  it("Svelte enumerates the styling props from the inline interface", async () => {
    const out = await compileToChecked("StyledRecipe", "svelte");
    expect(out, "svelte should know the color prop").toMatch(/color/);
    expect(out, "svelte should know the size prop").toMatch(/size/);
  });
});
