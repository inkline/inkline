import * as ts from "typescript";
import type { IRReactiveKind, SymbolId } from "../../../ir/reactivity.ts";
import type { BindingScope } from "./deps.ts";

export class ParseBindingScope implements BindingScope {
  private readonly symbolMap = new Map<ts.Symbol, SymbolId>();
  private readonly kindMap = new Map<SymbolId, IRReactiveKind>();
  private readonly setterIds = new Set<SymbolId>();

  register(tsSymbol: ts.Symbol, id: SymbolId, kind: IRReactiveKind): void {
    this.symbolMap.set(tsSymbol, id);
    this.kindMap.set(id, kind);
  }

  markSetter(id: SymbolId): void {
    this.setterIds.add(id);
  }

  resolveSymbolId(tsSymbol: ts.Symbol): SymbolId | undefined {
    return this.symbolMap.get(tsSymbol);
  }

  kindOf(id: SymbolId): IRReactiveKind {
    return this.kindMap.get(id) ?? "signal";
  }

  isStableSetter(id: SymbolId): boolean {
    return this.setterIds.has(id);
  }
}
