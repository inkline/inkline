import * as ts from "typescript";
import { DYNAMIC_DEPS } from "../../../ir/reactivity.ts";
import type {
  IREffectDeclaration,
  IRExprNode,
  IRLifecycle,
  IRMemoDeclaration,
  IRRefDeclaration,
  IRSetupStatement,
  IRStateDeclaration,
  PrimitiveName,
} from "../../../ir/render/nodes.ts";
import type { PassContext } from "../../types.ts";
import type { BindingTable } from "./bind-primitives.ts";
import { toLoc } from "./loc.ts";
import { ParseBindingScope } from "./scope.ts";

function localFor(bindings: BindingTable, prim: PrimitiveName): string | undefined {
  for (const [local, name] of bindings) {
    if (name === prim) return local;
  }
  return undefined;
}

function isCallTo(expr: ts.Expression, name: string | undefined): expr is ts.CallExpression {
  return (
    !!name &&
    ts.isCallExpression(expr) &&
    ts.isIdentifier(expr.expression) &&
    expr.expression.text === name
  );
}

function makeExprNode(expr: ts.Expression, sf: ts.SourceFile): IRExprNode {
  return {
    kind: "Expression",
    expr,
    deps: DYNAMIC_DEPS,
    isReactive: false,
    emissionContext: "setup",
    isDynamic: false,
    loc: toLoc(expr, sf),
  };
}

export interface SetupResult {
  readonly state: IRStateDeclaration[];
  readonly memos: IRMemoDeclaration[];
  readonly refs: IRRefDeclaration[];
  readonly effects: IREffectDeclaration[];
  readonly lifecycle: IRLifecycle;
  readonly setup: IRSetupStatement[];
  readonly renderExpr: ts.Expression | undefined;
  readonly scope: ParseBindingScope;
}

