import { assertNever } from "../../core/assert.ts";
import type { IRNode } from "./nodes.ts";

export interface IRVisitor {
  enter?: (node: IRNode, parent?: IRNode) => void | false;
  exit?: (node: IRNode, parent?: IRNode) => void;
}

export function walkNode(node: IRNode, visitor: IRVisitor, parent?: IRNode): void {
  const skipChildren = visitor.enter?.(node, parent);
  if (skipChildren === false) {
    visitor.exit?.(node, parent);
    return;
  }

  switch (node.kind) {
    case "Element":
      for (const child of node.children) walkNode(child, visitor, node);
      break;
    case "ComponentInstance":
      for (const slot of node.slots) walkNode(slot.body, visitor, node);
      break;
    case "Text":
    case "Expression":
      break;
    case "If":
      for (const branch of node.branches) walkNode(branch.body, visitor, node);
      if (node.fallback) walkNode(node.fallback, visitor, node);
      break;
    case "For":
      walkNode(node.body, visitor, node);
      break;
    case "Switch":
      for (const c of node.cases) walkNode(c.body, visitor, node);
      if (node.fallback) walkNode(node.fallback, visitor, node);
      break;
    case "SlotPlaceholder":
      if (node.fallback) walkNode(node.fallback, visitor, node);
      break;
    case "Fragment":
      for (const child of node.children) walkNode(child, visitor, node);
      break;
    default:
      assertNever(node);
  }

  visitor.exit?.(node, parent);
}

export function walkRenderTree(root: IRNode, visitor: IRVisitor): void {
  walkNode(root, visitor);
}
