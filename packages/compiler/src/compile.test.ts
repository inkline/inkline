import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { compile } from "./compile.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadFixture(name: string): { fileName: string; source: string } {
  const fileName = join(__dirname, "__fixtures__", name);
  return { fileName, source: readFileSync(fileName, "utf-8") };
}

describe("compile — Counter fixture", () => {
  it("produces an IR module with one component, the right reactive shape, and no diagnostics", () => {
    const result = compile(loadFixture("Counter.ink.tsx"));
    expect(result.module.components).toHaveLength(1);
    const c = result.module.components[0]!;
    expect(c.state).toHaveLength(1);
    expect(c.state[0]?.name).toBe("count");
    expect(c.memos).toHaveLength(1);
    expect(c.memos[0]?.name).toBe("doubled");
    expect(c.effects).toHaveLength(1);
    // Effect deps include count.
    expect(c.effects[0]?.deps.map((d) => d.name)).toEqual(["count"]);
    // Memo deps include count.
    expect(c.memos[0]?.expr.deps.map((d) => d.name)).toEqual(["count"]);
    // Graph topo: count is a leaf signal; doubled depends on count.
    const graph = result.graphs.get(c.id)!;
    expect(graph.cycles).toEqual([]);
    expect(graph.topo).toContain(c.memos[0]?.symbol);
    // No diagnostics.
    expect(result.diagnostics).toEqual([]);
    // Render is an Element with three children (p, p, button).
    if (c.render.kind !== "Element") throw new Error("expected Element render");
    expect(c.render.tag).toBe("div");
    expect(c.render.children).toHaveLength(3);
  });
});

describe("compile — Button fixture", () => {
  it("captures props, events, signal-bound class, and click event", () => {
    const result = compile(loadFixture("Button.ink.tsx"));
    expect(result.module.components).toHaveLength(1);
    const c = result.module.components[0]!;
    expect(c.props.map((p) => p.name).sort((a, b) => a.localeCompare(b))).toEqual([
      "label",
      "tone",
    ]);
    expect(c.events.map((e) => e.name)).toEqual(["click"]);
    expect(c.state).toHaveLength(1);
    if (c.render.kind !== "Element") throw new Error("expected Element render");
    expect(c.render.tag).toBe("button");
    expect(c.render.events.map((e) => e.name)).toEqual(["onClick"]);
    // Class attribute lowered with the 'class' binding (ternary stays as expression).
    const classAttr = c.render.attrs.find((a) => a.name === "class");
    expect(classAttr?.binding).toBe("class");
  });
});

describe("compile — List fixture", () => {
  it("lowers items().map(item => <li key>) into IRFor", () => {
    const result = compile(loadFixture("List.ink.tsx"));
    expect(result.module.components).toHaveLength(1);
    const c = result.module.components[0]!;
    if (c.render.kind !== "Element") throw new Error("expected Element render");
    const inner = c.render.children[0];
    expect(inner?.kind).toBe("For");
    if (inner?.kind === "For") {
      expect(inner.itemBinding).toBe("item");
      expect(inner.body.kind).toBe("Element");
    }
  });
});

describe("compile — Card fixture", () => {
  it("lowers slots.<name>() calls into SlotPlaceholder when slotsSymbol is set", () => {
    const result = compile(loadFixture("Card.ink.tsx"));
    expect(result.module.components).toHaveLength(1);
    const c = result.module.components[0]!;
    expect(c.slots.map((s) => s.name).sort((a, b) => a.localeCompare(b))).toEqual([
      "default",
      "footer",
      "header",
    ]);
    if (c.render.kind !== "Element") throw new Error("expected Element render");
    // Render contains: header && (slots.header() in div), the body div, footer && ...
    // After ternary lowering, the conditionals become IRIf nodes.
    const ifs = c.render.children.filter((ch) => ch.kind === "If");
    expect(ifs.length).toBeGreaterThanOrEqual(2);
  });
});

