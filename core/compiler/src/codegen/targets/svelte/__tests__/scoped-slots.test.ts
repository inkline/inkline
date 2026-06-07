// Real-world codegen assertions for the "scoped-slots" feature area (Svelte target):
// author `.ink.tsx` → compile through the FULL pipeline → assert the ACTUAL generated Svelte code.
// Focus: scoped / render-prop slots and how Svelte threads the slot ARGUMENTS through.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// SlotScoped: named scoped slot `<Slot name="item" args={[item, index]}>` in a For.
// Svelte binds the scope args as named slot props.
// ---------------------------------------------------------------------------
describe("SlotScoped: named scoped slot with args={[item, index]}", () => {
  it("Svelte: named slot binds scope args as item={item} index={index} with fallback", async () => {
    const out = await compileTo("SlotScoped", "svelte");
    expect(out).toContain('<slot name="item" item={item} index={index}>');
    expect(out).toContain("{index}:{item.label}");
  });
});

// ---------------------------------------------------------------------------
// SlotScopedSingle: a DEFAULT scoped slot `<Slot args={[value()]}>` with fallback.
// The single positional arg is synthesized as `prop0` for Svelte.
// ---------------------------------------------------------------------------
describe("SlotScopedSingle: default scoped slot with args={[value()]}", () => {
  it("Svelte: default scoped slot binds the positional arg as prop0={value}", async () => {
    const out = await compileTo("SlotScopedSingle", "svelte");
    expect(out).toContain("<slot prop0={value}>");
    expect(out).toContain("{value}");
  });
});
