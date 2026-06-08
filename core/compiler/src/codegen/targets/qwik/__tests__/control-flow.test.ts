// Control-flow codegen for the Qwik target: Show/Switch lowering, conditional
// reads, and For + Show nesting.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// RootConditional: a <Show> that is the component's entire render
// ---------------------------------------------------------------------------
describe("RootConditional: conditional as the root render node", () => {
  it("Qwik: bare ternary inside return, not wrapped in {…}", async () => {
    const out = await compileTo("RootConditional", "qwik");
    expect(out).toContain("return (\nprops.textarea ? (<><textarea /></>) : (<><input /></>))");
    expect(out).not.toContain("return (\n{");
  });
});

// ---------------------------------------------------------------------------
// ConditionalRead: createMemo over a conditional read of two signals
// ---------------------------------------------------------------------------
describe("ConditionalRead: memoized conditional read", () => {
  it("Qwik: useComputed$ reads through .value", async () => {
    const out = await compileTo("ConditionalRead", "qwik");
    expect(out).toContain("const value = useComputed$(() => (flag.value ? a.value : b.value))");
  });
});

// ---------------------------------------------------------------------------
// MixedControlFlow: For + Show nested control flow
// ---------------------------------------------------------------------------
describe("MixedControlFlow: For + Show nesting", () => {
  // Qwik wraps the event handler in a single arrow inside $() and rewrites the
  // setter call to a direct signal assignment: `$(e => filter.value = ...)`.
  it("Qwik: event handler single-wrapped in $() with direct signal assignment", async () => {
    const out = await compileTo("MixedControlFlow", "qwik");
    expect(out).toContain("onInput={$(e => filter.value = e.target.value)}");
  });
});
