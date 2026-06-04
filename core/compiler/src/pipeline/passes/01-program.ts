import { existsSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import * as ts from "typescript";
import type { Pass } from "../types.ts";

const INK_FILE_RE = /\.ink\.[jt]sx?$/;

/**
 * Resolve a tsconfig's ambient type-declaration files (`*.d.ts` from its `include`/`files`)
 * so they can be loaded into the per-file program. Memoized per resolved tsconfig path.
 */
const typeFileCache = new Map<string, readonly string[]>();
function resolveTsconfigTypeFiles(tsconfigPath: string): readonly string[] {
  const cached = typeFileCache.get(tsconfigPath);
  if (cached) return cached;

  let files: readonly string[] = [];
  try {
    const read = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    if (!read.error && read.config) {
      const parsed = ts.parseJsonConfigFileContent(read.config, ts.sys, dirname(tsconfigPath));
      files = parsed.fileNames.filter((f) => f.endsWith(".d.ts"));
    }
  } catch {
    // A missing/invalid tsconfig is non-fatal — fall back to no extra type files.
  }
  typeFileCache.set(tsconfigPath, files);
  return files;
}

export type CompileInput =
  | { readonly fileName: string; readonly source: string }
  | { readonly fileName: string; readonly program: ts.Program };

export interface TsProgramArtifact {
  readonly program: ts.Program;
  readonly sourceFile: ts.SourceFile;
  readonly checker: ts.TypeChecker;
}

function createSingleFileProgram(
  fileName: string,
  source: string,
  typeFiles: readonly string[] = [],
): ts.Program {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true);
  const canResolveDisk = isAbsolute(fileName);
  const sfCache = new Map<string, ts.SourceFile>([[fileName, sourceFile]]);
  const typeFileSet = new Set(typeFiles);

  const tryReadDisk = (name: string): string | undefined => {
    if (!canResolveDisk || (!INK_FILE_RE.test(name) && !typeFileSet.has(name))) return undefined;
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
      if (typeFileSet.has(name)) return existsSync(name);
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
    [fileName, ...typeFiles],
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
  run(input, ctx) {
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

    const tsconfig = ctx.options.tsconfig;
    const typeFiles = tsconfig ? resolveTsconfigTypeFiles(resolve(tsconfig)) : [];
    const program = createSingleFileProgram(
      input.fileName,
      (input as { source: string }).source,
      typeFiles,
    );
    const sourceFile = program.getSourceFile(input.fileName);
    if (!sourceFile) {
      throw new Error(`Failed to create source file: ${input.fileName}`);
    }
    return { program, sourceFile, checker: program.getTypeChecker() };
  },
};
