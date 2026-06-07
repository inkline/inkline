// Astro codegen assertions for the CONTEXT feature area: author `.ink.tsx` components that
// `provide`/`useContext` a context object, compile through the full pipeline, and assert the
// ACTUAL generated Astro code.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ContextProvider: createContext + provide(...)
// ---------------------------------------------------------------------------
describe("ContextProvider: createContext + provide per target", () => {
  it("Astro: exports the context default; provide() collapses to static frontmatter state", async () => {
    const out = await compileTo("ContextProvider", "astro");
    // Astro has no client context runtime, so the context is exported as its default-value shape
    // only (so consumer modules can import it); the reactive provide() call itself is dropped.
    expect(out).toContain(
      'export const FormContext = { defaultValue: { disabled: false, size: "md" } }',
    );
    expect(out).not.toContain("provide(");

    // The signal is declared in the frontmatter as plain mutable state...
    expect(out).toContain("let disabled = false");
    // ...and the setter is rewritten to a direct assignment (no undefined `setDisabled`, and
    // `disabled` resolves to the declared frontmatter binding).
    expect(out).toContain("onClick={() => disabled = !disabled}");

    // RESIDUAL (by design): Astro renders this `onClick` as a static markup attribute string, so
    // the assignment never executes in the browser — Astro elements have no client reactivity.
    // The emitted code is nonetheless self-consistent: every identifier it references is declared.
  });
});

// ---------------------------------------------------------------------------
// ContextConsumer: useContext(...) — the clean read path across targets
// ---------------------------------------------------------------------------
describe("ContextConsumer: useContext per target", () => {
  it("Astro: consumer falls back to the context default value (no client context runtime)", async () => {
    const out = await compileTo("ContextConsumer", "astro");
    // Astro can't resolve a provider at render time, so the consumer binds the context's exported
    // default value as a best-effort — the template read resolves instead of referencing undefined.
    expect(out).toContain('import { FormContext } from "./ContextProvider"');
    expect(out).not.toContain("useContext");
    expect(out).toContain("const form = FormContext.defaultValue");
    expect(out).toContain("{form.disabled}");
  });
});
