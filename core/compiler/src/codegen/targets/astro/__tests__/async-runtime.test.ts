// Astro: async runtime — createResource SSR lowering and runtime: server/client/iso handling.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// AsyncData: createResource() async data fetching
//
// In the authoring model `createResource<T>(fn)` returns `[data: T | undefined,
// { loading: boolean; error }]` — plain VALUES read by their bare names. Every
// target lowers a resource to reactive state (data/loading/error) plus an async
// loader that runs the fetcher and updates them. The fixture aliases error to
// `_error` (unused).
// ---------------------------------------------------------------------------
describe("AsyncData: createResource async resource handling", () => {
  it("Astro renders the resource server-side (best-effort): top-level await, loading resolved", async () => {
    const out = await compileTo("AsyncData", "astro");
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
});

// ---------------------------------------------------------------------------
// ServerComponent: defineComponent({ runtime: "server" })
//
// React is the only target that materialises the runtime hint — it prepends a
// `"use server";` directive. Every other target ignores `runtime` entirely.
// ---------------------------------------------------------------------------
describe("ServerComponent: runtime: 'server' handling", () => {
  it("Astro: ignores runtime hint — frontmatter only declares props", async () => {
    const out = await compileTo("ServerComponent", "astro");
    expect(out).not.toContain("use server");
    expect(out).toContain("const props = Astro.props as Props;");
    expect(out).toContain("Server-rendered content");
  });
});

// ---------------------------------------------------------------------------
// ClientComponent: defineComponent({ runtime: "client" }) with signal + setter
//
// Exercises the "use client" boundary plus setter wiring: a createSignal setter
// used inside an event handler is rewritten per target (assignment on Astro).
// ---------------------------------------------------------------------------
describe("ClientComponent: runtime: 'client' handling", () => {
  it("Astro declares the signal state in the frontmatter and rewrites the setter to an assignment", async () => {
    const out = await compileTo("ClientComponent", "astro");
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
// Astro declares it as `let value = 0` in the frontmatter.
// ---------------------------------------------------------------------------
describe("IsoComponent: runtime: 'iso' handling", () => {
  it("Astro declares the iso signal in the frontmatter and reads it in the template", async () => {
    const out = await compileTo("IsoComponent", "astro");
    // The iso signal is declared as `let value = 0` in the frontmatter and read
    // directly as `{value}` in the template.
    expect(out).toContain("let value = 0");
    expect(out).toContain("{value}");
  });
});
