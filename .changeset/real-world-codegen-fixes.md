---
"@inkline/compiler": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/angular": patch
"@inkline/astro": patch
---

fix(compiler): correct cross-target codegen for recipe/styled components

Surfaced by a new real-world assertion test suite (author `.ink.tsx` → compile → assert
the actual generated framework code). Fixes:

- The shared expression rewriter now recurses into **object literals**, so `props.x` inside
  a recipe call like `badge({ color: props.color })` is correctly stripped (Svelte) or
  `this.`-prefixed (Angular) instead of emitted verbatim (which referenced an undefined
  `props`).
- **Vue** keeps `props.x` in `<script setup>` (the `computed`/script context) and strips to
  bare names only in the template, where Vue resolves them against the component's props.
- **Angular** resolves component instances to their selector, declares standalone `imports`,
  and `this.`-prefixes class-body member access (memos/effects), computing styling recipes in
  a `computed` bound via `[class]`.
- **Astro** emits memos as frontmatter consts.
