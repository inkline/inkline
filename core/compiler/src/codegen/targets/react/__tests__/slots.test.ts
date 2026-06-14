// Real-world codegen assertions for the "slots" feature area (React target): author `.ink.tsx`
// with `<Slot />` / `defineSlot()` → compile → assert the ACTUAL generated React code. Focus: the
// default slot (→ `children`), named slots (→ node props, or function props when scoped), and slot
// fallback content.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// --- SlotBasic: a single default <Slot /> ----------------------------------------------------
describe("SlotBasic: default slot", () => {
  it("React: default slot lowers to props.children", async () => {
    const out = await compileTo("SlotBasic", "react");
    expect(out).toContain("children?: React.ReactNode");
    expect(out).toContain("{props.children}");
  });
});

// --- SlotNamed: header (named) + default + footer (named) ------------------------------------
describe("SlotNamed: named slots alongside the default", () => {
  it("React: named slots become node props; default stays children", async () => {
    const out = await compileTo("SlotNamed", "react");
    expect(out).toContain("{props.header}");
    expect(out).toContain("{props.children}");
    expect(out).toContain("{props.footer}");
  });
});

// --- SlotWithFallback: <Slot name="header"><h1/></Slot> + <Slot>text</Slot> ------------------
describe("SlotWithFallback: slot fallback content", () => {
  it("React: fallback emitted via ?? after the node prop / children", async () => {
    const out = await compileTo("SlotWithFallback", "react");
    expect(out).toContain("{props.header ?? <h1>Default Header</h1>}");
    expect(out).toContain('{props.children ?? "Default body content"}');
  });
});

// --- DefineSlotBasic: defineSlot("header") + defineSlot() rendered via {expr} -----------------
describe("DefineSlotBasic: defineSlot() bindings", () => {
  it("React: defineSlot('header') → header node prop; defineSlot() → children", async () => {
    const out = await compileTo("DefineSlotBasic", "react");
    expect(out).toContain("{props.header}");
    expect(out).toContain("{props.children}");
  });
});

// --- SlotInConditional: <Slot name="header" /> + <Show><Slot /></Show> ------------------------
describe("SlotInConditional: default slot inside a Show/conditional", () => {
  it("React: header slot + ternary-gated default slot", async () => {
    const out = await compileTo("SlotInConditional", "react");
    expect(out).toContain("{props.header}");
    expect(out).toContain("{expanded ? props.children : null}");
  });
});
