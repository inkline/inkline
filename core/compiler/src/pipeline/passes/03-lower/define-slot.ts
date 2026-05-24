import * as ts from "typescript";
import type { IRComponent, IRSlotPlaceholder } from "../../../ir/render/nodes.ts";
import { transformComponent } from "../../../ir/render/transform.ts";
import type { PassContext } from "../../types.ts";

export function defineSlotLowering(component: IRComponent, _ctx: PassContext): IRComponent {
  const bindings = component.slotBindings;
  if (!bindings || bindings.size === 0) return component;

  return transformComponent(component, {
    enter(node) {
      if (node.kind !== "Expression") return;
      if (!ts.isIdentifier(node.expr)) return;

      const slotName = bindings.get(node.expr.text);
      if (slotName === undefined) return;

      return {
        kind: "SlotPlaceholder",
        name: slotName,
        scopedArgs: [],
        fallback: undefined,
        loc: node.loc,
      } satisfies IRSlotPlaceholder;
    },
  });
}
