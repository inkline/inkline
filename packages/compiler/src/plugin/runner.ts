import { DIAGNOSTICS, type Diagnostic } from "../core/diagnostics/codes.ts";
import type { GeneratedFile, TargetName } from "../codegen/context.ts";
import { UNKNOWN_LOCATION } from "../ir/types.ts";
import type { Plugin, PluginContext } from "./types.ts";

function makeErrorDiagnostic(pluginName: string, err: unknown): Diagnostic {
  const def = DIAGNOSTICS.INK0090;
  const message = err instanceof Error ? err.message : String(err);
  return {
    code: "INK0090",
    severity: def.severity,
    title: `Plugin '${pluginName}' threw: ${message}`,
    url: def.url,
    loc: UNKNOWN_LOCATION,
  };
}

export class PluginRunner {
  constructor(private readonly plugins: readonly Plugin[]) {}

  async invokeIrPost(module: unknown, ctx: PluginContext): Promise<void> {
    for (const plugin of this.plugins) {
      const fn = plugin.hooks["ir:post"];
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
      const fn = plugin.hooks["code:post"];
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
