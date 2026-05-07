import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import type {
  IRComponentInstance,
  IRElement,
  IRExpressionNode,
  IRFor,
  IRFragment,
  IRIf,
  IRNode,
  IRSlotPlaceholder,
  IRSwitch,
  IRText,
} from "../ir/nodes.ts";
import type { Diagnostic } from "../ir/types.ts";
import { ReactiveScope } from "../scope.ts";

import { parseJSXExpression, type JSXParseContext } from "./jsx.ts";
import { createSingleFileProgram } from "./program.ts";

interface Bundle {
  sourceFile: ts.SourceFile;
  ctx: JSXParseContext;
  diagnostics: Diagnostic[];
}

/** Compile a snippet `const out = <JSX/>` and locate the JSX expression. */
function loadJsx(jsx: string, prelude = ""): Bundle {
  const source = `${prelude}\nconst out = ${jsx};`;
  const { sourceFile, checker } = createSingleFileProgram({
    fileName: "/x.ink.tsx",
    source,
  });
  const diagnostics: Diagnostic[] = [];
  return {
    sourceFile,
    diagnostics,
    ctx: { scope: new ReactiveScope(), checker, sourceFile, diagnostics },
  };
}

function findOut(sourceFile: ts.SourceFile): ts.Expression {
  let found: ts.Expression | undefined;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "out" &&
      node.initializer
    ) {
      found = node.initializer;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (!found) throw new Error("'out' declaration not found");
  return found;
}

function parse(jsx: string, prelude = ""): { node: IRNode; diagnostics: Diagnostic[] } {
  const b = loadJsx(jsx, prelude);
  const expr = findOut(b.sourceFile);
  return { node: parseJSXExpression(expr, b.ctx), diagnostics: b.diagnostics };
}

describe("parseJSXExpression — DOM elements", () => {
  it("parses a self-closing element with no attrs as an Element", () => {
    const { node } = parse(`<div/>`);
    expect(node.kind).toBe("Element");
    expect((node as IRElement).tag).toBe("div");
  });

  it("parses an element with text children", () => {
    const { node } = parse(`<p>Hello</p>`);
    const el = node as IRElement;
    expect(el.tag).toBe("p");
    expect(el.children).toHaveLength(1);
    expect(el.children[0]?.kind).toBe("Text");
  });

  it("drops whitespace-only newline-bearing text between children", () => {
    const { node } = parse(`<div>\n  <span/>\n  <span/>\n</div>`);
    const el = node as IRElement;
    expect(el.children.every((c) => c.kind === "Element")).toBe(true);
    expect(el.children).toHaveLength(2);
  });

  it("parses an element with mixed text + expression children", () => {
    const { node } = parse(`<p>{count} items</p>`, `let count: number;`);
    const el = node as IRElement;
    expect(el.children.length).toBeGreaterThan(0);
  });

  it("treats lowercase tags as DOM elements (Fragment)", () => {
    const { node } = parse(`<></>`);
    expect(node.kind).toBe("Fragment");
  });

  it("unwraps a parenthesized JSX expression", () => {
    const { node } = parse(`(<div/>)`);
    expect(node.kind).toBe("Element");
  });
});

