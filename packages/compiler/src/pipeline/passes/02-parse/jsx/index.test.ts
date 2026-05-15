import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { parseExpression } from "./index.ts";

function parse(jsxCode: string) {
  const sf = ts.createSourceFile("t.tsx", jsxCode, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const stmt = sf.statements[0] as ts.ExpressionStatement;
  return parseExpression(stmt.expression, sf);
}

describe("parseJsxElement", () => {
  it("lowercase tag produces Element", () => {
    const node = parse("<div />");
    expect(node.kind).toBe("Element");
    if (node.kind === "Element") {
      expect(node.tag).toBe("div");
    }
  });

  it("uppercase tag produces ComponentInstance", () => {
    const node = parse("<Button />");
    expect(node.kind).toBe("ComponentInstance");
  });

  it("property access tag treated as component", () => {
    const node = parse("<Ns.Component />");
    expect(node.kind).toBe("ComponentInstance");
  });

  it("self-closing element has no children", () => {
    const node = parse("<img />");
    expect(node.kind).toBe("Element");
    if (node.kind === "Element") {
      expect(node.children).toHaveLength(0);
    }
  });

  it("whitespace-only text nodes are trimmed", () => {
    const node = parse("<div>   </div>");
    expect(node.kind).toBe("Element");
    if (node.kind === "Element") {
      expect(node.children).toHaveLength(0);
    }
  });

  it("text content is preserved", () => {
    const node = parse("<p>hello</p>");
    expect(node.kind).toBe("Element");
    if (node.kind === "Element") {
      expect(node.children).toHaveLength(1);
      expect(node.children[0]!.kind).toBe("Text");
    }
  });

  it("expression child produces Expression node", () => {
    const node = parse("<p>{count()}</p>");
    expect(node.kind).toBe("Element");
    if (node.kind === "Element") {
      expect(node.children).toHaveLength(1);
      expect(node.children[0]!.kind).toBe("Expression");
    }
  });

  it("nested element is parsed recursively", () => {
    const node = parse("<div><span /></div>");
    expect(node.kind).toBe("Element");
    if (node.kind === "Element") {
      expect(node.children).toHaveLength(1);
      expect(node.children[0]!.kind).toBe("Element");
      if (node.children[0]!.kind === "Element") {
        expect(node.children[0]!.tag).toBe("span");
      }
    }
  });

  it("fragment produces Fragment", () => {
    const node = parse("<><span /><p /></>");
    expect(node.kind).toBe("Fragment");
    if (node.kind === "Fragment") {
      expect(node.children).toHaveLength(2);
    }
  });

  it("component with single child wraps in default slot (no Fragment)", () => {
    const node = parse("<Modal><p>content</p></Modal>");
    expect(node.kind).toBe("ComponentInstance");
    if (node.kind === "ComponentInstance") {
      expect(node.slots).toHaveLength(1);
      expect(node.slots[0]!.name).toBe("default");
      expect(node.slots[0]!.body.kind).toBe("Element");
    }
  });

  it("component with multiple children wraps in Fragment slot", () => {
    const node = parse("<Modal><p>a</p><p>b</p></Modal>");
    expect(node.kind).toBe("ComponentInstance");
    if (node.kind === "ComponentInstance") {
      expect(node.slots).toHaveLength(1);
      expect(node.slots[0]!.name).toBe("default");
      expect(node.slots[0]!.body.kind).toBe("Fragment");
    }
  });

  it("element attributes are parsed", () => {
    const node = parse('<div id="foo" onClick={fn} />');
    expect(node.kind).toBe("Element");
    if (node.kind === "Element") {
      expect(node.attrs).toHaveLength(1);
      expect(node.events).toHaveLength(1);
    }
  });
});

describe("parseExpression", () => {
  it("parenthesized expression unwraps", () => {
    const node = parse("(<div />)");
    expect(node.kind).toBe("Element");
  });

  it("non-JSX expression produces Expression node", () => {
    const sf = ts.createSourceFile(
      "t.tsx",
      "count()",
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const stmt = sf.statements[0] as ts.ExpressionStatement;
    const node = parseExpression(stmt.expression, sf);
    expect(node.kind).toBe("Expression");
  });

  it("JSX element in expression context delegates to element parsing", () => {
    const node = parse("<span />");
    expect(node.kind).toBe("Element");
  });

  it("fragment in expression context", () => {
    const node = parse("<><a /><b /></>");
    expect(node.kind).toBe("Fragment");
  });
});
