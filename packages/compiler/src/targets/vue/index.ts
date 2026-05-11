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

export const vueTarget: Target = {
  name: "vue",
  defaultOptions: {},
  generate(component: IRComponent, _ctx: GenerateContext): GeneratedFile[] {
    const code = emitVueSFC(component);
    return [{ path: `${component.name}.vue`, contents: code }];
  },
};

function buildVueMemberRewrites(component: IRComponent): ReadonlyMap<string, MemberRewrite> {
  const rewrites = new Map<string, MemberRewrite>();
  if (component.props.length > 0) rewrites.set("props", { strip: true });
  return rewrites;
}

function emitVueSFC(component: IRComponent): string {
  const scope = buildCodegenScope(component);
  const memberRewrites = buildVueMemberRewrites(component);
  const setupOpts: PrintExpressionOptions = { readStyle: "strip", scope, memberRewrites };
  const lines: string[] = [];
  const script = emitScriptSetup(component, scope, setupOpts);
  if (script) {
    lines.push(`<script setup lang="ts">`);
    lines.push(script);
    lines.push(`</script>`);
    lines.push("");
  }
  lines.push(`<template>`);
  lines.push(emitTemplate(component.render, scope, setupOpts, 1));
  lines.push(`</template>`);
  lines.push("");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// <script setup> block
// ---------------------------------------------------------------------------

function emitScriptSetup(
  component: IRComponent,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  const lines: string[] = [];
  const imports = emitImports(component);
  if (imports) lines.push(imports);

  if (component.props.length > 0) {
    const propNames = component.props.map((p) => p.name).join(", ");
    lines.push(
      `const { ${propNames} } = defineProps<{ ${component.props.map((p) => `${p.name}${p.required ? "" : "?"}: any`).join("; ")} }>();`,
    );
  }

  if (component.slots.length > 0) {
    lines.push(`const slots = useSlots();`);
  }

  for (const state of component.state) {
    const initial = vueSetupExpr(state.initial, scope, opts);
    lines.push(`const ${state.name} = ref(${initial});`);
  }

  for (const ref of component.refs) {
    const typeArg = ref.elementType ? `<${ref.elementType}>` : "";
    lines.push(`const ${ref.name} = useTemplateRef${typeArg}('${ref.name}');`);
  }

  for (const memo of component.memos) {
    const body = vueSetupExpr(memo.expr, scope, opts);
    lines.push(`const ${memo.name} = computed(() => ${body});`);
  }

  for (const effect of component.effects) {
    const body = vueSetupEffectBody(effect.body, scope, opts);
    lines.push(`watchEffect(${body});`);
  }

  for (const mount of component.lifecycle.onMount) {
    const body = vueSetupEffectBody(mount.body, scope, opts);
    lines.push(`onMounted(${body});`);
  }

  for (const cleanup of component.lifecycle.onCleanup) {
    const body = vueSetupEffectBody(cleanup.body, scope, opts);
    lines.push(`onUnmounted(${body});`);
  }

  if (lines.length === 0) return "";
  return lines.join("\n");
}

function emitImports(component: IRComponent): string {
  const imports = new Set<string>();
  if (component.state.length > 0) imports.add("ref");
  if (component.memos.length > 0) imports.add("computed");
  if (component.effects.length > 0) imports.add("watchEffect");
  if (component.refs.length > 0) imports.add("useTemplateRef");
  if (component.slots.length > 0) imports.add("useSlots");
  if (component.lifecycle.onMount.length > 0) imports.add("onMounted");
  if (component.lifecycle.onCleanup.length > 0) imports.add("onUnmounted");
  if (imports.size === 0) return "";
  return `import { ${Array.from(imports).sort().join(", ")} } from 'vue';`;
}

// ---------------------------------------------------------------------------
// Vue expression printing — setup context adds .value, template strips it
// ---------------------------------------------------------------------------

function vueSetupExpr(
  node: IRExpressionNode,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  const raw = vueRewrite(node.expr, scope, opts, "setup");
  return raw;
}

function vueTemplateExpr(
  node: IRExpressionNode,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  return vueRewrite(node.expr, scope, opts, "template");
}

function vueSetupEffectBody(
  body: ts.Expression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  return vueRewrite(body, scope, opts, "setup");
}

type VueContext = "setup" | "template";

function vueRewrite(
  expr: ts.Expression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  ctx: VueContext,
): string {
  if (ts.isCallExpression(expr)) return vueRewriteCall(expr, scope, opts, ctx);
  if (ts.isArrowFunction(expr)) return vueRewriteArrow(expr, scope, opts, ctx);
  if (ts.isFunctionExpression(expr)) return vueRewriteFunctionExpr(expr, scope, opts, ctx);
  if (ts.isConditionalExpression(expr)) {
    return `${vueRewrite(expr.condition, scope, opts, ctx)} ? ${vueRewrite(expr.whenTrue, scope, opts, ctx)} : ${vueRewrite(expr.whenFalse, scope, opts, ctx)}`;
  }
  if (ts.isBinaryExpression(expr)) {
    return `${vueRewrite(expr.left, scope, opts, ctx)} ${expr.operatorToken.getText()} ${vueRewrite(expr.right, scope, opts, ctx)}`;
  }
  if (ts.isPrefixUnaryExpression(expr)) {
    return `${ts.tokenToString(expr.operator)}${vueRewrite(expr.operand, scope, opts, ctx)}`;
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
      return ctx === "setup" ? `${expr.expression.text}.value` : expr.expression.text;
    }
    const dot = expr.questionDotToken ? "?." : ".";
    return `${vueRewrite(expr.expression, scope, opts, ctx)}${dot}${expr.name.text}`;
  }
  if (ts.isObjectLiteralExpression(expr)) return vueRewriteObject(expr, scope, opts, ctx);
  if (ts.isArrayLiteralExpression(expr)) {
    return `[${expr.elements.map((e) => vueRewrite(e, scope, opts, ctx)).join(", ")}]`;
  }
  if (ts.isParenthesizedExpression(expr)) {
    return `(${vueRewrite(expr.expression, scope, opts, ctx)})`;
  }
  if (ts.isTemplateExpression(expr)) {
    let out = "`" + expr.head.text;
    for (const span of expr.templateSpans) {
      out += "${" + vueRewrite(span.expression, scope, opts, ctx) + "}";
      out += span.literal.text;
    }
    return out + "`";
  }
  if (ts.isIdentifier(expr)) {
    const name = expr.text;
    if (scope.reactiveReaders.has(name)) {
      return ctx === "setup" ? `${name}.value` : name;
    }
    return name;
  }
  if (ts.isNonNullExpression(expr)) {
    return `${vueRewrite(expr.expression, scope, opts, ctx)}!`;
  }
  if (ts.isElementAccessExpression(expr)) {
    const bracket = expr.questionDotToken ? "?.[" : "[";
    return `${vueRewrite(expr.expression, scope, opts, ctx)}${bracket}${vueRewrite(expr.argumentExpression, scope, opts, ctx)}]`;
  }
  if (ts.isSpreadElement(expr)) {
    return `...${vueRewrite(expr.expression, scope, opts, ctx)}`;
  }
  return printRawExpression(expr, opts);
}

