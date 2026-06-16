---
"@inkline/react": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/solid": patch
"@inkline/angular": patch
"@inkline/qwik": patch
"@inkline/astro": patch
---

fix(compiler): normalize JSX whitespace so text and elements render identically across frameworks

JSX text was trimmed too aggressively — meaningful spaces were dropped, so `<p>Hello, {name}!</p>`
rendered as `Hello,world!` on React/Solid — and the codegen printer's formatting whitespace leaked into
the rendered output differently per framework (extra gaps between inline elements on Svelte/Astro).
Whitespace is now normalized once in the IR (matching the JSX spec, via `cleanJsxText`) and emitted
inline (`childrenArePhrasing` + the printer's `inline` flag), so all seven targets render the same text
and spacing.
