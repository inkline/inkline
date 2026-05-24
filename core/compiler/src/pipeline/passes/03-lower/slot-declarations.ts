import type { IRComponent, IRSlotDeclaration } from "../../../ir/render/nodes.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
import type { PassContext } from "../../types.ts";

export function slotDeclarations(component: IRComponent, _ctx: PassContext): IRComponent {
  const existingNames = new Set(component.slots.map((s) => s.name));
  const newDecls: IRSlotDeclaration[] = [];

  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind === "SlotPlaceholder" && !existingNames.has(node.name)) {
        existingNames.add(node.name);
        newDecls.push({
          name: node.name,
          isScoped: node.scopedArgs.length > 0,
          scopedProps: [],
          required: false,
          fallback: node.fallback,
          loc: node.loc,
        });
      }
    },
  });

  if (newDecls.length === 0) return component;
  return { ...component, slots: [...component.slots, ...newDecls] };
}
