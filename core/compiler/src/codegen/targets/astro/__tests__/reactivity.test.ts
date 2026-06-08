// Astro reactivity codegen: signal/memo/effect dependency wiring in the
// frontmatter, with setter calls rewritten to direct assignments.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Counter: signal + memo + effect dependency wiring", () => {
  it("Astro: declares signal state in the frontmatter and rewrites the setter to a direct assignment", async () => {
    const out = await compileTo("Counter", "astro");
    // signal state is declared as a plain `let` in the frontmatter, so the
    // derived value and the template read a real binding (no undefined `count`).
    expect(out).toContain("let count = 0");
    expect(out).toContain("const doubled = count * 2");
    expect(out).toContain("{count}");
    // the setter call is rewritten to a direct assignment; `setCount` is gone.
    expect(out).toContain("count = count + 1");
    expect(out).not.toContain("setCount");
  });
});
