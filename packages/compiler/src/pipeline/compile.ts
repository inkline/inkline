import type { Diagnostic } from "../core/diagnostics/codes.ts";
import { createDiagnosticCollector } from "../core/diagnostics/collector.ts";
import { resolveOptions, type InklineConfig } from "../core/options.ts";
import { SymbolTable } from "../ir/reactivity.ts";
import type { IRComponent, IRModule } from "../ir/render/nodes.ts";
import type { GeneratedFile, Target, TargetName } from "../codegen/context.ts";
import { print } from "../codegen/print/printer.ts";
import { PluginRunner } from "../plugin/runner.ts";
import type { PluginContext } from "../plugin/types.ts";
import type { ReactivityGraph } from "./passes/04-analyze/graph.ts";
import { programPass, type CompileInput } from "./passes/01-program.ts";
import { parsePass } from "./passes/02-parse/index.ts";
import { lower } from "./passes/03-lower/index.ts";
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

function emitComponent(component: IRComponent, target: Target, ctx: PassContext): GeneratedFile {
  const codeModule = target.emit(component, {
    diagnostics: ctx.diagnostics,
    options: ctx.options,
    symbols: ctx.symbols,
    rewrites: target.rewrites,
  });
  const result = print(codeModule.root, { sourceMap: ctx.options.sourceMap });
  return {
    path: codeModule.fileName,
    contents: result.code,
    sourceMap: result.map,
  };
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
  const artifact = await programPass.run(input, ctx);

  // P2: parse .ink.tsx → IRModule
  const rawModule = await parsePass.run(artifact, ctx);

  // P3: lower (normalize control flow, slots, bindings, static marks)
  const module = lower(rawModule, ctx);

  // P4 analyze — stub (graph built on demand)
  const analyzedModule: AnalyzedModule = { module, graphs: new Map() };

  // Plugin runner
  const runner = new PluginRunner(options.plugins);
  const pluginCtx: PluginContext = {
    pushDiagnostic: (d) => diagnostics.pushFrom([d]),
    options,
  };

  // ir:post hook (after P4)
  await runner.invokeIrPost(analyzedModule, pluginCtx);

  // P5 emit + P6 print per target, with H3 error recovery
  const files: Partial<Record<TargetName, GeneratedFile[]>> = {};

  for (const targetName of options.targets) {
    const target = options.registry.get(targetName);
    if (!target) continue;

    const targetFiles: GeneratedFile[] = [];

    for (const component of module.components) {
      try {
        targetFiles.push(emitComponent(component, target, ctx));
      } catch (err) {
        diagnostics.push("INK0100", component.loc, {
          name: component.name,
          message: err instanceof Error ? err.message : String(err),
        });
      }
    }

    // code:post hook (after P6 per target)
    const finalFiles = await runner.invokeCodePost(targetName, targetFiles, pluginCtx);
    files[targetName] = [...finalFiles];
  }

  return {
    module: analyzedModule,
    files,
    diagnostics: diagnostics.freeze(),
  };
}
