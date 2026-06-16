---
"@inkline/angular": patch
---

fix(compiler): collapse Angular host elements with `display: contents`

Angular components compile to `ink-*` custom-element hosts, which default to `display: inline` and
added a few pixels of line-box height (e.g. badge +3px, input textarea +6px) versus the other
framework targets. The generated `@Component` now sets `host: { style: 'display: contents' }`, so
each host lays out transparently and Angular renders identically to React/Vue/Svelte/Solid/Qwik/Astro.
