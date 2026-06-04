import { describe, it, expect, afterEach } from "vitest";
import * as ts from "typescript";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { TsProgramArtifact } from "./01-program.ts";
import { programPass } from "./01-program.ts";
import { createDiagnosticCollector } from "../../core/diagnostics/collector.ts";
import { resolveOptions, type InklineConfig } from "../../core/options.ts";
import { SymbolTable } from "../../ir/reactivity.ts";
import { builtinRegistry } from "../../codegen/registry.ts";
import type { PassContext } from "../types.ts";

function makeCtx(config: Partial<InklineConfig> = { targets: ["react"] }): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions(config),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

/** Property names of the first parameter type of `export const c = (props: T) => …`. */
function firstParamPropNames(result: TsProgramArtifact): string[] {
  let names: string[] = [];
  result.sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    const init = node.declarationList.declarations[0]?.initializer;
    if (init && ts.isArrowFunction(init) && init.parameters[0]) {
      names = result.checker
        .getTypeAtLocation(init.parameters[0])
        .getProperties()
        .map((s) => s.getName())
        .sort();
    }
  });
  return names;
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

  describe("tsconfig ambient type declarations", () => {
    let dir: string | undefined;
    afterEach(() => {
      if (dir) rmSync(dir, { recursive: true, force: true });
      dir = undefined;
    });

    function setup(): { fileName: string; source: string; tsconfig: string } {
      dir = mkdtempSync(join(tmpdir(), "inkline-prog-"));
      writeFileSync(
        join(dir, "shims.d.ts"),
        `declare module "virtual:test" { export type P = { a?: string; b?: number }; }`,
      );
      writeFileSync(join(dir, "tsconfig.json"), JSON.stringify({ include: ["**/*.d.ts"] }));
      return {
        fileName: join(dir, "comp.ink.tsx"),
        source: `import type { P } from "virtual:test"; export const c = (props: P) => props;`,
        tsconfig: join(dir, "tsconfig.json"),
      };
    }

    it("resolves a virtual-module type when its declaration is in the configured tsconfig", async () => {
      const { fileName, source, tsconfig } = setup();
      const result = await programPass.run(
        { fileName, source },
        makeCtx({ targets: ["react"], tsconfig }),
      );
      expect(firstParamPropNames(result)).toEqual(["a", "b"]);
    });

    it("does not resolve the virtual-module type without a tsconfig", async () => {
      const { fileName, source } = setup();
      const result = await programPass.run({ fileName, source }, makeCtx());
      expect(firstParamPropNames(result)).toEqual([]);
    });
  });
});
