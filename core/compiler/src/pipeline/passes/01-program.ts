import * as ts from "typescript";
import type { Pass } from "../types.ts";

export type CompileInput =
  | { readonly fileName: string; readonly source: string }
  | { readonly fileName: string; readonly program: ts.Program };

export interface TsProgramArtifact {
  readonly program: ts.Program;
  readonly sourceFile: ts.SourceFile;
  readonly checker: ts.TypeChecker;
}

function createSingleFileProgram(fileName: string, source: string): ts.Program {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true);

  const host: ts.CompilerHost = {
    getSourceFile: (name) => (name === fileName ? sourceFile : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => "/",
    getCanonicalFileName: (f) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => name === fileName,
    readFile: (name) => (name === fileName ? source : undefined),
  };

  return ts.createProgram(
    [fileName],
    {
      jsx: ts.JsxEmit.Preserve,
      jsxImportSource: "@inkline/core",
      strict: false,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.Latest,
      module: ts.ModuleKind.ESNext,
      allowJs: true,
      noEmit: true,
    },
    host,
  );
}

export const programPass: Pass<CompileInput, TsProgramArtifact> = {
  name: "program",
  run(input) {
    if ("program" in input && input.program) {
      const sourceFile = input.program.getSourceFile(input.fileName);
      if (!sourceFile) {
        throw new Error(`Source file not found in program: ${input.fileName}`);
      }
      return {
        program: input.program,
        sourceFile,
        checker: input.program.getTypeChecker(),
      };
    }

    const program = createSingleFileProgram(input.fileName, (input as { source: string }).source);
    const sourceFile = program.getSourceFile(input.fileName);
    if (!sourceFile) {
      throw new Error(`Failed to create source file: ${input.fileName}`);
    }
    return { program, sourceFile, checker: program.getTypeChecker() };
  },
};
