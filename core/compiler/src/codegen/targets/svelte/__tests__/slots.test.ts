// Svelte codegen assertions for the "slots" feature area: author `.ink.tsx` with `<Slot />` /
// `defineSlot()` → compile → assert the ACTUAL generated Svelte code (native `<slot>` with fallback).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// --- SlotWithFallback: <Slot name="header"><h1/></Slot> + <Slot>text</Slot> ------------------
describe("SlotWithFallback: slot fallback content", () => {
  it("Svelte: fallback preserved as <slot> children", async () => {
    const out = await compileTo("SlotWithFallback", "svelte");
    expect(out).toContain('<slot name="header">');
    expect(out).toContain("Default Header");
    expect(out).toContain("Default body content");
  });
});