function vueRewriteCall(
  call: ts.CallExpression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  ctx: VueContext,
): string {
  const callee = call.expression;
  if (
    ts.isIdentifier(callee) &&
    call.arguments.length === 0 &&
    scope.reactiveReaders.has(callee.text)
  ) {
    return ctx === "setup" ? `${callee.text}.value` : callee.text;
  }
  if (ts.isIdentifier(callee) && scope.stableSetters.has(callee.text)) {
    const getter = scope.setterToGetter.get(callee.text);
    if (getter && call.arguments.length > 0) {
      const arg = call.arguments[0]!;
      const target = ctx === "setup" ? `${getter}.value` : getter;
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
            const rewritten = vueRewrite(inlineExpr, scope, opts, ctx).replace(
              new RegExp(`\\b${paramName}\\b`, "g"),
              target,
            );
            return `${target} = ${rewritten}`;
          }
        }
        return `${target} = (${vueRewrite(arg, scope, opts, ctx)})(${target})`;
      }
      return `${target} = ${vueRewrite(arg, scope, opts, ctx)}`;
    }
  }
  const args = call.arguments.map((a) => vueRewrite(a, scope, opts, ctx));
  const calleeStr = vueRewrite(callee, scope, opts, ctx);
  const open = call.questionDotToken ? "?.(" : "(";
  return `${calleeStr}${open}${args.join(", ")})`;
}

