import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { qwikConformance } from "./conformance.ts";
import type { Code } from "../../code-ir/nodes.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import {
  cFile,
  cImport,
  cStmt,
  cExpr,
  cRaw,
  cJsxElement,
  cJsxAttr,
  cJsxText,
  cGroup,
} from "../../code-ir/builders.ts";
import { rewriteExpr, rewriteEventName, rewriteAttrName } from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "field-access", field: "value" },
  setterStyle: { kind: "field-assignment", field: "value" },
  refAccess: { kind: "field", field: "value" },
  jsxAttrCasing: "html",
  eventNameCase: "camel",
  members: { props: { strip: false } },
};

function jsxAttrs(
  node: {
    readonly attrs: readonly any[];
    readonly events: readonly any[];
    readonly refs: readonly any[];
  },
  rules: RewriteRules,
) {
  const out = node.attrs.map((a: any) => {
    const name = rewriteAttrName(a.name, rules);
    if (a.value.kind === "Static") {
      const v = a.value.value;
      return typeof v === "boolean"
        ? cJsxAttr({ name, value: { kind: "boolean" } })
        : cJsxAttr({ name, value: { kind: "static", text: String(v) } });
    }
    return cJsxAttr({
      name,
      value: { kind: "expr", expr: cExpr({ text: rewriteExpr(a.value.expr, rules) }) },
    });
  });
  for (const e of node.events) {
    out.push(
      cJsxAttr({
        name: rewriteEventName(e.name, rules),
        value: {
          kind: "expr",
          expr: cExpr({ text: `$(() => ${rewriteExpr(e.handler.expr, rules)})` }),
        },
      }),
    );
  }
  for (const r of node.refs) {
    out.push(
      cJsxAttr({
        name: "ref",
        value: { kind: "expr", expr: cExpr({ text: rewriteExpr(r.ref.expr, rules) }) },
      }),
    );
  }
  return out;
}

function emitNode(node: IRNode, rules: RewriteRules): Code {
  switch (node.kind) {
    case "Element": {
      const attrs = jsxAttrs(node, rules);
      const children = node.children.map((c) => emitNode(c, rules));
      return cJsxElement({ tag: node.tag, attrs, children, selfClose: children.length === 0 });
    }
    case "ComponentInstance": {
      const tag = node.resolved?.name ?? node.reference.getText();
      const attrs = jsxAttrs(node, rules);
      const children = node.slots.map((s) =>
        s.name === "default"
          ? emitNode(s.body, rules)
          : cJsxElement({
              tag: `${tag}.${s.name}`,
              attrs: [],
              children: [emitNode(s.body, rules)],
              selfClose: false,
            }),
      );
      return cJsxElement({ tag, attrs, children, selfClose: children.length === 0 });
    }
    case "Text":
      return cJsxText({ text: node.value });
    case "Expression":
      return cExpr({ text: `{${rewriteExpr(node.expr, rules)}}` });
    case "If":
      return cExpr({
        text: `{${node.branches.map((b) => `${rewriteExpr(b.test.expr, rules)} ? (<>${emitNodeInline(b.body, rules)}</>)`).join(" : ")} : ${node.fallback ? `(<>${emitNodeInline(node.fallback, rules)}</>)` : "null"}}`,
      });
    case "For": {
      const params = node.indexBinding
        ? `(${node.itemBinding}, ${node.indexBinding})`
        : `(${node.itemBinding})`;
      return cExpr({
        text: `{${rewriteExpr(node.each.expr, rules)}.map(${params} => (<>${emitNodeInline(node.body, rules)}</>))}`,
      });
    }
    case "Switch": {
      const fallback = node.fallback ? `(<>${emitNodeInline(node.fallback, rules)}</>)` : "null";
      return cExpr({
        text: `{${node.cases.map((c) => `${rewriteExpr(c.test.expr, rules)} ? (<>${emitNodeInline(c.body, rules)}</>)`).join(" : ")} : ${fallback}}`,
      });
    }
    case "SlotPlaceholder": {
      const propName = node.name === "default" ? "children" : node.name;
      const argsStr =
        node.scopedArgs.length > 0
          ? node.scopedArgs.map((a) => rewriteExpr(a.expr, rules)).join(", ")
          : "";
      if (node.scopedArgs.length > 0) {
        return node.fallback
          ? cExpr({
              text: `{props.${propName}?.(${argsStr}) ?? ${emitFallback(node.fallback, rules)}}`,
            })
          : cExpr({ text: `{props.${propName}?.(${argsStr})}` });
      }
      if (node.fallback) {
        return cExpr({ text: `{props.${propName} ?? ${emitFallback(node.fallback, rules)}}` });
      }
      return cExpr({ text: `{props.${propName}}` });
    }
    case "Transition": {
      const attrs = [cJsxAttr({ name: "name", value: { kind: "static", text: node.name } })];
      if (node.appear) {
        attrs.push(cJsxAttr({ name: "appear", value: { kind: "boolean" } }));
      }
      return cJsxElement({
        tag: "__InkTransition",
        attrs,
        children: [emitNode(node.child, rules)],
        selfClose: false,
      });
    }
    case "Fragment":
      return cJsxElement({
        tag: "",
        attrs: [],
        children: node.children.map((c) => emitNode(c, rules)),
        selfClose: false,
      });
    default:
      assertNever(node);
  }
}

