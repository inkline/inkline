// Real-world Vue codegen assertions for the "scoped-slots" feature area: author `.ink.tsx` →
// compile through the full pipeline → assert the ACTUAL generated Vue code.
// Focus: scoped / render-prop slots and how Vue threads the slot ARGUMENTS through (v-for scope,
// named slot props, synthetic positional :prop0).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ScopedSlot: `<For>` with a render-prop child (item, index) => <li>...</li>
// There is no <Slot> here — the render prop is inlined per target.
// ---------------------------------------------------------------------------
describe("ScopedSlot: For render-prop child inlined per target", () => {
  it("Vue: For lowers to v-for; loop vars item/index are in template scope", async () => {
    const out = await compileTo("ScopedSlot", "vue");
    expect(out).toContain('<li v-for="(item, index) in items" :key="item.id">');
    expect(out).toContain("{{ index }}");
    expect(out).toContain("{{ item.label }}");
  });
});

// ---------------------------------------------------------------------------
// SlotScoped: named scoped slot `<Slot name="item" args={[item, index]}>` in a For.
// Vue binds named slot props.
// ---------------------------------------------------------------------------
describe("SlotScoped: named scoped slot with args={[item, index]}", () => {
  it("Vue: named slot binds scope args as :item / :index slot props with fallback", async () => {
    const out = await compileTo("SlotScoped", "vue");
    expect(out).toContain('<slot name="item" :item="item" :index="index">');
    // fallback content is preserved inside the slot
    expect(out).toContain("{{ index }}");
    expect(out).toContain("{{ item.label }}");
  });
});

// ---------------------------------------------------------------------------
// SlotScopedSingle: a DEFAULT scoped slot `<Slot args={[value()]}>` with fallback.
// The single positional arg is synthesized as `prop0` for Vue.
// ---------------------------------------------------------------------------
describe("SlotScopedSingle: default scoped slot with args={[value()]}", () => {
  it("Vue: default scoped slot binds the positional arg as a synthetic :prop0", async () => {
    const out = await compileTo("SlotScopedSingle", "vue");
    expect(out).toContain('<slot :prop0="value">');
    expect(out).toContain("{{ value }}");
  });
});
