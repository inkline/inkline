import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { DYNAMIC_DEPS } from "../../../ir/reactivity.ts";
import type {
  IRAttribute,
  IRComponent,
  IRElement,
  IREventBinding,
  IRExprNode,
  IRStateDeclaration,
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

function parseExpr(code: string): ts.Expression {
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
    expr: parseExpr(`(e) => ${setterText}(${valueExpr})`),
    deps: DYNAMIC_DEPS,
    isReactive: false,
    emissionContext: "setup",
    isDynamic: false,
    loc,
  };
}

interface BindingResolution {
  readonly setterText: string;
  readonly valueExpr: IRExprNode;
}

function resolveBinding(
  value: IRExprNode,
  stateBySetterName: ReadonlyMap<string, IRStateDeclaration>,
): BindingResolution {
  // §10.3 step 1: if the binding is an Identifier that names a known setter,
  // rewrite the value attribute to call the paired getter; the setter itself
  // is retained for the synthesized event handler.
  if (ts.isIdentifier(value.expr)) {
    const setterText = value.expr.text;
    const state = stateBySetterName.get(setterText);
    if (state) {
      return {
        setterText,
        valueExpr: { ...value, expr: parseExpr(`${state.name}()`) },
      };
    }
    return { setterText, valueExpr: value };
  }
  // Rare case ("the value is the same expression as the binding"): leave as-is
  // and call the binding expression as the setter in the handler.
  return { setterText: value.expr.getText(), valueExpr: value };
}

export function twoWayBinding(component: IRComponent): IRComponent {
  const stateBySetterName = new Map<string, IRStateDeclaration>(
    component.state.map((s) => [s.setterName, s]),
  );

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

        // $bind:* must be expression-valued; a static value is malformed input,
        // demote the binding and skip handler synthesis rather than emit garbage.
        if (attr.value.kind !== "Expression") {
          remainingAttrs.push({ ...attr, binding: "normal" });
          continue;
        }

        const spec = resolveBindingSpec(el.tag, attr.name, el.attrs);
        const { setterText, valueExpr } = resolveBinding(attr.value, stateBySetterName);

        remainingAttrs.push({
          name: attr.name,
          value: valueExpr,
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
