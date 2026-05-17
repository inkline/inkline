import * as ts from "typescript";
import type { IRComponent, IREventBinding } from "../../../ir/render/nodes.ts";
import { transformComponent } from "../../../ir/render/transform.ts";

function extractParamTypes(
  handler: ts.Expression,
): readonly (ts.TypeNode | undefined)[] | undefined {
  if (ts.isArrowFunction(handler) || ts.isFunctionExpression(handler)) {
    return handler.parameters.map((p) => p.type);
  }
  return undefined;
}

export function events(component: IRComponent): IRComponent {
  return transformComponent(component, {
    enter(node) {
      if (node.kind !== "Element" && node.kind !== "ComponentInstance") return;
      if (node.events.length === 0) return;

      let changed = false;
      const updatedEvents: IREventBinding[] = node.events.map((ev) => {
        const paramTypes = ev.paramTypes ?? extractParamTypes(ev.handler.expr);
        if (paramTypes === ev.paramTypes) return ev;
        changed = true;
        return { ...ev, paramTypes };
      });

      if (!changed) return;
      return { ...node, events: updatedEvents };
    },
  });
}
