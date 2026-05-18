import type { SourceLocation } from "../../ir/types.ts";
import {
  DIAGNOSTICS,
  type Diagnostic,
  type DiagnosticCode,
  type DiagnosticParams,
  type DiagnosticSeverity,
} from "./codes.ts";

export interface DiagnosticCollector {
  push<C extends DiagnosticCode>(
    code: C,
    loc: SourceLocation,
    ...params: keyof DiagnosticParams<C> extends never
      ? [params?: Record<string, never>]
      : [params: DiagnosticParams<C>]
  ): void;
  pushFrom(diags: readonly Diagnostic[]): void;
  freeze(): readonly Diagnostic[];
}

function resolvePlaceholders(template: string, params: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => params[k] ?? `{${k}}`);
}

export function createDiagnosticCollector(): DiagnosticCollector {
  const diagnostics: Diagnostic[] = [];
  let frozen = false;

  return {
    push(code: DiagnosticCode, loc: SourceLocation, ...args: unknown[]) {
      if (frozen) throw new Error("DiagnosticCollector is frozen");

      const def = DIAGNOSTICS[code];
      const params = (args[0] ?? {}) as Record<string, string>;

      diagnostics.push({
        code,
        severity: def.severity as DiagnosticSeverity,
        title: resolvePlaceholders(def.title, params),
        help: def.help ?? undefined,
        url: def.url,
        loc,
      });
    },

    pushFrom(diags: readonly Diagnostic[]) {
      if (frozen) throw new Error("DiagnosticCollector is frozen");
      diagnostics.push(...diags);
    },

    freeze(): readonly Diagnostic[] {
      frozen = true;
      return Object.freeze([...diagnostics]);
    },
  };
}