describe("parseJSXExpression — attributes", () => {
  it("parses a static string attribute", () => {
    const { node } = parse(`<div id="x" />`);
    const el = node as IRElement;
    expect(el.attrs[0]?.value.kind).toBe("Static");
  });

  it("parses an expression attribute and routes through extractDeps", () => {
    const { node } = parse(`<div title={x} />`, `let x: string;`);
    const el = node as IRElement;
    expect(el.attrs[0]?.value.kind).toBe("Expression");
  });

  it("treats boolean shorthand attributes as static `true`", () => {
    const { node } = parse(`<input disabled />`);
    const el = node as IRElement;
    const attr = el.attrs.find((a) => a.name === "disabled");
    if (!attr) throw new Error("disabled attribute not found");
    expect(attr.value.kind).toBe("Static");
    expect((attr.value as { value: unknown }).value).toBe(true);
  });

  it("classifies class attributes with the 'class' binding", () => {
    const { node } = parse(`<div class="x"/>`);
    expect((node as IRElement).attrs[0]?.binding).toBe("class");
  });

  it("classifies className attributes with the 'class' binding", () => {
    const { node } = parse(`<div className="x"/>`);
    expect((node as IRElement).attrs[0]?.binding).toBe("class");
  });

  it("classifies style attributes with the 'style' binding", () => {
    const { node } = parse(`<div style={{}} />`);
    expect((node as IRElement).attrs[0]?.binding).toBe("style");
  });

  it("recognises onClick and friends as events", () => {
    const { node } = parse(`<button onClick={h}/>`, `let h: (e: any) => void;`);
    const el = node as IRElement;
    expect(el.attrs).toEqual([]);
    expect(el.events.map((e) => e.name)).toEqual(["onClick"]);
  });

  it("recognises ref={...} as a ref binding", () => {
    const { node } = parse(`<input ref={r}/>`, `let r: any;`);
    const el = node as IRElement;
    expect(el.refs).toHaveLength(1);
  });

  it("ignores ref/event attributes with no initializer", () => {
    const { node } = parse(`<input ref onClick />`);
    const el = node as IRElement;
    // ref with no initializer is dropped; onClick with no initializer is also dropped.
    expect(el.refs).toEqual([]);
    expect(el.events).toEqual([]);
  });

  it("ignores attributes whose initializer is a JsxExpression with no expression", () => {
    const { node } = parse(`<div title={} />`);
    const el = node as IRElement;
    // title falls through to a static-true placeholder when there's no expression.
    expect(el.attrs).toHaveLength(1);
    expect(el.attrs[0]?.value.kind).toBe("Static");
  });

  it("classifies $bind:value as twoWay and synthesises an onInput handler", () => {
    const { node } = parse(`<input $bind:value={setName}/>`, `let setName: (v: string) => void;`);
    const el = node as IRElement;
    const attr = el.attrs.find((a) => a.name === "value");
    expect(attr?.binding).toBe("twoWay");
    expect(el.events.map((e) => e.name)).toEqual(["onInput"]);
  });

  it("uses onChange for $bind:value on a <select>", () => {
    const { node } = parse(`<select $bind:value={setSel}/>`, `let setSel: (v: string) => void;`);
    const el = node as IRElement;
    expect(el.events.map((e) => e.name)).toEqual(["onChange"]);
  });

  it("uses onInput for $bind:value on a <textarea>", () => {
    const { node } = parse(`<textarea $bind:value={setBio}/>`, `let setBio: (v: string) => void;`);
    const el = node as IRElement;
    expect(el.events.map((e) => e.name)).toEqual(["onInput"]);
  });

  it("does NOT synthesise an event for $bind on a non-form element", () => {
    const { node } = parse(`<div $bind:value={x}/>`, `let x: any;`);
    const el = node as IRElement;
    expect(el.events).toEqual([]);
  });

  it("preserves namespaced (non-bind) attribute names verbatim", () => {
    const { node } = parse(`<svg xlink:href="#x"/>`);
    const el = node as IRElement;
    expect(el.attrs[0]?.name).toBe("xlink:href");
  });
});

describe("parseJSXExpression — components", () => {
  it("parses a component instance with default-slot children", () => {
    const { node } = parse(`<MyButton>Click</MyButton>`);
    const ci = node as IRComponentInstance;
    expect(ci.kind).toBe("ComponentInstance");
    expect(ci.slots).toHaveLength(1);
    expect(ci.slots[0]?.name).toBe("default");
  });

  it("treats Foo.Bar as a component reference", () => {
    const { node } = parse(`<Foo.Bar />`);
    expect(node.kind).toBe("ComponentInstance");
    expect(ts.isPropertyAccessExpression((node as IRComponentInstance).reference)).toBe(true);
  });

  it("lifts JSX-valued attributes into named slots", () => {
    const { node } = parse(`<Card header={<h1>T</h1>}>body</Card>`);
    const ci = node as IRComponentInstance;
    expect(ci.slots.find((s) => s.name === "header")).toBeDefined();
    expect(ci.slots.find((s) => s.name === "default")).toBeDefined();
    expect(ci.attrs.find((a) => a.name === "header")).toBeUndefined();
  });

  it("lifts parenthesised JSX-valued attributes into named slots", () => {
    const { node } = parse(`<Card header={(<h1>T</h1>)}>body</Card>`);
    const ci = node as IRComponentInstance;
    expect(ci.slots.find((s) => s.name === "header")).toBeDefined();
  });

  it("wraps multiple children of a default slot into a Fragment", () => {
    const { node } = parse(`<Card><span/><span/></Card>`);
    const ci = node as IRComponentInstance;
    const def = ci.slots.find((s) => s.name === "default");
    expect(def).toBeDefined();
    expect(def?.body.kind).toBe("Fragment");
  });

  it("preserves a single default slot child as-is", () => {
    const { node } = parse(`<Card><span/></Card>`);
    const ci = node as IRComponentInstance;
    const def = ci.slots.find((s) => s.name === "default");
    expect(def?.body.kind).toBe("Element");
  });
});

