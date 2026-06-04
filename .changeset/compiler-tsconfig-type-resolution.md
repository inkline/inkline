---
"@inkline/compiler": minor
"@inkline/cli": patch
---

feat(compiler): resolve ambient module types via a `tsconfig` config option

Add a generic `tsconfig` option to the Inkline config. When set, the compiler loads
that tsconfig's ambient type-declaration files (`*.d.ts` from its `include`/`files`)
into the per-file TypeScript program, so `import type` from virtual modules (e.g.
`virtual:styleframe`) resolves during prop analysis — letting recipe styling props be
enumerated as real component props. Inkline's own compiler options (jsx,
jsxImportSource, …) are always forced on top; the per-file program model (and Vite
plugin compatibility) is preserved. The CLI forwards the option from `inkline.config.ts`.
