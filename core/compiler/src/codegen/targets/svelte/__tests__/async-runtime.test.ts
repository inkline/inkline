// Svelte async-runtime integration: createResource lowering to $state + async loader,
// and runtime: "client" setter rewriting to $state reassignment.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// AsyncData: createResource() async data fetching
//
// In the authoring model `createResource<T>(fn)` returns `[data: T | undefined,
// { loading: boolean; error }]` — plain VALUES read by their bare names. Every
// target lowers a resource to reactive state (data/loading/error) plus an async
// loader that runs the fetcher and updates them (the universal "manual fetch with
// loading/error state" pattern), expressed in each framework's idiom. The fixture
// aliases error to `_error` (unused).
// ---------------------------------------------------------------------------
describe("AsyncData: createResource async resource handling", () => {
  it("Svelte lowers the resource to $state + an async loader", async () => {
    const out = await compileTo("AsyncData", "svelte");
    expect(out).toContain("let data = $state(undefined)");
    expect(out).toContain("let loading = $state(true)");
    expect(out).toContain("let _error = $state(undefined)");
    expect(out).toContain(
      ';(async () => { const res = await fetch("/api/items"); return res.json(); })().then((d) => data = d).catch((e) => _error = e).finally(() => loading = false)',
    );
    expect(out).toContain('{loading ? "Loading..." : JSON.stringify(data)}');
  });
});

// ---------------------------------------------------------------------------
// ClientComponent: defineComponent({ runtime: "client" }) with signal + setter
//
// Exercises the "use client" boundary plus setter wiring: a createSignal setter
// used inside an event handler is rewritten to a $state reassignment on Svelte.
// ---------------------------------------------------------------------------
describe("ClientComponent: runtime: 'client' handling", () => {
  it("Svelte: rewrites the setter call to a $state reassignment", async () => {
    const out = await compileTo("ClientComponent", "svelte");
    // $state(0) is emitted and the setter is rewritten to a plain assignment,
    // which mutates the rune-backed state in place.
    expect(out).toContain("let count = $state(0)");
    expect(out).toContain("onclick={() => count = count + 1}");
    expect(out).not.toContain("setCount");
  });
});
