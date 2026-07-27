import type { SourceLocation } from "../../ir/types.ts";
import type { Diagnostic, DiagnosticCode, DiagnosticParams } from "./codes.ts";
import { createDiagnostic } from "./create.ts";

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

export function createDiagnosticCollector(): DiagnosticCollector {
  const diagnostics: Diagnostic[] = [];
  let frozen = false;

  return {
    push(code: DiagnosticCode, loc: SourceLocation, ...args: unknown[]) {
      if (frozen) throw new Error("DiagnosticCollector is frozen");

      // The public `push` overload above already enforces the per-code params; erase the generic
      // here so the untyped rest args can be forwarded.
      const create = createDiagnostic as (
        code: DiagnosticCode,
        loc: SourceLocation,
        params?: Record<string, string>,
      ) => Diagnostic;

      diagnostics.push(create(code, loc, args[0] as Record<string, string> | undefined));
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
