// Angular two-way models (model() signal) and custom events (output()).
import { describe, it, expect } from "vitest";
import { compileTo, compileToAll } from "../../../../testing/codegen.ts";

describe("BoundField: $bind:value on a component (parent side)", () => {
  it("binds the input signal and the <prop>Change output", async () => {
    const out = await compileToAll("BoundField", "angular");
    expect(out).toContain(`[value]="text()"`);
    expect(out).toContain(`(valueChange)="text.set($event)"`);
  });
});

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
  it("declares a payload-typed output and emits via .emit()", async () => {
    const out = await compileTo("EmitButton", "angular");
    // `defineEmits<{ press: [count: number] }>()` — the single-element tuple unwraps to the one
    // value an Angular output carries. A bare `output()` is `OutputEmitterRef<void>`, which the
    // `emit(1)` below does not even type-check against.
    expect(out).toContain("press = output<number>()");
    expect(out).toContain(`(click)="press.emit(1)"`);
  });
});
