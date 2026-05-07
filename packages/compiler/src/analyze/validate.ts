import type { IRComponent, IRExpressionNode } from "../ir/nodes.ts";
import type { Diagnostic } from "../ir/types.ts";

/**
 * Source-level invariant checks. Mirrors a subset of the rules from the
 * @inkline/eslint-plugin so consumers without ESLint still get errors on the
 * cases that would silently produce broken output.
 *
 * Diagnostic codes:
 *
 * - `INK0010` — `createEffect` body reads no signals; the effect runs once.
 * - `INK0011` — `createMemo` body reads no signals; the memo never updates.
 * - `INK0020` — A reactive read uses a dynamic key; React's deps array can't
 *   represent it, so the React target degrades to a non-tracking path.
 *
 * Cycle detection (`INK0030`) is performed by the orchestration layer
 * (`compile()`), not here, because it requires the precomputed graph.
 */
export function validateComponent(component: IRComponent): Diagnostic[] {
  const out: Diagnostic[] = [];

  for (const effect of component.effects) {
    if (effect.deps.length === 0 && !effect.isDynamic) {
      out.push({
        code: "INK0010",
        severity: "warning",
        message:
          "createEffect callback reads no signals — the effect will run once and never re-run.",
        loc: effect.loc,
        help: "Move the work into setup or remove the createEffect wrapper.",
      });
    }
  }

  for (const memo of component.memos) {
    if (!memo.expr.isReactive) {
      out.push({
        code: "INK0011",
        severity: "warning",
        message: "createMemo body reads no signals — the memo never updates and can be inlined.",
        loc: memo.expr.loc,
      });
    }
  }

  for (const expr of expressionsIn(component)) {
    if (expr.isDynamic) {
      out.push({
        code: "INK0020",
        severity: "warning",
        message:
          "Reactive read uses a dynamic key. The React target will fall back to a non-tracking path.",
        loc: expr.loc,
        targets: ["react"],
      });
    }
  }

  return out;
}

/**
 * Yield every `IRExpressionNode` that participates in a component's analysis
 * surface — memo bodies, prop default values, and every expression in the
 * render tree.
 */
function* expressionsIn(component: IRComponent): IterableIterator<IRExpressionNode> {
  for (const memo of component.memos) yield memo.expr;
  for (const prop of component.props) {
    if (prop.defaultValue) yield prop.defaultValue;
  }
  yield* renderExpressions(component);
}

/**
 * Iterative walk over the render tree yielding every embedded
 * `IRExpressionNode`. We use an explicit stack rather than `walkRenderTree`
 * because we need a generator and `walkRenderTree` is a callback-driven API.
 */
function* renderExpressions(component: IRComponent): IterableIterator<IRExpressionNode> {
  const stack: IRComponent["render"][] = [component.render];
  while (stack.length) {
    // `pop()` returns IRNode | undefined per TS; the `while (stack.length)`
    // above guarantees non-undefined, so the non-null assertion is safe.
    const node = stack.pop()!;
    switch (node.kind) {
      case "Expression":
        yield node;
        break;
      case "Element":
        for (const attr of node.attrs) {
          if (attr.value.kind === "Expression") yield attr.value;
        }
        for (const evt of node.events) yield evt.handler;
        for (const ref of node.refs) yield ref.ref;
        for (const child of node.children) stack.push(child);
        break;
      case "ComponentInstance":
        for (const attr of node.attrs) {
          if (attr.value.kind === "Expression") yield attr.value;
        }
        for (const evt of node.events) yield evt.handler;
        for (const slot of node.slots) stack.push(slot.body);
        break;
      case "Fragment":
        for (const child of node.children) stack.push(child);
        break;
      case "If":
        for (const branch of node.branches) {
          yield branch.test;
          stack.push(branch.body);
        }
        if (node.fallback) stack.push(node.fallback);
        break;
      case "For":
        yield node.each;
        yield node.key;
        stack.push(node.body);
        break;
      case "Switch":
        for (const c of node.cases) {
          yield c.test;
          stack.push(c.body);
        }
        if (node.fallback) stack.push(node.fallback);
        break;
      case "SlotPlaceholder":
        for (const arg of node.scopedArgs) yield arg;
        if (node.fallback) stack.push(node.fallback);
        break;
      case "Text":
        break;
    }
  }
}
