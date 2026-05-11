import * as ts from "typescript";

import type {
  IRAttribute,
  IRComponent,
  IRComponentInstance,
  IRElement,
  IREventBinding,
  IRExpressionNode,
  IRFor,
  IRFragment,
  IRIf,
  IRNode,
  IRRefBinding,
  IRSlotPlaceholder,
  IRSwitch,
} from "../../ir/nodes.ts";
import type { GenerateContext, GeneratedFile, Target } from "../../plugin.ts";
import {
  buildCodegenScope,
  isJsxExpression,
  printRawExpression,
  printStaticValue,
  resolveBindingGetter,
  type CodegenScope,
  type MemberRewrite,
  type PrintExpressionOptions,
} from "../print.ts";

export const svelteTarget: Target = {
  name: "svelte",
  defaultOptions: {},
  generate(component: IRComponent, _ctx: GenerateContext): GeneratedFile[] {
    const code = emitSvelteFile(component);
    return [{ path: `${component.name}.svelte`, contents: code }];
  },
};

function buildSvelteMemberRewrites(component: IRComponent): ReadonlyMap<string, MemberRewrite> {
  const rewrites = new Map<string, MemberRewrite>();
  if (component.props.length > 0) rewrites.set("props", { strip: true });
  if (component.slots.length > 0) {
    const rename = new Map<string, string>();
    rename.set("default", "children");
    rewrites.set("slots", { strip: true, rename });
  }
  return rewrites;
}

