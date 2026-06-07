// Real-world codegen assertions for the EVENTS feature area (Vue): author `.ink.tsx` → compile →
// assert the ACTUAL generated Vue code for event-handler wiring, modifiers, and typed payloads.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// EventModifier: <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
// The handler body keeps e.preventDefault(); the signal-setter call is rewritten to a Vue
// template assignment `submitted = true`.
// ---------------------------------------------------------------------------
describe("EventModifier: onSubmit with e.preventDefault() + signal setter", () => {
  it("Vue: @submit handler rewrites the setter to a template assignment (ref model)", async () => {
    const out = await compileTo("EventModifier", "vue");
    // Vue tracks state with `ref`, so the only binding is `submitted` — there is no setter fn.
    expect(out).toContain("const submitted = ref(false)");
    // The setter call is rewritten to a Vue template assignment `submitted = true` (Vue's
    // template compiler unwraps the ref, so no `.value` is needed in the template binding).
    expect(out).toContain('@submit="e => { e.preventDefault(); submitted = true; }"');
    expect(out).not.toContain("setSubmitted"); // the setter identifier is gone entirely
  });
});

// ---------------------------------------------------------------------------
// TypedEvent: <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
// Focus: typed payload access (e.clientX / e.clientY) survives codegen, and per-target event
// name casing/mapping for the mouse-move event.
// ---------------------------------------------------------------------------
describe("TypedEvent: onMouseMove reading e.clientX / e.clientY into a signal", () => {
  it("Vue: setPos rewrites to a template assignment; native @mousemove is correctly lowercased", async () => {
    const out = await compileTo("TypedEvent", "vue");
    expect(out).toContain("const pos = ref({ x: 0, y: 0 })");
    // The setter call is rewritten to the Vue template assignment `pos = { ... }` (ref unwrapped).
    // The native DOM event `mousemove` is emitted lowercase (kebab-case is reserved for component
    // custom events), so `@mousemove` binds the correct event.
    expect(out).toContain('@mousemove="e => pos = { x: e.clientX, y: e.clientY }"');
    expect(out).toContain("{{ pos.x }}");
  });
});
