// Angular codegen assertions for the "styled-recipe" feature area: a styled component whose
// recipe is computed in a memo from a subset of props and bound on the root, with a default slot
// that falls back to a prop. Exercises the full pipeline (parse → lower → analyze → codegen) so it
// catches real bugs in how authored `.ink.tsx` styling becomes Angular output.

import { describe, it, expect } from "vitest";
import { compileToChecked } from "../../../../testing/codegen.ts";

describe("StyledRecipe: recipe memo from props + default slot", () => {
  it("Angular: styling props are signal inputs; computed reads this.x(); bound via [class]", async () => {
    const out = await compileToChecked("StyledRecipe", "angular");
    // Props are signal inputs, so the computed reads them in call form (`this.color()`) and reacts.
    expect(out).toContain(
      "className = computed(() => badge({ color: this.color(), size: this.size() }))",
    );
    expect(out).toContain("color = input<");
    expect(out).toContain("size = input<");
    expect(out).toContain('[class]="className()"');
    expect(out).not.toContain("badge({ color: props.color"); // never bare props in class body
  });

  it("Angular: enumerates the styling props from the inline interface", async () => {
    const out = await compileToChecked("StyledRecipe", "angular");
    expect(out, "angular should know the color prop").toMatch(/color/);
    expect(out, "angular should know the size prop").toMatch(/size/);
  });
});
