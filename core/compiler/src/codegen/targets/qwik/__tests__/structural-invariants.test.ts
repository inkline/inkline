// Cross-target structural invariants for the Qwik target: every core fixture's
// output must carry the Qwik component marker and import from @qwik.dev/core.
import { describe, it, expect } from "vitest";
import { compileTo, CORE_FIXTURES } from "../../../../testing/codegen.ts";

describe("cross-target structural invariants", () => {
  it("Qwik output contains component$ from @qwik.dev/core", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await compileTo(fixture, "qwik");
      expect(code).toContain("component$");
      expect(code).toContain("@qwik.dev/core");
    }
  });
});
