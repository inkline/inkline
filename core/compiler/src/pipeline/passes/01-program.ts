import { existsSync, readFileSync } from "node:fs";
import { dirname, isAbsolute } from "node:path";
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

const INK_FILE_RE = /\.ink\.[jt]sx?$/;

function createSingleFileProgram(fileName: string, source: string): ts.Program {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true);
  const canResolveDisk = isAbsolute(fileName);
  const sfCache = new Map<string, ts.SourceFile>([[fileName, sourceFile]]);

  const tryReadDisk = (name: string): string | undefined => {
    if (!canResolveDisk || !INK_FILE_RE.test(name)) return undefined;
    try {
      if (existsSync(name)) return readFileSync(name, "utf-8");
    } catch {}
    return undefined;
  };

  const host: ts.CompilerHost = {
    getSourceFile: (name, languageVersion) => {
      const cached = sfCache.get(name);
      if (cached) return cached;
      const text = tryReadDisk(name);
      if (text == null) return undefined;
      const sf = ts.createSourceFile(name, text, languageVersion ?? ts.ScriptTarget.Latest, true);
      sfCache.set(name, sf);
      return sf;
    },
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => (canResolveDisk ? dirname(fileName) : "/"),
    getCanonicalFileName: (f) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => {
      if (name === fileName) return true;
      if (canResolveDisk && INK_FILE_RE.test(name)) return existsSync(name);
      return false;
    },
    readFile: (name) => {
      if (name === fileName) return source;
      return tryReadDisk(name);
    },
    readDirectory: () => [],
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
