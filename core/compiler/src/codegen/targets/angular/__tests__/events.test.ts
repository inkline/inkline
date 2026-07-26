// Angular codegen assertions for the EVENTS feature area: author `.ink.tsx` → compile →
// assert the ACTUAL generated Angular code for event-handler wiring, modifiers, and typed payloads.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// EventModifier: <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
// The handler body keeps e.preventDefault(); Angular lowers the signal-setter call to a statement
// with the handler param mapped to `$event` and the write becoming `submitted.set(true)`.
// ---------------------------------------------------------------------------
describe("EventModifier: onSubmit with e.preventDefault() + signal setter", () => {
  it("Angular: (submit) binds a statement that calls submitted.set, with $event mapped", async () => {
    const out = await compileTo("EventModifier", "angular");
    expect(out).toContain("submitted = signal(false)");
    // The block-body handler is lowered to a statement expression: the handler param `e` is mapped
    // to Angular's `$event`, and the setter call becomes the signal write `submitted.set(true)`.
    expect(out).toContain('(submit)="$event.preventDefault(); submitted.set(true)"');
    // The setter identifier never leaks into the output.
    expect(out).not.toContain("setSubmitted");
  });
});

// ---------------------------------------------------------------------------
// TypedEvent: <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
// Focus: typed payload access (e.clientX / e.clientY) survives codegen, and Angular event
// name mapping for the mouse-move event.
// ---------------------------------------------------------------------------
describe("TypedEvent: onMouseMove reading e.clientX / e.clientY into a signal", () => {
  it("Angular: (mousemove) binds a statement calling pos.set, with $event mapped into the payload", async () => {
    const out = await compileTo("TypedEvent", "angular");
    expect(out).toContain("pos = signal({ x: 0, y: 0 })");
    // The handler is lowered to a statement: the setter becomes `pos.set(...)` and the handler
    // param `e` is mapped to Angular's `$event` (so `e.clientX` → `$event.clientX`).
    expect(out).toContain('(mousemove)="pos.set({ x: $event.clientX, y: $event.clientY })"');
  });
});

// ---------------------------------------------------------------------------
// SetupHandlers: a no-arg setup-local handler bound by reference — onClick={onToggle}.
// Angular event bindings are statements, so a bare reference `(click)="onToggle"` is evaluated
// and discarded — the handler never fires. The binding MUST be emitted as an invocation
// `(click)="onToggle($event)"`. Regression guard for the S2 blocker.
// ---------------------------------------------------------------------------
describe("SetupHandlers: no-arg setup-local handler bound by reference", () => {
  it("Angular: (click) invokes the hoisted handler instead of binding a bare reference", async () => {
    const out = await compileTo("SetupHandlers", "angular");
    // The handler definition is emitted as a class field.
    expect(out).toContain("onToggle = () => this.open.set(!this.open())");
    // The DOM binding invokes it — a statement that actually fires the handler.
    expect(out).toContain('(click)="onToggle($event)"');
    // A bare, un-invoked reference (the bug) must never appear.
    expect(out).not.toContain('(click)="onToggle"');
    expect(out).not.toContain('(click)="onReset"');
    // The function-declaration handler is likewise invoked.
    expect(out).toContain('(click)="onReset($event)"');
    // The already-parametrized For-row handler stays a call expression (not double-invoked).
    expect(out).toContain('(click)="onSelect(option)"');
  });
});
