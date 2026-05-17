import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { parseAttributes } from "./attributes.ts";

function parseJsxAttrs(jsxCode: string) {
  const source = `const el = ${jsxCode};`;
  const sf = ts.createSourceFile("t.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const varStmt = sf.statements[0] as ts.VariableStatement;
  const init = varStmt.declarationList.declarations[0]!.initializer!;

  let attributes: ts.JsxAttributes;
  if (ts.isJsxSelfClosingElement(init)) {
    attributes = init.attributes;
  } else if (ts.isJsxElement(init)) {
    attributes = init.openingElement.attributes;
  } else {
    throw new Error(`Unexpected node kind: ${init.kind}`);
  }
  return parseAttributes(attributes, sf);
}

describe("parseAttributes", () => {
  describe("refs", () => {
    it("ref={myRef} produces IRRefBinding with category element", () => {
      const { refs, attrs, events } = parseJsxAttrs("<div ref={myRef} />");
      expect(refs).toHaveLength(1);
      expect(refs[0]!.category).toBe("element");
      expect(refs[0]!.ref.kind).toBe("Expression");
      expect(attrs).toHaveLength(0);
      expect(events).toHaveLength(0);
    });

    it("ref without expression initializer is ignored", () => {
      const { refs } = parseJsxAttrs('<div ref="" />');
      expect(refs).toHaveLength(0);
    });
  });

  describe("events", () => {
    it("onClick={handler} produces IREventBinding", () => {
      const { events, attrs, refs } = parseJsxAttrs("<div onClick={handler} />");
      expect(events).toHaveLength(1);
      expect(events[0]!.name).toBe("onClick");
      expect(events[0]!.handler.kind).toBe("Expression");
      expect(attrs).toHaveLength(0);
      expect(refs).toHaveLength(0);
    });

    it("onMouseDown={fn} produces IREventBinding with correct name", () => {
      const { events } = parseJsxAttrs("<div onMouseDown={fn} />");
      expect(events).toHaveLength(1);
      expect(events[0]!.name).toBe("onMouseDown");
    });

    it("lowercase onclick treated as normal attribute", () => {
      const { events, attrs } = parseJsxAttrs("<div onclick={fn} />");
      expect(events).toHaveLength(0);
      expect(attrs).toHaveLength(1);
      expect(attrs[0]!.name).toBe("onclick");
    });

    it("on (two chars) treated as normal attribute", () => {
      const { events, attrs } = parseJsxAttrs("<div on={fn} />");
      expect(events).toHaveLength(0);
      expect(attrs).toHaveLength(1);
      expect(attrs[0]!.name).toBe("on");
    });
  });

  describe("two-way binding", () => {
    it("$bind:value={val} produces twoWay binding", () => {
      const { attrs } = parseJsxAttrs("<input $bind:value={val} />");
      expect(attrs).toHaveLength(1);
      expect(attrs[0]!.binding).toBe("twoWay");
      expect(attrs[0]!.name).toBe("value");
    });
  });

  describe("class and style bindings", () => {
    it("class={expr} produces class binding", () => {
      const { attrs } = parseJsxAttrs("<div class={cls} />");
      expect(attrs).toHaveLength(1);
      expect(attrs[0]!.binding).toBe("class");
    });

    it("className={expr} produces class binding", () => {
      const { attrs } = parseJsxAttrs("<div className={cls} />");
      expect(attrs).toHaveLength(1);
      expect(attrs[0]!.binding).toBe("class");
    });

    it("style={expr} produces style binding", () => {
      const { attrs } = parseJsxAttrs("<div style={s} />");
      expect(attrs).toHaveLength(1);
      expect(attrs[0]!.binding).toBe("style");
    });
  });

  describe("static values", () => {
    it("boolean attribute (no initializer) produces Static true", () => {
      const { attrs } = parseJsxAttrs("<input disabled />");
      expect(attrs).toHaveLength(1);
      expect(attrs[0]!.value.kind).toBe("Static");
      expect((attrs[0]!.value as { value: unknown }).value).toBe(true);
    });

    it('string literal id="foo" produces Static string', () => {
      const { attrs } = parseJsxAttrs('<div id="foo" />');
      expect(attrs).toHaveLength(1);
      expect(attrs[0]!.value.kind).toBe("Static");
      expect((attrs[0]!.value as { value: unknown }).value).toBe("foo");
    });
  });

  describe("expression values", () => {
    it("expression attribute count={count()} produces Expression", () => {
      const { attrs } = parseJsxAttrs("<div count={count()} />");
      expect(attrs).toHaveLength(1);
      expect(attrs[0]!.value.kind).toBe("Expression");
    });
  });

  describe("spread attributes", () => {
    it("spread attribute is skipped without crash", () => {
      const { attrs, events, refs } = parseJsxAttrs("<div {...props} />");
      expect(attrs).toHaveLength(0);
      expect(events).toHaveLength(0);
      expect(refs).toHaveLength(0);
    });

    it("spread mixed with regular attrs preserves regular attrs", () => {
      const { attrs } = parseJsxAttrs('<div {...props} id="x" />');
      expect(attrs).toHaveLength(1);
      expect(attrs[0]!.name).toBe("id");
    });
  });

  describe("multiple attributes", () => {
    it("parses mixed attrs, events, and refs together", () => {
      const { attrs, events, refs } = parseJsxAttrs(
        '<input id="name" onClick={fn} ref={r} disabled />',
      );
      expect(attrs).toHaveLength(2);
      expect(events).toHaveLength(1);
      expect(refs).toHaveLength(1);
    });
  });
});
