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

describe("parsePass", () => {
  it("parses a Counter component from source", async () => {
    const source = `
      import { createSignal, createMemo, createEffect, defineComponent } from "@inkline/core";

      export default defineComponent(() => {
        const [count, setCount] = createSignal(0);
        const doubled = createMemo(() => count() * 2);
        createEffect(() => { console.log(count()); });
        return (
          <div>
            <p>{count()}</p>
            <p>{doubled()}</p>
            <button onClick={() => setCount(count() + 1)}>+1</button>
          </div>
        );
      });
    `;
    const ctx = makeCtx();
    const artifact = await programPass.run({ fileName: "Counter.ink.tsx", source }, ctx);
    const module = parsePass.run(artifact, ctx);
    const resolved = module instanceof Promise ? await module : module;

    expect(resolved.components).toHaveLength(1);
    const comp = resolved.components[0]!;

    expect(comp.state).toHaveLength(1);
    expect(comp.state[0]!.name).toBe("count");

    expect(comp.memos).toHaveLength(1);
    expect(comp.memos[0]!.name).toBe("doubled");

    expect(comp.effects).toHaveLength(1);

    expect(comp.render.kind).toBe("Element");
    if (comp.render.kind === "Element") {
      expect(comp.render.tag).toBe("div");
      expect(comp.render.children.length).toBeGreaterThan(0);
    }

    expect(ctx.diagnostics.freeze()).toHaveLength(0);
  });

  it("parses JSX elements and text", async () => {
    const source = `
      import { defineComponent } from "@inkline/core";
      const Simple = defineComponent(() => {
        return <p>Hello world</p>;
      });
    `;
    const ctx = makeCtx();
    const artifact = await programPass.run({ fileName: "Simple.ink.tsx", source }, ctx);
    const module = parsePass.run(artifact, ctx);
    const resolved = module instanceof Promise ? await module : module;

    const comp = resolved.components[0]!;
    expect(comp.render.kind).toBe("Element");
    if (comp.render.kind === "Element") {
      expect(comp.render.tag).toBe("p");
      expect(comp.render.children[0]!.kind).toBe("Text");
    }
  });

  it("parses component instances (uppercase tags)", async () => {
    const source = `
      import { defineComponent } from "@inkline/core";
      const App = defineComponent(() => {
        return <MyComponent prop="value" />;
      });
    `;
    const ctx = makeCtx();
    const artifact = await programPass.run({ fileName: "App.ink.tsx", source }, ctx);
    const module = parsePass.run(artifact, ctx);
    const resolved = module instanceof Promise ? await module : module;

    const comp = resolved.components[0]!;
    expect(comp.render.kind).toBe("ComponentInstance");
  });

  it("parses event bindings", async () => {
    const source = `
      import { defineComponent } from "@inkline/core";
      const Btn = defineComponent(() => {
        return <button onClick={() => console.log("click")}>Go</button>;
      });
    `;
    const ctx = makeCtx();
    const artifact = await programPass.run({ fileName: "Btn.ink.tsx", source }, ctx);
    const module = parsePass.run(artifact, ctx);
    const resolved = module instanceof Promise ? await module : module;

    const comp = resolved.components[0]!;
    if (comp.render.kind === "Element") {
      expect(comp.render.events).toHaveLength(1);
      expect(comp.render.events[0]!.name).toBe("onClick");
    }
  });

  it("has name 'parse'", () => {
    expect(parsePass.name).toBe("parse");
  });
});
