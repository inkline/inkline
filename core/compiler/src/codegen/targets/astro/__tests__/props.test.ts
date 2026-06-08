// Astro codegen assertions for the "props" feature area: author `.ink.tsx` → compile → assert the
// ACTUAL generated Astro code for prop declaration/types, the object form with defaults, fragment
// roots, and text siblings around an element.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("PropDefaults: object form `{ props: { color: 'blue', size: Number } }`", () => {
  // The author used the object/options form, which conveys a DEFAULT ("blue") for color and a
  // runtime constructor type (Number) for size.
  it("Astro: resolves the prop types and applies the `color` default in the frontmatter", async () => {
    const out = await compileTo("PropDefaults", "astro");
    // Types are resolved (`color?: string`, `size: number`), and the default is applied in the
    // frontmatter destructure so an omitted `color` resolves to "blue".
    expect(out).toContain("type Props = { color?: string; size: number } & Record<string, any>");
    expect(out).toContain('const { color = "blue", size, ...__attrs } = props;');
  });
});

describe("FragmentRoot: `<>...</>` root with no props", () => {
  it("Astro: fragment unwraps to bare sibling roots (no wrapper element)", async () => {
    const astro = await compileTo("FragmentRoot", "astro");
    expect(astro).toContain("<h1>");
    expect(astro).not.toContain("<>");
  });
});

describe("TextWithSiblings: text nodes adjacent to an element + a signal read", () => {
  it('Astro declares the signal state as `let name = "world"` in the frontmatter and reads `{name}` in the template', async () => {
    const out = await compileTo("TextWithSiblings", "astro");
    // The signal state is declared in the frontmatter as a plain `let` binding, so the template's
    // `{name}` reference resolves to a real value at render time.
    expect(out).toContain('let name = "world"');
    expect(out).toContain("{name}");
  });
});
