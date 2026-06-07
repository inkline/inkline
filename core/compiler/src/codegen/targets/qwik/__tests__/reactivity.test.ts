// Reactivity integration tests for the Qwik target: signal/memo/effect wiring
// and event-handler setter rewrites in the compiled Qwik output.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Counter: signal + memo + effect dependency wiring", () => {
  it("Qwik: click handler is single-wrapped with the setter rewritten to .value assignment", async () => {
    const out = await compileTo("Counter", "qwik");
    // Single $(...) wrap and the setter call is rewritten to a signal .value
    // assignment, so clicking runs the handler instead of returning a function.
    expect(out).toContain("onClick={$(() => count.value = count.value + 1)}");
    expect(out).not.toContain("$(() => () =>");
    expect(out).not.toContain("setCount");
  });
});
