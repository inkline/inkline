// Real-world Vue codegen assertions for the "loops" feature area: author `.ink.tsx` with `<For>` /
// native `.map()` → compile through the full pipeline → assert the ACTUAL generated Vue code.
// Focus: list rendering, keys/track wiring, and nested iteration.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("ForLoop: <For each> with a string key extractor", () => {
  it('Vue: native v-for with the key extractor reduced to `:key="item"`', async () => {
    const out = await compileTo("ForLoop", "vue");
    expect(out).toContain('<li v-for="item in items" :key="item">');
    expect(out).toContain("{{ item }}");
  });
});

describe("NestedLoops: <For> inside <For> with index key extractors", () => {
  it("Vue: nested v-for, inner iterates the outer row binding", async () => {
    const out = await compileTo("NestedLoops", "vue");
    expect(out).toContain('<div v-for="(row, i) in grid" :key="i">');
    expect(out).toContain('<span v-for="(cell, j) in row" :key="j">');
  });
});
