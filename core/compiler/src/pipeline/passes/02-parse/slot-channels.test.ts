import { describe, it, expect } from "vitest";
import { compile } from "../../compile.ts";

// The corpus declares every slot with `defineSlot` (UXF-251). That migration rests on the two
// channels being interchangeable for a plain declaration, and on the options key being *moved*
// rather than duplicated — neither of which the compiler reports on, since the merge in
// `02-parse/index.ts` concatenates without deduplicating. These cases pin both.

const HEAD = `import { defineComponent, defineProps, defineSlot, Slot } from "@inkline/core";
export interface P { label?: string }
`;

/** `slots` in the options object; `<Slot>` in the body. The shape the corpus used before UXF-251. */
const OPTIONS = `${HEAD}
export default defineComponent({ slots: { default: {} } }, () => {
  const props = defineProps<P>();
  return <div><Slot>{props.label}</Slot></div>;
});
`;

/** The same declaration through the macro. The shape the corpus uses now. */
const DEFINE_SLOT = `${HEAD}
export default defineComponent(() => {
  const props = defineProps<P>();
  const _defaultSlot = defineSlot();
  return <div><Slot>{props.label}</Slot></div>;
});
`;

/** Both channels at once — what an "add the macro, forget the options key" edit would produce. */
const BOTH = `${HEAD}
export default defineComponent({ slots: { default: {} } }, () => {
  const props = defineProps<P>();
  const _defaultSlot = defineSlot();
  return <div><Slot>{props.label}</Slot></div>;
});
`;

/** Neither channel — the slot is inferred from `<Slot>` alone, and it carries the fallback. */
const NEITHER = `${HEAD}
export default defineComponent(() => {
  const props = defineProps<P>();
  return <div><Slot>{props.label}</Slot></div>;
});
`;

async function slotsOf(source: string) {
  const result = await compile({ fileName: "T.ink.tsx", source }, { targets: ["react"] });
  expect(result.diagnostics).toEqual([]);
  return result.module!.module.components[0]!.slots.map((s) => ({
    name: s.name,
    isScoped: s.isScoped,
    required: s.required,
    hasFallback: s.fallback !== undefined,
  }));
}

describe("slot declaration channels", () => {
  it("options and defineSlot produce the same slot", async () => {
    const expected = [{ name: "default", isScoped: false, required: false, hasFallback: false }];
    expect(await slotsOf(OPTIONS)).toEqual(expected);
    expect(await slotsOf(DEFINE_SLOT)).toEqual(expected);
  });

  it("declaring through both channels duplicates the slot, silently", async () => {
    // No diagnostic covers this (unlike props' INK0047), so converting a component means moving the
    // declaration, never adding the macro alongside the options key.
    expect(await slotsOf(BOTH)).toHaveLength(2);
  });

  it("removing the options key without the macro changes the declaration", async () => {
    // The `<Slot>`-inferred declaration carries the fallback; a declared one does not. So deleting
    // the options key is not a no-op, which is why the migration converts rather than drops.
    expect(await slotsOf(NEITHER)).toEqual([
      { name: "default", isScoped: false, required: false, hasFallback: true },
    ]);
  });
});
