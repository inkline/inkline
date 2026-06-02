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
// ElementRef: a single createRef() bound to <input>, focused in onMount.
// Each target expresses element refs differently:
//   React  -> useRef + ref={inputRef}, .current in the effect
//   Vue    -> ref(null) + string ref="inputRef", .value in the hook
//   Solid  -> let var + ref callback, bare var in the hook
//   Svelte -> $state + bind:this
//   Angular-> viewChild + template ref marker
//   Qwik   -> useSignal + ref={inputRef}
//   Astro  -> SSR, no client ref at all
// ---------------------------------------------------------------------------
describe("ElementRef: single template ref bound + focused on mount", () => {
  it("React: useRef(null) + ref={inputRef}, onMount becomes a [] effect using .current", async () => {
    const out = await code("ElementRef", "react");
    expect(out).toContain('import { useRef, useEffect } from "react";');
    expect(out).toContain("const inputRef = useRef(null)");
    expect(out).toContain("useEffect(() => { inputRef.current?.focus(); }, [])");
    expect(out).toContain("ref={inputRef}");
  });

  it("Vue: ref(null) in <script setup>, string ref binding, onMounted using .value", async () => {
    const out = await code("ElementRef", "vue");
    expect(out).toContain("const inputRef = ref(null)");
    expect(out).toContain("onMounted(() => { inputRef.value?.focus(); })");
    // Vue binds template refs by name, not by expression.
    expect(out).toContain('<input placeholder="auto-focus" ref="inputRef" />');
  });

  it("Solid: ref callback assigns the bare let var, hook calls .focus() directly", async () => {
    const out = await code("ElementRef", "solid");
    expect(out).toContain("let inputRef: HTMLElement | undefined");
    expect(out).toContain("ref={(el) => inputRef = el}");
    // Solid refs hold the element directly, so no `.current`/`.value`.
    expect(out).toContain("onMount(() => { inputRef?.focus(); })");
  });

  it("Svelte: bind:this with a $state ref, $effect calls focus directly", async () => {
    const out = await code("ElementRef", "svelte");
    expect(out).toContain("let inputRef = $state<HTMLElement | null>(null)");
    expect(out).toContain("bind:this={inputRef}");
    expect(out).toContain("$effect(() => { inputRef?.focus(); })");
  });

  it("Angular: viewChild + #inputRef marker, onMount focus runs via afterNextRender in the constructor", async () => {
    const out = await code("ElementRef", "angular");
    expect(out).toContain("viewChild<ElementRef>('inputRef')");
    expect(out).toContain('template: `<input placeholder="auto-focus" #inputRef />`');
    // onMount is now wired: Angular emits `afterNextRender` inside a single constructor,
    // and imports the lifecycle helper alongside viewChild/ElementRef.
    expect(out).toContain("constructor() { afterNextRender(() => { inputRef?.focus(); }) }");
    expect(out).toContain("afterNextRender");
    // RESIDUAL BUG: the focus body references the bare `inputRef` instead of the
    // idiomatic `this.inputRef()` — the viewChild is a member signal, so this code
    // does not compile as-authored. See residualBugs.
  });

  it("Qwik: useSignal ref + ref={inputRef}, onMount focus runs via useVisibleTask$", async () => {
    const out = await code("ElementRef", "qwik");
    expect(out).toContain("const inputRef = useSignal(null)");
    expect(out).toContain("ref={inputRef}");
    // onMount is now wired in Qwik: it becomes a useVisibleTask$ that reads the
    // signal via .value, and the imported helper is now actually used.
    expect(out).toContain(
      'import { component$, useSignal, useComputed$, useVisibleTask$, $ } from "@qwik.dev/core";',
    );
    expect(out).toContain("useVisibleTask$(() => { inputRef.value?.focus(); })");
  });

  it("Astro: SSR output has no client ref and drops the onMount focus entirely", async () => {
    const out = await code("ElementRef", "astro");
    expect(out).toContain('<input {...__attrs} placeholder="auto-focus" class={__attrs.class} />');
    // Astro is server-rendered: ref and onMount are both absent (no client runtime here).
    expect(out).not.toContain("ref=");
    expect(out).not.toContain("focus()");
  });
});

// ---------------------------------------------------------------------------
// MultiRefs: two refs (inputRef + buttonRef) on sibling elements; only inputRef
// is used in onMount. Verifies each ref is wired independently and both bindings
// survive even when one ref is never read.
// ---------------------------------------------------------------------------
describe("MultiRefs: two independent refs on sibling elements", () => {
  it("React: both refs declared as useRef, each bound to its own element", async () => {
    const out = await code("MultiRefs", "react");
    expect(out).toContain("const inputRef = useRef(null)");
    expect(out).toContain("const buttonRef = useRef(null)");
    expect(out).toContain('<input placeholder="focus me" ref={inputRef} />');
    expect(out).toContain("<button ref={buttonRef}>");
  });

  it("Solid: each ref gets its own let var and callback binding", async () => {
    const out = await code("MultiRefs", "solid");
    expect(out).toContain("let inputRef: HTMLElement | undefined");
    expect(out).toContain("let buttonRef: HTMLElement | undefined");
    expect(out).toContain("ref={(el) => inputRef = el}");
    expect(out).toContain("ref={(el) => buttonRef = el}");
  });

  it("Svelte: both refs use bind:this on their respective elements", async () => {
    const out = await code("MultiRefs", "svelte");
    expect(out).toContain("let inputRef = $state<HTMLElement | null>(null)");
    expect(out).toContain("let buttonRef = $state<HTMLElement | null>(null)");
    expect(out).toContain('<input bind:this={inputRef} placeholder="focus me" />');
    expect(out).toContain("<button bind:this={buttonRef}>");
  });

  it("Angular: both refs become viewChild + template markers", async () => {
    const out = await code("MultiRefs", "angular");
    expect(out).toContain("inputRef = viewChild<ElementRef>('inputRef')");
    expect(out).toContain("buttonRef = viewChild<ElementRef>('buttonRef')");
    expect(out).toContain('<input placeholder="focus me" #inputRef />');
    expect(out).toContain("<button #buttonRef>");
    // onMount is now wired: the inputRef focus runs via afterNextRender in the
    // constructor. buttonRef is declared but unread (as authored), which is fine.
    expect(out).toContain("constructor() { afterNextRender(() => { inputRef?.focus(); }) }");
    // RESIDUAL BUG: same as ElementRef — the focus body uses the bare `inputRef`
    // rather than `this.inputRef()`, so it does not compile as-authored.
  });

  it("Astro: both ref bindings are stripped from the SSR markup", async () => {
    const out = await code("MultiRefs", "astro");
    expect(out).toContain('<input placeholder="focus me" />');
    expect(out).toContain("<button>");
    expect(out).not.toContain("ref=");
    expect(out).not.toContain("#inputRef");
  });
});
