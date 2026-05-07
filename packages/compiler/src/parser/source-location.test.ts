import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { locOf } from "./source-location.ts";

function findFirstIdentifier(
  source: string,
  name: string,
): {
  sourceFile: ts.SourceFile;
  node: ts.Identifier;
} {
  const sourceFile = ts.createSourceFile(
    "/loc.ts",
    source,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TS,
  );
  let found: ts.Identifier | undefined;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isIdentifier(node) && node.text === name) {
      found = node;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (!found) throw new Error(`identifier ${name} not found`);
  return { sourceFile, node: found };
}

describe("locOf", () => {
  it("emits 1-indexed line and column", () => {
    const { sourceFile, node } = findFirstIdentifier(`const x = 1;`, "x");
    const loc = locOf(node, sourceFile);
    expect(loc.line).toBe(1);
    // `const ` is 6 chars (cols 1..6); `x` is at col 7.
    expect(loc.column).toBe(7);
  });

  it("preserves the file name from the source file", () => {
    const { sourceFile, node } = findFirstIdentifier(`const y = 1;`, "y");
    expect(locOf(node, sourceFile).file).toBe("/loc.ts");
  });

  it("computes offset and length", () => {
    const { sourceFile, node } = findFirstIdentifier(`const abc = 1;`, "abc");
    const loc = locOf(node, sourceFile);
    expect(loc.offset).toBe(node.getStart(sourceFile));
    expect(loc.length).toBe(node.getEnd() - node.getStart(sourceFile));
    expect(loc.length).toBe("abc".length);
  });

  it("handles multi-line offsets", () => {
    const { sourceFile, node } = findFirstIdentifier(
      `const a = 1;\nconst longName = 2;`,
      "longName",
    );
    const loc = locOf(node, sourceFile);
    expect(loc.line).toBe(2);
    // `const ` is 6 chars; `longName` is at col 7 of line 2.
    expect(loc.column).toBe(7);
  });
});
