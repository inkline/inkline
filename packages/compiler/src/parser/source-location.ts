import type * as ts from "typescript";

import type { SourceLocation } from "../ir/types.ts";

/**
 * Build a `SourceLocation` for a TS node. Lines and columns are 1-indexed —
 * matching what most editors and bug trackers expect. `offset` is the raw
 * byte offset inside the source file; `length` is the span end−start.
 */
export function locOf(node: ts.Node, sourceFile: ts.SourceFile): SourceLocation {
  const start = node.getStart(sourceFile);
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(start);
  return {
    file: sourceFile.fileName,
    line: line + 1,
    column: character + 1,
    offset: start,
    length: node.getEnd() - start,
  };
}
