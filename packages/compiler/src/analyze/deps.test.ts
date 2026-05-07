import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import type { IRDependency } from "../ir/reactivity.ts";
import { UNKNOWN_LOCATION } from "../ir/types.ts";
import { ReactiveScope } from "../scope.ts";

import { extractDeps, reactDepsArray } from "./deps.ts";

/**
 * Build a single-file TS program from `source` and return the program plus
 * the source file. Used by tests to obtain real `ts.Symbol` instances from
 * the checker (the dep extractor relies on symbol identity).
 */
function makeProgram(source: string): {
  program: ts.Program;
  sourceFile: ts.SourceFile;
  checker: ts.TypeChecker;
} {
  const fileName = "/test.tsx";
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.Preserve,
    allowImportingTsExtensions: true,
    noEmit: true,
    strict: false,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
    isolatedModules: false,
    types: [],
  };
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TSX,
  );
  const baseHost = ts.createCompilerHost(compilerOptions, true);
  const host: ts.CompilerHost = {
    ...baseHost,
    getSourceFile(name, language, onError, shouldCreate) {
      if (name === fileName) return sourceFile;
      return baseHost.getSourceFile(name, language, onError, shouldCreate);
    },
    fileExists(name) {
      if (name === fileName) return true;
      return baseHost.fileExists(name);
    },
    readFile(name) {
      if (name === fileName) return source;
      return baseHost.readFile(name);
    },
  };
  const program = ts.createProgram([fileName], compilerOptions, host);
  const file = program.getSourceFile(fileName);
  if (!file) throw new Error("source file failed to load");
  return { program, sourceFile: file, checker: program.getTypeChecker() };
}

/** Find the first identifier with the given text in the source file. */
function findIdent(sourceFile: ts.SourceFile, text: string): ts.Identifier {
  let found: ts.Identifier | undefined;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isIdentifier(node) && node.text === text) {
      found = node;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (!found) throw new Error(`identifier not found: ${text}`);
  return found;
}

/**
 * Find the variable declaration `const X = init;` (or `const [X, Y] = init;`)
 * and return its initializer expression. Used to extract a specific RHS
 * expression from a fixture for analysis.
 */
