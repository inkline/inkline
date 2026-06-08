// Svelte forms integration: two-way bindings where the $state setter is
// rewritten into idiomatic reassignment instead of an undefined setter call.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Svelte: $state setter rewritten to reassignment", () => {
  it("onchange mutates `let checked = $state(...)` via reassignment", async () => {
    const out = await compileTo("TwoWayCheckbox", "svelte");
    expect(out).toContain("let checked = $state(false)");
    // Svelte mutates via reassignment, not an undefined setter.
    expect(out).toContain(`onchange={() => checked = !checked}`);
    expect(out).not.toContain("setChecked");
  });

  it("textarea oninput mutates state via reassignment", async () => {
    const out = await compileTo("ControlledTextarea", "svelte");
    expect(out).toContain(`let text = $state("")`);
    expect(out).toContain(`oninput={e => text = e.target.value}`);
    expect(out).not.toContain("function setText");
  });
});
