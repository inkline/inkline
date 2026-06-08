// Real-world codegen assertions for the "slots" feature area (qwik): author `.ink.tsx` with
// `<Slot />` / `defineSlot()` → compile → assert the ACTUAL generated Qwik code. Qwik projects
// through its native <Slot/> (props.children is never populated); fallback content becomes the
// <Slot>'s children.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// --- SlotWithDefault: declared `slots: { default, actions }` + default slot fallbacks ---------
describe("SlotWithDefault: declared default slot + named actions slot", () => {
  it("Qwik: default slot → <Slot> with fallback; named actions → <Slot name='actions'>", async () => {
    // Qwik projects through its native <Slot/> (props.children is never populated). The authored
    // fallback becomes the <Slot>'s children, and `Slot` is added to the @qwik.dev/core import.
    const out = await compileTo("SlotWithDefault", "qwik");
    expect(out).toContain("<Slot>");
    expect(out).toContain("Default content");
    expect(out).toContain('<Slot name="actions">');
    expect(out).toContain("Action area");
    expect(out).toContain('Slot } from "@qwik.dev/core"');
    expect(out).not.toContain("props.children");
  });
});
