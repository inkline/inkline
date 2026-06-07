// Svelte codegen structural invariants: compile the core fixtures → assert the ACTUAL generated
// Svelte output keeps its framework-specific shape (script tag, class attribute, lowercase events).

import { describe, it, expect } from "vitest";
import { compileTo, CORE_FIXTURES } from "../../../../testing/codegen.ts";

describe("cross-target structural invariants", () => {
  it("Svelte output has <script> tag", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await compileTo(fixture, "svelte");
      expect(code).toContain("<script");
      expect(code).toContain("</script>");
    }
  });

  it("Svelte uses class (not className) for class attribute", async () => {
    const code = await compileTo("ConditionalClass", "svelte");
    expect(code).not.toContain("className");
  });

  it("Svelte uses lowercase events (onclick)", async () => {
    const code = await compileTo("Counter", "svelte");
    expect(code).toContain("onclick");
  });
});
