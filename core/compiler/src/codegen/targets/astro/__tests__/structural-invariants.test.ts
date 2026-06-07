// Cross-target structural invariants for Astro: assert the high-level shape of the generated
// source (frontmatter delimiters) holds across every core fixture.

import { describe, it, expect } from "vitest";
import { CORE_FIXTURES, compileTo } from "../../../../testing/codegen.ts";

describe("cross-target structural invariants", () => {
  it("Astro output contains --- frontmatter delimiters", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await compileTo(fixture, "astro");
      expect(code).toContain("---");
    }
  });
});
