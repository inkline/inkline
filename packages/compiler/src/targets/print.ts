import * as ts from "typescript";

import type { IRComponent, IRExpressionNode, IRStaticValue } from "../ir/nodes.ts";

/**
 * Lightweight codegen scope built from the IR — no type checker needed.
 * Each target uses this to identify which identifiers are reactive reads vs
 * ordinary function calls.
 */
export interface CodegenScope {
  /** Signal and memo names whose `name()` calls are reactive reads. */
  reactiveReaders: ReadonlySet<string>;
  /** Setter names (e.g. `setCount`) — stable references excluded from deps. */
  stableSetters: ReadonlySet<string>;
  /** Ref names whose `.current` access may need target-specific rewriting. */
  refs: ReadonlySet<string>;
  /** Maps setter name → getter name for two-way binding value resolution. */
  setterToGetter: ReadonlyMap<string, string>;
}

export function buildCodegenScope(component: IRComponent): CodegenScope {
  const readers = new Set<string>();
  const setters = new Set<string>();
  const refs = new Set<string>();
  const setterToGetter = new Map<string, string>();
  for (const s of component.state) {
    readers.add(s.name);
    setters.add(s.setterName);
    setterToGetter.set(s.setterName, s.name);
  }
  for (const m of component.memos) readers.add(m.name);
  for (const r of component.refs) refs.add(r.name);
  return { reactiveReaders: readers, stableSetters: setters, refs, setterToGetter };
}

/**
 * Controls how `count()` reactive reads are printed for a given target.
 * `"strip"` removes the call → `count` (React).
 * `"keep"` keeps it → `count()` (Solid, Angular).
 */
export type ReadStyle = "strip" | "keep";

export interface MemberRewrite {
  strip: true;
  rename?: ReadonlyMap<string, string>;
}

export interface PrintExpressionOptions {
  readStyle: ReadStyle;
  scope: CodegenScope;
  memberRewrites?: ReadonlyMap<string, MemberRewrite>;
}

export function printExpression(node: IRExpressionNode, opts: PrintExpressionOptions): string {
  return rewrite(node.expr, opts);
}

export function isJsxExpression(expr: ts.Expression): boolean {
  return ts.isJsxElement(expr) || ts.isJsxSelfClosingElement(expr) || ts.isJsxFragment(expr);
}

export function resolveBindingGetter(node: IRExpressionNode, opts: PrintExpressionOptions): string {
  if (ts.isIdentifier(node.expr)) {
    const getter = opts.scope.setterToGetter.get(node.expr.text);
    if (getter) {
      return opts.readStyle === "strip" ? getter : `${getter}()`;
    }
  }
  return printExpression(node, opts);
}

export function printAttrValue(
  value: IRStaticValue | IRExpressionNode,
  opts: PrintExpressionOptions,
): string {
  if (value.kind === "Static") return printStaticValue(value);
  return printExpression(value, opts);
}

export function printStaticValue(value: IRStaticValue): string {
  if (value.value === null) return "null";
  if (typeof value.value === "string") return JSON.stringify(value.value);
  return String(value.value);
}

function rewrite(expr: ts.Expression, opts: PrintExpressionOptions): string {
  if (ts.isCallExpression(expr)) return rewriteCall(expr, opts);
  if (ts.isArrowFunction(expr)) return rewriteArrow(expr, opts);
  if (ts.isFunctionExpression(expr)) return rewriteFunctionExpr(expr, opts);
  if (ts.isConditionalExpression(expr)) {
    return `${rewrite(expr.condition, opts)} ? ${rewrite(expr.whenTrue, opts)} : ${rewrite(expr.whenFalse, opts)}`;
  }
  if (ts.isBinaryExpression(expr)) {
    return `${rewrite(expr.left, opts)} ${expr.operatorToken.getText()} ${rewrite(expr.right, opts)}`;
  }
  if (ts.isPrefixUnaryExpression(expr)) {
    return `${ts.tokenToString(expr.operator)}${rewrite(expr.operand, opts)}`;
  }
  if (ts.isPostfixUnaryExpression(expr)) {
    return `${rewrite(expr.operand, opts)}${ts.tokenToString(expr.operator)}`;
  }
  if (ts.isPropertyAccessExpression(expr)) {
    if (ts.isIdentifier(expr.expression) && opts.memberRewrites) {
      const rule = opts.memberRewrites.get(expr.expression.text);
      if (rule) {
        const name = rule.rename?.get(expr.name.text) ?? expr.name.text;
        return name;
      }
    }
    const dot = expr.questionDotToken ? "?." : ".";
    return `${rewrite(expr.expression, opts)}${dot}${expr.name.text}`;
  }
  if (ts.isElementAccessExpression(expr)) {
    const bracket = expr.questionDotToken ? "?.[" : "[";
    return `${rewrite(expr.expression, opts)}${bracket}${rewrite(expr.argumentExpression, opts)}]`;
  }
  if (ts.isObjectLiteralExpression(expr)) return rewriteObject(expr, opts);
  if (ts.isArrayLiteralExpression(expr)) {
    return `[${expr.elements.map((e) => rewrite(e, opts)).join(", ")}]`;
  }
  if (ts.isParenthesizedExpression(expr)) {
    return `(${rewrite(expr.expression, opts)})`;
  }
  if (ts.isTemplateExpression(expr)) return rewriteTemplate(expr, opts);
  if (ts.isTaggedTemplateExpression(expr)) {
    return `${rewrite(expr.tag, opts)}${rewrite(expr.template as ts.Expression, opts)}`;
  }
  if (ts.isAsExpression(expr) || ts.isTypeAssertionExpression(expr)) {
    return rewrite((expr as ts.AsExpression).expression, opts);
  }
  if (ts.isNonNullExpression(expr)) {
    return `${rewrite(expr.expression, opts)}!`;
  }
  if (ts.isSpreadElement(expr)) {
    return `...${rewrite(expr.expression, opts)}`;
  }
  return verbatim(expr);
}

