import * as ts from "typescript";
import type { IRReactiveKind, SymbolId } from "../../../ir/reactivity.ts";
import type {
  IREventDeclaration,
  IRModelDeclaration,
  IRSlotDeclaration,
  PrimitiveName,
} from "../../../ir/render/nodes.ts";
import type { PassContext } from "../../types.ts";
import type { BindingTable } from "./bind-primitives.ts";
import { toLoc } from "./loc.ts";
import type { ParseBindingScope } from "./scope.ts";

/**
 * The concern a macro declares. Two channels declaring the same concern collide (R3) — models
 * against hand-declared props is INK0044, `defineEmits` against `options.events` is INK0046.
 */
export type MacroConcern = "models" | "events" | "slots";

/**
 * The uniform macro grammar (design UXF-241 §4), carried as data next to each macro.
 *
 * Phase 1 only records the rules; nothing checks them yet, and the diagnostics the design names
 * (INK0047–INK0049) belong to Phase 2. A rule stated here without a checker is therefore the
 * intended state, not an omission — the registry is where Phase 2 reads what to enforce.
 */
export interface MacroRules {
  /** R1 — valid only as a top-level statement of the setup body, never nested in a function, conditional or loop. */
  readonly topLevelOnly: boolean;
  /** R2 — arguments and type arguments must be statically analyzable. */
  readonly staticArguments: boolean;
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

/** One `const <name> = <macro>(…)` the registry was asked to read. */
export interface MacroCallSite {
  readonly call: ts.CallExpression;
  readonly decl: ts.VariableDeclaration;
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
  rules: { topLevelOnly: true, staticArguments: true, declares: "models", erased: true },
  parse({ call, decl }, { componentId, sourceFile, pass, scope, registerBinding }) {
    // const [value, setValue] = defineModel("value") — a two-way-bindable prop + update event.
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
  rules: { topLevelOnly: true, staticArguments: true, declares: "events", erased: true },
  parse({ call, decl }, { sourceFile, checker, pass }) {
    // const emit = defineEmits(["change"]) / defineEmits<{ change: [v: string] }>()
    const events: IREventDeclaration[] = declaredEmits(call, sourceFile, checker, pass).map(
      ({ name, payloadType }) => ({ name, payloadType, loc: toLoc(decl, sourceFile) }),
    );
    return { events, emitName: ts.isIdentifier(decl.name) ? decl.name.text : undefined };
  },
};

const defineSlotMacro: MacroDefinition = {
  name: "defineSlot",
  position: "declaration",
  rules: { topLevelOnly: true, staticArguments: true, declares: "slots", erased: true },
  parse({ call, decl }, { componentId, sourceFile, pass, registerBinding }) {
    if (!ts.isIdentifier(decl.name)) return undefined;

    let slotName = "default";
    if (call.arguments[0] && ts.isStringLiteral(call.arguments[0])) {
      slotName = call.arguments[0].text;
    }

    const id = pass.symbols.mint({
      componentId,
      kind: "slot",
      name: slotName,
      loc: toLoc(decl, sourceFile),
    });

    registerBinding(decl.name, id, "slot");

    return {
      slots: [
        {
          name: slotName,
          isScoped: false,
          scopedProps: [],
          required: false,
          loc: toLoc(decl, sourceFile),
        },
      ],
      slotBindings: [[decl.name.text, slotName]],
    };
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
  rules: { topLevelOnly: false, staticArguments: true, declares: undefined, erased: true },
};

/** Every compiler macro. Recognition is by binding, never by name — see {@link bindMacros}. */
export const MACROS: readonly MacroDefinition[] = [
  defineModelMacro,
  defineEmitsMacro,
  defineSlotMacro,
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
 * The declaration-position macro this initializer calls, if any. `expression` macros are excluded:
 * `const x = hasSlot("a")` declares nothing and stays an ordinary setup statement.
 */
export function macroForInitializer(
  init: ts.Expression,
  macros: ReadonlyMap<string, MacroDefinition>,
): { macro: MacroDefinition; call: ts.CallExpression } | undefined {
  if (!ts.isCallExpression(init) || !ts.isIdentifier(init.expression)) return undefined;
  const macro = macros.get(init.expression.text);
  return macro?.position === "declaration" ? { macro, call: init } : undefined;
}
