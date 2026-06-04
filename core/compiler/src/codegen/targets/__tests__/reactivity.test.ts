import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

describe("Counter: signal + memo + effect dependency wiring", () => {
  it("React: useState/useMemo/useEffect with correct deps", async () => {
    const out = await code("Counter", "react");
    expect(out).toContain("const [count, setCount] = useState(0)");
    expect(out).toContain("const doubled = useMemo(() => count * 2, [count])");
    expect(out).toContain('useEffect(() => { console.log("count:", count); }, [count])');
  });

  it("Vue: ref/computed/watchEffect read through .value", async () => {
    const out = await code("Counter", "vue");
    expect(out).toContain("const count = ref(0)");
    expect(out).toContain("const doubled = computed(() => count.value * 2)");
    expect(out).toContain('watchEffect(() => { console.log("count:", count.value); })');
  });

  it("Solid: createSignal/createMemo call-style reads", async () => {
    const out = await code("Counter", "solid");
    expect(out).toContain("const [count, setCount] = createSignal(0)");
    expect(out).toContain("const doubled = createMemo(() => count() * 2)");
  });

  it("Angular: class-body memo reads dependencies via this.", async () => {
    const out = await code("Counter", "angular");
    expect(out).toContain("count = signal(0)");
    // class-body computed/effect must reach sibling signals through `this`
    expect(out).toContain("doubled = computed(() => this.count() * 2)");
    // string literals inside the class body are single-quoted; the effect is
    // consolidated into the constructor and reads the signal via `this`
    expect(out).toContain(
      "constructor() { effect(() => { console.log('count:', this.count()); }) }",
    );
  });

  it("Svelte: $state/$derived rune wiring", async () => {
    const out = await code("Counter", "svelte");
    expect(out).toContain("let count = $state(0)");
    expect(out).toContain("let doubled = $derived(count * 2)");
  });

  it("Vue: handler rewrites setter to direct assignment in template", async () => {
    const out = await code("Counter", "vue");
    // The setter call is rewritten to a direct ref assignment in the template
    // (Vue auto-unwraps .value in templates), so no undefined setCount is emitted.
    expect(out).toContain('@click="() => count = count + 1"');
    expect(out).not.toContain("function setCount");
    expect(out).not.toContain("setCount");
  });

  it("Qwik: click handler is single-wrapped with the setter rewritten to .value assignment", async () => {
    const out = await code("Counter", "qwik");
    // Single $(...) wrap and the setter call is rewritten to a signal .value
    // assignment, so clicking runs the handler instead of returning a function.
    expect(out).toContain("onClick={$(() => count.value = count.value + 1)}");
    expect(out).not.toContain("$(() => () =>");
    expect(out).not.toContain("setCount");
  });

  it("Astro: declares signal state in the frontmatter and rewrites the setter to a direct assignment", async () => {
    const out = await code("Counter", "astro");
    // signal state is declared as a plain `let` in the frontmatter, so the
    // derived value and the template read a real binding (no undefined `count`).
    expect(out).toContain("let count = 0");
    expect(out).toContain("const doubled = count * 2");
    expect(out).toContain("{count}");
    // the setter call is rewritten to a direct assignment; `setCount` is gone.
    expect(out).toContain("count = count + 1");
    expect(out).not.toContain("setCount");
  });
});

describe("MemoChain: memo referencing memo referencing signal", () => {
  it("React: linear chain threads deps base->doubled->quadrupled->label", async () => {
    const out = await code("MemoChain", "react");
    expect(out).toContain("const doubled = useMemo(() => base * 2, [base])");
    expect(out).toContain("const quadrupled = useMemo(() => doubled * 2, [doubled])");
    expect(out).toContain("const label = useMemo(() => `Value: ${quadrupled}`, [quadrupled])");
  });

  it("Angular: chained computed reads each upstream memo via this.", async () => {
    const out = await code("MemoChain", "angular");
    expect(out).toContain("doubled = computed(() => this.base() * 2)");
    expect(out).toContain("quadrupled = computed(() => this.doubled() * 2)");
    expect(out).toContain("label = computed(() => `Value: ${this.quadrupled()}`)");
  });

  it("Vue: chained computed reads each upstream memo via .value", async () => {
    const out = await code("MemoChain", "vue");
    expect(out).toContain("const quadrupled = computed(() => doubled.value * 2)");
    expect(out).toContain("const label = computed(() => `Value: ${quadrupled.value}`)");
  });
});

