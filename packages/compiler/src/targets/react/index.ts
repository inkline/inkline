import type * as ts from "typescript";

import { reactDepsArray } from "../../analyze/deps.ts";
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
  IRSlotContent,
  IRSlotDeclaration,
  IRSlotPlaceholder,
  IRSwitch,
} from "../../ir/nodes.ts";
import type { GenerateContext, GeneratedFile, Target } from "../../plugin.ts";
import {
  buildCodegenScope,
  printAttrValue,
  printExpression,
  printStaticValue,
  type CodegenScope,
  type PrintExpressionOptions,
} from "../print.ts";

export const reactTarget: Target = {
  name: "react",
  defaultOptions: {},
  generate(component: IRComponent, _ctx: GenerateContext): GeneratedFile[] {
    const code = emitReactComponent(component);
    return [{ path: `${component.name}.tsx`, contents: code }];
  },
};

function emitReactComponent(component: IRComponent): string {
  const scope = buildCodegenScope(component);
  const opts: PrintExpressionOptions = { readStyle: "strip", scope };
  const lines: string[] = [];
  const hasReactivity =
    component.state.length > 0 ||
    component.memos.length > 0 ||
    component.effects.length > 0 ||
    component.lifecycle.onMount.length > 0 ||
    component.lifecycle.onCleanup.length > 0 ||
    component.refs.length > 0;

  if (hasReactivity) lines.push("'use client';", "");

  lines.push(emitImports(component));
  lines.push("");
  lines.push(emitFunctionComponent(component, scope, opts));
  return lines.join("\n") + "\n";
}

function emitImports(component: IRComponent): string {
  const hooks = new Set<string>();
  if (component.state.length > 0) hooks.add("useState");
  if (component.memos.length > 0) hooks.add("useMemo");
  if (component.effects.length > 0) hooks.add("useEffect");
  if (component.refs.length > 0) hooks.add("useRef");
  if (component.lifecycle.onMount.length > 0 || component.lifecycle.onCleanup.length > 0) {
    hooks.add("useEffect");
  }
  if (hooks.size === 0) return "import type { FC } from 'react';";
  const hooksList = Array.from(hooks).sort().join(", ");
  return `import { ${hooksList} } from 'react';`;
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
    lines.push(`  const [${state.name}, ${state.setterName}] = useState(${initial});`);
  }

  for (const ref of component.refs) {
    const typeArg = ref.elementType ? `<${ref.elementType}>` : "";
    lines.push(`  const ${ref.name} = useRef${typeArg}(null);`);
  }

  for (const memo of component.memos) {
    const body = printExpression(memo.expr, opts);
    const deps = reactDepsArray(memo.expr.deps);
    lines.push(`  const ${memo.name} = useMemo(() => ${body}, [${deps.join(", ")}]);`);
  }

  for (const effect of component.effects) {
    const body = printEffectBody(effect.body, opts);
    const deps = reactDepsArray(effect.deps);
    lines.push(`  useEffect(${body}, [${deps.join(", ")}]);`);
  }

  for (const mount of component.lifecycle.onMount) {
    const body = printEffectBody(mount.body, opts);
    lines.push(`  useEffect(${body}, []);`);
  }

  if (component.lifecycle.onCleanup.length > 0) {
    const cleanupBodies = component.lifecycle.onCleanup.map((c) => printEffectBody(c.body, opts));
    lines.push(`  useEffect(() => {`);
    lines.push(`    return () => {`);
    for (const body of cleanupBodies) {
      lines.push(`      (${body})();`);
    }
    lines.push(`    };`);
    lines.push(`  }, []);`);
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
  const parts: string[] = [];
  for (const prop of component.props) {
    parts.push(prop.name);
  }
  const slotsProps = slotsAsProps(component.slots);
  for (const sp of slotsProps) parts.push(sp);
  if (parts.length === 0) return "";
  return `{ ${parts.join(", ")} }`;
}

function slotsAsProps(slots: IRSlotDeclaration[]): string[] {
  const out: string[] = [];
  for (const slot of slots) {
    out.push(slot.name === "default" ? "children" : slot.name);
  }
  return out;
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

// --- JSX emission (React-specific) ---

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
    case "Expression":
      return `${pad}{${printExpression(node, opts)}}`;
    case "Fragment":
      return emitFragment(node, scope, opts, depth);
    case "If":
      return emitIf(node, scope, opts, depth);
    case "For":
      return emitFor(node, scope, opts, depth);
    case "Switch":
      return emitSwitch(node, scope, opts, depth);
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
  const tag = node.tag;
  const attrsStr = emitAttributes(node.attrs, node.events, node.refs, opts, true);
  if (node.children.length === 0) {
    return `${pad}<${tag}${attrsStr} />`;
  }
  const childLines = node.children.map((c) => emitJSX(c, scope, opts, depth + 1));
  return `${pad}<${tag}${attrsStr}>\n${childLines.join("\n")}\n${pad}</${tag}>`;
}

