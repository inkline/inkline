---
"@inkline/compiler": minor
"@inkline/angular": patch
---

feat(compiler): Angular signal inputs for reactive props + non-self-closing ng-content

Two Angular-target correctness fixes surfaced by rendering the live Storybook:

- **Props are now signal inputs.** Props were emitted as plain `@Input()` fields, but a
  `computed`/`effect` reading `this.color` captured it once at construction (before the input bound),
  so derived state (e.g. a styling recipe `computed(() => badge({ color: this.color }))`) never
  reacted. Props now emit as `color = input<T>()` / `input.required<T>()` / `input<T>(default)`, and
  every read uses the call form (`this.color()` in the class body, `color()` in the template) via a
  new `propSignals` rewrite rule. Derived state and templates now react to input changes.
- **`<ng-content>` is no longer self-closing, and renders the slot fallback.** Self-closed
  `<ng-content … />` could be mishandled by Angular's JIT template parser; it is now
  `<ng-content>…</ng-content>` with the authored default-slot fallback as its projection default
  (Angular 18+). Component-instance tags with no slots are likewise emitted non-self-closing. A
  single styled component (label + recipe) now renders correctly.

Note: composing a headless + styled component that forwards projected content through nested
`<ng-content>` remains an Angular content-projection limitation (the inner component does not see the
forwarded content as projected); that, and multi-instance `{ component }` story rendering, are tracked
separately.
