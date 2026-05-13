import * as ts from "typescript";
import { DYNAMIC_DEPS } from "../../../ir/reactivity.ts";
import type {
  IRComponent,
  IRExprNode,
  IRModule,
  PrimitiveUsage,
} from "../../../ir/render/nodes.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
import type { Pass } from "../../types.ts";
import type { TsProgramArtifact } from "../01-program.ts";
import { bindPrimitives } from "./bind-primitives.ts";
import { extractDeps } from "./deps.ts";
import { parseExpression } from "./jsx/index.ts";
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

      // (d) setup
      const setupResult = parseSetup(site.setupFn, componentId, bindings, sourceFile, ctx);

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
        props: [],
        slots: [],
        events: [],
        state: setupResult.state,
        refs: setupResult.refs,
        memos: setupResult.memos,
        effects: setupResult.effects,
        lifecycle: setupResult.lifecycle,
        setup: setupResult.setup,
        render,
        primitives,
        targetOverrides: {},
      };

      // (f) deps — walk all IRExprNodes and resolve deps
      resolveDeps(component, setupResult.scope, checker);

      components.push(component);
    }

    const importDecls = sourceFile.statements.filter(ts.isImportDeclaration);

    return {
      fileName: sourceFile.fileName,
      components,
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
  for (const effect of component.effects) {
    if (ts.isArrowFunction(effect.body) || ts.isFunctionExpression(effect.body)) {
      const body = effect.body;
      const syntheticExpr: IRExprNode = {
        kind: "Expression",
        expr: body,
        deps: DYNAMIC_DEPS,
        isReactive: false,
        emissionContext: "setup",
        isDynamic: false,
        loc: component.loc,
      };
      resolve(syntheticExpr);
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
