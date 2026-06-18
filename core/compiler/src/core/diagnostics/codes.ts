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
  INK0043: {
    severity: "error" as const,
    title: "defineModel must be a [getter, setter] tuple with a static name" as const,
    help: 'Write const [value, setValue] = defineModel("value"). Dynamic names and non-tuple bindings are not supported.' as const,
    url: "https://docs.inkline.dev/diagnostics/INK0043" as const,
  },
  INK0044: {
    severity: "warning" as const,
    title: "Model '{name}' collides with a declared prop of the same name" as const,
    help: "Remove the duplicate prop; defineModel already declares the prop and its update event." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0044" as const,
  },
  INK0045: {
    severity: "info" as const,
    title:
      "Two-way binding and custom events are not interactive on the static Astro target" as const,
    help: "An .astro component renders once on the server; the model value is read-only and emitted events never fire. Use a framework island for interactivity." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0045" as const,
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
    severity: "error" as const,
    title: "<Transition> requires a single child element" as const,
    help: "Wrap multiple children in a single container element" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0063" as const,
  },
  INK0064: {
    severity: "warning" as const,
    title:
      "<Transition> child is not conditional; use 'appear' prop for enter-only animations" as const,
    help: "Wrap content in <Show when={...}> for enter/leave transitions" as const,
    url: "https://docs.inkline.dev/diagnostics/INK0064" as const,
  },
  INK0065: {
    severity: "error" as const,
    title: "<Transition> cannot wrap <For>; list transitions are not yet supported" as const,
    help: undefined,
    url: "https://docs.inkline.dev/diagnostics/INK0065" as const,
  },
  INK0066: {
    severity: "info" as const,
    title:
      "<Transition> for Angular: CSS classes are emitted but animation requires manual @angular/animations setup" as const,
    help: undefined,
    url: "https://docs.inkline.dev/diagnostics/INK0066" as const,
  },
  INK0067: {
    severity: "warning" as const,
    title: "<Slot> name must be a string literal" as const,
    help: "Dynamic slot names are not supported. Use a static string." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0067" as const,
  },
  INK0068: {
    severity: "info" as const,
    title:
      "hasSlot() always returns true on the Qwik and Angular targets, which have no runtime slot-presence API" as const,
    help: "Gated content always renders there. Pair hasSlot with a CSS `:empty` rule so the empty wrapper collapses." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0068" as const,
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
  INK0120: {
    severity: "warning" as const,
    title: "Attributes passed to <{name}> cannot be inherited" as const,
    help: "Give the component a single host-element root so it can inherit class and other attributes." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0120" as const,
  },
  INK0130: {
    severity: "error" as const,
    title: '{name}: element="{element}" but the root is not a single native <{element}>' as const,
    help: "Set `element` to the component's actual native root tag, or remove it to keep the ink-* element wrapper." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0130" as const,
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
