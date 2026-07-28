---
"@inkline/core": minor
---

Widen the `when` prop on `Show` and `Match` to the new exported `Condition` type (`boolean | null | undefined`). Forwarding an optional flag — `<Show when={props.textarea}>` where `textarea?: boolean` — now type-checks without a `!!` at the call site. `when` stays required, and functions are still rejected so a missing `()` on a signal remains a type error. Runtime and compiler behaviour are unchanged: every target already lowers `when` to a native truthiness test where nullish behaves as `false`.
