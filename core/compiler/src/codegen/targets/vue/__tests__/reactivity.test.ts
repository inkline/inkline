// Reactivity codegen for the Vue target: signal/memo/effect wiring and setter
// rewrites through Vue's ref/computed/watchEffect primitives.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Counter: signal + memo + effect dependency wiring", () => {
  it("Vue: ref/computed/watchEffect read through .value", async () => {
    const out = await compileTo("Counter", "vue");
    expect(out).toContain("const count = ref(0)");
    expect(out).toContain("const doubled = computed(() => count.value * 2)");
    expect(out).toContain('watchEffect(() => { console.log("count:", count.value); })');
  });

  it("Vue: handler rewrites setter to direct assignment in template", async () => {
    const out = await compileTo("Counter", "vue");
    // The setter call is rewritten to a direct ref assignment in the template
    // (Vue auto-unwraps .value in templates), so no undefined setCount is emitted.
    expect(out).toContain('@click="() => count = count + 1"');
    expect(out).not.toContain("function setCount");
    expect(out).not.toContain("setCount");
  });
});

describe("MemoChain: memo referencing memo referencing signal", () => {
  it("Vue: chained computed reads each upstream memo via .value", async () => {
    const out = await compileTo("MemoChain", "vue");
    expect(out).toContain("const quadrupled = computed(() => doubled.value * 2)");
    expect(out).toContain("const label = computed(() => `Value: ${quadrupled.value}`)");
  });
});

describe("DynamicAccess: computed indexing one signal by another", () => {
  it("Vue: dynamic key access reads both signals via .value", async () => {
    const out = await compileTo("DynamicAccess", "vue");
    expect(out).toContain("const value = computed(() => obj.value[key.value])");
  });
});
