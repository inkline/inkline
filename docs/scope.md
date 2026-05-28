# Scope

The current shape of the Inkline compiler and what's deferred.

This file is the v1 roadmap referenced from [`core/compiler/README.md`](../core/compiler/README.md). It is intentionally short — it lists capability boundaries, not feature backlog. Authoritative roadmap discussion happens in GitHub issues.

## What ships today

### Compilation targets

The seven built-in targets are registered in [`core/compiler/src/codegen/registry.ts`](../core/compiler/src/codegen/registry.ts) `builtinRegistry`:

| Target    | Output flavor                                      | Notes                                                                                   |
| --------- | -------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `react`   | TSX (hooks API)                                    | First-class.                                                                            |
| `solid`   | TSX (signals)                                      | First-class.                                                                            |
| `vue`     | `.vue` SFC (`<script setup>` + Composition API)    | First-class.                                                                            |
| `svelte`  | `.svelte` (runes: `$state`, `$derived`, `$effect`) | First-class.                                                                            |
| `angular` | Standalone `@Component` + template + style files   | `<Transition>` is unwrapped — animation requires consumer setup. No bundled CSS export. |
| `qwik`    | Qwik components                                    | First-class.                                                                            |
| `astro`   | `.astro`                                           | Static-first. `<Transition>` is unwrapped (no runtime animation).                       |

The compiler also exposes `defineTarget` + `createRegistry` so consumers can register custom targets — see [adding-a-target.md](./adding-a-target.md).

### Authoring features

- Signal-based reactivity: `createSignal`, `createMemo`, `createEffect`, `createRef`.
- Lifecycle: `onMount`, `onCleanup`.
- Control flow as JSX: `<Show>`, `<For>`, `<Switch>` / `<Match>`.
- Slotting: `<Slot>` JSX component + `defineSlot` bindings (named + scoped slots).
- Transitions: `<Transition>` wrapping a single conditional element.
- Multiple components per file.
- Props as TypeScript parameter types **or** options-object form.

See [authoring-components.md](./authoring-components.md) for the practical walkthrough and [`core/compiler/README.md`](../core/compiler/README.md) for the full language reference.

### Compiler infrastructure

- Plugin system with `ir:post` and `code:post` hooks.
- Diagnostic registry (INK0001–INK0100) — see [`core/compiler/src/core/diagnostics/codes.ts`](../core/compiler/src/core/diagnostics/codes.ts).
- Source maps (V3) — controlled by `sourceMap: "external" | "inline" | "none"`.
- Incremental compilation with serializable IR (`compileIncremental`, `IR_VERSION`).
- Reusable test harnesses ([`@inkline/test-utils`](../tooling/test-utils/) and [`@inkline/compiler/testing`](../core/compiler/src/testing/)).

## Deferred to v1

The following are explicitly out of scope for v0 and tracked for v1:

| Capability                                             | Current behavior                                                                                                                | Why deferred                                                                                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Component-ref forwarding**                           | Element refs work. Component refs emit `INK0070`.                                                                               | Per-target ref forwarding is target-specific (`React.forwardRef`, Vue `defineExpose`, etc.) and needs design before unification. |
| **Scoped CSS / `<style>` blocks in `.ink.tsx`**        | Sibling `.ink.css` / `.ink.scss` files are merged in pass P1, but inline `<style>` blocks are not parsed.                       | Cross-framework scoping semantics (Vue scoped, Svelte CSS-in-component, React unscoped) need a common model.                     |
| **Server / client boundaries**                         | The `runtime` option on `defineComponent` accepts `"client" \| "server" \| "iso"` but does not yet drive output behavior.       | Awaits per-target server-component conventions stabilizing.                                                                      |
| **Async components / `<Suspense>` / `createResource`** | `createResource` stub exists in `@inkline/core` but is not lowered.                                                             | Cross-framework Suspense story is still in flux.                                                                                 |
| **HMR / `--watch` mode**                               | `compileIncremental` exists for cache reuse, but there is no built-in watch loop. Bundler plugin handles HMR for its consumers. | Best left to consuming bundlers via [`@inkline/plugin`](../core/plugin/).                                                        |
| **Sub-expression source-map granularity**              | Mappings land at statement / element level. Sub-expression positions are approximate.                                           | Adequate for current debugging needs. Tighter mapping is a large project.                                                        |

When any of these moves out of "deferred", the change should:

1. Add the corresponding tests under [`core/compiler/src/__fixtures__/`](../core/compiler/src/__fixtures__/) or [`core/compiler/src/codegen/`](../core/compiler/src/codegen/).
2. Update the row above to describe the new behavior or remove it.
3. Update [`core/compiler/README.md`](../core/compiler/README.md) → "v0 Limitations" in the same PR.
4. Include a changeset, usually `minor` for additive features.

## Out of scope for v1

Anything not listed in the deferred table above is out of scope for the v1 cycle. Things commonly asked about that are intentionally not on the roadmap:

- **A runtime layer.** Inkline is a compiler. There is no plan to ship a runtime that mediates between component definitions and frameworks at execution time — that would defeat the "no `@inkline/core` in output" invariant.
- **Custom JSX dialects.** The authoring API is TS + JSX with the `@inkline/core` import source. Alternative templating syntaxes (Vue SFC-style, Svelte-style) are not on the roadmap.
- **Build-tool features that belong to bundlers.** HMR signalling, asset handling, dev overlays — these are bundler concerns. [`@inkline/plugin`](../core/plugin/) is the integration surface; expect feature requests in this area to land there.

## See also

- [architecture.md](./architecture.md) — how the current compiler works.
- [adding-a-target.md](./adding-a-target.md) — the contributor path for new compilation targets.
- [`core/compiler/README.md`](../core/compiler/README.md) → "v0 Limitations" — the user-facing version of the deferred table above.
