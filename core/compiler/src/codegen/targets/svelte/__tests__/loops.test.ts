// Loops codegen for the Svelte target: <For> / native `.map()` lowered to keyed `{#each}` blocks,
// including nested iteration and lists driven by mutable $state.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("ForLoop: <For each> with a string key extractor", () => {
  it("Svelte: {#each ... as item (item)} keyed block reads $state", async () => {
    const out = await compileTo("ForLoop", "svelte");
    expect(out).toContain('let items = $state(["Apple", "Banana", "Cherry"])');
    expect(out).toContain("{#each items as item (item)}");
    expect(out).toContain("{/each}");
  });
});

describe("NestedLoops: <For> inside <For> with index key extractors", () => {
  it("Svelte: nested keyed {#each} blocks with index keys", async () => {
    const out = await compileTo("NestedLoops", "svelte");
    expect(out).toContain("{#each grid as row, i (i)}");
    expect(out).toContain("{#each row as cell, j (j)}");
  });
});

describe("DynamicList: <For> driven by mutable state + event handlers", () => {
  it("Svelte: keyed {#each} over $state list, indexed key", async () => {
    const out = await compileTo("DynamicList", "svelte");
    expect(out).toContain("let items = $state([])");
    expect(out).toContain("{#each items as item, i (i)}");
  });
});
