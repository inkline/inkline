---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): add Callout component

Add `ICallout` (and its headless parts `ICalloutBase`, `ICalloutIconBase`, `ICalloutContentBase`,
`ICalloutDismissBase`), a contextual feedback message styled with the Styleframe `callout` recipe.
It renders a `role="note"` container (override via `role` for `alert`/`status` messages) and composes
an optional leading `icon` slot, the content (`label` prop or default slot), and an optional dismiss
button. Supports `color` (`primary` / `secondary` / `success` / `info` / `warning` / `error` /
`light` / `dark` / `neutral`), `variant` (`solid` / `outline` / `soft` / `subtle`), `size`
(`sm` / `md` / `lg`), and `orientation` (`horizontal` / `vertical`).

Set `dismissible` to render an accessible close button (defaulted `dismissAriaLabel` of `"Dismiss"`,
overridable, plus a `dismiss` slot for custom content). Visibility is two-way bindable via the
`visible` model; when unbound, clicking dismiss hides the callout internally while keeping it mounted.

The public docs-site page is pending the docs website implementation.
