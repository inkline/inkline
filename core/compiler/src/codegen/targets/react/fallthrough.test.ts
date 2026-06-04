import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { SymbolTable, type SymbolId } from "../../../ir/reactivity.ts";
import type { IRComponent, IRNode, IRProp, IRSlotDeclaration } from "../../../ir/render/nodes.ts";
import {
  createAttribute,
  createElement,
  createExpr,
  createStaticValue,
  createText,
} from "../../../ir/render/builders.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import type { CodegenContext } from "../../context.ts";
import { print } from "../../print/printer.ts";
import { react } from "./index.ts";

const loc = UNKNOWN_LOCATION;

function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function prop(name: string): IRProp {
  return { name, required: false, symbolId: `t::prop::${name}` as SymbolId, loc };
}

function defaultSlot(): IRSlotDeclaration {
  return { name: "default", isScoped: false, scopedProps: [], required: false, loc };
}

function makeComp(
  render: IRNode,
  opts: { props?: IRProp[]; slots?: IRSlotDeclaration[] } = {},
): IRComponent {
  return {
    kind: "Component",
    id: "t.tsx#C",
    name: "C",
    loc,
    props: opts.props ?? [],
    slots: opts.slots ?? [],
    events: [],
    state: [],
    refs: [],
    memos: [],
    effects: [],
    resources: [],
    provides: [],
    consumes: [],
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render,
    primitives: [],
    styles: [],
    runtime: "iso",
    targetOverrides: {},
  };
}

function makeCtx(): CodegenContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    rewrites: react.rewrites,
    contexts: [],
    externalImports: [],
    componentImports: [],
    typeDeclarations: [],
  };
}

function emit(comp: IRComponent): string {
  return print(react.emit(comp, makeCtx()).root).code;
}

describe("react attribute fallthrough", () => {
  it("merges an inherited className with a static root class", () => {
    const comp = makeComp(
      createElement({
        tag: "div",
        attrs: [
          createAttribute({
            name: "class",
            value: createStaticValue({ value: "badge" }),
            binding: "class",
          }),
        ],
        children: [createText({ value: "x" })],
        acceptsAttrFallthrough: true,
      }),
      { props: [prop("label")], slots: [defaultSlot()] },
    );
    const code = emit(comp);
    expect(code).toContain("const { children, label, ...__attrs } = props");
    expect(code).toContain(
      '<div {...__attrs} className={["badge", props.className].filter(Boolean).join(" ")}>',
    );
    expect(code).toContain("React.HTMLAttributes<HTMLElement>");
  });

  it("merges an inherited className with a dynamic root class", () => {
    const comp = makeComp(
      createElement({
        tag: "div",
        attrs: [
          createAttribute({
            name: "class",
            value: createExpr({ expr: mockExpr("badge(props)") }),
            binding: "class",
          }),
        ],
        acceptsAttrFallthrough: true,
      }),
    );
    const code = emit(comp);
    expect(code).toContain('className={[badge(props), props.className].filter(Boolean).join(" ")}');
  });

  it("forwards the inherited className when the root has no authored class", () => {
    const comp = makeComp(createElement({ tag: "div", acceptsAttrFallthrough: true }));
    const code = emit(comp);
    expect(code).toContain("const { ...__attrs } = props");
    expect(code).toContain("<div {...__attrs} className={props.className} />");
  });

  it("does not leak declared props onto the root element", () => {
    const comp = makeComp(createElement({ tag: "div", acceptsAttrFallthrough: true }), {
      props: [prop("label"), prop("disabled")],
    });
    const code = emit(comp);
    // label / disabled are peeled into the destructure, never spread onto <div>.
    expect(code).toContain("const { label, disabled, ...__attrs } = props");
    expect(code).not.toMatch(/<div[^>]*\blabel=/);
  });

  it("emits no fallthrough wiring when the root does not accept it", () => {
    const comp = makeComp(
      createElement({
        tag: "div",
        attrs: [
          createAttribute({
            name: "class",
            value: createStaticValue({ value: "badge" }),
            binding: "class",
          }),
        ],
      }),
    );
    const code = emit(comp);
    expect(code).toContain('className="badge"');
    expect(code).not.toContain("__attrs");
    expect(code).not.toContain("React.HTMLAttributes");
  });
});