export function parseSetup(
  setupFn: ts.ArrowFunction | ts.FunctionExpression,
  componentId: string,
  bindings: BindingTable,
  sourceFile: ts.SourceFile,
  ctx: PassContext,
): SetupResult {
  const scope = new ParseBindingScope();
  const state: IRStateDeclaration[] = [];
  const memos: IRMemoDeclaration[] = [];
  const refs: IRRefDeclaration[] = [];
  const effects: IREffectDeclaration[] = [];
  const onMountDecls: IREffectDeclaration[] = [];
  const onCleanupDecls: IREffectDeclaration[] = [];
  const setup: IRSetupStatement[] = [];
  let renderExpr: ts.Expression | undefined;

  const signalLocal = localFor(bindings, "createSignal");
  const memoLocal = localFor(bindings, "createMemo");
  const effectLocal = localFor(bindings, "createEffect");
  const refLocal = localFor(bindings, "createRef");
  const mountLocal = localFor(bindings, "onMount");
  const cleanupLocal = localFor(bindings, "onCleanup");

  const body = ts.isBlock(setupFn.body) ? setupFn.body.statements : undefined;
  if (!body) {
    if (!ts.isBlock(setupFn.body)) renderExpr = setupFn.body;
    return {
      state,
      memos,
      refs,
      effects,
      lifecycle: { onMount: onMountDecls, onCleanup: onCleanupDecls },
      setup,
      renderExpr,
      scope,
    };
  }

  const checker = ctx.symbols as unknown as { resolve?: never };
  void checker;

  for (const stmt of body) {
    const loc = toLoc(stmt, sourceFile);

    if (ts.isReturnStatement(stmt) && stmt.expression) {
      renderExpr = stmt.expression;
      continue;
    }

    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (!decl.initializer) continue;
        const init = decl.initializer;

        if (isCallTo(init, signalLocal)) {
          let valueName: string;
          let setterNameExplicit: string | undefined;

          if (ts.isIdentifier(decl.name)) {
            valueName = decl.name.text;
          } else if (ts.isArrayBindingPattern(decl.name) && decl.name.elements.length >= 1) {
            const first = decl.name.elements[0]!;
            valueName =
              ts.isBindingElement(first) && ts.isIdentifier(first.name) ? first.name.text : "value";
            if (decl.name.elements.length >= 2) {
              const second = decl.name.elements[1]!;
              if (ts.isBindingElement(second) && ts.isIdentifier(second.name)) {
                setterNameExplicit = second.name.text;
              }
            }
          } else {
            continue;
          }

          const initialExpr = init.arguments[0];
          const setterName =
            setterNameExplicit ?? `set${valueName.charAt(0).toUpperCase()}${valueName.slice(1)}`;

          const getterId = ctx.symbols.mint({
            componentId,
            kind: "signal",
            name: valueName,
            loc: toLoc(decl, sourceFile),
          });

          const setterId = ctx.symbols.mint({
            componentId,
            kind: "signal",
            name: setterName,
            loc: toLoc(decl, sourceFile),
          });

          ctx.symbols.linkSetter(getterId, setterId);
          scope.markSetter(setterId);

          state.push({
            name: valueName,
            setterName,
            initial: initialExpr
              ? makeExprNode(initialExpr, sourceFile)
              : makeExprNode(init, sourceFile),
            symbolId: getterId,
            setterSymbolId: setterId,
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }

        if (!ts.isIdentifier(decl.name)) continue;

        if (isCallTo(init, memoLocal)) {
          const memoExpr = init.arguments[0];
          if (!memoExpr) continue;
          const tsSymbol: ts.Symbol | undefined = undefined;

          const id = ctx.symbols.mint({
            componentId,
            kind: "memo",
            name: decl.name.text,
            loc: toLoc(decl, sourceFile),
            tsSymbol: tsSymbol as ts.Symbol | undefined,
          });

          if (tsSymbol) scope.register(tsSymbol as ts.Symbol, id, "memo");

          memos.push({
            name: decl.name.text,
            symbolId: id,
            expr: makeExprNode(memoExpr, sourceFile),
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }

        if (isCallTo(init, refLocal)) {
          const tsSymbol: ts.Symbol | undefined = undefined;

          const id = ctx.symbols.mint({
            componentId,
            kind: "ref",
            name: decl.name.text,
            loc: toLoc(decl, sourceFile),
            tsSymbol: tsSymbol as ts.Symbol | undefined,
          });

          if (tsSymbol) scope.register(tsSymbol as ts.Symbol, id, "ref");

          refs.push({
            name: decl.name.text,
            symbolId: id,
            category: "element",
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }
      }

      if (
        !stmt.declarationList.declarations.some(
          (d) =>
            d.initializer &&
            (isCallTo(d.initializer, signalLocal) ||
              isCallTo(d.initializer, memoLocal) ||
              isCallTo(d.initializer, refLocal)),
        )
      ) {
        setup.push({ stmt, defines: [], loc });
      }
      continue;
    }

    if (ts.isExpressionStatement(stmt)) {
      const expr = stmt.expression;

      if (isCallTo(expr, effectLocal) && expr.arguments[0]) {
        effects.push({
          body: expr.arguments[0],
          deps: DYNAMIC_DEPS,
          cleanup: "unknown",
          isDynamic: false,
          loc,
        });
        continue;
      }

      if (isCallTo(expr, mountLocal) && expr.arguments[0]) {
        onMountDecls.push({
          body: expr.arguments[0],
          deps: DYNAMIC_DEPS,
          cleanup: "absent",
          isDynamic: false,
          loc,
        });
        continue;
      }

      if (isCallTo(expr, cleanupLocal) && expr.arguments[0]) {
        onCleanupDecls.push({
          body: expr.arguments[0],
          deps: DYNAMIC_DEPS,
          cleanup: "present",
          isDynamic: false,
          loc,
        });
        continue;
      }
    }

    setup.push({ stmt, defines: [], loc });
  }

  return {
    state,
    memos,
    refs,
    effects,
    lifecycle: { onMount: onMountDecls, onCleanup: onCleanupDecls },
    setup,
    renderExpr,
    scope,
  };
}
