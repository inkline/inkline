import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { angularConformance } from "./conformance.ts";
import type { Code } from "../../code-ir/nodes.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import { cFile, cImport, cStmt, cRaw, cGroup } from "../../code-ir/builders.ts";
import {
  rewriteExpr,
  rewriteEventName,
  rewriteAttrName,
  extractKeyBody,
} from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import { assertNever } from "../../../core/assert.ts";
import * as ts from "typescript";

/**
 * Angular event bindings are statements, not function expressions. Unwrap an authored arrow
 * handler `(e) => body` to its body, mapping the event param to `$event` (e.g.
 * `(input)="value.set($event.target.value)"`). Block bodies become `;`-separated statements.
 */
function angularEventExpr(expr: ts.Expression, rules: RewriteRules): string {
  if (!ts.isArrowFunction(expr)) return rewriteExpr(expr, rules);
  const param = expr.parameters[0];
  const r: RewriteRules =
    param && ts.isIdentifier(param.name)
      ? { ...rules, rename: { ...rules.rename, [param.name.text]: "$event" } }
      : rules;
  if (ts.isBlock(expr.body)) {
    return expr.body.statements
      .filter(ts.isExpressionStatement)
      .map((s) => rewriteExpr(s.expression, r))
      .join("; ");
  }
  return rewriteExpr(expr.body, r);
}

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "preserve-call" },
  setterStyle: { kind: "method-call", method: "set" },
  refAccess: { kind: "bare" },
  jsxAttrCasing: "html",
  eventNameCase: "camel",
  members: { props: { strip: true } },
  // Template expressions live inside double-quoted attribute bindings.
  stringQuote: "single",
};

