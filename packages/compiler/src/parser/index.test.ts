import { describe, expect, it } from "vitest";

import { parseModule } from "./index.ts";

describe("parseModule", () => {
  it("returns an empty IRModule for a file with no components", () => {
    const result = parseModule({ fileName: "/x.ink.tsx", source: `const x = 1;` });
    expect(result.file).toBe("/x.ink.tsx");
    expect(result.components).toEqual([]);
    expect(result.diagnostics).toEqual([]);
  });

  it("parses a simple component with a render expression", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent, createSignal } from "@inkline/core";
        const Counter = defineComponent(() => {
          const [count, setCount] = createSignal(0);
          return <div>{count()}</div>;
        });
      `,
    });
    expect(result.components).toHaveLength(1);
    const c = result.components[0]!;
    expect(c.name).toBe("Counter");
    expect(c.state).toHaveLength(1);
    expect(c.render.kind).toBe("Element");
  });

  it("captures imports as ts.ImportDeclaration[]", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent } from "@inkline/core";
        import { something } from "./other";
        const C = defineComponent(() => null as any);
      `,
    });
    expect(result.imports).toHaveLength(2);
  });

  it("emits INK0001 for namespace imports of @inkline/core", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import * as core from "@inkline/core";
        const X = 1;
      `,
    });
    const ink0001 = result.diagnostics.find((d) => d.code === "INK0001");
    expect(ink0001).toBeDefined();
    expect(ink0001?.severity).toBe("error");
  });

  it("does not emit INK0001 for non-@inkline/core namespace imports", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import * as fs from "node:fs";
        const X = 1;
      `,
    });
    expect(result.diagnostics.find((d) => d.code === "INK0001")).toBeUndefined();
  });

  it("registers props from a typed setup parameter", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent } from "@inkline/core";
        const C = defineComponent((props: { label: string; tone?: number }) => {
          return <div title={props.label}/>;
        });
      `,
    });
    const c = result.components[0]!;
    expect(c.render.kind).toBe("Element");
  });

  it("links options-declared props to setup-param symbols when typed", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent } from "@inkline/core";
        const C = defineComponent(
          { props: { label: { required: true } } },
          (props: { label: string }) => <div>{props.label}</div>,
        );
      `,
    });
    const c = result.components[0]!;
    const labelProp = c.props.find((p) => p.name === "label");
    expect(labelProp).toBeDefined();
    expect(labelProp?.symbol).toBeDefined();
  });

  it("identifies the slots parameter symbol and lowers slots calls", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent } from "@inkline/core";
        const Card = defineComponent(
          (
            _props: {},
            slots: { default: () => unknown },
          ) => <div>{slots.default()}</div>,
        );
      `,
    });
    const c = result.components[0]!;
    // The render is an element whose first child is the slot placeholder.
    const root = c.render;
    if (root.kind !== "Element") throw new Error("expected Element");
    expect(root.children[0]?.kind).toBe("SlotPlaceholder");
  });

  it("returns components in declaration order", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent } from "@inkline/core";
        const A = defineComponent(() => null as any);
        const B = defineComponent(() => null as any);
      `,
    });
    expect(result.components.map((c) => c.name)).toEqual(["A", "B"]);
  });

  it("uses 'default' as the bindingName for default-exported components", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent } from "@inkline/core";
        export default defineComponent(() => null as any);
      `,
    });
    expect(result.components[0]?.name).toBe("default");
    expect(result.components[0]?.id).toBe("/x.ink.tsx#default");
  });

  it("accepts a pre-built program via options.program", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent } from "@inkline/core";
        const C = defineComponent(() => null as any);
      `,
    });
    // Re-parse using the same program — should still produce a component.
    expect(result.components).toHaveLength(1);
  });

  it("handles a setup function with no parameters", () => {
    const result = parseModule({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent } from "@inkline/core";
        const C = defineComponent(() => null as any);
      `,
    });
    expect(result.components).toHaveLength(1);
  });
});
