// Astro control-flow codegen: conditional rendering and memoized conditional reads.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// Conditional: <Show when fallback> per-target if/else syntax
// ---------------------------------------------------------------------------
describe("Conditional: Show/when/fallback control flow", () => {
  // Astro declares signal state in the frontmatter as `let visible = <initial>`
  // and rewrites the setter call to a direct assignment, so `visible` is in
  // scope for the template ternary.
  it("Astro: declares `visible` state in frontmatter and rewrites setter to direct assignment", async () => {
    const out = await compileTo("Conditional", "astro");
    expect(out).toContain("const { ...__attrs } = props;");
    expect(out).toContain("let visible = true");
    expect(out).toContain("{visible ? (<span>");
    expect(out).toContain("onClick={() => visible = !visible}");
  });
});

// ---------------------------------------------------------------------------
// ConditionalRead: createMemo over a conditional read of two signals
// ---------------------------------------------------------------------------
describe("ConditionalRead: memoized conditional read", () => {
  // Astro declares each signal as `let <name> = <initial>` in the frontmatter,
  // so the hoisted memo `const value = (flag ? a : b)` resolves its reads.
  it("Astro: memo reads frontmatter-declared signal identifiers", async () => {
    const out = await compileTo("ConditionalRead", "astro");
    expect(out).toContain("let flag = true");
    expect(out).toContain("let a = 10");
    expect(out).toContain("let b = 20");
    expect(out).toContain("const value = (flag ? a : b)");
  });
});
