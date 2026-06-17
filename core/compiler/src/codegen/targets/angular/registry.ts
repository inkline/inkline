// Angular-only whole-program component registry.
//
// The Angular target emits a component as its native element via an attribute selector
// (`<button inkButtonBase inkButton>`) instead of an `ink-*` wrapper, matching the Angular Material
// directive-on-native-element pattern. To do that, the emitter for a styled component must know the
// SHAPE of the (often cross-file) component its root instantiates — its native host tag, and whether
// it is itself an element / directive / wrapper. Classification is INFERRED from each component's
// real render root (no authoring flag), then resolved transitively across the module set.
//
// `classifyOne` produces a per-component raw classification from its render root; `resolveAngularKinds`
// walks the references transitively (cycle-safe) to finalize each component's kind, native host tag,
// and the attribute chain a consumer must stack. Both are pure; the orchestration that feeds them
// real modules lives in `buildAngularRegistry` (pipeline/compile.ts).

import * as ts from "typescript";
import type { IRAttribute, IRComponent, IRSlotContent } from "../../../ir/render/nodes.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
import { angularAttrSelector } from "./selector.ts";

/**
 * - `element`: a single static native root element → `@Component({ selector: 'TAG[inkName]' })`, the
 *   element IS the host (no wrapper, no `display:contents`).
 * - `directive`: a pure-forwarding styled component whose root instantiates an element-component →
 *   `@Directive({ selector: '[inkName]' })`, stacked onto the base element.
 * - `structural`: a styled component that injects its OWN structure into a trivial base's slot →
 *   flattened to `@Component({ selector: 'TAG[inkName]' })` (the base is inlined). Phase 2.
 * - `wrapper`: anything else (conditional / fragment / dynamic / text root, or a ref on the root) →
 *   today's `ink-*` element component with `display:contents`.
 */
export type AngularKind = "element" | "directive" | "structural" | "wrapper";

export interface AngularComponentEntry {
  readonly kind: AngularKind;
  /** element / structural / directive: the resolved native host tag (`"button"`, `"div"`, `"span"`). */
  readonly hostTag?: string;
  /** element / structural: the host element's static class (`"button"`), for the flattened class merge. */
  readonly baseClass?: string;
  /** element / structural: the host element's non-class root attrs, for re-hosting when inlined. */
  readonly rootAttrs?: readonly IRAttribute[];
  /** Attribute selectors a consumer stacks on the host, root-first (`["inkButtonBase","inkButton"]`). */
  readonly attrChain: readonly string[];
  /** Component names a consumer must add to `imports: [...]` for the whole stacked chain. */
  readonly chainComponents: readonly string[];
}

export type AngularRegistry = ReadonlyMap<string, AngularComponentEntry>;

/** The per-component classification derived from its own render root, before transitive resolution. */
export type RawClassification =
  | {
      readonly kind: "element";
      readonly hostTag: string;
      readonly baseClass?: string;
      readonly rootAttrs: readonly IRAttribute[];
    }
  | { readonly kind: "wrapper" }
  | { readonly kind: "forwarding"; readonly rootLocal: string }
  | { readonly kind: "structural"; readonly rootLocal: string };

/** Classify a component from its render root alone (no cross-component resolution yet). */
export function classifyOne(component: IRComponent): RawClassification {
  let root = component.render;
  while (root.kind === "Transition") root = root.child;

  if (root.kind === "Element") {
    // A `#ref` on the root has no host-binding form (a template ref lives in a template, and the
    // host element is reached via ElementRef injection, not `#ref`) → keep the wrapper.
    if (root.refs.length > 0) return { kind: "wrapper" };
    const classAttr = root.attrs.find((a) => a.name === "class");
    const baseClass =
      classAttr && classAttr.value.kind === "Static" ? String(classAttr.value.value) : undefined;
    const rootAttrs = root.attrs.filter((a) => a.name !== "class");
    return { kind: "element", hostTag: root.tag, baseClass, rootAttrs };
  }

  if (root.kind === "ComponentInstance") {
    const rootLocal = root.reference.getText();
    // A styled component that injects its OWN structure into the base's slot is structural; one that
    // only forwards the consumer's children (a bare <Slot>) is a pure-forwarding styling directive.
    return slotsInjectStructure(root.slots)
      ? { kind: "structural", rootLocal }
      : { kind: "forwarding", rootLocal };
  }

  // If / For / Switch / Fragment / Text / Expression / SlotPlaceholder roots have no single native
  // host element — they keep today's `ink-*` element wrapper.
  return { kind: "wrapper" };
}

