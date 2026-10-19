---
"@inkline/angular": patch
---

fix(angular): compile the components with the Angular compiler

`@inkline/angular` shipped components that only Angular's JIT compiler could read, so an input you bound, like `[disabled]="true"`, never reached them, and the package had no type declarations. The package now ships partial Ivy declarations in `dist/fesm2022/`, which your app's Angular compiler links at build time, and `.d.ts` files for every entry point. Since the components use signal inputs and models, the `@angular/core` peer range now starts at `17.2.0`.
