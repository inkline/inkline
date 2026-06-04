import type { IRComponent } from "../../ir/render/nodes.ts";

/** Identifier holding the rest of the props (inherited attributes) on a fallthrough root. */
export const FALLTHROUGH_REST = "__attrs";

/**
 * A component inherits its parent's fallthrough attributes only when its root is a single host
 * element or component instance. The {@link markRootFallthrough} lowering pass sets this flag.
 */
export function rootAcceptsFallthrough(component: IRComponent): boolean {
  const r = component.render;
  return (
    (r.kind === "Element" || r.kind === "ComponentInstance") && r.acceptsAttrFallthrough === true
  );
}

/**
 * Merge an authored class (static text or a rewritten expression) with the inherited class read via
 * `classRef` (e.g. `"props.className"`, `"props.class"`, `"className"`). When there is no authored
 * class, the inherited class is forwarded unchanged.
 */
export function classMergeExpr(authored: string | null, classRef: string): string {
  return authored ? `[${authored}, ${classRef}].filter(Boolean).join(" ")` : classRef;
}
