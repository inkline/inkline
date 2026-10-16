---
"@inkline/qwik": patch
---

fix(qwik): build the package as a library so `dist` has its entries

The `build` script ran `vp build` without `--mode lib`, so Qwik's Vite plugin ran an app build. It
wrote `dist/build` and `q-manifest.json`, but none of the `index.qwik.mjs`, `headless.qwik.mjs` or
`stories.qwik.mjs` files that `exports` and the `qwik` field point to. The script is now
`vp build --mode lib`, so every entry the package declares exists after a build.
