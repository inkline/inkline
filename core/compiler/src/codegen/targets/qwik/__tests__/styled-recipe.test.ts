// Qwik codegen: author `.ink.tsx` → compile → assert the ACTUAL generated Qwik code for a styled
// component (module-level recipe computed in a memo from a subset of props, bound on the root).

import { describe, it, expect } from "vitest";
import { compileToChecked } from "../../../../testing/codegen.ts";

// A styled component: a module-level recipe computed in a memo from a subset of props, bound on
// the root, with a default slot that falls back to a prop.
describe("StyledRecipe: recipe memo from props + default slot", () => {
  it("Qwik: useComputed$; read via .value", async () => {
    const out = await compileToChecked("StyledRecipe", "qwik");
    expect(out).toContain(
      "const className = useComputed$(() => badge({ color: props.color, size: props.size }))",
    );
    expect(out).toContain("className.value");
  });

  it("Qwik enumerates the styling props from the inline interface", async () => {
    const out = await compileToChecked("StyledRecipe", "qwik");
    expect(out, "qwik should know the color prop").toMatch(/color/);
    expect(out, "qwik should know the size prop").toMatch(/size/);
  });
});
