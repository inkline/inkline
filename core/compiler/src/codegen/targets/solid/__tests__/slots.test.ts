// Real-world codegen assertions for the "slots" feature area (Solid target): author `.ink.tsx`
// with `<Slot />` / `defineSlot()` → compile → assert the ACTUAL generated Solid code. The default
// slot lowers to `props.children` (kept out of `__attrs` fallthrough) and named slots become props
// by name.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// --- SlotBasic: a single default <Slot /> ----------------------------------------------------
describe("SlotBasic: default slot", () => {
  it("Solid: default slot → props.children, kept out of __attrs fallthrough", async () => {
    const out = await compileTo("SlotBasic", "solid");
    expect(out).toContain('splitProps(props, ["children"])');
    expect(out).toContain("{props.children}");
  });
});

// --- SlotNamed: header (named) + default + footer (named) ------------------------------------
describe("SlotNamed: named slots alongside the default", () => {
  it("Solid: named slots become props by name, default is children", async () => {
    const out = await compileTo("SlotNamed", "solid");
    expect(out).toContain('splitProps(props, ["header", "children", "footer"])');
    expect(out).toContain("{props.header}");
    expect(out).toContain("{props.footer}");
  });
});

// --- SlotWithDefault: declared `slots: { default, actions }` + default slot fallbacks ---------
describe("SlotWithDefault: declared default slot + named actions slot", () => {
  it("Solid: default slot → children with fallback; named actions → prop", async () => {
    const out = await compileTo("SlotWithDefault", "solid");
    expect(out).toContain("{props.children ?? <p>Default content</p>}");
    expect(out).toContain("{props.actions ?? <span>Action area</span>}");
  });
});

// --- SlotInConditional: <Slot name="header" /> + <Show><Slot /></Show> ------------------------
describe("SlotInConditional: default slot inside a Show/conditional", () => {
  it("Solid: default slot nested inside <Show when={expanded()}>", async () => {
    const out = await compileTo("SlotInConditional", "solid");
    expect(out).toContain("<Show when={expanded()}>");
    expect(out).toContain("{props.children}");
  });
});
