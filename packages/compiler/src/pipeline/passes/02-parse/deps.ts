import * as ts from "typescript";
import type {
  IRDependency,
  IRDepResolution,
  IRReactiveKind,
  SymbolId,
} from "../../../ir/reactivity.ts";

export interface BindingScope {
  resolveSymbolId(tsSymbol: ts.Symbol): SymbolId | undefined;
  kindOf(id: SymbolId): IRReactiveKind;
  isStableSetter(id: SymbolId): boolean;
}

interface AccessChain {
  readonly root: ts.Identifier;
  readonly path: readonly string[];
  readonly dynamic: boolean;
}

function walkAccessChain(node: ts.Expression): AccessChain | undefined {
  const path: string[] = [];
  let current: ts.Expression = node;
  let dynamic = false;

  for (;;) {
    if (ts.isPropertyAccessExpression(current)) {
      path.unshift(current.name.text);
      current = current.expression;
    } else if (ts.isElementAccessExpression(current)) {
      if (ts.isStringLiteral(current.argumentExpression)) {
        path.unshift(current.argumentExpression.text);
      } else {
        dynamic = true;
      }
      current = current.expression;
    } else if (ts.isIdentifier(current)) {
      return { root: current, path, dynamic };
    } else {
      return undefined;
    }
  }
}

function isShortCircuitOp(kind: ts.SyntaxKind): boolean {
  return (
    kind === ts.SyntaxKind.AmpersandAmpersandToken ||
    kind === ts.SyntaxKind.BarBarToken ||
    kind === ts.SyntaxKind.QuestionQuestionToken
  );
}

function dedupeByIdAndPath(deps: IRDependency[]): IRDependency[] {
  const map = new Map<string, IRDependency>();
  for (const dep of deps) {
    const key = `${dep.symbolId}:${dep.path.join(".")}`;
    const existing = map.get(key);
    if (!existing || (!dep.conditional && existing.conditional)) {
      map.set(key, dep);
    }
  }
  return [...map.values()];
}

export function extractDeps(
  expr: ts.Expression,
  scope: BindingScope,
  checker: ts.TypeChecker,
): IRDepResolution {
  const deps: IRDependency[] = [];
  let isDynamic = false;

  function walk(node: ts.Node, conditional: boolean): void {
    if (ts.isFunctionLike(node)) return;

    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if (ts.isIdentifier(callee) && node.arguments.length === 0) {
        const sym = checker.getSymbolAtLocation(callee);
        const id = sym ? scope.resolveSymbolId(sym) : undefined;
        if (id && !scope.isStableSetter(id)) {
          deps.push({
            symbolId: id,
            kind: scope.kindOf(id),
            name: callee.text,
            path: [],
            conditional,
          });
        }
      }
    }

    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const chain = walkAccessChain(node);
      if (chain) {
        const rootSym = checker.getSymbolAtLocation(chain.root);
        const id = rootSym ? scope.resolveSymbolId(rootSym) : undefined;
        if (id) {
          if (chain.dynamic) {
            isDynamic = true;
          } else {
            deps.push({
              symbolId: id,
              kind: scope.kindOf(id),
              name: chain.root.text,
              path: chain.path,
              conditional,
            });
          }
        }
        return;
      }
    }

    if (ts.isConditionalExpression(node)) {
      walk(node.condition, conditional);
      walk(node.whenTrue, true);
      walk(node.whenFalse, true);
      return;
    }
    if (ts.isBinaryExpression(node) && isShortCircuitOp(node.operatorToken.kind)) {
      walk(node.left, conditional);
      walk(node.right, true);
      return;
    }
    if (ts.isPropertyAccessExpression(node) && node.questionDotToken) {
      walk(node.expression, conditional);
      return;
    }

    node.forEachChild((c) => walk(c, conditional));
  }

  walk(expr, false);
  const deduped = dedupeByIdAndPath(deps);
  return {
    deps: Object.freeze(deduped),
    isReactive: deduped.length > 0 || isDynamic,
    isDynamic,
  };
}
