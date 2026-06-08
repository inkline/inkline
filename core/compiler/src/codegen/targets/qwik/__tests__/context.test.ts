// Real-world codegen assertions for the CONTEXT feature area (Qwik target): author `.ink.tsx`
// components that `provide`/`useContext` a context object and assert the ACTUAL generated Qwik code.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ContextProvider: createContext + provide(...)
// ---------------------------------------------------------------------------
describe("ContextProvider: createContext + provide per target", () => {
  it("Qwik: useContextProvider but emitted before the signal it reads (TDZ bug)", async () => {
    const out = await compileTo("ContextProvider", "qwik");
    expect(out).toContain(
      'export const FormContext = { id: createContextId<{ disabled: boolean; size: string }>("FormContext"), defaultValue: { disabled: false, size: "md" } }',
    );
    expect(out).toContain(
      'import { component$, useSignal, useComputed$, useVisibleTask$, $, useContextProvider, createContextId } from "@qwik.dev/core"',
    );

    // `useContextProvider(...)` reads `disabled.value`, so it is emitted AFTER the
    // `const disabled = useSignal(false)` declaration (no temporal-dead-zone reference).
    const provideIdx = out.indexOf("useContextProvider(FormContext.id, { disabled: disabled.value");
    const declIdx = out.indexOf("const disabled = useSignal(false)");
    expect(provideIdx).toBeGreaterThanOrEqual(0);
    expect(declIdx).toBeGreaterThanOrEqual(0);
    expect(declIdx).toBeLessThan(provideIdx); // declaration precedes the provide

    // The event handler is now single-wrapped with `$(...)` and rewrites the setter to a direct
    // `.value` assignment: `onClick={$(() => disabled.value = !disabled.value)}`.
    expect(out).toContain("onClick={$(() => disabled.value = !disabled.value)}");
  });
});

// ---------------------------------------------------------------------------
// ContextConsumer: useContext(...) — the clean read path across targets
// ---------------------------------------------------------------------------
describe("ContextConsumer: useContext per target", () => {
  it("Qwik: useContext(FormContext.id)", async () => {
    const out = await compileTo("ContextConsumer", "qwik");
    expect(out).toContain('import { FormContext } from "./ContextProvider"');
    expect(out).toContain("const form = useContext(FormContext.id)");
    expect(out).toContain("{form.disabled}");
  });
});
