import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { angularConformance } from "./conformance.ts";
import type { Code } from "../../code-ir/nodes.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import { cFile, cImport, cStmt, cRaw, cGroup } from "../../code-ir/builders.ts";
import { rewriteExpr, rewriteEventName, rewriteAttrName } from "../../shared/expr-rewrite.ts";
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "preserve-call" },
  setterStyle: { kind: "function-call" },
  refAccess: { kind: "bare" },
  jsxAttrCasing: "html",
  eventNameCase: "camel",
  members: { props: { strip: true } },
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
            `(${rewriteEventName(e.name, rules).replace(/^on/, "").toLowerCase()})="${rewriteExpr(e.handler.expr, rules)}"`,
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
    case "For":
      return `@for (${node.itemBinding} of ${rewriteExpr(node.each.expr, rules)}; track ${rewriteExpr(node.key.expr, rules)}) {\n${emitNode(node.body, rules)}\n}`;
    case "Switch": {
      let result = "@switch (true) {\n";
      for (const c of node.cases) {
        result += `  @case (${rewriteExpr(c.test.expr, rules)}) {\n    ${emitNode(c.body, rules)}\n  }\n`;
      }
      if (node.fallback) result += `  @default {\n    ${emitNode(node.fallback, rules)}\n  }\n`;
      result += "}";
      return result;
    }
    case "Fragment":
      return node.children.map((c) => emitNode(c, rules)).join("\n");
    case "ComponentInstance": {
      const tag = node.resolved?.name ?? "unknown";
      const ciParts: string[] = [];
      for (const a of node.attrs) {
        const name = rewriteAttrName(a.name, rules);
        if (a.value.kind === "Static") ciParts.push(`${name}="${a.value.value}"`);
        else ciParts.push(`[${name}]="${rewriteExpr(a.value.expr, rules)}"`);
      }
      for (const e of node.events) {
        ciParts.push(
          `(${rewriteEventName(e.name, rules).replace(/^on/, "").toLowerCase()})="${rewriteExpr(e.handler.expr, rules)}"`,
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
    case "SlotPlaceholder":
      return `<ng-content${node.name !== "default" ? ` select="[slot=${node.name}]"` : ""} />`;
    default:
      assertNever(node);
  }
}

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  const rules = ctx.rewrites;
  const body: Code[] = [];
  const angularImports = ["Component", "signal", "computed", "effect"];

  for (const s of component.state) {
    body.push(
      cStmt({ body: `${s.name} = signal(${rewriteExpr(s.initial.expr, rules)})`, span: s.loc }),
    );
  }
  for (const m of component.memos) {
    body.push(
      cStmt({
        body: `${m.name} = computed(() => ${rewriteExpr(m.expr.expr, rules)})`,
        span: m.loc,
      }),
    );
  }
  for (const e of component.effects) {
    body.push(
      cStmt({ body: `constructor() { effect(${rewriteExpr(e.body, rules)}) }`, span: e.loc }),
    );
  }
  for (const res of component.resources) {
    angularImports.push("resource");
    body.push(
      cStmt({
        body: `${res.name} = resource({ loader: ${rewriteExpr(res.fetcher.expr, rules)} })`,
        span: res.loc,
      }),
    );
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

  const template = emitNode(component.render, rules);

  const file = cFile({
    flavor: "ts",
    children: [
      cImport({
        module: "@angular/core",
        named: [...new Set(angularImports)].map((i) => ({ imported: i })),
      }),
      cRaw({ text: "" }),
      cRaw({
        text: `@Component({ standalone: true, template: \`${template.replace(/`/g, "\\`").replace(/\$\{/g, "\\${")}\` })`,
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
