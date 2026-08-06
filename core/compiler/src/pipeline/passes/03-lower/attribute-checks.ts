import * as ts from "typescript";
import { ARIA_ATTRIBUTES } from "../../../core/aria-attributes.generated.ts";
import { suggestClosest } from "../../../core/suggest.ts";
import type { IRAttribute, IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
import type { PassContext } from "../../types.ts";
import { NATIVE_BINDINGS } from "./two-way-binding.ts";

/**
 * The two attribute-name mistakes TypeScript structurally cannot catch (RFC §2.3, probe rows 9
 * and 12):
 *
 *  - **INK0072** — an `aria-*` attribute that is not an ARIA attribute. TypeScript exempts JSX
 *    attribute names that are not valid identifiers from unknown-property checking, so
 *    `aria-hiddenn` type-checks on every element. That exemption is what makes `data-*` authoring
 *    work; it cannot be withdrawn from a type definition.
 *  - **INK0073** — a `$bind:` target the compiler has no way to write back to. The typed surface
 *    declares `` [K in `$${string}`]?: any ``, a deliberate escape hatch: directive names are the
 *    compiler's vocabulary, not the type system's.
 *
 * This runs during lowering rather than analysis because `$bind:` only exists until `twoWayBinding`
 * desugars it — by the time the analyze pass sees the tree, every `twoWay` attribute is gone.
 */

/** `["a", "b", "c"]` → `a, b and c`. */
function joinPhrase(items: readonly string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

function quotedPhrase(items: readonly string[]): string {
  return joinPhrase(items.map((item) => `"${item}"`));
}

function didYouMean(name: string, candidates: readonly string[]): string {
  const closest = suggestClosest(name, candidates);
  return closest ? `Did you mean "${closest}"? ` : "";
}

const NATIVE_BINDABLE_TAGS = Object.keys(NATIVE_BINDINGS).map((tag) => `<${tag}>`);

function checkAriaAttribute(attr: IRAttribute, ctx: PassContext): void {
  if (!attr.name.startsWith("aria-") || ARIA_ATTRIBUTES.includes(attr.name)) return;

  ctx.diagnostics.push("INK0072", attr.loc, {
    name: attr.name,
    suggestion: didYouMean(attr.name, ARIA_ATTRIBUTES),
  });
}

function checkElementBinding(tag: string, attr: IRAttribute, ctx: PassContext): void {
  // A custom element's bindable surface is defined by its own class, which the compiler cannot see.
  // Gating it would be guessing, so `<my-widget $bind:open>` stays on the ungated lowering path.
  if (tag.includes("-")) return;

  const bindings = NATIVE_BINDINGS[tag];
  if (bindings?.[attr.name]) return;

  const suggestion = bindings
    ? `${didYouMean(attr.name, Object.keys(bindings))}<${tag}> binds ${quotedPhrase(Object.keys(bindings))}.`
    : `Two-way binding on a native element is supported on ${joinPhrase(NATIVE_BINDABLE_TAGS)}. Set the attribute one-way and handle its event yourself.`;

  ctx.diagnostics.push("INK0073", attr.loc, { name: attr.name, tag, suggestion });
}

function checkComponentBinding(child: IRComponent, attr: IRAttribute, ctx: PassContext): void {
  // `$bind:x` on a component synthesizes an `update:x` handler, so either half of that contract — a
  // `defineModel("x")` or a hand-declared `update:x` event — makes the binding real.
  const models = child.models.map((model) => model.propName);
  if (
    models.includes(attr.name) ||
    child.events.some((event) => event.name === `update:${attr.name}`)
  ) {
    return;
  }

  const suggestion =
    models.length > 0
      ? `${didYouMean(attr.name, models)}<${child.name}> declares ${quotedPhrase(models)}. Bind one of those, or add defineModel("${attr.name}") to it.`
      : `<${child.name}> declares no models. Add defineModel("${attr.name}") to it.`;

  ctx.diagnostics.push("INK0073", attr.loc, { name: attr.name, tag: child.name, suggestion });
}

function checkNode(
  node: IRNode,
  localComponents: ReadonlyMap<string, IRComponent>,
  ctx: PassContext,
): void {
  if (node.kind !== "Element" && node.kind !== "ComponentInstance") return;

  for (const attr of node.attrs) {
    if (attr.binding !== "twoWay") {
      checkAriaAttribute(attr, ctx);
      continue;
    }

    if (node.kind === "Element") {
      checkElementBinding(node.tag, attr, ctx);
      continue;
    }

    // Cross-module children are skipped: their model set is not known here — the same limit INK0120
    // documents for attribute fallthrough.
    const name =
      node.resolved?.name ?? (ts.isIdentifier(node.reference) ? node.reference.text : undefined);
    const child = name === undefined ? undefined : localComponents.get(name);
    if (child) checkComponentBinding(child, attr, ctx);
  }
}

/**
 * Built once per module so `$bind:` targets can be resolved against sibling components, then run per
 * component like any other lowering. Must be ordered before `twoWayBinding`.
 */
export function attributeChecks(
  localComponents: ReadonlyMap<string, IRComponent>,
): (component: IRComponent, ctx: PassContext) => IRComponent {
  return (component, ctx) => {
    walkRenderTree(component.render, {
      enter(node) {
        checkNode(node, localComponents, ctx);
      },
    });
    return component;
  };
}
