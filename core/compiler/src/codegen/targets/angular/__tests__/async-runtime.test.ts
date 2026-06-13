// Angular: async runtime lowering — createResource → signal fields + async loader,
// and runtime-hint handling (client/iso) for the Angular target.
import { describe, it, expect } from "vitest";
import { compileTo, compileToChecked } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// AsyncData: createResource() async data fetching
//
// In the authoring model `createResource<T>(fn)` returns `[data: T | undefined,
// { loading: boolean; error }]` — plain VALUES read by their bare names. Angular
// lowers a resource to reactive state (data/loading/error) plus an async loader
// that runs the fetcher and updates them (the universal "manual fetch with
// loading/error state" pattern). The fixture aliases error to `_error` (unused).
// ---------------------------------------------------------------------------
describe("AsyncData: createResource async resource handling", () => {
  it("Angular lowers the resource to signal fields plus an async loader", async () => {
    const out = await compileTo("AsyncData", "angular");
    // Angular lowers each resource to reactive signal fields (data/loading/error) plus an async
    // loader that runs the fetcher and writes the results into those signals — the universal
    // "manual fetch with loading/error state" pattern. The `resource` symbol is no longer imported.
    expect(out).toContain(
      'import { Component, signal, computed, effect, input } from "@angular/core";',
    );
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

  it("createResource produces no diagnostic on Angular", async () => {
    await compileToChecked("AsyncData", "angular");
  });
});

// ---------------------------------------------------------------------------
// ClientComponent: defineComponent({ runtime: "client" }) with signal + setter
//
// Exercises the "use client" boundary plus setter wiring: a createSignal setter
// used inside an event handler is rewritten to `.set()` on Angular.
// ---------------------------------------------------------------------------
describe("ClientComponent: runtime: 'client' handling", () => {
  it("Angular: rewrites the setter to a signal .set() statement in (click)", async () => {
    const out = await compileTo("ClientComponent", "angular");
    // class has `count = signal(0)`; the setter is rewritten to `count.set(...)`
    // as a statement binding (no arrow wrapper).
    expect(out).toContain("count = signal(0)");
    expect(out).toContain('(click)="count.set(count() + 1)"');
  });
});

// ---------------------------------------------------------------------------
// IsoComponent: defineComponent({ runtime: "iso" }) with a read-only signal
//
// The signal has no setter usage, so this purely exercises read-side wiring —
// Angular binds `value` correctly via a signal() field read.
// ---------------------------------------------------------------------------
describe("IsoComponent: runtime: 'iso' handling", () => {
  it("Angular: iso signal becomes a signal() field read via () in template", async () => {
    const out = await compileTo("IsoComponent", "angular");
    expect(out).toContain("value = signal(0)");
    expect(out).toContain("{{ value() }}");
  });
});
