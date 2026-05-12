import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { DYNAMIC_DEPS } from "../../../ir/reactivity.ts";
import type {
  IRAttribute,
  IRComponent,
  IRElement,
  IREventBinding,
  IRExprNode,
} from "../../../ir/render/nodes.ts";
import { transformComponent } from "../../../ir/render/transform.ts";

interface BindingSpec {
  readonly eventName: string;
  readonly valueExpr: string;
}

function resolveBindingSpec(
  tag: string,
  attrName: string,
  attrs: readonly IRAttribute[],
): BindingSpec {
  if (attrName === "checked") {
    return { eventName: "onChange", valueExpr: "e.target.checked" };
  }

  const typeAttr = attrs.find((a) => a.name === "type" && a.value.kind === "Static");
  const inputType = typeAttr?.value.kind === "Static" ? String(typeAttr.value.value) : undefined;

  if (tag === "select") {
    return { eventName: "onChange", valueExpr: "e.target.value" };
  }

  if (inputType === "number") {
    return { eventName: "onInput", valueExpr: "e.target.valueAsNumber" };
  }

  return { eventName: "onInput", valueExpr: "e.target.value" };
}

function createHandlerExpr(setterText: string, valueExpr: string): ts.Expression {
  const code = `(e) => ${setterText}(${valueExpr})`;
  const sf = ts.createSourceFile("__synth__.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

function makeHandlerExprNode(
  setterText: string,
  valueExpr: string,
  loc: typeof UNKNOWN_LOCATION,
): IRExprNode {
  return {
    kind: "Expression",
    expr: createHandlerExpr(setterText, valueExpr),
    deps: DYNAMIC_DEPS,
    isReactive: false,
    emissionContext: "setup",
    isDynamic: false,
    loc,
  };
}

function getSetterText(binding: IRAttribute): string {
  if (binding.value.kind === "Expression") {
    return binding.value.expr.getText?.() ?? "setter";
  }
  return "setter";
}

export function twoWayBinding(component: IRComponent): IRComponent {
  return transformComponent(component, {
    enter(node) {
      if (node.kind !== "Element") return;
      const el = node;

      const twoWayAttrs = el.attrs.filter((a) => a.binding === "twoWay");
      if (twoWayAttrs.length === 0) return;

      const remainingAttrs: IRAttribute[] = [];
      const newEvents: IREventBinding[] = [...el.events];

      for (const attr of el.attrs) {
        if (attr.binding !== "twoWay") {
          remainingAttrs.push(attr);
          continue;
        }

        const spec = resolveBindingSpec(el.tag, attr.name, el.attrs);
        const setterText = getSetterText(attr);

        remainingAttrs.push({
          name: attr.name,
          value: attr.value,
          binding: "normal",
          loc: attr.loc,
        });

        newEvents.push({
          name: spec.eventName,
          handler: makeHandlerExprNode(setterText, spec.valueExpr, attr.loc),
          loc: attr.loc,
          synthesized: true,
        });
      }

      return { ...el, attrs: remainingAttrs, events: newEvents } satisfies IRElement;
    },
  });
}
