// Real-world codegen assertions for the "scoped-slots" feature area (Svelte target):
// author `.ink.tsx` → compile through the FULL pipeline → assert the ACTUAL generated Svelte code.
// Focus: scoped / render-prop slots and how Svelte threads the slot ARGUMENTS through.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// SlotScoped: named scoped slot `<Slot name="item" args={[item, index]}>` in a For.
// Svelte renders it as `{@render itemSnippet(item, index)}` — the snippet prop is bound to a
// `<name>Snippet` local so it never collides with the `{#each ... as item}` loop binding.
// ---------------------------------------------------------------------------
describe("SlotScoped: named scoped slot with args={[item, index]}", () => {
  it("Svelte: scope args thread through {@render itemSnippet(item, index)} with fallback", async () => {
    const out = await compileTo("SlotScoped", "svelte");
    expect(out).toContain("{#if itemSnippet}{@render itemSnippet(item, index)}");
    expect(out).toContain("{index}:{item.label}");
  });
});

// ---------------------------------------------------------------------------
// SlotScopedSingle: a DEFAULT scoped slot `<Slot args={[value()]}>` with fallback.
// The positional arg threads through the default `children` snippet.
// ---------------------------------------------------------------------------
describe("SlotScopedSingle: default scoped slot with args={[value()]}", () => {
  it("Svelte: default scoped slot threads the positional arg via {@render children(value)}", async () => {
    const out = await compileTo("SlotScopedSingle", "svelte");
    expect(out).toContain("{#if children}{@render children(value)}");
    expect(out).toContain("{value}");
  });
});
