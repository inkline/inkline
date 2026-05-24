import type { SourceLocation } from "../../ir/types.ts";

export type DiagnosticSeverity = "error" | "warning" | "info";

export const DIAGNOSTICS = {
  INK0001: {
    severity: "error" as const,
    title: "Namespace import of @inkline/core is not supported" as const,
    help: "Use named imports: import { createSignal } from '@inkline/core'" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0001" as const,
  },
  INK0040: {
    severity: "error" as const,
    title: "defineComponent must have a setup function" as const,
    help: "Pass a function as the last argument: defineComponent((props) => <…/>)" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0040" as const,
  },
  INK0041: {
    severity: "error" as const,
    title: "defineComponent options must be a static object literal" as const,
    help: "Move dynamic options into the setup body" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0041" as const,
  },
  INK0010: {
    severity: "warning" as const,
    title: "Effect has no reactive dependencies; it runs once" as const,
    help: "If intended, this is fine. Otherwise, read a signal inside the effect body" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0010" as const,
  },
  INK0011: {
    severity: "warning" as const,
    title: "Memo has no reactive dependencies; it never recomputes" as const,
    help: "Replace with a plain const" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0011" as const,
  },
  INK0020: {
    severity: "warning" as const,
    title: "Dynamic reactive read prevents static dep tracking" as const,
    help: "React falls back to recomputing on every render" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0020" as const,
  },
  INK0030: {
    severity: "error" as const,
    title: "createMemo cycle detected: {cycle}" as const,
    help: "Break the cycle by introducing an intermediate signal" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0030" as const,
  },
  INK0050: {
    severity: "warning" as const,
    title: "Missing key in iteration" as const,
    help: "Add key={item.id} or pass key prop to the iterated element" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0050" as const,
  },
  INK0060: {
    severity: "error" as const,
    title: "<Show> requires a 'when' prop" as const,
    help: undefined,
    url: "https://docs.inkline.dev/diagnostics/INK0060" as const,
  },
  INK0061: {
    severity: "info" as const,
    title: "Nullish-coalescing (??) in JSX is ambiguous" as const,
    help: undefined,
    url: "https://docs.inkline.dev/diagnostics/INK0061" as const,
  },
  INK0062: {
    severity: "error" as const,
    title: "<For> requires an 'each' prop" as const,
    help: undefined,
    url: "https://docs.inkline.dev/diagnostics/INK0062" as const,
  },
  INK0063: {
    severity: "warning" as const,
    title: "<Slot> name must be a string literal" as const,
    help: "Dynamic slot names are not supported. Use a static string." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0063" as const,
  },
  INK0070: {
    severity: "error" as const,
    title: "Component-ref forwarding is not yet supported" as const,
    help: "Element refs are supported. Component refs are planned for v1." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0070" as const,
  },
  INK0080: {
    severity: "warning" as const,
    title: "Unknown target option: {key}" as const,
    help: undefined,
    url: "https://docs.inkline.dev/diagnostics/INK0080" as const,
  },
  INK0090: {
    severity: "error" as const,
    title: "Plugin '{name}' threw: {message}" as const,
    help: undefined,
    url: "https://docs.inkline.dev/diagnostics/INK0090" as const,
  },
  INK0100: {
    severity: "error" as const,
    title: "Parse failure in component '{name}': {message}" as const,
    help: "The component was skipped. Other components in the module still compile." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0100" as const,
  },
  INK0110: {
    severity: "error" as const,
    title: "Internal compiler error: {message}" as const,
    help: "Please file an issue with the source file attached." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0110" as const,
  },
} as const;

export type DiagnosticCode = keyof typeof DIAGNOSTICS;

type ExtractPlaceholders<S extends string> = S extends `${string}{${infer K}}${infer Rest}`
  ? Record<K, string> & ExtractPlaceholders<Rest>
  : {};

type Simplify<T> = { [K in keyof T]: T[K] };

export type DiagnosticParams<C extends DiagnosticCode> = Simplify<
  ExtractPlaceholders<(typeof DIAGNOSTICS)[C]["title"]>
>;

export interface Diagnostic {
  readonly code: DiagnosticCode;
  readonly severity: DiagnosticSeverity;
  readonly title: string;
  readonly help?: string;
  readonly url: string;
  readonly loc: SourceLocation;
}
