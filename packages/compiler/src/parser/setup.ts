import * as ts from "typescript";

import { extractDeps } from "../analyze/deps.ts";
import { createExpression } from "../ir/builders.ts";
import type {
  IRComponent,
  IREffectDeclaration,
  IRMemoDeclaration,
  IRRefDeclaration,
  IRStateDeclaration,
  PrimitiveName,
} from "../ir/nodes.ts";
import type { ImportRecord } from "../primitives.ts";
import type { ReactiveScope } from "../scope.ts";

import { locOf } from "./source-location.ts";

/** Inputs the setup-body parser needs to populate a component skeleton. */
export interface SetupParseContext {
  primitiveImports: Map<string, ImportRecord>;
  scope: ReactiveScope;
  checker: ts.TypeChecker;
  sourceFile: ts.SourceFile;
  component: IRComponent;
}

export interface SetupParseResult {
  /** The expression returned by the setup function (the render expression). */
  renderExpression: ts.Expression | null;
}

/**
 * Walk the setup callback body, registering reactive primitive declarations
 * and returning the final render expression.
 *
 * Variable statements with a primitive call as the initializer are *consumed*
 * by the parser:
 *
 *   const [count, setCount] = createSignal(0);  // -> component.state[]
 *   const doubled = createMemo(() => count()*2); // -> component.memos[]
 *   const inputRef = createRef<HTMLInputElement>(); // -> component.refs[]
 *
 * Expression statements with `createEffect` / `onMount` / `onCleanup` are
 * registered into the appropriate effects/lifecycle bucket.
 *
 * Anything else lands in `component.setup[]` so target generators can emit
 * it as setup-phase code.
 *
 * If the setup callback is an arrow with an expression body (`(props) => <X/>`),
 * the body itself is treated as the render expression.
 */
export function parseSetupBody(
  setup: ts.ArrowFunction | ts.FunctionExpression,
  ctx: SetupParseContext,
): SetupParseResult {
  if (!ts.isBlock(setup.body)) {
    return { renderExpression: setup.body };
  }
  let render: ts.Expression | null = null;
  for (const stmt of setup.body.statements) {
    handleSetupStatement(stmt, ctx, (returnExpr) => {
      render = returnExpr;
    });
  }
  return { renderExpression: render };
}

function handleSetupStatement(
  stmt: ts.Statement,
  ctx: SetupParseContext,
  onReturn: (expr: ts.Expression | null) => void,
): void {
  if (ts.isReturnStatement(stmt)) {
    onReturn(stmt.expression ?? null);
    return;
  }
  if (ts.isVariableStatement(stmt)) {
    let consumed = false;
    for (const decl of stmt.declarationList.declarations) {
      if (!decl.initializer) continue;
      const kind = classifyPrimitiveCall(decl.initializer, ctx.primitiveImports);
      if (kind === "createSignal") {
        if (registerSignal(decl, decl.initializer as ts.CallExpression, ctx)) consumed = true;
      } else if (kind === "createMemo") {
        if (registerMemo(decl, decl.initializer as ts.CallExpression, ctx)) consumed = true;
      } else if (kind === "createRef") {
        if (registerRef(decl, decl.initializer as ts.CallExpression, ctx)) consumed = true;
      }
    }
    if (!consumed) {
      ctx.component.setup.push({
        stmt,
        defines: [],
        loc: locOf(stmt, ctx.sourceFile),
      });
    }
    return;
  }
  if (ts.isExpressionStatement(stmt)) {
    const kind = classifyPrimitiveCall(stmt.expression, ctx.primitiveImports);
    if (kind === "createEffect" || kind === "onMount" || kind === "onCleanup") {
      registerEffect(stmt.expression as ts.CallExpression, kind, ctx);
      return;
    }
  }
  ctx.component.setup.push({
    stmt,
    defines: [],
    loc: locOf(stmt, ctx.sourceFile),
  });
}

/** Resolve a call expression's callee to a primitive name, if any. */
export function classifyPrimitiveCall(
  expr: ts.Expression,
  primitiveImports: Map<string, ImportRecord>,
): PrimitiveName | null {
  if (!ts.isCallExpression(expr)) return null;
  if (!ts.isIdentifier(expr.expression)) return null;
  return primitiveImports.get(expr.expression.text)?.primitive ?? null;
}

function registerSignal(
  decl: ts.VariableDeclaration,
  call: ts.CallExpression,
  ctx: SetupParseContext,
): boolean {
  if (!ts.isArrayBindingPattern(decl.name)) return false;
  const elements = decl.name.elements;
  const valueElement = elements[0];
  const setterElement = elements[1];
  if (!valueElement || !ts.isBindingElement(valueElement) || !ts.isIdentifier(valueElement.name)) {
    return false;
  }
  if (
    !setterElement ||
    !ts.isBindingElement(setterElement) ||
    !ts.isIdentifier(setterElement.name)
  ) {
    return false;
  }
  const valueId = valueElement.name;
  const setterId = setterElement.name;
  const symbol = ctx.checker.getSymbolAtLocation(valueId);
  const setterSymbol = ctx.checker.getSymbolAtLocation(setterId);
  if (!symbol || !setterSymbol) return false;
  ctx.scope.register({
    kind: "signal",
    name: valueId.text,
    symbol,
    setter: setterSymbol,
    loc: locOf(valueId, ctx.sourceFile),
  });
  const initialArg = call.arguments[0];
  const initialExpr = initialArg
    ? createExpression({
        expr: initialArg,
        resolution: extractDeps(initialArg, { scope: ctx.scope, checker: ctx.checker }),
        emissionContext: "setup",
        loc: locOf(initialArg, ctx.sourceFile),
      })
    : createExpression({
        expr: ts.factory.createIdentifier("undefined"),
        emissionContext: "setup",
        loc: locOf(call, ctx.sourceFile),
      });
  const stateDecl: IRStateDeclaration = {
    name: valueId.text,
    setterName: setterId.text,
    initial: initialExpr,
    typeNode: decl.type,
    symbol,
    setterSymbol,
    loc: locOf(decl, ctx.sourceFile),
  };
  ctx.component.state.push(stateDecl);
  ctx.component.primitives.push({
    primitive: "createSignal",
    loc: locOf(call, ctx.sourceFile),
  });
  return true;
}

