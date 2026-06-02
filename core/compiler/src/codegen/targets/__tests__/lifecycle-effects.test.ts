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

  it("Vue: watchEffect body still calls `active()` (a ref), but click assigns the ref via the setter rewrite", async () => {
    const out = await code("EffectCleanup", "vue");
    expect(out).toContain('import { ref, watchEffect } from "vue";');
    expect(out).toContain("const active = ref(true)");
    // BUG: `active` is a ref; the effect body must read `active.value`, not call `active()`.
    expect(out).toContain("watchEffect(() => { if (active()) {");
    // The click handler's `setActive(!active)` is rewritten to a ref assignment (Vue template, no .value).
    expect(out).toContain('@click="() => active = !active"');
  });

  it("Angular: effect() body references bare `active` instead of `this.*`, but click binding sets the signal", async () => {
    const out = await code("EffectCleanup", "angular");
    expect(out).toContain("active = signal(true)");
    expect(out).toContain("constructor() { effect(() => { if (active()) {");
    // BUG: inside the class, the effect body must access signals via `this.`; bare `active()` is
    // undefined. The effect references `active` (not `this.active`).
    expect(out).not.toContain("this.active");
    // The click binding is a statement that updates the signal via its setter (param mapped to $event-free body).
    expect(out).toContain('(click)="active.set(!active())"');
  });

  it("Qwik: useVisibleTask$ body still calls `active()` (a signal), but click is single-wrapped and assigns `.value`", async () => {
    const out = await code("EffectCleanup", "qwik");
    expect(out).toContain("const active = useSignal(true)");
    // BUG: `active` is a useSignal; the effect body should read `active.value`, not call `active()`.
    expect(out).toContain("useVisibleTask$(() => { if (active()) {");
    // The click handler is single-wrapped now and the setter is rewritten to a `.value` assignment.
    expect(out).toContain("onClick={$(() => active.value = !active.value)}");
  });
});
