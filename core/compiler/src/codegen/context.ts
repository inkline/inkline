import type { Code } from "./code-ir/nodes.ts";
import type { IRComponent, IRContextDefinition } from "../ir/render/nodes.ts";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import type { DiagnosticCollector } from "../core/diagnostics/collector.ts";
import type { ResolvedCompilerOptions } from "../core/options.ts";
import type { SymbolTable } from "../ir/reactivity.ts";

export type TargetName = "react" | "solid" | "vue" | "svelte" | "angular" | "qwik" | "astro";

export const ALL_TARGETS: readonly TargetName[] = Object.freeze([
  "react",
  "solid",
  "vue",
  "svelte",
  "angular",
  "qwik",
  "astro",
]);

export type ReactiveReadKind =
  | { readonly kind: "strip-call" }
  | { readonly kind: "preserve-call" }
  | { readonly kind: "field-access"; readonly field: string };

export type SetterStyleKind =
  | { readonly kind: "function-call" }
  | { readonly kind: "field-assignment"; readonly field: string }
  | { readonly kind: "direct-assignment" }
  | { readonly kind: "method-call"; readonly method: string };

export type RefAccessKind =
  | { readonly kind: "field"; readonly field: string }
  | { readonly kind: "bare" };

export interface MemberRewriteRules {
  /**
   * `strip` rewrites `props.x` → `x` (targets that destructure props). `whole`, when set,
   * rewrites a bare `props` reference to this expression — used by targets that destructure
   * `props` and therefore have no `props` binding for whole-object references (e.g. Svelte
   * reconstructs `{ name, ...rest }`).
   */
  readonly props?: { readonly strip: boolean; readonly whole?: string };
  readonly slots?: { readonly strip: boolean; readonly rename?: Readonly<Record<string, string>> };
}

export interface RewriteRules {
  readonly reactiveRead: ReactiveReadKind;
  readonly setterStyle: SetterStyleKind;
  readonly refAccess: RefAccessKind;
  readonly jsxAttrCasing: "react" | "html";
  readonly eventNameCase: "camel" | "kebab" | "lower";
  readonly members?: MemberRewriteRules;
  /**
   * Prefix component-member references (`props.x`, reactive reads `x()`) with `this.`.
   * Used by class-based targets (Angular) when emitting class-body expressions
   * (memos/effects), where members are accessed via `this`, unlike the template.
   */
  readonly selfPrefix?: boolean;
  /**
   * Map of setter name → state name (e.g. `setCount` → `count`). A call to a known setter
   * is rewritten per {@link setterStyle} (e.g. `count.value = …`, `count = …`, `count.set(…)`).
   */
  readonly setters?: Readonly<Record<string, string>>;
  /** Rename bare identifiers (e.g. an event-handler param `e` → `$event` for Angular bindings). */
  readonly rename?: Readonly<Record<string, string>>;
  /**
   * Identifiers that hold a reactive *value* read by its bare name (e.g. a `createResource`
   * `data`/`loading`/`error`, typed as a plain value, not an accessor). A bare read of one of
   * these is rewritten per {@link reactiveRead} — `data` → `data` (React/Vue/Svelte), `data()`
   * (Solid/Angular), or `data.value` (Qwik) — so each framework's read convention is honoured even
   * though the authored read has no call syntax.
   */
  readonly reactiveBindings?: ReadonlySet<string>;
  /**
   * Quote style for string literals in emitted expressions. Angular templates embed expressions
   * in double-quoted attributes, so string literals must use single quotes (`'a'`).
   */
  readonly stringQuote?: "single" | "double";
}

export interface ComponentImport {
  readonly localName: string;
  readonly componentName: string;
  readonly relativePath: string;
  readonly namedTypeImports?: readonly string[];
}

export interface CodegenContext {
  readonly diagnostics: DiagnosticCollector;
  readonly options: ResolvedCompilerOptions;
  readonly symbols: SymbolTable;
  readonly rewrites: RewriteRules;
  readonly contexts: readonly IRContextDefinition[];
  readonly externalImports: readonly Code[];
  readonly componentImports: readonly ComponentImport[];
  readonly typeDeclarations: readonly Code[];
}

export interface CodeModule {
  readonly componentName: string;
  readonly root: Code;
  readonly fileName: string;
}

export interface ControlFlowImportSpec {
  readonly module: string;
  readonly named?: readonly string[];
}

export interface TargetConformanceSpec {
  readonly controlFlowImports: {
    readonly if?: ControlFlowImportSpec;
    readonly for?: ControlFlowImportSpec;
    readonly switch?: ControlFlowImportSpec;
  };
  readonly lint:
    | { readonly tool: "oxlint"; readonly config: string }
    | { readonly tool: "eslint"; readonly config: string };
  readonly typecheck: {
    readonly tsconfig: string;
    readonly dtsImports: readonly string[];
  };
  readonly invariants: ReadonlyArray<(file: GeneratedFile) => readonly Diagnostic[]>;
}

export interface Target {
  readonly name: TargetName;
  readonly rewrites: RewriteRules;
  readonly conformance?: TargetConformanceSpec;
  readonly defaultOptions?: Readonly<Record<string, unknown>>;
  emit(component: IRComponent, ctx: CodegenContext): CodeModule;
}

export type TargetPlan = Pick<Target, "name" | "rewrites"> & {
  readonly conformance?: TargetConformanceSpec;
};

export interface TargetRegistry {
  get(name: TargetName): Target | undefined;
  has(name: TargetName): boolean;
  list(): readonly TargetName[];
}

export interface GeneratedFile {
  readonly path: string;
  readonly contents: string;
  readonly sourceMap?: string;
}
