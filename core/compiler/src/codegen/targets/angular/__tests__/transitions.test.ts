// Angular codegen assertions for the `transitions` feature area: author a `.ink.tsx` that wraps a
// `<Show>` in a `<Transition>`, compile through the FULL pipeline, and assert the ACTUAL emitted
// Angular code. Angular currently drops the transition wrapper entirely — these tests pin that
// behavior and document the residual runtime-breaking bug.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// TransitionBasic: <Transition name="fade"><Show when={visible()}>…</Show></Transition> plus a
// toggle button bound to setVisible. Exercises the transition wrapper AND the state plumbing.
describe("TransitionBasic: transition wrapper over toggled Show", () => {
  it("Angular: rewrites setVisible to signal.set, but BUG — the Transition wrapper is dropped entirely", async () => {
    const out = await compileTo("TransitionBasic", "angular");
    // RESIDUAL BUG: no __InkTransition / no transition machinery survives; the @if just renders bare,
    // so the fade animation is silently lost on the Angular target.
    // The ink-transition-basic selector contains the word, so check for the machinery forms.
    expect(out).not.toContain("InkTransition");
    expect(out).not.toContain("transition(");
    expect(out).toContain("@if (visible()) {");
    // The (click) binding is a statement (no arrow) that rewrites setVisible to signal.set — correct.
    expect(out).toContain('(click)="visible.set(!visible())"');
    expect(out).toContain("visible = signal(true)");
    // The class body never declares setVisible — the setter call was rewritten away.
    expect(out).not.toContain("setVisible = ");
    expect(out).not.toContain("setVisible(value");
    expect(out).not.toContain("setVisible");
  });
});
