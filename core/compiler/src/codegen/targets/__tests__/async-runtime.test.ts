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
// `loading` and `data`. Across EVERY target the entire resource declaration
// is dropped: no import, no binding for data/loading/error is emitted, yet
// the template still references them. The compiler produces NO diagnostic for
// this, so the broken output ships silently.
// ---------------------------------------------------------------------------
describe("AsyncData: createResource async resource handling", () => {
  it("BUG: React drops createResource — template reads undeclared loading/data", async () => {
    const out = await code("AsyncData", "react");
    // BUG: the resource tuple is never emitted, so `loading` and `data` are
    // undefined references inside the returned JSX.
    expect(out).toContain('{loading ? "Loading..." : JSON.stringify(data)}');
    expect(out).not.toContain("createResource");
    expect(out).not.toContain("const [data");
    expect(out).not.toContain("loading =");
  });

  it("BUG: Vue emits an empty <script setup> while template reads loading/data", async () => {
    const out = await code("AsyncData", "vue");
    // BUG: <script setup> has no bindings at all; the template interpolation
    // references loading/data which are never declared.
    expect(out).toContain('<script setup lang="ts">\n</script>');
    expect(out).toContain('{{ loading ? "Loading..." : JSON.stringify(data) }}');
    expect(out).not.toContain("createResource");
  });

  it("BUG: Solid drops createResource — no resource signal emitted", async () => {
    const out = await code("AsyncData", "solid");
    // BUG: Solid has a native createResource, but the call (and its import) is
    // dropped; the template reads `loading`/`data` non-call-style undeclared.
    expect(out).toContain('{loading ? "Loading..." : JSON.stringify(data)}');
    expect(out).not.toContain("createResource");
  });

  it("BUG: Angular class body is empty while template binds loading/data", async () => {
    const out = await code("AsyncData", "angular");
    // BUG: the component class has no fields, but the inline template reads
    // `loading`/`data` (no `this.` either) — undefined at runtime.
    expect(out).toContain("export class AsyncDataComponent\n{\n}");
    expect(out).toContain('{{ loading ? "Loading..." : JSON.stringify(data) }}');
  });

  it("BUG: createResource produces no diagnostic on any target", async () => {
    const result = await compileFixture("AsyncData");
    // BUG: the dropped resource is a silent failure — nothing warns the author.
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
// Exercises the "use client" boundary plus the well-known setter-dropping bug
// that surfaces when a createSignal setter is used inside an event handler.
// ---------------------------------------------------------------------------
describe("ClientComponent: runtime: 'client' handling", () => {
  it('React: emits "use client" and a working useState + onClick', async () => {
    const out = await code("ClientComponent", "react");
    expect(out.startsWith('"use client";')).toBe(true);
    expect(out).toContain("const [count, setCount] = useState(0)");
    expect(out).toContain("onClick={() => setCount(count + 1)}");
  });

  it("BUG: Vue keeps ref(0) but template calls undeclared setCount", async () => {
    const out = await code("ClientComponent", "vue");
    // BUG: createSignal's setter is dropped from <script setup>; the click
    // handler calls setCount(...), an undefined reference. Also no use-client.
    expect(out).toContain("const count = ref(0)");
    expect(out).toContain('@click="() => setCount(count + 1)"');
    expect(out).not.toContain("use client");
    expect(out).not.toContain("function setCount");
  });

  it("BUG: Svelte template calls undeclared setCount", async () => {
    const out = await code("ClientComponent", "svelte");
    // BUG: $state(0) is emitted but the setter is dropped; onclick calls
    // setCount(...) which does not exist in the module scope.
    expect(out).toContain("let count = $state(0)");
    expect(out).toContain("onclick={() => setCount(count + 1)}");
    expect(out).not.toContain("setCount =");
  });

  it("BUG: Angular template calls undeclared setCount via (click)", async () => {
    const out = await code("ClientComponent", "angular");
    // BUG: class has `count = signal(0)` but no setCount; the inline template
    // calls a bare `setCount(...)` (not even `this.`), undefined at runtime.
    expect(out).toContain("count = signal(0)");
    expect(out).toContain('(click)="() => setCount(count() + 1)"');
  });

  it("BUG: Qwik double-wraps the click handler and calls undeclared setCount", async () => {
    const out = await code("ClientComponent", "qwik");
    // BUG: `$(() => () => ...)` returns a function on click instead of running
    // the handler; setCount is also never declared in the qwik scope.
    expect(out).toContain("onClick={$(() => () => setCount(count.value + 1))}");
    expect(out).not.toContain("use client");
  });

  it("BUG: Astro drops signal state — template reads undeclared count/setCount", async () => {
    const out = await code("ClientComponent", "astro");
    // BUG: no `count` binding in the frontmatter; the template reads `count`
    // and the click handler calls `setCount`, both undefined.
    expect(out).not.toContain("const count");
    expect(out).toContain("{count}");
    expect(out).toContain("setCount(count + 1)");
  });
});

// ---------------------------------------------------------------------------
// IsoComponent: defineComponent({ runtime: "iso" }) with a read-only signal
//
// The signal has no setter usage, so the cross-target setter bug does not bite
// here — react/vue/solid/svelte/angular/qwik all wire `value` correctly. Astro
// is the lone exception: it still drops the signal state.
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

  it("BUG: Astro drops iso signal — template reads undeclared value", async () => {
    const out = await code("IsoComponent", "astro");
    // BUG: frontmatter only declares props; `value` is referenced in the
    // template but never bound, so it is undefined at runtime.
    expect(out).not.toContain("value =");
    expect(out).toContain("{value}");
  });
});
