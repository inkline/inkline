// Real-world codegen assertions for the "slots" feature area (Angular): author `.ink.tsx` with
// `<Slot />` / `defineSlot()` → compile → assert the ACTUAL generated Angular code. Default slot
// lowers to a non-self-closing `<ng-content>`; named slots project via `select=[slot=name]`; slot
// fallback content renders as the `<ng-content>` projection default (Angular 18+).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// --- SlotBasic: a single default <Slot /> ----------------------------------------------------
describe("SlotBasic: default slot", () => {
  it("Angular: default slot → non-self-closing <ng-content>", async () => {
    const out = await compileTo("SlotBasic", "angular");
    // Non-self-closing: self-closed `<ng-content />` breaks Angular's JIT template parsing.
    expect(out).toContain("<ng-content></ng-content>");
  });
});

// --- SlotNamed: header (named) + default + footer (named) ------------------------------------
describe("SlotNamed: named slots alongside the default", () => {
  it("Angular: named slots project via select=[slot=name]", async () => {
    const out = await compileTo("SlotNamed", "angular");
    expect(out).toContain('<ng-content select="[slot=header]"></ng-content>');
    expect(out).toContain('<ng-content select="[slot=footer]"></ng-content>');
    expect(out).toContain("<ng-content></ng-content>");
  });
});

// --- SlotWithFallback: <Slot name="header"><h1/></Slot> + <Slot>text</Slot> ------------------
describe("SlotWithFallback: slot fallback content", () => {
  it("Angular: fallback content renders as the <ng-content> projection default", async () => {
    // The authored fallback (`<h1>Default Header</h1>`, "Default body content") is emitted as the
    // content of a non-self-closing <ng-content>, shown when nothing is projected (Angular 18+).
    const out = await compileTo("SlotWithFallback", "angular");
    expect(out).toContain('<ng-content select="[slot=header]">');
    expect(out).toContain("Default Header");
    expect(out).toContain("Default body content");
    expect(out).not.toContain("<ng-content />");
  });
});

// --- DefineSlotBasic: defineSlot("header") + defineSlot() rendered via {expr} -----------------
describe("DefineSlotBasic: defineSlot() bindings", () => {
  it("Angular: defineSlot bindings resolve to ng-content projection", async () => {
    const out = await compileTo("DefineSlotBasic", "angular");
    expect(out).toContain('<ng-content select="[slot=header]"></ng-content>');
    expect(out).toContain("<ng-content></ng-content>");
  });
});
