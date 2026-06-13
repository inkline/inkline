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
    // The fallthrough root merges the recipe class with the parent-forwarded klass input.
    expect(out).toContain(`[class]="(className()) + (klass() ? ' ' + klass() : '')"`);
    expect(out).not.toContain("badge({ color: props.color"); // never bare props in class body
  });

  it("Angular: re-exposes module-level recipe imports as class fields for the template", async () => {
    const out = await compileToChecked("StyledRecipe", "angular");
    // Angular templates resolve identifiers against the component instance, so the imported recipe
    // is mirrored as a field (the initializer's RHS resolves to the module import).
    expect(out).toContain("badge = badge");
  });

  it("Angular: enumerates the styling props from the inline interface", async () => {
    const out = await compileToChecked("StyledRecipe", "angular");
    expect(out, "angular should know the color prop").toMatch(/color/);
    expect(out, "angular should know the size prop").toMatch(/size/);
  });
});
