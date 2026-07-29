/**
 * `@inkline/compiler/codegen` — **UNSTABLE. No semver guarantee.**
 *
 * Code IR, the `Target` contract, the printer, and the built-in targets.
 *
 * Why unstable: `TargetName` is a closed string-literal union of the seven built-in targets
 * (`./context.ts`), and `Target.name` is a `TargetName` — so an external
 * `defineTarget({ name: "lit" })` cannot typecheck. It also cannot run: `resolveOptions` rejects
 * any target outside `ALL_TARGETS` (diagnostic INK0085) before it consults a custom registry.
 * These names are therefore usable today only from inside this repository. They ship at a subpath
 * so that in-repo target work has a real import path instead of a deep relative one, and so the
 * root entry point is not filled with an API no external author can call.
 *
 * Opening the extension point is a separate design decision. Until it is made, expect this
 * surface to change in any release, including a patch. Marked in `package.json` under
 * `inkline.unstableExports`.
 *
 * Selecting a target (`TargetName`, `ALL_TARGETS`, `builtinRegistry`, `GeneratedFile`) is stable
 * and lives at `@inkline/compiler`; those four are re-exported here so a target implementation
 * needs one import rather than two.
 */

// ============ TARGET API ============
export type {
  Target,
  TargetName,
  TargetPlan,
  TargetConformanceSpec,
  ControlFlowImportSpec,
  MemberRewriteRules,
  RewriteRules,
  TargetRegistry,
  CodegenContext,
  GeneratedFile,
  CodeModule,
} from "./context.ts";
export { defineTarget, createRegistry, builtinRegistry } from "./registry.ts";
export { ALL_TARGETS } from "./context.ts";

// ============ CODE IR ============
export type {
  Code,
  CFile,
  CScript,
  CImport,
  CStmt,
  CExpr,
  CRaw,
  CJsxElement,
  CJsxAttr,
  CJsxText,
  CTmplElement,
  CTmplDirective,
  CTmplAttr,
  CTmplText,
  CTmplMustache,
  CGroup,
  CIndent,
  CStyle,
} from "./code-ir/nodes.ts";
export {
  cFile,
  cScript,
  cImport,
  cStmt,
  cExpr,
  cRaw,
  cJsxElement,
  cJsxAttr,
  cJsxText,
  cTmplElement,
  cTmplDirective,
  cTmplAttr,
  cTmplText,
  cTmplMustache,
  cGroup,
  cIndent,
  cStyle,
} from "./code-ir/builders.ts";

// ============ PRINTER ============
export { print, type PrintOptions, type PrintResult } from "./print/printer.ts";

// ============ BUILT-IN TARGETS ============
export { react as reactTarget } from "./targets/react/index.ts";
export { vue as vueTarget } from "./targets/vue/index.ts";
export { svelte as svelteTarget } from "./targets/svelte/index.ts";
export { solid as solidTarget } from "./targets/solid/index.ts";
export { angular as angularTarget } from "./targets/angular/index.ts";
export { qwik as qwikTarget } from "./targets/qwik/index.ts";
export { astro as astroTarget } from "./targets/astro/index.ts";
