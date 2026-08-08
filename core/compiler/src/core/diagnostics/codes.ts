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
  // The type argument is the only declaration of a component's events, and each member's type node
  // is emitted verbatim into the generated component. A reference the compiler cannot read members
  // from — or one whose members live in another module, and so are not in scope where they land —
  // would compile to a component with zero events while the author's `emit("close")` calls survive
  // as reads of a prop nothing declares. Refusing is the only honest option.
  INK0042: {
    severity: "error" as const,
    title: "defineEmits type argument must resolve to an object type in this file" as const,
    help: "Write the members inline — defineEmits<{ close: [] }>() — or reference a type alias or interface declared in the same file. A union, a generic instantiation, or a type imported from another module cannot be read at build time, and every event it declares would be dropped from the output." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0042" as const,
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
    help: "Pass the condition as a prop: <Show when={visible()}>…</Show>. Without 'when' there is nothing to test, so the block and its children are dropped from the output." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0060" as const,
  },
  INK0061: {
    severity: "info" as const,
    title: "Nullish-coalescing (??) in JSX is ambiguous" as const,
    help: "?? falls back only on null and undefined, so count() ?? <Empty /> still renders a literal 0. State the condition instead: <Show when={count() > 0} fallback={<Empty />}>…</Show>." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0061" as const,
  },
  INK0062: {
    severity: "error" as const,
    title: "<For> requires an 'each' prop" as const,
    help: "Pass the collection as a prop: <For each={items()} key={(item) => item.id}>{(item) => <li>{item.name}</li>}</For>. Without 'each' there is nothing to iterate, so the block is dropped from the output." as const,
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
    help: 'Move the transition inside the row so each item animates on its own: <For each={items()} key={(item) => item.id}>{(item) => <Transition name="fade"><li>{item.name}</li></Transition>}</For>. Wrapping the list needs a list-transition primitive, which does not exist yet.' as const,
    url: "https://docs.inkline.dev/diagnostics/INK0065" as const,
  },
  INK0066: {
    severity: "info" as const,
    title:
      "<Transition> for Angular: CSS classes are emitted but animation requires manual @angular/animations setup" as const,
    help: "The compiler emits the name-prefixed classes and nothing else. Define them in a stylesheet — .fade-enter-active, .fade-leave-active { transition: opacity 150ms } — or drive the same states from @angular/animations on the host component." as const,
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
  // Slot placeholders are lowered from the component's render tree, so a `<Slot>` reached only
  // through a helper function or an effect body declares no slot — and the element survives into the
  // output verbatim, against a `Slot` the target never imports. Resolving it properly means inlining
  // arbitrary functions; refusing costs the author one edit.
  INK0069: {
    severity: "error" as const,
    title: "<Slot> must appear in the component's render output" as const,
    help: 'Move the <Slot> into what the setup function returns. A <Slot> nested in a helper function or an effect is never reached, so it declares no slot and is emitted as an undefined element. To keep the markup factored out, declare the slot with const icon = defineSlot("icon") and render that value from the return instead.' as const,
    url: "https://docs.inkline.dev/diagnostics/INK0069" as const,
  },
  INK0070: {
    severity: "error" as const,
    title: "Component-ref forwarding is not yet supported" as const,
    help: "Element refs are supported. Component refs are planned for v1." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0070" as const,
  },
  INK0071: {
    severity: "error" as const,
    title: "JSX spread attributes are not supported" as const,
    help: "The spread is discarded. Enumerate the attributes explicitly on the element instead of spreading an object — the compiler must know every attribute name at build time." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0071" as const,
  },
  // Severity: warning, not error. The valid set is a *snapshot* of a spec Inkline does not own —
  // `ARIA_ATTRIBUTES` is derived from the vendored JSX types — so a genuinely-new ARIA attribute the
  // snapshot predates would fail the build of an author who did nothing wrong. Same one-way door as
  // INK0081. The emitted output is unharmed either way: an unknown `aria-*` renders as written and
  // is ignored by assistive technology, which costs accessibility, not correctness.
  INK0072: {
    severity: "warning" as const,
    title: 'Unknown ARIA attribute "{name}"' as const,
    help: "{suggestion}The attribute is emitted as written, so assistive technology ignores it. ARIA attribute names are a closed set — correct the spelling or remove it." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0072" as const,
  },
  // Severity: error, unlike its neighbour INK0072. `$bind:` is Inkline's own vocabulary, defined by
  // this compiler's lowering and nothing else — there is no external spec to lag, so the valid set
  // is known exactly and a false positive is a bug rather than a risk to price in. The failure is
  // not cosmetic either: `<div $bind:nonsense={1} />` emits `onInput={(e) => 1(e.target.value)}`,
  // which throws on the first input event. Emitting code known to be broken is worse than refusing.
  INK0073: {
    severity: "error" as const,
    title: 'Cannot two-way bind "$bind:{name}" on <{tag}>' as const,
    help: '$bind: lowers to a value attribute plus a writer, and <{tag}> has nothing to write "{name}" to — the generated handler would call the bound expression as a setter and throw at runtime. {suggestion}' as const,
    url: "https://docs.inkline.dev/diagnostics/INK0073" as const,
  },
  INK0080: {
    severity: "warning" as const,
    title: "Unknown target option: {key}" as const,
    help: "The option is ignored. Check it against the target's defaultOptions, then fix or remove it: targetOptions: { vue: { sfc: true } } in inkline.config.ts." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0080" as const,
  },
  INK0081: {
    severity: "warning" as const,
    title: "Unknown config key: {key}" as const,
    help: "The key is ignored. Remove it, or check the configuration reference for supported keys." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0081" as const,
  },
  INK0082: {
    severity: "warning" as const,
    title: "Unknown config key: {key}. Did you mean {suggestion}?" as const,
    help: "The key is ignored. Fix the spelling or remove it." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0082" as const,
  },
  INK0083: {
    severity: "error" as const,
    title: "Invalid config value at {path}: {message}" as const,
    help: "The command stops here: a value of the wrong type cannot be consumed. Correct it to the documented type." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0083" as const,
  },
  INK0084: {
    severity: "error" as const,
    title: "No compilation target specified" as const,
    help: "Pass --target <name> to the CLI or set `targets` in inkline.config.ts. Available targets: {targets}." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0084" as const,
  },
  INK0085: {
    severity: "error" as const,
    title: 'Unknown target "{target}"' as const,
    help: "{suggestion}Available targets: {targets}." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0085" as const,
  },
  INK0086: {
    severity: "error" as const,
    title: 'Target "{target}" is not present in the configured registry' as const,
    help: "The registry provides: {available}. Register the target with `createRegistry` + `defineTarget`, or drop it from `targets`." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0086" as const,
  },
  INK0087: {
    severity: "error" as const,
    title: 'Invalid report level "{level}"' as const,
    help: "Reporting levels, high to low: {levels}. A level reports itself and everything above it, so `warning` withholds notes. Set it with --report-level <level> or `reportLevel` in inkline.config.ts." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0087" as const,
  },
  INK0090: {
    severity: "error" as const,
    title: "Plugin '{name}' threw: {message}" as const,
    help: "The hook is skipped and compilation continues without its contribution. Re-run with --verbose for the stack trace; a plugin should report recoverable problems with ctx.pushDiagnostic(diagnostic) rather than throwing." as const,
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
  INK0111: {
    severity: "warning" as const,
    title:
      "Headless component '{name}' root must be a single static element to extract a host selector" as const,
    help: "Give the headless component a single static-tag root element (e.g. <button>, <div>). A conditional or fragment root keeps the element-selector wrapper and no attribute-selector variant is emitted." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0111" as const,
  },
  INK0120: {
    severity: "warning" as const,
    title: "Attributes passed to <{name}> cannot be inherited" as const,
    help: "Give the component a single host-element root so it can inherit class and other attributes." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0120" as const,
  },
  INK0121: {
    severity: "error" as const,
    title: "Setup-body local '{name}' is referenced but its definition cannot be emitted" as const,
    help: "Only const/let arrow or function expressions and function declarations are emitted as setup-body locals. Rewrite '{name}' as a `const {name} = (…) => …` handler or a `function {name}(…) {…}` declaration so the compiler can emit its definition." as const,
    url: "https://docs.inkline.dev/diagnostics/INK0121" as const,
  },
} as const;

export type DiagnosticCode = keyof typeof DIAGNOSTICS;

// prettier-ignore
type WordChar =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m"
  | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
  | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
  | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "_";

/**
 * Mirrors the runtime `\{(\w+)\}` interpolation. Help text legitimately contains braces that are not
 * placeholders — code samples like `import { createSignal }` or `key={item.id}` — and those must not
 * become required params.
 */
type IsWord<S extends string> = S extends `${infer H}${infer T}`
  ? H extends WordChar
    ? T extends ""
      ? true
      : IsWord<T>
    : false
  : false;

type ExtractPlaceholders<S extends string> = S extends `${string}{${infer K}}${infer Rest}`
  ? (IsWord<K> extends true ? Record<K, string> : {}) & ExtractPlaceholders<Rest>
  : {};

type Simplify<T> = { [K in keyof T]: T[K] };

/** `help` is optional in the catalog; entries without one contribute no placeholders. */
type HelpText<C extends DiagnosticCode> = (typeof DIAGNOSTICS)[C]["help"] extends infer H
  ? H extends string
    ? H
    : ""
  : "";

/** Placeholders come from both the title and the help text — both are interpolated at push time. */
export type DiagnosticParams<C extends DiagnosticCode> = Simplify<
  ExtractPlaceholders<(typeof DIAGNOSTICS)[C]["title"]> & ExtractPlaceholders<HelpText<C>>
>;

export interface Diagnostic {
  readonly code: DiagnosticCode;
  readonly severity: DiagnosticSeverity;
  readonly title: string;
  readonly help?: string;
  readonly url: string;
  readonly loc: SourceLocation;
}
