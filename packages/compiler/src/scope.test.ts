import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import type { IRReactiveKind, IRReactiveSymbol } from "./ir/reactivity.ts";
import { UNKNOWN_LOCATION } from "./ir/types.ts";
import { ReactiveScope } from "./scope.ts";

const stubSymbol = (name: string): ts.Symbol =>
  ({
    name,
    flags: 0,
    declarations: [],
  }) as unknown as ts.Symbol;

const reactive = (name: string, kind: IRReactiveKind, setter?: ts.Symbol): IRReactiveSymbol => ({
  kind,
  name,
  symbol: stubSymbol(name),
  setter,
  loc: UNKNOWN_LOCATION,
});

describe("ReactiveScope", () => {
  it("starts empty", () => {
    const scope = new ReactiveScope();
    expect(scope.bySymbol.size).toBe(0);
    expect(scope.stableSetters.size).toBe(0);
    expect(scope.reactiveSymbols()).toEqual([]);
  });

  it("registers a signal with its setter as stable", () => {
    const setterSym = stubSymbol("setCount");
    const sig = reactive("count", "signal", setterSym);
    const scope = new ReactiveScope();
    scope.register(sig);
    expect(scope.has(sig.symbol)).toBe(true);
    expect(scope.get(sig.symbol)).toBe(sig);
    expect(scope.isStableSetter(setterSym)).toBe(true);
  });

  it("registers a memo, effect, prop, ref without affecting stable setters", () => {
    const scope = new ReactiveScope();
    const memo = reactive("doubled", "memo");
    const effect = reactive("logger", "effect");
    const prop = reactive("label", "prop");
    const ref = reactive("inputRef", "ref");
    scope.register(memo);
    scope.register(effect);
    scope.register(prop);
    scope.register(ref);
    expect(scope.bySymbol.size).toBe(4);
    expect(scope.stableSetters.size).toBe(0);
    expect(scope.isStableSetter(memo.symbol)).toBe(false);
    expect(scope.isStableSetter(effect.symbol)).toBe(false);
    expect(scope.isStableSetter(prop.symbol)).toBe(false);
    expect(scope.isStableSetter(ref.symbol)).toBe(false);
  });

  it("returns undefined for symbols it does not know", () => {
    const scope = new ReactiveScope();
    expect(scope.has(stubSymbol("missing"))).toBe(false);
    expect(scope.get(stubSymbol("missing"))).toBeUndefined();
    expect(scope.isStableSetter(stubSymbol("missing"))).toBe(false);
  });

  it("returns reactiveSymbols in registration order", () => {
    const scope = new ReactiveScope();
    const a = reactive("a", "signal", stubSymbol("setA"));
    const b = reactive("b", "memo");
    const c = reactive("c", "ref");
    scope.register(a);
    scope.register(b);
    scope.register(c);
    expect(scope.reactiveSymbols()).toEqual([a, b, c]);
  });

  it("filters reactiveOfKind by kind", () => {
    const scope = new ReactiveScope();
    const s1 = reactive("a", "signal", stubSymbol("setA"));
    const s2 = reactive("b", "signal", stubSymbol("setB"));
    const m = reactive("d", "memo");
    const p = reactive("p", "prop");
    scope.register(s1);
    scope.register(m);
    scope.register(s2);
    scope.register(p);
    expect(scope.reactiveOfKind("signal")).toEqual([s1, s2]);
    expect(scope.reactiveOfKind("memo")).toEqual([m]);
    expect(scope.reactiveOfKind("prop")).toEqual([p]);
    expect(scope.reactiveOfKind("ref")).toEqual([]);
    expect(scope.reactiveOfKind("effect")).toEqual([]);
    expect(scope.reactiveOfKind("context")).toEqual([]);
  });

  it("re-registering the same symbol overwrites the existing entry", () => {
    const scope = new ReactiveScope();
    const sym = stubSymbol("x");
    const first: IRReactiveSymbol = {
      kind: "signal",
      name: "x",
      symbol: sym,
      loc: UNKNOWN_LOCATION,
    };
    const second: IRReactiveSymbol = {
      kind: "memo",
      name: "x",
      symbol: sym,
      loc: UNKNOWN_LOCATION,
    };
    scope.register(first);
    scope.register(second);
    expect(scope.bySymbol.size).toBe(1);
    expect(scope.get(sym)).toBe(second);
  });
});
