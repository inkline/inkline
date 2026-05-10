import * as ts from "typescript";

import type { ImportRecord } from "../primitives.ts";

/**
 * Where a `defineComponent(...)` call lives in the source file, plus its
 * separated arguments — the static options object (optional) and the setup
 * function (required). The parser populates the IR for one component per
 * site.
 */
export interface ComponentDefinitionSite {
  /** Local name the variable was bound to, or undefined for default exports. */
  bindingName: string | null;
  call: ts.CallExpression;
  optionsArg: ts.ObjectLiteralExpression | undefined;
  setupArg: ts.ArrowFunction | ts.FunctionExpression;
}

/**
 * Walk the top-level statements of a source file and collect every
 * `defineComponent(...)` call site that we recognize as a component definition.
 *
 * Two source forms are supported:
 *
 *   const Button = defineComponent({...}, (props) => <button/>);
 *   export default defineComponent((props) => <button/>);
 *
 * `primitiveImports` is consulted to resolve the local binding back to the
 * canonical `defineComponent` primitive — handles aliased imports.
 */
export function findComponentDefinitions(
  sourceFile: ts.SourceFile,
  primitiveImports: Map<string, ImportRecord>,
): ComponentDefinitionSite[] {
  const sites: ComponentDefinitionSite[] = [];
  for (const stmt of sourceFile.statements) {
    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (!decl.initializer || !ts.isIdentifier(decl.name)) continue;
        const site = matchDefineComponent(decl.initializer, primitiveImports);
        if (site) sites.push({ ...site, bindingName: decl.name.text });
      }
      continue;
    }
    if (ts.isExportAssignment(stmt)) {
      const site = matchDefineComponent(stmt.expression, primitiveImports);
      if (site) sites.push({ ...site, bindingName: null });
    }
  }
  return sites;
}

/**
 * If `expr` is a `defineComponent(...)` call, split it into its parts and
 * return the site (sans `bindingName`); otherwise return `null`.
 */
function matchDefineComponent(
  expr: ts.Expression,
  primitiveImports: Map<string, ImportRecord>,
): Omit<ComponentDefinitionSite, "bindingName"> | null {
  if (!ts.isCallExpression(expr)) return null;
  const callee = expr.expression;
  if (!ts.isIdentifier(callee)) return null;
  const record = primitiveImports.get(callee.text);
  if (!record || record.primitive !== "defineComponent") return null;
  const args = expr.arguments;
  if (args.length === 0) return null;
  let optionsArg: ts.ObjectLiteralExpression | undefined;
  let setupArg: ts.ArrowFunction | ts.FunctionExpression | undefined;
  if (args.length >= 2) {
    if (ts.isObjectLiteralExpression(args[0]!)) optionsArg = args[0]!;
    const second = args[1]!;
    if (ts.isArrowFunction(second) || ts.isFunctionExpression(second)) setupArg = second;
  } else {
    const only = args[0]!;
    if (ts.isArrowFunction(only) || ts.isFunctionExpression(only)) setupArg = only;
  }
  if (!setupArg) return null;
  return { call: expr, optionsArg, setupArg };
}
