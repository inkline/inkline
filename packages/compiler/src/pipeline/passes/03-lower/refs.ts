import type { IRComponent, IRRefCategory, IRRefDeclaration } from "../../../ir/render/nodes.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
import type { SymbolId } from "../../../ir/reactivity.ts";
import type { PassContext } from "../../types.ts";

const TAG_TO_ELEMENT_TYPE: Record<string, string> = {
  a: "HTMLAnchorElement",
  button: "HTMLButtonElement",
  canvas: "HTMLCanvasElement",
  div: "HTMLDivElement",
  form: "HTMLFormElement",
  img: "HTMLImageElement",
  input: "HTMLInputElement",
  label: "HTMLLabelElement",
  li: "HTMLLIElement",
  ol: "HTMLOListElement",
  p: "HTMLParagraphElement",
  pre: "HTMLPreElement",
  select: "HTMLSelectElement",
  span: "HTMLSpanElement",
  table: "HTMLTableElement",
  textarea: "HTMLTextAreaElement",
  ul: "HTMLUListElement",
  video: "HTMLVideoElement",
};

export function refs(component: IRComponent, ctx: PassContext): IRComponent {
  const updates = new Map<SymbolId, { category: IRRefCategory; elementType?: string }>();

  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind === "Element") {
        for (const ref of node.refs) {
          const symbolId = ref.ref.deps[0]?.symbolId;
          if (symbolId) {
            updates.set(symbolId, {
              category: "element",
              elementType: TAG_TO_ELEMENT_TYPE[node.tag] ?? "HTMLElement",
            });
          }
        }
      } else if (node.kind === "ComponentInstance") {
        for (const ref of node.refs) {
          ctx.diagnostics.push("INK0070", ref.loc);
          const symbolId = ref.ref.deps[0]?.symbolId;
          if (symbolId) {
            updates.set(symbolId, { category: "component" });
          }
        }
      }
    },
  });

  if (updates.size === 0) return component;

  const newRefs: IRRefDeclaration[] = component.refs.map((decl) => {
    const update = updates.get(decl.symbolId);
    if (!update) return decl;
    return { ...decl, category: update.category, elementType: update.elementType };
  });

  return { ...component, refs: newRefs };
}
