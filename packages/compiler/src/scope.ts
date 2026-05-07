import type * as ts from "typescript";

import type { IRReactiveKind, IRReactiveSymbol } from "./ir/reactivity.ts";

/**
 * The set of reactive symbols visible inside a component body, indexed by
 * the TS Symbol that the type checker resolves identifiers to.
 *
 * The scope tracks two parallel facts:
 *
 * 1. `bySymbol` — every reactive identifier (signal, memo, effect, prop,
 *    context, ref) keyed by its `ts.Symbol`. The dep extractor consults this
 *    map to decide whether a call/access expression is a tracked read.
 * 2. `stableSetters` — the setter half of every `createSignal` registration.
 *    React's `useState` setters are reference-stable, so the React target
 *    must exclude them from `useEffect`/`useMemo` dep arrays. Storing them
 *    here lets the analyzer make that exclusion in O(1).
 *
 * Lookups happen by `ts.Symbol` identity, so all scopes that share the same
 * `ts.Program` (and therefore the same checker) compare correctly. Scopes
 * built from different programs cannot be merged.
 */
export class ReactiveScope {
  readonly bySymbol = new Map<ts.Symbol, IRReactiveSymbol>();
  readonly stableSetters = new Set<ts.Symbol>();

  /** Register a reactive symbol. If it has a setter, mark the setter stable. */
  register(symbol: IRReactiveSymbol): void {
    this.bySymbol.set(symbol.symbol, symbol);
    if (symbol.setter) {
      this.stableSetters.add(symbol.setter);
    }
  }

  has(symbol: ts.Symbol): boolean {
    return this.bySymbol.has(symbol);
  }

  get(symbol: ts.Symbol): IRReactiveSymbol | undefined {
    return this.bySymbol.get(symbol);
  }

  isStableSetter(symbol: ts.Symbol): boolean {
    return this.stableSetters.has(symbol);
  }

  /** Snapshot of every registered reactive symbol, in registration order. */
  reactiveSymbols(): IRReactiveSymbol[] {
    return Array.from(this.bySymbol.values());
  }

  /** Filtered snapshot — every reactive symbol of the given kind. */
  reactiveOfKind(kind: IRReactiveKind): IRReactiveSymbol[] {
    const out: IRReactiveSymbol[] = [];
    for (const sym of this.bySymbol.values()) {
      if (sym.kind === kind) out.push(sym);
    }
    return out;
  }
}
