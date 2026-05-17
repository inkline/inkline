import type { IRComponent, IRElement, IRNode } from "../../../ir/render/nodes.ts";
import { transformComponent } from "../../../ir/render/transform.ts";

function isChildStatic(node: IRNode): boolean {
  if (node.kind === "Text") return true;
  if (node.kind === "Element") return node.isStatic;
  if (node.kind === "Fragment") return node.children.every(isChildStatic);
  return false;
}

function computeStatic(el: IRElement): boolean {
  if (el.events.length > 0) return false;
  if (el.refs.length > 0) return false;
  for (const attr of el.attrs) {
    if (attr.value.kind !== "Static") return false;
  }
  return el.children.every(isChildStatic);
}

export function staticMark(component: IRComponent): IRComponent {
  return transformComponent(component, {
    exit(node) {
      if (node.kind !== "Element") return;
      const isStatic = computeStatic(node);
      if (isStatic === node.isStatic) return;
      return { ...node, isStatic };
    },
  });
}
