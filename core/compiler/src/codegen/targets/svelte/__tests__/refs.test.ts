// Svelte codegen: element refs (bind:this) wired to $state and read from $effect.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ElementRef: a single createRef() bound to <input>, focused in onMount.
// Svelte expresses element refs via $state + bind:this, with the focus call
// running inside an $effect.
// ---------------------------------------------------------------------------
describe("ElementRef: single template ref bound + focused on mount", () => {
  it("Svelte: bind:this with a $state ref, $effect calls focus directly", async () => {
    const out = await compileTo("ElementRef", "svelte");
    expect(out).toContain("let inputRef = $state<HTMLElement | null>(null)");
    expect(out).toContain("bind:this={inputRef}");
    expect(out).toContain("$effect(() => { inputRef?.focus(); })");
  });
});

// ---------------------------------------------------------------------------
// MultiRefs: two refs (inputRef + buttonRef) on sibling elements; only inputRef
// is used in onMount. Verifies each ref is wired independently and both bindings
// survive even when one ref is never read.
// ---------------------------------------------------------------------------
describe("MultiRefs: two independent refs on sibling elements", () => {
  it("Svelte: both refs use bind:this on their respective elements", async () => {
    const out = await compileTo("MultiRefs", "svelte");
    expect(out).toContain("let inputRef = $state<HTMLElement | null>(null)");
    expect(out).toContain("let buttonRef = $state<HTMLElement | null>(null)");
    expect(out).toContain('<input bind:this={inputRef} placeholder="focus me" />');
    expect(out).toContain("<button bind:this={buttonRef}>");
  });
});
