import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { parseSetup } from "./setup.ts";
import { bindPrimitives } from "./bind-primitives.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

function parseSetupFromSource(code: string) {
  const wrapped = `
    import { createSignal, createMemo, createEffect, createRef, onMount, onCleanup, defineComponent } from "@inkline/core";
    const X = defineComponent(${code});
  `;
  const fileName = "test.tsx";
  const sf = ts.createSourceFile(
    fileName,
    wrapped,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const host: ts.CompilerHost = {
    getSourceFile: (name) => (name === fileName ? sf : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => "/",
    getCanonicalFileName: (f) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => name === fileName,
    readFile: (name) => (name === fileName ? wrapped : undefined),
  };
  const program = ts.createProgram([fileName], { noEmit: true, strict: false }, host);
  const checker = program.getTypeChecker();

  const ctx = makeCtx();
  const bindings = bindPrimitives(sf, ctx);

  const varStmt = sf.statements[1] as ts.VariableStatement;
  const init = varStmt.declarationList.declarations[0]!.initializer as ts.CallExpression;
  const setupFn = init.arguments[0] as ts.ArrowFunction;

  return { result: parseSetup(setupFn, "test.tsx#X", bindings, sf, checker, ctx), ctx };
}

describe("parseSetup", () => {
  it("parses createSignal into IRStateDeclaration", () => {
    const { result } = parseSetupFromSource(`() => {
      const [count, setCount] = createSignal(0);
      return <div/>;
    }`);
    expect(result.state).toHaveLength(1);
    expect(result.state[0]!.name).toBe("count");
    expect(result.state[0]!.setterName).toBe("setCount");
  });

  it("parses createMemo into IRMemoDeclaration", () => {
    const { result } = parseSetupFromSource(`() => {
      const doubled = createMemo(() => 0);
      return <div/>;
    }`);
    expect(result.memos).toHaveLength(1);
    expect(result.memos[0]!.name).toBe("doubled");
  });

  it("parses createEffect into IREffectDeclaration", () => {
    const { result } = parseSetupFromSource(`() => {
      createEffect(() => { console.log("hi"); });
      return <div/>;
    }`);
    expect(result.effects).toHaveLength(1);
  });

  it("parses createRef into IRRefDeclaration", () => {
    const { result } = parseSetupFromSource(`() => {
      const myRef = createRef();
      return <div/>;
    }`);
    expect(result.refs).toHaveLength(1);
    expect(result.refs[0]!.name).toBe("myRef");
    expect(result.refs[0]!.category).toBe("element");
  });

  it("parses onMount into lifecycle.onMount", () => {
    const { result } = parseSetupFromSource(`() => {
      onMount(() => { console.log("mounted"); });
      return <div/>;
    }`);
    expect(result.lifecycle.onMount).toHaveLength(1);
  });

  it("parses onCleanup into lifecycle.onCleanup", () => {
    const { result } = parseSetupFromSource(`() => {
      onCleanup(() => { console.log("cleanup"); });
      return <div/>;
    }`);
    expect(result.lifecycle.onCleanup).toHaveLength(1);
  });

  it("captures return expression as renderExpr", () => {
    const { result } = parseSetupFromSource(`() => {
      return <div>hello</div>;
    }`);
    expect(result.renderExpr).toBeDefined();
  });

  it("captures other statements as IRSetupStatement", () => {
    const { result } = parseSetupFromSource(`() => {
      const x = 42;
      return <div/>;
    }`);
    expect(result.setup).toHaveLength(1);
  });

  it("handles arrow expression body (no block)", () => {
    const { result } = parseSetupFromSource(`() => <div/>`);
    expect(result.renderExpr).toBeDefined();
  });

  it("registers signal getter and setter in scope so deps resolve", () => {
    const { result } = parseSetupFromSource(`() => {
      const [count, setCount] = createSignal(0);
      createEffect(() => { count(); });
      return <div/>;
    }`);
    expect(result.effects).toHaveLength(1);
    const effect = result.effects[0]!;
    // After P2 step (f) deps resolution wired in parsePass, effect deps should be populated.
    // Here we just verify the scope can resolve `count` and that `setCount` is a setter.
    // (Direct scope inspection — public API is BindingScope shape.)
    const scope = result.scope;
    // The setter ID flag is what differentiates setters
    const stateDecl = result.state[0]!;
    expect(scope.isStableSetter(stateDecl.setterSymbolId)).toBe(true);
    expect(scope.isStableSetter(stateDecl.symbolId)).toBe(false);
    void effect;
  });

  it("registers memo binding in scope", () => {
    const { result } = parseSetupFromSource(`() => {
      const doubled = createMemo(() => 0);
      return <div/>;
    }`);
    const memo = result.memos[0]!;
    expect(result.scope.kindOf(memo.symbolId)).toBe("memo");
  });

  it("registers ref binding in scope", () => {
    const { result } = parseSetupFromSource(`() => {
      const myRef = createRef();
      return <div/>;
    }`);
    const ref = result.refs[0]!;
    expect(result.scope.kindOf(ref.symbolId)).toBe("ref");
  });

  it("memo expr stores the unwrapped body, not the arrow function", () => {
    const { result } = parseSetupFromSource(`() => {
      const doubled = createMemo(() => 1 + 2);
      return <div/>;
    }`);
    const memoExpr = result.memos[0]!.expr.expr;
    // The stored expression should be the BinaryExpression 1 + 2, not the ArrowFunction.
    expect(ts.isArrowFunction(memoExpr)).toBe(false);
    expect(ts.isBinaryExpression(memoExpr)).toBe(true);
  });
});
