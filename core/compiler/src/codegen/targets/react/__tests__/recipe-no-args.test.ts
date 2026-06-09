// Regression: a zero-arg call to an imported styleframe recipe (`plainRecipe()`) bound on `class`,
// the shape of styled `IInputAppend`. `plainRecipe` is an imported function, not a reactive signal,
// so the call must be preserved. The bug treated any zero-arg call as a signal read and stripped
// the `()` (or emitted `.value`), inlining the recipe function source into the class attribute.

import { describe, it, expect } from "vitest";
import { compileToChecked } from "../../../../testing/codegen.ts";

describe("RecipeNoArgs: zero-arg recipe call on class is preserved", () => {
  it("React: keeps the recipe call rather than inlining the function", async () => {
    const out = await compileToChecked("RecipeNoArgs", "react");
    expect(out).toContain("plainRecipe()");
    expect(out).not.toContain("plainRecipe.value");
  });
});
