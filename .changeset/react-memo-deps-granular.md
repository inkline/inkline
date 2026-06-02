---
"@inkline/compiler": patch
"@inkline/react": patch
---

fix(react): emit granular, deduped `useMemo`/`useEffect` dependency arrays

A memo or effect that read a prop emitted the base object once per access
(`[props, props, props]`) instead of the specific reads. Dependency arrays now
use each dependency's full path (`[props.color, props.variant, props.size]`) and
are deduplicated, so memoization is correct and minimal.
