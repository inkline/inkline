import * as ts from "typescript";
import type { PassContext } from "../../types.ts";
import { toLoc } from "./loc.ts";

/**
 * The one name a component's props object may be bound to, whichever channel declares it.
 *
 * Every target emits and rewrites the props object under this name, and the rewriter matches it by
 * text, so a read through a binding under any other name is copied to the output unrewritten and
 * names an identifier the generated component never declares. INK0074 refuses that binding.
 */
export const PROPS_BINDING = "props";

/**
 * R5 — the props binding must be named `props`. Reports INK0074 when it is not.
 *
 * Called once per component for whichever channel won R3: the `defineProps` binding, or the setup
 * parameter that carries the options and annotation channels.
 *
 * Gated on a **read** of the binding, not on a declared prop. Only a read reaches the output, and
 * only the output is broken — a binding nothing reads is erased with its declaration. The narrower
 * gate would be "the binding declares a prop", and it is wrong: `defineProps<EmptyProps>()` bound
 * to `_props` declares nothing, yet `String(_props)` still reaches the output on all seven targets.
 * The read gate closes that and still leaves the headless components legal — they bind the macro's
 * result only to satisfy the unused-variable rule and never read it.
 *
 * Destructuring the binding is a different rule and is left alone here.
 */
export function checkPropsBindingName(
  binding: ts.BindingName,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  ctx: PassContext,
): void {
  if (!ts.isIdentifier(binding)) return;
  if (binding.text === PROPS_BINDING) return;
  if (!isRead(binding, sourceFile, checker)) return;

  ctx.diagnostics.push("INK0074", toLoc(binding, sourceFile), { name: binding.text });
}

/**
 * Whether any identifier in the file resolves to `binding`'s symbol.
 *
 * Matching on the symbol rather than on the text is what makes a whole-file scan correct: a local
 * of the same name in a sibling component resolves to a different symbol, and `obj.p` resolves to a
 * property, so neither counts as a read of this binding.
 */
function isRead(
  binding: ts.Identifier,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
): boolean {
  const declared = checker.getSymbolAtLocation(binding);
  if (!declared) return false;

  let read = false;
  const visit = (node: ts.Node): void => {
    if (read) return;
    if (ts.isIdentifier(node) && node !== binding && node.text === binding.text) {
      if (checker.getSymbolAtLocation(node) === declared) {
        read = true;
        return;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  return read;
}
