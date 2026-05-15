import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { ParseBindingScope } from "./scope.ts";
import type { SymbolId } from "../../../ir/reactivity.ts";

function makeTsSymbol(name: string): ts.Symbol {
  return { name, flags: 0 } as unknown as ts.Symbol;
}

describe("ParseBindingScope", () => {
  it("register then resolveSymbolId returns the registered ID", () => {
    const scope = new ParseBindingScope();
    const sym = makeTsSymbol("count");
    const id = "t::signal::count@0" as SymbolId;
    scope.register(sym, id, "signal");
    expect(scope.resolveSymbolId(sym)).toBe(id);
  });

  it("resolveSymbolId returns undefined for unregistered symbol", () => {
    const scope = new ParseBindingScope();
    const sym = makeTsSymbol("unknown");
    expect(scope.resolveSymbolId(sym)).toBeUndefined();
  });

  it("kindOf returns registered kind", () => {
    const scope = new ParseBindingScope();
    const sym = makeTsSymbol("x");
    const id = "t::memo::x@0" as SymbolId;
    scope.register(sym, id, "memo");
    expect(scope.kindOf(id)).toBe("memo");
  });

  it("kindOf defaults to signal for unknown ID", () => {
    const scope = new ParseBindingScope();
    expect(scope.kindOf("unknown@0" as SymbolId)).toBe("signal");
  });

  it("markSetter then isStableSetter returns true", () => {
    const scope = new ParseBindingScope();
    const id = "t::signal::setCount@0" as SymbolId;
    scope.markSetter(id);
    expect(scope.isStableSetter(id)).toBe(true);
  });

  it("isStableSetter returns false for unmarked ID", () => {
    const scope = new ParseBindingScope();
    expect(scope.isStableSetter("unknown@0" as SymbolId)).toBe(false);
  });

  it("multiple registrations do not interfere", () => {
    const scope = new ParseBindingScope();
    const symA = makeTsSymbol("a");
    const symB = makeTsSymbol("b");
    const idA = "t::signal::a@0" as SymbolId;
    const idB = "t::memo::b@10" as SymbolId;

    scope.register(symA, idA, "signal");
    scope.register(symB, idB, "memo");

    expect(scope.resolveSymbolId(symA)).toBe(idA);
    expect(scope.resolveSymbolId(symB)).toBe(idB);
    expect(scope.kindOf(idA)).toBe("signal");
    expect(scope.kindOf(idB)).toBe("memo");
  });
});