describe("DiamondMemo: two memos over one signal, joined by a third", () => {
  it("React: combined memo depends on both left and right", async () => {
    const out = await code("DiamondMemo", "react");
    expect(out).toContain("const left = useMemo(() => base * 2, [base])");
    expect(out).toContain("const right = useMemo(() => base * 3, [base])");
    expect(out).toContain("const combined = useMemo(() => left + right, [left, right])");
  });

  it("Angular: diamond join reads both branch memos via this.", async () => {
    const out = await code("DiamondMemo", "angular");
    expect(out).toContain("combined = computed(() => this.left() + this.right())");
  });
});

describe("BatchUpdates: batch() helper inside an event handler", () => {
  // `batch(() => { … })` is a no-op grouping wrapper in the authoring model (every framework batches
  // synchronous updates), so it is unwrapped to the inner body — no undefined `batch` import.
  it("Solid: sum memo wires both signals; the batch wrapper is unwrapped to its body", async () => {
    const out = await code("BatchUpdates", "solid");
    expect(out).toContain("const sum = createMemo(() => x() + y())");
    expect(out).toContain("onclick={() => { setX(x() + 1); setY(y() + 1); }}");
    expect(out).not.toContain("batch(");
  });

  it("React: the handler collapses to a block; no undefined `batch` reference", async () => {
    const out = await code("BatchUpdates", "react");
    expect(out).toContain("onClick={() => { setX(x + 1); setY(y + 1); }}");
    expect(out).not.toContain("batch");
  });

  it("Angular: the handler unwraps to a `;`-separated statement binding", async () => {
    const out = await code("BatchUpdates", "angular");
    expect(out).toContain('(click)="x.set(x() + 1); y.set(y() + 1);"');
    expect(out).not.toContain("batch");
  });
});

describe("ConditionalRead: memo with a conditional over three signals", () => {
  it("React: ternary memo lists all three reads as deps", async () => {
    const out = await code("ConditionalRead", "react");
    expect(out).toContain("const value = useMemo(() => (flag ? a : b), [flag, a, b])");
  });

  it("Angular: ternary memo reads all three signals via this.", async () => {
    const out = await code("ConditionalRead", "angular");
    expect(out).toContain("value = computed(() => (this.flag() ? this.a() : this.b()))");
  });
});

describe("LateSignal: memo declared before the signal it reads", () => {
  it("React: hoists state so memo dep resolves despite source order", async () => {
    const out = await code("LateSignal", "react");
    expect(out).toContain("const [count, setCount] = useState(5)");
    expect(out).toContain("const doubled = useMemo(() => count * 2, [count])");
  });

  it("Angular: late signal still wired via this. in the computed", async () => {
    const out = await code("LateSignal", "angular");
    expect(out).toContain("count = signal(5)");
    expect(out).toContain("doubled = computed(() => this.count() * 2)");
  });
});

describe("DynamicAccess: computed indexing one signal by another", () => {
  it("Vue: dynamic key access reads both signals via .value", async () => {
    const out = await code("DynamicAccess", "vue");
    expect(out).toContain("const value = computed(() => obj.value[key.value])");
  });

  it("Angular: dynamic key access reads both signals via this.", async () => {
    const out = await code("DynamicAccess", "angular");
    expect(out).toContain("value = computed(() => this.obj()[this.key()])");
  });

  it("Solid: dynamic key access uses call-style reads", async () => {
    const out = await code("DynamicAccess", "solid");
    expect(out).toContain("const value = createMemo(() => obj()[key()])");
  });
});
