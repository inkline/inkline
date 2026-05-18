import * as ts from "typescript";
import { DYNAMIC_DEPS } from "../../../../ir/reactivity.ts";
import type {
  IRAttribute,
  IRAttributeBinding,
  IREventBinding,
  IRExprNode,
  IRRefBinding,
  IRStaticValue,
} from "../../../../ir/render/nodes.ts";
import { toLoc } from "../loc.ts";

function makeExpr(expr: ts.Expression, sf: ts.SourceFile): IRExprNode {
  return {
    kind: "Expression",
    expr,
    raw: expr.getText(sf),
    deps: DYNAMIC_DEPS,
    isReactive: false,
    emissionContext: "template",
    isDynamic: false,
    loc: toLoc(expr, sf),
  };
}

function staticValue(value: string | boolean, sf: ts.SourceFile, node: ts.Node): IRStaticValue {
  return { kind: "Static", value, loc: toLoc(node, sf) };
}

export interface ParsedAttributes {
  readonly attrs: IRAttribute[];
  readonly events: IREventBinding[];
  readonly refs: IRRefBinding[];
}

export function parseAttributes(
  attributes: ts.JsxAttributes,
  sourceFile: ts.SourceFile,
): ParsedAttributes {
  const attrs: IRAttribute[] = [];
  const events: IREventBinding[] = [];
  const refs: IRRefBinding[] = [];

  for (const prop of attributes.properties) {
    if (ts.isJsxSpreadAttribute(prop)) continue;
    if (!ts.isJsxAttribute(prop)) continue;

    const name = ts.isIdentifier(prop.name) ? prop.name.text : prop.name.getText(sourceFile);
    const loc = toLoc(prop, sourceFile);

    if (name === "ref") {
      if (prop.initializer && ts.isJsxExpression(prop.initializer) && prop.initializer.expression) {
        refs.push({
          ref: makeExpr(prop.initializer.expression, sourceFile),
          category: "element",
          loc,
        });
      }
      continue;
    }

    if (name.startsWith("on") && name.length > 2 && name[2]! >= "A" && name[2]! <= "Z") {
      if (prop.initializer && ts.isJsxExpression(prop.initializer) && prop.initializer.expression) {
        events.push({
          name,
          handler: makeExpr(prop.initializer.expression, sourceFile),
          loc,
        });
      }
      continue;
    }

    let binding: IRAttributeBinding = "normal";
    let attrName = name;

    if (name.startsWith("$bind:")) {
      binding = "twoWay";
      attrName = name.slice(6);
    } else if (name === "class" || name === "className") {
      binding = "class";
    } else if (name === "style") {
      binding = "style";
    }

    let value: IRStaticValue | IRExprNode;

    if (!prop.initializer) {
      value = staticValue(true, sourceFile, prop);
    } else if (ts.isStringLiteral(prop.initializer)) {
      value = staticValue(prop.initializer.text, sourceFile, prop.initializer);
    } else if (ts.isJsxExpression(prop.initializer) && prop.initializer.expression) {
      value = makeExpr(prop.initializer.expression, sourceFile);
    } else {
      value = staticValue(true, sourceFile, prop);
    }

    attrs.push({ name: attrName, value, binding, loc });
  }

  return { attrs, events, refs };
}
