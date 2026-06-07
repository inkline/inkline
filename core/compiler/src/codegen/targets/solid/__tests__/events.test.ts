// Solid codegen assertions for the EVENTS feature area: author `.ink.tsx` → compile →
// assert the ACTUAL generated Solid code for event-handler wiring, modifiers, and typed payloads.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// EventModifier: <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
// The handler body keeps e.preventDefault(); the signal-setter call is rewritten per target:
// Solid keeps `setSubmitted(true)` (tuple model), and lowercases the DOM event prop to onsubmit.
// ---------------------------------------------------------------------------
describe("EventModifier: onSubmit with e.preventDefault() + signal setter", () => {
  it("Solid: setter exists via createSignal; event name lowercased to onsubmit; reads call submitted()", async () => {
    const out = await compileTo("EventModifier", "solid");
    expect(out).toContain("const [submitted, setSubmitted] = createSignal(false)");
    // Solid lowercases the DOM event prop.
    expect(out).toContain("onsubmit={e => { e.preventDefault(); setSubmitted(true); }}");
    expect(out).toContain('{submitted() ? "Done" : "Pending"}');
  });
});

// ---------------------------------------------------------------------------
// TypedEvent: <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
// Focus: typed payload access (e.clientX / e.clientY) survives codegen, and per-target event
// name casing/mapping for the mouse-move event.
// ---------------------------------------------------------------------------
describe("TypedEvent: onMouseMove reading e.clientX / e.clientY into a signal", () => {
  it("Solid: event prop lowercased to onmousemove; reads call pos()", async () => {
    const out = await compileTo("TypedEvent", "solid");
    expect(out).toContain("onmousemove={e => setPos({ x: e.clientX, y: e.clientY })}");
    expect(out).toContain("{pos().x}");
  });
});
