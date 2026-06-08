// Cross-target structural invariants for the React target: output never leaks
// other frameworks' imports/primitives, uses className for class, and camelCase events.
import { describe, it, expect } from "vitest";
import { CORE_FIXTURES, compileTo } from "../../../../testing/codegen.ts";

describe("cross-target structural invariants", () => {
  it("React output never imports from wrong frameworks", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await compileTo(fixture, "react");
      expect(code).not.toContain('from "vue"');
      expect(code).not.toContain('from "solid-js"');
      expect(code).not.toContain("$state");
      expect(code).not.toContain("$derived");
    }
  });

  it("React uses className for class attribute", async () => {
    const code = await compileTo("ConditionalClass", "react");
    expect(code).toContain("className");
    expect(code).not.toMatch(/\bclass=/);
  });

  it("React uses camelCase events (onClick)", async () => {
    const code = await compileTo("Counter", "react");
    expect(code).toContain("onClick");
  });
});
