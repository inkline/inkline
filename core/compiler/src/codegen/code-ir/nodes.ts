import type { SourceLocation } from "../../ir/types.ts";

export interface CNodeBase {
  readonly kind: Code["kind"];
  readonly span?: SourceLocation;
  readonly hints?: readonly string[];
}

// ── Container nodes ─────────────────────────────────────────────────

export interface CFile extends CNodeBase {
  readonly kind: "CFile";
  readonly flavor: "js-jsx" | "sfc-vue" | "sfc-svelte" | "ts" | "tsx";
  readonly children: readonly Code[];
}

export interface CScript extends CNodeBase {
  readonly kind: "CScript";
  readonly lang: "ts" | "js";
  readonly setup: boolean;
  readonly children: readonly Code[];
}

export interface CImport extends CNodeBase {
  readonly kind: "CImport";
  readonly module: string;
  readonly defaultLocal?: string;
  readonly named?: readonly {
    readonly imported: string;
    readonly local?: string;
  }[];
  readonly typeOnly?: boolean;
}

export interface CStmt extends CNodeBase {
  readonly kind: "CStmt";
  readonly body: string | CExpr;
}

export interface CExpr extends CNodeBase {
  readonly kind: "CExpr";
  readonly text: string;
}

export interface CRaw extends CNodeBase {
  readonly kind: "CRaw";
  readonly text: string;
}

// ── JSX nodes (React, Solid) ────────────────────────────────────────

export interface CJsxElement extends CNodeBase {
  readonly kind: "CJsxElement";
  readonly tag: string;
  readonly attrs: readonly CJsxAttr[];
  readonly children: readonly Code[];
  readonly selfClose: boolean;
  /** Emit children with no formatting whitespace (newlines/indent) so the result renders verbatim. */
  readonly inline?: boolean;
}

export interface CJsxAttr extends CNodeBase {
  readonly kind: "CJsxAttr";
  readonly name: string;
  readonly value:
    | { readonly kind: "static"; readonly text: string }
    | { readonly kind: "expr"; readonly expr: CExpr }
    | { readonly kind: "boolean" };
}

export interface CJsxText extends CNodeBase {
  readonly kind: "CJsxText";
  readonly text: string;
}

// ── Template nodes (Vue, Svelte) ────────────────────────────────────

export interface CTmplElement extends CNodeBase {
  readonly kind: "CTmplElement";
  readonly tag: string;
  readonly directives: readonly CTmplDirective[];
  readonly attrs: readonly CTmplAttr[];
  readonly children: readonly Code[];
  readonly selfClose: boolean;
  /** Emit children with no formatting whitespace (newlines/indent) so the result renders verbatim. */
  readonly inline?: boolean;
}

export interface CTmplDirective extends CNodeBase {
  readonly kind: "CTmplDirective";
  readonly directive: string;
  readonly arg?: string;
  readonly modifier?: readonly string[];
  readonly expr?: CExpr;
}

export interface CTmplAttr extends CNodeBase {
  readonly kind: "CTmplAttr";
  readonly name: string;
  readonly value:
    | { readonly kind: "static"; readonly text: string }
    | { readonly kind: "expr"; readonly expr: CExpr }
    | { readonly kind: "spread"; readonly expr: CExpr };
}

export interface CTmplText extends CNodeBase {
  readonly kind: "CTmplText";
  readonly text: string;
}

export interface CTmplMustache extends CNodeBase {
  readonly kind: "CTmplMustache";
  readonly expr: CExpr;
}

// ── Formatting nodes ────────────────────────────────────────────────

export interface CGroup extends CNodeBase {
  readonly kind: "CGroup";
  readonly children: readonly Code[];
  readonly fit?: boolean;
}

export interface CIndent extends CNodeBase {
  readonly kind: "CIndent";
  readonly children: readonly Code[];
}

// ── Discriminated union ─────────────────────────────────────────────

export interface CStyle extends CNodeBase {
  readonly kind: "CStyle";
  readonly css: string;
  readonly scoped: boolean;
}

export type Code =
  | CFile
  | CScript
  | CImport
  | CStmt
  | CExpr
  | CRaw
  | CJsxElement
  | CJsxAttr
  | CJsxText
  | CTmplElement
  | CTmplDirective
  | CTmplAttr
  | CTmplText
  | CTmplMustache
  | CGroup
  | CIndent
  | CStyle;
