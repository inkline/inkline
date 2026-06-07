// Qwik codegen assertions for the "loops" feature area: author `.ink.tsx` with `<For>` /
// native `.map()` → compile through the full pipeline → assert the ACTUAL generated Qwik code.
// Focus: list rendering over `.value`, fragment wrapping, and setter wiring in `$()` handlers.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("MapInExpression: native .map() with a literal `key` prop (no <For>)", () => {
  it("Qwik: maps over `.value` and wraps each row in a fragment", async () => {
    const out = await compileTo("MapInExpression", "qwik");
    expect(out).toContain("{tags.value.map((t) => (<><span>{t}</span></>))}");
  });
});

describe("DynamicList: <For> driven by mutable state + event handlers", () => {
  it("Qwik: list-add handler is single-wrapped in $() with setters rewritten to .value", async () => {
    const out = await compileTo("DynamicList", "qwik");
    // The list maps over `.value` (fine):
    expect(out).toContain("{items.value.map((item, i) => (<><li>{item}</li></>))}");
    // Event handler is single-wrapped: `$(() => <handler>)` and the setters are rewritten to
    // direct `.value` assignments for Qwik signals.
    expect(out).toContain(
      'onClick={$(() => { items.value = [...items.value, input.value]; input.value = ""; })}',
    );
    expect(out).toContain("onInput={$(e => input.value = e.target.value)}");
  });
});