function emitSvelteFile(component: IRComponent): string {
  const scope = buildCodegenScope(component);
  const memberRewrites = buildSvelteMemberRewrites(component);
  const opts: PrintExpressionOptions = { readStyle: "strip", scope, memberRewrites };
  const lines: string[] = [];
  const script = emitScript(component, scope, opts);
  if (script) {
    lines.push(`<script lang="ts">`);
    lines.push(script);
    lines.push(`</script>`);
    lines.push("");
  }
  lines.push(emitSvelteTemplate(component.render, scope, opts, 0));
  lines.push("");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// <script> block
// ---------------------------------------------------------------------------

function emitScript(
  component: IRComponent,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  const lines: string[] = [];
  const imports = emitImports(component);
  if (imports) lines.push(imports);

  const propsBindings: string[] = [
    ...component.props.map((p) => p.name),
    ...component.slots.map((s) => (s.name === "default" ? "children" : s.name)),
  ];
  if (propsBindings.length > 0) {
    lines.push(`  let { ${propsBindings.join(", ")} } = $props();`);
  }

  for (const state of component.state) {
    const initial = svelteExpr(state.initial, scope, opts);
    lines.push(`  let ${state.name} = $state(${initial});`);
  }

  for (const ref of component.refs) {
    const typeAnnotation = ref.elementType ? `: ${ref.elementType}` : "";
    lines.push(`  let ${ref.name}${typeAnnotation};`);
  }

  for (const memo of component.memos) {
    const body = svelteExpr(memo.expr, scope, opts);
    lines.push(`  let ${memo.name} = $derived(${body});`);
  }

  for (const effect of component.effects) {
    const body = svelteEffectBody(effect.body, scope, opts);
    lines.push(`  $effect(${body});`);
  }

  for (const mount of component.lifecycle.onMount) {
    const body = svelteEffectBody(mount.body, scope, opts);
    lines.push(`  onMount(${body});`);
  }

  for (const cleanup of component.lifecycle.onCleanup) {
    const body = svelteEffectBody(cleanup.body, scope, opts);
    lines.push(`  onDestroy(${body});`);
  }

  if (lines.length === 0) return "";
  return lines.join("\n");
}

function emitImports(component: IRComponent): string {
  const svelteImports = new Set<string>();
  if (component.lifecycle.onMount.length > 0) svelteImports.add("onMount");
  if (component.lifecycle.onCleanup.length > 0) svelteImports.add("onDestroy");
  if (svelteImports.size === 0) return "";
  return `  import { ${Array.from(svelteImports).sort().join(", ")} } from 'svelte';`;
}

// ---------------------------------------------------------------------------
// Svelte expression printing — strips signal reads AND rewrites setters
// ---------------------------------------------------------------------------

function svelteExpr(
  node: IRExpressionNode,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  return svelteRewrite(node.expr, scope, opts);
}

function svelteEffectBody(
  body: ts.Expression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  return svelteRewrite(body, scope, opts);
}

function svelteRewrite(
  expr: ts.Expression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  if (ts.isCallExpression(expr)) return svelteRewriteCall(expr, scope, opts);
  if (ts.isArrowFunction(expr)) return svelteRewriteArrow(expr, scope, opts);
  if (ts.isFunctionExpression(expr)) return svelteRewriteFunctionExpr(expr, scope, opts);
  if (ts.isConditionalExpression(expr)) {
    return `${svelteRewrite(expr.condition, scope, opts)} ? ${svelteRewrite(expr.whenTrue, scope, opts)} : ${svelteRewrite(expr.whenFalse, scope, opts)}`;
  }
  if (ts.isBinaryExpression(expr)) {
    return `${svelteRewrite(expr.left, scope, opts)} ${expr.operatorToken.getText()} ${svelteRewrite(expr.right, scope, opts)}`;
  }
  if (ts.isPrefixUnaryExpression(expr)) {
    return `${ts.tokenToString(expr.operator)}${svelteRewrite(expr.operand, scope, opts)}`;
  }
  if (ts.isPropertyAccessExpression(expr)) {
    if (ts.isIdentifier(expr.expression) && opts.memberRewrites) {
      const rule = opts.memberRewrites.get(expr.expression.text);
      if (rule) return rule.rename?.get(expr.name.text) ?? expr.name.text;
    }
    if (
      ts.isIdentifier(expr.expression) &&
      expr.name.text === "current" &&
      scope.refs.has(expr.expression.text)
    ) {
      return expr.expression.text;
    }
    const dot = expr.questionDotToken ? "?." : ".";
    return `${svelteRewrite(expr.expression, scope, opts)}${dot}${expr.name.text}`;
  }
  if (ts.isObjectLiteralExpression(expr)) return svelteRewriteObject(expr, scope, opts);
  if (ts.isArrayLiteralExpression(expr)) {
    return `[${expr.elements.map((e) => svelteRewrite(e, scope, opts)).join(", ")}]`;
  }
  if (ts.isParenthesizedExpression(expr)) {
    return `(${svelteRewrite(expr.expression, scope, opts)})`;
  }
  if (ts.isTemplateExpression(expr)) {
    let out = "`" + expr.head.text;
    for (const span of expr.templateSpans) {
      out += "${" + svelteRewrite(span.expression, scope, opts) + "}";
      out += span.literal.text;
    }
    return out + "`";
  }
  if (ts.isElementAccessExpression(expr)) {
    const bracket = expr.questionDotToken ? "?.[" : "[";
    return `${svelteRewrite(expr.expression, scope, opts)}${bracket}${svelteRewrite(expr.argumentExpression, scope, opts)}]`;
  }
  if (ts.isNonNullExpression(expr)) {
    return `${svelteRewrite(expr.expression, scope, opts)}!`;
  }
  if (ts.isSpreadElement(expr)) {
    return `...${svelteRewrite(expr.expression, scope, opts)}`;
  }
  return printRawExpression(expr, opts);
}

function svelteRewriteCall(
  call: ts.CallExpression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  const callee = call.expression;
  if (
    ts.isIdentifier(callee) &&
    call.arguments.length === 0 &&
    scope.reactiveReaders.has(callee.text)
  ) {
    return callee.text;
  }
  if (ts.isIdentifier(callee) && scope.stableSetters.has(callee.text)) {
    const getter = scope.setterToGetter.get(callee.text);
    if (getter && call.arguments.length > 0) {
      const arg = call.arguments[0]!;
      if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) {
        const params = arg.parameters;
        if (params.length === 1 && ts.isIdentifier(params[0]!.name)) {
          const paramName = params[0]!.name.text;
          const inlineExpr =
            arg.body && !ts.isBlock(arg.body)
              ? arg.body
              : ts.isBlock(arg.body)
                ? simpleReturnExpr(arg.body)
                : null;
          if (inlineExpr) {
            const rewritten = svelteRewrite(inlineExpr, scope, opts).replace(
              new RegExp(`\\b${paramName}\\b`, "g"),
              getter,
            );
            return `${getter} = ${rewritten}`;
          }
        }
        return `${getter} = (${svelteRewrite(arg, scope, opts)})(${getter})`;
      }
      return `${getter} = ${svelteRewrite(arg, scope, opts)}`;
    }
  }
  const args = call.arguments.map((a) => svelteRewrite(a, scope, opts));
  const calleeStr = svelteRewrite(callee, scope, opts);
  const open = call.questionDotToken ? "?.(" : "(";
  return `${calleeStr}${open}${args.join(", ")})`;
}

