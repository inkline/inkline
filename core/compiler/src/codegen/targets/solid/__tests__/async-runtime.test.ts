// Solid async-runtime integration: createResource lowering, multi-resource
// setter uniqueness, and iso-runtime signal wiring for the Solid target.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// AsyncData: createResource() async data fetching
//
// In the authoring model `createResource<T>(fn)` returns `[data: T | undefined,
// { loading: boolean; error }]` — plain VALUES read by their bare names. Solid
// lowers a resource to reactive signals (data/loading/error) plus an async
// loader that runs the fetcher and updates them (the universal "manual fetch with
// loading/error state" pattern). The bare template reads resolve to call form.
// The fixture aliases error to `_error` (unused).
// ---------------------------------------------------------------------------
describe("AsyncData: createResource async resource handling", () => {
  it("Solid lowers the resource to signals plus an async loader", async () => {
    const out = await compileTo("AsyncData", "solid");
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
});

// ---------------------------------------------------------------------------
// TwoResources: two createResource calls in one component. Guards against the
// setter/binding collision that hardcoded setter names would cause (a second
// resource must not redeclare `setData`/`setLoading`).
// ---------------------------------------------------------------------------
describe("TwoResources: multiple resources get unique bindings and setters", () => {
  it("Solid: each resource derives its own signal setters (no setData collision)", async () => {
    const out = await compileTo("TwoResources", "solid");
    expect(out).toContain("const [users, setUsers] = createSignal(undefined)");
    expect(out).toContain("const [posts, setPosts] = createSignal(undefined)");
    expect(out).not.toContain("setData");
    // Solid reads signals as calls.
    expect(out).toContain('{usersLoading() ? "..." : JSON.stringify(users())}');
  });
});

// ---------------------------------------------------------------------------
// IsoComponent: defineComponent({ runtime: "iso" }) with a read-only signal
//
// The signal has no setter usage, so this purely exercises read-side wiring —
// Solid keeps it as createSignal with call-style read.
// ---------------------------------------------------------------------------
describe("IsoComponent: runtime: 'iso' handling", () => {
  it("Solid: iso signal kept as createSignal with call-style read", async () => {
    const out = await compileTo("IsoComponent", "solid");
    expect(out).toContain("const [value, _setValue] = createSignal(0)");
    expect(out).toContain("{value()}");
  });
});
