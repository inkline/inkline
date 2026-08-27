---
"@inkline/compiler": patch
---

fix(compiler): lower `untrack()` on the react target instead of emitting it verbatim

`untrack(() => …)` reached the react output as a bare call. React has no such
primitive and nothing imported one, so the emitted module referenced an
undeclared identifier — `TS2304: Cannot find name 'untrack'`, and a
`ReferenceError` at runtime had that branch executed. The compiler reported no
diagnostic, so nothing warned the author.

React's dependency array is computed by the compiler, and the 02-parse
dependency walk does not descend into nested functions, so reads made inside the
`untrack` callback were already absent from it: `UntrackBoundary` emits
`useEffect(…, [count])`, not `[count, log]`. The untracking was therefore already
fully realised before codegen and the wrapper had nothing left to do at runtime,
so it is now inlined to its callback body rather than emitted.

`RewriteRules.untrack` carries this per target. Only react opts in. Targets that
track dependencies at runtime (solid, vue, svelte, angular, qwik) cannot unwrap —
that would make the read tracked — and still emit the call verbatim; each needs
its framework's own primitive plus its import, tracked separately.
