import type { Diagnostic } from "../core/diagnostics/codes.ts";
import type { ResolvedCompilerOptions } from "../core/options.ts";
import type { GeneratedFile, TargetName } from "../codegen/context.ts";
import type { AnalyzedModule } from "../pipeline/passes/04-analyze/index.ts";

export interface PluginHooks {
  "ir:post"?: (module: AnalyzedModule, ctx: PluginContext) => void | Promise<void>;
  "code:post"?: (
    target: TargetName,
    files: readonly GeneratedFile[],
    ctx: PluginContext,
  ) => void | readonly GeneratedFile[] | Promise<void | readonly GeneratedFile[]>;
}

export interface Plugin {
  readonly name: string;
  readonly targets?: readonly TargetName[];
  readonly hooks: PluginHooks;
}

export interface PluginContext {
  readonly pushDiagnostic: (d: Diagnostic) => void;
  readonly options: ResolvedCompilerOptions;
}

export function definePlugin(p: Plugin): Plugin {
  return p;
}
