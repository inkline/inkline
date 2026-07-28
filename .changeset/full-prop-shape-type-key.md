---
"@inkline/compiler": minor
---

Resolve the `type:` key in the full object prop shape, and report an unsupported constructor as `INK0042`.

`defineComponent({ props: { size: { type: Number } } }, …)` read `type:` through `ts.isTypeNode`, which a
constructor `Identifier` never satisfies — so the key was dropped and the prop emitted untyped on every
target (`props: { size? }` in React, `unknown` in Qwik and Astro). The `required` and `default` keys
alongside it did not rescue the type either: `{ type: Number, required: true, default: 0 }` was equally
untyped everywhere but Angular. `type:` now resolves against the same constructor table the bare form
(`size: Number`) uses — `String`, `Number`, `Boolean`, `Object`, `Array`, `Function`, `Symbol`, `Date` —
and wins over the type inferred from `default`, whichever order the keys appear in. A constructor outside
that set is reported as the new `error` diagnostic `INK0042`, whose help lists the accepted set read from
the table itself, so the message cannot drift from what the parser accepts.
