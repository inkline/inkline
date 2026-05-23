import type { Code } from "./code-ir/nodes.ts";
import type { IRComponent } from "../ir/render/nodes.ts";
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
  | { readonly kind: "direct-assignment" };

export type RefAccessKind =
  | { readonly kind: "field"; readonly field: string }
  | { readonly kind: "bare" };

export interface MemberRewriteRules {
  readonly props?: { readonly strip: boolean };
  readonly slots?: { readonly strip: boolean; readonly rename?: Readonly<Record<string, string>> };
}

export interface RewriteRules {
  readonly reactiveRead: ReactiveReadKind;
  readonly setterStyle: SetterStyleKind;
  readonly refAccess: RefAccessKind;
  readonly jsxAttrCasing: "react" | "html";
  readonly eventNameCase: "camel" | "kebab" | "lower";
  readonly members?: MemberRewriteRules;
}

export interface CodegenContext {
  readonly diagnostics: DiagnosticCollector;
  readonly options: ResolvedCompilerOptions;
  readonly symbols: SymbolTable;
  readonly rewrites: RewriteRules;
  readonly externalImports: readonly Code[];
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
