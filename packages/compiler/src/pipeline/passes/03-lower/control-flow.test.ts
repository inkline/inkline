import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { createComponentInstance, createExpr, createText } from "../../../ir/render/builders.ts";
import type {
  IRComponent,
  IRComponentInstance,
  IRFor,
  IRIf,
  IRSwitch,
} from "../../../ir/render/nodes.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { controlFlow } from "./control-flow.ts";

function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.tsx", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function ident(name: string): ts.Identifier {
  const sf = ts.createSourceFile("t.ts", name, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression as ts.Identifier;
}

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

function makeComp(render: IRComponentInstance): IRComponent {
  return {
    kind: "Component",
    id: "t#T",
    name: "T",
    loc: UNKNOWN_LOCATION,
    props: [],
    slots: [],
    events: [],
    state: [],
    refs: [],
    memos: [],
    effects: [],
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render,
    primitives: [],
    targetOverrides: {},
  };
}

describe("controlFlow", () => {
  describe("Show lowering", () => {
    it("lowers <Show when={...}> to IRIf", () => {
      const ci = createComponentInstance({
        reference: ident("Show"),
        attrs: [
          {
            name: "when",
            value: createExpr({ expr: mockExpr("visible") }),
            binding: "normal",
            loc: UNKNOWN_LOCATION,
          },
        ],
        slots: [
          {
            name: "default",
            body: createText({ value: "content" }),
            scopedParams: [],
            loc: UNKNOWN_LOCATION,
          },
        ],
      });
      const ctx = makeCtx();
      const result = controlFlow(makeComp(ci), ctx);
      expect(result.render.kind).toBe("If");
      const ifNode = result.render as IRIf;
      expect(ifNode.branches).toHaveLength(1);
      expect(ifNode.branches[0]!.body.kind).toBe("Text");
    });

    it("includes fallback slot as IRIf fallback", () => {
      const ci = createComponentInstance({
        reference: ident("Show"),
        attrs: [
          {
            name: "when",
            value: createExpr({ expr: mockExpr("visible") }),
            binding: "normal",
            loc: UNKNOWN_LOCATION,
          },
        ],
        slots: [
          {
            name: "default",
            body: createText({ value: "yes" }),
            scopedParams: [],
            loc: UNKNOWN_LOCATION,
          },
          {
            name: "fallback",
            body: createText({ value: "no" }),
            scopedParams: [],
            loc: UNKNOWN_LOCATION,
          },
        ],
      });
      const ctx = makeCtx();
      const result = controlFlow(makeComp(ci), ctx);
      const ifNode = result.render as IRIf;
      expect(ifNode.fallback).toBeDefined();
      expect(ifNode.fallback!.kind).toBe("Text");
    });

    it("pushes INK0060 when Show has no when prop", () => {
      const ci = createComponentInstance({
        reference: ident("Show"),
        slots: [
          {
            name: "default",
            body: createText({ value: "x" }),
            scopedParams: [],
            loc: UNKNOWN_LOCATION,
          },
        ],
      });
      const ctx = makeCtx();
      controlFlow(makeComp(ci), ctx);
      const diags = ctx.diagnostics.freeze();
      expect(diags).toHaveLength(1);
      expect(diags[0]!.code).toBe("INK0060");
    });
  });

  describe("For lowering", () => {
    it("lowers <For each={...}> to IRFor", () => {
      const ci = createComponentInstance({
        reference: ident("For"),
        attrs: [
          {
            name: "each",
            value: createExpr({ expr: mockExpr("items()") }),
            binding: "normal",
            loc: UNKNOWN_LOCATION,
          },
          {
            name: "key",
            value: createExpr({ expr: mockExpr("item.id") }),
            binding: "normal",
            loc: UNKNOWN_LOCATION,
          },
        ],
        slots: [
          {
            name: "default",
            body: createText({ value: "item" }),
            scopedParams: ["item", "index"],
            loc: UNKNOWN_LOCATION,
          },
        ],
      });
      const ctx = makeCtx();
      const result = controlFlow(makeComp(ci), ctx);
      expect(result.render.kind).toBe("For");
      const forNode = result.render as IRFor;
      expect(forNode.itemBinding).toBe("item");
      expect(forNode.indexBinding).toBe("index");
      expect(forNode.syntheticKey).toBe(false);
    });

    it("synthesizes key when missing", () => {
      const ci = createComponentInstance({
        reference: ident("For"),
        attrs: [
          {
            name: "each",
            value: createExpr({ expr: mockExpr("items()") }),
            binding: "normal",
            loc: UNKNOWN_LOCATION,
          },
        ],
        slots: [
          {
            name: "default",
            body: createText({ value: "item" }),
            scopedParams: ["item"],
            loc: UNKNOWN_LOCATION,
          },
        ],
      });
      const ctx = makeCtx();
      const result = controlFlow(makeComp(ci), ctx);
      const forNode = result.render as IRFor;
      expect(forNode.syntheticKey).toBe(true);
    });

    it("pushes INK0062 when For has no each prop", () => {
      const ci = createComponentInstance({
        reference: ident("For"),
        slots: [
          {
            name: "default",
            body: createText({ value: "x" }),
            scopedParams: [],
            loc: UNKNOWN_LOCATION,
          },
        ],
      });
      const ctx = makeCtx();
      controlFlow(makeComp(ci), ctx);
      const diags = ctx.diagnostics.freeze();
      expect(diags).toHaveLength(1);
      expect(diags[0]!.code).toBe("INK0062");
    });
  });

  describe("Switch lowering", () => {
    it("lowers <Switch> with Match children to IRSwitch", () => {
      const matchCI = createComponentInstance({
        reference: ident("Match"),
        attrs: [
          {
            name: "when",
            value: createExpr({ expr: mockExpr("x === 1") }),
            binding: "normal",
            loc: UNKNOWN_LOCATION,
          },
        ],
        slots: [
          {
            name: "default",
            body: createText({ value: "case1" }),
            scopedParams: [],
            loc: UNKNOWN_LOCATION,
          },
        ],
      });
      const ci = createComponentInstance({
        reference: ident("Switch"),
        slots: [
          {
            name: "default",
            body: { kind: "Fragment", children: [matchCI], loc: UNKNOWN_LOCATION },
            scopedParams: [],
            loc: UNKNOWN_LOCATION,
          },
        ],
      });
      const ctx = makeCtx();
      const result = controlFlow(makeComp(ci), ctx);
      expect(result.render.kind).toBe("Switch");
      const sw = result.render as IRSwitch;
      expect(sw.cases).toHaveLength(1);
    });
  });

  describe("ternary lowering", () => {
    it("does not lower non-JSX ternary", () => {
      const expr = createExpr({ expr: mockExpr("cond ? 1 : 2") });
      const comp: IRComponent = {
        kind: "Component",
        id: "t#T",
        name: "T",
        loc: UNKNOWN_LOCATION,
        props: [],
        slots: [],
        events: [],
        state: [],
        refs: [],
        memos: [],
        effects: [],
        lifecycle: { onMount: [], onCleanup: [] },
        setup: [],
        render: expr,
        primitives: [],
        targetOverrides: {},
      };
      const ctx = makeCtx();
      const result = controlFlow(comp, ctx);
      expect(result.render.kind).toBe("Expression");
    });
  });
});
