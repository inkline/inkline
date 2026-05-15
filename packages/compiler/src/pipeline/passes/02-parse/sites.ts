import * as ts from "typescript";
import type { SourceLocation } from "../../../ir/types.ts";
import type { PassContext } from "../../types.ts";
import type { BindingTable } from "./bind-primitives.ts";
import { toLoc } from "./loc.ts";

export interface ComponentDefinitionSite {
  readonly name: string;
  readonly options?: ts.ObjectLiteralExpression;
  readonly setupFn: ts.ArrowFunction | ts.FunctionExpression;
  readonly loc: SourceLocation;
}

function extractDefineComponentCall(
  expr: ts.Expression,
  defineComponentLocal: string | undefined,
):
  | { options?: ts.ObjectLiteralExpression; setupFn: ts.ArrowFunction | ts.FunctionExpression }
  | undefined {
  if (!ts.isCallExpression(expr)) return undefined;
  if (!ts.isIdentifier(expr.expression)) return undefined;
  if (expr.expression.text !== defineComponentLocal) return undefined;

  const args = expr.arguments;
  if (args.length === 0) return undefined;

  if (args.length === 1) {
    const arg = args[0]!;
    if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) {
      return { setupFn: arg };
    }
    return undefined;
  }

  if (args.length >= 2) {
    const optionsArg = args[0]!;
    const setupArg = args[1]!;
    if (!ts.isObjectLiteralExpression(optionsArg)) return undefined;
    if (!ts.isArrowFunction(setupArg) && !ts.isFunctionExpression(setupArg)) return undefined;
    return { options: optionsArg, setupFn: setupArg };
  }

  return undefined;
}

export function findSites(
  sourceFile: ts.SourceFile,
  bindings: BindingTable,
  ctx: PassContext,
): ComponentDefinitionSite[] {
  const defineComponentLocal = [...bindings.entries()].find(
    ([, v]) => v === "defineComponent",
  )?.[0];

  if (!defineComponentLocal) return [];

  const sites: ComponentDefinitionSite[] = [];

  for (const stmt of sourceFile.statements) {
    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (!decl.initializer) continue;
        const result = extractDefineComponentCall(decl.initializer, defineComponentLocal);
        if (!result) {
          if (
            ts.isCallExpression(decl.initializer) &&
            ts.isIdentifier(decl.initializer.expression) &&
            decl.initializer.expression.text === defineComponentLocal
          ) {
            ctx.diagnostics.push("INK0040", toLoc(decl, sourceFile));
          }
          continue;
        }
        const name = ts.isIdentifier(decl.name) ? decl.name.text : "Anonymous";
        sites.push({ name, ...result, loc: toLoc(decl, sourceFile) });
      }
    }

    if (ts.isExportAssignment(stmt) && !stmt.isExportEquals) {
      const result = extractDefineComponentCall(stmt.expression, defineComponentLocal);
      if (!result) {
        if (
          ts.isCallExpression(stmt.expression) &&
          ts.isIdentifier(stmt.expression.expression) &&
          stmt.expression.expression.text === defineComponentLocal
        ) {
          ctx.diagnostics.push("INK0040", toLoc(stmt, sourceFile));
        }
        continue;
      }
      const name =
        result.options &&
        ts.isObjectLiteralExpression(result.options) &&
        result.options.properties.some(
          (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === "name",
        )
          ? (
              result.options.properties.find(
                (p) =>
                  ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === "name",
              ) as ts.PropertyAssignment
            ).initializer
              .getText(sourceFile)
              .replace(/['"]/g, "")
          : sourceFile.fileName.replace(/.*\//, "").replace(/\.ink\.tsx$/, "");
      sites.push({ name, ...result, loc: toLoc(stmt, sourceFile) });
    }
  }

  return sites;
}
