// Angular codegen assertions for the "scoped-slots" feature area: author `.ink.tsx` →
// compile through the full pipeline → assert the ACTUAL generated Angular code.
// Focus: how Angular handles render-prop / scoped slots — args are not projectable, so
// authored fallback content renders best-effort using the @for loop vars / component state.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ScopedSlot: `<For>` with a render-prop child (item, index) => <li>...</li>
// There is no <Slot> here — the render prop is inlined per target.
// ---------------------------------------------------------------------------
describe("ScopedSlot: For render-prop child inlined per target", () => {
  it("Angular: @for declares `item` AND `index`, tracking the extracted key expression", async () => {
    const out = await compileTo("ScopedSlot", "angular");
    // `track` uses the EXTRACTED key expression `item.id` (not a raw arrow), and because the
    // template references `index`, the block declares it via `let index = $index`.
    expect(out).toContain("@for (item of items(); track item.id; let index = $index) {");
    expect(out).toContain("{{ index }}");
    expect(out).toContain("{{ item.label }}");
  });
});

// ---------------------------------------------------------------------------
// SlotScoped: named scoped slot `<Slot name="item" args={[item, index]}>` in a For.
// ---------------------------------------------------------------------------
describe("SlotScoped: named scoped slot with args={[item, index]}", () => {
  it("Angular: scoped slot renders the default content best-effort (args not projectable)", async () => {
    const out = await compileTo("SlotScoped", "angular");
    // Angular has no scoped-slot mechanism, so the `[item, index]` args can't reach a parent
    // override. Best-effort: the authored fallback renders inline — the `@for` loop vars `item`/
    // `index` are in scope — so the component still renders standalone.
    expect(out).toContain("{{ index }}");
    expect(out).toContain("{{ item.label }}");
    expect(out).toContain("args are not projectable in Angular");
  });
});

// ---------------------------------------------------------------------------
// SlotScopedSingle: a DEFAULT scoped slot `<Slot args={[value()]}>` with fallback.
// ---------------------------------------------------------------------------
describe("SlotScopedSingle: default scoped slot with args={[value()]}", () => {
  it("Angular: default scoped slot renders the fallback best-effort (arg not projectable)", async () => {
    const out = await compileTo("SlotScopedSingle", "angular");
    // Best-effort: the `value` arg can't be projected, so the fallback `<span>{{ value() }}</span>`
    // renders (the signal read resolves to the component's own state).
    expect(out).toContain("{{ value() }}");
    expect(out).toContain("args are not projectable in Angular");
  });
});
