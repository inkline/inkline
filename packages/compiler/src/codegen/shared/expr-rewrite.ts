import * as ts from "typescript";
import type { RewriteRules } from "../context.ts";

export function rewriteExpr(expr: ts.Expression, rules: RewriteRules): string {
  if (
    ts.isCallExpression(expr) &&
    ts.isIdentifier(expr.expression) &&
    expr.arguments.length === 0
  ) {
    const name = expr.expression.text;
    switch (rules.reactiveRead.kind) {
      case "strip-call":
        return name;
      case "preserve-call":
        return `${name}()`;
      case "field-access":
        return `${name}.${rules.reactiveRead.field}`;
    }
  }
  return expr.getText();
}

export function rewriteEventName(name: string, rules: RewriteRules): string {
  const base = name.startsWith("on") ? name.slice(2) : name;
  switch (rules.eventNameCase) {
    case "camel":
      return `on${base}`;
    case "kebab":
      return `@${base.charAt(0).toLowerCase()}${base.slice(1)}`;
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
