// Vue control-flow codegen: v-if/v-else, v-if/v-else-if, :class, computed, v-for + v-if.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// Conditional: <Show when fallback> per-target if/else syntax
// ---------------------------------------------------------------------------
describe("Conditional: Show/when/fallback control flow", () => {
  it("Vue: v-if / v-else split across the two branches", async () => {
    const out = await compileTo("Conditional", "vue");
    expect(out).toContain('<span v-if="visible">');
    expect(out).toContain("<span v-else>");
  });
});

// ---------------------------------------------------------------------------
// SwitchTabs: <Switch>/<Match> control flow
// ---------------------------------------------------------------------------
describe("SwitchTabs: Switch/Match control flow", () => {
  it("Vue: v-if / v-else-if with single-quoted bindings", async () => {
    const out = await compileTo("SwitchTabs", "vue");
    expect(out).toContain("<p v-if='tab === \"a\"'>");
    expect(out).toContain("<p v-else-if='tab === \"b\"'>");
  });
});

// ---------------------------------------------------------------------------
// ConditionalClass: conditional class binding per target
// ---------------------------------------------------------------------------
describe("ConditionalClass: conditional class binding", () => {
  it("Vue: :class with single-quoted ternary binding", async () => {
    const out = await compileTo("ConditionalClass", "vue");
    expect(out).toContain('<div :class=\'active ? "active" : "inactive"\'>');
  });
});

// ---------------------------------------------------------------------------
// ConditionalRead: createMemo over a conditional read of two signals
// ---------------------------------------------------------------------------
describe("ConditionalRead: memoized conditional read", () => {
  it("Vue: computed reads each ref through .value", async () => {
    const out = await compileTo("ConditionalRead", "vue");
    expect(out).toContain("const value = computed(() => (flag.value ? a.value : b.value))");
  });
});

// ---------------------------------------------------------------------------
// MixedControlFlow: For + Show nested control flow
// ---------------------------------------------------------------------------
describe("MixedControlFlow: For + Show nesting", () => {
  it("Vue: v-for template wraps a v-if child", async () => {
    const out = await compileTo("MixedControlFlow", "vue");
    expect(out).toContain('<template v-for="item in items" :key="item">');
    expect(out).toContain('<li v-if="item.includes(filter)">');
  });
});
