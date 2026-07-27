import type { SourceLocation } from "../../ir/types.ts";
import {
  DIAGNOSTICS,
  type Diagnostic,
  type DiagnosticCode,
  type DiagnosticParams,
  type DiagnosticSeverity,
} from "./codes.ts";

function resolvePlaceholders(template: string, params: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => params[k] ?? `{${k}}`);
}

/**
 * Build a {@link Diagnostic} from the catalog. Used by the collector for pipeline diagnostics and
 * directly by config-time failures, which have no collector to push into but must still carry the
 * same code, help text, and docs URL.
 */
export function createDiagnostic<C extends DiagnosticCode>(
  code: C,
  loc: SourceLocation,
  ...args: keyof DiagnosticParams<C> extends never
    ? [params?: Record<string, never>]
    : [params: DiagnosticParams<C>]
): Diagnostic {
  const def = DIAGNOSTICS[code];
  const params = (args[0] ?? {}) as Record<string, string>;

  return {
    code,
    severity: def.severity as DiagnosticSeverity,
    title: resolvePlaceholders(def.title, params),
    help: def.help ? resolvePlaceholders(def.help, params) : undefined,
    url: def.url,
    loc,
  };
}
