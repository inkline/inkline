import type { IRComponent, IRModule } from "../../../ir/render/nodes.ts";
import type { PassContext } from "../../types.ts";
import { slots } from "./slots.ts";
import { controlFlow } from "./control-flow.ts";
import { twoWayBinding } from "./two-way-binding.ts";
import { events } from "./events.ts";
import { refs } from "./refs.ts";
import { keyWarnings } from "./key-warnings.ts";
import { staticMark } from "./static-mark.ts";

type Lowering = (component: IRComponent, ctx: PassContext) => IRComponent;

const lowerings: readonly Lowering[] = [
  slots,
  controlFlow,
  twoWayBinding,
  events,
  refs,
  keyWarnings,
  staticMark,
];

export function lower(module: IRModule, ctx: PassContext): IRModule {
  const components = module.components.map((component) => {
    let current = component;
    for (const lowering of lowerings) {
      current = lowering(current, ctx);
    }
    return current;
  });

  if (components.every((c, i) => c === module.components[i])) return module;
  return { ...module, components };
}
