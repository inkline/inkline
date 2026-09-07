import * as ts from "typescript";
import type { IRReactiveKind, SymbolId } from "../../../ir/reactivity.ts";
import type {
  IREventDeclaration,
  IRModelDeclaration,
  IRProp,
  IRSlotDeclaration,
  PrimitiveName,
} from "../../../ir/render/nodes.ts";
import type { PassContext } from "../../types.ts";
import type { BindingTable } from "./bind-primitives.ts";
import { toLoc } from "./loc.ts";
import { parsePropsFromObject, parsePropsFromTypeNode } from "./options.ts";
import type { ParseBindingScope } from "./scope.ts";

/**
 * The concern a macro declares. Two channels declaring the same concern collide (R3) — models
 * against hand-declared props is INK0044, `defineEmits` against `options.events` is INK0046,
 * `defineProps` against either other props channel is INK0047.
 */
export type MacroConcern = "models" | "events" | "slots" | "props";

/**
 * Who reports R2 for a macro.
 *
 * `registry` — the shared check in {@link checkMacroGrammar} reports INK0048.
 * `macro` — the macro's own `parse` already refuses a non-static argument under a more specific
 * code, so the shared check stays out of its way. `defineModel` is the one case: a dynamic name is
 * INK0043, which also covers its binding shape, and replacing it would change existing behaviour.
 */
export type StaticArgumentsOwner = "registry" | "macro";

/**
 * The uniform macro grammar (design UXF-241 §4), carried as data next to each macro.
 *
 * The registry is what {@link checkMacroGrammar} reads to enforce R1 and R2; R3 is enforced per
 * concern by the parse pass, and R4 by codegen dropping every erased macro's statement.
 */
export interface MacroRules {
  /** R1 — valid only as a top-level statement of the setup body, never nested in a function, conditional or loop. */
  readonly topLevelOnly: boolean;
  /**
   * R1b — the result must be bound to a local, so a bare `defineProps();` statement is INK0075.
   *
   * The binding is the only way to reach what the macro declares — the props object, the emit
   * function, the model's getter and setter — and the call itself is erased, so an unbound one
   * reads as a declaration while being none. `defineSlot` is the exception: it declares its slot
   * from the call alone, and its binding only gives the render tree a name to place the slot by.
   */
  readonly bindingRequired: boolean;
  /** R2 — arguments and type arguments must be statically analyzable; the value names who reports it. */
  readonly staticArguments: StaticArgumentsOwner;
  /** R3 — the concern declared, or `undefined` when the macro declares nothing. */
  readonly declares: MacroConcern | undefined;
  /** R4 — erased from the emitted output; no `@inkline/core` import survives it. */
  readonly erased: boolean;
}

/**
 * Where the macro call is written.
 *
 * `declaration` macros are read from a variable initializer by {@link parseSetup} and contribute to
 * the IR. `expression` macros are legal anywhere an expression is and carry no parse-time
 * contribution — `hasSlot` is rewritten per target during codegen.
 */
export type MacroPosition = "declaration" | "expression";

/**
 * One macro call the registry was asked to read. `decl` is the declaration a
 * `const <name> = <macro>(…)` call initializes, and is absent for a bare `<macro>(…);` statement.
 */
export interface MacroCallSite {
  readonly call: ts.CallExpression;
  readonly decl?: ts.VariableDeclaration;
}

/** Everything a macro's `parse` may read or mint. Symbols and scope are shared, so they stay side effects. */
export interface MacroContext {
  readonly componentId: string;
  readonly sourceFile: ts.SourceFile;
  readonly checker: ts.TypeChecker;
  readonly pass: PassContext;
  readonly scope: ParseBindingScope;
  readonly registerBinding: (name: ts.BindingName, id: SymbolId, kind: IRReactiveKind) => void;
}

