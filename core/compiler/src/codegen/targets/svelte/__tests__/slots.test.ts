// Svelte codegen assertions for the "slots" feature area: author `.ink.tsx` with `<Slot />` /
// `defineSlot()` → compile → assert the ACTUAL generated Svelte code (Svelte 5 `{@render}` snippets,
// with fallback content wrapped in `{#if}`/`{:else}`).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// --- SlotWithFallback: <Slot name="header"><h1/></Slot> + <Slot>text</Slot> ------------------
describe("SlotWithFallback: slot fallback content", () => {
  it("Svelte: fallback rendered via {#if}/{:else} around {@render}", async () => {
    const out = await compileTo("SlotWithFallback", "svelte");
    expect(out).toContain("{#if headerSnippet}{@render headerSnippet()}");
    expect(out).toContain("Default Header");
    expect(out).toContain("{#if children}{@render children()}{:else}Default body content{/if}");
  });
});
