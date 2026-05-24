import * as ts from "typescript";
import { DYNAMIC_DEPS, type IRReactiveKind, type SymbolId } from "../../../ir/reactivity.ts";
import type {
  IRConsumeDeclaration,
  IREffectDeclaration,
  IRExprNode,
  IRLifecycle,
  IRMemoDeclaration,
  IRProvideDeclaration,
  IRRefDeclaration,
  IRResourceDeclaration,
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
    raw: expr.getText(sf),
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
  readonly resources: IRResourceDeclaration[];
  readonly provides: IRProvideDeclaration[];
  readonly consumes: IRConsumeDeclaration[];
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
  checker: ts.TypeChecker,
  ctx: PassContext,
): SetupResult {
  const scope = new ParseBindingScope();
  const state: IRStateDeclaration[] = [];
  const memos: IRMemoDeclaration[] = [];
  const refs: IRRefDeclaration[] = [];
  const effects: IREffectDeclaration[] = [];
  const resources: IRResourceDeclaration[] = [];
  const provides: IRProvideDeclaration[] = [];
  const consumes: IRConsumeDeclaration[] = [];
  const onMountDecls: IREffectDeclaration[] = [];
  const onCleanupDecls: IREffectDeclaration[] = [];
  const setup: IRSetupStatement[] = [];
  let renderExpr: ts.Expression | undefined;

  const signalLocal = localFor(bindings, "createSignal");
  const memoLocal = localFor(bindings, "createMemo");
  const effectLocal = localFor(bindings, "createEffect");
  const refLocal = localFor(bindings, "createRef");
  const resourceLocal = localFor(bindings, "createResource");
  const provideLocal = localFor(bindings, "provide");
  const useContextLocal = localFor(bindings, "useContext");
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
      resources,
      provides,
      consumes,
      lifecycle: { onMount: onMountDecls, onCleanup: onCleanupDecls },
      setup,
      renderExpr,
      scope,
    };
  }

  const registerBinding = (name: ts.BindingName, id: SymbolId, kind: IRReactiveKind): void => {
    if (!ts.isIdentifier(name)) return;
    const sym = checker.getSymbolAtLocation(name);
    if (sym) scope.register(sym, id, kind);
  };

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
          let getterBindingName: ts.BindingName | undefined;
          let setterBindingName: ts.BindingName | undefined;

          if (ts.isIdentifier(decl.name)) {
            valueName = decl.name.text;
            getterBindingName = decl.name;
          } else if (ts.isArrayBindingPattern(decl.name) && decl.name.elements.length >= 1) {
            const first = decl.name.elements[0]!;
            if (ts.isBindingElement(first) && ts.isIdentifier(first.name)) {
              valueName = first.name.text;
              getterBindingName = first.name;
            } else {
              valueName = "value";
            }
            if (decl.name.elements.length >= 2) {
              const second = decl.name.elements[1]!;
              if (ts.isBindingElement(second) && ts.isIdentifier(second.name)) {
                setterNameExplicit = second.name.text;
                setterBindingName = second.name;
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
          if (getterBindingName) registerBinding(getterBindingName, getterId, "signal");
          if (setterBindingName) registerBinding(setterBindingName, setterId, "signal");

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

        if (isCallTo(init, resourceLocal)) {
          let dataName = "data";
          let metaNames = { loading: "loading", error: "error", refetch: "refetch" };

          if (ts.isArrayBindingPattern(decl.name) && decl.name.elements.length >= 1) {
            const first = decl.name.elements[0]!;
            if (ts.isBindingElement(first) && ts.isIdentifier(first.name)) {
              dataName = first.name.text;
            }
            if (decl.name.elements.length >= 2) {
              const second = decl.name.elements[1]!;
              if (ts.isBindingElement(second) && ts.isObjectBindingPattern(second.name)) {
                for (const el of second.name.elements) {
                  if (ts.isBindingElement(el) && ts.isIdentifier(el.name)) {
                    const n = el.name.text;
                    if (n === "loading" || n === "error" || n === "refetch") {
                      metaNames = { ...metaNames, [n]: n };
                    }
                  }
                }
              }
            }
          } else if (ts.isIdentifier(decl.name)) {
            dataName = decl.name.text;
          }

          const resId = ctx.symbols.mint({
            componentId,
            kind: "signal",
            name: dataName,
            loc: toLoc(decl, sourceFile),
          });

          const fetcherArg = init.arguments[0];
          if (fetcherArg) {
            resources.push({
              name: dataName,
              fetcher: makeExprNode(fetcherArg, sourceFile),
              source: init.arguments[1] ? makeExprNode(init.arguments[1], sourceFile) : undefined,
              symbolId: resId,
              loadingName: metaNames.loading,
              errorName: metaNames.error,
              refetchName: metaNames.refetch,
              loc: toLoc(decl, sourceFile),
            });
          }
          continue;
        }

        if (!ts.isIdentifier(decl.name)) continue;

        if (isCallTo(init, memoLocal)) {
          const memoArg = init.arguments[0];
          if (!memoArg) continue;
          // Idiomatic memo: createMemo(() => expr). Unwrap the arrow to the body
          // so memo.expr.expr holds the value expression, not the thunk.
          const memoExpr =
            (ts.isArrowFunction(memoArg) || ts.isFunctionExpression(memoArg)) &&
            !ts.isBlock(memoArg.body)
              ? memoArg.body
              : memoArg;

          const id = ctx.symbols.mint({
            componentId,
            kind: "memo",
            name: decl.name.text,
            loc: toLoc(decl, sourceFile),
          });

          registerBinding(decl.name, id, "memo");

          memos.push({
            name: decl.name.text,
            symbolId: id,
            expr: makeExprNode(memoExpr, sourceFile),
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }

        if (isCallTo(init, refLocal)) {
          const id = ctx.symbols.mint({
            componentId,
            kind: "ref",
            name: decl.name.text,
            loc: toLoc(decl, sourceFile),
          });

          registerBinding(decl.name, id, "ref");

          refs.push({
            name: decl.name.text,
            symbolId: id,
            category: "element",
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }

        if (isCallTo(init, useContextLocal)) {
          const contextArg = init.arguments[0];
          if (!contextArg) continue;

          const id = ctx.symbols.mint({
            componentId,
            kind: "context",
            name: decl.name.text,
            loc: toLoc(decl, sourceFile),
          });

          registerBinding(decl.name, id, "context");

          const contextName = ts.isIdentifier(contextArg)
            ? contextArg.text
            : contextArg.getText(sourceFile);

          consumes.push({
            name: decl.name.text,
            contextRef: contextArg,
            contextName,
            symbolId: id,
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
              isCallTo(d.initializer, refLocal) ||
              isCallTo(d.initializer, resourceLocal) ||
              isCallTo(d.initializer, useContextLocal)),
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

      if (isCallTo(expr, provideLocal) && expr.arguments[0] && expr.arguments[1]) {
        const contextArg = expr.arguments[0];
        const valueArg = expr.arguments[1];
        const contextName = ts.isIdentifier(contextArg)
          ? contextArg.text
          : contextArg.getText(sourceFile);

        provides.push({
          contextRef: contextArg,
          contextName,
          value: makeExprNode(valueArg, sourceFile),
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
    resources,
    provides,
    consumes,
    lifecycle: { onMount: onMountDecls, onCleanup: onCleanupDecls },
    setup,
    renderExpr,
    scope,
  };
}