describe("parseJSXExpression — control flow lowering", () => {
  it("lowers a ternary embedded in JSX to IRIf", () => {
    const { node } = parse(`<div>{cond ? <a/> : <b/>}</div>`, `let cond: boolean;`);
    const el = node as IRElement;
    const child = el.children[0] as IRIf;
    expect(child.kind).toBe("If");
    expect(child.branches).toHaveLength(1);
    expect(child.fallback).toBeDefined();
  });

  it("lowers a short-circuit `cond && jsx` to IRIf with no fallback", () => {
    const { node } = parse(`<div>{cond && <a/>}</div>`, `let cond: boolean;`);
    const el = node as IRElement;
    const child = el.children[0] as IRIf;
    expect(child.kind).toBe("If");
    expect(child.fallback).toBeUndefined();
  });

  it("does NOT lower a ternary whose both branches are non-JSX", () => {
    const { node } = parse(
      `<div>{cond ? a : b}</div>`,
      `let cond: boolean; let a: string; let b: string;`,
    );
    const el = node as IRElement;
    expect(el.children[0]?.kind).toBe("Expression");
  });

  it("does NOT lower a short-circuit whose RHS is not JSX", () => {
    const { node } = parse(`<div>{cond && msg}</div>`, `let cond: boolean; let msg: string;`);
    const el = node as IRElement;
    expect(el.children[0]?.kind).toBe("Expression");
  });

  it("lowers `items.map(item => <Foo key={item.id}/>)` to IRFor", () => {
    const { node } = parse(
      `<div>{items.map(item => <Foo key={item.id}/>)}</div>`,
      `let items: Array<{ id: number }>;`,
    );
    const el = node as IRElement;
    const child = el.children[0] as IRFor;
    expect(child.kind).toBe("For");
    expect(child.itemBinding).toBe("item");
    expect(child.indexBinding).toBeUndefined();
  });

  it("captures an indexBinding when .map's callback has two params", () => {
    const { node } = parse(
      `<div>{items.map((item, i) => <Foo key={i}/>)}</div>`,
      `let items: number[];`,
    );
    const el = node as IRElement;
    const child = el.children[0] as IRFor;
    expect(child.indexBinding).toBe("i");
  });

  it("does NOT lower .map when the callback returns non-JSX", () => {
    const { node } = parse(
      `<div>{items.map(item => item.toString())}</div>`,
      `let items: number[];`,
    );
    const el = node as IRElement;
    expect(el.children[0]?.kind).toBe("Expression");
  });

  it("does NOT lower .map without a key prop and emits INK0050", () => {
    const { node, diagnostics } = parse(
      `<div>{items.map(item => <Foo/>)}</div>`,
      `let items: number[];`,
    );
    const el = node as IRElement;
    expect(el.children[0]?.kind).toBe("Expression");
    expect(diagnostics.find((d) => d.code === "INK0050")).toBeDefined();
  });

  it("returns a generic Expression node for non-JSX-returning .map calls (defensive)", () => {
    const { node } = parse(`<div>{items.map(() => null as any)}</div>`, `let items: number[];`);
    const el = node as IRElement;
    expect(el.children[0]?.kind).toBe("Expression");
  });

  it("does NOT lower .map without an arrow argument", () => {
    const { node } = parse(`<div>{items.map(fn)}</div>`, `let items: number[]; let fn: any;`);
    const el = node as IRElement;
    expect(el.children[0]?.kind).toBe("Expression");
  });

  it("returns body via `return` statement inside a block-bodied .map callback", () => {
    const { node } = parse(
      `<div>{items.map(item => { return <Foo key={item}/>; })}</div>`,
      `let items: number[];`,
    );
    const el = node as IRElement;
    expect(el.children[0]?.kind).toBe("For");
  });
});

