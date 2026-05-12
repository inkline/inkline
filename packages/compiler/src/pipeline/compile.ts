import type { Diagnostic } from "../core/diagnostics/codes.ts";
import { createDiagnosticCollector } from "../core/diagnostics/collector.ts";
import { resolveOptions, type InklineConfig } from "../core/options.ts";
import { SymbolTable } from "../ir/reactivity.ts";
import type { IRModule } from "../ir/render/nodes.ts";
import type { GeneratedFile, TargetName } from "../codegen/context.ts";
import type { ReactivityGraph } from "./passes/04-analyze/graph.ts";
import { programPass, type CompileInput } from "./passes/01-program.ts";
import type { PassContext } from "./types.ts";

export type { CompileInput } from "./passes/01-program.ts";

export interface AnalyzedModule {
  readonly module: IRModule;
  readonly graphs: ReadonlyMap<string, ReactivityGraph>;
}

export interface CompileResult {
  readonly module?: AnalyzedModule;
  readonly files: Readonly<Partial<Record<TargetName, readonly GeneratedFile[]>>>;
  readonly diagnostics: readonly Diagnostic[];
}

export async function compile(
  input: CompileInput,
  config?: Partial<InklineConfig>,
): Promise<CompileResult> {
  const options = resolveOptions(config);
  const diagnostics = createDiagnosticCollector();
  const symbols = new SymbolTable();

  const ctx: PassContext = {
    diagnostics,
    options,
    symbols,
    registry: options.registry,
  };

  // P1: create TS program
  await programPass.run(input, ctx);

  // P2 parse, P3 lower, P4 analyze — added in Phases E/F
  // P5 emit, P6 print — added in Phase G/H

  return {
    files: {},
    diagnostics: diagnostics.freeze(),
  };
}
