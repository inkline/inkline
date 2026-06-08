// Vue forms integration: two-way model bindings compile to a <script setup> ref plus an
// idiomatic template assignment (the model setter is rewritten to `x = v`, .value stripped).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// State setters are wired per target. The two-way binding mutation path is
// rewritten into the idiomatic Vue form: template `x = v` (with .value stripped
// in template, Vue re-adds it). The handler no longer references an undefined setter.
// ---------------------------------------------------------------------------

describe("Vue: model setter is rewritten to template assignment", () => {
  it("<script setup> declares ref; @change mutates it via template assignment", async () => {
    const out = await compileTo("TwoWayCheckbox", "vue");
    // ref is declared...
    expect(out).toContain("const checked = ref(false)");
    // ...and there is no undefined `setChecked` in scope.
    expect(out).not.toContain("setChecked =");
    expect(out).not.toContain("function setChecked");
    // Handler mutates the ref directly (template strips .value, Vue re-adds it).
    expect(out).toContain(`@change="() => checked = !checked"`);
  });

  it("number input handler mutates ref via template assignment", async () => {
    const out = await compileTo("TwoWayNumber", "vue");
    expect(out).toContain("const value = ref(0)");
    expect(out).toContain(`@input="e => value = Number(e.target.value)"`);
    expect(out).not.toContain("const setValue");
  });
});
