---
"@inkline/compiler": patch
---

perf(compiler): build the headless registry only when the Angular target is requested

The cross-file headless registry (re-parses + lowers a component's imported `.ink` siblings) is
consumed solely by the Angular target's collapse. It was built whenever a `meta.headless` component
had a `ComponentInstance` root, regardless of `options.targets` — so compiling such a component to a
non-Angular target (e.g. React-only via `compile()`) paid for the sibling re-parse for nothing. The
build is now gated on `"angular"` being a requested target. No effect on multi-target builds (which
include Angular); purely avoids wasted work on Angular-excluded compiles.
