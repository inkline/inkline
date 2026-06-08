// Qwik two-way models (value prop + onUpdate QRL) and custom-event QRL callback props.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("ModelInput: defineModel → value prop + onUpdateValue$ QRL", () => {
  it("reads props.value and emits via a QRL callback", async () => {
    const out = await compileTo("ModelInput", "qwik");
    expect(out).toContain("value={props.value}");
    expect(out).toContain("onInput={$(e => props.onUpdateValue$?.(e.target.value))}");
    expect(out).toContain("onUpdateValue$?: QRL<(value: string) => void>");
    expect(out).toContain(
      "import { component$, useSignal, useComputed$, useVisibleTask$, $, QRL }",
    );
  });
});

describe("EmitButton: defineEmits → QRL callback prop", () => {
  it("rewrites emit(name, …) to props.on<Name>$?.()", async () => {
    const out = await compileTo("EmitButton", "qwik");
    expect(out).toContain("onClick={$(() => props.onPress$?.(1))}");
    expect(out).toContain("onPress$?: QRL<(...args: any[]) => void>");
  });
});