function rewriteCall(call: ts.CallExpression, opts: PrintExpressionOptions): string {
  const callee = call.expression;
  if (ts.isIdentifier(callee) && call.arguments.length === 0) {
    const name = callee.text;
    if (opts.scope.reactiveReaders.has(name)) {
      return opts.readStyle === "strip" ? name : `${name}()`;
    }
  }
  const args = call.arguments.map((a) => rewrite(a, opts));
  const calleeStr = rewrite(callee, opts);
  const open = call.questionDotToken ? "?.(" : "(";
  return `${calleeStr}${open}${args.join(", ")})`;
}

function rewriteArrow(fn: ts.ArrowFunction, opts: PrintExpressionOptions): string {
  const params = fn.parameters.map((p) => verbatim(p)).join(", ");
  const paramStr = fn.parameters.length === 1 && !fn.parameters[0]!.type ? params : `(${params})`;
  if (ts.isBlock(fn.body)) return `${paramStr} => ${rewriteBlock(fn.body, opts)}`;
  return `${paramStr} => ${rewrite(fn.body, opts)}`;
}

function rewriteFunctionExpr(fn: ts.FunctionExpression, opts: PrintExpressionOptions): string {
  const params = fn.parameters.map((p) => verbatim(p)).join(", ");
  const name = fn.name ? ` ${fn.name.text}` : "";
  return `function${name}(${params}) ${rewriteBlock(fn.body, opts)}`;
}

function rewriteBlock(block: ts.Block, opts: PrintExpressionOptions): string {
  const lines: string[] = [];
  for (const stmt of block.statements) lines.push(rewriteStatement(stmt, opts));
  if (lines.length === 0) return "{}";
  return `{\n${lines.map((l) => `  ${l}`).join("\n")}\n}`;
}

function rewriteStatement(stmt: ts.Statement, opts: PrintExpressionOptions): string {
  if (ts.isReturnStatement(stmt)) {
    return stmt.expression ? `return ${rewrite(stmt.expression, opts)};` : "return;";
  }
  if (ts.isExpressionStatement(stmt)) {
    return `${rewrite(stmt.expression, opts)};`;
  }
  if (ts.isVariableStatement(stmt)) {
    const kw = stmt.declarationList.flags & ts.NodeFlags.Const ? "const" : "let";
    const decls = stmt.declarationList.declarations.map((d) => {
      const name = verbatim(d.name);
      return d.initializer ? `${name} = ${rewrite(d.initializer, opts)}` : name;
    });
    return `${kw} ${decls.join(", ")};`;
  }
  return verbatim(stmt);
}

function rewriteTemplate(tmpl: ts.TemplateExpression, opts: PrintExpressionOptions): string {
  let out = "`" + tmpl.head.text;
  for (const span of tmpl.templateSpans) {
    out += "${" + rewrite(span.expression, opts) + "}";
    out += span.literal.text;
  }
  return out + "`";
}

function rewriteObject(obj: ts.ObjectLiteralExpression, opts: PrintExpressionOptions): string {
  if (obj.properties.length === 0) return "{}";
  const entries: string[] = [];
  for (const prop of obj.properties) {
    if (ts.isPropertyAssignment(prop)) {
      const key = verbatim(prop.name);
      entries.push(`${key}: ${rewrite(prop.initializer, opts)}`);
    } else if (ts.isShorthandPropertyAssignment(prop)) {
      entries.push(prop.name.text);
    } else if (ts.isSpreadAssignment(prop)) {
      entries.push(`...${rewrite(prop.expression, opts)}`);
    } else {
      entries.push(verbatim(prop));
    }
  }
  return `{ ${entries.join(", ")} }`;
}

/** Print a raw `ts.Expression` with reactive-read rewriting — no IRExpressionNode wrapper needed. */
export function printRawExpression(expr: ts.Expression, opts: PrintExpressionOptions): string {
  return rewrite(expr, opts);
}

/** Print a `ts.Block` with reactive-read rewriting inside each statement. */
export function printBlock(block: ts.Block, opts: PrintExpressionOptions): string {
  return rewriteBlock(block, opts);
}

/** Print a single `ts.Statement` with reactive-read rewriting. */
export function printStatement(stmt: ts.Statement, opts: PrintExpressionOptions): string {
  return rewriteStatement(stmt, opts);
}

const tsPrinter = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const emptySF = ts.createSourceFile("_gen.tsx", "", ts.ScriptTarget.ESNext);

function verbatim(node: ts.Node): string {
  const sf = node.getSourceFile?.();
  if (sf) return node.getText(sf);
  return tsPrinter.printNode(ts.EmitHint.Unspecified, node, emptySF);
}
