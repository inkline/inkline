// Vue codegen assertions for the CONTEXT feature area: author `.ink.tsx` components that
// `provide`/`useContext` a context object, compile through the full pipeline, and assert the
// ACTUAL generated Vue code.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ContextProvider: createContext + provide(...)
// ---------------------------------------------------------------------------
describe("ContextProvider: createContext + provide per target", () => {
  it("Vue: InjectionKey context shape + provide(FormContext.key, value)", async () => {
    const out = await compileTo("ContextProvider", "vue");
    // Context is lowered to a { key: Symbol(...), defaultValue } object in the module script.
    expect(out).toContain(
      'export const FormContext = { key: Symbol("FormContext") as InjectionKey<{ disabled: boolean; size: string }>, defaultValue: { disabled: false, size: "md" } }',
    );
    expect(out).toContain('import { ref, provide } from "vue"');
    expect(out).toContain('provide(FormContext.key, { disabled: disabled.value, size: "md" })');

    // The setter is rewritten to a direct assignment in the template; Vue auto-unwraps the ref
    // so the template uses the bare name (`disabled`, not `disabled.value`).
    expect(out).toContain('@click="() => disabled = !disabled"');
    expect(out).not.toContain("function setDisabled");
  });
});

// ---------------------------------------------------------------------------
// ContextConsumer: useContext(...) — the clean read path across targets
// ---------------------------------------------------------------------------
describe("ContextConsumer: useContext per target", () => {
  it("Vue: inject(key, defaultValue) + interpolation", async () => {
    const out = await compileTo("ContextConsumer", "vue");
    expect(out).toContain('import { inject } from "vue"');
    // Vue injects against the lowered key and supplies the context's default value.
    expect(out).toContain("const form = inject(FormContext.key, FormContext.defaultValue)!");
    expect(out).toContain("{{ form.disabled }}");
  });
});
