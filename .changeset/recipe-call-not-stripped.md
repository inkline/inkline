---
"@inkline/compiler": patch
"@inkline/react": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/solid": patch
"@inkline/angular": patch
"@inkline/qwik": patch
"@inkline/astro": patch
---

fix(compiler): don't strip the call from zero-arg recipe/function calls

A zero-argument call such as a styleframe recipe `inputAppendRecipe()` was treated as a reactive
signal read and rewritten per target — the call was stripped to a bare `inputAppendRecipe`
(React/Svelte/Vue/Astro) or turned into `inputAppendRecipe.value` (Qwik). The recipe _function_,
not its result, then ended up in the `class` attribute, emitting the recipe's source into the DOM.

The expression rewriter now only applies a target's reactive-read convention to identifiers that are
actually reactive accessors — signals, memos and model getters, collected from the component IR.
Every other zero-arg call (an imported recipe, a plain helper) keeps its call syntax across all
targets. This also fixes resource fetchers (`createResource(() => fetchData())`), whose call was
likewise being stripped.
