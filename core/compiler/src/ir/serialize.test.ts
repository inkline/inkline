import { describe, it, expect } from "vitest";
import { serializeModule, deserializeModule } from "./serialize.ts";
import { compile } from "../pipeline/compile.ts";

const COUNTER_SOURCE = `
import { createSignal, createMemo, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);
  return <div><p>{count()}</p><button onClick={() => setCount(count() + 1)}>+1</button></div>;
});
`;

describe("serializeModule", () => {
  it("produces valid JSON", async () => {
    const result = await compile(
      { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
      { targets: ["react"] },
    );
    const json = serializeModule(result.module!.module);
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it("serialized output contains raw expression strings", async () => {
    const result = await compile(
      { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
      { targets: ["react"] },
    );
    const json = serializeModule(result.module!.module);
    expect(json).toContain('"raw"');
    expect(json).toContain('"kind":"Expression"');
  });

  it("does not contain ts.Expression objects in serialized form", async () => {
    const result = await compile(
      { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
      { targets: ["react"] },
    );
    const json = serializeModule(result.module!.module);
    expect(json).not.toContain("[Circular");
  });
});

describe("deserializeModule", () => {
  it("round-trips: deserialize restores IRModule structure", async () => {
    const result = await compile(
      { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
      { targets: ["react"] },
    );
    const json = serializeModule(result.module!.module);
    const restored = deserializeModule(json);

    expect(restored.version).toBe(result.module!.module.version);
    expect(restored.fileName).toBe(result.module!.module.fileName);
    expect(restored.components).toHaveLength(result.module!.module.components.length);
  });

  it("restored expressions have valid ts.Expression objects", async () => {
    const result = await compile(
      { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
      { targets: ["react"] },
    );
    const json = serializeModule(result.module!.module);
    const restored = deserializeModule(json);

    const comp = restored.components[0]!;
    expect(comp.state.length).toBeGreaterThan(0);
    const initialExpr = comp.state[0]!.initial;
    expect(initialExpr.expr).toBeDefined();
    expect(typeof initialExpr.expr.getText).toBe("function");
  });

  it("restored module preserves component metadata", async () => {
    const result = await compile(
      { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
      { targets: ["react"] },
    );
    const json = serializeModule(result.module!.module);
    const restored = deserializeModule(json);

    const comp = restored.components[0]!;
    expect(comp.name).toBe(result.module!.module.components[0]!.name);
    expect(comp.id).toBe(result.module!.module.components[0]!.id);
    expect(comp.state).toHaveLength(result.module!.module.components[0]!.state.length);
    expect(comp.memos).toHaveLength(result.module!.module.components[0]!.memos.length);
  });

  it("handles empty raw expression without crashing", () => {
    const json = JSON.stringify({
      version: 1,
      fileName: "test.ink.tsx",
      components: [
        {
          kind: "Component",
          id: "test",
          name: "Test",
          state: [
            {
              name: "val",
              setterName: "setVal",
              initial: {
                kind: "Expression",
                raw: "",
                deps: [],
                isReactive: false,
                emissionContext: "setup",
                isDynamic: false,
                loc: { file: "", line: 1, column: 1, offset: 0, length: 0 },
              },
              symbolId: "t::signal::val@0",
              setterSymbolId: "t::signal::setVal@10",
              loc: { file: "", line: 1, column: 1, offset: 0, length: 0 },
            },
          ],
          props: [],
          slots: [],
          events: [],
          refs: [],
          memos: [],
          effects: [],
          resources: [],
          provides: [],
          consumes: [],
          lifecycle: { onMount: [], onCleanup: [] },
          setup: [],
          render: {
            kind: "Text",
            value: "hi",
            loc: { file: "", line: 1, column: 1, offset: 0, length: 0 },
          },
          primitives: [],
          styles: [],
          runtime: "iso",
          targetOverrides: {},
        },
      ],
    });
    expect(() => deserializeModule(json)).not.toThrow();
  });
});