function vueRewriteArrow(
  fn: ts.ArrowFunction,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  ctx: VueContext,
): string {
  const params = fn.parameters.map((p) => verbatim(p)).join(", ");
  const paramStr = fn.parameters.length === 1 && !fn.parameters[0]!.type ? params : `(${params})`;
  if (ts.isBlock(fn.body)) return `${paramStr} => ${vueRewriteBlock(fn.body, scope, opts, ctx)}`;
  const body = vueRewrite(fn.body, scope, opts, ctx);
  if (bodyEmitsAssignment(fn.body, scope)) return `${paramStr} => {\n  ${body};\n}`;
  return `${paramStr} => ${body}`;
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

function vueRewriteFunctionExpr(
  fn: ts.FunctionExpression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  ctx: VueContext,
): string {
  const params = fn.parameters.map((p) => verbatim(p)).join(", ");
  const name = fn.name ? ` ${fn.name.text}` : "";
  return `function${name}(${params}) ${vueRewriteBlock(fn.body, scope, opts, ctx)}`;
}

function vueRewriteBlock(
  block: ts.Block,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  ctx: VueContext,
): string {
  const lines: string[] = [];
  for (const stmt of block.statements) lines.push(vueRewriteStatement(stmt, scope, opts, ctx));
  if (lines.length === 0) return "{}";
  return `{\n${lines.map((l) => `  ${l}`).join("\n")}\n}`;
}

function vueRewriteStatement(
  stmt: ts.Statement,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  ctx: VueContext,
): string {
  if (ts.isReturnStatement(stmt)) {
    return stmt.expression ? `return ${vueRewrite(stmt.expression, scope, opts, ctx)};` : "return;";
  }
  if (ts.isExpressionStatement(stmt)) {
    return `${vueRewrite(stmt.expression, scope, opts, ctx)};`;
  }
  if (ts.isVariableStatement(stmt)) {
    const kw = stmt.declarationList.flags & ts.NodeFlags.Const ? "const" : "let";
    const decls = stmt.declarationList.declarations.map((d) => {
      const name = verbatim(d.name);
      return d.initializer ? `${name} = ${vueRewrite(d.initializer, scope, opts, ctx)}` : name;
    });
    return `${kw} ${decls.join(", ")};`;
  }
  return verbatim(stmt);
}

function vueRewriteObject(
  obj: ts.ObjectLiteralExpression,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  ctx: VueContext,
): string {
  if (obj.properties.length === 0) return "{}";
  const entries: string[] = [];
  for (const prop of obj.properties) {
    if (ts.isPropertyAssignment(prop)) {
      entries.push(`${verbatim(prop.name)}: ${vueRewrite(prop.initializer, scope, opts, ctx)}`);
    } else if (ts.isShorthandPropertyAssignment(prop)) {
      entries.push(prop.name.text);
    } else if (ts.isSpreadAssignment(prop)) {
      entries.push(`...${vueRewrite(prop.expression, scope, opts, ctx)}`);
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

// ---------------------------------------------------------------------------
// <template> block
// ---------------------------------------------------------------------------

function emitTemplate(
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
      return `${pad}{{ ${vueTemplateExpr(node, scope, opts)} }}`;
    case "Fragment":
      return emitFragment(node, scope, opts, depth);
    case "If":
      return emitIf(node, scope, opts, depth);
    case "For":
      return emitFor(node, scope, opts, depth);
    case "Switch":
      return emitSwitch(node, scope, opts, depth);
    case "SlotPlaceholder":
      return emitSlot(node, scope, opts, depth);
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
  const children = node.children.map((c) => emitTemplate(c, scope, opts, depth + 1));
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
    lines.push(`${pad}  <template #${slot.name}>`);
    lines.push(emitTemplate(slot.body, scope, opts, depth + 2));
    lines.push(`${pad}  </template>`);
  }
  if (defaultSlot) lines.push(emitTemplate(defaultSlot.body, scope, opts, depth + 1));
  lines.push(`${pad}</${name}>`);
  return lines.join("\n");
}

function emitFragment(
  node: IRFragment,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  return node.children.map((c) => emitTemplate(c, scope, opts, depth)).join("\n");
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
    const test = attrQuote(vueTemplateExpr(branch.test, scope, opts));
    const directive = i === 0 ? "v-if" : "v-else-if";
    if (branch.body.kind === "Element") {
      const el = branch.body;
      const attrsStr = emitAttrs(el.attrs, el.events, el.refs, scope, opts);
      if (el.children.length === 0) {
        lines.push(`${pad}<${el.tag} ${directive}=${test}${attrsStr} />`);
      } else {
        const children = el.children.map((c) => emitTemplate(c, scope, opts, depth + 1));
        lines.push(`${pad}<${el.tag} ${directive}=${test}${attrsStr}>`);
        lines.push(children.join("\n"));
        lines.push(`${pad}</${el.tag}>`);
      }
    } else {
      lines.push(`${pad}<template ${directive}=${test}>`);
      lines.push(emitTemplate(branch.body, scope, opts, depth + 1));
      lines.push(`${pad}</template>`);
    }
  }
  if (node.fallback) {
    if (node.fallback.kind === "Element") {
      const el = node.fallback;
      const attrsStr = emitAttrs(el.attrs, el.events, el.refs, scope, opts);
      if (el.children.length === 0) {
        lines.push(`${pad}<${el.tag} v-else${attrsStr} />`);
      } else {
        const children = el.children.map((c) => emitTemplate(c, scope, opts, depth + 1));
        lines.push(`${pad}<${el.tag} v-else${attrsStr}>`);
        lines.push(children.join("\n"));
        lines.push(`${pad}</${el.tag}>`);
      }
    } else {
      lines.push(`${pad}<template v-else>`);
      lines.push(emitTemplate(node.fallback, scope, opts, depth + 1));
      lines.push(`${pad}</template>`);
    }
  }
  return lines.join("\n");
}

function emitFor(
  node: IRFor,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const each = vueTemplateExpr(node.each, scope, opts);
  const key = attrQuote(vueTemplateExpr(node.key, scope, opts));
  const binding = node.indexBinding
    ? `(${node.itemBinding}, ${node.indexBinding})`
    : node.itemBinding;
  const forValue = attrQuote(`${binding} in ${each}`);
  if (node.body.kind === "Element") {
    const el = node.body;
    const bodyAttrs = el.attrs.filter((a) => a.name !== "key");
    const attrsStr = emitAttrs(bodyAttrs, el.events, el.refs, scope, opts);
    if (el.children.length === 0) {
      return `${pad}<${el.tag} v-for=${forValue} :key=${key}${attrsStr} />`;
    }
    const children = el.children.map((c) => emitTemplate(c, scope, opts, depth + 1));
    const lines = [
      `${pad}<${el.tag} v-for=${forValue} :key=${key}${attrsStr}>`,
      ...children,
      `${pad}</${el.tag}>`,
    ];
    return lines.join("\n");
  }
  const lines = [
    `${pad}<template v-for=${forValue} :key=${key}>`,
    emitTemplate(node.body, scope, opts, depth + 1),
    `${pad}</template>`,
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

function emitSlot(
  node: IRSlotPlaceholder,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  if (node.name === "default" && node.scopedArgs.length === 0) return `${pad}<slot />`;
  const parts: string[] = [];
  if (node.name !== "default") parts.push(`name="${node.name}"`);
  for (const arg of node.scopedArgs) {
    if (ts.isObjectLiteralExpression(arg.expr)) {
      for (const prop of arg.expr.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          parts.push(
            `:${prop.name.text}=${attrQuote(vueTemplateExpr({ ...arg, expr: prop.initializer }, scope, opts))}`,
          );
        }
      }
    }
  }
  return `${pad}<slot ${parts.join(" ")} />`;
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
  return `${pad}{{ ${vueRewrite(expr, scope, opts, "template")} }}`;
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
    return `${pad}{{ ${vueRewrite(child.expression, scope, opts, "template")} }}`;
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
      const rewritten = vueRewrite(init.expression, scope, opts, "template");
      if (/^on[A-Z]/.test(name)) {
        parts.push(`@${vueEventName(name)}=${attrQuote(rewritten)}`);
      } else {
        parts.push(`:${name}=${attrQuote(rewritten)}`);
      }
    }
  }
  if (parts.length === 0) return "";
  return " " + parts.join(" ");
}

// ---------------------------------------------------------------------------
// Attribute emission
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
      parts.push(`v-model=${attrQuote(getter)}`);
      continue;
    }
    if (attr.value.kind === "Static") {
      if (attr.value.value === true) {
        parts.push(attr.name);
      } else if (typeof attr.value.value === "string") {
        parts.push(`${attr.name}=${printStaticValue(attr.value)}`);
      } else {
        parts.push(`:${attr.name}="${printStaticValue(attr.value)}"`);
      }
    } else {
      parts.push(`:${attr.name}=${attrQuote(vueTemplateExpr(attr.value, scope, opts))}`);
    }
  }
  for (const evt of events) {
    if (evt.synthesized) continue;
    const vueName = vueEventName(evt.name);
    parts.push(`@${vueName}=${attrQuote(vueTemplateExpr(evt.handler, scope, opts))}`);
  }
  for (const ref of refs) {
    if (ref.ref.kind === "Expression" && ts.isIdentifier(ref.ref.expr)) {
      parts.push(`ref="${ref.ref.expr.text}"`);
    }
  }
  if (parts.length === 0) return "";
  return " " + parts.join(" ");
}

function attrQuote(value: string): string {
  if (value.includes('"')) {
    if (!value.includes("'")) return `'${value}'`;
    return `"${value.replace(/"/g, "&quot;")}"`;
  }
  return `"${value}"`;
}

function vueEventName(jsxName: string): string {
  if (!jsxName.startsWith("on")) return jsxName;
  const rest = jsxName.slice(2);
  return rest.charAt(0).toLowerCase() + rest.slice(1);
}

const tsPrinter = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const emptySF = ts.createSourceFile("_gen.tsx", "", ts.ScriptTarget.ESNext);

function verbatim(node: ts.Node): string {
  const sf = node.getSourceFile?.();
  if (sf) return node.getText(sf);
  return tsPrinter.printNode(ts.EmitHint.Unspecified, node, emptySF);
}
