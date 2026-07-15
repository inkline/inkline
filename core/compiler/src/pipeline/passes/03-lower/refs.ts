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

export function refs(component: IRComponent, _ctx: PassContext): IRComponent {
  const updates = new Map<SymbolId, { category: IRRefCategory; elementType?: string }>();

  // A ref binding references its declaration by identifier (`ref={myRef}`). Unlike attribute and
  // event expressions, ref-binding `deps` are never resolved by the parse deps pass, and a
  // component-instance ref binding in particular carries an empty `deps` array — so keying off
  // `deps[0].symbolId` never resolves it and the declaration keeps the parser's `"element"` default
  // (INK-15). Link the binding to its declaration through the identifier text instead, mirroring how
  // the Angular target already derives its element-ref set from the render tree.
  const refIdByName = new Map<string, SymbolId>();
  for (const decl of component.refs) refIdByName.set(decl.name, decl.symbolId);

  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind === "Element") {
        for (const ref of node.refs) {
          // Element refs still key off resolved `deps`: their `elementType` inference is a separate
          // latent gap (deps are likewise empty here) whose fix would shift element-ref output, so
          // it is intentionally left untouched by this categorization-only change.
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
          const symbolId = refIdByName.get(ref.ref.expr.getText());
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
