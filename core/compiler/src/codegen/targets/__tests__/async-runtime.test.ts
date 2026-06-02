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
// In the authoring model `createResource<T>(fn)` returns `[data: T | undefined,
// { loading: boolean; error }]` — plain VALUES read by their bare names. Every
// target lowers a resource to reactive state (data/loading/error) plus an async
// loader that runs the fetcher and updates them (the universal "manual fetch with
// loading/error state" pattern), expressed in each framework's idiom. The bare
// template reads resolve per target (React/Vue/Svelte bare, Solid/Angular call
// form, Qwik `.value`). The fixture aliases error to `_error` (unused).
// ---------------------------------------------------------------------------
describe("AsyncData: createResource async resource handling", () => {
  it("React lowers the resource to useState + a useEffect loader", async () => {
    const out = await code("AsyncData", "react");
    expect(out).toContain('import { useState, useEffect } from "react";');
    expect(out).toContain("const [data, setData] = useState(undefined)");
    expect(out).toContain("const [loading, setLoading] = useState(true)");
    expect(out).toContain("const [_error, setError] = useState(undefined)");
    expect(out).toContain(
      'useEffect(() => { (async () => { const res = await fetch("/api/items"); return res.json(); })().then(setData).catch(setError).finally(() => setLoading(false)); }, [])',
    );
    // React reactiveRead is strip-call, so the template reads stay bare.
    expect(out).toContain('{loading ? "Loading..." : JSON.stringify(data)}');
  });

  it("Vue lowers the resource to refs + an async loader in <script setup>", async () => {
    const out = await code("AsyncData", "vue");
    expect(out).toContain('import { ref } from "vue";');
    expect(out).not.toContain("createResource");
    expect(out).toContain("const data = ref(undefined)");
    expect(out).toContain("const loading = ref(true)");
    expect(out).toContain("const _error = ref(undefined)");
    expect(out).toContain(
      ';(async () => { const res = await fetch("/api/items"); return res.json(); })().then((d) => data.value = d).catch((e) => _error.value = e).finally(() => loading.value = false)',
    );
    // Vue templates auto-unwrap refs, so the template reads stay bare.
    expect(out).toContain('{{ loading ? "Loading..." : JSON.stringify(data) }}');
  });

  it("Svelte lowers the resource to $state + an async loader", async () => {
    const out = await code("AsyncData", "svelte");
    expect(out).toContain("let data = $state(undefined)");
    expect(out).toContain("let loading = $state(true)");
    expect(out).toContain("let _error = $state(undefined)");
    expect(out).toContain(
      ';(async () => { const res = await fetch("/api/items"); return res.json(); })().then((d) => data = d).catch((e) => _error = e).finally(() => loading = false)',
    );
    expect(out).toContain('{loading ? "Loading..." : JSON.stringify(data)}');
  });

  it("Qwik lowers the resource to useSignal + a useTask$ loader", async () => {
    const out = await code("AsyncData", "qwik");
    expect(out).toContain("const data = useSignal(undefined)");
    expect(out).toContain("const loading = useSignal(true)");
    expect(out).toContain("const _error = useSignal(undefined)");
    expect(out).toContain(
      'useTask$(() => { (async () => { const res = await fetch("/api/items"); return res.json(); })().then((d) => data.value = d).catch((e) => _error.value = e).finally(() => loading.value = false); })',
    );
    // Qwik reactiveRead is field-access(value), so the template reads `.value`.
    expect(out).toContain('{loading.value ? "Loading..." : JSON.stringify(data.value)}');
  });

  it("Solid lowers the resource to signals plus an async loader", async () => {
    const out = await code("AsyncData", "solid");
    // Solid lowers each resource to reactive signals (data/loading/error) plus a fire-and-forget
    // loader that runs the fetcher and updates them — the universal "manual fetch with loading/error
    // state" pattern. createResource is gone; only createSignal is imported.
    expect(out).toContain('import { createSignal, splitProps } from "solid-js";');
    expect(out).not.toContain("createResource");
    expect(out).toContain("const [data, setData] = createSignal(undefined)");
    expect(out).toContain("const [loading, setLoading] = createSignal(true)");
    expect(out).toContain("const [_error, setError] = createSignal(undefined)");
    expect(out).toContain(
      ';(async () => { const res = await fetch("/api/items"); return res.json(); })().then(setData).catch(setError).finally(() => setLoading(false))',
    );
    // Solid signals are read as calls, so the template reads `data()`/`loading()`.
    expect(out).toContain('{loading() ? "Loading..." : JSON.stringify(data())}');
  });

  it("Angular lowers the resource to signal fields plus an async loader", async () => {
    const out = await code("AsyncData", "angular");
    // Angular lowers each resource to reactive signal fields (data/loading/error) plus an async
    // loader that runs the fetcher and writes the results into those signals — the universal
    // "manual fetch with loading/error state" pattern. The `resource` symbol is no longer imported.
    expect(out).toContain('import { Component, signal, computed, effect } from "@angular/core";');
    expect(out).not.toContain("resource");
    expect(out).toContain("data = signal(undefined)");
    expect(out).toContain("loading = signal(true)");
    expect(out).toContain("_error = signal(undefined)");
    // The loader runs from the consolidated constructor and updates each signal.
    expect(out).toContain(
      'constructor() { (async () => { const res = await fetch("/api/items"); return res.json(); })().then((d) => this.data.set(d)).catch((e) => this._error.set(e)).finally(() => this.loading.set(false)) }',
    );
    expect(out).toContain("export class AsyncDataComponent");
    // Angular's reactiveRead is preserve-call, so the template reads the signals as `data()`/
    // `loading()`. String literals are single-quoted to survive the double-quoted template.
    expect(out).toContain("{{ loading() ? 'Loading...' : JSON.stringify(data()) }}");
  });

  it("Astro renders the resource server-side (best-effort): top-level await, loading resolved", async () => {
    const out = await code("AsyncData", "astro");
    // Astro is SSR-only, so the loader is a top-level await in the frontmatter; `loading` resolves
    // to a constant `false` and any error is captured. (Documented best-effort — no client runtime.)
    expect(out).toContain("let _error = undefined");
    expect(out).toContain("let data");
    expect(out).toContain(
      'try { data = await (async () => { const res = await fetch("/api/items"); return res.json(); })() } catch (__e) { _error = __e }',
    );
    expect(out).toContain("const loading = false");
    expect(out).toContain('{loading ? "Loading..." : JSON.stringify(data)}');
  });

  it("createResource produces no diagnostic on any target", async () => {
    const result = await compileFixture("AsyncData");
    expect(result.diagnostics).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// TwoResources: two createResource calls in one component. Guards against the
// setter/binding collision that hardcoded setter names would cause (a second
// resource must not redeclare `setData`/`setLoading`).
// ---------------------------------------------------------------------------
describe("TwoResources: multiple resources get unique bindings and setters", () => {
  it("React: each resource derives its own setters from the data name", async () => {
    const out = await code("TwoResources", "react");
    expect(out).toContain("const [users, setUsers] = useState(undefined)");
    expect(out).toContain("const [usersLoading, setUsersLoading] = useState(true)");
    expect(out).toContain("const [posts, setPosts] = useState(undefined)");
    expect(out).toContain("const [postsLoading, setPostsLoading] = useState(true)");
    expect(out).not.toContain("setData");
  });

  it("Solid: each resource derives its own signal setters (no setData collision)", async () => {
    const out = await code("TwoResources", "solid");
    expect(out).toContain("const [users, setUsers] = createSignal(undefined)");
    expect(out).toContain("const [posts, setPosts] = createSignal(undefined)");
    expect(out).not.toContain("setData");
    // Solid reads signals as calls.
    expect(out).toContain('{usersLoading() ? "..." : JSON.stringify(users())}');
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
