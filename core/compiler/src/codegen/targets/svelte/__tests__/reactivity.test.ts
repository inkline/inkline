// Reactivity integration tests for the Svelte target: signal/memo/effect
// dependency wiring compiled to Svelte 5 runes.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Counter: signal + memo + effect dependency wiring", () => {
  it("Svelte: $state/$derived rune wiring", async () => {
    const out = await compileTo("Counter", "svelte");
    expect(out).toContain("let count = $state(0)");
    expect(out).toContain("let doubled = $derived(count * 2)");
  });
});
