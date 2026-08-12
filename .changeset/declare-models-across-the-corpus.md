---
"@inkline/compiler": patch
---

chore(compiler): declare `options.models` on every authored component that creates models

Every component in `ui/components` and `core/compiler/src/__fixtures__` whose setup body calls
`defineModel` now also declares those models in `options.models`. 15 files, 15 model declarations,
three distinct names (`value`, `checked`, `open`).

`options.models` is a type-only channel, so this changes no emitted output: the 546 generated code
files across all seven targets are byte-identical before and after (only `.map` source-map offsets
move, tracking the reformatted authored source). `INK0094` — the drift diagnostic that exists to
catch a `models` declaration disagreeing with the setup body — reports zero findings across the
migrated corpus.

Applied by `pnpm --filter @inkline/compiler run codemod:declare-models <files…>`, shipped as
`scripts/codemod-declare-models.ts`. It reads the same facts the compiler extracts at P2, splices
text at AST offsets rather than reprinting, and skips any `defineComponent` whose options already
carry a `models` key — so the deliberately-drifted `Diag_Model*` fixtures are left intact and
re-running it is a no-op.
