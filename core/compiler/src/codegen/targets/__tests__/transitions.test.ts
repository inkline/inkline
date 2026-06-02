// Real-world codegen assertions for the `transitions` feature area: author a `.ink.tsx` that wraps
// a `<Show>` in a `<Transition>`, compile through the FULL pipeline, and assert the ACTUAL emitted
// framework code. Each target lowers transitions very differently — React/Solid/Qwik inject an
// `__InkTransition` helper component, Vue maps to the native `<Transition>`, Svelte emits `in:`/`out:`
// directives, and Angular/Astro currently drop the wrapper entirely. These tests pin that behavior
// and document several runtime-breaking bugs surfaced along the way.
//
// To inspect a fixture's real output while editing assertions, dump it:
//   const r = await compileFixture("TransitionBasic"); console.log(r.files.svelte![0].contents);

import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

// TransitionBasic: <Transition name="fade"><Show when={visible()}>…</Show></Transition> plus a
// toggle button bound to setVisible. Exercises the transition wrapper AND the state plumbing.
describe("TransitionBasic: transition wrapper over toggled Show", () => {
  it("React: injects __InkTransition helper with display:contents wrapper + enter/leave classes", async () => {
    const out = await code("TransitionBasic", "react");
    expect(out).toContain('function __InkTransition({ name = "ink", appear, children }');
    expect(out).toContain('style={{ display: "contents" }}');
    expect(out).toContain('el.classList.add(name + "-enter-from", name + "-enter-active")');
    // Show child lowers to a ternary fed into the helper as children
    expect(out).toContain("{visible ? <p>Hello</p> : null}");
  });

  it("React: Transition wrapper passes the transition name through as a prop", async () => {
    const out = await code("TransitionBasic", "react");
    // BUG: author wrote <Transition name="fade"> but the lowered name is always "ink" (the default);
    // the string-literal `name` attr is dropped, so the wrong CSS class prefix is emitted everywhere.
    expect(out).toContain('<__InkTransition name="ink">');
    expect(out).not.toContain('name="fade"');
  });

  it("Solid: __InkTransition uses createEffect + onCleanup and gates the wrapper with <Show>", async () => {
    const out = await code("TransitionBasic", "solid");
    expect(out).toContain(
      'import { createSignal, splitProps, createEffect, onCleanup, Show } from "solid-js"',
    );
    expect(out).toContain(
      "function __InkTransition(props: { name?: string; appear?: boolean; children?: any })",
    );
    expect(out).toContain(
      'return <Show when={show()}><div ref={(el) => ref = el} style={{ display: "contents" }}>',
    );
    expect(out).toContain('<__InkTransition name="ink">');
  });

  it("Vue: maps to the native <Transition> wrapping a v-if child", async () => {
    const out = await code("TransitionBasic", "vue");
    expect(out).toContain('<Transition name="ink">');
    expect(out).toContain('<p v-if="visible">');
  });

  it("Vue: toggle handler rewrites setVisible to a template assignment", async () => {
    const out = await code("TransitionBasic", "vue");
    // `visible` is emitted in the script; the setter call is rewritten away.
    const script = out.slice(out.indexOf("<script"), out.indexOf("</script>"));
    expect(script).toContain("const visible = ref(true)");
    expect(script).not.toContain("setVisible");
    // The template rewrites setVisible(!visible) → visible = !visible (Vue adds .value).
    expect(out).toContain('@click="() => visible = !visible"');
  });

  it("Svelte: emits in:/out: transition directives instead of a wrapper component", async () => {
    const out = await code("TransitionBasic", "svelte");
    expect(out).toContain("const __inkTransitionIn = function(node: HTMLElement");
    expect(out).toContain("const __inkTransitionOut = function(node: HTMLElement");
    expect(out).toContain(
      'in:__inkTransitionIn={{ name: "ink" }} out:__inkTransitionOut={{ name: "ink" }}',
    );
    expect(out).toContain("{#if visible}");
  });

  it("Qwik: __InkTransition uses useVisibleTask$ tracking props.children", async () => {
    const out = await code("TransitionBasic", "qwik");
    expect(out).toContain(
      "const __InkTransition = component$((props: { name?: string; appear?: boolean; children?: any })",
    );
    expect(out).toContain("useVisibleTask$(({ track, cleanup }) => {");
    expect(out).toContain("track(() => props.children);");
    expect(out).toContain('<__InkTransition name="ink">');
  });

  it("Qwik: onClick is single-wrapped in $() and rewrites setVisible to a signal assignment", async () => {
    const out = await code("TransitionBasic", "qwik");
    // Single `$(() => …)` wrap (no extra closure), and setVisible(!visible) is rewritten to
    // `visible.value = !visible.value`; `setVisible` is never declared.
    expect(out).toContain("onClick={$(() => visible.value = !visible.value)}");
    expect(out).toContain("const visible = useSignal(true)");
    expect(out).not.toContain("const setVisible");
  });

  it("Angular: BUG — Transition wrapper is dropped entirely; setVisible rewrites to signal.set", async () => {
    const out = await code("TransitionBasic", "angular");
    // No __InkTransition / no transition machinery survives; the @if just renders bare.
    expect(out).not.toContain("InkTransition");
    expect(out).not.toContain("transition");
    expect(out).toContain("@if (visible()) {");
    // The (click) binding is a statement (no arrow) that rewrites setVisible to signal.set.
    expect(out).toContain('(click)="visible.set(!visible())"');
    expect(out).toContain("visible = signal(true)");
    // The class body never declares setVisible — the setter call was rewritten away.
    expect(out).not.toContain("setVisible = ");
    expect(out).not.toContain("setVisible(value");
  });

  it("Astro: BUG — signal state is dropped, so visible/setVisible are undefined references", async () => {
    const out = await code("TransitionBasic", "astro");
    // Frontmatter only destructures __attrs; `visible` is never declared but used in the markup.
    expect(out).toContain("const { ...__attrs } = props;");
    expect(out).toContain("{visible ? (<p>");
    expect(out).toContain("onClick={() => setVisible(!visible)}");
    expect(out).not.toContain("const visible");
  });
});

