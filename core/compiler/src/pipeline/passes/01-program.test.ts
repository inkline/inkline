import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { programPass } from "./01-program.ts";
import { createDiagnosticCollector } from "../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../core/options.ts";
import { SymbolTable } from "../../ir/reactivity.ts";
import { builtinRegistry } from "../../codegen/registry.ts";
import type { PassContext } from "../types.ts";

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

describe("programPass", () => {
  it("creates a program from source string", async () => {
    const result = await programPass.run(
      { fileName: "test.tsx", source: "const x = 1;" },
      makeCtx(),
    );
    expect(result.program).toBeDefined();
    expect(result.sourceFile).toBeDefined();
    expect(result.sourceFile.fileName).toBe("test.tsx");
    expect(result.checker).toBeDefined();
  });

  it("parses JSX source", async () => {
    const source = `const el = <div>hello</div>;`;
    const result = await programPass.run({ fileName: "test.tsx", source }, makeCtx());
    expect(result.sourceFile.statements.length).toBeGreaterThan(0);
  });

  it("reuses an existing program", async () => {
    const source = "const x = 1;";
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
    const program = ts.createProgram(["test.tsx"], { noEmit: true }, host);

    const result = await programPass.run({ fileName: "test.tsx", program }, makeCtx());
    expect(result.program).toBe(program);
    expect(result.sourceFile).toBe(sf);
  });

  it("throws when file not found in provided program", async () => {
    const host: ts.CompilerHost = {
      getSourceFile: () => undefined,
      getDefaultLibFileName: () => "lib.d.ts",
      writeFile: () => {},
      getCurrentDirectory: () => "/",
      getCanonicalFileName: (f) => f,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => "\n",
      fileExists: () => false,
      readFile: () => undefined,
    };
    const program = ts.createProgram([], { noEmit: true }, host);

    expect(() => programPass.run({ fileName: "missing.tsx", program }, makeCtx())).toThrow(
      "Source file not found in program: missing.tsx",
    );
  });

  it("has name 'program'", () => {
    expect(programPass.name).toBe("program");
  });
});
