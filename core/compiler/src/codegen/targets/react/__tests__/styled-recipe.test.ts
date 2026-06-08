// React codegen assertions for the "styled-recipe" feature area: a module-level recipe computed in a
// memo from a subset of props, bound on the root, with a default slot that falls back to a prop.
// These exercise the FULL pipeline (parse -> lower -> analyze -> codegen) and assert no error
// diagnostics, so they catch real bugs in how authored styled components become React output.

import { describe, it, expect } from "vitest";
import { compileToChecked } from "../../../../testing/codegen.ts";

// A styled component: a module-level recipe computed in a memo from a subset of props, bound on
// the root, with a default slot that falls back to a prop. This is the pattern that exposed the
// React dependency-array bug.
describe("StyledRecipe: recipe memo from props + default slot", () => {
  it("React: granular deduped useMemo deps; default slot → children", async () => {
    const out = await compileToChecked("StyledRecipe", "react");
    expect(out).toContain(
      "const className = useMemo(() => badge({ color: props.color, size: props.size }), [props.color, props.size])",
    );
    expect(out).toContain("{props.children ?? props.label}");
  });

  it("React enumerates the styling props from the inline interface", async () => {
    const out = await compileToChecked("StyledRecipe", "react");
    expect(out, "react should know the color prop").toMatch(/color/);
    expect(out, "react should know the size prop").toMatch(/size/);
  });
});
