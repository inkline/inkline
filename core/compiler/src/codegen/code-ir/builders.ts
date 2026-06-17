import type { SourceLocation } from "../../ir/types.ts";
import type {
  CExpr,
  CFile,
  CGroup,
  CImport,
  CIndent,
  CJsxAttr,
  CJsxElement,
  CJsxText,
  CRaw,
  CScript,
  CStmt,
  CStyle,
  CTmplAttr,
  CTmplDirective,
  CTmplElement,
  CTmplMustache,
  CTmplText,
  Code,
} from "./nodes.ts";

export function cFile(init: {
  flavor: CFile["flavor"];
  children: readonly Code[];
  span?: SourceLocation;
}): CFile {
  return { kind: "CFile", ...init };
}

export function cScript(init: {
  lang?: CScript["lang"];
  setup?: boolean;
  children: readonly Code[];
  span?: SourceLocation;
}): CScript {
  return {
    kind: "CScript",
    lang: init.lang ?? "ts",
    setup: init.setup ?? false,
    children: init.children,
    span: init.span,
  };
}

export function cImport(init: {
  module: string;
  defaultLocal?: string;
  named?: readonly { readonly imported: string; readonly local?: string }[];
  typeOnly?: boolean;
  span?: SourceLocation;
}): CImport {
  return { kind: "CImport", ...init };
}

export function cStmt(init: { body: string | CExpr; span?: SourceLocation }): CStmt {
  return { kind: "CStmt", ...init };
}

export function cExpr(init: { text: string; span?: SourceLocation }): CExpr {
  return { kind: "CExpr", ...init };
}

export function cRaw(init: { text: string; span?: SourceLocation }): CRaw {
  return { kind: "CRaw", ...init };
}

export function cJsxElement(init: {
  tag: string;
  attrs?: readonly CJsxAttr[];
  children?: readonly Code[];
  selfClose?: boolean;
  inline?: boolean;
  span?: SourceLocation;
}): CJsxElement {
  return {
    kind: "CJsxElement",
    tag: init.tag,
    attrs: init.attrs ?? [],
    children: init.children ?? [],
    selfClose: init.selfClose ?? false,
    inline: init.inline,
    span: init.span,
  };
}

export function cJsxAttr(init: {
  name: string;
  value: CJsxAttr["value"];
  span?: SourceLocation;
}): CJsxAttr {
  return { kind: "CJsxAttr", ...init };
}

export function cJsxText(init: { text: string; span?: SourceLocation }): CJsxText {
  return { kind: "CJsxText", ...init };
}

export function cTmplElement(init: {
  tag: string;
  directives?: readonly CTmplDirective[];
  attrs?: readonly CTmplAttr[];
  children?: readonly Code[];
  selfClose?: boolean;
  inline?: boolean;
  span?: SourceLocation;
}): CTmplElement {
  return {
    kind: "CTmplElement",
    tag: init.tag,
    directives: init.directives ?? [],
    attrs: init.attrs ?? [],
    children: init.children ?? [],
    selfClose: init.selfClose ?? false,
    inline: init.inline,
    span: init.span,
  };
}

export function cTmplDirective(init: {
  directive: string;
  arg?: string;
  modifier?: readonly string[];
  expr?: CExpr;
  span?: SourceLocation;
}): CTmplDirective {
  return { kind: "CTmplDirective", ...init };
}

export function cTmplAttr(init: {
  name: string;
  value: CTmplAttr["value"];
  span?: SourceLocation;
}): CTmplAttr {
  return { kind: "CTmplAttr", ...init };
}

export function cTmplText(init: { text: string; span?: SourceLocation }): CTmplText {
  return { kind: "CTmplText", ...init };
}

export function cTmplMustache(init: { expr: CExpr; span?: SourceLocation }): CTmplMustache {
  return { kind: "CTmplMustache", ...init };
}

export function cGroup(init: {
  children: readonly Code[];
  fit?: boolean;
  span?: SourceLocation;
}): CGroup {
  return { kind: "CGroup", ...init };
}

export function cIndent(init: { children: readonly Code[]; span?: SourceLocation }): CIndent {
  return { kind: "CIndent", ...init };
}

export function cStyle(init: { css: string; scoped: boolean; span?: SourceLocation }): CStyle {
  return { kind: "CStyle", ...init };
}
