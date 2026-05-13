import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import type { IRReactiveKind, SymbolId } from "../../../ir/reactivity.ts";
import { extractDeps, type BindingScope } from "./deps.ts";

function createTestEnv(
  bindings: Record<string, { kind: IRReactiveKind; isSetter?: boolean }>,
  exprCode: string,
) {
  const names = Object.keys(bindings);
  const decls = names.map((n) => `declare const ${n}: any;`).join("\n");
  const source = `${decls}\nconst __expr__ = ${exprCode};`;

  const sf = ts.createSourceFile("test.tsx", source, ts.ScriptTarget.Latest, true);

  const host: ts.CompilerHost = {
    getSourceFile: (name) => (name === "test.tsx" ? sf : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => "/",
    getCanonicalFileName: (f) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => name === "test.tsx",
    readFile: (name) => (name === "test.tsx" ? source : undefined),
  };
  const program = ts.createProgram(["test.tsx"], { noEmit: true, strict: false }, host);
  const checker = program.getTypeChecker();

  const symbolMap = new Map<ts.Symbol, { id: SymbolId; kind: IRReactiveKind; isSetter: boolean }>();
  const idToKind = new Map<SymbolId, IRReactiveKind>();
  const setterIds = new Set<SymbolId>();

  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue;
      const name = decl.name.text;
      if (name === "__expr__" || !bindings[name]) continue;
      const sym = checker.getSymbolAtLocation(decl.name);
      if (!sym) continue;
      const id = `test::${bindings[name]!.kind}::${name}@0` as SymbolId;
      symbolMap.set(sym, {
        id,
        kind: bindings[name]!.kind,
        isSetter: bindings[name]!.isSetter ?? false,
      });
      idToKind.set(id, bindings[name]!.kind);
      if (bindings[name]!.isSetter) setterIds.add(id);
    }
  }

  const scope: BindingScope = {
    resolveSymbolId: (sym) => symbolMap.get(sym)?.id,
    kindOf: (id) => idToKind.get(id) ?? "signal",
    isStableSetter: (id) => setterIds.has(id),
  };

  const lastStmt = sf.statements[sf.statements.length - 1]!;
  const exprDecl = (lastStmt as ts.VariableStatement).declarationList.declarations[0]!;
  const expr = exprDecl.initializer!;

  return { checker, scope, expr };
}

