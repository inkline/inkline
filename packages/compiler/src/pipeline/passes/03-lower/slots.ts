import * as ts from "typescript";
import type {
  IRAttribute,
  IRComponent,
  IRComponentInstance,
  IRNode,
  IRSlotContent,
} from "../../../ir/render/nodes.ts";
import { transformComponent } from "../../../ir/render/transform.ts";

function isJsxExpression(expr: ts.Expression): boolean {
  return ts.isJsxElement(expr) || ts.isJsxSelfClosingElement(expr) || ts.isJsxFragment(expr);
}

export function slots(component: IRComponent): IRComponent {
  return transformComponent(component, {
    enter(node) {
      if (node.kind !== "ComponentInstance") return;
      const ci = node;

      let slotsChanged = false;
      const newSlots: IRSlotContent[] = [...ci.slots];
      const remainingAttrs: IRAttribute[] = [];

      for (const attr of ci.attrs) {
        if (attr.value.kind === "Expression" && isJsxExpression(attr.value.expr)) {
          slotsChanged = true;
          newSlots.push({
            name: attr.name,
            body: attr.value as IRNode,
            scopedParams: [],
            loc: attr.loc,
          });
        } else {
          remainingAttrs.push(attr);
        }
      }

      if (!slotsChanged && ci.slots.some((s) => s.name === "default")) return;
      if (!slotsChanged && ci.slots.length === 0) return;

      const result: IRComponentInstance = {
        ...ci,
        attrs: slotsChanged ? remainingAttrs : ci.attrs,
        slots: newSlots,
      };

      return result;
    },
  });
}
