import { assertNever } from "../../core/assert.ts";
import type { IRComponent, IRNode } from "./nodes.ts";

export const SKIP: unique symbol = Symbol("SKIP");

export interface IRTransformer {
  enter?: (node: IRNode, parent?: IRNode) => IRNode | typeof SKIP | void;
  exit?: (node: IRNode, parent?: IRNode) => IRNode | void;
}

function transformChildren(
  children: readonly IRNode[],
  t: IRTransformer,
  parent: IRNode,
): readonly IRNode[] {
  let changed = false;
  const result: IRNode[] = [];
  for (const child of children) {
    const transformed = transformNode(child, t, parent);
    if (transformed !== child) changed = true;
    result.push(transformed);
  }
  return changed ? result : children;
}

function transformNode(node: IRNode, t: IRTransformer, parent?: IRNode): IRNode {
  const enterResult = t.enter?.(node, parent);
  if (enterResult === SKIP) return node;

  let current = enterResult ?? node;

  switch (current.kind) {
    case "Element": {
      const children = transformChildren(current.children, t, current);
      if (children !== current.children) {
        current = { ...current, children };
      }
      break;
    }
    case "ComponentInstance": {
      let changed = false;
      const slots = current.slots.map((slot) => {
        const body = transformNode(slot.body, t, current);
        if (body !== slot.body) {
          changed = true;
          return { ...slot, body };
        }
        return slot;
      });
      if (changed) {
        current = { ...current, slots };
      }
      break;
    }
    case "Text":
    case "Expression":
      break;
    case "If": {
      let changed = false;
      const branches = current.branches.map((branch) => {
        const body = transformNode(branch.body, t, current);
        if (body !== branch.body) {
          changed = true;
          return { ...branch, body };
        }
        return branch;
      });
      const fallback = current.fallback ? transformNode(current.fallback, t, current) : undefined;
      if (changed || fallback !== current.fallback) {
        current = { ...current, branches: changed ? branches : current.branches, fallback };
      }
      break;
    }
    case "For": {
      const body = transformNode(current.body, t, current);
      if (body !== current.body) {
        current = { ...current, body };
      }
      break;
    }
    case "Switch": {
      let changed = false;
      const cases = current.cases.map((c) => {
        const body = transformNode(c.body, t, current);
        if (body !== c.body) {
          changed = true;
          return { ...c, body };
        }
        return c;
      });
      const fallback = current.fallback ? transformNode(current.fallback, t, current) : undefined;
      if (changed || fallback !== current.fallback) {
        current = { ...current, cases: changed ? cases : current.cases, fallback };
      }
      break;
    }
    case "Transition": {
      const child = transformNode(current.child, t, current);
      if (child !== current.child) {
        current = { ...current, child };
      }
      break;
    }
    case "SlotPlaceholder": {
      const fallback = current.fallback ? transformNode(current.fallback, t, current) : undefined;
      if (fallback !== current.fallback) {
        current = { ...current, fallback };
      }
      break;
    }
    case "Fragment": {
      const children = transformChildren(current.children, t, current);
      if (children !== current.children) {
        current = { ...current, children };
      }
      break;
    }
    default:
      assertNever(current);
  }

  const exitResult = t.exit?.(current, parent);
  return exitResult ?? current;
}

export function transform(root: IRNode, transformer: IRTransformer): IRNode {
  return transformNode(root, transformer);
}

export function transformComponent(
  component: IRComponent,
  transformer: IRTransformer,
): IRComponent {
  const render = transform(component.render, transformer);
  if (render === component.render) return component;
  return { ...component, render };
}
