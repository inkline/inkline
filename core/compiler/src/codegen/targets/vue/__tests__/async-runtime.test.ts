// Vue async runtime codegen: createResource lowering + runtime hint (server/client/iso) handling.

import { describe, it, expect } from "vitest";
import { compileTo, compileToChecked } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// AsyncData: createResource() async data fetching
//
// In the authoring model `createResource<T>(fn)` returns `[data: T | undefined,
// { loading: boolean; error }]` — plain VALUES read by their bare names. Every
// target lowers a resource to reactive state (data/loading/error) plus an async
// loader that runs the fetcher and updates them (the universal "manual fetch with
// loading/error state" pattern), expressed in each framework's idiom. The bare
// template reads resolve per target (Vue bare). The fixture aliases error to
// `_error` (unused).
// ---------------------------------------------------------------------------
describe("AsyncData: createResource async resource handling", () => {
  it("Vue lowers the resource to refs + an async loader in <script setup>", async () => {
    const out = await compileTo("AsyncData", "vue");
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

  it("createResource produces no diagnostic", async () => {
    await compileToChecked("AsyncData", "vue");
  });
});

// ---------------------------------------------------------------------------
// ServerComponent: defineComponent({ runtime: "server" })
//
// React is the only target that materialises the runtime hint. Vue ignores
// `runtime` entirely.
// ---------------------------------------------------------------------------
describe("ServerComponent: runtime: 'server' handling", () => {
  it("Vue: ignores runtime hint — no server directive, plain SFC", async () => {
    const out = await compileTo("ServerComponent", "vue");
    expect(out).not.toContain("use server");
    expect(out).toContain("Server-rendered content");
  });
});

// ---------------------------------------------------------------------------
// ClientComponent: defineComponent({ runtime: "client" }) with signal + setter
//
// Exercises the "use client" boundary plus setter wiring: a createSignal setter
// used inside an event handler is rewritten per target (assignment on Vue).
// ---------------------------------------------------------------------------
describe("ClientComponent: runtime: 'client' handling", () => {
  it("Vue: keeps ref(0) and rewrites the setter to an assignment in the template", async () => {
    const out = await compileTo("ClientComponent", "vue");
    // The setter call is rewritten to a plain assignment in the Vue template
    // (Vue auto-unwraps the ref, so no .value here). No use-client directive.
    expect(out).toContain("const count = ref(0)");
    expect(out).toContain('@click="() => count = count + 1"');
    expect(out).not.toContain("use client");
    expect(out).not.toContain("function setCount");
  });
});

// ---------------------------------------------------------------------------
// IsoComponent: defineComponent({ runtime: "iso" }) with a read-only signal
//
// The signal has no setter usage, so this purely exercises read-side wiring —
// Vue binds `value` correctly through .value in the template.
// ---------------------------------------------------------------------------
describe("IsoComponent: runtime: 'iso' handling", () => {
  it("Vue: iso signal becomes ref and reads through .value in template", async () => {
    const out = await compileTo("IsoComponent", "vue");
    expect(out).toContain("const value = ref(0)");
    expect(out).toContain("{{ value }}");
  });
});
