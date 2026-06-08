// Angular forms: two-way bindings compile to signal state and the model setter
// is rewritten to the signal's .set() call in event bindings.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Angular: signal setter rewritten to signal.set()", () => {
  it("(change) handler calls the signal's .set() as a statement", async () => {
    const out = await compileTo("TwoWayCheckbox", "angular");
    expect(out).toContain("checked = signal(false)");
    // Event binding is a statement that mutates the signal via .set().
    expect(out).toContain(`(change)="checked.set(!checked())"`);
    // No undefined setChecked declaration exists in the class body.
    expect(out).not.toContain("setChecked");
  });

  it("(input) handler calls signal.set() with $event mapped from the param", async () => {
    const out = await compileTo("FormField", "angular");
    expect(out).toContain(`value = signal('')`);
    expect(out).toContain(`(input)="value.set($event.target.value)"`);
  });
});
