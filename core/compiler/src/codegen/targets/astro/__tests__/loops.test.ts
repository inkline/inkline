// Real-world Astro codegen assertions for the "loops" feature area: author `.ink.tsx` with `<For>` /
// native `.map()` → compile through the full pipeline → assert the ACTUAL generated Astro code.
// Focus: signal state declared as frontmatter `let`, list rendering, and setter rewriting at SSR.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("ForLoop: <For each> with a string key extractor", () => {
  it("Astro: declares the signal state as a plain `let` in the frontmatter and maps it in the template", async () => {
    const out = await compileTo("ForLoop", "astro");
    // The Astro target now declares signal state as `let items = <initial>` in the frontmatter, so the
    // `items.map(...)` reference in the template resolves at SSR instead of throwing a ReferenceError.
    expect(out).toContain('let items = ["Apple", "Banana", "Cherry"]');
    expect(out).toContain("{items.map((item) => (");
  });
});

describe("List: <For> alongside a mutating button", () => {
  it("Astro: declares the list as a frontmatter `let` and rewrites the setter to a direct assignment", async () => {
    const out = await compileTo("List", "astro");
    // Signal state is declared as a plain frontmatter `let`, and the template maps over it at SSR.
    expect(out).toContain('let items = ["A", "B"]');
    expect(out).toContain("{items.map((item) => (");
    // The setter `setItems([...items, "C"])` is rewritten to a direct assignment for Astro.
    expect(out).toContain('items = [...items, "C"]');
  });
});
