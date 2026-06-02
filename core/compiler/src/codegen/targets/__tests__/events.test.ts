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
// The handler body keeps e.preventDefault(); the signal-setter call is rewritten per target:
// React/Solid keep `setSubmitted(true)` (tuple model); Vue template `submitted = true`;
// Svelte `submitted = true`; Qwik `submitted.value = true`; Angular `submitted.set(true)`
// (lowered to a statement with the handler param mapped to `$event`).
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

  it("Vue: @submit handler rewrites the setter to a template assignment (ref model)", async () => {
    const out = await code("EventModifier", "vue");
    // Vue tracks state with `ref`, so the only binding is `submitted` — there is no setter fn.
    expect(out).toContain("const submitted = ref(false)");
    // The setter call is rewritten to a Vue template assignment `submitted = true` (Vue's
    // template compiler unwraps the ref, so no `.value` is needed in the template binding).
    expect(out).toContain('@submit="e => { e.preventDefault(); submitted = true; }"');
    expect(out).not.toContain("setSubmitted"); // the setter identifier is gone entirely
  });

  it("Svelte: onsubmit handler rewrites the setter to a plain $state assignment", async () => {
    const out = await code("EventModifier", "svelte");
    expect(out).toContain("let submitted = $state(false)");
    // Svelte uses a plain `$state` let, so the setter call is rewritten to `submitted = true`.
    expect(out).toContain("onsubmit={e => { e.preventDefault(); submitted = true; }}");
    expect(out).not.toContain("setSubmitted");
  });

  it("Angular: (submit) binds a statement that calls submitted.set, with $event mapped", async () => {
    const out = await code("EventModifier", "angular");
    expect(out).toContain("submitted = signal(false)");
    // The block-body handler is lowered to a statement expression: the handler param `e` is mapped
    // to Angular's `$event`, and the setter call becomes the signal write `submitted.set(true)`.
    expect(out).toContain('(submit)="$event.preventDefault(); submitted.set(true)"');
    // The setter identifier never leaks into the output.
    expect(out).not.toContain("setSubmitted");
  });

  it("Qwik: onSubmit handler is single-wrapped by $() and writes submitted.value", async () => {
    const out = await code("EventModifier", "qwik");
    expect(out).toContain("const submitted = useSignal(false)");
    // The handler is single-wrapped in $() — `$(e => ...)` IS the handler (no extra arrow), and
    // the setter call is rewritten to the signal write `submitted.value = true`.
    expect(out).toContain("onSubmit={$(e => { e.preventDefault(); submitted.value = true; })}");
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

  it("Vue: setPos rewrites to a template assignment, but @mouse-move is still wrongly kebab-cased", async () => {
    const out = await code("TypedEvent", "vue");
    expect(out).toContain("const pos = ref({ x: 0, y: 0 })");
    // The setter call is rewritten to the Vue template assignment `pos = { ... }` (ref unwrapped).
    // BUG: @mouse-move is kebab-cased — the native DOM event is `mousemove`, so this binds the
    // wrong event name and the handler never fires. Vue event-name kebab-casing is still broken.
    expect(out).toContain('@mouse-move="e => pos = { x: e.clientX, y: e.clientY }"');
    expect(out).toContain("{{ pos.x }}");
  });

  it("Qwik: onMouseMove single-wrapped in $() and setPos rewritten to pos.value", async () => {
    const out = await code("TypedEvent", "qwik");
    expect(out).toContain("const pos = useSignal({ x: 0, y: 0 })");
    // Single-wrapped `$(e => ...)` IS the handler, and the setter call is rewritten to the signal
    // write `pos.value = { ... }`.
    expect(out).toContain("onMouseMove={$(e => pos.value = { x: e.clientX, y: e.clientY })}");
    expect(out).toContain("{pos.value.x}");
  });

  it("Angular: (mousemove) binds a statement calling pos.set, with $event mapped into the payload", async () => {
    const out = await code("TypedEvent", "angular");
    expect(out).toContain("pos = signal({ x: 0, y: 0 })");
    // The handler is lowered to a statement: the setter becomes `pos.set(...)` and the handler
    // param `e` is mapped to Angular's `$event` (so `e.clientX` → `$event.clientX`).
    expect(out).toContain('(mousemove)="pos.set({ x: $event.clientX, y: $event.clientY })"');
  });
});
