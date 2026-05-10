import type * as ts from "typescript";

import type {
  IRAttribute,
  IRComponent,
  IRComponentInstance,
  IRElement,
  IREventBinding,
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
  printAttrValue,
  printExpression,
  printStaticValue,
  resolveBindingGetter,
  type CodegenScope,
  type PrintExpressionOptions,
} from "../print.ts";

export const solidTarget: Target = {
  name: "solid",
  defaultOptions: {},
  generate(component: IRComponent, _ctx: GenerateContext): GeneratedFile[] {
    const code = emitSolidComponent(component);
    return [{ path: `${component.name}.tsx`, contents: code }];
  },
};

function emitSolidComponent(component: IRComponent): string {
  const scope = buildCodegenScope(component);
  const opts: PrintExpressionOptions = { readStyle: "keep", scope };
  const lines: string[] = [];
  lines.push(emitImports(component));
  lines.push("");
  lines.push(emitFunctionComponent(component, scope, opts));
  return lines.join("\n") + "\n";
}

function emitImports(component: IRComponent): string {
  const imports = new Set<string>();
  if (component.state.length > 0) imports.add("createSignal");
  if (component.memos.length > 0) imports.add("createMemo");
  if (component.effects.length > 0) imports.add("createEffect");
  if (component.lifecycle.onMount.length > 0) imports.add("onMount");
  if (component.lifecycle.onCleanup.length > 0) imports.add("onCleanup");

  const controlImports = new Set<string>();
  collectControlFlowImports(component.render, controlImports);
  for (const ci of controlImports) imports.add(ci);

  if (imports.size === 0) return "";
  return `import { ${Array.from(imports).sort().join(", ")} } from 'solid-js';`;
}

function collectControlFlowImports(node: IRNode, out: Set<string>): void {
  switch (node.kind) {
    case "If":
      out.add("Show");
      for (const b of node.branches) collectControlFlowImports(b.body, out);
      if (node.fallback) collectControlFlowImports(node.fallback, out);
      break;
    case "For":
      out.add("For");
      collectControlFlowImports(node.body, out);
      break;
    case "Switch":
      out.add("Switch");
      out.add("Match");
      for (const c of node.cases) collectControlFlowImports(c.body, out);
      if (node.fallback) collectControlFlowImports(node.fallback, out);
      break;
    case "Element":
      for (const child of node.children) collectControlFlowImports(child, out);
      break;
    case "Fragment":
      for (const child of node.children) collectControlFlowImports(child, out);
      break;
    case "ComponentInstance":
      for (const slot of node.slots) collectControlFlowImports(slot.body, out);
      break;
    default:
      break;
  }
}

function emitFunctionComponent(
  component: IRComponent,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
): string {
  const lines: string[] = [];
  const propsParam = buildPropsParam(component);
  lines.push(`export function ${component.name}(${propsParam}) {`);

  for (const state of component.state) {
    const initial = printExpression(state.initial, opts);
    lines.push(`  const [${state.name}, ${state.setterName}] = createSignal(${initial});`);
  }

  for (const ref of component.refs) {
    const typeAnnotation = ref.elementType ? `: ${ref.elementType} | undefined` : "";
    lines.push(`  let ${ref.name}${typeAnnotation};`);
  }

  for (const memo of component.memos) {
    const body = printExpression(memo.expr, opts);
    lines.push(`  const ${memo.name} = createMemo(() => ${body});`);
  }

  for (const effect of component.effects) {
    const body = printEffectBody(effect.body, opts);
    lines.push(`  createEffect(${body});`);
  }

  for (const mount of component.lifecycle.onMount) {
    const body = printEffectBody(mount.body, opts);
    lines.push(`  onMount(${body});`);
  }

  for (const cleanup of component.lifecycle.onCleanup) {
    const body = printEffectBody(cleanup.body, opts);
    lines.push(`  onCleanup(${body});`);
  }

  lines.push("");
  lines.push(`  return (`);
  const jsx = emitJSX(component.render, scope, opts, 2);
  lines.push(jsx);
  lines.push(`  );`);
  lines.push(`}`);
  return lines.join("\n");
}

function buildPropsParam(component: IRComponent): string {
  if (component.props.length === 0 && component.slots.length === 0) return "";
  return "props";
}

function printEffectBody(body: ts.Expression, opts: PrintExpressionOptions): string {
  return printExpression(
    {
      kind: "Expression",
      expr: body,
      deps: [],
      isReactive: false,
      isDynamic: false,
      emissionContext: "setup",
      loc: { file: "", line: 0, column: 0, offset: 0, length: 0 },
    },
    opts,
  );
}

// --- JSX emission (Solid-specific) ---

function emitJSX(
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
    case "Expression": {
      const text = printExpression(node, opts);
      if (isJsxExpression(node.expr)) return `${pad}${text}`;
      return `${pad}{${text}}`;
    }
    case "Fragment":
      return emitFragment(node, scope, opts, depth);
    case "If":
      return emitShow(node, scope, opts, depth);
    case "For":
      return emitSolidFor(node, scope, opts, depth);
    case "Switch":
      return emitSolidSwitch(node, scope, opts, depth);
    case "SlotPlaceholder":
      return emitSlotPlaceholder(node, opts, depth);
  }
}