function inlineCode(code: Code): string {
  switch (code.kind) {
    case "CJsxText":
      return code.text;
    case "CExpr":
      return code.text;
    case "CJsxElement": {
      const tag = code.tag || "";
      const attrStr = code.attrs
        .map((a) => {
          if (a.kind !== "CJsxAttr") return "";
          if (a.value.kind === "boolean") return ` ${a.name}`;
          if (a.value.kind === "static") return ` ${a.name}="${a.value.text}"`;
          return ` ${a.name}={${a.value.expr.text}}`;
        })
        .join("");
      if (code.selfClose) return `<${tag}${attrStr} />`;
      const childStr = code.children.map((c) => inlineCode(c)).join("");
      return `<${tag}${attrStr}>${childStr}</${tag}>`;
    }
    case "CGroup":
      return code.children.map((c) => inlineCode(c)).join("");
    case "CRaw":
      return code.text;
    default:
      return "";
  }
}

function emitNodeInline(node: IRNode, rules: RewriteRules): string {
  if (node.kind === "Text") {
    return `"${node.value}"`;
  }
  return inlineCode(emitNode(node, rules));
}

function emitFallback(node: IRNode, rules: RewriteRules): string {
  if (node.kind === "Text") return `"${node.value}"`;
  if (node.kind === "Expression") return rewriteExpr(node.expr, rules);
  return inlineCode(emitNode(node, rules));
}

function hasTransition(node: IRNode): boolean {
  if (node.kind === "Transition") return true;
  switch (node.kind) {
    case "Element":
    case "Fragment":
      return node.children.some(hasTransition);
    case "If":
      return (
        node.branches.some((b) => hasTransition(b.body)) ||
        (node.fallback ? hasTransition(node.fallback) : false)
      );
    case "For":
      return hasTransition(node.body);
    case "Switch":
      return (
        node.cases.some((c) => hasTransition(c.body)) ||
        (node.fallback ? hasTransition(node.fallback) : false)
      );
    case "ComponentInstance":
      return node.slots.some((s) => hasTransition(s.body));
    default:
      return false;
  }
}

