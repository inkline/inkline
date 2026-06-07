// React codegen integration tests for the CONTEXT feature area: author `.ink.tsx` components that
// `provide`/`useContext` a context object, compile through the full pipeline, and assert the ACTUAL
// generated React code.
//
// Fixtures:
//   ContextProvider — createContext + provide(...) + a signal whose setter is used in an onClick.
//   ContextConsumer — useContext(...) and a read of a context field in the template.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ContextProvider: createContext + provide(...)
// ---------------------------------------------------------------------------
describe("ContextProvider: createContext + provide", () => {
  it("React: createContext + <Provider value> wrapping the tree", async () => {
    const out = await compileTo("ContextProvider", "react");
    expect(out).toContain('import { useState, createContext } from "react"');
    expect(out).toContain(
      'export const FormContext = createContext<{ disabled: boolean; size: string }>({ disabled: false, size: "md" })',
    );
    // The provided value wraps the rendered tree in <FormContext.Provider value={...}>.
    expect(out).toContain('<FormContext.Provider value={{ disabled: disabled, size: "md" }}>');
    expect(out).toContain("</FormContext.Provider>");
  });
});

// ---------------------------------------------------------------------------
// ContextConsumer: useContext(...) — the clean read path
// ---------------------------------------------------------------------------
describe("ContextConsumer: useContext", () => {
  it("React: useContext(FormContext) + field read in JSX", async () => {
    const out = await compileTo("ContextConsumer", "react");
    expect(out).toContain('import { useContext } from "react"');
    expect(out).toContain('import { FormContext } from "./ContextProvider"');
    expect(out).toContain("const form = useContext(FormContext)");
    expect(out).toContain("{form.disabled}");
  });
});