function emitNode(node: IRNode, rules: RewriteRules): string {
  switch (node.kind) {
    case "Element": {
      const attrs = node.attrs
        .map((a) => {
          const name = rewriteAttrName(a.name, rules);
          if (a.value.kind === "Static") return `${name}="${a.value.value}"`;
          return `[${name}]="${rewriteExpr(a.value.expr, rules)}"`;
        })
        .join(" ");
      const events = node.events
        .map(
          (e) =>
            `(${rewriteEventName(e.name, rules).replace(/^on/, "").toLowerCase()})="${angularEventExpr(e.handler.expr, rules)}"`,
        )
        .join(" ");
      const refs = node.refs.map((r) => `#${rewriteExpr(r.ref.expr, rules)}`).join(" ");
      const attrStr = [attrs, events, refs].filter(Boolean).join(" ");
      const children = node.children.map((c) => emitNode(c, rules)).join("\n");
      if (node.children.length === 0) return `<${node.tag}${attrStr ? " " + attrStr : ""} />`;
      return `<${node.tag}${attrStr ? " " + attrStr : ""}>\n${children}\n</${node.tag}>`;
    }
    case "Text":
      return node.value;
    case "Expression":
      return `{{ ${rewriteExpr(node.expr, rules)} }}`;
    case "If": {
      let result = "";
      for (let i = 0; i < node.branches.length; i++) {
        const b = node.branches[i]!;
        const dir = i === 0 ? "@if" : "@else if";
        result += `${dir} (${rewriteExpr(b.test.expr, rules)}) {\n${emitNode(b.body, rules)}\n}`;
      }
      if (node.fallback) result += ` @else {\n${emitNode(node.fallback, rules)}\n}`;
      return result;
    }
    case "For": {
      const idx = node.indexBinding ? `; let ${node.indexBinding} = $index` : "";
      return `@for (${node.itemBinding} of ${rewriteExpr(node.each.expr, rules)}; track ${extractKeyBody(node.key.expr, rules)}${idx}) {\n${emitNode(node.body, rules)}\n}`;
    }
    case "Switch": {
      // Angular @case matches by value against @switch; our cases are boolean conditions, so
      // emit @if/@else-if chains instead.
      let result = "";
      node.cases.forEach((c, i) => {
        const dir = i === 0 ? "@if" : "@else if";
        result += `${dir} (${rewriteExpr(c.test.expr, rules)}) {\n${emitNode(c.body, rules)}\n}`;
      });
      if (node.fallback) result += ` @else {\n${emitNode(node.fallback, rules)}\n}`;
      return result;
    }
    case "Fragment":
      return node.children.map((c) => emitNode(c, rules)).join("\n");
    case "ComponentInstance": {
      const tag = node.resolved?.name ?? node.reference.getText();
      const ciParts: string[] = [];
      for (const a of node.attrs) {
        const name = rewriteAttrName(a.name, rules);
        if (a.value.kind === "Static") ciParts.push(`${name}="${a.value.value}"`);
        else ciParts.push(`[${name}]="${rewriteExpr(a.value.expr, rules)}"`);
      }
      for (const e of node.events) {
        ciParts.push(
          `(${rewriteEventName(e.name, rules).replace(/^on/, "").toLowerCase()})="${angularEventExpr(e.handler.expr, rules)}"`,
        );
      }
      const ciAttrStr = ciParts.join(" ");
      if (node.slots.length === 0) {
        return `<${tag}${ciAttrStr ? " " + ciAttrStr : ""} />`;
      }
      const slotContent = node.slots
        .map((s) => {
          if (s.name === "default") return emitNode(s.body, rules);
          return `<ng-container slot="${s.name}">\n${emitNode(s.body, rules)}\n</ng-container>`;
        })
        .join("\n");
      return `<${tag}${ciAttrStr ? " " + ciAttrStr : ""}>\n${slotContent}\n</${tag}>`;
    }
    case "Transition":
      return emitNode(node.child, rules);
    case "SlotPlaceholder":
      return `<ng-content${node.name !== "default" ? ` select="[slot=${node.name}]"` : ""} />`;
    default:
      assertNever(node);
  }
}

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  const setters = Object.fromEntries(component.state.map((s) => [s.setterName, s.name]));
  const rules: RewriteRules = { ...ctx.rewrites, setters };
  // Class-body expressions (memos, effects, state initializers) access component members via
  // `this.`, unlike the template which uses bare names. A whole-`props` reference reconstructs
  // the declared props as `{ name: this.name, … }`.
  const propsWhole = `{ ${component.props.map((p) => `${p.name}: this.${p.name}`).join(", ")} }`;
  const bodyRules: RewriteRules = {
    ...rules,
    selfPrefix: true,
    members: {
      ...rules.members,
      props: { strip: rules.members?.props?.strip ?? true, whole: propsWhole },
    },
  };
  const body: Code[] = [];
  const angularImports = ["Component", "signal", "computed", "effect"];

  for (const c of component.consumes) {
    angularImports.push("inject");
    body.push(cStmt({ body: `${c.name} = inject(${c.contextName}.key)`, span: c.loc }));
  }

  for (const s of component.state) {
    body.push(
      cStmt({ body: `${s.name} = signal(${rewriteExpr(s.initial.expr, bodyRules)})`, span: s.loc }),
    );
  }
  for (const m of component.memos) {
    body.push(
      cStmt({
        body: `${m.name} = computed(() => ${rewriteExpr(m.expr.expr, bodyRules)})`,
        span: m.loc,
      }),
    );
  }
  // Effects and lifecycle run from a single constructor (a class can only have one).
  const ctorStmts: string[] = [];
  for (const e of component.effects) ctorStmts.push(`effect(${rewriteExpr(e.body, bodyRules)})`);
  for (const m of component.lifecycle.onMount) {
    angularImports.push("afterNextRender");
    ctorStmts.push(`afterNextRender(${rewriteExpr(m.body, bodyRules)})`);
  }
  for (const c of component.lifecycle.onCleanup) {
    angularImports.push("inject", "DestroyRef");
    ctorStmts.push(`inject(DestroyRef).onDestroy(${rewriteExpr(c.body, bodyRules)})`);
  }
  // Lower each resource to reactive signal state plus an async loader that runs the fetcher and
  // writes the result into those signals — the universal "manual fetch with loading/error state"
  // pattern, expressed with Angular signals. The loader runs from the consolidated constructor.
  for (const res of component.resources) {
    body.push(cStmt({ body: `${res.name} = signal(undefined)`, span: res.loc }));
    if (res.loadingName) body.push(cStmt({ body: `${res.loadingName} = signal(true)` }));
    if (res.errorName) body.push(cStmt({ body: `${res.errorName} = signal(undefined)` }));
    let loader = `(${rewriteExpr(res.fetcher.expr, bodyRules)})().then((d) => this.${res.name}.set(d))`;
    if (res.errorName) loader += `.catch((e) => this.${res.errorName}.set(e))`;
    if (res.loadingName) loader += `.finally(() => this.${res.loadingName}.set(false))`;
    ctorStmts.push(loader);
  }
  if (ctorStmts.length > 0) {
    body.push(cStmt({ body: `constructor() { ${ctorStmts.join("; ")} }` }));
  }
  for (const r of component.refs) {
    angularImports.push("viewChild", "ElementRef");
    body.push(
      cStmt({
        body: `${r.name} = viewChild<ElementRef>('${r.name}')`,
        span: r.loc,
      }),
    );
  }
  if (component.props.length > 0) {
    angularImports.push("Input");
    for (const p of component.props) {
      const opt = p.required ? "!" : "?";
      const type = p.typeNode ? `: ${p.typeNode.getText()}` : "";
      body.push(cStmt({ body: `@Input() ${p.name}${opt}${type}`, span: p.loc }));
    }
  }

  // Bare template reads of a resource's data/loading/error follow Angular's reactiveRead
  // (preserve-call) so they emit as `data()`/`loading()`. Only the template needs this — the
  // class-body declaration rules above must keep emitting the bare field names.
  const resourceReads = new Set(
    component.resources.flatMap((r) =>
      [r.name, r.loadingName, r.errorName].filter((n): n is string => n !== undefined),
    ),
  );
  const templateRules: RewriteRules = { ...rules, reactiveBindings: resourceReads };
  const template = emitNode(component.render, templateRules);
  const styleImport =
    component.styles.length > 0 ? [cRaw({ text: `import "./${component.name}.css";` })] : [];

  const contextDefs: Code[] = [];
  for (const ctxDef of ctx.contexts) {
    angularImports.push("InjectionToken");
    const defaultText = ctxDef.defaultValue
      ? rewriteExpr(ctxDef.defaultValue.expr, rules)
      : "undefined";
    const typeParam = ctxDef.typeText ? `<${ctxDef.typeText}>` : "";
    contextDefs.push(
      cStmt({
        body: `export const ${ctxDef.name} = { key: new InjectionToken${typeParam}("${ctxDef.name}"), defaultValue: ${defaultText} }`,
      }),
    );
  }

  const providers: string[] = [];
  for (const p of component.provides) {
    const valueExpr = rewriteExpr(p.value.expr, rules);
    providers.push(`{ provide: ${p.contextName}.key, useValue: ${valueExpr} }`);
  }
  const providersStr = providers.length > 0 ? `, providers: [${providers.join(", ")}]` : "";

  // Standalone components must declare the components they instantiate.
  const importNames = ctx.componentImports.map((i) => i.localName).filter(Boolean);
  const importsStr = importNames.length > 0 ? `, imports: [${importNames.join(", ")}]` : "";

  const file = cFile({
    flavor: "ts",
    children: [
      cImport({
        module: "@angular/core",
        named: [...new Set(angularImports)].map((i) => ({ imported: i })),
      }),
      ...emitComponentImports(ctx.componentImports, ".component", false, "Component"),
      ...ctx.externalImports,
      ...styleImport,
      ...(ctx.typeDeclarations.length > 0 ? [cRaw({ text: "" }), ...ctx.typeDeclarations] : []),
      ...(contextDefs.length > 0 ? [cRaw({ text: "" }), ...contextDefs] : []),
      cRaw({ text: "" }),
      cRaw({
        text: `@Component({ standalone: true, selector: '${component.name}'${importsStr}${providersStr}, template: \`${template.replace(/`/g, "\\`").replace(/\$\{/g, "\\${")}\` })`,
      }),
      cStmt({ body: `export class ${component.name}Component` }),
      cRaw({ text: "{" }),
      cGroup({ children: body }),
      cRaw({ text: "}" }),
    ],
  });

  return { componentName: component.name, root: file, fileName: `${component.name}.component.ts` };
}

export const angular: Target = {
  name: "angular",
  rewrites: REWRITES,
  conformance: angularConformance,
  emit,
};
export default angular;
