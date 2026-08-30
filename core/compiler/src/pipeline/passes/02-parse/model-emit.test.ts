// Parse-level behaviour of defineModel / defineEmits, asserted against the raw parsed IR.
// (Inline source so codegen never runs — model/emit codegen lands in later phases.)
import { describe, it, expect } from "vitest";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { programPass } from "../01-program.ts";
import { parsePass } from "./index.ts";

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

async function parse(source: string, ctx: PassContext = makeCtx()) {
  const artifact = await programPass.run({ fileName: "T.ink.tsx", source }, ctx);
  const module = parsePass.run(artifact, ctx);
  return module instanceof Promise ? await module : module;
}

const MODEL_SOURCE = `
  import { defineComponent, defineModel } from "@inkline/core";
  export default defineComponent(() => {
    const [value, setValue] = defineModel<string>("value");
    return <input value={value()} onInput={(e) => setValue((e.target as HTMLInputElement).value)} />;
  });
`;

describe("defineModel parsing", () => {
  it("records a model with its getter, setter, and prop name", async () => {
    const comp = (await parse(MODEL_SOURCE)).components[0]!;
    expect(comp.models).toHaveLength(1);
    expect(comp.models[0]!.name).toBe("value");
    expect(comp.models[0]!.setterName).toBe("setValue");
    expect(comp.models[0]!.propName).toBe("value");
  });

  it("keeps the model out of props/events/state (component.models is the single source)", async () => {
    const comp = (await parse(MODEL_SOURCE)).components[0]!;
    expect(comp.state).toHaveLength(0);
    expect(comp.props.some((p) => p.name === "value")).toBe(false);
    expect(comp.events.some((e) => e.name === "update:value")).toBe(false);
  });

  it('defaults the prop name to "value" when no argument is given', async () => {
    const comp = (
      await parse(`
        import { defineComponent, defineModel } from "@inkline/core";
        export default defineComponent(() => {
          const [v, setV] = defineModel();
          return <input value={v()} onInput={(e) => setV((e.target as HTMLInputElement).value)} />;
        });
      `)
    ).components[0]!;
    expect(comp.models[0]!.propName).toBe("value");
    expect(comp.models[0]!.name).toBe("v");
  });

  it("warns (INK0044) when a model collides with a hand-declared prop", async () => {
    const ctx = makeCtx();
    await parse(
      `
        import { defineComponent, defineModel } from "@inkline/core";
        export default defineComponent((props: { value?: string }) => {
          const [value, setValue] = defineModel<string>("value");
          return <input value={value()} onInput={(e) => setValue(props.value ?? "")} />;
        });
      `,
      ctx,
    );
    expect(ctx.diagnostics.freeze().some((d) => d.code === "INK0044")).toBe(true);
  });

  // The type-only `models` key is parsed in the same pass as INK0044's prop-collision check and must
  // not interact with it — the collision is still the author's problem either way.
  it("still warns (INK0044) when the collision is also declared in options.models", async () => {
    const ctx = makeCtx();
    await parse(
      `
        import { defineComponent, defineModel } from "@inkline/core";
        export default defineComponent(
          { models: { value: String } },
          (props: { value?: string }) => {
            const [value, setValue] = defineModel<string>("value");
            return <input value={value()} onInput={(e) => setValue(props.value ?? "")} />;
          },
        );
      `,
      ctx,
    );
    expect(ctx.diagnostics.freeze().some((d) => d.code === "INK0044")).toBe(true);
  });
});