function svelteRewriteArrow(
  fn: ts.ArrowFunction,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  const params = fn.parameters.map((p) => verbatim(p)).join(", ");
  const paramStr = fn.parameters.length === 1 && !fn.parameters[0]!.type ? params : `(${params})`;
  if (ts.isBlock(fn.body)) return `${paramStr} => ${svelteRewriteBlock(fn.body, scope, opts)}`;
  const body = svelteRewrite(fn.body, scope, opts);
  if (bodyEmitsAssignment(fn.body, scope)) return `${paramStr} => {\n  ${body};\n}`;
  return `${paramStr} => ${body}`;
}

function svelteRewriteFunctionExpr(
  fn: ts.FunctionExpression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  const params = fn.parameters.map((p) => verbatim(p)).join(", ");
  const name = fn.name ? ` ${fn.name.text}` : "";
  return `function${name}(${params}) ${svelteRewriteBlock(fn.body, scope, opts)}`;
}

function svelteRewriteBlock(
  block: ts.Block,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  const lines: string[] = [];
  for (const stmt of block.statements) lines.push(svelteRewriteStatement(stmt, scope, opts));
  if (lines.length === 0) return "{}";
  return `{\n${lines.map((l) => `  ${l}`).join("\n")}\n}`;
}

function svelteRewriteStatement(
  stmt: ts.Statement,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  if (ts.isReturnStatement(stmt)) {
    return stmt.expression ? `return ${svelteRewrite(stmt.expression, scope, opts)};` : "return;";
  }
  if (ts.isExpressionStatement(stmt)) {
    return `${svelteRewrite(stmt.expression, scope, opts)};`;
  }
  if (ts.isVariableStatement(stmt)) {
    const kw = stmt.declarationList.flags & ts.NodeFlags.Const ? "const" : "let";
    const decls = stmt.declarationList.declarations.map((d) => {
      const name = verbatim(d.name);
      return d.initializer ? `${name} = ${svelteRewrite(d.initializer, scope, opts)}` : name;
    });
    return `${kw} ${decls.join(", ")};`;
  }
  return verbatim(stmt);
}

function svelteRewriteObject(
  obj: ts.ObjectLiteralExpression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  if (obj.properties.length === 0) return "{}";
  const entries: string[] = [];
  for (const prop of obj.properties) {
    if (ts.isPropertyAssignment(prop)) {
      entries.push(`${verbatim(prop.name)}: ${svelteRewrite(prop.initializer, scope, opts)}`);
    } else if (ts.isShorthandPropertyAssignment(prop)) {
      entries.push(prop.name.text);
    } else if (ts.isSpreadAssignment(prop)) {
      entries.push(`...${svelteRewrite(prop.expression, scope, opts)}`);
    } else {
      entries.push(verbatim(prop));
    }
  }
  return `{ ${entries.join(", ")} }`;
}

function simpleReturnExpr(block: ts.Block): ts.Expression | null {
  if (block.statements.length !== 1) return null;
  const only = block.statements[0]!;
  if (!ts.isReturnStatement(only) || !only.expression) return null;
  return only.expression;
}

