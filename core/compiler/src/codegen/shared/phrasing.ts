import type { IRNode } from "../../ir/render/nodes.ts";

/**
 * True when a child list contains rendered text — a `Text` or `Expression` node. Such "phrasing"
 * content is whitespace-significant (a stray formatting newline around it changes the rendered text),
 * so targets emit these children inline, keeping the rendered text identical to the source across all
 * frameworks.
 */
export function childrenArePhrasing(children: readonly IRNode[]): boolean {
  return children.some((child) => child.kind === "Text" || child.kind === "Expression");
}
