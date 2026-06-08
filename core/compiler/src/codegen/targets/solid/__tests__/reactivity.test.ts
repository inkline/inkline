// Solid reactivity wiring: createSignal/createMemo call-style reads and
// dependency threading across signals, memos, and event handlers.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Counter: signal + memo + effect dependency wiring", () => {
  it("Solid: createSignal/createMemo call-style reads", async () => {
    const out = await compileTo("Counter", "solid");
    expect(out).toContain("const [count, setCount] = createSignal(0)");
    expect(out).toContain("const doubled = createMemo(() => count() * 2)");
  });
});

describe("BatchUpdates: batch() helper inside an event handler", () => {
  // `batch(() => { … })` is a no-op grouping wrapper in the authoring model (every framework batches
  // synchronous updates), so it is unwrapped to the inner body — no undefined `batch` import.
  it("Solid: sum memo wires both signals; the batch wrapper is unwrapped to its body", async () => {
    const out = await compileTo("BatchUpdates", "solid");
    expect(out).toContain("const sum = createMemo(() => x() + y())");
    expect(out).toContain("onclick={() => { setX(x() + 1); setY(y() + 1); }}");
    expect(out).not.toContain("batch(");
  });
});

describe("DynamicAccess: computed indexing one signal by another", () => {
  it("Solid: dynamic key access uses call-style reads", async () => {
    const out = await compileTo("DynamicAccess", "solid");
    expect(out).toContain("const value = createMemo(() => obj()[key()])");
  });
});
