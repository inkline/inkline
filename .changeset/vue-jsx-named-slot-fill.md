---
"@inkline/compiler": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/astro": patch
---

fix(compiler): JSX-valued named-slot fills mis-compiled on template targets

Filling a child component's named slot with JSX content (`<IButton icon={<span>★</span>}>`,
and slot re-projection `icon={<Slot name="icon" />}`) emitted invalid output on template
targets. The fill was kept as an opaque `Expression` IR node, so Vue/Svelte/Astro routed it
through the text-interpolation path — Vue produced `<template #icon>{{ <span>★</span> }}</template>`
instead of slot template content. JSX targets (React/Solid/Qwik) and Angular were unaffected
because they re-emit the expression natively.

The `slots` lowering pass now decomposes the JSX fill into real render nodes (the same
`parseExpression` decomposition already used for `<Show>` fallbacks), so every target receives a
structural subtree. Vue emits `<template #icon><span>★</span></template>`, Svelte a named
`{#snippet}`, and Astro a `<Fragment slot="icon">`; re-projected `<Slot>` fills lower to the
target's native slot node. Named slots other than `default` are now usable on the Vue target.
