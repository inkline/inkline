// Real-world codegen assertions for the CONTEXT feature area (Svelte target): author `.ink.tsx`
// components that `provide`/`useContext` a context object, compile through the full pipeline, and
// assert the ACTUAL generated Svelte code.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ContextProvider: createContext + provide(...)
// ---------------------------------------------------------------------------
describe("ContextProvider: createContext + provide", () => {
  it("Svelte: setContext(key, value) + $state signal", async () => {
    const out = await compileTo("ContextProvider", "svelte");
    expect(out).toContain(
      'export const FormContext = { key: "FormContext", defaultValue: { disabled: false, size: "md" } }',
    );
    expect(out).toContain('import { setContext } from "svelte"');
    expect(out).toContain('setContext(FormContext.key, { disabled: disabled, size: "md" })');
    expect(out).toContain("let disabled = $state(false)");

    // Svelte models signals as `$state` mutated by direct assignment, so the setter is rewritten
    // to `disabled = !disabled` in the click handler.
    expect(out).toContain("onclick={() => disabled = !disabled}");
    expect(out).not.toContain("setDisabled");
  });
});

// ---------------------------------------------------------------------------
// ContextConsumer: useContext(...) — the clean read path
// ---------------------------------------------------------------------------
describe("ContextConsumer: useContext", () => {
  it("Svelte: getContext(key) read", async () => {
    const out = await compileTo("ContextConsumer", "svelte");
    expect(out).toContain('import { getContext } from "svelte"');
    expect(out).toContain("const form = getContext(FormContext.key)");
    expect(out).toContain("{form.disabled}");
  });
});
