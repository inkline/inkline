// Control-flow codegen for the Svelte target: Show/when/fallback, Switch/Match,
// conditional class bindings, and memoized conditional reads.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// Conditional: <Show when fallback> per-target if/else syntax
// ---------------------------------------------------------------------------
describe("Conditional: Show/when/fallback control flow", () => {
  it("Svelte: {#if}/{:else}/{/if} block", async () => {
    const out = await compileTo("Conditional", "svelte");
    expect(out).toContain("{#if visible}");
    expect(out).toContain("{:else}");
    expect(out).toContain("{/if}");
  });
});

// ---------------------------------------------------------------------------
// SwitchTabs: <Switch>/<Match> control flow
// ---------------------------------------------------------------------------
describe("SwitchTabs: Switch/Match control flow", () => {
  it("Svelte: {#if}/{:else if}/{/if} chain", async () => {
    const out = await compileTo("SwitchTabs", "svelte");
    expect(out).toContain('{#if tab === "a"}');
    expect(out).toContain('{:else if tab === "b"}');
  });
});

// ---------------------------------------------------------------------------
// ConditionalClass: conditional class binding per target
// ---------------------------------------------------------------------------
describe("ConditionalClass: conditional class binding", () => {
  it("Svelte: ternary merged with __attrs.class (destructured rest)", async () => {
    const out = await compileTo("ConditionalClass", "svelte");
    expect(out).toContain(
      'class={[active ? "active" : "inactive", __attrs.class].filter(Boolean).join(" ")}',
    );
  });
});

// ---------------------------------------------------------------------------
// ConditionalRead: createMemo over a conditional read of two signals
// ---------------------------------------------------------------------------
describe("ConditionalRead: memoized conditional read", () => {
  it("Svelte: $derived expression over $state signals", async () => {
    const out = await compileTo("ConditionalRead", "svelte");
    expect(out).toContain("let value = $derived((flag ? a : b))");
  });
});
