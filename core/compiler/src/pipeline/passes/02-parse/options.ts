import * as ts from "typescript";
import { DYNAMIC_DEPS } from "../../../ir/reactivity.ts";
import type {
  IREventDeclaration,
  IRExprNode,
  IRProp,
  IRRuntimeMode,
  IRSlotDeclaration,
  IRStyleBlock,
} from "../../../ir/render/nodes.ts";
import type { PassContext } from "../../types.ts";
import { toLoc } from "./loc.ts";

export interface ParsedOptions {
  readonly props?: IRProp[];
  readonly slots: IRSlotDeclaration[];
  readonly events: IREventDeclaration[];
  readonly styles: IRStyleBlock[];
  readonly runtime: IRRuntimeMode;
  readonly headless?: boolean;
}

function makeExprNode(expr: ts.Expression, sf: ts.SourceFile): IRExprNode {
  return {
    kind: "Expression",
    expr,
    raw: expr.getText(sf),
    deps: DYNAMIC_DEPS,
    isReactive: false,
    emissionContext: "setup",
    isDynamic: false,
    loc: toLoc(expr, sf),
  };
}

export function parseOptions(
  options: ts.ObjectLiteralExpression,
  componentId: string,
  sourceFile: ts.SourceFile,
  ctx: PassContext,
): ParsedOptions {
  let props: IRProp[] | undefined;
  const slots: IRSlotDeclaration[] = [];
  const events: IREventDeclaration[] = [];
  const styles: IRStyleBlock[] = [];
  let runtime: IRRuntimeMode = "iso";
  let headless = false;

  for (const prop of options.properties) {
    if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;

    switch (prop.name.text) {
      case "props":
        props = parsePropsFromObject(prop.initializer, componentId, sourceFile, ctx);
        break;
      case "slots":
        slots.push(...parseSlotsFromObject(prop.initializer, sourceFile));
        break;
      case "events":
        events.push(...parseEventsFromObject(prop.initializer, sourceFile));
        break;
      case "style": {
        const style = parseStyleFromValue(prop.initializer, sourceFile);
        if (style) styles.push(style);
        break;
      }
      case "runtime": {
        if (ts.isStringLiteral(prop.initializer)) {
          const val = prop.initializer.text;
          if (val === "client" || val === "server" || val === "iso") {
            runtime = val;
          }
        }
        break;
      }
      case "meta": {
        if (ts.isObjectLiteralExpression(prop.initializer)) {
          for (const m of prop.initializer.properties) {
            if (!ts.isPropertyAssignment(m) || !ts.isIdentifier(m.name)) continue;
            if (m.name.text === "headless") {
              headless = m.initializer.kind === ts.SyntaxKind.TrueKeyword;
            }
          }
        }
        break;
      }
    }
  }

  return { props, slots, events, styles, runtime, headless };
}

function parseStyleFromValue(
  value: ts.Expression,
  sourceFile: ts.SourceFile,
): IRStyleBlock | undefined {
  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
    return {
      css: value.text,
      scoped: true,
      lang: "css",
      loc: toLoc(value, sourceFile),
    };
  }
  if (ts.isTaggedTemplateExpression(value)) {
    const tag = value.tag;
    if (ts.isIdentifier(tag) && tag.text === "css") {
      const template = value.template;
      const css = ts.isNoSubstitutionTemplateLiteral(template)
        ? template.text
        : template.head.text + template.templateSpans.map((s) => s.literal.text).join("");
      return {
        css,
        scoped: true,
        lang: "css",
        loc: toLoc(value, sourceFile),
      };
    }
  }
  return undefined;
}

