// Real-world codegen assertions for the "lifecycle-effects" area: onMount / onCleanup and
// createEffect-with-cleanup authored in `.ink.tsx`, compiled through the FULL pipeline, asserting
// the ACTUAL emitted framework code. These fixtures exercise per-target lifecycle APIs (useEffect,
// onMount/onCleanup, onMounted/onUnmounted/watchEffect, $effect, Angular effect(), useVisibleTask$).
//
// Each assertion pins the now-correct emitted code: lifecycle hooks are wired per target, state
// setters are rewritten to each framework's native write form, and effect bodies read state with
// the correct read form (plain value for React, `.value` for Vue/Qwik refs, `this.*` for Angular).

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

  it("Vue: onMounted/onUnmounted wired; mount body assigns `mounted.value = true` via the setter rewrite", async () => {
    const out = await code("Lifecycle", "vue");
    expect(out).toContain('import { ref, onMounted, onUnmounted } from "vue";');
    expect(out).toContain("const mounted = ref(false)");
    expect(out).toContain('onUnmounted(() => { console.log("cleanup"); })');
    // The `setMounted(true)` call is rewritten in <script> to a `.value` assignment on the ref.
    expect(out).toContain("onMounted(() => { mounted.value = true; })");
  });

  it("Svelte: $effect lifecycle; mount body assigns `mounted = true` via the setter rewrite", async () => {
    const out = await code("Lifecycle", "svelte");
    expect(out).toContain("let mounted = $state(false)");
    // onCleanup correctly becomes an $effect returning a teardown.
    expect(out).toContain('$effect(() => { return () => { console.log("cleanup"); } })');
    // Svelte uses $state (no setter fn); the `setMounted(true)` call is rewritten to `mounted = true`.
    expect(out).toContain("$effect(() => { mounted = true; })");
  });

  it("Angular: onMount → afterNextRender, onCleanup → DestroyRef.onDestroy, consolidated in the constructor", async () => {
    const out = await code("Lifecycle", "angular");
    expect(out).toContain("mounted = signal(false)");
    // Lifecycle hooks are imported and wired into a single constructor.
    expect(out).toContain(
      'import { Component, signal, computed, effect, afterNextRender, inject, DestroyRef } from "@angular/core";',
    );
    // onMount → afterNextRender; the setMounted(true) call becomes a `this.mounted.set(true)` signal write.
    expect(out).toContain(
      "constructor() { afterNextRender(() => { this.mounted.set(true); }); inject(DestroyRef).onDestroy(() => { console.log('cleanup'); }) }",
    );
    // No React-style setter survives in the Angular output.
    expect(out).not.toContain("setMounted");
  });

  it("Qwik: onMount → useVisibleTask$, onCleanup → useVisibleTask$ with cleanup(); setter rewritten to .value", async () => {
    const out = await code("Lifecycle", "qwik");
    expect(out).toContain("const mounted = useSignal(false)");
    // onMount lowers to a useVisibleTask$; the setMounted(true) call becomes a `.value` assignment.
    expect(out).toContain("useVisibleTask$(() => { mounted.value = true; })");
    // onCleanup lowers to a useVisibleTask$ that registers a teardown via the injected cleanup().
    expect(out).toContain(
      'useVisibleTask$(({ cleanup }) => cleanup(() => { console.log("cleanup"); }))',
    );
    // The Qwik output uses `.value` reads, not the React setter.
    expect(out).not.toContain("setMounted");
    expect(out).toContain('{mounted.value ? "mounted" : "pending"}');
  });

  it("Astro: signal state is declared as `let mounted = false` in the frontmatter and read by the template", async () => {
    const out = await code("Lifecycle", "astro");
    expect(out).toContain("const { ...__attrs } = props;");
    // The signal state is declared in the frontmatter, so the template read is well-defined at SSR.
    expect(out).toContain("let mounted = false");
    expect(out).toContain('{mounted ? "mounted" : "pending"}');
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

  it("React: useEffect reads the plain-value state `active`, with a granular [active] dep array and cleanup return", async () => {
    const out = await code("EffectCleanup", "react");
    expect(out).toContain("const [active, setActive] = useState(true)");
    // Dep array and click handler treat `active` as a plain value (correct for React).
    expect(out).toContain("}, [active])");
    expect(out).toContain("onClick={() => setActive(!active)}");
    // Inside the effect, `active` is read as a plain boolean (no spurious call form), and the
    // conditional cleanup return is preserved.
    expect(out).toContain("useEffect(() => { if (active) {");
    expect(out).toContain("return () => clearInterval(id); } }, [active])");
  });

  it("Vue: watchEffect body reads `active.value` (the ref), and the click assigns the ref via the setter rewrite", async () => {
    const out = await code("EffectCleanup", "vue");
    expect(out).toContain('import { ref, watchEffect } from "vue";');
    expect(out).toContain("const active = ref(true)");
    // `active` is a ref, so the <script setup> effect body reads `active.value`.
    expect(out).toContain("watchEffect(() => { if (active.value) {");
    // The click handler's `setActive(!active)` is rewritten to a ref assignment (Vue template, no .value).
    expect(out).toContain('@click="() => active = !active"');
  });

  it("Angular: effect() body reads signals via `this.*` inside the constructor; click binding sets the signal", async () => {
    const out = await code("EffectCleanup", "angular");
    expect(out).toContain("active = signal(true)");
    // The effect lives in the constructor and accesses the signal via `this.active()`.
    expect(out).toContain("constructor() { effect(() => { if (this.active()) {");
    expect(out).toContain("return () => clearInterval(id); } }) }");
    // The click binding is a statement that updates the signal via its setter.
    expect(out).toContain('(click)="active.set(!active())"');
  });

  it("Qwik: useVisibleTask$ body reads `active.value` (the signal); click is single-wrapped and assigns `.value`", async () => {
    const out = await code("EffectCleanup", "qwik");
    expect(out).toContain("const active = useSignal(true)");
    // `active` is a useSignal, so the effect body reads `active.value`.
    expect(out).toContain("useVisibleTask$(() => { if (active.value) {");
    // The click handler is single-wrapped and the setter is rewritten to a `.value` assignment.
    expect(out).toContain("onClick={$(() => active.value = !active.value)}");
  });
});