describe("options.models parsing", () => {
  it("records the declared entries without touching component.models", async () => {
    const comp = (
      await parse(`
        import { defineComponent, defineModel } from "@inkline/core";
        export default defineComponent({ models: { open: Boolean } }, () => {
          const [open, setOpen] = defineModel<boolean>("open");
          return <button onClick={() => setOpen(!open())}>{open() ? "on" : "off"}</button>;
        });
      `)
    ).components[0]!;
    expect(comp.declaredModels).toEqual([
      expect.objectContaining({ name: "open", typeText: "boolean" }),
    ]);
    // The setup body stays the single source every target emits from.
    expect(comp.models.map((m) => m.propName)).toEqual(["open"]);
  });

  it("leaves declaredModels undefined when the author wrote no models key", async () => {
    const comp = (await parse(MODEL_SOURCE)).components[0]!;
    expect(comp.declaredModels).toBeUndefined();
  });

  it("reads the type off a full { type, … } declaration", async () => {
    const comp = (
      await parse(`
        import { defineComponent, defineModel } from "@inkline/core";
        export default defineComponent(
          { models: { count: { type: Number, required: true } } },
          () => {
            const [count, setCount] = defineModel<number>("count");
            return <button onClick={() => setCount(count() + 1)}>{count()}</button>;
          },
        );
      `)
    ).components[0]!;
    expect(comp.declaredModels![0]).toEqual(
      expect.objectContaining({ name: "count", typeText: "number" }),
    );
  });
});

describe("defineEmits parsing", () => {
  it("records the emit local name and a typed event", async () => {
    const comp = (
      await parse(`
        import { defineComponent, defineEmits } from "@inkline/core";
        export default defineComponent(() => {
          const emit = defineEmits<{ press: [count: number] }>();
          return <button onClick={() => emit("press", 1)}>Go</button>;
        });
      `)
    ).components[0]!;
    expect(comp.emitName).toBe("emit");
    expect(comp.events.some((e) => e.name === "press")).toBe(true);
  });

  // `payloadType` is what every target types its event channel from. It was written nowhere for a
  // release, which left Angular emitting a bare `output()`; assert the propagation so a silent
  // regression fails here rather than in the emitted output.
  it("carries the declared payload tuple onto the event", async () => {
    const comp = (
      await parse(`
        import { defineComponent, defineEmits } from "@inkline/core";
        export default defineComponent(() => {
          const emit = defineEmits<{ press: [count: number]; submit: [] }>();
          return <button onClick={() => emit("press", 1)}>Go</button>;
        });
      `)
    ).components[0]!;
    const payloads = Object.fromEntries(comp.events.map((e) => [e.name, e.payloadType?.getText()]));
    expect(payloads).toEqual({ press: "[count: number]", submit: "[]" });
  });

  it("leaves the array form's events untyped", async () => {
    const comp = (
      await parse(`
        import { defineComponent, defineEmits } from "@inkline/core";
        export default defineComponent(() => {
          const emit = defineEmits(["change"]);
          return <button onClick={() => emit("change")}>Go</button>;
        });
      `)
    ).components[0]!;
    expect(comp.events[0]!.payloadType).toBeUndefined();
  });

  it("records events from the array form", async () => {
    const comp = (
      await parse(`
        import { defineComponent, defineEmits } from "@inkline/core";
        export default defineComponent(() => {
          const emit = defineEmits(["change", "submit"]);
          return <button onClick={() => emit("change")}>Go</button>;
        });
      `)
    ).components[0]!;
    expect(comp.events.map((e) => e.name).sort()).toEqual(["change", "submit"]);
  });
});

describe("defineModel diagnostics", () => {
  it("errors (INK0043) on a non-tuple binding", async () => {
    const ctx = makeCtx();
    await parse(
      `
        import { defineComponent, defineModel } from "@inkline/core";
        export default defineComponent(() => {
          const m = defineModel("value");
          return <input value={m[0]()} />;
        });
      `,
      ctx,
    );
    expect(ctx.diagnostics.freeze().some((d) => d.code === "INK0043")).toBe(true);
  });

  it("errors (INK0043) on a dynamic (non-literal) name", async () => {
    const ctx = makeCtx();
    await parse(
      `
        import { defineComponent, defineModel } from "@inkline/core";
        const key = "value";
        export default defineComponent(() => {
          const [v, setV] = defineModel(key);
          return <input value={v()} onInput={(e) => setV((e.target as HTMLInputElement).value)} />;
        });
      `,
      ctx,
    );
    expect(ctx.diagnostics.freeze().some((d) => d.code === "INK0043")).toBe(true);
  });
});
