import type { JSX as UpstreamJSX } from "./vendor/jsx-intrinsics.js";

/**
 * Attributes Inkline owns on every intrinsic element, whatever the borrowed
 * upstream surface says about them. Each entry is a place where Inkline has a
 * real concept no upstream JSX surface can know about.
 */
type InklineOwned = {
  /** Inkline refs are `{ current }` objects, not the upstream setter/element union. */
  ref?: { current: any } | ((el: any) => void);
  /** Inkline children are compiler-opaque. */
  children?: any;
  /** List identity; lowered per target. */
  key?: any;
  /** DOM property with no HTML attribute counterpart. */
  indeterminate?: boolean;
} & {
  /** Compiler directives (`$bind:value`, `$if`, …) — unconstrained by construction. */
  [K in `$${string}`]?: any;
};

/** Keys `InklineOwned` replaces rather than widens. */
type InklineOwnedKeys = "ref" | "children" | "key";

/**
 * The seam — load-bearing, do not inline.
 *
 * `IntrinsicElements` is derived from an upstream JSX surface — today a
 * vendored copy of Solid's element types (`./vendor/jsx-intrinsics.d.ts`) — and
 * this alias is the only place that upstream is reshaped. The *shape* is the
 * contract — upstream element attributes, minus the keys Inkline redefines,
 * plus `InklineOwned` — not its current source. Swapping the vendored copy for
 * a generated Inkline-owned surface later is one line changed in the `extends`
 * clause below, with no author-visible effect. That swap has now been done
 * once, from the `solid-js` package to the vendored copy, and it cost exactly
 * that one line.
 */
type Inklinified<T> = { [K in keyof T]: Omit<T[K], InklineOwnedKeys> & InklineOwned };

export namespace JSX {
  export type Element = any;

  export interface IntrinsicElements extends Inklinified<UpstreamJSX.IntrinsicElements> {}

  export interface ElementChildrenAttribute {
    children: {};
  }
}

export function jsx(type: any, props: any, _key?: any): JSX.Element {
  return { type, props };
}

export function jsxs(type: any, props: any, _key?: any): JSX.Element {
  return { type, props };
}

export const Fragment: unique symbol = Symbol.for("inkline.fragment") as any;
