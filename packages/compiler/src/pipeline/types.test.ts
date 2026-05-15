import { describe, it, expect } from "vitest";
import { pipe, type Pass, type PassContext } from "./types.ts";
import { createDiagnosticCollector } from "../core/diagnostics/collector.ts";
import { resolveOptions } from "../core/options.ts";
import { SymbolTable } from "../ir/reactivity.ts";
import { builtinRegistry } from "../codegen/registry.ts";

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

describe("pipe", () => {
  it("arity 1: returns equivalent pass", async () => {
    const double: Pass<number, number> = {
      name: "double",
      run: (n) => n * 2,
    };
    const piped = pipe(double);
    const result = await piped.run(5, makeCtx());
    expect(result).toBe(10);
  });

  it("arity 2: chains two passes", async () => {
    const double: Pass<number, number> = {
      name: "double",
      run: (n) => n * 2,
    };
    const stringify: Pass<number, string> = {
      name: "stringify",
      run: (n) => String(n),
    };
    const piped = pipe(double, stringify);
    const result = await piped.run(5, makeCtx());
    expect(result).toBe("10");
  });

  it("arity 3: chains three passes", async () => {
    const add1: Pass<number, number> = { name: "add1", run: (n) => n + 1 };
    const double: Pass<number, number> = { name: "double", run: (n) => n * 2 };
    const stringify: Pass<number, string> = { name: "stringify", run: (n) => String(n) };
    const piped = pipe(add1, double, stringify);
    const result = await piped.run(4, makeCtx());
    expect(result).toBe("10");
  });

  it("handles async passes", async () => {
    const asyncDouble: Pass<number, number> = {
      name: "asyncDouble",
      run: async (n) => n * 2,
    };
    const syncAdd: Pass<number, number> = {
      name: "syncAdd",
      run: (n) => n + 1,
    };
    const piped = pipe(asyncDouble, syncAdd);
    const result = await piped.run(5, makeCtx());
    expect(result).toBe(11);
  });

  it("name is joined with arrows", () => {
    const a: Pass<number, number> = { name: "a", run: (n) => n };
    const b: Pass<number, number> = { name: "b", run: (n) => n };
    const c: Pass<number, string> = { name: "c", run: (n) => String(n) };
    const piped = pipe(a, b, c);
    expect(piped.name).toBe("a → b → c");
  });

  it("threads PassContext through all passes", async () => {
    const names: string[] = [];
    const p1: Pass<number, number> = {
      name: "p1",
      run: (n, ctx) => {
        names.push(ctx.options.targets[0]!);
        return n;
      },
    };
    const p2: Pass<number, number> = {
      name: "p2",
      run: (n, ctx) => {
        names.push(ctx.options.outDir);
        return n;
      },
    };
    const piped = pipe(p1, p2);
    await piped.run(0, makeCtx());
    expect(names).toEqual(["react", "dist"]);
  });
});
