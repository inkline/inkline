import type { IRComponent, IRExpressionNode, IRNode } from "./nodes.ts";

/**
 * Hooks invoked while walking an IR render tree.
 *
 * - `enter` fires before descending into a node's children.
 * - `exit` fires after the entire subtree has been visited.
 * - `expression` fires for every `IRExpressionNode` in the tree, including
 *   ones embedded in attributes, events, refs, and control-flow tests. The
 *   `owner` is the parent IR node that owns the expression.
 *
 * All three hooks are optional. Visitors cannot mutate the tree through this
 * API — that's intentional. To rewrite a tree, build a new one.
 */
export interface IRVisitor {
  enter?: (node: IRNode, parent: IRNode | null) => void;
  exit?: (node: IRNode, parent: IRNode | null) => void;
  expression?: (node: IRExpressionNode, owner: IRNode | null) => void;
}

/** Walk the render tree of a component, invoking visitor callbacks. */
export function walkRenderTree(component: IRComponent, visitor: IRVisitor): void {
  walkNode(component.render, null, visitor);
}

/**
 * Recursively visit `node` and its descendants. Exposed independently of
 * `walkRenderTree` so generators can walk arbitrary subtrees (e.g., a slot
 * fallback or a per-target override render tree).
 */
export function walkNode(node: IRNode, parent: IRNode | null, visitor: IRVisitor): void {
  visitor.enter?.(node, parent);
  switch (node.kind) {
    case "Element":
      for (const attr of node.attrs) {
        if (attr.value.kind === "Expression") {
          visitor.expression?.(attr.value, node);
        }
      }
      for (const evt of node.events) visitor.expression?.(evt.handler, node);
      for (const ref of node.refs) visitor.expression?.(ref.ref, node);
      for (const child of node.children) walkNode(child, node, visitor);
      break;
    case "ComponentInstance":
      for (const attr of node.attrs) {
        if (attr.value.kind === "Expression") {
          visitor.expression?.(attr.value, node);
        }
      }
      for (const evt of node.events) visitor.expression?.(evt.handler, node);
      for (const slot of node.slots) walkNode(slot.body, node, visitor);
      break;
    case "Expression":
      visitor.expression?.(node, parent);
      break;
    case "If":
      for (const branch of node.branches) {
        visitor.expression?.(branch.test, node);
        walkNode(branch.body, node, visitor);
      }
      if (node.fallback) walkNode(node.fallback, node, visitor);
      break;
    case "For":
      visitor.expression?.(node.each, node);
      visitor.expression?.(node.key, node);
      walkNode(node.body, node, visitor);
      break;
    case "Switch":
      for (const c of node.cases) {
        visitor.expression?.(c.test, node);
        walkNode(c.body, node, visitor);
      }
      if (node.fallback) walkNode(node.fallback, node, visitor);
      break;
    case "SlotPlaceholder":
      for (const arg of node.scopedArgs) visitor.expression?.(arg, node);
      if (node.fallback) walkNode(node.fallback, node, visitor);
      break;
    case "Fragment":
      for (const child of node.children) walkNode(child, node, visitor);
      break;
    case "Text":
      break;
  }
  visitor.exit?.(node, parent);
}
