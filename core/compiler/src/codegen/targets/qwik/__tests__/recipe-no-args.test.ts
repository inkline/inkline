// Regression: a zero-arg call to an imported styleframe recipe (`plainRecipe()`) bound on `class`,
// the shape of styled `IInputAppend`. `plainRecipe` is an imported function, not a reactive signal,
// so the call must be preserved. The bug treated any zero-arg call as a signal read and stripped
// the `()` (or emitted `.value`), inlining the recipe function source into the class attribute.
// On Qwik specifically the bug read it as the signal form `plainRecipe.value`.

import { describe, it, expect } from "vitest";
import { compileToChecked } from "../../../../testing/codegen.ts";

describe("RecipeNoArgs: zero-arg recipe call on class is preserved", () => {
  it("Qwik: keeps the recipe call rather than reading .value", async () => {
    const out = await compileToChecked("RecipeNoArgs", "qwik");
    expect(out).toContain("plainRecipe()");
    expect(out).not.toContain("plainRecipe.value");
  });
});