/** What one macro call adds to the setup result. Contributions merge in source order. */
export interface MacroContribution {
  readonly models?: readonly IRModelDeclaration[];
  readonly events?: readonly IREventDeclaration[];
  readonly slots?: readonly IRSlotDeclaration[];
  /** Local binding name → declared slot name. */
  readonly slotBindings?: readonly (readonly [local: string, slot: string])[];
  /** Local name bound to the macro's result, for `defineEmits`. */
  readonly emitName?: string;
  /** Props declared by `defineProps`. */
  readonly props?: readonly IRProp[];
  /** The verbatim type argument of `defineProps<T>()`, when it names a type. */
  readonly propsTypeText?: string;
}

export interface MacroDefinition {
  readonly name: PrimitiveName;
  readonly position: MacroPosition;
  readonly rules: MacroRules;
  /** Reads one call site into an IR contribution; `undefined` when the macro contributes nothing here. */
  readonly parse?: (site: MacroCallSite, ctx: MacroContext) => MacroContribution | undefined;
}

/**
 * The members of `defineEmits<T>()`'s type argument, or `undefined` when the compiler cannot read
 * all of them from a single declaration in this file.
 *
 * The boundary is "the declaration I can read completely", not "the declaration I found". Each
 * member's type node is kept verbatim as {@link IREventDeclaration.payloadType} and emitted into the
 * generated component, so the declaration itself must be in this file. Beyond that, anything whose
 * full member list lives somewhere other than that one declaration's body — a heritage clause, a
 * second merged declaration, a generic instantiation — is refused rather than partially read: a
 * dropped member is silent all the way to the emitted file, where `emit("open")` becomes a read of
 * a prop nothing declares.
 *
 * Note the constraint is on the *declaration's* file, not on the types its members reference: a
 * member typed `[v: P]` with `P` imported is accepted, and the import is forwarded to the output by
 * `extractExternalImports`.
 */
function emitTypeMembers(
  typeArg: ts.TypeNode,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
): readonly ts.TypeElement[] | undefined {
  if (ts.isTypeLiteralNode(typeArg)) return typeArg.members;
  // A generic instantiation (`Events<string>`) names a declaration whose members are the
  // uninstantiated ones, so reading them verbatim would be wrong rather than merely incomplete.
  if (!ts.isTypeReferenceNode(typeArg) || typeArg.typeArguments) return undefined;

  let symbol = checker.getSymbolAtLocation(typeArg.typeName);
  if (symbol && symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);

  const declarations = symbol?.declarations ?? [];
  // Declaration merging spreads one interface's members across several declarations, and a
  // declaration in another file is unreadable regardless of where the others live — so the count
  // is taken over *all* of them, not just the same-file ones.
  if (declarations.length > 1) return undefined;

  for (const decl of declarations) {
    if (decl.getSourceFile() !== sourceFile) continue;
    if (ts.isTypeAliasDeclaration(decl) && ts.isTypeLiteralNode(decl.type))
      return decl.type.members;
    // `interface X extends Base` declares only its own members here; `Base` may not even be in this
    // file, and the same-file check above never sees it.
    if (ts.isInterfaceDeclaration(decl) && !decl.heritageClauses) return decl.members;
  }
  return undefined;
}

/**
 * Events declared by `defineEmits(["a","b"])` or `defineEmits<{ a: [...]; b: [...] }>()`.
 *
 * The type-argument form also carries each event's payload: the member type is the tuple of the
 * arguments `emit(name, …)` takes, so it is kept verbatim as {@link IREventDeclaration.payloadType}
 * for targets to lower. The runtime array form declares names only and stays untyped.
 */
