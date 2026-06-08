// Real-world codegen assertions for the `transitions` feature area on the Astro target: author a
// `.ink.tsx` that wraps a `<Show>` in a `<Transition>`, compile through the FULL pipeline, and assert
// the ACTUAL emitted Astro code. Astro currently drops the transition wrapper entirely, declaring the
// signal state in the frontmatter and rewriting the setter to a direct assignment.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// TransitionBasic: <Transition name="fade"><Show when={visible()}>…</Show></Transition> plus a
// toggle button bound to setVisible. Exercises the transition wrapper AND the state plumbing.
describe("TransitionBasic: transition wrapper over toggled Show", () => {
  it("Astro: declares signal state in the frontmatter and rewrites the setter to a direct assignment", async () => {
    const out = await compileTo("TransitionBasic", "astro");
    // Frontmatter declares the signal as a plain `let`, then destructures __attrs.
    expect(out).toContain("const { ...__attrs } = props;");
    expect(out).toContain("let visible = true");
    expect(out).toContain("{visible ? (<p>");
    // setVisible(!visible) is rewritten to a direct assignment; `setVisible` is never declared.
    expect(out).toContain("onClick={() => visible = !visible}");
    expect(out).not.toContain("setVisible");
  });
});
