import { assertNever } from "../../core/assert.ts";
import type { Code } from "./nodes.ts";

export interface CodeVisitor {
  enter?: (node: Code, parent?: Code) => void | false;
  exit?: (node: Code, parent?: Code) => void;
}

function visitChildren(node: Code, visitor: CodeVisitor): void {
  switch (node.kind) {
    case "CFile":
    case "CGroup":
    case "CIndent":
      for (const child of node.children) walkCode(child, visitor, node);
      break;
    case "CScript":
      for (const child of node.children) walkCode(child, visitor, node);
      break;
    case "CJsxElement":
      for (const attr of node.attrs) walkCode(attr, visitor, node);
      for (const child of node.children) walkCode(child, visitor, node);
      break;
    case "CTmplElement":
      for (const dir of node.directives) walkCode(dir, visitor, node);
      for (const attr of node.attrs) walkCode(attr, visitor, node);
      for (const child of node.children) walkCode(child, visitor, node);
      break;
    case "CImport":
    case "CExpr":
    case "CRaw":
    case "CJsxText":
    case "CTmplText":
    case "CTmplMustache":
    case "CTmplDirective":
    case "CTmplAttr":
    case "CJsxAttr":
    case "CStyle":
      break;
    case "CStmt":
      if (typeof node.body !== "string") {
        walkCode(node.body, visitor, node);
      }
      break;
    default:
      assertNever(node);
  }
}

export function walkCode(node: Code, visitor: CodeVisitor, parent?: Code): void {
  const skip = visitor.enter?.(node, parent);
  if (skip === false) {
    visitor.exit?.(node, parent);
    return;
  }
  visitChildren(node, visitor);
  visitor.exit?.(node, parent);
}