function declaredEmits(
  call: ts.CallExpression,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  ctx: PassContext,
): { name: string; payloadType?: ts.TypeNode }[] {
  const declared: { name: string; payloadType?: ts.TypeNode }[] = [];
  const arg = call.arguments[0];
  if (arg && ts.isArrayLiteralExpression(arg)) {
    for (const el of arg.elements) {
      if (ts.isStringLiteral(el)) declared.push({ name: el.text });
    }
  }
  const typeArg = call.typeArguments?.[0];
  if (typeArg) {
    const members = emitTypeMembers(typeArg, sourceFile, checker);
    if (!members) {
      ctx.diagnostics.push("INK0042", toLoc(typeArg, sourceFile));
      return declared;
    }
    for (const member of members) {
      if (member.name && (ts.isIdentifier(member.name) || ts.isStringLiteral(member.name))) {
        const payloadType = ts.isPropertySignature(member) ? member.type : undefined;
        declared.push({ name: member.name.text, payloadType });
      }
    }
  }
  return declared;
}

const defineModelMacro: MacroDefinition = {
  name: "defineModel",
  position: "declaration",
  rules: {
    topLevelOnly: true,
    bindingRequired: true,
    staticArguments: "macro",
    declares: "models",
    erased: true,
  },
  parse({ call, decl }, { componentId, sourceFile, pass, scope, registerBinding }) {
    // const [value, setValue] = defineModel("value") — a two-way-bindable prop + update event.
    if (!decl) return undefined;
    const elements = ts.isArrayBindingPattern(decl.name) ? decl.name.elements : undefined;
    const first = elements?.[0];
    const second = elements?.[1];
    if (
      !first ||
      !second ||
      !ts.isBindingElement(first) ||
      !ts.isIdentifier(first.name) ||
      !ts.isBindingElement(second) ||
      !ts.isIdentifier(second.name)
    ) {
      pass.diagnostics.push("INK0043", toLoc(decl, sourceFile));
      return undefined;
    }

    const nameArg = call.arguments[0];
    if (nameArg && !ts.isStringLiteral(nameArg)) {
      pass.diagnostics.push("INK0043", toLoc(nameArg, sourceFile));
      return undefined;
    }
    const propName = nameArg && ts.isStringLiteral(nameArg) ? nameArg.text : "value";

    const getterId = pass.symbols.mint({
      componentId,
      kind: "signal",
      name: first.name.text,
      loc: toLoc(decl, sourceFile),
    });
    const setterId = pass.symbols.mint({
      componentId,
      kind: "signal",
      name: second.name.text,
      loc: toLoc(decl, sourceFile),
    });

    pass.symbols.linkSetter(getterId, setterId);
    scope.markSetter(setterId);
    registerBinding(first.name, getterId, "signal");
    registerBinding(second.name, setterId, "signal");

    return {
      models: [
        {
          name: first.name.text,
          setterName: second.name.text,
          propName,
          getterSymbolId: getterId,
          setterSymbolId: setterId,
          typeNode: call.typeArguments?.[0],
          loc: toLoc(decl, sourceFile),
        },
      ],
    };
  },
};

const defineEmitsMacro: MacroDefinition = {
  name: "defineEmits",
  position: "declaration",
  rules: {
    topLevelOnly: true,
    bindingRequired: true,
    staticArguments: "registry",
    declares: "events",
    erased: true,
  },
  parse({ call, decl }, { sourceFile, checker, pass }) {
    // const emit = defineEmits(["change"]) / defineEmits<{ change: [v: string] }>()
    if (!decl) return undefined;
    const events: IREventDeclaration[] = declaredEmits(call, sourceFile, checker, pass).map(
      ({ name, payloadType }) => ({ name, payloadType, loc: toLoc(decl, sourceFile) }),
    );
    return { events, emitName: ts.isIdentifier(decl.name) ? decl.name.text : undefined };
  },
};

/**
 * `defineSlot()` / `defineSlot("name")` — the slot channel, declared in the setup body.
 *
 * The binding is optional, which makes this the one declaration macro legal as a bare statement.
 * The call declares the slot; the binding only names it for the render tree, where `{footer}`
 * lowers to the slot's placeholder (`03-lower/define-slot.ts`). A component that renders the slot
 * as `<Slot name="footer">` instead never reads the local, so requiring one would be ceremony.
 */
