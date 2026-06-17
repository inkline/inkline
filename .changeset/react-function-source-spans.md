---
"@inkline/compiler": patch
---

fix(compiler): map the React component function + return statement to source

The React target emitted the component function signature and its `return`
statement with no source span, so the whole render collapsed onto the single
render-expression mapping. Source-map consumers (debuggers, stack traces,
coverage tools) then mis-attributed the component function — reporting it as
uncovered even when it executed. The signature now carries the component's
source location and the return carries the render root's, so each maps to its
authored position. Generated code is unchanged; only the emitted source map
gains the two mappings.
