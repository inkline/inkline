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
// AsyncData: createResource() async data fetching
//
// createResource returns `[data, { loading, error }]`. The template reads
// `loading` and `data`. createResource is now part of the primitive table and
// is emitted on every target (it is no longer dropped), with the `async`
// keyword preserved on the fetcher. Solid maps it to its native createResource
// and destructures the resource metas the author bound. React/Vue/Angular/Astro
// each map it to their own async-data idiom; on those targets only `data` is
// wired today, so the template's bare `loading` reference is still unresolved —
// see the residual-bug notes below.
// ---------------------------------------------------------------------------
describe("AsyncData: createResource async resource handling", () => {
  it("React maps createResource to use(), wiring data (loading stays unresolved)", async () => {
    const out = await code("AsyncData", "react");
    // React has no createResource; the fetcher is mapped to the `use` hook and
    // bound to `data`. The `async` keyword on the fetcher is preserved.
    expect(out).toContain('import { use } from "react";');
    expect(out).toContain(
      'const data = use(async () => { const res = await fetch("/api/items"); return res.json(); })',
    );
    expect(out).toContain('{loading ? "Loading..." : JSON.stringify(data)}');
    // RESIDUAL BUG: only `data` is wired; `loading` has no binding, so the JSX
    // reference resolves to nothing at runtime.
    expect(out).not.toContain("loading =");
    expect(out).not.toContain("const [");
  });

  it("Vue wires the resource as an awaited ref data (loading stays unresolved)", async () => {
    const out = await code("AsyncData", "vue");
    // The resource is emitted: <script setup> imports ref and awaits the fetcher
    // into a `data` ref. The `async` keyword on the inner fetcher is preserved.
    expect(out).toContain('import { ref } from "vue";');
    expect(out).toContain(
      'const data = ref(await (async () => { const res = await fetch("/api/items"); return res.json(); })())',
    );
    expect(out).toContain('{{ loading ? "Loading..." : JSON.stringify(data) }}');
    // RESIDUAL BUG: Vue wires only `data`; the template still reads a bare
    // `loading` that is never declared in <script setup>.
    expect(out).not.toContain("createResource");
  });

  it("Solid keeps native createResource and destructures the bound metas", async () => {
    const out = await code("AsyncData", "solid");
    // Solid has a native createResource: the call and its import are emitted, and only the metas
    // the author bound are destructured (object-shorthand when the name matches, an explicit rename
    // for aliases like `error: _error`) — `loading` and `data` are bound.
    expect(out).toContain('import { createResource, splitProps } from "solid-js";');
    expect(out).toContain(
      'const [data, { loading, error: _error }] = createResource(async () => { const res = await fetch("/api/items"); return res.json(); })',
    );
    // BUG: in Solid `data` is an accessor function, so the template should read `data()`. The body
    // currently reads it bare (`JSON.stringify(data)`), which stringifies the accessor, not the
    // resolved value — tracked with the broader resource-read modeling gap.
    expect(out).toContain('{loading ? "Loading..." : JSON.stringify(data)}');
  });

  it("Angular maps createResource to resource() with a data field (loading stays unresolved)", async () => {
    const out = await code("AsyncData", "angular");
    // The class now declares a `data` field via Angular's resource() loader,
    // and the resource symbol is imported. The async fetcher is preserved.
    expect(out).toContain(
      'import { Component, signal, computed, effect, resource } from "@angular/core";',
    );
    expect(out).toContain(
      'data = resource({ loader: async () => { const res = await fetch("/api/items"); return res.json(); } })',
    );
    expect(out).toContain("export class AsyncDataComponent");
    // String literals inside the binding are single-quoted so they survive the
    // double-quoted Angular template.
    expect(out).toContain("{{ loading ? 'Loading...' : JSON.stringify(data) }}");
    // RESIDUAL BUG: the template reads `loading`/`data` without `this.` and
    // `loading` has no field, so the binding is unresolved at runtime.
  });

  it("createResource produces no diagnostic on any target", async () => {
    const result = await compileFixture("AsyncData");
    expect(result.diagnostics).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// ServerComponent: defineComponent({ runtime: "server" })
//
// React is the only target that materialises the runtime hint — it prepends a
// `"use server";` directive. Every other target ignores `runtime` entirely.
// ---------------------------------------------------------------------------
describe("ServerComponent: runtime: 'server' handling", () => {
  it('React: emits a "use server" directive at the top of the module', async () => {
    const out = await code("ServerComponent", "react");
    expect(out.startsWith('"use server";')).toBe(true);
    expect(out).toContain("Server-rendered content");
  });

  it("Vue: ignores runtime hint — no server directive, plain SFC", async () => {
    const out = await code("ServerComponent", "vue");
    expect(out).not.toContain("use server");
    expect(out).toContain("Server-rendered content");
  });

  it("Astro: ignores runtime hint — frontmatter only declares props", async () => {
    const out = await code("ServerComponent", "astro");
    expect(out).not.toContain("use server");
    expect(out).toContain("const props = Astro.props as Props;");
    expect(out).toContain("Server-rendered content");
  });
});

// ---------------------------------------------------------------------------
// ClientComponent: defineComponent({ runtime: "client" }) with signal + setter
//
// Exercises the "use client" boundary plus setter wiring: a createSignal setter
// used inside an event handler is now rewritten per target (function call on
// React, assignment on Vue/Svelte/Astro, `.set()` on Angular, `.value`
// assignment on Qwik).
// ---------------------------------------------------------------------------
describe("ClientComponent: runtime: 'client' handling", () => {
  it('React: emits "use client" and a working useState + onClick', async () => {
    const out = await code("ClientComponent", "react");
    expect(out.startsWith('"use client";')).toBe(true);
    expect(out).toContain("const [count, setCount] = useState(0)");
    expect(out).toContain("onClick={() => setCount(count + 1)}");
  });

  it("Vue: keeps ref(0) and rewrites the setter to an assignment in the template", async () => {
    const out = await code("ClientComponent", "vue");
    // The setter call is rewritten to a plain assignment in the Vue template
    // (Vue auto-unwraps the ref, so no .value here). No use-client directive.
    expect(out).toContain("const count = ref(0)");
    expect(out).toContain('@click="() => count = count + 1"');
    expect(out).not.toContain("use client");
    expect(out).not.toContain("function setCount");
  });

  it("Svelte: rewrites the setter call to a $state reassignment", async () => {
    const out = await code("ClientComponent", "svelte");
    // $state(0) is emitted and the setter is rewritten to a plain assignment,
    // which mutates the rune-backed state in place.
    expect(out).toContain("let count = $state(0)");
    expect(out).toContain("onclick={() => count = count + 1}");
    expect(out).not.toContain("setCount");
  });

  it("Angular: rewrites the setter to a signal .set() statement in (click)", async () => {
    const out = await code("ClientComponent", "angular");
    // class has `count = signal(0)`; the setter is rewritten to `count.set(...)`
    // as a statement binding (no arrow wrapper).
    expect(out).toContain("count = signal(0)");
    expect(out).toContain('(click)="count.set(count() + 1)"');
  });

  it("Qwik: single-wraps the click handler and rewrites the setter to .value assignment", async () => {
    const out = await code("ClientComponent", "qwik");
    // The handler is single-wrapped in `$(...)` and the setter is rewritten to
    // a `.value` assignment against the useSignal-backed state.
    expect(out).toContain("onClick={$(() => count.value = count.value + 1)}");
    expect(out).not.toContain("use client");
  });

  it("Astro declares the signal state in the frontmatter and rewrites the setter to an assignment", async () => {
    const out = await code("ClientComponent", "astro");
    // The signal is declared as `let count = 0` in the frontmatter, and the
    // setter call is rewritten to a direct assignment in the handler.
    expect(out).toContain("let count = 0");
    expect(out).toContain("{count}");
    expect(out).toContain("onClick={() => count = count + 1}");
    expect(out).not.toContain("setCount");
    // RESIDUAL BUG: `onClick` in an Astro template is a server-side-inert HTML
    // attribute — Astro frontmatter does not run in the browser, so this click
    // handler will not actually reassign `count` at runtime.
  });
});

// ---------------------------------------------------------------------------
// IsoComponent: defineComponent({ runtime: "iso" }) with a read-only signal
//
// The signal has no setter usage, so this purely exercises read-side wiring —
// react/vue/solid/svelte/angular/qwik all bind `value` correctly, and Astro now
// declares it as `let value = 0` in the frontmatter.
// ---------------------------------------------------------------------------
describe("IsoComponent: runtime: 'iso' handling", () => {
  it("React: iso emits no directive but wires useState/value correctly", async () => {
    const out = await code("IsoComponent", "react");
    expect(out).not.toContain("use client");
    expect(out).not.toContain("use server");
    expect(out).toContain("const [value, _setValue] = useState(0)");
    expect(out).toContain("{value}");
  });

  it("Vue: iso signal becomes ref and reads through .value in template", async () => {
    const out = await code("IsoComponent", "vue");
    expect(out).toContain("const value = ref(0)");
    expect(out).toContain("{{ value }}");
  });

  it("Solid: iso signal kept as createSignal with call-style read", async () => {
    const out = await code("IsoComponent", "solid");
    expect(out).toContain("const [value, _setValue] = createSignal(0)");
    expect(out).toContain("{value()}");
  });

  it("Angular: iso signal becomes a signal() field read via () in template", async () => {
    const out = await code("IsoComponent", "angular");
    expect(out).toContain("value = signal(0)");
    expect(out).toContain("{{ value() }}");
  });

  it("Astro declares the iso signal in the frontmatter and reads it in the template", async () => {
    const out = await code("IsoComponent", "astro");
    // The iso signal is declared as `let value = 0` in the frontmatter and read
    // directly as `{value}` in the template.
    expect(out).toContain("let value = 0");
    expect(out).toContain("{value}");
  });
});
