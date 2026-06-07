// Solid forms integration: two-way bindings compile to createSignal state with
// value()/checked() reads and lowercased event handlers that call the setter.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("TwoWayCheckbox: checked binding + onChange", () => {
  it("Solid: createSignal, checked reads checked(), onchange calls setter()", async () => {
    const out = await compileTo("TwoWayCheckbox", "solid");
    expect(out).toContain("const [checked, setChecked] = createSignal(false)");
    expect(out).toContain(
      `<input type="checkbox" checked={checked()} onchange={() => setChecked(!checked())} />`,
    );
  });
});

describe("TwoWayNumber: value binding + onInput coercion", () => {
  it("Solid: value reads value(), oninput lowercased, setter coerces", async () => {
    const out = await compileTo("TwoWayNumber", "solid");
    expect(out).toContain(
      `<input type="number" value={value()} oninput={e => setValue(Number(e.target.value))} />`,
    );
  });
});

describe("ControlledSelect / ControlledTextarea / FormField: value + change/input", () => {
  it("Solid: FormField input reads value() and oninput calls setValue", async () => {
    const out = await compileTo("FormField", "solid");
    expect(out).toContain(`<input value={value()} oninput={e => setValue(e.target.value)} />`);
    expect(out).toContain("{value()}");
  });
});