const defineSlotMacro: MacroDefinition = {
  name: "defineSlot",
  position: "declaration",
  rules: {
    topLevelOnly: true,
    bindingRequired: false,
    staticArguments: "registry",
    declares: "slots",
    erased: true,
  },
  parse({ call, decl }, { componentId, sourceFile, pass, registerBinding }) {
    const binding = decl?.name;
    if (binding && !ts.isIdentifier(binding)) return undefined;

    let slotName = "default";
    if (call.arguments[0] && ts.isStringLiteral(call.arguments[0])) {
      slotName = call.arguments[0].text;
    }

    const loc = toLoc(decl ?? call, sourceFile);

    if (binding) {
      const id = pass.symbols.mint({ componentId, kind: "slot", name: slotName, loc });
      registerBinding(binding, id, "slot");
    }

    return {
      slots: [{ name: slotName, isScoped: false, scopedProps: [], required: false, loc }],
      slotBindings: binding ? [[binding.text, slotName]] : [],
    };
  },
};

/**
 * `defineProps<T>()` / `defineProps({ … })` — the third props channel, declared at the call site.
 *
 * Both forms reuse the parsers the other two channels already use, so the same declaration produces
 * the same {@link IRProp}s whichever channel writes it, and nothing below the parse pass changes.
 * The type form also carries the type's name forward as `propsTypeText`, exactly as the setup
 * parameter's annotation does, so targets that re-emit the props type keep doing so.
 *
 * The local the result is bound to is registered as the component's props object. Targets emit and
 * rewrite that object under the fixed name `props`, so — as with the annotation channel today — a
 * local under any other name reads through to the output unrewritten.
 */
const definePropsMacro: MacroDefinition = {
  name: "defineProps",
  position: "declaration",
  rules: {
    topLevelOnly: true,
    bindingRequired: true,
    staticArguments: "registry",
    declares: "props",
    erased: true,
  },
  parse({ call, decl }, { componentId, sourceFile, checker, pass, registerBinding }) {
    if (!decl) return undefined;
    const typeArg = call.typeArguments?.[0];
    const arg = call.arguments[0];

    let props: IRProp[] = [];
    let propsTypeText: string | undefined;

    if (typeArg) {
      props = parsePropsFromTypeNode(typeArg, typeArg, componentId, sourceFile, pass, checker);
      if (!ts.isTypeLiteralNode(typeArg)) propsTypeText = typeArg.getText(sourceFile);
    } else if (arg) {
      props = parsePropsFromObject(arg, componentId, sourceFile, pass);
    }

    if (ts.isIdentifier(decl.name)) {
      const id = pass.symbols.mint({
        componentId,
        kind: "prop",
        name: "props",
        loc: toLoc(decl, sourceFile),
      });
      registerBinding(decl.name, id, "prop");
    }

    return { props, propsTypeText };
  },
};

/**
 * `hasSlot("name")` is a predicate, not a declaration: it reads a slot the component declares
 * elsewhere and is rewritten to each target's slot-presence check during codegen
 * (`codegen/shared/expr-rewrite.ts`). Parse contributes nothing — the entry exists so the registry
 * is the complete list of macros and carries R1–R4 for this one too.
 */
const hasSlotMacro: MacroDefinition = {
  name: "hasSlot",
  position: "expression",
  rules: {
    topLevelOnly: false,
    bindingRequired: false,
    staticArguments: "registry",
    declares: undefined,
    erased: true,
  },
};

/** Every compiler macro. Recognition is by binding, never by name — see {@link bindMacros}. */
export const MACROS: readonly MacroDefinition[] = [
  defineModelMacro,
  defineEmitsMacro,
  defineSlotMacro,
  definePropsMacro,
  hasSlotMacro,
];

/**
 * The macros this source file imported, keyed by the local name each is bound to. A macro imported
 * under an alias is recognized under that alias; one never imported is absent, so a local
 * `function defineModel()` is left alone.
 */
