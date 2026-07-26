---
"@inkline/compiler": patch
"@inkline/qwik": patch
---

fix(compiler): declare Qwik refs before visible tasks to avoid ReferenceError

The Qwik emitter declared element refs (`const ref = useSignal(null)`) after the
effects loop, so a `createEffect` that read a ref was emitted as a
`useVisibleTask$` above the ref's `const`. Unlike React/Vue — where this was a
setup-time temporal-dead-zone crash (INK-12) — Qwik defers task execution, so the
ordering looked safe. It is not: Qwik's optimizer extracts each `useVisibleTask$`
into its own QRL and captures lexical scope textually, so a task that references a
name declared below it resolves to an undeclared identifier and throws
`ReferenceError` at runtime (e.g. a `createRef` + `createEffect` pair patching a
DOM IDL property like `indeterminate`).

Refs are inert `null` declarations that depend on nothing, so the refs loop is now
hoisted above the effects loop in the Qwik emitter — behavior-preserving and
matching source order. This closes the target the INK-12 fix left uncovered;
Solid/Svelte defer effects without textual QRL extraction, Angular initializes
class fields before the constructor body, and Astro emits no effects, so those
targets remain byte-identical.
