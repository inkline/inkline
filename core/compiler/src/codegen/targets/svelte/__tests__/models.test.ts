// Svelte two-way models ($bindable) and custom-event callback props.
import { describe, it, expect } from "vitest";
import { compileTo, compileToAll } from "../../../../testing/codegen.ts";

describe("BoundField: $bind:value on a component (parent side)", () => {
  it("collapses to bind:<prop>", async () => {
    const out = await compileToAll("BoundField", "svelte");
    expect(out).toContain("<Field bind:value={text} />");
  });
});

describe("ModelInput: defineModel → $bindable", () => {
  it("destructures a $bindable prop and reassigns it on update", async () => {
    const out = await compileTo("ModelInput", "svelte");
    expect(out).toContain("value = $bindable()");
    expect(out).toContain("value={value}");
    expect(out).toContain("oninput={e => value = e.target.value}");
    expect(out).toContain("value?: string");
    // Svelte models are two-way via $bindable, so no update callback prop is declared.
    expect(out).not.toContain("onUpdateValue");
  });
});

describe("EmitButton: defineEmits → callback prop", () => {
  it("rewrites emit(name, …) to a bare on<Name>?.() callback", async () => {
    const out = await compileTo("EmitButton", "svelte");
    expect(out).toContain("onclick={() => onPress?.(1)}");
    expect(out).toContain("onPress?: (...args: any[]) => void");
  });
});
