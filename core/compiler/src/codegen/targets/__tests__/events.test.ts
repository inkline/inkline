// Real-world codegen assertions for the EVENTS feature area: author `.ink.tsx` → compile →
// assert the ACTUAL generated framework code for event-handler wiring, modifiers, and typed
// payloads. These run the full pipeline (parse → lower → analyze → codegen).
//
// Fixtures:
//   EventModifier — onSubmit calls e.preventDefault() then a signal setter (block-body handler).
//   TypedEvent    — onMouseMove reads a typed payload (e.clientX/e.clientY) into a signal setter.
//
// To inspect a fixture's real output while writing assertions, compile it and log the contents:
//   const r = await compileFixture("EventModifier"); console.log(r.files.vue![0].contents);

import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

// ---------------------------------------------------------------------------
// EventModifier: <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
// The handler body is preserved verbatim (incl. e.preventDefault()). The signal-setter call
// inside the handler is the interesting part: React/Solid define `setSubmitted` (tuple model);
// the destructure/`ref`/`$state` targets do NOT, so they emit a dangling identifier.
// ---------------------------------------------------------------------------
describe("EventModifier: onSubmit with e.preventDefault() + signal setter", () => {
  it("React: block-body onSubmit; setter exists via useState; preventDefault preserved", async () => {
    const out = await code("EventModifier", "react");
    expect(out).toContain("const [submitted, setSubmitted] = useState(false)");
    expect(out).toContain("onSubmit={e => { e.preventDefault(); setSubmitted(true); }}");
    expect(out).toContain('{submitted ? "Done" : "Pending"}');
  });

  it("Solid: setter exists via createSignal; event name lowercased to onsubmit; reads call submitted()", async () => {
    const out = await code("EventModifier", "solid");
    expect(out).toContain("const [submitted, setSubmitted] = createSignal(false)");
    // Solid lowercases the DOM event prop.
    expect(out).toContain("onsubmit={e => { e.preventDefault(); setSubmitted(true); }}");
    expect(out).toContain('{submitted() ? "Done" : "Pending"}');
  });

  it("Vue: @submit handler references setSubmitted, which is never defined (ref model)", async () => {
    const out = await code("EventModifier", "vue");
    // Vue tracks state with `ref`, so the only binding is `submitted` — there is no setter fn.
    expect(out).toContain("const submitted = ref(false)");
    // BUG: handler calls setSubmitted(...) but `setSubmitted` is undefined in <script setup>;
    // the correct Vue form would be `submitted.value = true`. This throws at runtime.
    expect(out).toContain('@submit="e => { e.preventDefault(); setSubmitted(true); }"');
    expect(out).not.toContain("setSubmitted ="); // setter is never declared anywhere
  });

  it("Svelte: onsubmit handler references setSubmitted, which is never defined ($state model)", async () => {
    const out = await code("EventModifier", "svelte");
    expect(out).toContain("let submitted = $state(false)");
    // BUG: handler calls setSubmitted(...) but Svelte uses a plain `$state` let; the correct
    // form is `submitted = true`. `setSubmitted` is undefined in the component scope.
    expect(out).toContain("onsubmit={e => { e.preventDefault(); setSubmitted(true); }}");
    expect(out).not.toContain("const setSubmitted");
  });

  it("Angular: (submit) binds an arrow that calls setSubmitted, not a class member", async () => {
    const out = await code("EventModifier", "angular");
    expect(out).toContain("submitted = signal(false)");
    // BUG: the template event binding is `(submit)="e => { ...; setSubmitted(true); }"`. Angular
    // evaluates this expression against the component instance, where neither `setSubmitted` nor a
    // bound `e` exists — it should be `(submit)="submitted.set(true)"` using $event. Broken.
    expect(out).toContain('(submit)="e => { e.preventDefault(); setSubmitted(true); }"');
    // The setter only appears inside the template binding; it is never declared on the class.
    expect(out).not.toContain("setSubmitted =");
  });

  it("Qwik: onSubmit handler is double-wrapped by $() and calls an undefined setSubmitted", async () => {
    const out = await code("EventModifier", "qwik");
    expect(out).toContain("const submitted = useSignal(false)");
    // BUG 1: $(() => e => ...) wraps the handler in an extra arrow, so onSubmit receives a fn that
    // RETURNS the handler instead of being the handler — the body never runs on submit.
    // BUG 2: setSubmitted is undefined under the useSignal model (should be submitted.value = true).
    expect(out).toContain("onSubmit={$(() => e => { e.preventDefault(); setSubmitted(true); })}");
    expect(out).toContain('{submitted.value ? "Done" : "Pending"}');
  });

  it("Astro: static output emits handler + reads referencing undefined client identifiers", async () => {
    const out = await code("EventModifier", "astro");
    // Astro is SSR/static with no client runtime here, so neither `submitted` nor `setSubmitted`
    // is defined; the inline handler and the {submitted ? ...} read are dangling references.
    expect(out).toContain("onSubmit={e => { e.preventDefault(); setSubmitted(true); }}");
    expect(out).toContain('{submitted ? "Done" : "Pending"}');
    expect(out).not.toContain("setSubmitted ="); // never declared in the frontmatter
  });
});

// ---------------------------------------------------------------------------
// TypedEvent: <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
// Focus: typed payload access (e.clientX / e.clientY) survives codegen, and per-target event
// name casing/mapping for the mouse-move event.
// ---------------------------------------------------------------------------
describe("TypedEvent: onMouseMove reading e.clientX / e.clientY into a signal", () => {
  it("React: onMouseMove preserved (camelCase); typed payload access intact", async () => {
    const out = await code("TypedEvent", "react");
    expect(out).toContain("const [pos, setPos] = useState({ x: 0, y: 0 })");
    expect(out).toContain("onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}");
    // Object-field reads in the template do not call the signal.
    expect(out).toContain("{pos.x}");
  });

  it("Solid: event prop lowercased to onmousemove; reads call pos()", async () => {
    const out = await code("TypedEvent", "solid");
    expect(out).toContain("onmousemove={e => setPos({ x: e.clientX, y: e.clientY })}");
    expect(out).toContain("{pos().x}");
  });

  it("Vue: onMouseMove maps to kebab @mouse-move; setPos is undefined under ref model", async () => {
    const out = await code("TypedEvent", "vue");
    expect(out).toContain("const pos = ref({ x: 0, y: 0 })");
    // BUG: @mouse-move is kebab-cased (native event is `mousemove`, so this binds the wrong
    // event name), and setPos is undefined — should be `pos.value = { ... }`.
    expect(out).toContain('@mouse-move="e => setPos({ x: e.clientX, y: e.clientY })"');
    expect(out).toContain("{{ pos.x }}");
  });

  it("Qwik: onMouseMove double-wrapped in $() and setPos is undefined", async () => {
    const out = await code("TypedEvent", "qwik");
    expect(out).toContain("const pos = useSignal({ x: 0, y: 0 })");
    // BUG: same double-arrow $() wrapping + undefined setPos (should be pos.value = {...}).
    expect(out).toContain("onMouseMove={$(() => e => setPos({ x: e.clientX, y: e.clientY }))}");
    expect(out).toContain("{pos.value.x}");
  });

  it("Angular: (mousemove) binds an arrow calling setPos, which is not a class member", async () => {
    const out = await code("TypedEvent", "angular");
    expect(out).toContain("pos = signal({ x: 0, y: 0 })");
    // BUG: setPos is referenced in the template event binding but never declared on the class.
    expect(out).toContain('(mousemove)="e => setPos({ x: e.clientX, y: e.clientY })"');
  });
});
