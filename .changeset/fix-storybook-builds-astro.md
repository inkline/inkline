---
"@inkline/astro": patch
---

fix(astro): ship the `.astro` components the entries import

The package build copied `.inkline/*.astro` into `dist`, but the compiler writes the components
under `.inkline/components/<family>/…`, so `dist` shipped no `.astro` files and every import in
`index.mjs`, like `./components/button/styled/IButton.astro`, pointed at a missing file. The build
now copies `.inkline/components/**/*.astro` into `dist` and keeps the folder structure the imports
expect.
