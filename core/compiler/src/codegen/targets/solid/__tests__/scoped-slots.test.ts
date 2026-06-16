// Solid codegen: scoped / render-prop slots and how the slot ARGUMENTS are threaded through.
// Fixtures: ScopedSlot (For render-prop child), SlotScoped (named scoped slot),
// SlotScopedSingle (default scoped slot with a single positional arg).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ScopedSlot: `<For>` with a render-prop child (item, index) => <li>...</li>
// There is no <Slot> here — the render prop is inlined per target.
// ---------------------------------------------------------------------------
describe("ScopedSlot: For render-prop child inlined per target", () => {
  it("Solid: render prop becomes a <For> child function reading item/index", async () => {
    const out = await compileTo("ScopedSlot", "solid");
    expect(out).toContain("<For each={items()}>");
    expect(out).toContain("{(item, index) => <li>{index}: {item.label}</li>}");
  });
});

// ---------------------------------------------------------------------------
// SlotScoped: named scoped slot `<Slot name="item" args={[item, index]}>` in a For.
// This is where targets diverge most: render-prop targets pass args as a function call,
// Vue/Svelte bind named slot props, Angular/Astro drop them.
// ---------------------------------------------------------------------------
describe("SlotScoped: named scoped slot with args={[item, index]}", () => {
  it("Solid: named slot → `item` render prop, split out of fallthrough props", async () => {
    const out = await compileTo("SlotScoped", "solid");
    expect(out).toContain("item?: (...args: any[]) => any");
    expect(out).toContain('splitProps(props, ["item"])');
    expect(out).toContain("{props.item?.(item, index) ?? <>{index}: {item.label}</>}");
  });
});

// ---------------------------------------------------------------------------
// SlotScopedSingle: a DEFAULT scoped slot `<Slot args={[value()]}>` with fallback.
// The single positional arg is named `value` (read via signal call).
// ---------------------------------------------------------------------------
describe("SlotScopedSingle: default scoped slot with args={[value()]}", () => {
  it("Solid: default scoped slot → `default` render prop, value read via signal call", async () => {
    const out = await compileTo("SlotScopedSingle", "solid");
    expect(out).toContain("default?: (...args: any[]) => any");
    expect(out).toContain('splitProps(props, ["default"])');
    expect(out).toContain("{props.default?.(value()) ?? <span>{value()}</span>}");
  });
});
