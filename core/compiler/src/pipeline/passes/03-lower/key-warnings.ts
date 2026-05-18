import type { IRComponent } from "../../../ir/render/nodes.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
import type { PassContext } from "../../types.ts";

export function keyWarnings(component: IRComponent, ctx: PassContext): IRComponent {
  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind === "For" && node.syntheticKey) {
        ctx.diagnostics.push("INK0050", node.loc);
      }
    },
  });
  return component;
}
