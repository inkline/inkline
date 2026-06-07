// Angular codegen assertions for the "lifecycle-effects" area: onMount → afterNextRender,
// onCleanup → DestroyRef.onDestroy, and createEffect-with-cleanup → effect() — authored in
// `.ink.tsx`, compiled through the full pipeline, asserting the actual emitted Angular code.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ───────────────────────── Lifecycle: onMount + onCleanup + signal ─────────────────────────

describe("Lifecycle: onMount/onCleanup with a signal", () => {
  it("Angular: onMount → afterNextRender, onCleanup → DestroyRef.onDestroy, consolidated in the constructor", async () => {
    const out = await compileTo("Lifecycle", "angular");
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
});

// ───────────────────── EffectCleanup: createEffect returning a cleanup fn ─────────────────────

describe("EffectCleanup: createEffect with a conditional cleanup return", () => {
  it("Angular: effect() body reads signals via `this.*` inside the constructor; click binding sets the signal", async () => {
    const out = await compileTo("EffectCleanup", "angular");
    expect(out).toContain("active = signal(true)");
    // The effect lives in the constructor and accesses the signal via `this.active()`.
    expect(out).toContain("constructor() { effect(() => { if (this.active()) {");
    expect(out).toContain("return () => clearInterval(id); } }) }");
    // The click binding is a statement that updates the signal via its setter.
    expect(out).toContain('(click)="active.set(!active())"');
  });
});