function emitElement(
  node: IRElement,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const attrsStr = emitAttributes(node.attrs, node.events, node.refs, opts);
  if (node.children.length === 0) return `${pad}<${node.tag}${attrsStr} />`;
  const childLines = node.children.map((c) => emitJSX(c, scope, opts, depth + 1));
  return `${pad}<${node.tag}${attrsStr}>\n${childLines.join("\n")}\n${pad}</${node.tag}>`;
}

function emitComponentInstance(
  node: IRComponentInstance,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const name = node.reference.getText?.(node.reference.getSourceFile?.()) ?? "Component";
  const attrsStr = emitAttributes(node.attrs, node.events, [], opts);
  const defaultSlot = node.slots.find((s) => s.name === "default");
  if (!defaultSlot) return `${pad}<${name}${attrsStr} />`;
  const childLines = emitJSX(defaultSlot.body, scope, opts, depth + 1);
  return `${pad}<${name}${attrsStr}>\n${childLines}\n${pad}</${name}>`;
}

function emitFragment(
  node: IRFragment,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  if (node.children.length === 0) return `${pad}<></>`;
  const childLines = node.children.map((c) => emitJSX(c, scope, opts, depth + 1));
  return `${pad}<>\n${childLines.join("\n")}\n${pad}</>`;
}

function emitShow(
  node: IRIf,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  if (node.branches.length === 0) {
    return node.fallback ? emitJSX(node.fallback, scope, opts, depth) : `${pad}{null}`;
  }
  const branch = node.branches[0]!;
  const test = printExpression(branch.test, opts);
  const body = emitJSX(branch.body, scope, opts, depth + 1);
  const fallbackAttr = node.fallback
    ? ` fallback={${emitJSX(node.fallback, scope, opts, 0).trim()}}`
    : "";
  if (node.branches.length === 1) {
    return `${pad}<Show when={${test}}${fallbackAttr}>\n${body}\n${pad}</Show>`;
  }
  const lines: string[] = [];
  lines.push(`${pad}<Show when={${test}}${fallbackAttr}>`);
  lines.push(body);
  lines.push(`${pad}</Show>`);
  return lines.join("\n");
}

function emitSolidFor(
  node: IRFor,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const each = printExpression(node.each, opts);
  const params = node.indexBinding
    ? `(${node.itemBinding}, ${node.indexBinding})`
    : `(${node.itemBinding})`;
  const body = emitJSX(node.body, scope, opts, depth + 1);
  return `${pad}<For each={${each}}>\n${pad}  {${params} => (\n${body}\n${pad}  )}\n${pad}</For>`;
}

function emitSolidSwitch(
  node: IRSwitch,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const fallbackAttr = node.fallback
    ? ` fallback={${emitJSX(node.fallback, scope, opts, 0).trim()}}`
    : "";
  const lines: string[] = [];
  lines.push(`${pad}<Switch${fallbackAttr}>`);
  for (const c of node.cases) {
    const test = printExpression(c.test, opts);
    const body = emitJSX(c.body, scope, opts, depth + 2);
    lines.push(`${pad}  <Match when={${test}}>`);
    lines.push(body);
    lines.push(`${pad}  </Match>`);
  }
  lines.push(`${pad}</Switch>`);
  return lines.join("\n");
}

function emitSlotPlaceholder(
  node: IRSlotPlaceholder,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const propName = node.name === "default" ? "props.children" : `props.${node.name}`;
  if (node.scopedArgs.length > 0) {
    const args = node.scopedArgs.map((a) => printExpression(a, opts)).join(", ");
    return `${pad}{${propName}?.(${args})}`;
  }
  return `${pad}{${propName}}`;
}

function emitAttributes(
  attrs: IRAttribute[],
  events: IREventBinding[],
  refs: IRRefBinding[],
  opts: PrintExpressionOptions,
): string {
  const parts: string[] = [];
  for (const attr of attrs) {
    if (attr.value.kind === "Static") {
      if (attr.value.value === true) {
        parts.push(attr.name);
      } else if (typeof attr.value.value === "string") {
        parts.push(`${attr.name}=${printStaticValue(attr.value)}`);
      } else {
        parts.push(`${attr.name}={${printStaticValue(attr.value)}}`);
      }
    } else if (attr.binding === "twoWay" && attr.value.kind === "Expression") {
      const getter = resolveBindingGetter(attr.value, opts);
      parts.push(`${attr.name}={${getter}}`);
    } else {
      parts.push(`${attr.name}={${printAttrValue(attr.value, opts)}}`);
    }
  }
  for (const evt of events) {
    parts.push(`${evt.name}={${printExpression(evt.handler, opts)}}`);
  }
  for (const ref of refs) {
    parts.push(`ref={${printExpression(ref.ref, opts)}}`);
  }
  if (parts.length === 0) return "";
  return " " + parts.join(" ");
}
