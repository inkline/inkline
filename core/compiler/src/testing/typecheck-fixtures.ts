import type { TargetName } from "../codegen/context.ts";

/**
 * Fixtures whose *emitted output* does not typecheck, one (fixture, target) pair at a time.
 *
 * The sweep in `typecheck.test.ts` compiles every `src/__fixtures__/*.ink.tsx` and runs the
 * workspace `tsc` over the result. Until UXF-205 the harness shelled `npx tsc` into a directory
 * with no `node_modules` and parsed npx's refusal for `error TS`, so it reported a pass on
 * everything — this list is the backlog that surfaced the moment it actually ran.
 *
 * Entries are quarantine, not permission: each one is a known defect the gate would otherwise
 * fail on, carrying the TypeScript codes it suppresses. `typecheck.test.ts` fails when an entry
 * stops being needed, so the list can only shrink. The burn-down is tracked separately; do not
 * add to it to make a change green.
 *
 * An entry also stops being needed when the fixture stops being swept at all: the sweep skips any
 * fixture that compiles with an `error` diagnostic, so promoting a diagnostic's severity retires
 * the quarantine entries of every fixture that now trips it.
 */
export const EXCLUSIONS: Readonly<Partial<Record<TargetName, readonly string[]>>> = {
  react: [
    // ── Cross-fixture references — a sweep limitation, not an emitted-output defect. The
    // sweep typechecks one fixture's output in isolation, so components and modules that
    // live in *other* fixtures cannot resolve.
    "BoundField", // TS2304,TS2339,TS7006
    "CollapseInvalid", // TS2307
    "CollapseModelStyled", // TS2307,TS2339,TS7006
    "CollapseNested", // TS2307
    "CollapseNoClassStyled", // TS2307
    "CollapseNoRecipe", // TS2307
    "CollapseStyled", // TS2307,TS2339
    "CollapseUnforwardedStyled", // TS2307,TS2339
    "ComponentRef", // TS2304
    "ContextConsumer", // TS18046,TS2307
    "CrossFileStyled", // TS2307,TS2339
    "Diag_ComponentRef", // TS2304
    "MultiChildSlot", // TS2304
    "MultipleComponentsPerFile", // TS2304
    "NamedSlotFill", // TS2304
    "StyledRecipe", // TS2307

    // ── Event handlers read `.value` off an un-narrowed `EventTarget` (TS2339).
    "ControlledTextarea", // TS2339
    "DynamicList", // TS2322,TS2339
    "FormField", // TS2339
    "MixedControlFlow", // TS2339
    "ModelInput", // TS2339
    "NativeBind", // TS2339
    "TwoWayNumber", // TS2339

    // ── `untrack` is used in emitted output but never imported (TS2304).
    "UntrackBoundary", // TS2304

    // ── Assorted — one fixture each, triage individually.
    "DynamicAccess", // TS7053
    "PropDefaults", // TS2559
  ],
  solid: [
    // ── Cross-fixture references — a sweep limitation, not an emitted-output defect. The
    // sweep typechecks one fixture's output in isolation, so components and modules that
    // live in *other* fixtures cannot resolve.
    "BoundField", // TS2304,TS2322,TS7006
    "CollapseInvalid", // TS2307
    "CollapseModelStyled", // TS2307,TS2322,TS2339,TS7006
    "CollapseNested", // TS2307
    "CollapseNoClassStyled", // TS2307
    "CollapseNoRecipe", // TS2307
    "CollapseStyled", // TS2307,TS2322,TS2339
    "CollapseUnforwardedStyled", // TS2307,TS2322,TS2339
    "ComponentRef", // TS2304,TS2322,TS7006
    "ContextConsumer", // TS18046,TS2307,TS2322
    "CrossFileStyled", // TS2307,TS2322,TS2339
    "Diag_ComponentRef", // TS2304,TS7006
    "MultiChildSlot", // TS2304,TS2322
    "MultipleComponentsPerFile", // TS2304,TS2322
    "NamedSlotFill", // TS2304,TS2322
    "StyledRecipe", // TS2307

    // ── Attribute passthrough widens the root element type (TS2322). Props are typed
    // `JSX.HTMLAttributes<HTMLElement>` and spread onto a concrete element whose `ref` is
    // `HTMLDivElement`-typed, so contravariance breaks. One root cause, many fixtures.
    "AsyncData", // TS2322
    "BatchUpdates", // TS2322
    "Card", // TS2322
    "ClientComponent", // TS2322
    "CollapseNestedShell", // TS2322
    "CollapseUnforwardedBase", // TS2322
    "Composite", // TS2322
    "Conditional", // TS2322
    "ConditionalClass", // TS2322
    "ConditionalRead", // TS2322
    "ContextProvider", // TS2322
    "ControlledTextarea", // TS2322
    "Counter", // TS2322
    "CrossFileBase", // TS2322
    "DefineSlotBasic", // TS2322
    "Diag_EmptyEffect", // TS2322
    "Diag_EmptyMemo", // TS2322
    "Diag_MissingKey", // TS2322
    "DiamondMemo", // TS2322
    "DynamicList", // TS2322,TS2769
    "EmitsNamedType", // TS2322
    "ForLoop", // TS2322
    "FormField", // TS2322
    "HasSlot", // TS2322
    "HasSlotFallback", // TS2322
    "HeadlessBox", // TS2322
    "LateSignal", // TS2322
    "List", // TS2322
    "MapInExpression", // TS2322
    "MemoChain", // TS2322
    "MixedControlFlow", // TS2322
    "ModelInput", // TS2322
    "MultiFile", // TS2322
    "MultiRefs", // TS2322
    "NativeBind", // TS2322
    "NestedLoops", // TS2322
    "NestedSlots", // TS2322
    "OptionalSlot", // TS2322
    "PropDefaults", // TS2322
    "RecipeNoArgs", // TS2322
    "RequiredProps", // TS2322
    "ScopedSlot", // TS2322
    "ScopedStyle", // TS2322
    "ServerComponent", // TS2322
    "SetupHandlers", // TS2322
    "SlotBasic", // TS2322
    "SlotInConditional", // TS2322
    "SlotNamed", // TS2322
    "SlotScoped", // TS2322
    "SlotScopedSingle", // TS2322
    "SlotWithDefault", // TS2322
    "SlotWithFallback", // TS2322
    "SwitchTabs", // TS2322
    "TextWithSiblings", // TS2322
    "TransitionBasic", // TS2322
    "TwoResources", // TS2322
    "TwoWayCheckbox", // TS2322
    "TwoWayNumber", // TS2322
    "TypedEvent", // TS2322
    "UntrackBoundary", // TS2304,TS2322

    // ── Assorted — one fixture each, triage individually.
    "CollapseBase", // TS2322
    "CollapseModelBase", // TS2322
    "CollapseNestedInput", // TS2322
    "ControlledSelect", // TS2322
    "DeclaredModels", // TS2322
    "DuplicateEvent", // TS2322
    "DynamicAccess", // TS7053
    "EffectCleanup", // TS2322
    "EmitButton", // TS2322
    "EventModifier", // TS2322
    "HeadlessButton", // TS2322
    "IButton", // TS2322
    "MemoModel", // TS2322
  ],
};
