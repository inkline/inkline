import * as ts from "typescript";
import type { RewriteRules } from "../context.ts";

export function rewriteExpr(expr: ts.Expression, rules: RewriteRules): string {
  return walk(expr, rules);
}

const tsPrinter = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const emptySF = ts.createSourceFile("_gen.tsx", "", ts.ScriptTarget.ESNext);

function verbatim(node: ts.Node): string {
  const sf = node.getSourceFile?.();
  if (sf) return node.getText(sf);
  return tsPrinter.printNode(ts.EmitHint.Unspecified, node, emptySF);
}

function hasAsyncModifier(node: ts.ArrowFunction | ts.FunctionExpression): boolean {
  return node.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword) ?? false;
}

function walk(expr: ts.Expression, rules: RewriteRules): string {
  if (ts.isIdentifier(expr)) {
    const renamed = rules.rename?.[expr.text];
    if (renamed !== undefined) return renamed;
    // A bare reactive-value read (e.g. a resource `data`/`loading`) follows the target's reactive
    // read convention even though the authored read has no call syntax.
    if (rules.reactiveBindings?.has(expr.text)) {
      const self = rules.selfPrefix ? "this." : "";
      switch (rules.reactiveRead.kind) {
        case "strip-call":
          return `${self}${expr.text}`;
        case "preserve-call":
          return `${self}${expr.text}()`;
        case "field-access":
          return `${self}${expr.text}.${rules.reactiveRead.field}`;
      }
    }
    // A bare `props` reference in a target that destructures props (no `props` binding) is
    // rewritten to the reconstruction of its destructured bindings.
    if (expr.text === "props" && rules.members?.props?.whole !== undefined) {
      return rules.members.props.whole;
    }
  }

  if (ts.isCallExpression(expr)) {
    const callee = expr.expression;
    // A call to a known state setter: `setX(v)` → target-specific mutation.
    const setterName = ts.isIdentifier(callee) ? callee.text : undefined;
    const setterState = setterName !== undefined ? rules.setters?.[setterName] : undefined;
    if (setterName !== undefined && setterState !== undefined) {
      const self = rules.selfPrefix ? "this." : "";
      const value = expr.arguments.map((a) => walk(a, rules)).join(", ");
      switch (rules.setterStyle.kind) {
        case "function-call":
          return `${self}${setterName}(${value})`;
        case "field-assignment":
          return `${self}${setterState}.${rules.setterStyle.field} = ${value}`;
        case "direct-assignment":
          return `${self}${setterState} = ${value}`;
        case "method-call":
          return `${self}${setterState}.${rules.setterStyle.method}(${value})`;
      }
    }
    if (ts.isIdentifier(callee) && expr.arguments.length === 0) {
      // A bare 0-arg call is a reactive read; in class-body contexts it is a member access.
      const self = rules.selfPrefix ? "this." : "";
      switch (rules.reactiveRead.kind) {
        case "strip-call":
          return `${self}${callee.text}`;
        case "preserve-call":
          return `${self}${callee.text}()`;
        case "field-access":
          return `${self}${callee.text}.${rules.reactiveRead.field}`;
      }
    }
    const args = expr.arguments.map((a) => walk(a, rules));
    const open = expr.questionDotToken ? "?.(" : "(";
    return `${walk(callee, rules)}${open}${args.join(", ")})`;
  }

  if (ts.isBinaryExpression(expr)) {
    return `${walk(expr.left, rules)} ${expr.operatorToken.getText()} ${walk(expr.right, rules)}`;
  }

  if (ts.isConditionalExpression(expr)) {
    return `${walk(expr.condition, rules)} ? ${walk(expr.whenTrue, rules)} : ${walk(expr.whenFalse, rules)}`;
  }

  if (ts.isPropertyAccessExpression(expr)) {
    if (ts.isIdentifier(expr.expression)) {
      if (expr.expression.text === "props") {
        if (rules.selfPrefix) return `this.${expr.name.text}`;
        if (rules.members?.props?.strip) return expr.name.text;
      }
      if (expr.expression.text === "slots" && rules.members?.slots?.strip) {
        return rules.members.slots.rename?.[expr.name.text] ?? expr.name.text;
      }
    }
    if (expr.name.text === "current") {
      const base = walk(expr.expression, rules);
      switch (rules.refAccess.kind) {
        case "bare":
          // In a class body (Angular), a ref is a `viewChild` signal member, so `inputRef.current`
          // becomes `this.inputRef()`; in the template it stays the bare template-ref variable.
          return rules.selfPrefix ? `this.${base}()` : base;
        case "field":
          return `${base}${expr.questionDotToken ? "?." : "."}${rules.refAccess.field}`;
      }
    }
    const dot = expr.questionDotToken ? "?." : ".";
    return `${walk(expr.expression, rules)}${dot}${expr.name.text}`;
  }

  if (ts.isElementAccessExpression(expr)) {
    const bracket = expr.questionDotToken ? "?.[" : "[";
    return `${walk(expr.expression, rules)}${bracket}${walk(expr.argumentExpression, rules)}]`;
  }

  if (ts.isArrowFunction(expr)) {
    const asyncKw = hasAsyncModifier(expr) ? "async " : "";
    const params = expr.parameters.map((p) => verbatim(p)).join(", ");
    const paramStr =
      expr.parameters.length === 1 && !expr.parameters[0]!.type ? params : `(${params})`;
    if (ts.isBlock(expr.body)) return `${asyncKw}${paramStr} => ${walkBlock(expr.body, rules)}`;
    return `${asyncKw}${paramStr} => ${walk(expr.body, rules)}`;
  }

  if (ts.isFunctionExpression(expr)) {
    const asyncKw = hasAsyncModifier(expr) ? "async " : "";
    const params = expr.parameters.map((p) => verbatim(p)).join(", ");
    const name = expr.name ? ` ${expr.name.text}` : "";
    return `${asyncKw}function${name}(${params}) ${walkBlock(expr.body, rules)}`;
  }

  if (ts.isParenthesizedExpression(expr)) return `(${walk(expr.expression, rules)})`;

  if (ts.isPrefixUnaryExpression(expr))
    return `${ts.tokenToString(expr.operator)}${walk(expr.operand, rules)}`;

  if (ts.isPostfixUnaryExpression(expr))
    return `${walk(expr.operand, rules)}${ts.tokenToString(expr.operator)}`;

  if (ts.isTemplateExpression(expr)) {
    let out = "`" + expr.head.text;
    for (const span of expr.templateSpans) {
      out += "${" + walk(span.expression, rules) + "}";
      out += span.literal.text;
    }
    return out + "`";
  }

  if (ts.isStringLiteral(expr) && rules.stringQuote === "single") {
    return `'${expr.text.replace(/'/g, "\\'")}'`;
  }

  if (ts.isArrayLiteralExpression(expr))
    return `[${expr.elements.map((e) => walk(e, rules)).join(", ")}]`;

  if (ts.isObjectLiteralExpression(expr)) {
    const parts = expr.properties.map((p) => {
      if (ts.isPropertyAssignment(p)) return `${p.name.getText()}: ${walk(p.initializer, rules)}`;
      if (ts.isSpreadAssignment(p)) return `...${walk(p.expression, rules)}`;
      return verbatim(p);
    });
    return `{ ${parts.join(", ")} }`;
  }

  if (ts.isNonNullExpression(expr)) return `${walk(expr.expression, rules)}!`;

  if (ts.isSpreadElement(expr)) return `...${walk(expr.expression, rules)}`;

  if (ts.isAsExpression(expr)) return walk(expr.expression, rules);

  return verbatim(expr);
}

