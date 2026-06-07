// Qwik codegen assertions for the "lifecycle-effects" area: onMount / onCleanup and
// createEffect-with-cleanup authored in `.ink.tsx`, compiled through the FULL pipeline, asserting
// the ACTUAL emitted Qwik code (useVisibleTask$, useSignal, `.value` reads/writes).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ───────────────────────── Lifecycle: onMount + onCleanup + signal ─────────────────────────

describe("Lifecycle: onMount/onCleanup with a signal", () => {
  it("Qwik: onMount → useVisibleTask$, onCleanup → useVisibleTask$ with cleanup(); setter rewritten to .value", async () => {
    const out = await compileTo("Lifecycle", "qwik");
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
});

// ───────────────────── EffectCleanup: createEffect returning a cleanup fn ─────────────────────

describe("EffectCleanup: createEffect with a conditional cleanup return", () => {
  it("Qwik: useVisibleTask$ body reads `active.value` (the signal); click is single-wrapped and assigns `.value`", async () => {
    const out = await compileTo("EffectCleanup", "qwik");
    expect(out).toContain("const active = useSignal(true)");
    // `active` is a useSignal, so the effect body reads `active.value`.
    expect(out).toContain("useVisibleTask$(() => { if (active.value) {");
    // The click handler is single-wrapped and the setter is rewritten to a `.value` assignment.
    expect(out).toContain("onClick={$(() => active.value = !active.value)}");
  });
});
