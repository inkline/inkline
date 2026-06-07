// Svelte codegen assertions for the `transitions` feature area: author a `.ink.tsx` that wraps a
// `<Show>` in a `<Transition>`, compile through the FULL pipeline, and assert the ACTUAL emitted
// Svelte code. The Svelte target lowers transitions to `in:`/`out:` directives backed by injected
// `__inkTransitionIn` / `__inkTransitionOut` helpers, with the `<Show>` child becoming an `{#if}`.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// TransitionBasic: <Transition name="fade"><Show when={visible()}>…</Show></Transition> plus a
// toggle button bound to setVisible. Exercises the transition wrapper AND the state plumbing.
describe("TransitionBasic: transition wrapper over toggled Show", () => {
  it("Svelte: emits in:/out: transition directives instead of a wrapper component", async () => {
    const out = await compileTo("TransitionBasic", "svelte");
    expect(out).toContain("const __inkTransitionIn = function(node: HTMLElement");
    expect(out).toContain("const __inkTransitionOut = function(node: HTMLElement");
    expect(out).toContain(
      'in:__inkTransitionIn={{ name: "fade" }} out:__inkTransitionOut={{ name: "fade" }}',
    );
    expect(out).toContain("{#if visible}");
  });
});

// TransitionAppear: <Transition name="slide" appear><Show …/></Transition>. Same machinery, but the
// `appear` flag should make the enter animation run on mount.
describe("TransitionAppear: appear flag on a transition", () => {
  it("Svelte: appear transition emits both in:/out: directives with the captured name", async () => {
    const out = await compileTo("TransitionAppear", "svelte");
    expect(out).toContain(
      'in:__inkTransitionIn={{ name: "slide" }} out:__inkTransitionOut={{ name: "slide" }}',
    );
    expect(out).toContain("{#if visible}");
  });
});
