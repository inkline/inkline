---
"@inkline/compiler": patch
---

docs(compiler): correct the README props, config, and diagnostics reference

The `Props` section now leads with the typed-parameter form (the form every component in
`ui/components` uses), documents that defaults in that form are applied at the read site
(`props.type ?? "button"`), and states the no-destructuring rule and why Solid requires it. The
options-object form is retained — it is a real, per-target-tested feature — with a note that it does
not type-check today because `ComponentOptions` in `@inkline/core` declares no `props` key and
`defineComponent` cannot infer the setup parameter's type from the options object.

Also corrected in the same pass:

- The `INK0100` row described an emit failure; the code is raised on a parse failure.
- The configuration table was missing `targetOutDir`, `tsconfig`, and `barrels`.
- The diagnostics table listed 13 of 26 codes with no indication it was partial; it now points at
  `pnpm docs:diagnostics`, generated from `src/core/diagnostics/codes.ts`.
