// Angular two-way models (model() signal) and custom events (output()).
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("ModelInput: defineModel → model()", () => {
  it("declares a model signal, reads it in call form, writes via .set()", async () => {
    const out = await compileTo("ModelInput", "angular");
    expect(out).toContain("value = model<string>()");
    expect(out).toContain(`[value]="value()"`);
    expect(out).toContain(`(input)="value.set($event.target.value)"`);
    expect(out).toContain("{{ value() }}");
  });
});

describe("EmitButton: defineEmits → output()", () => {
  it("declares an output and emits via .emit()", async () => {
    const out = await compileTo("EmitButton", "angular");
    expect(out).toContain("press = output()");
    expect(out).toContain(`(click)="press.emit(1)"`);
  });
});
