// Qwik codegen assertions for the EVENTS feature area: author `.ink.tsx` → compile →
// assert the ACTUAL generated Qwik code for event-handler wiring, modifiers, and typed payloads.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// EventModifier: <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
// The handler body keeps e.preventDefault(); the signal-setter call is rewritten to the
// Qwik signal write `submitted.value = true`.
// ---------------------------------------------------------------------------
describe("EventModifier: onSubmit with e.preventDefault() + signal setter", () => {
  it("Qwik: onSubmit handler is single-wrapped by $() and writes submitted.value", async () => {
    const out = await compileTo("EventModifier", "qwik");
    expect(out).toContain("const submitted = useSignal(false)");
    // The handler is single-wrapped in $() — `$(e => ...)` IS the handler (no extra arrow), and
    // the setter call is rewritten to the signal write `submitted.value = true`.
    expect(out).toContain("onSubmit={$(e => { e.preventDefault(); submitted.value = true; })}");
    expect(out).toContain('{submitted.value ? "Done" : "Pending"}');
  });
});

// ---------------------------------------------------------------------------
// TypedEvent: <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
// Focus: typed payload access (e.clientX / e.clientY) survives codegen, and per-target event
// name casing/mapping for the mouse-move event.
// ---------------------------------------------------------------------------
describe("TypedEvent: onMouseMove reading e.clientX / e.clientY into a signal", () => {
  it("Qwik: onMouseMove single-wrapped in $() and setPos rewritten to pos.value", async () => {
    const out = await compileTo("TypedEvent", "qwik");
    expect(out).toContain("const pos = useSignal({ x: 0, y: 0 })");
    // Single-wrapped `$(e => ...)` IS the handler, and the setter call is rewritten to the signal
    // write `pos.value = { ... }`.
    expect(out).toContain("onMouseMove={$(e => pos.value = { x: e.clientX, y: e.clientY })}");
    expect(out).toContain("{pos.value.x}");
  });
});
