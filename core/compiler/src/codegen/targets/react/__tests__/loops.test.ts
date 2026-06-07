// Real-world codegen assertions for the "loops" feature area (React target): author `.ink.tsx` with
// `<For>` / native `.map()` → compile through the full pipeline → assert the ACTUAL generated React
// code. Focus: list rendering, key wiring, and nested iteration.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("ForLoop: <For each> with a string key extractor", () => {
  it("React: maps over the signal value, key is the extracted value from the key extractor", async () => {
    const out = await compileTo("ForLoop", "react");
    expect(out).toContain("{items.map((item) => (");
    // The React <For> lowering applies the key extractor to produce the per-row key value, so the
    // emitted React `key` is the extracted value `item` (wrapped in a keyed `Fragment`, imported by
    // name so it resolves under the automatic JSX runtime), not the raw extractor function.
    expect(out).toContain("<Fragment key={item}>");
  });
});

describe("MapInExpression: native .map() with a literal `key` prop (no <For>)", () => {
  it("React: literal key prop is preserved correctly (contrast with <For>)", async () => {
    const out = await compileTo("MapInExpression", "react");
    // Native .map with `key={t}` is lowered correctly — proves the <For> key bug above is specific
    // to the <For> lowering, not React keys in general.
    expect(out).toContain("{tags.map((t) => (<Fragment key={t}><span>{t}</span></Fragment>))}");
  });
});

describe("NestedLoops: <For> inside <For> with index key extractors", () => {
  it("React: nested maps, both keys are the extracted index values", async () => {
    const out = await compileTo("NestedLoops", "react");
    // The index key extractors `(_, i) => i` / `(_, j) => j` are reduced to the extracted values, so
    // the keyed `Fragment`s use `key={i}` and `key={j}` at both nesting levels.
    expect(out).toContain("{grid.map((row, i) => (");
    expect(out).toContain("<Fragment key={i}>");
    expect(out).toContain("<Fragment key={j}>");
  });
});