export function bindMacros(bindings: BindingTable): ReadonlyMap<string, MacroDefinition> {
  const bound = new Map<string, MacroDefinition>();
  for (const macro of MACROS) {
    for (const [local, primitive] of bindings) {
      if (primitive !== macro.name) continue;
      bound.set(local, macro);
      break;
    }
  }
  return bound;
}

/**
 * Whether an argument is a literal the macro parsers can read at build time.
 *
 * The test is on the argument's own shape, which is exactly what each parser requires: a slot or
 * event name must be a string, an event list an array of strings, a prop map an object literal. It
 * deliberately does not recurse into an object literal's values — an object-form prop's `default` is
 * an arbitrary expression that the compiler copies into the output verbatim, so it never has to be
 * read.
 */
function isStaticMacroArgument(arg: ts.Expression): boolean {
  if (ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg)) return true;
  if (ts.isObjectLiteralExpression(arg)) return true;
  if (ts.isArrayLiteralExpression(arg)) return arg.elements.every(ts.isStringLiteral);
  return false;
}

/**
 * Enforce R1 (top level only, INK0049), R1b (the result is bound, INK0075) and R2 (statically
 * analyzable arguments, INK0048) over every macro call in the setup function, wherever it is
 * written.
 *
 * The dispatch in {@link parseSetup} only ever sees a macro in a position it accepts, so a call
 * written anywhere else would otherwise be silently ignored: erased on some targets, emitted as a
 * call to a stub on others, and in either case declaring nothing while reading as if it declared
 * something. This walk is what makes those failures diagnosable.
 */
export function checkMacroGrammar(
  setupFn: ts.ArrowFunction | ts.FunctionExpression,
  macros: ReadonlyMap<string, MacroDefinition>,
  sourceFile: ts.SourceFile,
  ctx: PassContext,
): void {
  if (macros.size === 0) return;

  // The two top-level shapes the dispatch can reach, kept apart because R1b turns on which one it
  // is: the initializer of a top-level declaration, or a top-level statement's own call.
  const bound = new Set<ts.CallExpression>();
  const unbound = new Set<ts.CallExpression>();
  if (ts.isBlock(setupFn.body)) {
    for (const stmt of setupFn.body.statements) {
      if (ts.isVariableStatement(stmt)) {
        for (const decl of stmt.declarationList.declarations) {
          if (decl.initializer && ts.isCallExpression(decl.initializer)) {
            bound.add(decl.initializer);
          }
        }
      } else if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression)) {
        unbound.add(stmt.expression);
      }
    }
  }

  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const macro = macros.get(node.expression.text);
      if (macro) {
        if (macro.rules.topLevelOnly && !bound.has(node) && !unbound.has(node)) {
          ctx.diagnostics.push("INK0049", toLoc(node, sourceFile));
        } else if (macro.rules.bindingRequired && unbound.has(node)) {
          ctx.diagnostics.push("INK0075", toLoc(node, sourceFile), { name: macro.name });
        }
        if (macro.rules.staticArguments === "registry") {
          for (const arg of node.arguments) {
            if (!isStaticMacroArgument(arg))
              ctx.diagnostics.push("INK0048", toLoc(arg, sourceFile));
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(setupFn.body);
}

/**
 * The declaration-position macro this expression calls, if any — read both from a declaration's
 * initializer and from a bare setup statement. `expression` macros are excluded: `hasSlot("a")`
 * declares nothing and stays an ordinary setup statement wherever it is written.
 *
 * A binding-required macro is recognized in statement position too, so that the dispatch erases its
 * statement (R4) rather than emitting it. {@link checkMacroGrammar} has already refused it under
 * INK0075, and its `parse` contributes nothing without a declaration.
 */
export function macroForCall(
  expr: ts.Expression,
  macros: ReadonlyMap<string, MacroDefinition>,
): { macro: MacroDefinition; call: ts.CallExpression } | undefined {
  if (!ts.isCallExpression(expr) || !ts.isIdentifier(expr.expression)) return undefined;
  const macro = macros.get(expr.expression.text);
  return macro?.position === "declaration" ? { macro, call: expr } : undefined;
}
