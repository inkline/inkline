// Svelte two-way models ($bindable) and custom-event callback props.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("ModelInput: defineModel → $bindable", () => {
  it("destructures a $bindable prop and reassigns it on update", async () => {
    const out = await compileTo("ModelInput", "svelte");
    expect(out).toContain("value = $bindable()");
    expect(out).toContain("value={value}");
    expect(out).toContain("oninput={e => value = e.target.value}");
    expect(out).toContain("onUpdateValue?: (value: string) => void");
  });
});

describe("EmitButton: defineEmits → callback prop", () => {
  it("rewrites emit(name, …) to a bare on<Name>?.() callback", async () => {
    const out = await compileTo("EmitButton", "svelte");
    expect(out).toContain("onclick={() => onPress?.(1)}");
    expect(out).toContain("onPress?: (...args: any[]) => void");
  });
});
