// React two-way form bindings: signal state, value/checked reads, and setters
// the change/input handlers can actually call.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("TwoWayCheckbox: checked binding + onChange", () => {
  it("React: useState boolean, checked={checked}, setter toggles", async () => {
    const out = await compileTo("TwoWayCheckbox", "react");
    expect(out).toContain("const [checked, setChecked] = useState(false)");
    expect(out).toContain(
      `<input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />`,
    );
  });
});

describe("TwoWayNumber: value binding + onInput coercion", () => {
  it("React: value={value}, onInput coerces with Number(e.target.value)", async () => {
    const out = await compileTo("TwoWayNumber", "react");
    expect(out).toContain("const [value, setValue] = useState(0)");
    expect(out).toContain(
      `<input type="number" value={value} onInput={e => setValue(Number(e.target.value))} />`,
    );
  });
});

describe("ControlledSelect / ControlledTextarea / FormField: value + change/input", () => {
  it("React: select keeps value + onChange and renders all options", async () => {
    const out = await compileTo("ControlledSelect", "react");
    expect(out).toContain(`value={value}`);
    expect(out).toContain(`onChange={e => setValue(e.target.value)}`);
    expect(out).toContain(`<option value="a">`);
  });

  it("React: textarea value + onInput, text().length flattened to text.length", async () => {
    const out = await compileTo("ControlledTextarea", "react");
    expect(out).toContain(`<textarea value={text} onInput={e => setText(e.target.value)} />`);
    expect(out).toContain("{text.length}");
  });
});
