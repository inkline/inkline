// Real-world codegen assertions for the "lifecycle-effects" area (Solid target): onMount / onCleanup
// and createEffect-with-cleanup authored in `.ink.tsx`, compiled through the FULL pipeline, asserting
// the ACTUAL emitted Solid code (onMount/onCleanup pass-through, createSignal, createEffect cleanup).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ───────────────────────── Lifecycle: onMount + onCleanup + signal ─────────────────────────

describe("Lifecycle: onMount/onCleanup with a signal", () => {
  it("Solid: onMount/onCleanup pass through to the native Solid lifecycle APIs", async () => {
    const out = await compileTo("Lifecycle", "solid");
    expect(out).toContain(
      'import { createSignal, onMount, onCleanup, splitProps } from "solid-js";',
    );
    expect(out).toContain("onMount(() => { setMounted(true); })");
    expect(out).toContain('onCleanup(() => { console.log("cleanup"); })');
    // Solid signals are functions, so the JSX read keeps the call.
    expect(out).toContain('{mounted() ? "mounted" : "pending"}');
  });
});

// ───────────────────── EffectCleanup: createEffect returning a cleanup fn ─────────────────────

describe("EffectCleanup: createEffect with a conditional cleanup return", () => {
  it("Solid: createEffect keeps the signal call + cleanup return; click toggles via setter", async () => {
    const out = await compileTo("EffectCleanup", "solid");
    expect(out).toContain('import { createSignal, createEffect, splitProps } from "solid-js";');
    expect(out).toContain("const [active, setActive] = createSignal(true)");
    // Solid: signal reads stay calls, effect cleanup return is preserved verbatim — correct.
    expect(out).toContain("createEffect(() => { if (active()) {");
    expect(out).toContain("return () => clearInterval(id);");
    expect(out).toContain("onclick={() => setActive(!active())}");
  });
});
