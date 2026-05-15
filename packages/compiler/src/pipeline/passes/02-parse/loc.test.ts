import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { toLoc } from "./loc.ts";

function getFirstExpr(source: string, fileName = "test.tsx"): { node: ts.Node; sf: ts.SourceFile } {
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true);
  const stmt = sf.statements[0] as ts.ExpressionStatement;
  return { node: stmt.expression, sf };
}

describe("toLoc", () => {
  it("single-line source: correct line, column, offset, length", () => {
    const { node, sf } = getFirstExpr("count()");
    const loc = toLoc(node, sf);
    expect(loc.line).toBe(1);
    expect(loc.column).toBe(1);
    expect(loc.offset).toBe(0);
    expect(loc.length).toBe(7);
  });

  it("multi-line source: node on line 3", () => {
    const source = "// line 1\n// line 2\ncount()";
    const { node, sf } = getFirstExpr(source);
    const loc = toLoc(node, sf);
    expect(loc.line).toBe(3);
  });

  it("node not at column 0 has correct 1-based column", () => {
    const source = "  count()";
    const { node, sf } = getFirstExpr(source);
    const loc = toLoc(node, sf);
    expect(loc.column).toBe(3);
  });

  it("length equals node.getEnd() - node.getStart()", () => {
    const source = "myVariable";
    const { node, sf } = getFirstExpr(source);
    const loc = toLoc(node, sf);
    expect(loc.length).toBe(node.getEnd() - node.getStart(sf));
  });

  it("file name matches source file fileName", () => {
    const { node, sf } = getFirstExpr("x", "MyComponent.ink.tsx");
    const loc = toLoc(node, sf);
    expect(loc.file).toBe("MyComponent.ink.tsx");
  });
});
