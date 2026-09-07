import { describe, it, expect } from "vitest";
import { compile } from "../../compile.ts";
import { ALL_TARGETS } from "../../../codegen/context.ts";

// The corpus declares every slot with `defineSlot` (UXF-251). That migration rests on the two
// channels being interchangeable for a plain declaration, and on the options key being *moved*
// rather than duplicated — neither of which the compiler reports on, since the merge in
// `02-parse/index.ts` concatenates without deduplicating. These cases pin both, plus the third
// channel `<Slot>` opens on its own.

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

/** The same declaration through the macro, bound to a local the render tree never reads. */
const BOUND = `${HEAD}
export default defineComponent(() => {
  const props = defineProps<P>();
  const _defaultSlot = defineSlot();
  return <div><Slot>{props.label}</Slot></div>;
});
`;

/** The same declaration without the binding. The shape the corpus uses now (UXF-254). */
const BARE = `${HEAD}
export default defineComponent(() => {
  const props = defineProps<P>();
  defineSlot();
  return <div><Slot>{props.label}</Slot></div>;
});
`;

/** Both channels at once — what an "add the macro, forget the options key" edit would produce. */
const BOTH = `${HEAD}
export default defineComponent({ slots: { default: {} } }, () => {
  const props = defineProps<P>();
  defineSlot();
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

/**
 * A bare `defineSlot("footer")` the render tree never places. The one shape that separates the
 * macro from the `<Slot>` inference: nothing else in the source names `footer`.
 */
const UNPLACED = `${HEAD}
export default defineComponent(() => {
  const props = defineProps<P>();
  defineSlot("footer");
  return <div>{props.label}</div>;
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

async function outputOf(source: string) {
  const result = await compile({ fileName: "T.ink.tsx", source }, { targets: ALL_TARGETS });
  expect(result.diagnostics).toEqual([]);
  return Object.fromEntries(
    Object.entries(result.files).map(([target, files]) => [
      target,
      files!.map((f) => `// ${f.path}\n${f.contents}`).join("\n"),
    ]),
  );
}

describe("slot declaration channels", () => {
  it("options and defineSlot produce the same slot, bound or bare", async () => {
    const expected = [{ name: "default", isScoped: false, required: false, hasFallback: false }];
    expect(await slotsOf(OPTIONS)).toEqual(expected);
    expect(await slotsOf(BOUND)).toEqual(expected);
    expect(await slotsOf(BARE)).toEqual(expected);
  });

  // The binding names the slot for the render tree; it is not what declares it. A component that
  // renders through `<Slot>` never reads the local, so the two forms have to emit the same code.
  it("emits the same output with and without the binding, on every target", async () => {
    expect(await outputOf(BARE)).toEqual(await outputOf(BOUND));
  });

  it("declaring through both channels duplicates the slot, silently", async () => {
    // No diagnostic covers this (unlike props' INK0047), so converting a component means moving the
    // declaration, never adding the macro alongside the options key.
    expect(await slotsOf(BOTH)).toHaveLength(2);
  });

  it("removing the options key without the macro changes the declaration, not the output", async () => {
    // The `<Slot>`-inferred declaration carries the fallback; a declared one does not. The
    // difference stops at the IR: every target reads the fallback off the `SlotPlaceholder` render
    // node, and `IRSlotDeclaration.fallback` has no reader at all.
    expect(await slotsOf(NEITHER)).toEqual([
      { name: "default", isScoped: false, required: false, hasFallback: true },
    ]);
    expect(await outputOf(NEITHER)).toEqual(await outputOf(BARE));
  });

  // The discriminator. Every case above has a `<Slot>` that would infer the same declaration, so
  // none of them proves the macro declared anything. Here nothing else names `footer`.
  it("declares a slot the render tree never places", async () => {
    expect(await slotsOf(UNPLACED)).toEqual([
      { name: "footer", isScoped: false, required: false, hasFallback: false },
    ]);
  });
});
