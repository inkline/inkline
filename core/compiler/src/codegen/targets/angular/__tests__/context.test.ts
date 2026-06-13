// Angular codegen assertions for the CONTEXT feature area: author `.ink.tsx` components that
// `provide`/`useContext` a context object, compile through the full pipeline, and assert the
// ACTUAL generated Angular code.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ContextProvider: createContext + provide(...)
// ---------------------------------------------------------------------------
describe("ContextProvider: createContext + provide per target", () => {
  it("Angular: InjectionToken context + providers metadata", async () => {
    const out = await compileTo("ContextProvider", "angular");
    // String literals are single-quoted so they don't collide with the double-quoted
    // template / decorator strings Angular wraps them in.
    expect(out).toContain(
      "export const FormContext = { key: new InjectionToken<{ disabled: boolean; size: string }>(\"FormContext\"), defaultValue: { disabled: false, size: 'md' } }",
    );

    // Angular cannot read instance state in `@Component` provider metadata, so a context value
    // derived from a component signal (`{ disabled: disabled() }`) lifts that signal into the DI
    // factory and exposes it via a reactive getter/setter. The factory runs once per component
    // injector, so the signal is shared between the provider and any consumer of the token.
    expect(out).toContain(
      "providers: [{ provide: FormContext.key, useFactory: () => { const disabled = signal(false); return { get disabled() { return disabled(); }, set disabled(v) { disabled.set(v); }, size: 'md' }; } }]",
    );
    // The component injects the same object and reads/writes the signal through it; the original
    // `disabled = signal(...)` class field is gone (the signal lives in the factory now).
    expect(out).toContain("formContext = inject(FormContext.key)");
    const classBody = out.slice(out.indexOf("export class ContextProviderComponent"));
    expect(classBody).not.toContain("signal(");

    // The click handler writes through the provided setter.
    expect(out).toContain('(click)="formContext.disabled = !formContext.disabled"');
  });
});

// ---------------------------------------------------------------------------
// ContextConsumer: useContext(...) — the clean read path across targets
// ---------------------------------------------------------------------------
describe("ContextConsumer: useContext per target", () => {
  it("Angular: inject(FormContext.key) as a class member + {{ }} binding", async () => {
    const out = await compileTo("ContextConsumer", "angular");
    expect(out).toContain(
      'import { Component, signal, computed, effect, input, inject } from "@angular/core"',
    );
    expect(out).toContain("form = inject(FormContext.key)");
    expect(out).toContain("{{ form.disabled }}");
  });
});
