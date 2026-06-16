// Real-world codegen assertions for the "scoped-slots" feature area (React target):
// author `.ink.tsx` → compile through the FULL pipeline → assert the ACTUAL generated React code.
//
// Focus: scoped / render-prop slots and how React threads the slot ARGUMENTS through.
// Fixtures:
//   - ScopedSlot:        a `<For>` whose child is a render-prop `(item, index) => ...` (no <Slot>)
//   - SlotScoped:        a named `<Slot name="item" args={[item, index]}>` inside a `<For>`
//   - SlotScopedSingle:  a default `<Slot args={[value()]}>` with fallback content

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ScopedSlot: `<For>` with a render-prop child (item, index) => <li>...</li>
// There is no <Slot> here — the render prop is inlined per target.
// ---------------------------------------------------------------------------
describe("ScopedSlot: For render-prop child inlined per target", () => {
  it("React: render prop becomes .map((item, index) => ...) inlining the <li>", async () => {
    const out = await compileTo("ScopedSlot", "react");
    expect(out).toContain("items.map((item, index) => (");
    expect(out).toContain("<li>{index}: {item.label}</li>");
    // The `key` prop is the EXTRACTED value `item.id` (on the per-row Fragment wrapper),
    // not the raw key arrow — so reconciliation gets a stable per-row identity.
    expect(out).toContain("<Fragment key={item.id}>");
  });
});

// ---------------------------------------------------------------------------
// SlotScoped: named scoped slot `<Slot name="item" args={[item, index]}>` in a For.
// This is where targets diverge most: render-prop targets pass args as a function call,
// Vue/Svelte bind named slot props, Angular/Astro drop them.
// ---------------------------------------------------------------------------
describe("SlotScoped: named scoped slot with args={[item, index]}", () => {
  it("React: named scoped slot → optional function prop `item`, called with (item, index)", async () => {
    const out = await compileTo("SlotScoped", "react");
    expect(out).toContain("item?: (...args: any[]) => React.ReactNode");
    expect(out).toContain("const { item, ...__attrs } = props");
    // a scoped slot is a function prop, invoked with the scope args, falling back to authored content
    expect(out).toContain("{props.item?.(item, index) ?? <>{index}: {item.label}</>}");
  });
});

// ---------------------------------------------------------------------------
// SlotScopedSingle: a DEFAULT scoped slot `<Slot args={[value()]}>` with fallback.
// The single positional arg is named `value` (React/Qwik) or synthesized `prop0` (Vue/Svelte).
// ---------------------------------------------------------------------------
describe("SlotScopedSingle: default scoped slot with args={[value()]}", () => {
  it("React: default scoped slot → `renderDefault` render prop called with (value)", async () => {
    const out = await compileTo("SlotScopedSingle", "react");
    expect(out).toContain("renderDefault?: (...args: any[]) => React.ReactNode");
    expect(out).toContain("{props.renderDefault?.(value) ?? <span>{value}</span>}");
  });
});