function registerMemo(
  decl: ts.VariableDeclaration,
  call: ts.CallExpression,
  ctx: SetupParseContext,
): boolean {
  if (!ts.isIdentifier(decl.name)) return false;
  const symbol = ctx.checker.getSymbolAtLocation(decl.name);
  if (!symbol) return false;
  const bodyArg = call.arguments[0];
  if (!bodyArg) return false;
  let bodyExpr: ts.Expression | null = null;
  if (ts.isArrowFunction(bodyArg) || ts.isFunctionExpression(bodyArg)) {
    if (ts.isBlock(bodyArg.body)) {
      const ret = bodyArg.body.statements.find((s) => ts.isReturnStatement(s)) as
        | ts.ReturnStatement
        | undefined;
      bodyExpr = ret?.expression ?? null;
    } else {
      bodyExpr = bodyArg.body;
    }
  }
  if (!bodyExpr) return false;
  ctx.scope.register({
    kind: "memo",
    name: decl.name.text,
    symbol,
    loc: locOf(decl.name, ctx.sourceFile),
  });
  const ir = createExpression({
    expr: bodyExpr,
    resolution: extractDeps(bodyExpr, { scope: ctx.scope, checker: ctx.checker }),
    emissionContext: "setup",
    loc: locOf(bodyExpr, ctx.sourceFile),
  });
  const memoDecl: IRMemoDeclaration = {
    name: decl.name.text,
    symbol,
    expr: ir,
    loc: locOf(decl, ctx.sourceFile),
  };
  ctx.component.memos.push(memoDecl);
  ctx.component.primitives.push({
    primitive: "createMemo",
    loc: locOf(call, ctx.sourceFile),
  });
  return true;
}

function registerEffect(
  call: ts.CallExpression,
  primitive: "createEffect" | "onMount" | "onCleanup",
  ctx: SetupParseContext,
): void {
  const bodyArg = call.arguments[0];
  if (!bodyArg) return;
  if (!ts.isArrowFunction(bodyArg) && !ts.isFunctionExpression(bodyArg)) return;
  const bodyNode = bodyArg.body;
  const resolution = extractDeps(bodyNode, { scope: ctx.scope, checker: ctx.checker });
  const cleanup = detectCleanup(bodyArg);
  const decl: IREffectDeclaration = {
    body: bodyArg,
    deps: resolution.deps,
    cleanup,
    isDynamic: resolution.isDynamic,
    loc: locOf(call, ctx.sourceFile),
  };
  if (primitive === "onMount") ctx.component.lifecycle.onMount.push(decl);
  else if (primitive === "onCleanup") ctx.component.lifecycle.onCleanup.push(decl);
  else ctx.component.effects.push(decl);
  ctx.component.primitives.push({
    primitive,
    loc: locOf(call, ctx.sourceFile),
  });
}

function registerRef(
  decl: ts.VariableDeclaration,
  call: ts.CallExpression,
  ctx: SetupParseContext,
): boolean {
  if (!ts.isIdentifier(decl.name)) return false;
  const symbol = ctx.checker.getSymbolAtLocation(decl.name);
  if (!symbol) return false;
  ctx.scope.register({
    kind: "ref",
    name: decl.name.text,
    symbol,
    loc: locOf(decl.name, ctx.sourceFile),
  });
  let elementType: string | undefined;
  if (call.typeArguments && call.typeArguments.length > 0) {
    const t = call.typeArguments[0]!;
    if (ts.isTypeReferenceNode(t) && ts.isIdentifier(t.typeName)) {
      elementType = t.typeName.text;
    }
  }
  const refDecl: IRRefDeclaration = {
    name: decl.name.text,
    symbol,
    category: "element",
    elementType,
    loc: locOf(decl, ctx.sourceFile),
  };
  ctx.component.refs.push(refDecl);
  ctx.component.primitives.push({
    primitive: "createRef",
    loc: locOf(call, ctx.sourceFile),
  });
  return true;
}

/**
 * Heuristic: an effect body has cleanup if its callback returns a function.
 * We detect:
 *   - `() => () => { ... }` (expression-bodied arrow returning a fn) -> present
 *   - `() => { ...; return () => { ... }; }` (block returning a fn) -> present
 *   - everything else -> absent
 */
function detectCleanup(
  fn: ts.ArrowFunction | ts.FunctionExpression,
): "present" | "absent" | "unknown" {
  const body = fn.body;
  if (!ts.isBlock(body)) {
    return ts.isArrowFunction(body) || ts.isFunctionExpression(body) ? "present" : "absent";
  }
  for (const stmt of body.statements) {
    if (!ts.isReturnStatement(stmt) || !stmt.expression) continue;
    if (ts.isArrowFunction(stmt.expression) || ts.isFunctionExpression(stmt.expression)) {
      return "present";
    }
  }
  return "absent";
}