const QWIK_TRANSITION_HELPER = `const __InkTransition = component$((props: { name?: string; appear?: boolean; children?: any }) => {
  const name = props.name ?? "ink";
  const ref = useSignal<HTMLDivElement>();
  const show = useSignal(true);
  useVisibleTask$(({ track, cleanup }) => {
    track(() => props.children);
    const el = ref.value;
    if (!el) return;
    const active = !!props.children;
    if (active) {
      el.classList.add(name + "-enter-from", name + "-enter-active");
      requestAnimationFrame(() => { el.classList.remove(name + "-enter-from"); el.classList.add(name + "-enter-to"); });
      const done = () => { el.classList.remove(name + "-enter-active", name + "-enter-to"); };
      el.addEventListener("transitionend", done, { once: true });
    } else if (show.value) {
      el.classList.add(name + "-leave-from", name + "-leave-active");
      requestAnimationFrame(() => { el.classList.remove(name + "-leave-from"); el.classList.add(name + "-leave-to"); });
      const done = () => { el.classList.remove(name + "-leave-active", name + "-leave-to"); show.value = false; };
      el.addEventListener("transitionend", done, { once: true });
      const t = setTimeout(done, 1000);
      cleanup(() => { clearTimeout(t); el.removeEventListener("transitionend", done); });
    }
  });
  return show.value ? <div ref={ref} style={{ display: "contents" }}>{props.children}</div> : null;
});`;

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  const rules = ctx.rewrites;
  const body: Code[] = [];
  const qwikImports = ["component$", "useSignal", "useComputed$", "useVisibleTask$", "$"];

  for (const p of component.provides) {
    qwikImports.push("useContextProvider");
    const valueExpr = rewriteExpr(p.value.expr, rules);
    body.push(
      cStmt({ body: `useContextProvider(${p.contextName}.id, ${valueExpr})`, span: p.loc }),
    );
  }
  for (const c of component.consumes) {
    qwikImports.push("useContext");
    body.push(cStmt({ body: `const ${c.name} = useContext(${c.contextName}.id)`, span: c.loc }));
  }

  for (const s of component.state) {
    body.push(
      cStmt({
        body: `const ${s.name} = useSignal(${rewriteExpr(s.initial.expr, rules)})`,
        span: s.loc,
      }),
    );
  }
  for (const m of component.memos) {
    body.push(
      cStmt({
        body: `const ${m.name} = useComputed$(() => ${rewriteExpr(m.expr.expr, rules)})`,
        span: m.loc,
      }),
    );
  }
  for (const e of component.effects) {
    body.push(cStmt({ body: `useVisibleTask$(${rewriteExpr(e.body, rules)})`, span: e.loc }));
  }
  for (const res of component.resources) {
    qwikImports.push("useResource$");
    body.push(
      cStmt({
        body: `const ${res.name} = useResource$(${rewriteExpr(res.fetcher.expr, rules)})`,
        span: res.loc,
      }),
    );
  }
  for (const r of component.refs) {
    body.push(
      cStmt({
        body: `const ${r.name} = useSignal${r.elementType ? `<${r.elementType} | null>` : ""}(null)`,
        span: r.loc,
      }),
    );
  }

  const needsTransition = hasTransition(component.render);

  const renderTree = emitNode(component.render, rules);

  const styleImport =
    component.styles.length > 0 ? [cRaw({ text: `import "./${component.name}.css";` })] : [];

  const contextDefs: Code[] = [];
  for (const ctxDef of ctx.contexts) {
    qwikImports.push("createContextId");
    const defaultText = ctxDef.defaultValue
      ? rewriteExpr(ctxDef.defaultValue.expr, rules)
      : "undefined";
    const typeParam = ctxDef.typeText ? `<${ctxDef.typeText}>` : "";
    contextDefs.push(
      cStmt({
        body: `export const ${ctxDef.name} = { id: createContextId${typeParam}("${ctxDef.name}"), defaultValue: ${defaultText} }`,
      }),
    );
  }

  const file = cFile({
    flavor: "tsx",
    children: [
      cImport({
        module: "@qwik.dev/core",
        named: [...new Set(qwikImports)].map((i) => ({ imported: i })),
      }),
      ...emitComponentImports(ctx.componentImports, "", false),
      ...ctx.externalImports,
      ...styleImport,
      ...(ctx.typeDeclarations.length > 0 ? [cRaw({ text: "" }), ...ctx.typeDeclarations] : []),
      ...(contextDefs.length > 0 ? [cRaw({ text: "" }), ...contextDefs] : []),
      ...(needsTransition ? [cRaw({ text: "" }), cRaw({ text: QWIK_TRANSITION_HELPER })] : []),
      cRaw({ text: "" }),
      cStmt({
        body:
          component.props.length > 0 || component.slots.length > 0
            ? `export const ${component.name} = component$((props) =>`
            : `export const ${component.name} = component$(() =>`,
      }),
      cRaw({ text: "{" }),
      cGroup({
        children: [
          ...body,
          cRaw({ text: "" }),
          cStmt({ body: "return (" }),
          renderTree,
          cStmt({ body: ")" }),
        ],
      }),
      cRaw({ text: "});" }),
    ],
  });

  return { componentName: component.name, root: file, fileName: `${component.name}.tsx` };
}

export const qwik: Target = {
  name: "qwik",
  rewrites: REWRITES,
  conformance: qwikConformance,
  emit,
};
export default qwik;