// TransitionAppear: <Transition name="slide" appear><Show …/></Transition>. Same machinery, but the
// `appear` flag should make the enter animation run on mount.
describe("TransitionAppear: appear flag on a transition", () => {
  it("React: BUG — the `appear` attr is dropped, so mount animation never fires", async () => {
    const out = await code("TransitionAppear", "react");
    // Helper supports `appear`, but the call site omits it (and the name is wrong too).
    expect(out).toContain('<__InkTransition name="ink">');
    // Instance opening tag carries no `appear` attribute (helper param is `appear?: boolean`).
    expect(out).not.toContain('<__InkTransition name="ink" appear');
    expect(out).not.toContain('name="slide"');
  });

  it("Solid: BUG — appear flag dropped at the call site despite helper support", async () => {
    const out = await code("TransitionAppear", "solid");
    expect(out).toContain('<__InkTransition name="ink">');
    expect(out).toContain("if (!mounted && !props.appear)"); // helper still reads props.appear
    // …but the instance opening tag never passes `appear`:
    expect(out).not.toContain('<__InkTransition name="ink" appear');
  });

  it("Vue: native <Transition> with no appear attribute and the wrong name", async () => {
    const out = await code("TransitionAppear", "vue");
    // BUG: `name="slide"` becomes `name="ink"` and the `appear` flag is dropped.
    expect(out).toContain('<Transition name="ink">');
    expect(out).not.toContain("appear");
    expect(out).toContain('<p v-if="visible">');
  });

  it("Svelte: appear-only transition still emits both in:/out: directives", async () => {
    const out = await code("TransitionAppear", "svelte");
    expect(out).toContain(
      'in:__inkTransitionIn={{ name: "ink" }} out:__inkTransitionOut={{ name: "ink" }}',
    );
    expect(out).toContain("{#if visible}");
  });
});
