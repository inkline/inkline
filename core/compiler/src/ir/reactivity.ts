import type * as ts from "typescript";
import type { SourceLocation } from "./types.ts";

export type SymbolId = string & { readonly __brand: unique symbol };

export type IRReactiveKind = "signal" | "memo" | "effect" | "prop" | "context" | "ref";

export interface IRReactiveSymbol {
  readonly id: SymbolId;
  readonly kind: IRReactiveKind;
  readonly name: string;
  readonly setterId?: SymbolId;
  readonly loc: SourceLocation;
}

export interface IRDependency {
  readonly symbolId: SymbolId;
  readonly kind: IRReactiveKind;
  readonly name: string;
  readonly path: readonly string[];
  readonly conditional: boolean;
}

export type IRDependencySet = readonly IRDependency[];

export interface IRDepResolution {
  readonly deps: IRDependencySet;
  readonly isReactive: boolean;
  readonly isDynamic: boolean;
}

export const DYNAMIC_DEPS: IRDependencySet = Object.freeze([]);

export const STATIC_RESOLUTION: IRDepResolution = Object.freeze({
  deps: DYNAMIC_DEPS,
  isReactive: false,
  isDynamic: false,
});

interface MutableSymbol {
  id: SymbolId;
  kind: IRReactiveKind;
  name: string;
  setterId?: SymbolId;
  loc: SourceLocation;
}

export class SymbolTable {
  private readonly symbols = new Map<SymbolId, MutableSymbol>();
  private readonly tsMap = new Map<ts.Symbol, SymbolId>();
  private readonly componentMap = new Map<string, SymbolId[]>();
  private readonly setterMap = new Map<SymbolId, SymbolId>();
  private frozen = false;

  mint(args: {
    componentId: string;
    kind: IRReactiveKind;
    name: string;
    loc: SourceLocation;
    tsSymbol?: ts.Symbol;
  }): SymbolId {
    if (this.frozen) throw new Error("SymbolTable is frozen");

    const id = `${args.componentId}::${args.kind}::${args.name}@${args.loc.offset}` as SymbolId;

    if (this.symbols.has(id)) {
      throw new Error(`SymbolTable: duplicate id ${id}`);
    }

    this.symbols.set(id, {
      id,
      kind: args.kind,
      name: args.name,
      loc: args.loc,
    });

    if (args.tsSymbol) {
      this.tsMap.set(args.tsSymbol, id);
    }

    const list = this.componentMap.get(args.componentId);
    if (list) {
      list.push(id);
    } else {
      this.componentMap.set(args.componentId, [id]);
    }

    return id;
  }

  linkSetter(getterId: SymbolId, setterId: SymbolId): void {
    if (this.frozen) throw new Error("SymbolTable is frozen");
    const getter = this.symbols.get(getterId);
    if (getter) getter.setterId = setterId;
    this.setterMap.set(getterId, setterId);
  }

  resolve(tsSymbol: ts.Symbol): SymbolId | undefined {
    return this.tsMap.get(tsSymbol);
  }

  get(id: SymbolId): IRReactiveSymbol | undefined {
    return this.symbols.get(id);
  }

  forComponent(componentId: string): readonly IRReactiveSymbol[] {
    const ids = this.componentMap.get(componentId);
    if (!ids) return [];
    return ids
      .map((id) => this.symbols.get(id))
      .filter((s): s is IRReactiveSymbol => s !== undefined);
  }

  setterOf(getterId: SymbolId): SymbolId | undefined {
    return this.setterMap.get(getterId);
  }

  freeze(): void {
    this.frozen = true;
  }
}
