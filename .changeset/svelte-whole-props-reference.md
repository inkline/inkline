---
"@inkline/compiler": patch
"@inkline/svelte": patch
---

fix(svelte): resolve whole-`props` references in destructured components

The Svelte target destructures `$props()` into named bindings plus a fallthrough
rest, leaving no `props` binding — so a component that passed the whole object to a
function (e.g. `badge(props)` in styled components) emitted an unresolved `props`
reference and crashed with "props is not defined". A bare `props` reference is now
rewritten to the reconstruction of its destructured bindings (`{ name, ...rest }`),
which stays reactive without introducing an extra binding.
