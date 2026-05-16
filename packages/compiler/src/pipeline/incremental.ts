import { createHash } from "node:crypto";
import type { InklineConfig } from "../core/options.ts";
import type { GeneratedFile, TargetName } from "../codegen/context.ts";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import { compile, type CompileInput, type CompileResult } from "./compile.ts";

export interface IncrementalState {
  readonly sourceHashes: ReadonlyMap<string, string>;
  readonly results: ReadonlyMap<string, CompileResult>;
}

export interface IncrementalCompileResult {
  readonly files: Readonly<Partial<Record<TargetName, readonly GeneratedFile[]>>>;
  readonly diagnostics: readonly Diagnostic[];
  readonly nextState: IncrementalState;
  readonly changed: readonly string[];
  readonly skipped: readonly string[];
}

export function createIncrementalState(): IncrementalState {
  return { sourceHashes: new Map(), results: new Map() };
}

function hashSource(source: string): string {
  return createHash("sha256").update(source).digest("hex").slice(0, 16);
}

export async function compileIncremental(
  state: IncrementalState,
  inputs: readonly CompileInput[],
  config?: Partial<InklineConfig>,
): Promise<IncrementalCompileResult> {
  const nextHashes = new Map<string, string>();
  const nextResults = new Map<string, CompileResult>();
  const changed: string[] = [];
  const skipped: string[] = [];

  const allFiles: Partial<Record<TargetName, GeneratedFile[]>> = {};
  const allDiagnostics: Diagnostic[] = [];

  for (const input of inputs) {
    const source =
      "source" in input
        ? input.source
        : (input.program.getSourceFile(input.fileName)?.getText() ?? "");
    const hash = hashSource(source);
    nextHashes.set(input.fileName, hash);

    const prevHash = state.sourceHashes.get(input.fileName);
    if (prevHash === hash) {
      const cached = state.results.get(input.fileName);
      if (cached) {
        skipped.push(input.fileName);
        nextResults.set(input.fileName, cached);
        mergeFiles(allFiles, cached.files);
        allDiagnostics.push(...cached.diagnostics);
        continue;
      }
    }

    changed.push(input.fileName);
    const result = await compile(input, config);
    nextResults.set(input.fileName, result);
    mergeFiles(allFiles, result.files);
    allDiagnostics.push(...result.diagnostics);
  }

  return {
    files: allFiles,
    diagnostics: allDiagnostics,
    nextState: { sourceHashes: nextHashes, results: nextResults },
    changed,
    skipped,
  };
}

function mergeFiles(
  target: Partial<Record<TargetName, GeneratedFile[]>>,
  source: Readonly<Partial<Record<TargetName, readonly GeneratedFile[]>>>,
): void {
  for (const [name, files] of Object.entries(source)) {
    if (!files) continue;
    const key = name as TargetName;
    if (!target[key]) target[key] = [];
    target[key]!.push(...files);
  }
}
