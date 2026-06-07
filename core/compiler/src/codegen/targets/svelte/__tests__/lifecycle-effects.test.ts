// Svelte codegen assertions for the "lifecycle-effects" area: onMount / onCleanup and
// createEffect-with-cleanup authored in `.ink.tsx`, compiled through the FULL pipeline, asserting
// the ACTUAL emitted Svelte code ($state, $effect, setter rewrites to plain assignment).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ───────────────────────── Lifecycle: onMount + onCleanup + signal ─────────────────────────

describe("Lifecycle: onMount/onCleanup with a signal", () => {
  it("Svelte: $effect lifecycle; mount body assigns `mounted = true` via the setter rewrite", async () => {
    const out = await compileTo("Lifecycle", "svelte");
    expect(out).toContain("let mounted = $state(false)");
    // onCleanup correctly becomes an $effect returning a teardown.
    expect(out).toContain('$effect(() => { return () => { console.log("cleanup"); } })');
    // Svelte uses $state (no setter fn); the `setMounted(true)` call is rewritten to `mounted = true`.
    expect(out).toContain("$effect(() => { mounted = true; })");
  });
});
