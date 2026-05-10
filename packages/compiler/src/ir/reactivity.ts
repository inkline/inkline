import type * as ts from "typescript";

import type { SourceLocation } from "./types.ts";

/**
 * Discriminator for reactive symbols tracked in a component's scope.
 *
 * - `signal`  — values produced by `createSignal`.
 * - `memo`    — values produced by `createMemo`.
 * - `effect`  — opaque effect handle (rarely surfaces as a dep).
 * - `prop`    — fields on the component's props parameter.
 * - `context` — values pulled from a context provider (post v1).
 * - `ref`     — DOM/component refs produced by `createRef`.
 */
export type IRReactiveKind = "signal" | "memo" | "effect" | "prop" | "context" | "ref";

/**
 * A reactive identifier visible inside a component body. Indexed by its
 * resolved `ts.Symbol` so the dep extractor can recognise reads regardless
 * of binding aliasing.
 */
export interface IRReactiveSymbol {
  kind: IRReactiveKind;
  name: string;
  symbol: ts.Symbol;
  /** Setter symbol (for signals). Stored separately so it can be excluded from dep arrays. */
  setter?: ts.Symbol;
  loc: SourceLocation;
}

/**
 * One edge of the reactivity graph: a tracked read of a reactive symbol
 * inside an expression. `path` captures any property/element access chained
 * onto the reactive value (`user().profile.name` → `['profile', 'name']`).
 */
export interface IRDependency {
  symbol: ts.Symbol;
  kind: IRReactiveKind;
  /** Identifier name as used in source — preserved for codegen. */
  name: string;
  /** Nested access path beyond the call: `user().profile.name` -> ['profile', 'name']. */
  path: string[];
  /** True when read sits inside a conditional (ternary, &&, ||, ??, optional chain). */
  conditional: boolean;
}

export type IRDependencySet = readonly IRDependency[];

/**
 * Sentinel set for expressions whose deps cannot be resolved statically
 * (e.g. dynamic property access into a signal map). Frozen so accidental
 * mutation can't poison shared state.
 */
export const DYNAMIC_DEPS: IRDependencySet = Object.freeze([]);

/**
 * Output of {@link extractDeps}. `deps` is the set of tracked symbols read by
 * the expression; `isReactive` says whether *any* tracked read happened (or
 * the analyzer bailed); `isDynamic` says whether the analyzer bailed (a
 * dynamic key prevented static resolution).
 */
export interface IRDepResolution {
  deps: IRDependencySet;
  isReactive: boolean;
  isDynamic: boolean;
}

/**
 * Default resolution for expressions with no reactive reads — frozen so
 * consumers can share it without copying.
 */
export const STATIC_RESOLUTION: IRDepResolution = Object.freeze({
  deps: Object.freeze([]),
  isReactive: false,
  isDynamic: false,
});
