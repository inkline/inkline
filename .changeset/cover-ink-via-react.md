---
"@inkline/test-utils": minor
---

feat(test-utils): add `coverInkViaReact` for real `.ink.tsx` coverage

Add `coverInkViaReact(importMetaUrl, styledRel, headlessRels, props, config?)`, which drives a
component through the React target so V8 collects coverage on the executed logic and remaps it back
onto the authored `.ink.tsx` source. It compiles the styled entry plus its headless parts to React,
transpiles each to ESM, composes the `js → react.tsx → .ink.tsx` source maps into one inlined map,
then dynamic-`import()`s and renders the module in-worker (no child process, no `NODE_V8_COVERAGE`
merge). The default slot is passed as `children` and every named slot as a node prop, mirroring how
the behavioral mount projects slots, so slot-gated branches are exercised. It is a no-op unless a
coverage run is active, so a normal `vp test` pays nothing.