function bodyEmitsAssignment(expr: ts.Expression, scope: CodegenScope): boolean {
  if (ts.isCallExpression(expr)) {
    const callee = expr.expression;
    return (
      ts.isIdentifier(callee) && scope.stableSetters.has(callee.text) && expr.arguments.length > 0
    );
  }
  if (ts.isBinaryExpression(expr)) {
    const kind = expr.operatorToken.kind;
    return kind >= ts.SyntaxKind.FirstAssignment && kind <= ts.SyntaxKind.LastAssignment;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Template
// ---------------------------------------------------------------------------

function emitSvelteTemplate(
  node: IRNode,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  switch (node.kind) {
    case "Element":
      return emitElement(node, scope, opts, depth);
    case "ComponentInstance":
      return emitComponentInstance(node, scope, opts, depth);
    case "Text":
      return `${pad}${node.value}`;
    case "Expression":
      if (isJsxExpression(node.expr)) return emitJsxAsTemplate(node.expr, scope, opts, depth);
      return `${pad}{${svelteExpr(node, scope, opts)}}`;
    case "Fragment":
      return emitFragment(node, scope, opts, depth);
    case "If":
      return emitIf(node, scope, opts, depth);
    case "For":
      return emitFor(node, scope, opts, depth);
    case "Switch":
      return emitSwitch(node, scope, opts, depth);
    case "SlotPlaceholder":
      return emitSlotPlaceholder(node, scope, opts, depth);
  }
}

function emitElement(
  node: IRElement,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const attrsStr = emitAttrs(node.attrs, node.events, node.refs, scope, opts);
  if (node.children.length === 0) return `${pad}<${node.tag}${attrsStr} />`;
  const children = node.children.map((c) => emitSvelteTemplate(c, scope, opts, depth + 1));
  return `${pad}<${node.tag}${attrsStr}>\n${children.join("\n")}\n${pad}</${node.tag}>`;
}

function emitComponentInstance(
  node: IRComponentInstance,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const name = ts.isIdentifier(node.reference) ? node.reference.text : verbatim(node.reference);
  const attrsStr = emitAttrs(node.attrs, node.events, [], scope, opts);
  const defaultSlot = node.slots.find((s) => s.name === "default");
  const namedSlots = node.slots.filter((s) => s.name !== "default");
  if (!defaultSlot && namedSlots.length === 0) return `${pad}<${name}${attrsStr} />`;
  const lines: string[] = [];
  lines.push(`${pad}<${name}${attrsStr}>`);
  for (const slot of namedSlots) {
    lines.push(`${pad}  {#snippet ${slot.name}()}`);
    lines.push(emitSvelteTemplate(slot.body, scope, opts, depth + 2));
    lines.push(`${pad}  {/snippet}`);
  }
  if (defaultSlot) lines.push(emitSvelteTemplate(defaultSlot.body, scope, opts, depth + 1));
  lines.push(`${pad}</${name}>`);
  return lines.join("\n");
}

function emitFragment(
  node: IRFragment,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  return node.children.map((c) => emitSvelteTemplate(c, scope, opts, depth)).join("\n");
}

function emitIf(
  node: IRIf,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const lines: string[] = [];
  for (let i = 0; i < node.branches.length; i++) {
    const branch = node.branches[i]!;
    const test = svelteExpr(branch.test, scope, opts);
    if (i === 0) {
      lines.push(`${pad}{#if ${test}}`);
    } else {
      lines.push(`${pad}{:else if ${test}}`);
    }
    lines.push(emitSvelteTemplate(branch.body, scope, opts, depth + 1));
  }
  if (node.fallback) {
    lines.push(`${pad}{:else}`);
    lines.push(emitSvelteTemplate(node.fallback, scope, opts, depth + 1));
  }
  lines.push(`${pad}{/if}`);
  return lines.join("\n");
}

function emitFor(
  node: IRFor,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const each = svelteExpr(node.each, scope, opts);
  const key = svelteExpr(node.key, scope, opts);
  const binding = node.indexBinding
    ? `${node.itemBinding}, ${node.indexBinding}`
    : node.itemBinding;
  const body: IRNode =
    node.body.kind === "Element"
      ? { ...node.body, attrs: node.body.attrs.filter((a) => a.name !== "key") }
      : node.body;
  const lines = [
    `${pad}{#each ${each} as ${binding} (${key})}`,
    emitSvelteTemplate(body, scope, opts, depth + 1),
    `${pad}{/each}`,
  ];
  return lines.join("\n");
}

function emitSwitch(
  node: IRSwitch,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const ifNode: IRIf = {
    kind: "If",
    branches: node.cases.map((c) => ({ test: c.test, body: c.body })),
    fallback: node.fallback,
    loc: node.loc,
  };
  return emitIf(ifNode, scope, opts, depth);
}

function emitSlotPlaceholder(
  node: IRSlotPlaceholder,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const snippetName = node.name === "default" ? "children" : node.name;
  if (node.scopedArgs.length > 0) {
    const args = node.scopedArgs.map((a) => svelteExpr(a, scope, opts)).join(", ");
    return `${pad}{@render ${snippetName}(${args})}`;
  }
  return `${pad}{@render ${snippetName}()}`;
}

// ---------------------------------------------------------------------------
// Inline JSX inside Expression IR nodes (e.g. `fallback={<p/>}`)
// ---------------------------------------------------------------------------

function emitJsxAsTemplate(
  expr: ts.Expression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  if (ts.isParenthesizedExpression(expr)) {
    return emitJsxAsTemplate(expr.expression, scope, opts, depth);
  }
  const pad = "  ".repeat(depth);
  if (ts.isJsxFragment(expr)) {
    return expr.children
      .map((c) => emitJsxChild(c, scope, opts, depth))
      .filter((s) => s.length > 0)
      .join("\n");
  }
  if (ts.isJsxSelfClosingElement(expr)) {
    const tag = expr.tagName.getText();
    const attrsStr = emitJsxAttrs(expr.attributes, scope, opts);
    return `${pad}<${tag}${attrsStr} />`;
  }
  if (ts.isJsxElement(expr)) {
    const tag = expr.openingElement.tagName.getText();
    const attrsStr = emitJsxAttrs(expr.openingElement.attributes, scope, opts);
    const children = expr.children
      .map((c) => emitJsxChild(c, scope, opts, depth + 1))
      .filter((s) => s.length > 0);
    if (children.length === 0) return `${pad}<${tag}${attrsStr} />`;
    return `${pad}<${tag}${attrsStr}>\n${children.join("\n")}\n${pad}</${tag}>`;
  }
  return `${pad}{${svelteRewrite(expr, scope, opts)}}`;
}

function emitJsxChild(
  child: ts.JsxChild,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  if (ts.isJsxText(child)) {
    const text = child.text;
    if (text.trim().length === 0) return "";
    return `${pad}${text.trim()}`;
  }
  if (ts.isJsxExpression(child)) {
    if (!child.expression) return "";
    if (isJsxExpression(child.expression)) {
      return emitJsxAsTemplate(child.expression, scope, opts, depth);
    }
    return `${pad}{${svelteRewrite(child.expression, scope, opts)}}`;
  }
  return emitJsxAsTemplate(child, scope, opts, depth);
}

function emitJsxAttrs(
  attrs: ts.JsxAttributes,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  const parts: string[] = [];
  for (const prop of attrs.properties) {
    if (!ts.isJsxAttribute(prop)) continue;
    if (!ts.isIdentifier(prop.name)) continue;
    const name = prop.name.text;
    const init = prop.initializer;
    if (!init) {
      parts.push(name);
      continue;
    }
    if (ts.isStringLiteral(init)) {
      parts.push(`${name}="${init.text}"`);
      continue;
    }
    if (ts.isJsxExpression(init) && init.expression) {
      const rewritten = svelteRewrite(init.expression, scope, opts);
      const attrName = /^on[A-Z]/.test(name) ? svelteEventName(name) : name;
      parts.push(`${attrName}={${rewritten}}`);
    }
  }
  if (parts.length === 0) return "";
  return " " + parts.join(" ");
}

// ---------------------------------------------------------------------------
// Attributes
// ---------------------------------------------------------------------------

function emitAttrs(
  attrs: IRAttribute[],
  events: IREventBinding[],
  refs: IRRefBinding[],
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  const parts: string[] = [];
  for (const attr of attrs) {
    if (attr.binding === "twoWay") {
      const getter =
        attr.value.kind === "Expression" ? resolveBindingGetter(attr.value, opts) : attr.name;
      parts.push(`bind:${attr.name}={${getter}}`);
      continue;
    }
    if (
      attr.binding === "style" &&
      attr.value.kind === "Expression" &&
      ts.isObjectLiteralExpression(attr.value.expr)
    ) {
      for (const prop of attr.value.expr.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          const kebab = camelToKebab(prop.name.text);
          parts.push(`style:${kebab}={${svelteRewrite(prop.initializer, scope, opts)}}`);
        }
      }
      continue;
    }
    if (attr.value.kind === "Static") {
      if (attr.value.value === true) {
        parts.push(attr.name);
      } else if (typeof attr.value.value === "string") {
        parts.push(`${attr.name}=${printStaticValue(attr.value)}`);
      } else {
        parts.push(`${attr.name}={${printStaticValue(attr.value)}}`);
      }
    } else {
      parts.push(`${attr.name}={${svelteExpr(attr.value, scope, opts)}}`);
    }
  }
  for (const evt of events) {
    if (evt.synthesized) continue;
    const svelteName = svelteEventName(evt.name);
    parts.push(`${svelteName}={${svelteExpr(evt.handler, scope, opts)}}`);
  }
  for (const ref of refs) {
    if (ref.ref.kind === "Expression" && ts.isIdentifier(ref.ref.expr)) {
      parts.push(`bind:this={${ref.ref.expr.text}}`);
    }
  }
  if (parts.length === 0) return "";
  return " " + parts.join(" ");
}

function svelteEventName(jsxName: string): string {
  return jsxName.toLowerCase();
}

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

const tsPrinter = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const emptySF = ts.createSourceFile("_gen.tsx", "", ts.ScriptTarget.ESNext);

function verbatim(node: ts.Node): string {
  const sf = node.getSourceFile?.();
  if (sf) return node.getText(sf);
  return tsPrinter.printNode(ts.EmitHint.Unspecified, node, emptySF);
}
