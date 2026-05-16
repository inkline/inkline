import { describe, it, expect } from "vitest";
import { DYNAMIC_DEPS, STATIC_RESOLUTION, SymbolTable } from "./reactivity.ts";
import type { SymbolId } from "./reactivity.ts";

describe("reactivity constants", () => {
  it("DYNAMIC_DEPS is a frozen empty array", () => {
    expect(DYNAMIC_DEPS).toEqual([]);
    expect(Object.isFrozen(DYNAMIC_DEPS)).toBe(true);
  });

  it("STATIC_RESOLUTION has correct shape", () => {
    expect(STATIC_RESOLUTION).toEqual({
      deps: [],
      isReactive: false,
      isDynamic: false,
    });
  });

  it("STATIC_RESOLUTION is frozen", () => {
    expect(Object.isFrozen(STATIC_RESOLUTION)).toBe(true);
  });

  it("STATIC_RESOLUTION.deps is the same reference as DYNAMIC_DEPS", () => {
    expect(STATIC_RESOLUTION.deps).toBe(DYNAMIC_DEPS);
  });
});

const loc = { file: "test.tsx", line: 1, column: 1, offset: 0, length: 5 };
const loc2 = { file: "test.tsx", line: 2, column: 1, offset: 20, length: 5 };

describe("SymbolTable", () => {
  it("mint() returns a SymbolId with the expected format", () => {
    const table = new SymbolTable();
    const id = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc,
    });
    expect(id).toBe("test.tsx#Counter::signal::count@0");
  });

  it("get() retrieves the minted symbol", () => {
    const table = new SymbolTable();
    const id = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc,
    });
    const sym = table.get(id);
    expect(sym).toBeDefined();
    expect(sym!.id).toBe(id);
    expect(sym!.kind).toBe("signal");
    expect(sym!.name).toBe("count");
    expect(sym!.loc).toBe(loc);
  });

  it("get() returns undefined for unknown id", () => {
    const table = new SymbolTable();
    expect(table.get("nonexistent" as SymbolId)).toBeUndefined();
  });

  it("resolve() maps ts.Symbol to SymbolId", () => {
    const table = new SymbolTable();
    const mockTsSymbol = { name: "count" } as unknown as import("typescript").Symbol;
    const id = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc,
      tsSymbol: mockTsSymbol,
    });
    expect(table.resolve(mockTsSymbol)).toBe(id);
  });

  it("resolve() returns undefined for unregistered ts.Symbol", () => {
    const table = new SymbolTable();
    const mockTsSymbol = { name: "x" } as unknown as import("typescript").Symbol;
    expect(table.resolve(mockTsSymbol)).toBeUndefined();
  });

  it("forComponent() returns symbols for a specific component", () => {
    const table = new SymbolTable();
    const id1 = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc,
    });
    const id2 = table.mint({
      componentId: "test.tsx#Counter",
      kind: "memo",
      name: "doubled",
      loc: loc2,
    });
    table.mint({
      componentId: "test.tsx#Other",
      kind: "signal",
      name: "value",
      loc,
    });

    const symbols = table.forComponent("test.tsx#Counter");
    expect(symbols).toHaveLength(2);
    expect(symbols.map((s) => s.id)).toEqual([id1, id2]);
  });

  it("forComponent() returns empty for unknown component", () => {
    const table = new SymbolTable();
    expect(table.forComponent("unknown")).toEqual([]);
  });

  it("linkSetter() establishes getter-setter relationship", () => {
    const table = new SymbolTable();
    const getterId = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc,
    });
    const setterId = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "setCount",
      loc: loc2,
    });
    table.linkSetter(getterId, setterId);

    expect(table.setterOf(getterId)).toBe(setterId);
  });

  it("linkSetter() updates the getter symbol's setterId", () => {
    const table = new SymbolTable();
    const getterId = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc,
    });
    const setterId = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "setCount",
      loc: loc2,
    });
    table.linkSetter(getterId, setterId);

    const sym = table.get(getterId);
    expect(sym!.setterId).toBe(setterId);
  });

  it("setterOf() returns undefined when no setter linked", () => {
    const table = new SymbolTable();
    const id = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc,
    });
    expect(table.setterOf(id)).toBeUndefined();
  });

  it("mint() throws on duplicate id", () => {
    const table = new SymbolTable();
    table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc,
    });
    expect(() =>
      table.mint({
        componentId: "test.tsx#Counter",
        kind: "signal",
        name: "count",
        loc,
      }),
    ).toThrow("duplicate id");
  });

  it("freeze() prevents further minting", () => {
    const table = new SymbolTable();
    table.freeze();
    expect(() =>
      table.mint({
        componentId: "test.tsx#Counter",
        kind: "signal",
        name: "count",
        loc,
      }),
    ).toThrow("frozen");
  });

  it("freeze() prevents linkSetter", () => {
    const table = new SymbolTable();
    const id = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc,
    });
    table.freeze();
    expect(() => table.linkSetter(id, id)).toThrow("frozen");
  });

  it("mints distinct ids for different locations", () => {
    const table = new SymbolTable();
    const id1 = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc,
    });
    const id2 = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "count",
      loc: loc2,
    });
    expect(id1).not.toBe(id2);
  });

  it("mints distinct ids for different kinds", () => {
    const table = new SymbolTable();
    const id1 = table.mint({
      componentId: "test.tsx#Counter",
      kind: "signal",
      name: "x",
      loc,
    });
    const id2 = table.mint({
      componentId: "test.tsx#Counter",
      kind: "memo",
      name: "x",
      loc,
    });
    expect(id1).not.toBe(id2);
  });

  it("mints distinct ids for different components", () => {
    const table = new SymbolTable();
    const id1 = table.mint({
      componentId: "a.tsx#A",
      kind: "signal",
      name: "x",
      loc,
    });
    const id2 = table.mint({
      componentId: "b.tsx#B",
      kind: "signal",
      name: "x",
      loc,
    });
    expect(id1).not.toBe(id2);
  });

  it("forComponent() returns empty array for orphaned symbol IDs", () => {
    const table = new SymbolTable();
    const id = table.mint({
      componentId: "test.tsx#A",
      kind: "signal",
      name: "x",
      loc,
    });
    (table as any).symbols.delete(id);
    expect(table.forComponent("test.tsx#A")).toHaveLength(0);
  });
});
