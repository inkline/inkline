import * as ts from "typescript";

import { createComponentSkeleton, createFragment } from "../ir/builders.ts";
import type { IRComponent } from "../ir/nodes.ts";
import type { IRModule } from "../ir/module.ts";
import type { IRReactiveSymbol } from "../ir/reactivity.ts";
import { UNKNOWN_LOCATION, type Diagnostic } from "../ir/types.ts";
import { collectPrimitiveImports } from "../primitives.ts";
import { ReactiveScope } from "../scope.ts";

import { findComponentDefinitions } from "./component.ts";
import { parseJSXExpression } from "./jsx.ts";
import { applyDefineComponentOptions } from "./options.ts";
import { createSingleFileProgram, type CreatedProgram } from "./program.ts";
import { parseSetupBody } from "./setup.ts";
import { locOf } from "./source-location.ts";

export interface ParseOptions {
  fileName: string;
  source: string;
  /** Pre-built TS program — when omitted, an in-memory single-file program is created. */
  program?: CreatedProgram;
}

/**
 * The top-level entrypoint that turns a TSX source file into an `IRModule`.
 *
 * Pipeline:
 *
 *   1. Build (or reuse) a `ts.Program` and resolve the source file.
 *   2. Collect import declarations and identify which Inkline primitives are
 *      bound (and under what local names).
 *   3. Find every `defineComponent(...)` call site.
 *   4. For each site, build an IR skeleton, apply the static options object,
 *      register the props parameter (so `props.foo` is recognised as
 *      reactive), parse the setup body (which fills state/memos/effects/refs),
 *      then parse the returned render expression.
 *   5. Surface namespace-import-of-`@inkline/core` diagnostics (INK0001).
 */
export function parseModule(options: ParseOptions): IRModule {
  const { sourceFile, checker } =
    options.program ??
    createSingleFileProgram({ fileName: options.fileName, source: options.source });
  const diagnostics: Diagnostic[] = [];
  const imports = collectImports(sourceFile);
  const primitiveImports = collectPrimitiveImports(imports);
  diagnostics.push(...detectNamespaceImports(imports, sourceFile));

  const components = findComponentDefinitions(sourceFile, primitiveImports).map((site) => {
    const component = createComponentSkeleton({
      id: `${sourceFile.fileName}#${site.bindingName ?? "default"}`,
      name: site.bindingName ?? "default",
      render: createFragment([], UNKNOWN_LOCATION),
      loc: locOf(site.call, sourceFile),
    });
    if (site.optionsArg) applyDefineComponentOptions(site.optionsArg, component, sourceFile);
    const scope = new ReactiveScope();
    const slotsSymbol = registerProps(site.setupArg, component, scope, checker);
    const { renderExpression } = parseSetupBody(site.setupArg, {
      primitiveImports,
      scope,
      checker,
      sourceFile,
      component,
    });
    if (renderExpression) {
      component.render = parseJSXExpression(renderExpression, {
        scope,
        checker,
        sourceFile,
        slotsSymbol,
        diagnostics,
      });
    }
    return component;
  });

  return {
    file: sourceFile.fileName,
    components,
    imports,
    diagnostics,
    sourceFile,
  };
}

function collectImports(sourceFile: ts.SourceFile): ts.ImportDeclaration[] {
  const out: ts.ImportDeclaration[] = [];
  for (const stmt of sourceFile.statements) {
    if (ts.isImportDeclaration(stmt)) out.push(stmt);
  }
  return out;
}

function detectNamespaceImports(
  imports: readonly ts.ImportDeclaration[],
  sourceFile: ts.SourceFile,
): Diagnostic[] {
  const out: Diagnostic[] = [];
  for (const decl of imports) {
    const moduleSpecifier = decl.moduleSpecifier;
    if (!ts.isStringLiteral(moduleSpecifier)) continue;
    if (moduleSpecifier.text !== "@inkline/core") continue;
    const named = decl.importClause?.namedBindings;
    if (named && ts.isNamespaceImport(named)) {
      out.push({
        code: "INK0001",
        severity: "error",
        message: "Namespace imports of @inkline/core are not supported. Use named imports instead.",
        loc: locOf(decl, sourceFile),
      });
    }
  }
  return out;
}

/**
 * Register the setup callback's first parameter (`props`) so `props.<name>`
 * reads are recognised as reactive. Returns the symbol of the second
 * parameter (`slots`) when present, so the JSX parser can lower
 * `slots.<name>(...)` into `IRSlotPlaceholder`.
 *
 * Two cases are handled:
 *   1. `(props) => ...` with options-declared props -> map prop name to the
 *      property symbol on the props parameter type.
 *   2. `(props: { label: string }) => ...` with a typed param -> register
 *      the property symbols directly from the type.
 */
function registerProps(
  setup: ts.ArrowFunction | ts.FunctionExpression,
  component: IRComponent,
  scope: ReactiveScope,
  checker: ts.TypeChecker,
): ts.Symbol | undefined {
  const propsParam = setup.parameters[0];
  if (!propsParam) return undefined;
  if (propsParam && ts.isIdentifier(propsParam.name)) {
    const propsType = checker.getTypeAtLocation(propsParam.name);
    const propertySymbols = propsType.getProperties();
    for (const propSym of propertySymbols) {
      const reactive: IRReactiveSymbol = {
        kind: "prop",
        name: propSym.name,
        symbol: propSym,
        loc: UNKNOWN_LOCATION,
      };
      scope.register(reactive);
      // If the options-declared props list has this name, store the symbol back
      // onto the IRProp so the IR is consistent with what's registered.
      const declared = component.props.find((p) => p.name === propSym.name);
      if (declared && !declared.symbol) declared.symbol = propSym;
    }
  }
  const slotsParam = setup.parameters[1];
  if (slotsParam && ts.isIdentifier(slotsParam.name)) {
    return checker.getSymbolAtLocation(slotsParam.name);
  }
  return undefined;
}
