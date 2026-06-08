import * as ts from "typescript";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";
import { DYNAMIC_DEPS } from "../../../ir/reactivity.ts";
import type {
  IRAttribute,
  IRComponent,
  IRComponentInstance,
  IRElement,
  IREventBinding,
  IRExprNode,
  IRStateDeclaration,
} from "../../../ir/render/nodes.ts";
import { transformComponent } from "../../../ir/render/transform.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";

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

// A component emits the already-unwrapped value (the child did its own `e.target.value` extraction),
// so the parent handler forwards the payload directly — `(v) => setX(v)`, not `(e) => setX(e.target…)`.
function makeComponentHandlerExprNode(
  setterText: string,
  loc: typeof UNKNOWN_LOCATION,
): IRExprNode {
  return {
    kind: "Expression",
    expr: parseExpr(`(v) => ${setterText}(v)`),
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
  stateByGetterName: ReadonlyMap<string, IRStateDeclaration>,
  stateBySetterName: ReadonlyMap<string, IRStateDeclaration>,
): BindingResolution {
  if (ts.isIdentifier(value.expr)) {
    const ident = value.expr.text;
    // Getter convention (preferred): `$bind:value={text}` where `text` is the signal getter. Read it
    // as `text()` in the value attribute; drive the handler with its linked setter.
    const byGetter = stateByGetterName.get(ident);
    if (byGetter) {
      return {
        setterText: byGetter.setterName,
        valueExpr: { ...value, expr: parseExpr(`${byGetter.name}()`) },
      };
    }
    // Setter convention (back-compat): `$bind:value={setText}` rewrites the value to the paired getter.
    const bySetter = stateBySetterName.get(ident);
    if (bySetter) {
      return {
        setterText: ident,
        valueExpr: { ...value, expr: parseExpr(`${bySetter.name}()`) },
      };
    }
    return { setterText: ident, valueExpr: value };
  }
  // Rare case ("the value is the same expression as the binding"): leave as-is and call the binding
  // expression as the setter in the handler.
  return { setterText: value.expr.getText(), valueExpr: value };
}

export function twoWayBinding(component: IRComponent): IRComponent {
  const stateBySetterName = new Map<string, IRStateDeclaration>(
    component.state.map((s) => [s.setterName, s]),
  );
  const stateByGetterName = new Map<string, IRStateDeclaration>(
    component.state.map((s) => [s.name, s]),
  );

  const lowered = transformComponent(component, {
    enter(node) {
      if (node.kind === "Element" || node.kind === "ComponentInstance") {
        return lowerTwoWayNode(node, stateByGetterName, stateBySetterName);
      }
      return;
    },
  });

  assertNoTwoWayBindings(lowered);
  return lowered;
}

// Desugars every `$bind:*` on an element or component instance into a normal value attribute plus a
// synthesized event. Native elements get the native `onInput`/`onChange` handler that extracts the DOM
// value; component instances get a synthesized `update:<prop>` event (marked with `twoWayProp`) that
// forwards the emitted payload to the bound setter.
function lowerTwoWayNode(
  node: IRElement | IRComponentInstance,
  stateByGetterName: ReadonlyMap<string, IRStateDeclaration>,
  stateBySetterName: ReadonlyMap<string, IRStateDeclaration>,
): IRElement | IRComponentInstance | undefined {
  if (!node.attrs.some((a) => a.binding === "twoWay")) return undefined;

  const remainingAttrs: IRAttribute[] = [];
  const newEvents: IREventBinding[] = [...node.events];

  for (const attr of node.attrs) {
    if (attr.binding !== "twoWay") {
      remainingAttrs.push(attr);
      continue;
    }

    // $bind:* must be expression-valued; a static value is malformed input, so demote the binding and
    // skip handler synthesis rather than emit garbage.
    if (attr.value.kind !== "Expression") {
      remainingAttrs.push({ ...attr, binding: "normal" });
      continue;
    }

    const { setterText, valueExpr } = resolveBinding(
      attr.value,
      stateByGetterName,
      stateBySetterName,
    );

    remainingAttrs.push({ name: attr.name, value: valueExpr, binding: "normal", loc: attr.loc });

    if (node.kind === "ComponentInstance") {
      newEvents.push({
        name: `update:${attr.name}`,
        handler: makeComponentHandlerExprNode(setterText, attr.loc),
        loc: attr.loc,
        synthesized: true,
        twoWayProp: attr.name,
      });
    } else {
      const spec = resolveBindingSpec(node.tag, attr.name, node.attrs);
      newEvents.push({
        name: spec.eventName,
        handler: makeHandlerExprNode(setterText, spec.valueExpr, attr.loc),
        loc: attr.loc,
        synthesized: true,
      });
    }
  }

  return { ...node, attrs: remainingAttrs, events: newEvents };
}

// Invariant: every `$bind:` must be desugared by this pass. A surviving `twoWay` attribute would be
// silently emitted as a one-way attribute by codegen — a compiler bug, not user error.
function assertNoTwoWayBindings(component: IRComponent): void {
  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind !== "Element" && node.kind !== "ComponentInstance") return;
      for (const attr of node.attrs) {
        if (attr.binding === "twoWay") {
          throw new Error(
            `Internal compiler error: unlowered two-way binding "$bind:${attr.name}" survived lowering`,
          );
        }
      }
    },
  });
}
