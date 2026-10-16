---
"@inkline/astro": patch
---

fix(astro): ship the `.astro` components

`@inkline/astro` shipped its entry files without the `.astro` components they import, like `./components/button/styled/IButton.astro`, so importing any component from `@inkline/astro` failed to resolve. The package now ships every component in the folder structure its entries expect.
