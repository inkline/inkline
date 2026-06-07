// React codegen assertions for the EVENTS feature area: author `.ink.tsx` → compile →
// assert the ACTUAL generated React code for event-handler wiring, modifiers, and typed payloads.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// EventModifier: <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
// The handler body keeps e.preventDefault(); React keeps `setSubmitted(true)` (tuple model).
// ---------------------------------------------------------------------------
describe("EventModifier: onSubmit with e.preventDefault() + signal setter", () => {
  it("React: block-body onSubmit; setter exists via useState; preventDefault preserved", async () => {
    const out = await compileTo("EventModifier", "react");
    expect(out).toContain("const [submitted, setSubmitted] = useState(false)");
    expect(out).toContain("onSubmit={e => { e.preventDefault(); setSubmitted(true); }}");
    expect(out).toContain('{submitted ? "Done" : "Pending"}');
  });
});

// ---------------------------------------------------------------------------
// TypedEvent: <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
// Focus: typed payload access (e.clientX / e.clientY) survives codegen, and the React event
// name casing for the mouse-move event.
// ---------------------------------------------------------------------------
describe("TypedEvent: onMouseMove reading e.clientX / e.clientY into a signal", () => {
  it("React: onMouseMove preserved (camelCase); typed payload access intact", async () => {
    const out = await compileTo("TypedEvent", "react");
    expect(out).toContain("const [pos, setPos] = useState({ x: 0, y: 0 })");
    expect(out).toContain("onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}");
    // Object-field reads in the template do not call the signal.
    expect(out).toContain("{pos.x}");
  });
});
