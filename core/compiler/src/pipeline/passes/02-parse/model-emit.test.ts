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

  it("synthesizes a value prop and an `update:value` model event", async () => {
    const comp = (await parse(MODEL_SOURCE)).components[0]!;
    expect(comp.props.some((p) => p.name === "value")).toBe(true);
    const ev = comp.events.find((e) => e.name === "update:value");
    expect(ev).toBeDefined();
    expect(ev!.kind).toBe("model");
    expect(ev!.propName).toBe("value");
  });

  it("does not register the model as local state", async () => {
    expect((await parse(MODEL_SOURCE)).components[0]!.state).toHaveLength(0);
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
    const ev = comp.events.find((e) => e.name === "press");
    expect(ev).toBeDefined();
    expect(ev!.kind ?? "event").toBe("event");
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
