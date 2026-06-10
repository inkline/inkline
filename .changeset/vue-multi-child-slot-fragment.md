---
"@inkline/vue": patch
---

fix(compiler): Vue no longer collapses multi-child fragments into an inert `<template>`

A Vue component given multiple children in its default slot (e.g. `<IInputGroup><IInput/><IInputAppend/></IInputGroup>`), a multi-root render, or multi-node slot fallback content was wrapping them in a bare `<template>`, which Vue renders as a literal inert element — dropping every child. The Vue `Fragment` codegen now emits the children as bare siblings (matching the other targets), so they project correctly.
