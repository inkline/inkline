import type { Diagnostic } from "../core/diagnostics/codes.ts";
import { createDiagnostic } from "../core/diagnostics/create.ts";
import type { GeneratedFile, TargetName } from "../codegen/context.ts";
import { UNKNOWN_LOCATION } from "../ir/types.ts";
import type { AnalyzedModule } from "../pipeline/passes/04-analyze/index.ts";
import type { Plugin, PluginContext } from "./types.ts";

/** Built through the catalog so the plugin error carries its `help` and docs URL like any other. */
function makeErrorDiagnostic(pluginName: string, err: unknown): Diagnostic {
  const message = err instanceof Error ? err.message : String(err);
  return createDiagnostic("INK0090", UNKNOWN_LOCATION, { name: pluginName, message });
}

export class PluginRunner {
  constructor(private readonly plugins: readonly Plugin[]) {}

  /**
   * Plugins arrive from a config file, so `Plugin` describes what an author should write, not what
   * the runner is handed — the CLI schema checks only the identifying fields and lets `hooks` ride
   * along unvalidated (it holds functions). The optional chain is therefore load-bearing despite the
   * type: a plugin entry with no `hooks` is a plugin that registers nothing, and registering nothing
   * is a no-op, not a `TypeError` through compiler internals.
   */
  async invokeIrPost(module: AnalyzedModule, ctx: PluginContext): Promise<void> {
    for (const plugin of this.plugins) {
      const fn = plugin.hooks?.["ir:post"];
      if (!fn) continue;
      try {
        await fn(module, ctx);
      } catch (err) {
        ctx.pushDiagnostic(makeErrorDiagnostic(plugin.name, err));
        if (ctx.options.verbose) {
          console.warn(`[inkline] Plugin '${plugin.name}' error:`, err);
        }
      }
    }
  }

  async invokeCodePost(
    target: TargetName,
    files: readonly GeneratedFile[],
    ctx: PluginContext,
  ): Promise<readonly GeneratedFile[]> {
    let current = files;
    for (const plugin of this.plugins) {
      if (plugin.targets && !plugin.targets.includes(target)) continue;
      // Same unvalidated-input guard as `invokeIrPost`.
      const fn = plugin.hooks?.["code:post"];
      if (!fn) continue;
      try {
        const result = await fn(target, current, ctx);
        if (result) current = result;
      } catch (err) {
        ctx.pushDiagnostic(makeErrorDiagnostic(plugin.name, err));
        if (ctx.options.verbose) {
          console.warn(`[inkline] Plugin '${plugin.name}' error:`, err);
        }
      }
    }
    return current;
  }
}
