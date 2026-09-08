import { describe, it, expect } from "vitest";
import { ALL_TARGETS } from "./codegen/context.ts";
import { compile } from "./pipeline/compile.ts";

/** The four fenced examples in README.md §Slots, verbatim. */

const PRIMARY = `import { defineComponent, defineSlot, Slot } from "@inkline/core";

export default defineComponent(() => {
  defineSlot();
  defineSlot("prefix");

  return (
    <div>
      <span class="prefix">
        <Slot name="prefix" />
      </span>
      <Slot>Default content</Slot>
    </div>
  );
});
`;

const BINDING = `import { defineComponent, defineSlot } from "@inkline/core";

export default defineComponent(() => {
  const defaultSlot = defineSlot();

  return <div class="body">{defaultSlot}</div>;
});
`;

const OPTIONS = `import { defineComponent, Slot } from "@inkline/core";

export default defineComponent({ slots: { default: {}, prefix: {} } }, () => {
  return (
    <div>
      <span class="prefix">
        <Slot name="prefix" />
      </span>
      <Slot>Default content</Slot>
    </div>
  );
});
`;

const HAS_SLOT = `import { defineComponent, defineSlot, Show, Slot, hasSlot } from "@inkline/core";

export default defineComponent(() => {
  defineSlot("prefix");

  return (
    <Show when={hasSlot("prefix")}>
      <span class="prefix">
        <Slot name="prefix" />
      </span>
    </Show>
  );
});
`;

/** The `<Slot />` counterpart of BINDING, for the "same code on every target" claim. */
const BINDING_AS_SLOT = `import { defineComponent, defineSlot, Slot } from "@inkline/core";

export default defineComponent(() => {
  defineSlot();

  return <div class="body"><Slot /></div>;
});
`;

async function compileAll(source: string) {
  return compile({ fileName: "T.ink.tsx", source }, { targets: ALL_TARGETS });
}

function slotsOf(result: Awaited<ReturnType<typeof compileAll>>) {
  return result.module!.module.components[0]!.slots.map((s) => s.name);
}

function outputOf(result: Awaited<ReturnType<typeof compileAll>>) {
  return Object.fromEntries(
    Object.entries(result.files).map(([target, files]) => [
      target,
      files!.map((f) => `// ${f.path}\n${f.contents}`).join("\n"),
    ]),
  );
}

describe("README §Slots examples", () => {
  it("the defineSlot example compiles clean and declares both slots", async () => {
    const result = await compileAll(PRIMARY);
    expect(result.diagnostics).toEqual([]);
    expect(slotsOf(result)).toEqual(["default", "prefix"]);
  });

  it("the binding example compiles clean and declares the default slot", async () => {
    const result = await compileAll(BINDING);
    expect(result.diagnostics).toEqual([]);
    expect(slotsOf(result)).toEqual(["default"]);
  });

  it("the options example compiles clean and declares the same two slots", async () => {
    const result = await compileAll(OPTIONS);
    expect(result.diagnostics).toEqual([]);
    expect(slotsOf(result)).toEqual(["default", "prefix"]);
  });

  // §Slots: "The channel is supported and produces the same declaration."
  it("both channels declare the same slots", async () => {
    expect(slotsOf(await compileAll(OPTIONS))).toEqual(slotsOf(await compileAll(PRIMARY)));
  });

  // §Slots: "`{defaultSlot}` and `<Slot />` emit the same code on every target."
  it("the alias emits the same code as <Slot /> on every target", async () => {
    const alias = await compileAll(BINDING);
    const explicit = await compileAll(BINDING_AS_SLOT);
    expect(explicit.diagnostics).toEqual([]);
    expect(outputOf(alias)).toEqual(outputOf(explicit));
  });

  // §Slots: the hasSlot example. INK0068 is the documented Qwik/Angular info, not an error.
  it("the hasSlot example compiles with only the documented INK0068 info", async () => {
    const result = await compileAll(HAS_SLOT);
    expect(result.diagnostics.map((d) => `${d.code}:${d.severity}`)).toEqual([
      "INK0068:info",
      "INK0068:info",
    ]);
    expect(slotsOf(result)).toEqual(["prefix"]);
  });
});
