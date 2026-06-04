---
"@inkline/compiler": minor
"@inkline/react": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/solid": patch
"@inkline/angular": patch
"@inkline/qwik": patch
"@inkline/astro": patch
---

feat(compiler): industry-standard createResource lowering across all targets

`createResource<T>(fn)` returns `[data: T | undefined, { loading, error }]` — plain values read by
their bare names. Each target now lowers a resource to reactive **state** (`data`/`loading`/`error`)
plus an **async loader** that runs the fetcher and updates them (the universal "manual fetch with
loading/error state" pattern), expressed in the framework's idiom:

- **React** — `useState` ×3 + a `useEffect` loader (`.then(setData).catch(setError).finally(…)`).
- **Vue** — `ref` ×3 + a fire-and-forget loader in `<script setup>`.
- **Svelte** — `$state` ×3 + a top-level loader.
- **Solid** — `createSignal` ×3 + a loader; template reads use the call form `data()`.
- **Qwik** — `useSignal` ×3 + a `useTask$` loader; template reads `data.value`.
- **Angular** — `signal` ×3 fields + a loader in the constructor; template reads `data()`.
- **Astro** — server-side best-effort: top-level `await` in the frontmatter, `loading` resolves to
  `false`, errors captured.

A new `reactiveBindings` rewrite rule makes the **bare** authored reads (`data`, `loading`) resolve
per each framework's read convention even though the value has no call syntax. Setter and binding
names are derived per resource, so a component with multiple `createResource` calls no longer
collides on `setData`/`setLoading`. Adds `AsyncData` (all 7 targets) and `TwoResources` assertions.
