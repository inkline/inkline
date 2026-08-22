/**
 * Which targets the emitted-output typecheck sweep covers, and which fixtures it cannot gate yet.
 *
 * The sweep is a gate on emitted code, not on the fixtures. Every entry below carries the
 * TypeScript error it suppresses and why it is here — either a harness limitation (the fixture is
 * compiled in isolation, so a module it imports is never emitted) or a defect in the emitted
 * output. Removing an entry is how a fix gets verified.
 *
 * Do NOT add a wildcard, and do not add an entry without its diagnostic code. A new fixture that
 * stops typechecking is a codegen regression, not a new exception.
 */

/**
 * Targets whose emitted output `tsc` can read and that have a working tsconfig.
 *
 * - `vue`, `svelte`, `astro` emit `.vue` / `.svelte` / `.astro`, which `tsc` cannot parse at all.
 *   Covering them needs `vue-tsc` / `svelte-check` / `astro check` as separate tools.
 * - `angular` and `qwik` emit `.ts` / `.tsx` and could be swept, but have no tsconfig and their
 *   framework types (`@angular/core`, `@qwik.dev/core`) are not devDependencies of this package.
 * - `solid` emits `.tsx` and is otherwise ready, but 90 of the 98 fixtures that produce output fail,
 *   87 of them on the same repeated TS2322 (UXF-202). Enabling it behind a 90-entry exclusion list
 *   would be a gate in name only; fix the systemic defect first, then add `solid` in that same PR.
 */
export const TYPECHECKED_TARGETS = ["react"] as const;

export type TypecheckedTarget = (typeof TYPECHECKED_TARGETS)[number];

/**
 * Fixtures the sweep skips, per target, each with the diagnostic and the reason.
 *
 * Two kinds of entry:
 *   [harness] — `compileFixture` compiles one fixture, so sibling modules the emitted output
 *               imports are never written. A wildcard ambient module resolves them to `any`, which
 *               turns a type-only import into a namespace (TS2709) or leaves a component reference
 *               undeclared (TS2304). Fixing this means compiling a fixture with its dependencies.
 *   [emit]    — the emitted output is genuinely ill-typed. These are bugs, not exceptions.
 */
const EXCLUSIONS: Record<string, Record<string, string>> = {
  react: {
    // ── [harness] cross-fixture component references, undeclared in isolation ──
    BoundField: "TS2304 'Field' — [harness]; also TS7006 on the bound handler param",
    ComponentRef: "TS2304 'Child' — [harness]",
    Diag_ComponentRef: "TS2304 'MyComponent' — [harness]; the fixture is ill-typed by design",
    MultiChildSlot: "TS2304 'Box' — [harness]",
    MultipleComponentsPerFile: "TS2304 'Label' — [harness]",
    NamedSlotFill: "TS2304 'IButton' — [harness]",

    // ── [harness] type-only imports of a sibling module that is not emitted ──
    CollapseModelStyled:
      "TS2709 'CollapseModelBaseProps' — [harness]; TS2339/TS7006 follow from it",
    CollapseNested: "TS2709 'CollapseNestedShellProps' — [harness]",
    CollapseStyled: "TS2709 'CollapseBaseProps' — [harness]; TS2339 follows from it",
    CollapseUnforwardedStyled: "TS2709 'CollapseUnforwardedBaseProps' — [harness]",
    CrossFileStyled: "TS2709 'CrossFileBaseProps' — [harness]; TS2339 follows from it",
    ContextConsumer: "TS18046 'form' is unknown — [harness]; the context module is not emitted",

    // ── [emit] mirrors an authoring-side exclusion in `typecheck-exclusions.ts` ──
    // The fixture's handler params are untyped by design (TS7006 there); the emitted React handler
    // therefore reads `.value` off a bare `EventTarget`.
    ControlledTextarea: "TS2339 EventTarget.value — [emit], untyped handler param",
    DynamicList: "TS2339 EventTarget.value + TS2322 never — [emit], untyped handler param",
    FormField: "TS2339 EventTarget.value — [emit], untyped handler param",
    MixedControlFlow: "TS2339 EventTarget.value — [emit], untyped handler param",
    ModelInput: "TS2339 EventTarget.value — [emit], untyped handler param",
    NativeBind: "TS2339 EventTarget.value — [emit], untyped handler param",
    TwoWayNumber: "TS2339 EventTarget.value — [emit], untyped handler param",
    DynamicAccess: "TS7053 dynamic index — [emit], mirrors the authoring-side exclusion",
    Diag_ModelTypeDrift: "TS18048 'props.count' possibly undefined — [emit], drift is the point",

    // ── [emit] no authoring-side counterpart: the emitted code is wrong ──
    // Each of these is a tracked defect. An exclusion pointing at an untracked bug documents rot
    // instead of preventing it, so an entry here without an issue reference is itself a defect.
    ElementRef:
      "TS2339 'focus' on type 'never' — [emit] `useRef(null)` drops the IR's elementType (UXF-199)",
    MultiRefs:
      "TS2339 'focus' on type 'never' — [emit] `useRef(null)` drops the IR's elementType (UXF-199)",
    PropDefaults:
      "TS2559 string vs CSSProperties — [emit] a string `style` prop is emitted as-is (UXF-201)",
  },
};

/** The recorded reason `fixture` is skipped for `target`, or `undefined` if it is swept. */
export function typecheckExclusion(target: string, fixture: string): string | undefined {
  return EXCLUSIONS[target]?.[fixture];
}

/** Every excluded fixture for `target`. */
export function typecheckExclusions(target: string): readonly string[] {
  return Object.keys(EXCLUSIONS[target] ?? {});
}
