// Solid codegen assertions for the `transitions` feature area: author a `.ink.tsx` that wraps a
// `<Show>` in a `<Transition>`, compile through the FULL pipeline, and assert the ACTUAL emitted
// Solid code. Solid lowers transitions by injecting an `__InkTransition` helper component built on
// createEffect + onCleanup and gating the wrapper with `<Show>`.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// TransitionBasic: <Transition name="fade"><Show when={visible()}>…</Show></Transition> plus a
// toggle button bound to setVisible. Exercises the transition wrapper AND the state plumbing.
describe("TransitionBasic: transition wrapper over toggled Show", () => {
  it("Solid: __InkTransition uses createEffect + onCleanup and gates the wrapper with <Show>", async () => {
    const out = await compileTo("TransitionBasic", "solid");
    expect(out).toContain(
      'import { createSignal, splitProps, createEffect, onCleanup, Show } from "solid-js"',
    );
    expect(out).toContain(
      "function __InkTransition(props: { name?: string; appear?: boolean; children?: any })",
    );
    expect(out).toContain(
      'return <Show when={show()}><div ref={(el) => ref = el} style={{ display: "contents" }}>',
    );
    expect(out).toContain('<__InkTransition name="fade">');
  });
});

// TransitionAppear: <Transition name="slide" appear><Show …/></Transition>. Same machinery, but the
// `appear` flag should make the enter animation run on mount.
describe("TransitionAppear: appear flag on a transition", () => {
  it("Solid: passes the appear flag at the call site, matching helper support", async () => {
    const out = await compileTo("TransitionAppear", "solid");
    expect(out).toContain("if (!mounted && !props.appear)"); // helper reads props.appear
    // The instance opening tag now passes both the captured name and the `appear` flag:
    expect(out).toContain('<__InkTransition name="slide" appear>');
  });
});
