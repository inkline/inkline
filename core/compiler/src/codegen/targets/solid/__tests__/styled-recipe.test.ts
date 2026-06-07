// Real-world codegen assertions for the "styled-recipe" feature area (Solid target): a module-level
// recipe computed in a memo from a subset of props, bound on the root, with a default slot that
// falls back to a prop. Exercises the full pipeline and asserts no error diagnostics.

import { describe, it, expect } from "vitest";
import { compileToChecked } from "../../../../testing/codegen.ts";

// A styled component: a module-level recipe computed in a memo from a subset of props, bound on
// the root, with a default slot that falls back to a prop. This is the pattern that exposed the
// Solid slot bug.
describe("StyledRecipe: recipe memo from props + default slot", () => {
  it("Solid: createMemo; default slot via children; children kept out of fallthrough", async () => {
    const out = await compileToChecked("StyledRecipe", "solid");
    expect(out).toContain(
      "const className = createMemo(() => badge({ color: props.color, size: props.size }))",
    );
    expect(out).toContain('splitProps(props, ["children", "label", "color", "size"])');
    expect(out).toContain("{props.children ?? props.label}");
  });

  it("enumerates the styling props from the inline interface", async () => {
    const out = await compileToChecked("StyledRecipe", "solid");
    expect(out, "solid should know the color prop").toMatch(/color/);
    expect(out, "solid should know the size prop").toMatch(/size/);
  });
});
