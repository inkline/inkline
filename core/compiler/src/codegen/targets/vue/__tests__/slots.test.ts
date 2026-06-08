// Vue slots codegen: default slot lowers to a native <slot />, named slots keep their name, slot
// fallback content is preserved as <slot> children, defineSlot() bindings resolve to native
// named/default slots, and conditional default slots become v-if on the <slot>.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// --- SlotBasic: a single default <Slot /> ----------------------------------------------------
describe("SlotBasic: default slot", () => {
  it("Vue: default slot is a native <slot />", async () => {
    const out = await compileTo("SlotBasic", "vue");
    expect(out).toContain("<slot />");
  });
});

// --- SlotNamed: header (named) + default + footer (named) ------------------------------------
describe("SlotNamed: named slots alongside the default", () => {
  it("Vue: named slots keep their name; default is unnamed", async () => {
    const out = await compileTo("SlotNamed", "vue");
    expect(out).toContain('<slot name="header" />');
    expect(out).toContain("<slot />");
    expect(out).toContain('<slot name="footer" />');
  });
});

// --- SlotWithFallback: <Slot name="header"><h1/></Slot> + <Slot>text</Slot> ------------------
describe("SlotWithFallback: slot fallback content", () => {
  it("Vue: fallback preserved as <slot> children", async () => {
    const out = await compileTo("SlotWithFallback", "vue");
    expect(out).toContain('<slot name="header">');
    expect(out).toContain("Default Header");
    expect(out).toContain("Default body content");
  });
});

// --- DefineSlotBasic: defineSlot("header") + defineSlot() rendered via {expr} -----------------
describe("DefineSlotBasic: defineSlot() bindings", () => {
  it("Vue: defineSlot bindings resolve to native named/default slots", async () => {
    const out = await compileTo("DefineSlotBasic", "vue");
    expect(out).toContain('<slot name="header" />');
    expect(out).toContain("<slot />");
  });
});

// --- SlotInConditional: <Slot name="header" /> + <Show><Slot /></Show> ------------------------
describe("SlotInConditional: default slot inside a Show/conditional", () => {
  it("Vue: conditional becomes v-if on the default <slot>", async () => {
    const out = await compileTo("SlotInConditional", "vue");
    expect(out).toContain('<slot v-if="expanded" />');
  });
});
