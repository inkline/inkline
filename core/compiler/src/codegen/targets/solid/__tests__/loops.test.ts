// Real-world codegen assertions for the "loops" feature area (Solid target): author `.ink.tsx` with
// `<For>` / native `.map()` → compile through the full pipeline → assert the ACTUAL generated Solid code.
// Focus: list rendering, keys/track wiring, and nested iteration.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("ForLoop: <For each> with a string key extractor", () => {
  it("Solid: <For each={items()}> with the render callback as a child", async () => {
    const out = await compileTo("ForLoop", "solid");
    expect(out).toContain("<For each={items()}>");
    expect(out).toContain("{(item) => <li>{item}</li>}");
  });
});

describe("NestedLoops: <For> inside <For> with index key extractors", () => {
  it("Solid: nested <For>, inner each={row} closes over the outer callback param", async () => {
    const out = await compileTo("NestedLoops", "solid");
    expect(out).toContain("<For each={grid()}>");
    expect(out).toContain("<For each={row}>{(cell, j) => <span>{cell}</span>}</For>");
  });
});

describe("List: <For> alongside a mutating button", () => {
  it("Solid: <For each={items()}> with sibling button that appends via setItems", async () => {
    const out = await compileTo("List", "solid");
    expect(out).toContain("<For each={items()}>");
    expect(out).toContain('onclick={() => setItems([...items(), "C"])}');
  });
});
