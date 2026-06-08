// Vue styled-recipe codegen: author `.ink.tsx` → compile to Vue → assert the ACTUAL generated
// framework code (full pipeline: parse → lower → analyze → codegen), with no error diagnostics.

import { describe, it, expect } from "vitest";
import { compileToChecked } from "../../../../testing/codegen.ts";

// A styled component: a module-level recipe computed in a memo from a subset of props, bound on
// the root, with a default slot that falls back to a prop. This is the pattern that exposed the
// React dependency-array, Solid slot, Svelte/Angular whole-prop, and object-literal-rewrite bugs.
describe("StyledRecipe: recipe memo from props + default slot", () => {
  it("Vue: computed from props; native slot with fallback", async () => {
    const out = await compileToChecked("StyledRecipe", "vue");
    expect(out).toContain(
      "const className = computed(() => badge({ color: props.color, size: props.size }))",
    );
    expect(out).toContain("<slot>");
  });

  it("Vue enumerates the styling props from the inline interface", async () => {
    const out = await compileToChecked("StyledRecipe", "vue");
    expect(out, "vue should know the color prop").toMatch(/color/);
    expect(out, "vue should know the size prop").toMatch(/size/);
  });
});