describe("parseJSXExpression — Show / For / Switch components", () => {
  it("lowers <Show when={x}>body</Show> to IRIf", () => {
    const { node } = parse(`<Show when={ok}><a/></Show>`, `let ok: boolean;`);
    expect(node.kind).toBe("If");
  });

  it("lowers <Show when fallback> to IRIf with fallback", () => {
    const { node } = parse(`<Show when={ok} fallback={<b/>}><a/></Show>`, `let ok: boolean;`);
    const ifNode = node as IRIf;
    expect(ifNode.fallback).toBeDefined();
  });

  it("lowers <Show> with no `when` to IRIf with a true test", () => {
    const { node } = parse(`<Show><a/></Show>`);
    expect(node.kind).toBe("If");
  });

  it("lowers <For each={items}>{(item) => <Foo key={item}/>}</For> to IRFor", () => {
    const { node } = parse(
      `<For each={items}>{(item) => <Foo key={item}/>}</For>`,
      `let items: number[];`,
    );
    expect(node.kind).toBe("For");
  });

  it("lowers <For> with a block-bodied callback returning JSX", () => {
    const { node } = parse(
      `<For each={items}>{(item) => { return <Foo key={item}/>; }}</For>`,
      `let items: number[];`,
    );
    expect(node.kind).toBe("For");
  });

  it("emits INK0050 and falls back when <For> body has no key", () => {
    const { node, diagnostics } = parse(
      `<For each={items}>{(item) => <Foo/>}</For>`,
      `let items: number[];`,
    );
    expect(node.kind).toBe("For");
    expect(diagnostics.find((d) => d.code === "INK0050")).toBeDefined();
  });

  it("returns a null Expression when <For> has no `each` prop", () => {
    const { node } = parse(`<For>{(item) => <Foo key={item}/>}</For>`);
    expect(node.kind).toBe("Expression");
  });

  it("returns a null Expression when <For> has no callback child", () => {
    const { node } = parse(`<For each={items}/>`, `let items: number[];`);
    expect(node.kind).toBe("Expression");
  });

  it("lowers <Switch fallback={<D/>}>{<Match when={a}>...</Match>}</Switch>", () => {
    const { node } = parse(
      `<Switch fallback={<d/>}><Match when={a}><e/></Match></Switch>`,
      `let a: boolean;`,
    );
    const sw = node as IRSwitch;
    expect(sw.kind).toBe("Switch");
    expect(sw.cases).toHaveLength(1);
    expect(sw.fallback).toBeDefined();
  });

  it("ignores <Match> children with no `when` prop (false test)", () => {
    const { node } = parse(`<Switch><Match><e/></Match></Switch>`);
    const sw = node as IRSwitch;
    expect(sw.cases).toHaveLength(1);
  });

  it("ignores non-Match children inside <Switch>", () => {
    const { node } = parse(
      `<Switch><span/><Match when={a}><e/></Match></Switch>`,
      `let a: boolean;`,
    );
    const sw = node as IRSwitch;
    expect(sw.cases).toHaveLength(1);
  });
});

