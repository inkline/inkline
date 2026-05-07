import * as ts from "typescript";

/** A parsed TS program plus the convenient handles tests and analyzers need. */
export interface CreatedProgram {
  program: ts.Program;
  sourceFile: ts.SourceFile;
  checker: ts.TypeChecker;
}

export interface CreateProgramOptions {
  fileName: string;
  source: string;
  /** Override or extend the default compiler options. */
  compilerOptions?: ts.CompilerOptions;
}

const DEFAULT_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.Preserve,
  jsxImportSource: "@inkline/core",
  allowImportingTsExtensions: true,
  noEmit: true,
  strict: false,
  skipLibCheck: true,
  skipDefaultLibCheck: true,
  isolatedModules: false,
  types: [],
};

/**
 * Build a single-file in-memory TS Program suitable for IR construction.
 * Disk lib resolution is delegated to the default compiler host so the
 * type checker can resolve global lib types (DOM, ES intrinsics).
 *
 * The returned program shares the symbol identity space — analyzers, the
 * scope, and tests must all use the same `CreatedProgram` to compare
 * symbols correctly.
 */
export function createSingleFileProgram(opts: CreateProgramOptions): CreatedProgram {
  const compilerOptions: ts.CompilerOptions = {
    ...DEFAULT_OPTIONS,
    ...opts.compilerOptions,
  };
  const baseHost = ts.createCompilerHost(compilerOptions, true);
  const scriptKind =
    opts.fileName.endsWith(".tsx") || opts.fileName.endsWith(".jsx")
      ? ts.ScriptKind.TSX
      : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(
    opts.fileName,
    opts.source,
    ts.ScriptTarget.ESNext,
    true,
    scriptKind,
  );
  const host: ts.CompilerHost = {
    ...baseHost,
    getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile) {
      if (fileName === opts.fileName) return sourceFile;
      return baseHost.getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
    },
    fileExists(fileName) {
      if (fileName === opts.fileName) return true;
      return baseHost.fileExists(fileName);
    },
    readFile(fileName) {
      if (fileName === opts.fileName) return opts.source;
      return baseHost.readFile(fileName);
    },
  };
  const program = ts.createProgram([opts.fileName], compilerOptions, host);
  const file = program.getSourceFile(opts.fileName);
  if (!file) {
    throw new Error(`Failed to load source file: ${opts.fileName}`);
  }
  return {
    program,
    sourceFile: file,
    checker: program.getTypeChecker(),
  };
}