function walkStatement(stmt: ts.Statement, rules: RewriteRules): string {
  if (ts.isReturnStatement(stmt)) {
    return stmt.expression ? `return ${walk(stmt.expression, rules)};` : "return;";
  }
  if (ts.isExpressionStatement(stmt)) {
    return `${walk(stmt.expression, rules)};`;
  }
  if (ts.isVariableStatement(stmt)) {
    const kw = stmt.declarationList.flags & ts.NodeFlags.Const ? "const" : "let";
    const decls = stmt.declarationList.declarations.map((d) => {
      const name = verbatim(d.name);
      return d.initializer ? `${name} = ${walk(d.initializer, rules)}` : name;
    });
    return `${kw} ${decls.join(", ")};`;
  }
  if (ts.isBlock(stmt)) return walkBlock(stmt, rules);
  if (ts.isIfStatement(stmt)) {
    let s = `if (${walk(stmt.expression, rules)}) ${walkStatement(stmt.thenStatement, rules)}`;
    if (stmt.elseStatement) s += ` else ${walkStatement(stmt.elseStatement, rules)}`;
    return s;
  }
  if (ts.isForOfStatement(stmt)) {
    return `for (${verbatim(stmt.initializer)} of ${walk(stmt.expression, rules)}) ${walkStatement(stmt.statement, rules)}`;
  }
  return verbatim(stmt);
}

function walkBlock(block: ts.Block, rules: RewriteRules): string {
  const lines = block.statements.map((stmt) => walkStatement(stmt, rules));
  if (lines.length === 0) return "{}";
  return `{ ${lines.join(" ")} }`;
}

export function rewriteEventName(name: string, rules: RewriteRules): string {
  const base = name.startsWith("on") ? name.slice(2) : name;
  switch (rules.eventNameCase) {
    case "camel":
      return `on${base}`;
    case "kebab":
      return `@${base.replace(/[A-Z]/g, (c, i) => (i === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`))}`;

    case "lower":
      return `on${base.toLowerCase()}`;
  }
}

const HTML_ATTR_MAP: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};

const REACT_ATTR_MAP: Record<string, string> = {
  class: "className",
  for: "htmlFor",
};

export function rewriteAttrName(name: string, rules: RewriteRules): string {
  if (rules.jsxAttrCasing === "html") return HTML_ATTR_MAP[name] ?? name;
  if (rules.jsxAttrCasing === "react") return REACT_ATTR_MAP[name] ?? name;
  return name;
}

export function extractKeyBody(expr: ts.Expression, rules: RewriteRules): string {
  if (ts.isArrowFunction(expr) && !ts.isBlock(expr.body)) {
    return rewriteExpr(expr.body, rules);
  }
  return rewriteExpr(expr, rules);
}

function unwrapParens(expr: ts.Expression): ts.Expression {
  if (ts.isParenthesizedExpression(expr)) return unwrapParens(expr.expression);
  return expr;
}

function isJsxLike(expr: ts.Expression): boolean {
  const e = unwrapParens(expr);
  return ts.isJsxElement(e) || ts.isJsxSelfClosingElement(e) || ts.isJsxFragment(e);
}

export function emitExprAsTemplate(expr: ts.Expression, rules: RewriteRules): string {
  const inner = unwrapParens(expr);
  if (ts.isArrowFunction(inner) && !ts.isBlock(inner.body)) {
    return emitExprAsTemplate(inner.body, rules);
  }
  if (isJsxLike(inner)) return verbatim(inner);
  return `{${rewriteExpr(expr, rules)}}`;
}
