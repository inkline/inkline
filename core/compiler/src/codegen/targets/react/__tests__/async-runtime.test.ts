// React async-runtime integration: createResource lowering and runtime-hint
// ("use server"/"use client"/"iso") handling for the React target.
import { describe, it, expect } from "vitest";
import { compileTo, compileToChecked } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// AsyncData: createResource() async data fetching
//
// In the authoring model `createResource<T>(fn)` returns `[data: T | undefined,
// { loading: boolean; error }]` — plain VALUES read by their bare names. React
// lowers a resource to reactive state (data/loading/error) plus an async loader
// that runs the fetcher and updates them (the universal "manual fetch with
// loading/error state" pattern). React reactiveRead is strip-call, so the bare
// template reads stay bare. The fixture aliases error to `_error` (unused).
// ---------------------------------------------------------------------------
describe("AsyncData: createResource async resource handling", () => {
  it("React lowers the resource to useState + a useEffect loader", async () => {
    const out = await compileTo("AsyncData", "react");
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

  it("createResource produces no diagnostic", async () => {
    await compileToChecked("AsyncData", "react");
  });
});

// ---------------------------------------------------------------------------
// TwoResources: two createResource calls in one component. Guards against the
// setter/binding collision that hardcoded setter names would cause (a second
// resource must not redeclare `setData`/`setLoading`).
// ---------------------------------------------------------------------------
describe("TwoResources: multiple resources get unique bindings and setters", () => {
  it("React: each resource derives its own setters from the data name", async () => {
    const out = await compileTo("TwoResources", "react");
    expect(out).toContain("const [users, setUsers] = useState(undefined)");
    expect(out).toContain("const [usersLoading, setUsersLoading] = useState(true)");
    expect(out).toContain("const [posts, setPosts] = useState(undefined)");
    expect(out).toContain("const [postsLoading, setPostsLoading] = useState(true)");
    expect(out).not.toContain("setData");
  });
});

// ---------------------------------------------------------------------------
// ServerComponent: defineComponent({ runtime: "server" })
//
// React is the only target that materialises the runtime hint — it prepends a
// `"use server";` directive.
// ---------------------------------------------------------------------------
describe("ServerComponent: runtime: 'server' handling", () => {
  it('React: emits a "use server" directive at the top of the module', async () => {
    const out = await compileTo("ServerComponent", "react");
    expect(out.startsWith('"use server";')).toBe(true);
    expect(out).toContain("Server-rendered content");
  });
});

// ---------------------------------------------------------------------------
// ClientComponent: defineComponent({ runtime: "client" }) with signal + setter
//
// Exercises the "use client" boundary plus setter wiring: a createSignal setter
// used inside an event handler is rewritten to a function call on React.
// ---------------------------------------------------------------------------
describe("ClientComponent: runtime: 'client' handling", () => {
  it('React: emits "use client" and a working useState + onClick', async () => {
    const out = await compileTo("ClientComponent", "react");
    expect(out.startsWith('"use client";')).toBe(true);
    expect(out).toContain("const [count, setCount] = useState(0)");
    expect(out).toContain("onClick={() => setCount(count + 1)}");
  });
});

// ---------------------------------------------------------------------------
// IsoComponent: defineComponent({ runtime: "iso" }) with a read-only signal
//
// The signal has no setter usage, so this purely exercises read-side wiring —
// React binds `value` correctly with no directive emitted.
// ---------------------------------------------------------------------------
describe("IsoComponent: runtime: 'iso' handling", () => {
  it("React: iso emits no directive but wires useState/value correctly", async () => {
    const out = await compileTo("IsoComponent", "react");
    expect(out).not.toContain("use client");
    expect(out).not.toContain("use server");
    expect(out).toContain("const [value, _setValue] = useState(0)");
    expect(out).toContain("{value}");
  });
});
