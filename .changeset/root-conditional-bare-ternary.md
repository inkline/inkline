---
"@inkline/compiler": patch
---

Fix React and Qwik codegen emitting a root-level `<Show>`/conditional wrapped in JSX-expression-container braces (`return ({…})`), which parsed as an object literal and broke the build. A conditional that is the component's entire render is now emitted as a bare ternary inside `return (…)`.
