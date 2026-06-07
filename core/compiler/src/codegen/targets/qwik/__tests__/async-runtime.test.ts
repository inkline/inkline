// Qwik async runtime codegen: createResource lowering and runtime-hint handling.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// AsyncData: createResource() async data fetching
//
// In the authoring model `createResource<T>(fn)` returns `[data: T | undefined,
// { loading: boolean; error }]` — plain VALUES read by their bare names. Every
// target lowers a resource to reactive state (data/loading/error) plus an async
// loader that runs the fetcher and updates them (the universal "manual fetch with
// loading/error state" pattern), expressed in each framework's idiom. The bare
// template reads resolve per target (Qwik `.value`). The fixture aliases error to
// `_error` (unused).
// ---------------------------------------------------------------------------
describe("AsyncData: createResource async resource handling", () => {
  it("Qwik lowers the resource to useSignal + a useTask$ loader", async () => {
    const out = await compileTo("AsyncData", "qwik");
    expect(out).toContain("const data = useSignal(undefined)");
    expect(out).toContain("const loading = useSignal(true)");
    expect(out).toContain("const _error = useSignal(undefined)");
    expect(out).toContain(
      'useTask$(() => { (async () => { const res = await fetch("/api/items"); return res.json(); })().then((d) => data.value = d).catch((e) => _error.value = e).finally(() => loading.value = false); })',
    );
    // Qwik reactiveRead is field-access(value), so the template reads `.value`.
    expect(out).toContain('{loading.value ? "Loading..." : JSON.stringify(data.value)}');
  });
});

// ---------------------------------------------------------------------------
// ClientComponent: defineComponent({ runtime: "client" }) with signal + setter
//
// Exercises the "use client" boundary plus setter wiring: a createSignal setter
// used inside an event handler is rewritten per target (`.value` assignment on
// Qwik).
// ---------------------------------------------------------------------------
describe("ClientComponent: runtime: 'client' handling", () => {
  it("Qwik: single-wraps the click handler and rewrites the setter to .value assignment", async () => {
    const out = await compileTo("ClientComponent", "qwik");
    // The handler is single-wrapped in `$(...)` and the setter is rewritten to
    // a `.value` assignment against the useSignal-backed state.
    expect(out).toContain("onClick={$(() => count.value = count.value + 1)}");
    expect(out).not.toContain("use client");
  });
});
