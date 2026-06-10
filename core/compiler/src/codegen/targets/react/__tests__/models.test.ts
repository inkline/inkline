// React two-way models (value prop + onUpdate callback) and custom-event callback props.
import { describe, it, expect } from "vitest";
import { compileTo, compileToAll } from "../../../../testing/codegen.ts";

describe("BoundField: $bind:value on a component (parent side)", () => {
  it("passes the value down and the update callback up", async () => {
    const out = await compileToAll("BoundField", "react");
    expect(out).toContain("<Field value={text} onUpdateValue={v => setText(v)} />");
  });
});

describe("ModelInput: defineModel → value prop + onUpdateValue callback", () => {
  it("reads props.value and emits via the update callback", async () => {
    const out = await compileTo("ModelInput", "react");
    expect(out).toContain("value={props.value}");
    expect(out).toContain("onInput={e => props.onUpdateValue?.(e.target.value)}");
    expect(out).toContain("value?: string");
    expect(out).toContain("onUpdateValue?: (value: string) => void");
    expect(out).not.toContain("useState"); // a model is not local state
  });
});

describe("EmitButton: defineEmits → callback prop", () => {
  it("rewrites emit(name, …) to props.on<Name>?.()", async () => {
    const out = await compileTo("EmitButton", "react");
    expect(out).toContain("props.onPress?.(1)");
    expect(out).toContain("onPress?: (...args: any[]) => void");
  });
});
