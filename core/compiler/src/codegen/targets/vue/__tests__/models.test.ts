// Vue two-way models (defineModel) and custom events (defineEmits).
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

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
  it("declares defineEmits and keeps the emit call", async () => {
    const out = await compileTo("EmitButton", "vue");
    expect(out).toContain('const emit = defineEmits(["press"])');
    expect(out).toContain(`emit("press", 1)`);
  });
});
