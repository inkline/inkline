// Real-world codegen assertions for the "lifecycle-effects" area: onMount / onCleanup and
// createEffect-with-cleanup authored in `.ink.tsx`, compiled through the FULL pipeline, asserting
// the ACTUAL emitted framework code. These fixtures exercise per-target lifecycle APIs (useEffect,
// onMount/onCleanup, onMounted/onUnmounted/watchEffect, $effect, Angular effect(), useVisibleTask$).
//
// Several assertions document CURRENTLY BROKEN output (marked `// BUG:`): see bugsFound for details.

import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

// ───────────────────────── Lifecycle: onMount + onCleanup + signal ─────────────────────────

describe("Lifecycle: onMount/onCleanup with a signal", () => {
  it("React: onMount → useEffect([]); onCleanup → useEffect returning a cleanup fn", async () => {
    const out = await code("Lifecycle", "react");
    expect(out).toContain('import { useState, useEffect } from "react";');
    expect(out).toContain("const [mounted, setMounted] = useState(false)");
    // onMount lowers to a mount-only effect that calls the React setter.
    expect(out).toContain("useEffect(() => { setMounted(true); }, [])");
    // onCleanup lowers to an effect whose return value is the teardown fn.
    expect(out).toContain('useEffect(() => () => { console.log("cleanup"); }, [])');
    // React reads plain state in JSX (no call), correct.
    expect(out).toContain('{mounted ? "mounted" : "pending"}');
  });

  it("Solid: onMount/onCleanup pass through to the native Solid lifecycle APIs", async () => {
    const out = await code("Lifecycle", "solid");
    expect(out).toContain(
      'import { createSignal, onMount, onCleanup, splitProps } from "solid-js";',
    );
    expect(out).toContain("onMount(() => { setMounted(true); })");
    expect(out).toContain('onCleanup(() => { console.log("cleanup"); })');
    // Solid signals are functions, so the JSX read keeps the call.
    expect(out).toContain('{mounted() ? "mounted" : "pending"}');
  });

  it("Vue: onMounted/onUnmounted wired, but onMount body calls a nonexistent `setMounted`", async () => {
    const out = await code("Lifecycle", "vue");
    expect(out).toContain('import { ref, onMounted, onUnmounted } from "vue";');
    expect(out).toContain("const mounted = ref(false)");
    expect(out).toContain('onUnmounted(() => { console.log("cleanup"); })');
    // BUG: Vue destructures state into `ref`s, so there is no `setMounted` binding. The mount body
    // should be `mounted.value = true`; instead it emits a call to an undefined `setMounted`,
    // which throws ReferenceError on mount.
    expect(out).toContain("onMounted(() => { setMounted(true); })");
  });

  it("Svelte: $effect lifecycle, but mount body calls a nonexistent `setMounted`", async () => {
    const out = await code("Lifecycle", "svelte");
    expect(out).toContain("let mounted = $state(false)");
    // onCleanup correctly becomes an $effect returning a teardown.
    expect(out).toContain('$effect(() => { return () => { console.log("cleanup"); } })');
    // BUG: Svelte uses $state (no setter fn). Mount body should be `mounted = true`; instead it
    // emits `setMounted(true)`, an undefined reference at runtime.
    expect(out).toContain("$effect(() => { setMounted(true); })");
  });

  it("Angular: onMount AND onCleanup are silently DROPPED; signal never updates", async () => {
    const out = await code("Lifecycle", "angular");
    expect(out).toContain("mounted = signal(false)");
    // BUG: no ngOnInit / effect / constructor is emitted for onMount or onCleanup. The class body
    // contains only the signal declaration, so `mounted` is never set true and the template is
    // permanently stuck on "pending".
    expect(out).not.toContain("setMounted");
    expect(out).not.toContain("ngOnInit");
    expect(out).not.toContain("OnDestroy");
    expect(out).not.toContain("cleanup");
  });

  it("Qwik: onMount/onCleanup DROPPED; useVisibleTask$ imported but unused", async () => {
    const out = await code("Lifecycle", "qwik");
    expect(out).toContain("const mounted = useSignal(false)");
    // BUG: lifecycle hooks are dropped — the body has no useVisibleTask$ call even though it is
    // imported, so `mounted` never flips and the import is dead.
    expect(out).toContain("useVisibleTask$"); // present only in the import line
    expect(out).not.toContain("useVisibleTask$(");
    expect(out).not.toContain("setMounted");
    expect(out).not.toContain("cleanup");
  });

  it("Astro: template reads `mounted` that is never declared in the frontmatter", async () => {
    const out = await code("Lifecycle", "astro");
    // Only __attrs is destructured in the frontmatter; no `mounted` binding exists.
    expect(out).toContain("const { ...__attrs } = props;");
    // BUG: the template interpolation references `mounted`, which is undefined at SSR time.
    expect(out).toContain('{mounted ? "mounted" : "pending"}');
    expect(out).not.toContain("const mounted");
  });
});

