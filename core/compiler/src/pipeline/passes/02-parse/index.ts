import * as ts from "typescript";
import { DYNAMIC_DEPS } from "../../../ir/reactivity.ts";
import {
  IR_VERSION,
  type IRComponent,
  type IRContextDefinition,
  type IREffectDeclaration,
  type IRExprNode,
  type IRModule,
  type IRProp,
  type PrimitiveUsage,
} from "../../../ir/render/nodes.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
import type { Pass } from "../../types.ts";
import type { TsProgramArtifact } from "../01-program.ts";
import { bindPrimitives, type BindingTable } from "./bind-primitives.ts";
import { extractDeps, extractDepsFromFunctionBody } from "./deps.ts";
import { toLoc } from "./loc.ts";
import { parseExpression } from "./jsx/index.ts";
import { parseOptions, parsePropsFromParameterType } from "./options.ts";
import { findSites } from "./sites.ts";
import { parseSetup } from "./setup.ts";

export const parsePass: Pass<TsProgramArtifact, IRModule> = {
  name: "parse",
  run(input, ctx) {
    const { sourceFile, checker } = input;

    // (a) bind-primitives
    const bindings = bindPrimitives(sourceFile, ctx);

    // (b) sites
    const sites = findSites(sourceFile, bindings, ctx);

    // per-site: (c) options, (d) setup, (e) jsx, (f) deps
    const components: IRComponent[] = [];

    for (const site of sites) {
      const componentId = `${sourceFile.fileName}#${site.name}`;

      // (c) options — extract props, slots, events from options object or parameter type
      const optionsResult = site.options
        ? parseOptions(site.options, componentId, sourceFile, ctx)
        : undefined;

      const props =
        optionsResult?.props ??
        parsePropsFromParameterType(site.setupFn, componentId, sourceFile, ctx, checker);
      const events = optionsResult?.events ?? [];
      const styles = optionsResult?.styles ?? [];
      const runtime = optionsResult?.runtime ?? "iso";

      // (d) setup
      const setupResult = parseSetup(site.setupFn, componentId, bindings, sourceFile, checker, ctx);

      const slots = [...(optionsResult?.slots ?? []), ...setupResult.slotDeclarations];

      // Register props in the scope so `props.foo` resolves during dep extraction
      registerPropsInScope(site.setupFn, props, componentId, setupResult.scope, checker, ctx);

      // (e) jsx
      const render = setupResult.renderExpr
        ? parseExpression(setupResult.renderExpr, sourceFile)
        : { kind: "Fragment" as const, children: [], loc: site.loc };

      // collect primitives used
      const primitives: PrimitiveUsage[] = [...bindings.entries()].map(([local, name]) => ({
        name,
        localName: local,
      }));

      const component: IRComponent = {
        kind: "Component",
        id: componentId,
        name: site.name,
        loc: site.loc,
        props,
        slots,
        events,
        state: setupResult.state,
        refs: setupResult.refs,
        memos: setupResult.memos,
        effects: setupResult.effects,
        resources: setupResult.resources,
        provides: setupResult.provides,
        consumes: setupResult.consumes,
        lifecycle: setupResult.lifecycle,
        setup: setupResult.setup,
        render,
        primitives,
        styles,
        runtime,
        targetOverrides: {},
        slotBindings: setupResult.slotBindings.size > 0 ? setupResult.slotBindings : undefined,
      };

      // (f) deps — walk all IRExprNodes and resolve deps
      resolveDeps(component, setupResult.scope, checker);

      components.push(component);
    }

    const importDecls = sourceFile.statements.filter(ts.isImportDeclaration);
    const contexts = findContextDefinitions(sourceFile, bindings);

    return {
      version: IR_VERSION,
      fileName: sourceFile.fileName,
      components,
      contexts,
      imports: [...importDecls],
      sourceFile,
    };
  },
};

