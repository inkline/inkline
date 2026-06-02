// Real-world codegen assertions for the CONTEXT feature area: author `.ink.tsx` components that
// `provide`/`useContext` a context object, compile through the full pipeline, and assert the ACTUAL
// generated framework code for each of the 7 targets.
//
// Fixtures:
//   ContextProvider — createContext + provide(...) + a signal whose setter is used in an onClick.
//   ContextConsumer — useContext(...) and a read of a context field in the template.
//
// To inspect a fixture's real output while writing assertions, compile it and log the contents:
//   const r = await compileFixture("ContextProvider"); console.log(r.files.svelte![0].contents);

import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

// ---------------------------------------------------------------------------
// ContextProvider: createContext + provide(...)
// ---------------------------------------------------------------------------
describe("ContextProvider: createContext + provide per target", () => {
  it("React: createContext + <Provider value> wrapping the tree", async () => {
    const out = await code("ContextProvider", "react");
    expect(out).toContain('import { useState, createContext } from "react"');
    expect(out).toContain(
      'export const FormContext = createContext<{ disabled: boolean; size: string }>({ disabled: false, size: "md" })',
    );
    // The provided value wraps the rendered tree in <FormContext.Provider value={...}>.
    expect(out).toContain('<FormContext.Provider value={{ disabled: disabled, size: "md" }}>');
    expect(out).toContain("</FormContext.Provider>");
  });

  it("Vue: InjectionKey context shape + provide(FormContext.key, value)", async () => {
    const out = await code("ContextProvider", "vue");
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

  it("Svelte: setContext(key, value) + $state signal", async () => {
    const out = await code("ContextProvider", "svelte");
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

  it("Angular: InjectionToken context + providers metadata", async () => {
    const out = await code("ContextProvider", "angular");
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

  it("Qwik: useContextProvider but emitted before the signal it reads (TDZ bug)", async () => {
    const out = await code("ContextProvider", "qwik");
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

  it("Astro: exports the context default; provide() collapses to static frontmatter state", async () => {
    const out = await code("ContextProvider", "astro");
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
  it("React: useContext(FormContext) + field read in JSX", async () => {
    const out = await code("ContextConsumer", "react");
    expect(out).toContain('import { useContext } from "react"');
    expect(out).toContain('import { FormContext } from "./ContextProvider"');
    expect(out).toContain("const form = useContext(FormContext)");
    expect(out).toContain("{form.disabled}");
  });

  it("Vue: inject(key, defaultValue) + interpolation", async () => {
    const out = await code("ContextConsumer", "vue");
    expect(out).toContain('import { inject } from "vue"');
    // Vue injects against the lowered key and supplies the context's default value.
    expect(out).toContain("const form = inject(FormContext.key, FormContext.defaultValue)!");
    expect(out).toContain("{{ form.disabled }}");
  });

  it("Svelte: getContext(key) read", async () => {
    const out = await code("ContextConsumer", "svelte");
    expect(out).toContain('import { getContext } from "svelte"');
    expect(out).toContain("const form = getContext(FormContext.key)");
    expect(out).toContain("{form.disabled}");
  });

  it("Angular: inject(FormContext.key) as a class member + {{ }} binding", async () => {
    const out = await code("ContextConsumer", "angular");
    expect(out).toContain(
      'import { Component, signal, computed, effect, inject } from "@angular/core"',
    );
    expect(out).toContain("form = inject(FormContext.key)");
    expect(out).toContain("{{ form.disabled }}");
  });

  it("Qwik: useContext(FormContext.id)", async () => {
    const out = await code("ContextConsumer", "qwik");
    expect(out).toContain('import { FormContext } from "./ContextProvider"');
    expect(out).toContain("const form = useContext(FormContext.id)");
    expect(out).toContain("{form.disabled}");
  });

  it("Astro: consumer falls back to the context default value (no client context runtime)", async () => {
    const out = await code("ContextConsumer", "astro");
    // Astro can't resolve a provider at render time, so the consumer binds the context's exported
    // default value as a best-effort — the template read resolves instead of referencing undefined.
    expect(out).toContain('import { FormContext } from "./ContextProvider"');
    expect(out).not.toContain("useContext");
    expect(out).toContain("const form = FormContext.defaultValue");
    expect(out).toContain("{form.disabled}");
  });
});
