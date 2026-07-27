import type { Diagnostic } from "./codes.ts";

/**
 * A configuration failure caused by user input — an unknown or missing target, a target the
 * registry cannot serve. It carries a fully formatted {@link Diagnostic} so callers can render it
 * through the same formatter as pipeline diagnostics instead of printing a stack trace through
 * compiler internals, which tells the author nothing about their config.
 */
export class InklineConfigError extends Error {
  readonly diagnostic: Diagnostic;

  constructor(diagnostic: Diagnostic) {
    super(diagnostic.help ? `${diagnostic.title}. ${diagnostic.help}` : diagnostic.title);
    this.name = "InklineConfigError";
    this.diagnostic = diagnostic;
  }
}

export function isInklineConfigError(error: unknown): error is InklineConfigError {
  return error instanceof InklineConfigError;
}
