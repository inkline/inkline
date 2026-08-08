// Vue two-way models (defineModel) and custom events (defineEmits).
import { describe, it, expect } from "vitest";
import { compileTo, compileToAll } from "../../../../testing/codegen.ts";

describe("BoundField: $bind:value on a component (parent side)", () => {
  it("collapses to v-model:<prop>", async () => {
    const out = await compileToAll("BoundField", "vue");
    expect(out).toContain(`<Field v-model:value="text" />`);
  });
});

describe("ModelInput: defineModel macro", () => {
  it("declares defineModel and writes through the ref", async () => {
    const out = await compileTo("ModelInput", "vue");
    expect(out).toContain('const value = defineModel<string>("value")');
    expect(out).toContain(`:value="value"`);
    expect(out).toContain(`@input="e => value = e.target.value"`);
    expect(out).toContain("{{ value }}");
  });
});

describe("EmitButton: defineEmits", () => {
  it("declares a payload-typed defineEmits and keeps the emit call", async () => {
    const out = await compileTo("EmitButton", "vue");
    // Vue's macro takes the same shape the authoring API does, so the declaration carries over.
    expect(out).toContain("const emit = defineEmits<{ press: [count: number] }>()");
    expect(out).toContain(`emit("press", 1)`);
  });
});
