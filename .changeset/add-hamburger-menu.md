---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): add HamburgerMenu component

Add `IHamburgerMenu` (and its headless `IHamburgerMenuBase`), an accessible animated three-line
toggle button styled with the Styleframe `hamburger-menu` recipe. It follows the WAI-ARIA
**Disclosure** pattern on a native `<button>`: a two-way `open` model drives `aria-expanded` and the
recipe's `active` morph, while the consumer renders and links their own navigation region via
`ariaControls`. Supports `color` (`light` / `dark` / `neutral`), `size` (`sm` / `md` / `lg`), and an
`animation` axis (`close` / `arrow-up` / `arrow-down` / `arrow-left` / `arrow-right` / `minus` /
`plus`) for the open-state shape. The icon-only control carries a defaulted `ariaLabel`
(`"Toggle menu"`) so every instance has an accessible name out of the box.
