/**
 * Authoring fixtures that are opted out of the type-check gate, one file at a time.
 *
 * `core/compiler/src/__fixtures__` is the compiler's authoring surface: every fixture is a
 * `.ink.tsx` file a user could plausibly write. They are type-checked by `vp check` (and so by
 * CI's Type Check job) so that a feature which cannot be authored from a typed file fails the
 * build instead of shipping.
 *
 * A fixture may only appear below when type-checking it would require changing the source the
 * per-target snapshots compile — the fixtures' emitted output is the thing under test, so it is
 * not negotiable. Every entry carries the TypeScript error it suppresses and the reason.
 *
 * Do NOT re-add a directory-wide pattern. If a new fixture does not type-check, either fix the
 * fixture or add it here with its diagnostic code and a reason.
 */
export const fixtureTypecheckExclusions = [
  // ── Ill-typed by design: these are the inputs to the diagnostics suites. ──
  // Making them type-clean deletes the condition the compiler is asserted to report.
  "Diag_ComponentRef.ink.tsx", // TS2304 — references an undefined component on purpose
  "Diag_Cycle.ink.tsx", // TS7022/TS7024 — mutually recursive memos, circular inference is the point
  "Diag_ForNoEach.ink.tsx", // TS2741 — `<For>` without the required `each` prop
  "Diag_ShowNoWhen.ink.tsx", // TS2741 — `<Show>` without the required `when` prop

  // ── Untyped event-handler parameters (TS7006). ──
  // Annotating the parameter changes the setup body the per-target snapshots assert.
  "BoundField.ink.tsx", // also TS6133 — `setText` is intentionally unused, it tests dead-binding handling
  "ControlledSelect.ink.tsx",
  "ControlledTextarea.ink.tsx",
  "EventModifier.ink.tsx",
  "FormField.ink.tsx",
  "MixedControlFlow.ink.tsx",
  "ModelInput.ink.tsx",
  "TwoWayNumber.ink.tsx",
  "TypedEvent.ink.tsx",
  "DynamicList.ink.tsx", // also TS2322 — `createSignal([])` widens to `never[]`; a type argument would reshape the source

  // ── Deliberately unused bindings (TS6133) under `noUnusedLocals`. ──
  "NativeBind.ink.tsx", // `setText` is declared and never read; the fixture tests that the compiler drops it

  // ── Deliberate dynamic index access (TS7053). ──
  "DynamicAccess.ink.tsx", // `obj()[key()]` is the behaviour under test

  // ── Compile-time-only imports with no on-disk counterpart. ──
  "RecipeNoArgs.ink.tsx", // TS2307 — imports `virtual:styleframe`, resolved by the styleframe plugin
  "StyledRecipe.ink.tsx", // TS2834 — imports `./recipe`, a recipe module the compiler synthesises

  // ── Blocked on typings that are not on `main` yet. ──
  // `ComponentOptions` declares neither `props` nor `style`; both keys are read by the options
  // parser and both are fixed by https://github.com/inkline/inkline/pull/537 (UXF-97).
  // Delete these two entries when that lands — they are the fixtures this gate exists for.
  "PropDefaults.ink.tsx", // TS2353/TS2339 — options-object `props`
  "ScopedStyle.ink.tsx", // TS2353 — options-object `style`
];

/**
 * The same list as `lint.ignorePatterns` entries, relative to the config that consumes them.
 * `dir` is the path to `core/compiler` from that config — omit it inside the package itself.
 */
export function fixtureTypecheckIgnorePatterns(dir = ""): string[] {
  const prefix = dir ? `${dir}/` : "";
  return fixtureTypecheckExclusions.map((file) => `${prefix}src/__fixtures__/${file}`);
}