function emitComponentInstance(
  node: IRComponentInstance,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const name = node.reference.getText?.(node.reference.getSourceFile?.()) ?? "Component";
  const slotAttrs = emitSlotProps(node.slots, scope, opts, depth);
  const attrsStr = emitAttributes(node.attrs, node.events, [], opts, true) + slotAttrs;

  const defaultSlot = node.slots.find((s) => s.name === "default");
  if (!defaultSlot) return `${pad}<${name}${attrsStr} />`;

  const childLines = emitJSX(defaultSlot.body, scope, opts, depth + 1);
  return `${pad}<${name}${attrsStr}>\n${childLines}\n${pad}</${name}>`;
}

function emitSlotProps(
  slots: IRSlotContent[],
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const named = slots.filter((s) => s.name !== "default");
  if (named.length === 0) return "";
  const parts: string[] = [];
  for (const slot of named) {
    const body = emitJSX(slot.body, scope, opts, depth + 1);
    parts.push(` ${slot.name}={${body.trim()}}`);
  }
  return parts.join("");
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

function emitIf(
  node: IRIf,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  if (node.branches.length === 1 && !node.fallback) {
    const branch = node.branches[0]!;
    const test = printExpression(branch.test, opts);
    const body = emitJSX(branch.body, scope, opts, depth).trim();
    return `${pad}{${test} && (\n${pad}  ${body}\n${pad})}`;
  }
  if (node.branches.length === 1 && node.fallback) {
    const branch = node.branches[0]!;
    const test = printExpression(branch.test, opts);
    const body = emitJSX(branch.body, scope, opts, depth + 1).trim();
    const fallback = emitJSX(node.fallback, scope, opts, depth + 1).trim();
    return `${pad}{${test} ? (\n${pad}  ${body}\n${pad}) : (\n${pad}  ${fallback}\n${pad})}`;
  }
  const parts: string[] = [];
  for (let i = 0; i < node.branches.length; i++) {
    const branch = node.branches[i]!;
    const test = printExpression(branch.test, opts);
    const body = emitJSX(branch.body, scope, opts, depth + 1).trim();
    if (i === 0) {
      parts.push(`${test} ? (\n${pad}  ${body}\n${pad})`);
    } else {
      parts.push(` : ${test} ? (\n${pad}  ${body}\n${pad})`);
    }
  }
  if (node.fallback) {
    const fallback = emitJSX(node.fallback, scope, opts, depth + 1).trim();
    parts.push(` : (\n${pad}  ${fallback}\n${pad})`);
  } else {
    parts.push(` : null`);
  }
  return `${pad}{${parts.join("")}}`;
}

function emitFor(
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
  return `${pad}{${each}.map(${params} => (\n${body}\n${pad}))}`;
}

function emitSwitch(
  node: IRSwitch,
  scope: CodegenScope,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  if (node.cases.length === 0) {
    return node.fallback ? emitJSX(node.fallback, scope, opts, depth) : `${pad}{null}`;
  }
  const parts: string[] = [];
  for (let i = 0; i < node.cases.length; i++) {
    const c = node.cases[i]!;
    const test = printExpression(c.test, opts);
    const body = emitJSX(c.body, scope, opts, depth + 1).trim();
    if (i === 0) {
      parts.push(`${test} ? (\n${pad}  ${body}\n${pad})`);
    } else {
      parts.push(` : ${test} ? (\n${pad}  ${body}\n${pad})`);
    }
  }
  if (node.fallback) {
    const fallback = emitJSX(node.fallback, scope, opts, depth + 1).trim();
    parts.push(` : (\n${pad}  ${fallback}\n${pad})`);
  } else {
    parts.push(` : null`);
  }
  return `${pad}{${parts.join("")}}`;
}

function emitSlotPlaceholder(
  node: IRSlotPlaceholder,
  opts: PrintExpressionOptions,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const propName = node.name === "default" ? "children" : node.name;
  if (node.scopedArgs.length > 0) {
    const args = node.scopedArgs.map((a) => printExpression(a, opts)).join(", ");
    return `${pad}{${propName}?.(${args})}`;
  }
  if (propName === "children") return `${pad}{children}`;
  return `${pad}{${propName}?.()}`;
}

function emitAttributes(
  attrs: IRAttribute[],
  events: IREventBinding[],
  refs: IRRefBinding[],
  opts: PrintExpressionOptions,
  reactMode: boolean,
): string {
  const parts: string[] = [];
  for (const attr of attrs) {
    const name = reactMode ? reactAttrName(attr.name) : attr.name;
    if (attr.value.kind === "Static") {
      if (attr.value.value === true) {
        parts.push(name);
      } else if (typeof attr.value.value === "string") {
        parts.push(`${name}=${printStaticValue(attr.value)}`);
      } else {
        parts.push(`${name}={${printStaticValue(attr.value)}}`);
      }
    } else {
      parts.push(`${name}={${printAttrValue(attr.value, opts)}}`);
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

function reactAttrName(name: string): string {
  if (name === "class") return "className";
  if (name === "for") return "htmlFor";
  return name;
}
