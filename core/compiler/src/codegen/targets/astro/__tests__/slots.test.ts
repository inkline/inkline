// Astro codegen for the "slots" feature area: author `.ink.tsx` with `<Slot />` / `defineSlot()`
// → compile → assert the ACTUAL generated Astro code. Focus: native `<slot>` projection, named
// slots, and slot fallback content emitted as the slot's default children.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// --- SlotWithFallback: <Slot name="header"><h1/></Slot> + <Slot>text</Slot> ------------------
describe("SlotWithFallback: slot fallback content", () => {
  it("Astro: fallback content renders as the <slot> default (non-self-closing)", async () => {
    // Astro natively supports fallback content between <slot>...</slot>; codegen emits the authored
    // defaults as the slot's children, shown when nothing is projected (matching Vue/Svelte).
    const out = await compileTo("SlotWithFallback", "astro");
    expect(out).toContain('<slot name="header">');
    expect(out).toContain("Default Header");
    expect(out).toContain("Default body content");
    expect(out).not.toContain('<slot name="header" />');
  });
});

// --- SlotWithDefault: declared `slots: { default, actions }` + default slot fallbacks ---------
describe("SlotWithDefault: declared default slot + named actions slot", () => {
  it("Astro: named-slot fallback renders (non-self-closing <slot> with default content)", async () => {
    // Astro renders fallback between <slot>...</slot>; the `<span>Action area</span>` and
    // `<p>Default content</p>` defaults are emitted as each slot's children.
    const out = await compileTo("SlotWithDefault", "astro");
    expect(out).toContain('<slot name="actions">');
    expect(out).toContain("Action area");
    expect(out).toContain("Default content");
    expect(out).not.toContain("<slot />");
  });
});

// --- SlotInConditional: <Slot name="header" /> + <Show><Slot /></Show> ------------------------
describe("SlotInConditional: default slot inside a Show/conditional", () => {
  it("Astro: conditional references `expanded` that is never declared in frontmatter", async () => {
    // BUG: the signal `expanded` is declared in every other target (useState/ref/createSignal/
    // $state/signal/useSignal) but the Astro frontmatter only declares `__attrs` — there is no
    // `const expanded = ...`. The template then evaluates `{expanded ? (<slot />) : null}`, an
    // unbound reference that throws "expanded is not defined" at render time.
    const out = await compileTo("SlotInConditional", "astro");
    expect(out).toContain("{expanded ? (<slot />) : null}");
    expect(out).not.toContain("const expanded");
  });
});
