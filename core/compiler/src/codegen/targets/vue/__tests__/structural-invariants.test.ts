// Cross-target structural invariants for the Vue target: compile real `.ink.tsx` fixtures and
// assert the generated Vue output keeps its framework-defining shape (SFC structure, class
// attribute, event syntax).

import { describe, it, expect } from "vitest";
import { compileTo, CORE_FIXTURES } from "../../../../testing/codegen.ts";

describe("cross-target structural invariants", () => {
  it("Vue output is a valid SFC structure", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await compileTo(fixture, "vue");
      expect(code).toContain("<script setup");
      expect(code).toContain("</script>");
      expect(code).toContain("<template>");
      expect(code).toContain("</template>");
    }
  });

  it("Vue uses class (not className) for class attribute", async () => {
    const code = await compileTo("ConditionalClass", "vue");
    expect(code).not.toContain("className");
  });

  it("Vue uses kebab events (@click)", async () => {
    const code = await compileTo("Composite", "vue");
    expect(code).toContain("@click");
  });
});