function parsePropsFromObject(
  value: ts.Expression,
  componentId: string,
  sourceFile: ts.SourceFile,
  ctx: PassContext,
): IRProp[] {
  if (!ts.isObjectLiteralExpression(value)) return [];

  const props: IRProp[] = [];

  for (const member of value.properties) {
    if (!ts.isPropertyAssignment(member) || !ts.isIdentifier(member.name)) continue;

    const name = member.name.text;
    const init = member.initializer;
    const loc = toLoc(member, sourceFile);

    if (ts.isObjectLiteralExpression(init) && isFullPropShape(init)) {
      const parsed = parseFullPropShape(name, init, componentId, sourceFile, ctx);
      props.push({ ...parsed, loc });
    } else {
      const id = ctx.symbols.mint({ componentId, kind: "prop", name, loc });
      const typeText = inferPropType(init);
      if (isConstructorRef(init)) {
        props.push({ name, required: true, typeText, symbolId: id, loc });
      } else {
        props.push({
          name,
          required: false,
          typeText,
          defaultValue: makeExprNode(init, sourceFile),
          symbolId: id,
          loc,
        });
      }
    }
  }

  return props;
}

/** The only keys the full prop shape reads. */
const FULL_SHAPE_KEYS: ReadonlySet<string> = new Set(["type", "required", "default"]);

/**
 * Distinguish a full prop shape (`{ type: Number, default: 0 }`) from an object literal used as a
 * *default value* (`cfg: { a: 1 }`), which `PropDefaultValue` in `@inkline/core` accepts. Both are
 * object literals in the same position, so the shape only wins when every key is one it reads —
 * otherwise the object is a default, like an array or string literal in the same position. Reading
 * every object as a shape is what dropped `cfg`'s type *and* its default silently.
 */
function isFullPropShape(obj: ts.ObjectLiteralExpression): boolean {
  if (obj.properties.length === 0) return false;
  return obj.properties.every(
    (p) =>
      ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && FULL_SHAPE_KEYS.has(p.name.text),
  );
}

function parseFullPropShape(
  name: string,
  obj: ts.ObjectLiteralExpression,
  componentId: string,
  sourceFile: ts.SourceFile,
  ctx: PassContext,
): IRProp {
  const loc = toLoc(obj, sourceFile);
  const id = ctx.symbols.mint({ componentId, kind: "prop", name, loc });
  let declaredType: string | undefined;
  let defaultInit: ts.Expression | undefined;
  let required = false;

  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;

    switch (prop.name.text) {
      case "type":
        declaredType = resolveDeclaredType(name, prop.initializer, sourceFile, ctx);
        break;
      case "required":
        required = prop.initializer.kind === ts.SyntaxKind.TrueKeyword;
        break;
      case "default":
        defaultInit = prop.initializer;
        break;
    }
  }

  // `type:` wins over the default's inferred type, and is read whichever order the keys appear in.
  const typeText = declaredType ?? (defaultInit ? inferPropType(defaultInit) : undefined);
  const defaultValue = defaultInit ? makeExprNode(defaultInit, sourceFile) : undefined;

  return { name, typeText, defaultValue, required, symbolId: id, loc };
}

/**
 * Resolve the object form's `type:` key, which the author writes as a constructor reference
 * (`{ type: Number }` → `number`). The accepted set is {@link CONSTRUCTOR_TYPES} — the same table
 * `PropConstructor` in `@inkline/core` mirrors — and an unrecognised value is reported rather than
 * dropped, which is what happened before: the prop emitted untyped with no warning.
 */
function resolveDeclaredType(
  propName: string,
  init: ts.Expression,
  sourceFile: ts.SourceFile,
  ctx: PassContext,
): string | undefined {
  if (ts.isIdentifier(init) && init.text in CONSTRUCTOR_TYPES) return CONSTRUCTOR_TYPES[init.text];

  ctx.diagnostics.push("INK0042", toLoc(init, sourceFile), {
    name: propName,
    value: init.getText(sourceFile),
    supported: Object.keys(CONSTRUCTOR_TYPES).join(", "),
  });
  return undefined;
}

/**
 * A bare constructor reference as a prop value declares a *required* prop: `{ size: Number }`.
 * `Date` is deliberately absent — `{ when: Date }` reads as an optional `Date`, matching what the
 * targets emit and what `PropConstructorRef` in `@inkline/core` accepts.
 */
function isConstructorRef(node: ts.Expression): boolean {
  if (!ts.isIdentifier(node)) return false;
  return node.text !== "Date" && node.text in CONSTRUCTOR_TYPES;
}

