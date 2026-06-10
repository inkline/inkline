---
"@inkline/compiler": patch
"@inkline/svelte": patch
---

fix(svelte): emit Svelte 5 `{@render}` snippets instead of deprecated `<slot>`, and stop self-closing non-void elements

The Svelte target lowered slots to the deprecated `<slot>` element (`slot_element_deprecated`) and
self-closed every empty element, including non-void tags like `<span>`/`<textarea>`
(`element_invalid_self_closing_tag`) — both emit build warnings on Svelte 5.

Slots now compile to runes: the default slot renders via `{@render children?.()}`, named slots via
`{@render <name>?.()}`, fallback content wraps in `{#if <name>}…{:else}…{/if}`, and scoped slots
thread positional args (`{@render <name>(item, index)}`). Each slot is declared as a typed
`Snippet`/`Snippet<any[]>` prop on `$props()` (importing `Snippet` from `svelte`); a named slot's prop
is bound to a `<name>Snippet` local so `{@render}` never collides with an in-scope binding of the same
name (e.g. a `{#each items as item}` loop and an `item` slot). Non-void HTML elements with no children
now print as `<tag></tag>`. The output is functionally identical — same runtime DOM, no warnings.
