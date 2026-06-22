---
"@inkline/compiler": minor
"@inkline/angular": minor
---

feat(compiler): collapse a model-bearing headless component onto its Angular host

Extends the styled-over-headless collapse to headless components that own a two-way model + an event
handler that writes it. The headless's event references its own model setter (e.g. `setOpen(...)` from
`defineModel("open")`); the collapse now maps the child's setter names onto the same model so the
merged host emits it correctly (`(click)="open.set(!open())"`), with the model declared under the
styled component's binding.

Flips **HamburgerMenu** to `meta.headless`: `<button ink-hamburger-menu ink-hamburger-menu-base>`
carries the recipe classes, `aria-expanded`/`aria-controls`/`aria-label`, the `disabled` state, and the
toggle click — zero wrappers. Only the Angular output changes (other six targets byte-identical).
