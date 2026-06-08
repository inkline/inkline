// Solid cross-target structural invariants: compile each fixture through the real pipeline and
// assert framework-shape properties of the generated Solid source (no foreign imports, `class`
// over `className`, lowercase DOM events).

import { describe, it, expect } from "vitest";
import { CORE_FIXTURES, compileTo } from "../../../../testing/codegen.ts";

describe("cross-target structural invariants", () => {
  it("Solid output never imports from wrong frameworks", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await compileTo(fixture, "solid");
      expect(code).not.toContain('from "react"');
      expect(code).not.toContain('from "vue"');
      expect(code).not.toContain("useState");
      expect(code).not.toContain("$state");
    }
  });

  it("Solid uses class (not className) for class attribute", async () => {
    const code = await compileTo("ConditionalClass", "solid");
    expect(code).not.toContain("className");
  });

  it("Solid uses lowercase events (onclick)", async () => {
    const code = await compileTo("Counter", "solid");
    expect(code).toContain("onclick");
  });
});