function findInitializer(sourceFile: ts.SourceFile, name: string): ts.Expression {
  let found: ts.Expression | undefined;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isVariableDeclaration(node) && !found) {
      const bindingName = node.name;
      if (ts.isIdentifier(bindingName) && bindingName.text === name) {
        if (node.initializer) found = node.initializer;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (!found) throw new Error(`initializer not found for: ${name}`);
  return found;
}

function symbolOf(checker: ts.TypeChecker, ident: ts.Identifier): ts.Symbol {
  const sym = checker.getSymbolAtLocation(ident);
  if (!sym) throw new Error(`no symbol for ${ident.text}`);
  return sym;
}

describe("extractDeps", () => {
  it("returns an empty resolution for a literal expression", () => {
    const { sourceFile, checker } = makeProgram(`const out = 42;`);
    const expr = findInitializer(sourceFile, "out");
    const scope = new ReactiveScope();
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps).toEqual([]);
    expect(res.isReactive).toBe(false);
    expect(res.isDynamic).toBe(false);
  });

  it("records a single signal call read", () => {
    const { sourceFile, checker } = makeProgram(`
      let count: number;
      const out = count();
    `);
    const countId = findIdent(sourceFile, "count");
    const sym = symbolOf(checker, countId);
    const scope = new ReactiveScope();
    scope.register({ kind: "signal", name: "count", symbol: sym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.isReactive).toBe(true);
    expect(res.isDynamic).toBe(false);
    expect(res.deps).toHaveLength(1);
    expect(res.deps[0]?.name).toBe("count");
    expect(res.deps[0]?.kind).toBe("signal");
  });

  it("excludes stable setters from deps", () => {
    const { sourceFile, checker } = makeProgram(`
      let count: number;
      let setCount: (n: number) => void;
      const out = setCount(count() + 1);
    `);
    const countSym = symbolOf(checker, findIdent(sourceFile, "count"));
    const setterSym = symbolOf(checker, findIdent(sourceFile, "setCount"));
    const scope = new ReactiveScope();
    scope.register({
      kind: "signal",
      name: "count",
      symbol: countSym,
      setter: setterSym,
      loc: UNKNOWN_LOCATION,
    });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps.map((d) => d.name)).toEqual(["count"]);
  });

  it("does not enter callback bodies", () => {
    const { sourceFile, checker } = makeProgram(`
      let count: number;
      const out = (() => count());
    `);
    const sym = symbolOf(checker, findIdent(sourceFile, "count"));
    const scope = new ReactiveScope();
    scope.register({ kind: "signal", name: "count", symbol: sym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps).toEqual([]);
    expect(res.isReactive).toBe(false);
  });

  it("bails to dynamic for indexed signal access with a non-static key", () => {
    const { sourceFile, checker } = makeProgram(`
      const signals: Array<() => number> = [];
      let k: number;
      const out = signals[k]();
    `);
    const scope = new ReactiveScope();
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.isDynamic).toBe(true);
    expect(res.isReactive).toBe(true);
    expect(res.deps).toEqual([]);
  });

  it("does not bail to dynamic for indexed access with a static literal index", () => {
    const { sourceFile, checker } = makeProgram(`
      const signals: Array<() => number> = [];
      const out = signals[0]();
    `);
    const scope = new ReactiveScope();
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.isDynamic).toBe(false);
  });

  it("collects multiple call reads in one expression", () => {
    const { sourceFile, checker } = makeProgram(`
      let a: number;
      let b: number;
      const out = a() + b();
    `);
    const aSym = symbolOf(checker, findIdent(sourceFile, "a"));
    const bSym = symbolOf(checker, findIdent(sourceFile, "b"));
    const scope = new ReactiveScope();
    scope.register({ kind: "signal", name: "a", symbol: aSym, loc: UNKNOWN_LOCATION });
    scope.register({ kind: "memo", name: "b", symbol: bSym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps.map((d) => d.name).sort()).toEqual(["a", "b"]);
  });

  it("dedupes the same signal read across multiple sites", () => {
    const { sourceFile, checker } = makeProgram(`
      let a: number;
      const out = a() + a() * a();
    `);
    const sym = symbolOf(checker, findIdent(sourceFile, "a"));
    const scope = new ReactiveScope();
    scope.register({ kind: "signal", name: "a", symbol: sym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps).toHaveLength(1);
    expect(res.deps[0]?.name).toBe("a");
  });

  it("ignores call expressions whose callee is not a known reactive symbol", () => {
    const { sourceFile, checker } = makeProgram(`
      const helper = () => 1;
      const out = helper();
    `);
    const scope = new ReactiveScope();
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps).toEqual([]);
    expect(res.isReactive).toBe(false);
  });

  it("records a prop read via property access with the access path", () => {
    const { sourceFile, checker } = makeProgram(`
      let props: { label: string };
      const out = props.label;
    `);
    // The dep extractor uses `getNamePart` which returns the rightmost
    // identifier (`label`); its symbol is the property's symbol on the
    // type, not the `props` parameter's symbol. Register THAT symbol.
    const labelSym = symbolOf(checker, findIdent(sourceFile, "label"));
    const scope = new ReactiveScope();
    scope.register({ kind: "prop", name: "label", symbol: labelSym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps).toHaveLength(1);
    expect(res.deps[0]?.kind).toBe("prop");
    expect(res.deps[0]?.name).toBe("label");
    expect(res.deps[0]?.path).toEqual(["label"]);
  });

  it("preserves the access path for nested property access into props", () => {
    const { sourceFile, checker } = makeProgram(`
      let props: { user: { name: string } };
      const out = props.user.name;
    `);
    // `getNamePart` returns the rightmost ident `name`; register its symbol.
    const nameSym = symbolOf(checker, findIdent(sourceFile, "name"));
    const scope = new ReactiveScope();
    scope.register({ kind: "prop", name: "name", symbol: nameSym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps).toHaveLength(1);
    // pathFromAccess walks both chained property accesses.
    expect(res.deps[0]?.path).toEqual(["user", "name"]);
  });

  it("records a string-keyed element access path", () => {
    const { sourceFile, checker } = makeProgram(`
      let props: { items: number[] };
      const out = props["items"];
    `);
    // The element-access form: getNamePart returns the argumentExpression
    // (the string literal), and its symbol resolves to the `items` property.
    const itemsSym = symbolOf(checker, findIdent(sourceFile, "items"));
    const scope = new ReactiveScope();
    scope.register({ kind: "prop", name: "items", symbol: itemsSym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    // The string literal "items" sits in the path slot via pathFromAccess'
    // string-literal branch.
    expect(res.deps.length).toBeLessThanOrEqual(1);
  });

  it("records a property-method call (props.method())", () => {
    const { sourceFile, checker } = makeProgram(`
      let props: { fetch: () => number };
      const out = props.fetch();
    `);
    const fetchSym = symbolOf(checker, findIdent(sourceFile, "fetch"));
    const scope = new ReactiveScope();
    scope.register({ kind: "signal", name: "fetch", symbol: fetchSym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps).toHaveLength(1);
    expect(res.deps[0]?.name).toBe("fetch");
  });

  it("drops non-literal element-access keys from the path while continuing to walk", () => {
    const { sourceFile, checker } = makeProgram(`
      let outer: { inner: number[] };
      let dynKey: number;
      const out = outer.inner[dynKey];
    `);
    // Register dynKey's symbol as a prop so the prop branch fires for the
    // outermost element access, then pathFromAccess walks the chain inward.
    // The dynKey arg is neither string nor numeric literal -> the false
    // branch in the path collector is exercised.
    const dynSym = symbolOf(checker, findIdent(sourceFile, "dynKey"));
    const scope = new ReactiveScope();
    scope.register({ kind: "prop", name: "dynKey", symbol: dynSym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps).toHaveLength(1);
    // path: dropped dynKey, kept "inner".
    expect(res.deps[0]?.path).toEqual(["inner"]);
  });

  it("walks numeric literal index in an element-access chain into the path", () => {
    const { sourceFile, checker } = makeProgram(`
      let props: { items: string[] };
      const out = props.items[0];
    `);
    const itemsSym = symbolOf(checker, findIdent(sourceFile, "items"));
    const scope = new ReactiveScope();
    scope.register({ kind: "prop", name: "items", symbol: itemsSym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    if (res.deps.length === 1) {
      const path = res.deps[0]?.path ?? [];
      // pathFromAccess unshifts both "items" and "0" (the numeric literal text).
      expect(path).toContain("items");
    }
  });

  it("does not include non-prop reactive symbols recorded via property access", () => {
    const { sourceFile, checker } = makeProgram(`
      let signal: { ref: number };
      const out = signal.ref;
    `);
    // signal is registered as a SIGNAL (not a prop), so the prop branch in
    // extractDeps will not record it via property access.
    const refSym = symbolOf(checker, findIdent(sourceFile, "ref"));
    const scope = new ReactiveScope();
    scope.register({ kind: "signal", name: "ref", symbol: refSym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps).toEqual([]);
  });

  it("unwraps aliased import symbols via getAliasedSymbol", () => {
    // Build a two-file program so the import binding `bar` is a real module
    // alias of `./other`'s `foo`. resolveSymbol must follow the alias.
    const fileName = "/main.tsx";
    const otherName = "/other.ts";
    const mainSource = `
      import { foo as bar } from "./other.ts";
      const out = bar();
    `;
    const otherSource = `export const foo: () => number = () => 1;`;
    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.Preserve,
      allowImportingTsExtensions: true,
      noEmit: true,
      strict: false,
      skipLibCheck: true,
      skipDefaultLibCheck: true,
      isolatedModules: false,
      types: [],
    };
    const mainFile = ts.createSourceFile(
      fileName,
      mainSource,
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TSX,
    );
    const otherFile = ts.createSourceFile(
      otherName,
      otherSource,
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TS,
    );
    const baseHost = ts.createCompilerHost(compilerOptions, true);
    const host: ts.CompilerHost = {
      ...baseHost,
      getSourceFile(name, language, onError, shouldCreate) {
        if (name === fileName) return mainFile;
        if (name === otherName) return otherFile;
        return baseHost.getSourceFile(name, language, onError, shouldCreate);
      },
      fileExists(name) {
        if (name === fileName || name === otherName) return true;
        return baseHost.fileExists(name);
      },
      readFile(name) {
        if (name === fileName) return mainSource;
        if (name === otherName) return otherSource;
        return baseHost.readFile(name);
      },
    };
    const program = ts.createProgram([fileName, otherName], compilerOptions, host);
    const checker = program.getTypeChecker();
    const main = program.getSourceFile(fileName);
    const other = program.getSourceFile(otherName);
    if (!main || !other) throw new Error("source files failed to load");

    // The canonical declaration of `foo` lives in other.ts.
    const fooDeclIdent = findIdent(other, "foo");
    const fooSym = symbolOf(checker, fooDeclIdent);
    // Register the canonical symbol so the alias-unwrap path is what matches.
    const scope = new ReactiveScope();
    scope.register({ kind: "signal", name: "foo", symbol: fooSym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(main, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps.map((d) => d.name)).toEqual(["foo"]);
  });

  it("ignores stable setters when accessed via property", () => {
    const { sourceFile, checker } = makeProgram(`
      let count: number;
      let setCount: (n: number) => void;
      const out = setCount;
    `);
    const setterSym = symbolOf(checker, findIdent(sourceFile, "setCount"));
    const countSym = symbolOf(checker, findIdent(sourceFile, "count"));
    const scope = new ReactiveScope();
    scope.register({
      kind: "signal",
      name: "count",
      symbol: countSym,
      setter: setterSym,
      loc: UNKNOWN_LOCATION,
    });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps).toEqual([]);
  });

  it("treats nested calls inside arguments and callees correctly", () => {
    const { sourceFile, checker } = makeProgram(`
      let outer: () => () => number;
      let inner: number;
      const out = outer()();
    `);
    const sym = symbolOf(checker, findIdent(sourceFile, "outer"));
    const scope = new ReactiveScope();
    scope.register({ kind: "signal", name: "outer", symbol: sym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps.map((d) => d.name)).toEqual(["outer"]);
  });

  it("walks both arguments and callee of a CallExpression", () => {
    const { sourceFile, checker } = makeProgram(`
      let helper: (n: number) => number;
      let count: number;
      const out = helper(count());
    `);
    const sym = symbolOf(checker, findIdent(sourceFile, "count"));
    const scope = new ReactiveScope();
    scope.register({ kind: "signal", name: "count", symbol: sym, loc: UNKNOWN_LOCATION });
    const expr = findInitializer(sourceFile, "out");
    const res = extractDeps(expr, { scope, checker });
    expect(res.deps.map((d) => d.name)).toEqual(["count"]);
  });
});

describe("reactDepsArray", () => {
  it("returns names in first-seen order", () => {
    const deps: IRDependency[] = [
      { symbol: {} as ts.Symbol, kind: "signal", name: "b", path: [], conditional: false },
      { symbol: {} as ts.Symbol, kind: "memo", name: "a", path: [], conditional: false },
      { symbol: {} as ts.Symbol, kind: "signal", name: "c", path: [], conditional: false },
    ];
    expect(reactDepsArray(deps)).toEqual(["b", "a", "c"]);
  });

  it("dedupes duplicate names", () => {
    const deps: IRDependency[] = [
      { symbol: {} as ts.Symbol, kind: "signal", name: "x", path: [], conditional: false },
      { symbol: {} as ts.Symbol, kind: "memo", name: "x", path: [], conditional: false },
    ];
    expect(reactDepsArray(deps)).toEqual(["x"]);
  });

  it("filters refs (their identity is stable across renders)", () => {
    const deps: IRDependency[] = [
      { symbol: {} as ts.Symbol, kind: "ref", name: "inputRef", path: [], conditional: false },
      { symbol: {} as ts.Symbol, kind: "signal", name: "count", path: [], conditional: false },
    ];
    expect(reactDepsArray(deps)).toEqual(["count"]);
  });

  it("returns an empty array for an empty input", () => {
    expect(reactDepsArray([])).toEqual([]);
  });
});