describe("parseJSXExpression — slot placeholders", () => {
  it("does not produce a SlotPlaceholder when no slotsSymbol is set", () => {
    const { sourceFile, ctx } = loadJsx(`<div>{slots.default()}</div>`, `let slots: any;`);
    const expr = findOut(sourceFile);
    const node = parseJSXExpression(expr, ctx) as IRElement;
    expect(node.children[0]?.kind).toBe("Expression");
  });

  it("lowers `slots.<name>(...)` to IRSlotPlaceholder when slotsSymbol matches", () => {
    const source = `
      function setup(props: any, slots: { default: () => any; header: (s: { count: number }) => any }) {
        const out = <div>{slots.default()}{slots.header({ count: 1 })}</div>;
        return out;
      }
    `;
    const { sourceFile, checker } = createSingleFileProgram({ fileName: "/x.ink.tsx", source });
    // Locate slots parameter symbol.
    let slotsSym: ts.Symbol | undefined;
    let outExpr: ts.Expression | undefined;
    const visit = (node: ts.Node): void => {
      if (slotsSym && outExpr) return;
      if (ts.isParameter(node) && ts.isIdentifier(node.name) && node.name.text === "slots") {
        slotsSym = checker.getSymbolAtLocation(node.name);
      }
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.name.text === "out" &&
        node.initializer
      ) {
        outExpr = node.initializer;
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    if (!slotsSym || !outExpr) throw new Error("setup not found");
    const ctx: JSXParseContext = {
      scope: new ReactiveScope(),
      checker,
      sourceFile,
      slotsSymbol: slotsSym,
      diagnostics: [],
    };
    const ir = parseJSXExpression(outExpr, ctx) as IRElement;
    const placeholders = ir.children.filter(
      (c) => c.kind === "SlotPlaceholder",
    ) as IRSlotPlaceholder[];
    expect(placeholders).toHaveLength(2);
    expect(placeholders[0]?.name).toBe("default");
    expect(placeholders[1]?.name).toBe("header");
    expect(placeholders[1]?.scopedArgs).toHaveLength(1);
  });

  it("does not lower a slots.<name>() call when the slots symbol does not match", () => {
    const source = `
      function setup(props: any, slots: { default: () => any }) {
        const localSlots = slots;
        const out = <div>{localSlots.default()}</div>;
        return out;
      }
    `;
    const { sourceFile, checker } = createSingleFileProgram({ fileName: "/x.ink.tsx", source });
    let slotsSym: ts.Symbol | undefined;
    let outExpr: ts.Expression | undefined;
    const visit = (node: ts.Node): void => {
      if (slotsSym && outExpr) return;
      if (ts.isParameter(node) && ts.isIdentifier(node.name) && node.name.text === "slots") {
        slotsSym = checker.getSymbolAtLocation(node.name);
      }
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.name.text === "out" &&
        node.initializer
      ) {
        outExpr = node.initializer;
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    if (!slotsSym || !outExpr) throw new Error("not found");
    const ctx: JSXParseContext = {
      scope: new ReactiveScope(),
      checker,
      sourceFile,
      slotsSymbol: slotsSym,
      diagnostics: [],
    };
    const ir = parseJSXExpression(outExpr, ctx) as IRElement;
    expect(ir.children[0]?.kind).toBe("Expression");
  });
});

describe("parseJSXExpression — diagnostics sink", () => {
  it("does not crash when diagnostics is undefined and INK0050 would fire", () => {
    const source = `
      let items: number[];
      const out = <div>{items.map(item => <Foo/>)}</div>;
    `;
    const { sourceFile, checker } = createSingleFileProgram({ fileName: "/x.ink.tsx", source });
    const ctx: JSXParseContext = { scope: new ReactiveScope(), checker, sourceFile };
    const expr = findOut(sourceFile);
    expect(() => parseJSXExpression(expr, ctx)).not.toThrow();
  });
});

describe("parseJSXExpression — fragments", () => {
  it("parses an empty fragment", () => {
    const { node } = parse(`<></>`);
    expect(node.kind).toBe("Fragment");
    expect((node as IRFragment).children).toEqual([]);
  });

  it("parses a fragment with mixed children", () => {
    const { node } = parse(`<><span/>{a}</>`, `let a: number;`);
    expect(node.kind).toBe("Fragment");
    expect((node as IRFragment).children).toHaveLength(2);
  });

  it("preserves a JsxText child that is not whitespace-only", () => {
    const { node } = parse(`<><div>hi</div></>`);
    const fragment = node as IRFragment;
    const inner = fragment.children[0] as IRElement;
    expect(inner.children).toHaveLength(1);
    expect((inner.children[0] as IRText).value).toBe("hi");
  });
});

describe("parseJSXExpression — top-level expressions", () => {
  it("returns an IRExpressionNode for a non-JSX top-level expression", () => {
    const { node } = parse(`x`, `let x: number;`);
    expect(node.kind).toBe("Expression");
    expect((node as IRExpressionNode).emissionContext).toBe("template");
  });
});
