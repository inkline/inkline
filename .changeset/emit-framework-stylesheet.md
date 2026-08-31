---
"@inkline/react": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/solid": patch
"@inkline/astro": patch
---

fix: emit `dist/index.css` so the `./css` subpath export resolves

The five packages that declare `exports["./css"]` pointed at a `dist/index.css` the build
never produced — nothing in the library graph imported the styleframe stylesheet, so Vite
had no CSS to extract. `import "@inkline/<fw>/css"` failed with `ERR_MODULE_NOT_FOUND`,
leaving no consumer-reachable path to the component styles.

React, Vue, Svelte and Solid now build their `index` entry through `src/index.ts`, which
pulls `virtual:styleframe.css` into the graph; Vite extracts it to `dist/index.css` without
injecting it into the JS, so importing the package root stays style-free. Astro ships via
`vp pack`, which does not run Vite plugins, so it runs a CSS-only `vp build` first and copies
the result into `dist`. All five stylesheets are byte-identical.

Angular and Qwik are unchanged — they do not declare `./css` and still return
`ERR_PACKAGE_PATH_NOT_EXPORTED`.
