import * as ts from "typescript";
import type { SourceLocation } from "../../../ir/types.ts";

export function toLoc(node: ts.Node, sourceFile: ts.SourceFile): SourceLocation {
  const pos = node.getStart(sourceFile);
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(pos);
  return {
    file: sourceFile.fileName,
    line: line + 1,
    column: character + 1,
    offset: pos,
    length: node.getEnd() - pos,
  };
}
