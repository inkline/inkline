---
"@inkline/astro": patch
---

fix(astro): ship the `.astro` files the built barrels import

`pack.copy` used the non-recursive glob `./.inkline/*.astro`, which matched
nothing — the compiler emits components nested under
`.inkline/components/<name>/<layer>/`. The build logged only
`No files matched for copying.` and published a tarball whose `dist/index.mjs`,
`dist/headless.mjs`, and `dist/stories.mjs` re-exported 67 `.astro` files that
were not in the package, so any consumer install failed to resolve the entry.

The glob now recurses and `flatten: false` preserves the directory tree the
barrels import by path.
