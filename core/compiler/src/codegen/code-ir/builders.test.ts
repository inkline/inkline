import { describe, it, expect } from "vitest";
import {
  cFile,
  cScript,
  cImport,
  cStmt,
  cExpr,
  cRaw,
  cJsxElement,
  cJsxAttr,
  cJsxText,
  cTmplElement,
  cTmplDirective,
  cTmplAttr,
  cTmplText,
  cTmplMustache,
  cGroup,
  cIndent,
} from "./builders.ts";

describe("Code IR builders", () => {
  it("cFile", () => {
    const node = cFile({ flavor: "tsx", children: [] });
    expect(node.kind).toBe("CFile");
    expect(node.flavor).toBe("tsx");
    expect(node.children).toEqual([]);
  });

  it("cScript defaults", () => {
    const node = cScript({ children: [] });
    expect(node.kind).toBe("CScript");
    expect(node.lang).toBe("ts");
    expect(node.setup).toBe(false);
  });

  it("cScript with setup", () => {
    const node = cScript({ lang: "ts", setup: true, children: [] });
    expect(node.setup).toBe(true);
  });

  it("cImport", () => {
    const node = cImport({
      module: "react",
      named: [{ imported: "useState" }],
    });
    expect(node.kind).toBe("CImport");
    expect(node.module).toBe("react");
    expect(node.named).toEqual([{ imported: "useState" }]);
  });

  it("cImport type-only", () => {
    const node = cImport({
      module: "react",
      named: [{ imported: "FC" }],
      typeOnly: true,
    });
    expect(node.typeOnly).toBe(true);
  });

  it("cStmt with string body", () => {
    const node = cStmt({ body: "const x = 5;" });
    expect(node.kind).toBe("CStmt");
    expect(node.body).toBe("const x = 5;");
  });

  it("cStmt with CExpr body", () => {
    const expr = cExpr({ text: "x + 1" });
    const node = cStmt({ body: expr });
    expect(node.body).toBe(expr);
  });

  it("cExpr", () => {
    const node = cExpr({ text: "count + 1" });
    expect(node.kind).toBe("CExpr");
    expect(node.text).toBe("count + 1");
  });

  it("cRaw", () => {
    const node = cRaw({ text: "// comment\n" });
    expect(node.kind).toBe("CRaw");
    expect(node.text).toBe("// comment\n");
  });

  it("cJsxElement defaults", () => {
    const node = cJsxElement({ tag: "div" });
    expect(node.kind).toBe("CJsxElement");
    expect(node.attrs).toEqual([]);
    expect(node.children).toEqual([]);
    expect(node.selfClose).toBe(false);
  });

  it("cJsxElement self-closing", () => {
    const node = cJsxElement({ tag: "br", selfClose: true });
    expect(node.selfClose).toBe(true);
  });

  it("cJsxAttr", () => {
    const node = cJsxAttr({
      name: "className",
      value: { kind: "static", text: "btn" },
    });
    expect(node.kind).toBe("CJsxAttr");
    expect(node.name).toBe("className");
  });

  it("cJsxText", () => {
    const node = cJsxText({ text: "Hello" });
    expect(node.kind).toBe("CJsxText");
    expect(node.text).toBe("Hello");
  });

  it("cTmplElement defaults", () => {
    const node = cTmplElement({ tag: "div" });
    expect(node.kind).toBe("CTmplElement");
    expect(node.directives).toEqual([]);
    expect(node.attrs).toEqual([]);
    expect(node.children).toEqual([]);
    expect(node.selfClose).toBe(false);
  });

  it("cTmplDirective", () => {
    const expr = cExpr({ text: "show" });
    const node = cTmplDirective({ directive: "v-if", expr });
    expect(node.kind).toBe("CTmplDirective");
    expect(node.directive).toBe("v-if");
    expect(node.expr).toBe(expr);
  });

  it("cTmplAttr", () => {
    const node = cTmplAttr({
      name: "class",
      value: { kind: "static", text: "btn" },
    });
    expect(node.kind).toBe("CTmplAttr");
  });

  it("cTmplText", () => {
    const node = cTmplText({ text: "Hello" });
    expect(node.kind).toBe("CTmplText");
  });

  it("cTmplMustache", () => {
    const expr = cExpr({ text: "count" });
    const node = cTmplMustache({ expr });
    expect(node.kind).toBe("CTmplMustache");
    expect(node.expr).toBe(expr);
  });

  it("cGroup defaults", () => {
    const node = cGroup({ children: [] });
    expect(node.kind).toBe("CGroup");
    expect(node.fit).toBeUndefined();
  });

  it("cIndent", () => {
    const node = cIndent({ children: [] });
    expect(node.kind).toBe("CIndent");
  });
});
