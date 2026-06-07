// Astro codegen assertions for the "scoped-slots" feature area: author `.ink.tsx` →
// compile through the FULL pipeline → assert the ACTUAL generated Astro code.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ScopedSlot: `<For>` with a render-prop child (item, index) => <li>...</li>
// There is no <Slot> here — the render prop is inlined per target.
// ---------------------------------------------------------------------------
describe("ScopedSlot: For render-prop child inlined per target", () => {
  it("Astro: the `items` signal is declared as `let items` in the frontmatter and mapped in the body", async () => {
    const out = await compileTo("ScopedSlot", "astro");
    // State is now declared in the frontmatter as `let items = <initial>` (no signal runtime),
    // so the body's `items.map(...)` resolves to a real binding instead of a ReferenceError.
    expect(out).toContain('let items = [{ id: 1, label: "One" }, { id: 2, label: "Two" }]');
    expect(out).toContain("{items.map((item, index) => (<li>");
  });
});

// ---------------------------------------------------------------------------
// SlotScoped: named scoped slot `<Slot name="item" args={[item, index]}>` in a For.
// Astro has no scoped-slot mechanism, so the args can't be projected; the fallback renders.
// ---------------------------------------------------------------------------
describe("SlotScoped: named scoped slot with args={[item, index]}", () => {
  it("Astro: scoped slot renders the default content best-effort (args not projectable)", async () => {
    const out = await compileTo("SlotScoped", "astro");
    // `items` is declared as `let items = <initial>` in the frontmatter and used in the body.
    expect(out).toContain('let items = [{ id: 1, label: "One" }, { id: 2, label: "Two" }]');
    expect(out).toContain("{items.map((item, index) => (<li>");
    // Astro has no scoped-slot mechanism, so the args can't be projected; the fallback renders.
    expect(out).toContain("{index}");
    expect(out).toContain("{item.label}");
    expect(out).toContain("args are not projectable in Astro");
  });
});