/** The constructor-to-type table shared by the bare form, the `type:` key, and `@inkline/core`. */
const CONSTRUCTOR_TYPES: Readonly<Record<string, string>> = {
  String: "string",
  Number: "number",
  Boolean: "boolean",
  Object: "Record<string, any>",
  Array: "any[]",
  Function: "(...args: any[]) => any",
  Symbol: "symbol",
  Date: "Date",
};

/**
 * Infer a TypeScript type string for an object-form prop value: a constructor reference
 * (`Number` → `number`) or the type of a default-value literal (`"blue"` → `string`).
 */
function inferPropType(init: ts.Expression): string | undefined {
  if (ts.isIdentifier(init) && init.text in CONSTRUCTOR_TYPES) return CONSTRUCTOR_TYPES[init.text];
  if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) return "string";
  if (ts.isNumericLiteral(init)) return "number";
  if (init.kind === ts.SyntaxKind.TrueKeyword || init.kind === ts.SyntaxKind.FalseKeyword)
    return "boolean";
  if (ts.isArrayLiteralExpression(init)) return "any[]";
  if (ts.isObjectLiteralExpression(init)) return "Record<string, any>";
  return undefined;
}

export function parsePropsFromParameterType(
  setupFn: ts.ArrowFunction | ts.FunctionExpression,
  componentId: string,
  sourceFile: ts.SourceFile,
  ctx: PassContext,
  checker: ts.TypeChecker,
): IRProp[] {
  const param = setupFn.parameters[0];
  if (!param?.type) return [];

  if (ts.isTypeLiteralNode(param.type)) {
    const props: IRProp[] = [];

    for (const member of param.type.members) {
      if (!ts.isPropertySignature(member) || !ts.isIdentifier(member.name)) continue;

      const name = member.name.text;
      const required = !member.questionToken;
      const typeNode = member.type;
      const loc = toLoc(member, sourceFile);
      const id = ctx.symbols.mint({ componentId, kind: "prop", name, loc });

      props.push({ name, typeNode, required, symbolId: id, loc });
    }

    return props;
  }

  const type = checker.getTypeAtLocation(param);
  if (type.flags & ts.TypeFlags.Any) return [];

  const props: IRProp[] = [];
  for (const symbol of type.getProperties()) {
    const decl = symbol.declarations?.[0];
    if (!decl || !ts.isPropertySignature(decl)) continue;

    const name = symbol.getName();
    const required = !decl.questionToken;
    const typeNode = decl.type;
    const loc = toLoc(param, sourceFile);
    const id = ctx.symbols.mint({ componentId, kind: "prop", name, loc });
    props.push({ name, typeNode, required, symbolId: id, loc });
  }
  return props;
}

function parseSlotsFromObject(
  value: ts.Expression,
  sourceFile: ts.SourceFile,
): IRSlotDeclaration[] {
  if (!ts.isObjectLiteralExpression(value)) return [];

  const slots: IRSlotDeclaration[] = [];

  for (const member of value.properties) {
    if (!ts.isPropertyAssignment(member) || !ts.isIdentifier(member.name)) continue;

    const name = member.name.text;
    const loc = toLoc(member, sourceFile);
    let isScoped = false;
    let required = false;

    if (ts.isObjectLiteralExpression(member.initializer)) {
      for (const prop of member.initializer.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
        if (prop.name.text === "scoped") {
          isScoped = prop.initializer.kind === ts.SyntaxKind.TrueKeyword;
        }
        if (prop.name.text === "required") {
          required = prop.initializer.kind === ts.SyntaxKind.TrueKeyword;
        }
      }
    }

    slots.push({ name, isScoped, scopedProps: [], required, loc });
  }

  return slots;
}

function parseEventsFromObject(
  value: ts.Expression,
  sourceFile: ts.SourceFile,
): IREventDeclaration[] {
  if (!ts.isObjectLiteralExpression(value)) return [];

  const events: IREventDeclaration[] = [];

  for (const member of value.properties) {
    if (!ts.isPropertyAssignment(member) || !ts.isIdentifier(member.name)) continue;

    const name = member.name.text;
    const loc = toLoc(member, sourceFile);
    events.push({ name, loc });
  }

  return events;
}
