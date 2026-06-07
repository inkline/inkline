// Vue lifecycle-effects codegen: onMounted/onUnmounted wiring and watchEffect with
// state setters rewritten to ref assignments and ref reads (`.value`).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ───────────────────────── Lifecycle: onMount + onCleanup + signal ─────────────────────────

describe("Lifecycle: onMount/onCleanup with a signal", () => {
  it("Vue: onMounted/onUnmounted wired; mount body assigns `mounted.value = true` via the setter rewrite", async () => {
    const out = await compileTo("Lifecycle", "vue");
    expect(out).toContain('import { ref, onMounted, onUnmounted } from "vue";');
    expect(out).toContain("const mounted = ref(false)");
    expect(out).toContain('onUnmounted(() => { console.log("cleanup"); })');
    // The `setMounted(true)` call is rewritten in <script> to a `.value` assignment on the ref.
    expect(out).toContain("onMounted(() => { mounted.value = true; })");
  });
});

// ───────────────────── EffectCleanup: createEffect returning a cleanup fn ─────────────────────

describe("EffectCleanup: createEffect with a conditional cleanup return", () => {
  it("Vue: watchEffect body reads `active.value` (the ref), and the click assigns the ref via the setter rewrite", async () => {
    const out = await compileTo("EffectCleanup", "vue");
    expect(out).toContain('import { ref, watchEffect } from "vue";');
    expect(out).toContain("const active = ref(true)");
    // `active` is a ref, so the <script setup> effect body reads `active.value`.
    expect(out).toContain("watchEffect(() => { if (active.value) {");
    // The click handler's `setActive(!active)` is rewritten to a ref assignment (Vue template, no .value).
    expect(out).toContain('@click="() => active = !active"');
  });
});
