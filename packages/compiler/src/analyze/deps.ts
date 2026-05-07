import * as ts from "typescript";

import {
  DYNAMIC_DEPS,
  type IRDependency,
  type IRDependencySet,
  type IRDepResolution,
} from "../ir/reactivity.ts";
import type { ReactiveScope } from "../scope.ts";

/** Inputs needed to extract dependencies from a TS expression. */
export interface DepExtractionContext {
  scope: ReactiveScope;
  checker: ts.TypeChecker;
}

/**
 * Extract reactive dependencies from a TypeScript expression or block.
 *
 * Implements the algorithm from the architectural blueprint §2.4:
 *   - Walk the expression tree.
 *   - For each CallExpression whose callee resolves to a reactive symbol in
 *     scope, record it as a dependency.
 *   - Stop walking at function-like boundaries (callbacks defer reads).
 *   - Bail to dynamic when the callee uses indexed access with a non-static
 *     index (e.g. `signals[k]()`).
 *   - Exclude stable setters (createSignal's setter) from the dep set.
 *   - Property access into props (`props.label`) records a `prop` dep with
 *     the access path preserved.
 */
export function extractDeps(expr: ts.Node, ctx: DepExtractionContext): IRDepResolution {
  const collected = new Map<ts.Symbol, IRDependency>();
  let dynamic = false;

  const recordCall = (call: ts.CallExpression): void => {
    const callee = call.expression;
    let symbol: ts.Symbol | undefined;
    if (ts.isIdentifier(callee)) {
      symbol = resolveSymbol(ctx.checker, callee);
    } else if (ts.isPropertyAccessExpression(callee)) {
      symbol = resolveSymbol(ctx.checker, callee.name);
    } else if (ts.isElementAccessExpression(callee)) {
      const arg = callee.argumentExpression;
      if (!isStaticLiteral(arg)) {
        dynamic = true;
        return;
      }
    }
    if (!symbol) return;
    if (ctx.scope.isStableSetter(symbol)) return;
    const reactive = ctx.scope.get(symbol);
    if (!reactive) return;
    if (collected.has(symbol)) return;
    collected.set(symbol, {
      symbol,
      kind: reactive.kind,
      name: reactive.name,
      path: [],
      conditional: false,
    });
  };

  const visit = (node: ts.Node): void => {
    if (isFunctionLikeNode(node)) return;
    if (ts.isCallExpression(node)) {
      recordCall(node);
      for (const arg of node.arguments) visit(arg);
      visit(node.expression);
      return;
    }
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const sym = resolveSymbol(ctx.checker, getNamePart(node));
      if (sym && ctx.scope.has(sym) && !ctx.scope.isStableSetter(sym)) {
        const reactive = ctx.scope.get(sym);
        if (reactive && reactive.kind === "prop" && !collected.has(sym)) {
          collected.set(sym, {
            symbol: sym,
            kind: reactive.kind,
            name: reactive.name,
            path: pathFromAccess(node),
            conditional: false,
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(expr);
  return {
    deps: Object.freeze(Array.from(collected.values())),
    isReactive: collected.size > 0 || dynamic,
    isDynamic: dynamic,
  };
}

/**
 * Compute the React-style deps array as a list of identifier *names* — what
 * a `useEffect`/`useMemo` consumer would put inside `[...]`. Refs are
 * excluded because their identity is stable across renders.
 */
export function reactDepsArray(deps: IRDependencySet): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const dep of deps) {
    if (dep.kind === "ref") continue;
    if (seen.has(dep.name)) continue;
    seen.add(dep.name);
    out.push(dep.name);
  }
  return out;
}

function isFunctionLikeNode(node: ts.Node): boolean {
  return (
    ts.isArrowFunction(node) ||
    ts.isFunctionExpression(node) ||
    ts.isFunctionDeclaration(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node) ||
    ts.isConstructorDeclaration(node) ||
    ts.isClassDeclaration(node) ||
    ts.isClassExpression(node)
  );
}

function isStaticLiteral(node: ts.Node): boolean {
  return (
    ts.isStringLiteral(node) ||
    ts.isNumericLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node)
  );
}

/**
 * Return the identifier or expression that names the property being accessed.
 * For `obj.foo`, returns the `foo` identifier; for `obj["foo"]`, returns the
 * `"foo"` string literal expression.
 */
function getNamePart(node: ts.PropertyAccessExpression | ts.ElementAccessExpression): ts.Node {
  if (ts.isPropertyAccessExpression(node)) return node.name;
  return node.argumentExpression;
}

/**
 * Walk a chain of property/element accesses left-to-right and collect the
 * accessed names into an array — `props.user.name` -> `['user', 'name']`.
 * Element access with a non-string/numeric index is dropped (the access
 * itself still records as a prop dep with whatever prefix is statically known).
 */
function pathFromAccess(node: ts.PropertyAccessExpression | ts.ElementAccessExpression): string[] {
  const path: string[] = [];
  let current: ts.Node = node;
  while (ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current)) {
    if (ts.isPropertyAccessExpression(current)) {
      path.unshift(current.name.text);
      current = current.expression;
    } else {
      const arg = current.argumentExpression;
      if (ts.isStringLiteral(arg) || ts.isNumericLiteral(arg)) {
        path.unshift(arg.text);
      }
      current = current.expression;
    }
  }
  return path;
}

function resolveSymbol(checker: ts.TypeChecker, node: ts.Node): ts.Symbol | undefined {
  let symbol = checker.getSymbolAtLocation(node);
  if (!symbol) return undefined;
  if (symbol.flags & ts.SymbolFlags.Alias) {
    symbol = checker.getAliasedSymbol(symbol);
  }
  return symbol;
}

// Re-export DYNAMIC_DEPS so consumers of this module don't have to reach into
// the IR package solely to compare against the sentinel.
export { DYNAMIC_DEPS };
