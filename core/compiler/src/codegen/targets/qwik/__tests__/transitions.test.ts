// Qwik codegen assertions for the `transitions` feature area: author a `.ink.tsx` that wraps a
// `<Show>` in a `<Transition>`, compile through the FULL pipeline, and assert the ACTUAL emitted
// Qwik code. Qwik lowers transitions by injecting an `__InkTransition` helper component.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// TransitionBasic: <Transition name="fade"><Show when={visible()}>…</Show></Transition> plus a
// toggle button bound to setVisible. Exercises the transition wrapper AND the state plumbing.
describe("TransitionBasic: transition wrapper over toggled Show", () => {
  it("Qwik: __InkTransition uses useVisibleTask$ tracking props.children", async () => {
    const out = await compileTo("TransitionBasic", "qwik");
    expect(out).toContain(
      "const __InkTransition = component$((props: { name?: string; appear?: boolean; children?: any })",
    );
    expect(out).toContain("useVisibleTask$(({ track, cleanup }) => {");
    expect(out).toContain("track(() => props.children);");
    expect(out).toContain('<__InkTransition name="fade">');
  });

  it("Qwik: onClick is single-wrapped in $() and rewrites setVisible to a signal assignment", async () => {
    const out = await compileTo("TransitionBasic", "qwik");
    // Single `$(() => …)` wrap (no extra closure), and setVisible(!visible) is rewritten to
    // `visible.value = !visible.value`; `setVisible` is never declared.
    expect(out).toContain("onClick={$(() => visible.value = !visible.value)}");
    expect(out).toContain("const visible = useSignal(true)");
    expect(out).not.toContain("const setVisible");
  });
});
