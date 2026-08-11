import * as ts from "typescript";
import { DYNAMIC_DEPS, type IRReactiveKind, type SymbolId } from "../../../ir/reactivity.ts";
import type {
  IRConsumeDeclaration,
  IREffectDeclaration,
  IREventDeclaration,
  IRExprNode,
  IRLifecycle,
  IRMemoDeclaration,
  IRModelDeclaration,
  IRProvideDeclaration,
  IRRefDeclaration,
  IRResourceDeclaration,
  IRSetupStatement,
  IRSlotDeclaration,
  IRStateDeclaration,
  PrimitiveName,
} from "../../../ir/render/nodes.ts";
import { setupDeclaredNames } from "../../../ir/setup.ts";
import type { PassContext } from "../../types.ts";
import type { BindingTable } from "./bind-primitives.ts";
import { toLoc } from "./loc.ts";
import { ParseBindingScope } from "./scope.ts";

function localFor(bindings: BindingTable, prim: PrimitiveName): string | undefined {
  for (const [local, name] of bindings) {
    if (name === prim) return local;
  }
  return undefined;
}

function isCallTo(expr: ts.Expression, name: string | undefined): expr is ts.CallExpression {
  return (
    !!name &&
    ts.isCallExpression(expr) &&
    ts.isIdentifier(expr.expression) &&
    expr.expression.text === name
  );
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

/**
 * `<Slot>` is lowered from the component's render tree, so one reached only through a helper
 * function or an effect body declares no slot and survives into the output verbatim. Refuse it —
 * see INK0069.
 *
 * This covers the setup body *outside* the returned expression only. Being inside `renderExpr` is
 * necessary but not sufficient for lowering to reach a `<Slot>`, so the render expression itself is
 * skipped here and checked after lowering by `reportUnloweredSlots`, which can tell reached from
 * merely present.
 */
function reportSlotsOutsideRender(
  body: ts.Block,
  renderExpr: ts.Expression | undefined,
  sourceFile: ts.SourceFile,
  ctx: PassContext,
): void {
  const visit = (node: ts.Node): void => {
    if (node === renderExpr) return;
    if (
      (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
      ts.isIdentifier(node.tagName) &&
      node.tagName.text === "Slot"
    ) {
      ctx.diagnostics.push("INK0069", toLoc(node, sourceFile));
    }
    ts.forEachChild(node, visit);
  };
  visit(body);
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

export interface SetupResult {
  readonly state: IRStateDeclaration[];
  readonly models: IRModelDeclaration[];
  /** Events declared via `defineEmits([...])` / `defineEmits<{…}>()`. */
  readonly events: IREventDeclaration[];
  /** Local name bound to the `defineEmits()` result, if any. */
  readonly emitName: string | undefined;
  readonly memos: IRMemoDeclaration[];
  readonly refs: IRRefDeclaration[];
  readonly effects: IREffectDeclaration[];
  readonly resources: IRResourceDeclaration[];
  readonly provides: IRProvideDeclaration[];
  readonly consumes: IRConsumeDeclaration[];
  readonly lifecycle: IRLifecycle;
  readonly setup: IRSetupStatement[];
  readonly slotDeclarations: IRSlotDeclaration[];
  readonly slotBindings: ReadonlyMap<string, string>;
  readonly renderExpr: ts.Expression | undefined;
  readonly scope: ParseBindingScope;
}

export function parseSetup(
  setupFn: ts.ArrowFunction | ts.FunctionExpression,
  componentId: string,
  bindings: BindingTable,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  ctx: PassContext,
): SetupResult {
  const scope = new ParseBindingScope();
  const state: IRStateDeclaration[] = [];
  const models: IRModelDeclaration[] = [];
  const events: IREventDeclaration[] = [];
  let emitName: string | undefined;
  const memos: IRMemoDeclaration[] = [];
  const refs: IRRefDeclaration[] = [];
  const effects: IREffectDeclaration[] = [];
  const resources: IRResourceDeclaration[] = [];
  const provides: IRProvideDeclaration[] = [];
  const consumes: IRConsumeDeclaration[] = [];
  const onMountDecls: IREffectDeclaration[] = [];
  const onCleanupDecls: IREffectDeclaration[] = [];
  const setup: IRSetupStatement[] = [];
  const slotDeclarations: IRSlotDeclaration[] = [];
  const slotBindings = new Map<string, string>();
  let renderExpr: ts.Expression | undefined;

  const signalLocal = localFor(bindings, "createSignal");
  const modelLocal = localFor(bindings, "defineModel");
  const emitsLocal = localFor(bindings, "defineEmits");
  const memoLocal = localFor(bindings, "createMemo");
  const effectLocal = localFor(bindings, "createEffect");
  const refLocal = localFor(bindings, "createRef");
  const resourceLocal = localFor(bindings, "createResource");
  const provideLocal = localFor(bindings, "provide");
  const useContextLocal = localFor(bindings, "useContext");
  const mountLocal = localFor(bindings, "onMount");
  const cleanupLocal = localFor(bindings, "onCleanup");
  const slotLocal = localFor(bindings, "defineSlot");

  const body = ts.isBlock(setupFn.body) ? setupFn.body.statements : undefined;
  if (!body) {
    if (!ts.isBlock(setupFn.body)) renderExpr = setupFn.body;
    return {
      state,
      models,
      events,
      emitName,
      memos,
      refs,
      effects,
      resources,
      provides,
      consumes,
      lifecycle: { onMount: onMountDecls, onCleanup: onCleanupDecls },
      setup,
      slotDeclarations,
      slotBindings,
      renderExpr,
      scope,
    };
  }

  const registerBinding = (name: ts.BindingName, id: SymbolId, kind: IRReactiveKind): void => {
    if (!ts.isIdentifier(name)) return;
    const sym = checker.getSymbolAtLocation(name);
    if (sym) scope.register(sym, id, kind);
  };

  for (const stmt of body) {
    const loc = toLoc(stmt, sourceFile);

    if (ts.isReturnStatement(stmt) && stmt.expression) {
      renderExpr = stmt.expression;
      continue;
    }

    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (!decl.initializer) continue;
        const init = decl.initializer;

        if (isCallTo(init, signalLocal)) {
          let valueName: string;
          let setterNameExplicit: string | undefined;
          let getterBindingName: ts.BindingName | undefined;
          let setterBindingName: ts.BindingName | undefined;

          if (ts.isIdentifier(decl.name)) {
            valueName = decl.name.text;
            getterBindingName = decl.name;
          } else if (ts.isArrayBindingPattern(decl.name) && decl.name.elements.length >= 1) {
            const first = decl.name.elements[0]!;
            if (ts.isBindingElement(first) && ts.isIdentifier(first.name)) {
              valueName = first.name.text;
              getterBindingName = first.name;
            } else {
              valueName = "value";
            }
            if (decl.name.elements.length >= 2) {
              const second = decl.name.elements[1]!;
              if (ts.isBindingElement(second) && ts.isIdentifier(second.name)) {
                setterNameExplicit = second.name.text;
                setterBindingName = second.name;
              }
            }
          } else {
            continue;
          }

          const initialExpr = init.arguments[0];
          const setterName =
            setterNameExplicit ?? `set${valueName.charAt(0).toUpperCase()}${valueName.slice(1)}`;

          const getterId = ctx.symbols.mint({
            componentId,
            kind: "signal",
            name: valueName,
            loc: toLoc(decl, sourceFile),
          });

          const setterId = ctx.symbols.mint({
            componentId,
            kind: "signal",
            name: setterName,
            loc: toLoc(decl, sourceFile),
          });

          ctx.symbols.linkSetter(getterId, setterId);
          scope.markSetter(setterId);
          if (getterBindingName) registerBinding(getterBindingName, getterId, "signal");
          if (setterBindingName) registerBinding(setterBindingName, setterId, "signal");

          state.push({
            name: valueName,
            setterName,
            initial: initialExpr
              ? makeExprNode(initialExpr, sourceFile)
              : makeExprNode(init, sourceFile),
            symbolId: getterId,
            setterSymbolId: setterId,
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }

        if (isCallTo(init, modelLocal)) {
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
            ctx.diagnostics.push("INK0043", toLoc(decl, sourceFile));
            continue;
          }

          const nameArg = init.arguments[0];
          if (nameArg && !ts.isStringLiteral(nameArg)) {
            ctx.diagnostics.push("INK0043", toLoc(nameArg, sourceFile));
            continue;
          }
          const propName = nameArg && ts.isStringLiteral(nameArg) ? nameArg.text : "value";

          const getterId = ctx.symbols.mint({
            componentId,
            kind: "signal",
            name: first.name.text,
            loc: toLoc(decl, sourceFile),
          });
          const setterId = ctx.symbols.mint({
            componentId,
            kind: "signal",
            name: second.name.text,
            loc: toLoc(decl, sourceFile),
          });

          ctx.symbols.linkSetter(getterId, setterId);
          scope.markSetter(setterId);
          registerBinding(first.name, getterId, "signal");
          registerBinding(second.name, setterId, "signal");

          models.push({
            name: first.name.text,
            setterName: second.name.text,
            propName,
            getterSymbolId: getterId,
            setterSymbolId: setterId,
            typeNode: init.typeArguments?.[0],
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }

        if (isCallTo(init, emitsLocal)) {
          // const emit = defineEmits(["change"]) / defineEmits<{ change: [v: string] }>()
          if (ts.isIdentifier(decl.name)) emitName = decl.name.text;
          for (const { name, payloadType } of declaredEmits(init, sourceFile, checker, ctx)) {
            events.push({ name, payloadType, loc: toLoc(decl, sourceFile) });
          }
          continue;
        }

        if (isCallTo(init, resourceLocal)) {
          let dataName = "data";
          // Meta accessors are captured only when actually destructured. The source property
          // (`loading`/`error`/`refetch`) selects the meta; the local binding name is what targets
          // emit (honouring aliases like `{ error: err }` and unused-marking `{ error: _error }`).
          let loadingName: string | undefined;
          let errorName: string | undefined;
          let refetchName: string | undefined;

          if (ts.isArrayBindingPattern(decl.name) && decl.name.elements.length >= 1) {
            const first = decl.name.elements[0]!;
            if (ts.isBindingElement(first) && ts.isIdentifier(first.name)) {
              dataName = first.name.text;
            }
            if (decl.name.elements.length >= 2) {
              const second = decl.name.elements[1]!;
              if (ts.isBindingElement(second) && ts.isObjectBindingPattern(second.name)) {
                for (const el of second.name.elements) {
                  if (ts.isBindingElement(el) && ts.isIdentifier(el.name)) {
                    const sourceProp =
                      el.propertyName && ts.isIdentifier(el.propertyName)
                        ? el.propertyName.text
                        : el.name.text;
                    const localName = el.name.text;
                    if (sourceProp === "loading") loadingName = localName;
                    else if (sourceProp === "error") errorName = localName;
                    else if (sourceProp === "refetch") refetchName = localName;
                  }
                }
              }
            }
          } else if (ts.isIdentifier(decl.name)) {
            dataName = decl.name.text;
          }

          const resId = ctx.symbols.mint({
            componentId,
            kind: "signal",
            name: dataName,
            loc: toLoc(decl, sourceFile),
          });

          const fetcherArg = init.arguments[0];
          if (fetcherArg) {
            resources.push({
              name: dataName,
              fetcher: makeExprNode(fetcherArg, sourceFile),
              source: init.arguments[1] ? makeExprNode(init.arguments[1], sourceFile) : undefined,
              symbolId: resId,
              loadingName,
              errorName,
              refetchName,
              loc: toLoc(decl, sourceFile),
            });
          }
          continue;
        }

        if (!ts.isIdentifier(decl.name)) continue;

        if (isCallTo(init, memoLocal)) {
          const memoArg = init.arguments[0];
          if (!memoArg) continue;
          // Idiomatic memo: createMemo(() => expr). Unwrap the arrow to the body
          // so memo.expr.expr holds the value expression, not the thunk.
          const memoExpr =
            (ts.isArrowFunction(memoArg) || ts.isFunctionExpression(memoArg)) &&
            !ts.isBlock(memoArg.body)
              ? memoArg.body
              : memoArg;

          const id = ctx.symbols.mint({
            componentId,
            kind: "memo",
            name: decl.name.text,
            loc: toLoc(decl, sourceFile),
          });

          registerBinding(decl.name, id, "memo");

          memos.push({
            name: decl.name.text,
            symbolId: id,
            expr: makeExprNode(memoExpr, sourceFile),
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }

        if (isCallTo(init, refLocal)) {
          const id = ctx.symbols.mint({
            componentId,
            kind: "ref",
            name: decl.name.text,
            loc: toLoc(decl, sourceFile),
          });

          registerBinding(decl.name, id, "ref");

          refs.push({
            name: decl.name.text,
            symbolId: id,
            category: "element",
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }

        if (isCallTo(init, slotLocal)) {
          if (!ts.isIdentifier(decl.name)) continue;

          let slotName = "default";
          if (init.arguments[0] && ts.isStringLiteral(init.arguments[0])) {
            slotName = init.arguments[0].text;
          }

          const id = ctx.symbols.mint({
            componentId,
            kind: "slot",
            name: slotName,
            loc: toLoc(decl, sourceFile),
          });

          registerBinding(decl.name, id, "slot");
          slotBindings.set(decl.name.text, slotName);

          slotDeclarations.push({
            name: slotName,
            isScoped: false,
            scopedProps: [],
            required: false,
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }

        if (isCallTo(init, useContextLocal)) {
          const contextArg = init.arguments[0];
          if (!contextArg) continue;

          const id = ctx.symbols.mint({
            componentId,
            kind: "context",
            name: decl.name.text,
            loc: toLoc(decl, sourceFile),
          });

          registerBinding(decl.name, id, "context");

          const contextName = ts.isIdentifier(contextArg)
            ? contextArg.text
            : contextArg.getText(sourceFile);

          consumes.push({
            name: decl.name.text,
            contextRef: contextArg,
            contextName,
            symbolId: id,
            loc: toLoc(decl, sourceFile),
          });
          continue;
        }
      }

      if (
        !stmt.declarationList.declarations.some(
          (d) =>
            d.initializer &&
            (isCallTo(d.initializer, signalLocal) ||
              isCallTo(d.initializer, modelLocal) ||
              isCallTo(d.initializer, emitsLocal) ||
              isCallTo(d.initializer, memoLocal) ||
              isCallTo(d.initializer, refLocal) ||
              isCallTo(d.initializer, resourceLocal) ||
              isCallTo(d.initializer, slotLocal) ||
              isCallTo(d.initializer, useContextLocal)),
        )
      ) {
        setup.push({ stmt, defines: setupDeclaredNames(stmt), loc });
      }
      continue;
    }

    if (ts.isExpressionStatement(stmt)) {
      const expr = stmt.expression;

      if (isCallTo(expr, effectLocal) && expr.arguments[0]) {
        effects.push({
          body: expr.arguments[0],
          deps: DYNAMIC_DEPS,
          cleanup: "unknown",
          isDynamic: false,
          loc,
        });
        continue;
      }

      if (isCallTo(expr, mountLocal) && expr.arguments[0]) {
        onMountDecls.push({
          body: expr.arguments[0],
          deps: DYNAMIC_DEPS,
          cleanup: "absent",
          isDynamic: false,
          loc,
        });
        continue;
      }

      if (isCallTo(expr, cleanupLocal) && expr.arguments[0]) {
        onCleanupDecls.push({
          body: expr.arguments[0],
          deps: DYNAMIC_DEPS,
          cleanup: "present",
          isDynamic: false,
          loc,
        });
        continue;
      }

      if (isCallTo(expr, provideLocal) && expr.arguments[0] && expr.arguments[1]) {
        const contextArg = expr.arguments[0];
        const valueArg = expr.arguments[1];
        const contextName = ts.isIdentifier(contextArg)
          ? contextArg.text
          : contextArg.getText(sourceFile);

        provides.push({
          contextRef: contextArg,
          contextName,
          value: makeExprNode(valueArg, sourceFile),
          loc,
        });
        continue;
      }
    }

    setup.push({ stmt, defines: setupDeclaredNames(stmt), loc });
  }

  if (ts.isBlock(setupFn.body)) {
    reportSlotsOutsideRender(setupFn.body, renderExpr, sourceFile, ctx);
  }

  return {
    state,
    models,
    events,
    emitName,
    memos,
    refs,
    effects,
    resources,
    provides,
    consumes,
    lifecycle: { onMount: onMountDecls, onCleanup: onCleanupDecls },
    setup,
    slotDeclarations,
    slotBindings,
    renderExpr,
    scope,
  };
}
