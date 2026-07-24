# @inkline/test-utils

## 0.1.0

### Minor Changes

- 287b326: feat(compiler): render recipe-based styled components on the Angular target

  Styled components (ones that compose other components and pull classes from a `virtual:styleframe`
  recipe) now render correctly on Angular — previously the recipe classes were stranded on the wrong
  element and same-file children weren't declared. The Angular target now:
  - **Emits kebab-case `ink-*` selectors** (`IBadge` → `ink-badge`, `IInputControlBase` →
    `ink-input-control-base`) for both `@Component({ selector })` and every child tag, so components
    match when their tag passes through an HTML parser. (Breaking: the rendered custom-element tag
    names change — but styled components didn't render before this.)
  - **Merges a forwarded class onto the child's own root** via a synthesized `klass` input. Ivy never
    routes a `[class]` binding to an input, and a class on the host element alone styles the wrong box
    (the component root lives inside the host), so a parent's class travels through `klass` and the
    root element concatenates it with its own.
  - **Declares every instantiated component in `imports`** — same-file siblings (compiled to their own
    `.component.ts` modules) as well as cross-file imports — with a new conformance invariant that
    fails the build if a template references an undeclared `ink-*` tag.
  - **Re-exposes module-level imports** (e.g. styleframe recipes called inline in the template) as
    class fields, and **never self-closes a non-void element** (Angular's JIT rejects `<span … />`).

  `@inkline/test-utils` gains Angular SSR mounting (`@angular/platform-server`), so styled components
  are verified by real rendered HTML alongside React/Vue/Solid/Svelte.

- 1b07d5f: feat(test-utils): add `coverInkViaReact` for real `.ink.tsx` coverage

  Add `coverInkViaReact(importMetaUrl, styledRel, headlessRels, props, config?)`, which drives a
  component through the React target so V8 collects coverage on the executed logic and remaps it back
  onto the authored `.ink.tsx` source. It compiles the styled entry plus its headless parts to React,
  transpiles each to ESM, composes the `js → react.tsx → .ink.tsx` source maps into one inlined map,
  then dynamic-`import()`s and renders the module in-worker (no child process, no `NODE_V8_COVERAGE`
  merge). The default slot is passed as `children` and every named slot as a node prop, mirroring how
  the behavioral mount projects slots, so slot-gated branches are exercised. It is a no-op unless a
  coverage run is active, so a normal `vp test` pays nothing.

### Patch Changes

- 407c744: feat(compiler): collapse styled-over-headless into one zero-wrapper Angular component

  Builds on the headless host-extraction: a styled component marked `meta.headless` whose entire render
  is a single headless child now **collapses** onto that child's host element on Angular. The compiler
  parses the imported headless sibling (a cross-file **headless registry** on the codegen context) and
  inlines its root's host bindings + template into one attribute-selector `@Component`, merging the
  styled recipe class and tagging the host with the child's own selector:

  ```
  <button ink-button>  →  <button ink-button ink-button-base class="button button--color-primary …">…</button>
  ```

  The element-selector wrapper (`<ink-button>` → `display: contents`) is still emitted (dual selector),
  so existing usage is unchanged. Applied to **Button, Badge, and FieldGroup** (`meta.headless` added to
  their headless + styled sources). Only the Angular output changes — the other six targets are
  byte-identical. A styled root whose child can't be host-extracted (non-element/fragment root) warns
  (INK0111) and keeps only the wrapper.

  `@inkline/test-utils`' Angular SSR harness now mounts attribute-selector components (`tag[attr]` → a
  real `<tag attr>` host) and can select a named component export, and registers signal-input metadata
  for every class in a multi-class file.

- 3a61a4b: Fix CSS codegen to use plain side-effect imports instead of CSS modules. Add Angular component selectors. Migrate Angular Storybook to @analogjs/storybook-angular. Rename Button to IButton.
- Updated dependencies [78ea062]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [cb27b40]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [287b326]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [b495727]
- Updated dependencies [a86ba6d]
- Updated dependencies [c12188d]
- Updated dependencies [af4684d]
- Updated dependencies [a86ba6d]
- Updated dependencies [287b326]
- Updated dependencies [c12188d]
- Updated dependencies [01a5207]
- Updated dependencies [a86ba6d]
- Updated dependencies [d0c2ef8]
- Updated dependencies [a86ba6d]
- Updated dependencies [420229e]
- Updated dependencies [a161934]
- Updated dependencies [a86ba6d]
- Updated dependencies [1b07d5f]
- Updated dependencies [a86ba6d]
- Updated dependencies [49c624f]
- Updated dependencies [a86ba6d]
- Updated dependencies [c12188d]
- Updated dependencies [fcc2bf4]
- Updated dependencies [a86ba6d]
- Updated dependencies [af4684d]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [3a61a4b]
- Updated dependencies [c12188d]
- Updated dependencies [c12188d]
- Updated dependencies [a86ba6d]
- Updated dependencies [c12188d]
- Updated dependencies [0688298]
- Updated dependencies [a86ba6d]
  - @inkline/compiler@0.1.0
