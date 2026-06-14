// Real-world codegen assertions for the "slots" feature area (qwik): author `.ink.tsx` with
// `<Slot />` / `defineSlot()` → compile → assert the ACTUAL generated Qwik code. The default slot
// projects through Qwik's native <Slot/> (props.children is never populated); named slots are props
// (a node prop, or a function prop when scoped), with fallback via `?? <fallback>`.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// --- SlotWithDefault: declared `slots: { default, actions }` + default slot fallbacks ---------
describe("SlotWithDefault: declared default slot + named actions slot", () => {
  it("Qwik: default slot → <Slot> with fallback; named actions → {props.actions}", async () => {
    // The default slot projects through Qwik's native <Slot/> (props.children is never populated),
    // and `Slot` is added to the @qwik.dev/core import. The named `actions` slot is a node prop.
    const out = await compileTo("SlotWithDefault", "qwik");
    expect(out).toContain("<Slot>");
    expect(out).toContain("Default content");
    expect(out).toContain("{props.actions");
    expect(out).toContain("Action area");
    expect(out).toContain('Slot } from "@qwik.dev/core"');
    expect(out).not.toContain("props.children");
  });
});
