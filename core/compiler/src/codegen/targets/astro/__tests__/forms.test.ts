// Astro form-control codegen: signal state declared in frontmatter and two-way
// binding setters rewritten to direct reassignment.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Astro: signal state declared in frontmatter + setter rewritten to assignment", () => {
  it('frontmatter declares `let value = ""`; handler reassigns it directly', async () => {
    const out = await compileTo("FormField", "astro");
    // Frontmatter declares props/__attrs alongside the signal state as a `let` binding.
    expect(out).toContain("const { ...__attrs } = props;");
    expect(out).toContain(`let value = ""`);
    // Setter is rewritten to a direct reassignment; the identifier is declared in scope.
    expect(out).toContain(`<input value={value} onInput={e => value = e.target.value} />`);
    expect(out).toContain("{value}");
  });

  it("checkbox declares `let checked = false`; handler reassigns it directly", async () => {
    const out = await compileTo("TwoWayCheckbox", "astro");
    expect(out).toContain("let checked = false");
    expect(out).toContain(
      `<input type="checkbox" checked={checked} onChange={() => checked = !checked} />`,
    );
  });
});
