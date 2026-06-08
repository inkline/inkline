// Cross-target structural invariants for the Angular target: compile real `.ink.tsx` fixtures and
// assert the generated Angular output keeps its framework-defining shape (@Component decorator,
// @angular/core imports, and no foreign-framework imports).

import { describe, it, expect } from "vitest";
import { compileTo, CORE_FIXTURES } from "../../../../testing/codegen.ts";

describe("cross-target structural invariants", () => {
  it("Angular output contains @Component decorator", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await compileTo(fixture, "angular");
      expect(code).toContain("@Component");
    }
  });

  it("Angular output imports from @angular/core", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await compileTo(fixture, "angular");
      expect(code).toContain("@angular/core");
      expect(code).not.toContain('from "react"');
      expect(code).not.toContain('from "solid-js"');
      expect(code).not.toContain('from "vue"');
    }
  });
});
