---
"@inkline/compiler": patch
"@inkline/react": patch
---

fix(react): reference `props.<name>` for model getters in `useMemo`/`useEffect` deps

A `createMemo`/`createEffect` that read a `defineModel` getter emitted the getter's bare local name in
the React dependency array (e.g. `[open]`) while the body was rewritten to `props.open`. Since the
props destructuring is emitted after the memo, the bare name hit the temporal dead zone — a runtime
`ReferenceError: Cannot access 'open' before initialization`. Model-getter dependencies now render as
their prop read (`props.open`), matching the body; signal locals stay bare (`useState`) and prop reads
are unchanged.
