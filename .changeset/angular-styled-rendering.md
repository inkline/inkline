---
"@inkline/compiler": minor
"@inkline/angular": minor
"@inkline/test-utils": minor
---

feat(compiler): render recipe-based styled components on the Angular target

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
