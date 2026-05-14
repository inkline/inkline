import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { createElement, createExpr } from "../../../ir/render/builders.ts";
import type { IRComponent, IRElement, IREventBinding } from "../../../ir/render/nodes.ts";
import { events } from "./events.ts";

function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function makeComp(render: IRElement): IRComponent {
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
    styles: [],
    runtime: "iso",
    targetOverrides: {},
  };
}

describe("events", () => {
  it("extracts param types from arrow function handler", () => {
    const handler = createExpr({ expr: mockExpr("(e: MouseEvent) => handle(e)") });
    const el = createElement({
      tag: "button",
      events: [{ name: "onClick", handler, loc: UNKNOWN_LOCATION }],
    });
    const result = events(makeComp(el));
    const evts = (result.render as IRElement).events;
    expect(evts[0]!.paramTypes).toBeDefined();
    expect(evts[0]!.paramTypes).toHaveLength(1);
  });

  it("leaves paramTypes undefined for identifier handler", () => {
    const handler = createExpr({ expr: mockExpr("handleClick") });
    const el = createElement({
      tag: "button",
      events: [{ name: "onClick", handler, loc: UNKNOWN_LOCATION }],
    });
    const result = events(makeComp(el));
    const evts = (result.render as IRElement).events;
    expect(evts[0]!.paramTypes).toBeUndefined();
  });

  it("preserves existing paramTypes", () => {
    const handler = createExpr({ expr: mockExpr("(e: MouseEvent) => e") });
    const existing: readonly (ts.TypeNode | undefined)[] = [];
    const ev: IREventBinding = {
      name: "onClick",
      handler,
      paramTypes: existing,
      loc: UNKNOWN_LOCATION,
    };
    const el = createElement({ tag: "button", events: [ev] });
    const result = events(makeComp(el));
    const evts = (result.render as IRElement).events;
    expect(evts[0]!.paramTypes).toBe(existing);
  });

  it("returns same component when no events", () => {
    const el = createElement({ tag: "div" });
    const comp = makeComp(el);
    const result = events(comp);
    expect(result).toBe(comp);
  });
});
