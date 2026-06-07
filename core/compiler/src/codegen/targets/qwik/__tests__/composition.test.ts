// Qwik codegen assertions for the "composition" feature area: components that instantiate other
// components (same-file children, multiple components per file, cross-file imports), exercising the
// full pipeline (parse → lower → analyze → codegen).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Composite: signal setters dropped from non-React event handlers", () => {
  it("Qwik: click handler is single-wrapped and assigns the signal value directly", async () => {
    const out = await compileTo("Composite", "qwik");
    // The handler is single-wrapped now: `$(() => x.value = x.value + 1)` — clicking assigns the
    // signal directly instead of returning an inner arrow, and the setter is rewritten away.
    expect(out).toContain("onClick={$(() => x.value = x.value + 1)}");
    expect(out).not.toContain("setX");
  });
});
