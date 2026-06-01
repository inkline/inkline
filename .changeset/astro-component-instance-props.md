---
"@inkline/compiler": patch
"@inkline/astro": patch
---

fix(astro): resolve component instances to their tag and expose `props`

The Astro target emitted `<unknown>` for every component instance (the resolved
reference name was dropped) and destructured `Astro.props` without binding a
`props` object, so styled components that reference the whole `props` (e.g.
styling recipes such as `badge(props)`) threw "props is not defined". Component
instances now resolve to their reference name — matching the React target — and
`props` is bound before deriving the named props and the attribute-fallthrough
rest.