// ───────────────────── EffectCleanup: createEffect returning a cleanup fn ─────────────────────

describe("EffectCleanup: createEffect with a conditional cleanup return", () => {
  it("Solid: createEffect keeps the signal call + cleanup return; click toggles via setter", async () => {
    const out = await code("EffectCleanup", "solid");
    expect(out).toContain('import { createSignal, createEffect, splitProps } from "solid-js";');
    expect(out).toContain("const [active, setActive] = createSignal(true)");
    // Solid: signal reads stay calls, effect cleanup return is preserved verbatim — correct.
    expect(out).toContain("createEffect(() => { if (active()) {");
    expect(out).toContain("return () => clearInterval(id);");
    expect(out).toContain("onclick={() => setActive(!active())}");
  });

  it("React: useEffect dep [active], but effect body wrongly CALLS the plain-value state `active`", async () => {
    const out = await code("EffectCleanup", "react");
    expect(out).toContain("const [active, setActive] = useState(true)");
    // Dep array and click handler treat `active` as a plain value (correct for React).
    expect(out).toContain("}, [active])");
    expect(out).toContain("onClick={() => setActive(!active)}");
    // BUG: inside the effect, the authored `active()` call is left intact, but in React `active` is
    // a plain boolean, not a function — `if (active())` throws "active is not a function".
    expect(out).toContain("useEffect(() => { if (active()) {");
  });

  it("Vue: watchEffect body calls `active()` (a ref) and click calls undefined `setActive`", async () => {
    const out = await code("EffectCleanup", "vue");
    expect(out).toContain('import { ref, watchEffect } from "vue";');
    expect(out).toContain("const active = ref(true)");
    // BUG: `active` is a ref; the body must read `active.value`, not call `active()`.
    expect(out).toContain("watchEffect(() => { if (active()) {");
    // BUG: no `setActive` binding exists for a Vue ref; the click handler references it undefined.
    expect(out).toContain('@click="() => setActive(!active)"');
  });

  it("Angular: effect()/template reference bare `active`/`setActive` instead of `this.*`", async () => {
    const out = await code("EffectCleanup", "angular");
    expect(out).toContain("active = signal(true)");
    expect(out).toContain("constructor() { effect(() => { if (active()) {");
    // BUG: inside the class, signals and setters must be accessed via `this.`; bare `active()` and
    // `setActive(...)` are undefined. The effect references `active` (not `this.active`) and the
    // template binds an undefined `setActive`.
    expect(out).not.toContain("this.active");
    expect(out).toContain('(click)="() => setActive(!active())"');
  });

  it("Qwik: useVisibleTask$ calls `active()` (a signal) and click double-wraps the handler", async () => {
    const out = await code("EffectCleanup", "qwik");
    expect(out).toContain("const active = useSignal(true)");
    // BUG: `active` is a useSignal; body should read `active.value`, not call `active()`.
    expect(out).toContain("useVisibleTask$(() => { if (active()) {");
    // BUG: the click handler is double-arrowed — `$(() => () => setActive(...))` returns a function
    // on click instead of running the toggle, and `setActive` is not a defined binding.
    expect(out).toContain("onClick={$(() => () => setActive(!active.value))}");
  });
});
