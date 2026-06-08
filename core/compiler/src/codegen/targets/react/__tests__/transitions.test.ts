// React codegen assertions for the `transitions` feature area: author a `.ink.tsx` that wraps a
// `<Show>` in a `<Transition>`, compile through the FULL pipeline, and assert the ACTUAL emitted
// React code. React lowers transitions by injecting an `__InkTransition` helper component with a
// `display:contents` wrapper that applies enter/leave classes.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// TransitionBasic: <Transition name="fade"><Show when={visible()}>…</Show></Transition> plus a
// toggle button bound to setVisible. Exercises the transition wrapper AND the state plumbing.
describe("TransitionBasic: transition wrapper over toggled Show", () => {
  it("React: injects __InkTransition helper with display:contents wrapper + enter/leave classes", async () => {
    const out = await compileTo("TransitionBasic", "react");
    expect(out).toContain('function __InkTransition({ name = "ink", appear, children }');
    expect(out).toContain('style={{ display: "contents" }}');
    expect(out).toContain('el.classList.add(name + "-enter-from", name + "-enter-active")');
    // Show child lowers to a ternary fed into the helper as children
    expect(out).toContain("{visible ? <p>Hello</p> : null}");
  });

  it("React: Transition wrapper passes the transition name through as a prop", async () => {
    const out = await compileTo("TransitionBasic", "react");
    // Author wrote <Transition name="fade"> and the string-literal `name` attr is now captured,
    // so the correct CSS class prefix is emitted at the call site.
    expect(out).toContain('<__InkTransition name="fade">');
    expect(out).not.toContain('name="ink">');
  });
});

// TransitionAppear: <Transition name="slide" appear><Show …/></Transition>. Same machinery, but the
// `appear` flag should make the enter animation run on mount.
describe("TransitionAppear: appear flag on a transition", () => {
  it("React: passes the `appear` attr so the mount animation fires", async () => {
    const out = await compileTo("TransitionAppear", "react");
    // Helper supports `appear`, and the call site now carries the captured name + appear flag.
    expect(out).toContain('<__InkTransition name="slide" appear>');
    expect(out).not.toContain('name="ink"');
  });
});
