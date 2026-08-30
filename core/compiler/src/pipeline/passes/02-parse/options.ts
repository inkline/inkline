import * as ts from "typescript";
import { DYNAMIC_DEPS } from "../../../ir/reactivity.ts";
import type {
  IRDeclaredModel,
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
  /** `undefined` when the author wrote no `models` key — absent is not the same as empty here. */
  readonly declaredModels?: IRDeclaredModel[];
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
  let declaredModels: IRDeclaredModel[] | undefined;
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
      case "models":
        declaredModels = parseDeclaredModelsFromObject(prop.initializer, sourceFile);
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

  return { props, declaredModels, slots, events, styles, runtime, headless };
}

/**
 * Reads the type-only `models` map. Nothing downstream of this emits it — the entries exist only to
 * be compared against the setup body's `defineModel` calls by P4 (INK0094).
 */
function parseDeclaredModelsFromObject(
  value: ts.Expression,
  sourceFile: ts.SourceFile,
): IRDeclaredModel[] {
  if (!ts.isObjectLiteralExpression(value)) return [];

  const declared: IRDeclaredModel[] = [];

  for (const member of value.properties) {
    if (!ts.isPropertyAssignment(member) || !ts.isIdentifier(member.name)) continue;

    const init = member.initializer;
    // Same three forms as a prop declaration: a constructor reference, a full `{ type, … }` shape,
    // or a bare default value.
    const typeText = ts.isObjectLiteralExpression(init)
      ? declaredShapeType(init)
      : inferPropType(init);

    declared.push({ name: member.name.text, typeText, loc: toLoc(member, sourceFile) });
  }

  return declared;
}

/** The `type:` of a full prop shape, resolved through the constructor table. */
function declaredShapeType(obj: ts.ObjectLiteralExpression): string | undefined {
  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
    if (prop.name.text === "type") return inferPropType(prop.initializer);
  }
  return undefined;
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

    if (ts.isObjectLiteralExpression(init)) {
      const parsed = parseFullPropShape(name, init, componentId, sourceFile, ctx);
      props.push({ ...parsed, loc });
    } else {
      const id = ctx.symbols.mint({ componentId, kind: "prop", name, loc });
      const typeText = inferPropType(init);
      if (isConstructorRef(init)) {
        props.push({
          name,
          required: !OPTIONAL_CONSTRUCTORS.has(init.text),
          typeText,
          symbolId: id,
          loc,
        });
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

function parseFullPropShape(
  name: string,
  obj: ts.ObjectLiteralExpression,
  componentId: string,
  sourceFile: ts.SourceFile,
  ctx: PassContext,
): IRProp {
  const loc = toLoc(obj, sourceFile);
  const id = ctx.symbols.mint({ componentId, kind: "prop", name, loc });
  let typeNode: ts.TypeNode | undefined;
  let defaultValue: IRExprNode | undefined;
  let required = false;

  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;

    switch (prop.name.text) {
      case "type":
        if (ts.isTypeNode(prop.initializer)) {
          typeNode = prop.initializer;
        }
        break;
      case "required":
        required = prop.initializer.kind === ts.SyntaxKind.TrueKeyword;
        break;
      case "default":
        defaultValue = makeExprNode(prop.initializer, sourceFile);
        break;
    }
  }

  return { name, typeNode, defaultValue, required, symbolId: id, loc };
}

/**
 * A bare constructor reference declares the prop's *type*, never its default value: `size: Number`
 * is a `number` prop, not a prop defaulting to the `Number` function. The accepted set is
 * {@link CONSTRUCTOR_TYPES}, which `PropConstructor` in `@inkline/core` mirrors.
 */
function isConstructorRef(node: ts.Expression): node is ts.Identifier {
  return ts.isIdentifier(node) && node.text in CONSTRUCTOR_TYPES;
}

/**
 * Constructors whose bare use types the prop without making it required. `@inkline/core` draws the
 * same line: `PropConstructorRef` — the set whose bare use declares a *required* prop — excludes
 * `Date`, while `PropConstructor` includes it, so `{ when: Date }` infers `when?: Date`.
 */
const OPTIONAL_CONSTRUCTORS: ReadonlySet<string> = new Set(["Date"]);

export const CONSTRUCTOR_TYPES: Readonly<Record<string, string>> = {
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
