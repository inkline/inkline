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

// ---------------------------------------------------------------------------
// DuplicateEvent: `change` declared in both the options `events` object and `defineEmits`.
// Focus: the merge keeps ONE callback prop per name, and the surviving declaration is the
// `defineEmits` one — the only source that can carry a payload tuple. `close`, declared in the
// options object alone, keeps the untyped fallback signature.
// ---------------------------------------------------------------------------
describe("DuplicateEvent: the same event declared in options and defineEmits", () => {
  it("React: one callback prop per name; the defineEmits payload type wins", async () => {
    const out = await compileTo("DuplicateEvent", "react");
    expect(out).toContain(
      "props: { onChange?: (value: string) => void; onClose?: (...args: any[]) => void }",
    );
    expect(out).toContain("const { onChange, onClose, ...__attrs } = props");
  });
});
