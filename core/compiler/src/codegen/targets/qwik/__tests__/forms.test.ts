// Qwik codegen assertions for the "forms" feature area: two-way bindings where the
// handler is single-$()-wrapped and the model setter is rewritten to a `signal.value` assignment.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Qwik: handler single-wrapped + signal.value setter", () => {
  it("onInput is single-wrapped `$(e => value.value = ...)`", async () => {
    const out = await compileTo("FormField", "qwik");
    expect(out).toContain('const value = useSignal("")');
    // Single $() wrap, param preserved, mutation via signal.value.
    expect(out).toContain(`onInput={$(e => value.value = e.target.value)}`);
  });

  it("checkbox onChange single-wrapped `$(() => checked.value = ...)`", async () => {
    const out = await compileTo("TwoWayCheckbox", "qwik");
    expect(out).toContain(`onChange={$(() => checked.value = !checked.value)}`);
  });
});
