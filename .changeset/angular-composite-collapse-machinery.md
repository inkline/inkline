---
"@inkline/compiler": minor
---

feat(compiler): collapse composite styled components with nested headless children (Angular)

Generalizes the styled-over-headless collapse to composites whose styled component projects richer
content — including other headless siblings — into its headless root's slot. Two new capabilities on
the Angular target's collapse:

- **Slot substitution**: the styled's own slot bodies project into the inlined headless root's `<Slot>`
  (replacing the `<ng-content>` one level), so the composite's content lands inside the collapsed host.
- **Nested attribute-child rendering**: headless siblings in that content render as attribute-selector
  children (`<span ink-input-prefix-base>` rather than `<ink-input-prefix-base>`), zero wrapper, each
  importing its `HostComponent` variant.

Existing single-child collapses (Button/Badge/FieldGroup/HamburgerMenu) are byte-identical. This is the
codegen foundation for collapsing the Input family.
