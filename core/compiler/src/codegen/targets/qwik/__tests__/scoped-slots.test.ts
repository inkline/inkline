// Scoped / render-prop slot codegen for the Qwik target: how scoped slot args
// are handled when `children`/`Slot` projects JSX rather than a render function.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// SlotScopedSingle: a DEFAULT scoped slot `<Slot args={[value()]}>` with fallback.
// ---------------------------------------------------------------------------
describe("SlotScopedSingle: default scoped slot with args={[value()]}", () => {
  it("Qwik: default scoped slot renders the fallback (children is JSX, not callable)", async () => {
    const out = await compileTo("SlotScopedSingle", "qwik");
    // Qwik's `children`/`Slot` projects JSX and is not a render function, so the scoped arg can't be
    // passed. Best-effort: the authored fallback `<span>{value.value}</span>` renders.
    expect(out).toContain("const { children, ...__attrs } = props");
    expect(out).toContain("{value.value}");
    expect(out).not.toContain("props.children?.(");
  });
});
