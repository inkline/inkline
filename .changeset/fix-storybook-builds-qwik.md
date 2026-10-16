---
"@inkline/qwik": patch
---

fix(qwik): ship the entry files the package declares

`@inkline/qwik` declared `dist/index.qwik.mjs`, `dist/headless.qwik.mjs` and `dist/stories.qwik.mjs` in its `exports` and `qwik` field, but shipped none of them, so importing `@inkline/qwik`, `@inkline/qwik/headless` or `@inkline/qwik/stories` failed to resolve. The package now ships all three, and each import resolves.