describe("compile — diagnostics aggregation", () => {
  it("includes parser diagnostics in result.diagnostics", () => {
    const result = compile({
      fileName: "/x.ink.tsx",
      source: `
        import * as core from "@inkline/core";
      `,
    });
    expect(result.diagnostics.find((d) => d.code === "INK0001")).toBeDefined();
  });

  it("converts a cyclic graph into INK0030 diagnostics via diagnoseCycles", async () => {
    const ts = await import("typescript");
    const { createComponentSkeleton, createExpression, createText } =
      await import("./ir/builders.ts");
    const { diagnoseCycles } = await import("./compile.ts");

    const stub = (name: string): import("typescript").Symbol =>
      ({ name, flags: 0, declarations: [] }) as unknown as import("typescript").Symbol;
    const m1 = stub("m1");
    const m2 = stub("m2");
    const skeleton = createComponentSkeleton({
      id: "x#X",
      name: "X",
      render: createText(""),
    });
    skeleton.memos.push({
      name: "m1",
      symbol: m1,
      expr: createExpression({
        expr: ts.factory.createIdentifier("m1"),
        resolution: {
          deps: [{ symbol: m2, kind: "memo", name: "m2", path: [], conditional: false }],
          isReactive: true,
          isDynamic: false,
        },
      }),
      loc: skeleton.loc,
    });
    skeleton.memos.push({
      name: "m2",
      symbol: m2,
      expr: createExpression({
        expr: ts.factory.createIdentifier("m2"),
        resolution: {
          deps: [{ symbol: m1, kind: "memo", name: "m1", path: [], conditional: false }],
          isReactive: true,
          isDynamic: false,
        },
      }),
      loc: skeleton.loc,
    });
    const graph = (await import("./analyze/graph.ts")).buildReactivityGraph(skeleton);
    expect(graph.cycles.length).toBeGreaterThan(0);
    const diags = diagnoseCycles(skeleton, graph);
    expect(diags).toHaveLength(graph.cycles.length);
    expect(diags[0]?.code).toBe("INK0030");
    expect(diags[0]?.message).toContain("m1");
    expect(diags[0]?.message).toContain("m2");
  });

  it("diagnoseCycles returns [] when there are no cycles", async () => {
    const { diagnoseCycles } = await import("./compile.ts");
    const { createComponentSkeleton, createText } = await import("./ir/builders.ts");
    const skel = createComponentSkeleton({ id: "x", name: "X", render: createText("") });
    expect(
      diagnoseCycles(skel, {
        dependents: new Map(),
        dependencies: new Map(),
        topo: [],
        cycles: [],
      }),
    ).toEqual([]);
  });

  it("uses the symbol name as fallback when a cycle includes a non-memo symbol", async () => {
    const ts = await import("typescript");
    const { createComponentSkeleton, createText } = await import("./ir/builders.ts");
    const { diagnoseCycles } = await import("./compile.ts");
    const stub = (name: string): import("typescript").Symbol =>
      ({ name, flags: 0, declarations: [] }) as unknown as import("typescript").Symbol;
    const orphan = stub("orphan");
    const skel = createComponentSkeleton({
      id: "x",
      name: "X",
      render: createText(""),
    });
    void ts;
    const diags = diagnoseCycles(skel, {
      dependents: new Map(),
      dependencies: new Map(),
      topo: [],
      cycles: [[orphan, orphan]],
    });
    expect(diags).toHaveLength(1);
    expect(diags[0]?.message).toContain("orphan");
  });

  it("returns INK0011 for a constant memo", () => {
    const result = compile({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent, createMemo } from "@inkline/core";
        const C = defineComponent(() => {
          const constant = createMemo(() => 42);
          return <div>{constant()}</div>;
        });
      `,
    });
    expect(result.diagnostics.find((d) => d.code === "INK0011")).toBeDefined();
  });

  it("returns INK0010 for a no-deps effect", () => {
    const result = compile({
      fileName: "/x.ink.tsx",
      source: `
        import { defineComponent, createEffect } from "@inkline/core";
        const C = defineComponent(() => {
          createEffect(() => { console.log("once"); });
          return <div/>;
        });
      `,
    });
    expect(result.diagnostics.find((d) => d.code === "INK0010")).toBeDefined();
  });
});

describe("compile — empty file", () => {
  it("returns an empty result for a file with no defineComponent calls", () => {
    const result = compile({ fileName: "/x.ink.tsx", source: `const x = 1;` });
    expect(result.module.components).toEqual([]);
    expect(result.graphs.size).toBe(0);
    expect(result.diagnostics).toEqual([]);
  });
});