function resolveDeps(
  component: IRComponent,
  scope: import("./scope.ts").ParseBindingScope,
  checker: ts.TypeChecker,
): void {
  const resolve = (exprNode: IRExprNode): void => {
    if (exprNode.deps === DYNAMIC_DEPS) {
      const result = extractDeps(exprNode.expr, scope, checker);
      (exprNode as { deps: typeof result.deps }).deps = result.deps;
      (exprNode as { isReactive: boolean }).isReactive = result.isReactive;
      (exprNode as { isDynamic: boolean }).isDynamic = result.isDynamic;
    }
  };

  for (const memo of component.memos) resolve(memo.expr);

  const writeEffectDeps = (
    effect: IREffectDeclaration,
    result: ReturnType<typeof extractDeps>,
  ): void => {
    (effect as { deps: typeof result.deps }).deps = result.deps;
    (effect as { isDynamic: boolean }).isDynamic = result.isDynamic;
  };

  for (const effect of component.effects) {
    if (effect.deps === DYNAMIC_DEPS) {
      writeEffectDeps(effect, extractDepsFromFunctionBody(effect.body, scope, checker));
    }
  }
  for (const m of component.lifecycle.onMount) {
    if (m.deps === DYNAMIC_DEPS) {
      writeEffectDeps(m, extractDepsFromFunctionBody(m.body, scope, checker));
    }
  }
  for (const c of component.lifecycle.onCleanup) {
    if (c.deps === DYNAMIC_DEPS) {
      writeEffectDeps(c, extractDepsFromFunctionBody(c.body, scope, checker));
    }
  }

  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind === "Expression") resolve(node);
      if (node.kind === "Element") {
        for (const attr of node.attrs) {
          if (attr.value.kind === "Expression") resolve(attr.value);
        }
        for (const ev of node.events) resolve(ev.handler);
      }
      if (node.kind === "ComponentInstance") {
        for (const attr of node.attrs) {
          if (attr.value.kind === "Expression") resolve(attr.value);
        }
        for (const ev of node.events) resolve(ev.handler);
      }
    },
  });
}

function registerPropsInScope(
  setupFn: ts.ArrowFunction | ts.FunctionExpression,
  props: readonly IRProp[],
  componentId: string,
  scope: import("./scope.ts").ParseBindingScope,
  checker: ts.TypeChecker,
  ctx: import("../../types.ts").PassContext,
): void {
  if (props.length === 0) return;
  const propsParam = setupFn.parameters[0];
  if (!propsParam) return;
  const sym = checker.getSymbolAtLocation(propsParam.name);
  if (!sym) return;
  const id = ctx.symbols.mint({
    componentId,
    kind: "prop",
    name: "props",
    loc: { file: "", line: 0, column: 0, offset: 0, length: 0 },
  });
  scope.register(sym, id, "prop");
}

function localFor(bindings: BindingTable, prim: string): string | undefined {
  for (const [local, name] of bindings) {
    if (name === prim) return local;
  }
  return undefined;
}

function findContextDefinitions(
  sourceFile: ts.SourceFile,
  bindings: BindingTable,
): IRContextDefinition[] {
  const createContextLocal = localFor(bindings, "createContext");
  if (!createContextLocal) return [];

  const contexts: IRContextDefinition[] = [];

  for (const stmt of sourceFile.statements) {
    if (!ts.isVariableStatement(stmt)) continue;

    for (const decl of stmt.declarationList.declarations) {
      if (!decl.initializer || !ts.isIdentifier(decl.name)) continue;
      if (
        !ts.isCallExpression(decl.initializer) ||
        !ts.isIdentifier(decl.initializer.expression) ||
        decl.initializer.expression.text !== createContextLocal
      )
        continue;

      const call = decl.initializer;
      const defaultArg = call.arguments[0];
      let typeText: string | undefined;
      if (call.typeArguments && call.typeArguments.length > 0) {
        typeText = call.typeArguments[0]!.getText(sourceFile);
      }

      contexts.push({
        name: decl.name.text,
        typeText,
        defaultValue: defaultArg
          ? {
              kind: "Expression",
              expr: defaultArg,
              raw: defaultArg.getText(sourceFile),
              deps: DYNAMIC_DEPS,
              isReactive: false,
              emissionContext: "setup",
              isDynamic: false,
              loc: toLoc(defaultArg, sourceFile),
            }
          : undefined,
        loc: toLoc(decl, sourceFile),
      });
    }
  }

  return contexts;
}