describe("extractDeps", () => {
  it("detects zero-arg call as reactive read", () => {
    const { checker, scope, expr } = createTestEnv({ count: { kind: "signal" } }, "count()");
    const result = extractDeps(expr, scope, checker);
    expect(result.isReactive).toBe(true);
    expect(result.deps).toHaveLength(1);
    expect(result.deps[0]!.name).toBe("count");
    expect(result.deps[0]!.kind).toBe("signal");
    expect(result.deps[0]!.conditional).toBe(false);
  });

  it("ignores calls with arguments", () => {
    const { checker, scope, expr } = createTestEnv({ fn: { kind: "signal" } }, "fn(42)");
    const result = extractDeps(expr, scope, checker);
    expect(result.deps).toHaveLength(0);
  });

  it("excludes stable setters from deps", () => {
    const { checker, scope, expr } = createTestEnv(
      { setCount: { kind: "signal", isSetter: true } },
      "setCount()",
    );
    const result = extractDeps(expr, scope, checker);
    expect(result.deps).toHaveLength(0);
  });

  it("extracts property access path", () => {
    const { checker, scope, expr } = createTestEnv({ props: { kind: "prop" } }, "props.user.name");
    const result = extractDeps(expr, scope, checker);
    expect(result.deps).toHaveLength(1);
    expect(result.deps[0]!.path).toEqual(["user", "name"]);
    expect(result.deps[0]!.kind).toBe("prop");
  });

  it("marks dynamic element access", () => {
    const { checker, scope, expr } = createTestEnv(
      { items: { kind: "signal" }, idx: { kind: "signal" } },
      "items[idx]",
    );
    const result = extractDeps(expr, scope, checker);
    expect(result.isDynamic).toBe(true);
  });

  it("marks ternary branches as conditional", () => {
    const { checker, scope, expr } = createTestEnv(
      { a: { kind: "signal" }, b: { kind: "signal" }, c: { kind: "signal" } },
      "a() ? b() : c()",
    );
    const result = extractDeps(expr, scope, checker);

    const depA = result.deps.find((d) => d.name === "a")!;
    const depB = result.deps.find((d) => d.name === "b")!;
    const depC = result.deps.find((d) => d.name === "c")!;
    expect(depA.conditional).toBe(false);
    expect(depB.conditional).toBe(true);
    expect(depC.conditional).toBe(true);
  });

  it("marks right side of && as conditional", () => {
    const { checker, scope, expr } = createTestEnv(
      { a: { kind: "signal" }, b: { kind: "signal" } },
      "a() && b()",
    );
    const result = extractDeps(expr, scope, checker);

    const depA = result.deps.find((d) => d.name === "a")!;
    const depB = result.deps.find((d) => d.name === "b")!;
    expect(depA.conditional).toBe(false);
    expect(depB.conditional).toBe(true);
  });

  it("marks right side of || as conditional", () => {
    const { checker, scope, expr } = createTestEnv(
      { a: { kind: "signal" }, b: { kind: "signal" } },
      "a() || b()",
    );
    const result = extractDeps(expr, scope, checker);

    const depA = result.deps.find((d) => d.name === "a")!;
    const depB = result.deps.find((d) => d.name === "b")!;
    expect(depA.conditional).toBe(false);
    expect(depB.conditional).toBe(true);
  });

  it("marks right side of ?? as conditional", () => {
    const { checker, scope, expr } = createTestEnv(
      { a: { kind: "signal" }, b: { kind: "signal" } },
      "a() ?? b()",
    );
    const result = extractDeps(expr, scope, checker);
    expect(result.deps.find((d) => d.name === "b")!.conditional).toBe(true);
  });

  it("does not enter function bodies", () => {
    const { checker, scope, expr } = createTestEnv({ count: { kind: "signal" } }, "() => count()");
    const result = extractDeps(expr, scope, checker);
    expect(result.deps).toHaveLength(0);
  });

  it("deduplicates by symbolId and path", () => {
    const { checker, scope, expr } = createTestEnv(
      { count: { kind: "signal" } },
      "count() + count()",
    );
    const result = extractDeps(expr, scope, checker);
    expect(result.deps).toHaveLength(1);
  });

  it("unconditional wins over conditional in dedup", () => {
    const { checker, scope, expr } = createTestEnv(
      { a: { kind: "signal" }, b: { kind: "signal" } },
      "a() + (b() ? a() : 0)",
    );
    const result = extractDeps(expr, scope, checker);
    const depA = result.deps.find((d) => d.name === "a")!;
    expect(depA.conditional).toBe(false);
  });

  it("returns static resolution for expressions with no reactive reads", () => {
    const { checker, scope, expr } = createTestEnv({}, "1 + 2");
    const result = extractDeps(expr, scope, checker);
    expect(result.isReactive).toBe(false);
    expect(result.isDynamic).toBe(false);
    expect(result.deps).toHaveLength(0);
  });

  it("ignores unresolved identifiers", () => {
    const { checker, scope, expr } = createTestEnv({ count: { kind: "signal" } }, "unknown()");
    const result = extractDeps(expr, scope, checker);
    expect(result.deps).toHaveLength(0);
  });

  it("handles late-declared signal (two-pass correctness)", () => {
    const { checker, scope, expr } = createTestEnv(
      { a: { kind: "signal" }, b: { kind: "signal" } },
      "a() + b()",
    );
    const result = extractDeps(expr, scope, checker);
    expect(result.deps).toHaveLength(2);
    expect(result.deps.map((d) => d.name).sort()).toEqual(["a", "b"]);
  });

  it("handles nested property access on reactive root", () => {
    const { checker, scope, expr } = createTestEnv(
      { props: { kind: "prop" } },
      "props.a + props.b",
    );
    const result = extractDeps(expr, scope, checker);
    expect(result.deps).toHaveLength(2);
    expect(result.deps.map((d) => d.path)).toEqual([["a"], ["b"]]);
  });

  it("detects signal call inside property access chain", () => {
    const { checker, scope, expr } = createTestEnv({ user: { kind: "signal" } }, "user().name");
    const result = extractDeps(expr, scope, checker);
    expect(result.isReactive).toBe(true);
    expect(result.deps).toHaveLength(1);
    expect(result.deps[0]!.name).toBe("user");
  });
});
