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
 * R5 — the props binding must be named `props`. Reports INK0074 when it is not, and hands a
 * correctly-named binding to {@link checkWholePropsRead} for R6.
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
 * Destructuring the binding is a different rule and is left alone here; R6 excludes it explicitly.
 */
export function checkPropsBindingName(
  binding: ts.BindingName,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  ctx: PassContext,
): void {
  if (!ts.isIdentifier(binding)) return;
  if (binding.text === PROPS_BINDING) {
    checkWholePropsRead(binding, sourceFile, checker, ctx);
    return;
  }
  if (!isRead(binding, sourceFile, checker)) return;

  ctx.diagnostics.push("INK0074", toLoc(binding, sourceFile), { name: binding.text });
}

/**
 * R6 — the props binding may only be read through a property. Reports INK0077 when it is not.
 *
 * Only `props.<name>` carries a member the rewriter can map to each target's props convention, so
 * only that form survives the four `strip: true` targets, which emit no props object at all. A bare
 * `props` has nothing to map: Angular copies it through as a class member it never declares, and
 * Svelte substitutes the destructured shape `{ label, ...__attrs }` — an object that also carries
 * every passed-through attribute, so the read succeeds and returns the wrong value.
 *
 * Runs only once INK0074 has passed, so a binding that is both misnamed and read whole reports the
 * name once rather than two errors for one mistake.
 *
 * Destructuring is not a whole-object read: `const { label } = props` names its members statically,
 * and every target already lowers it to the same locals. It is excluded here for that reason, not
 * skipped — the exclusion is what keeps the rule off a shape that works today.
 */
export function checkWholePropsRead(
  binding: ts.Identifier,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  ctx: PassContext,
): void {
  const declared = checker.getSymbolAtLocation(binding);
  if (!declared) return;

  const visit = (node: ts.Node): void => {
    if (
      ts.isIdentifier(node) &&
      node !== binding &&
      node.text === binding.text &&
      checker.getSymbolAtLocation(node) === declared &&
      !isPropertyBase(node) &&
      !isDestructuredSource(node)
    ) {
      ctx.diagnostics.push("INK0077", toLoc(node, sourceFile));
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
}

/** Whether `node` is the `props` of a `props.<name>` read — the one form every target rewrites. */
function isPropertyBase(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (
    parent !== undefined && ts.isPropertyAccessExpression(parent) && parent.expression === node
  );
}

/** Whether `node` is the initializer of a destructuring, as in `const { label } = props`. */
function isDestructuredSource(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (
    parent !== undefined &&
    ts.isVariableDeclaration(parent) &&
    parent.initializer === node &&
    ts.isObjectBindingPattern(parent.name)
  );
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
