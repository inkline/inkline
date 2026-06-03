---
"@inkline/compiler": patch
"@inkline/qwik": patch
"@inkline/astro": patch
---

fix(compiler): Qwik slot projection via `<Slot>`, and Astro `<slot>` fallback content

Two slot-lowering bugs surfaced by rendering the live Storybooks:

- **Qwik slots now project.** The Qwik target lowered a `<Slot>` to `{props.children ?? fallback}`,
  but Qwik never populates `props.children` — projected content is rendered through its native
  `<Slot/>` component. Projected children (e.g. `<IBadge>Primary</IBadge>`) silently vanished. Slots
  now emit `<Slot>…</Slot>` with the authored fallback as the `<Slot>`'s children, named slots emit
  `<Slot name="x"/>`, and `Slot` is added to the `@qwik.dev/core` import only when a `<Slot>` is
  actually emitted.
- **Astro renders slot fallback.** The Astro target emitted a self-closing `<slot />` and dropped the
  authored default content, so a default-slot fallback (`<Slot>{label}</Slot>`) rendered nothing when
  no children were projected. Slots now emit a non-self-closing `<slot>…</slot>` carrying the fallback,
  which Astro shows when nothing is projected (matching Vue/Svelte).