/** True when the styled root instance projects its own elements/components into the base (vs. only
 *  forwarding the consumer's children through a bare <Slot>). */
function slotsInjectStructure(slots: readonly IRSlotContent[]): boolean {
  let injects = false;
  for (const slot of slots) {
    walkRenderTree(slot.body, {
      enter(node) {
        if (node.kind === "Element" || node.kind === "ComponentInstance") injects = true;
      },
    });
    if (injects) break;
  }
  return injects;
}

/**
 * Whether an element base can be flattened into a structural component: its non-class root attrs are
 * all static or pure prop-passthroughs (`<div id={props.id}>`). A transforming attr
 * (`id={props.id ?? "x"}`) is NOT flattenable — dropping it (when the styled component doesn't pass
 * it) would lose the transform — so such a base keeps the wrapper form.
 */
function isFlattenableBase(rootAttrs: readonly IRAttribute[]): boolean {
  return rootAttrs.every((a) => {
    if (a.value.kind === "Static") return true;
    const expr = a.value.expr;
    return (
      ts.isPropertyAccessExpression(expr) &&
      ts.isIdentifier(expr.expression) &&
      expr.expression.text === "props" &&
      expr.name.text === a.name
    );
  });
}

export interface RawEntry {
  readonly classification: RawClassification;
  /** Resolve a render-root instance's LOCAL import name to the referenced component's name. */
  readonly resolveLocal: (local: string) => string | undefined;
}

/**
 * Finalize every component's kind by resolving `forwarding`/`structural` candidates transitively to
 * their base's resolved kind. Cycles and unresolvable bases fall back to `wrapper` (never throws,
 * never loops). Pure: takes the raw classifications + per-component local resolvers, returns the map.
 */
export function resolveAngularKinds(entries: ReadonlyMap<string, RawEntry>): AngularRegistry {
  const WRAPPER: AngularComponentEntry = { kind: "wrapper", attrChain: [], chainComponents: [] };

  function resolve(name: string, visiting: ReadonlySet<string>): AngularComponentEntry {
    const raw = entries.get(name);
    if (!raw) return WRAPPER; // outside the scanned set (external / unknown) → safe fallback
    const c = raw.classification;

    if (c.kind === "wrapper") return WRAPPER;
    if (c.kind === "element") {
      return {
        kind: "element",
        hostTag: c.hostTag,
        baseClass: c.baseClass,
        rootAttrs: c.rootAttrs,
        attrChain: [angularAttrSelector(name)],
        chainComponents: [name],
      };
    }

    // forwarding | structural candidate — resolve the base transitively.
    if (visiting.has(name)) return WRAPPER; // cycle → safe fallback
    const targetName = raw.resolveLocal(c.rootLocal);
    const target = targetName ? resolve(targetName, new Set(visiting).add(name)) : undefined;
    if (!target) return WRAPPER;

    if (c.kind === "forwarding") {
      // A styling directive stacks onto any host-bearing base — an element, another directive, or a
      // flattened structural component: `<tag …baseChain inkSelf>`. Only a wrapper base can't stack.
      if (target.kind === "wrapper") return WRAPPER;
      return {
        kind: "directive",
        hostTag: target.hostTag,
        attrChain: [...target.attrChain, angularAttrSelector(name)],
        chainComponents: [...target.chainComponents, name],
      };
    }
    // structural: flatten the trivial element base into a self-contained @Component, so a consumer
    // stacks only this component's own selector. The base must be an `element` whose non-class root
    // attrs are all static or pure prop-passthroughs (`id={props.id}`) — then the styled component
    // simply omits any it doesn't pass, matching the base's own `?? null`, with no lost transform.
    if (target.kind !== "element" || !isFlattenableBase(target.rootAttrs ?? [])) return WRAPPER;
    return {
      kind: "structural",
      hostTag: target.hostTag,
      baseClass: target.baseClass,
      rootAttrs: target.rootAttrs,
      attrChain: [angularAttrSelector(name)],
      chainComponents: [name],
    };
  }

  const out = new Map<string, AngularComponentEntry>();
  for (const name of entries.keys()) out.set(name, resolve(name, new Set()));
  return out;
}
