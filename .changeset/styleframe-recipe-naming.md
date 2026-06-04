---
"@inkline/angular": patch
"@inkline/react": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/solid": patch
"@inkline/qwik": patch
"@inkline/astro": patch
---

fix: rename styleframe recipe exports to `<name>Recipe`

Styleframe recipes were exported under bare names (`input`, `badge`, …) and imported into the styled
components from `virtual:styleframe`. On the Angular target this collided with `input` imported from
`@angular/core` for signal inputs, producing `Identifier 'input' has already been declared` in the
compiled output.

Recipes are now exported as `<name>Recipe` (e.g. `input` → `inputRecipe`), and the generated styling
type follows as `<Name>RecipeProps`. The styled components import and call the renamed recipes. The
public component prop types are unchanged. This removes the Angular collision and keeps recipe names
clear of framework primitives across all targets.
