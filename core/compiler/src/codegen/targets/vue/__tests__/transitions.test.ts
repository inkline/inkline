// Real-world codegen assertions for the `transitions` feature area on the Vue target: author a
// `.ink.tsx` that wraps a `<Show>` in a `<Transition>`, compile through the FULL pipeline, and
// assert the ACTUAL emitted Vue code. Vue maps the transition wrapper to the native `<Transition>`.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// TransitionBasic: <Transition name="fade"><Show when={visible()}>…</Show></Transition> plus a
// toggle button bound to setVisible. Exercises the transition wrapper AND the state plumbing.
describe("TransitionBasic: transition wrapper over toggled Show", () => {
  it("Vue: maps to the native <Transition> wrapping a v-if child", async () => {
    const out = await compileTo("TransitionBasic", "vue");
    expect(out).toContain('<Transition name="fade">');
    expect(out).toContain('<p v-if="visible">');
  });

  it("Vue: toggle handler rewrites setVisible to a template assignment", async () => {
    const out = await compileTo("TransitionBasic", "vue");
    // `visible` is emitted in the script; the setter call is rewritten away.
    const script = out.slice(out.indexOf("<script"), out.indexOf("</script>"));
    expect(script).toContain("const visible = ref(true)");
    expect(script).not.toContain("setVisible");
    // The template rewrites setVisible(!visible) → visible = !visible (Vue adds .value).
    expect(out).toContain('@click="() => visible = !visible"');
  });
});

// TransitionAppear: <Transition name="slide" appear><Show …/></Transition>. Same machinery, but the
// `appear` flag should make the enter animation run on mount.
describe("TransitionAppear: appear flag on a transition", () => {
  it("Vue: native <Transition> carries the captured name and the appear attribute", async () => {
    const out = await compileTo("TransitionAppear", "vue");
    // `name="slide"` is preserved and the `appear` flag is emitted as a boolean attribute.
    expect(out).toContain('<Transition name="slide" appear="">');
    expect(out).toContain('<p v-if="visible">');
  });
});
