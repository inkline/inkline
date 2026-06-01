import type { IRComponent } from "../../../ir/render/nodes.ts";

/**
 * Marks the component's root node as accepting attribute fallthrough (Vue-style
 * attribute inheritance). When a parent passes attributes — `class` (merged), `id`,
 * `aria-*`, `data-*`, event handlers — to a component, codegen forwards them onto
 * this root node.
 *
 * Only a single host `Element` or `ComponentInstance` root can accept fallthrough.
 * Fragment / control-flow / text / expression / slot / transition roots cannot —
 * there is no single element to attach inherited attributes to.
 */
export function markRootFallthrough(component: IRComponent): IRComponent {
  const root = component.render;
  if (root.kind !== "Element" && root.kind !== "ComponentInstance") return component;
  if (root.acceptsAttrFallthrough) return component;
  return { ...component, render: { ...root, acceptsAttrFallthrough: true } };
}
