import { describeSingleTailwindPass } from "@uxfront/layer-docs/test";

/**
 * Compiled-output half of the brand-palette guard: exactly one Tailwind pass in
 * the shipped stylesheet, and the purple palette present in it.
 *
 * This repo is where the regression it guards actually shipped. Until
 * `@uxfront/layer-docs@0.3.0` the layer registered its own base CSS in `css:`
 * while this app's `main.css` imported that same base, giving the build two
 * Tailwind entries and a byte-for-byte duplicate of every utility:
 * `entry.css` measured 437,170 B raw / 55,295 B gzip against 224,261 B /
 * 28,573 B for the single-pass build — +94% on a render-blocking stylesheet,
 * on every page for every visitor (UXF-118, UXF-121).
 *
 * The cost is payload, not layout: the duplicate pass was a complete superset
 * of the first and emitted wholly after it, so the last `sm:`/`lg:` variant
 * still won by source order and a computed-style A/B across 4 pages x 4
 * viewports found zero rendering difference. Incidental, not designed — hence
 * the guard.
 *
 * Requires a prior `nuxt build`. Excluded from the default `vp test` run (see
 * `vitest.config.ts`); runs via `test:build` in the Build Website CI job,
 * against the artifact that job just produced.
 */
describeSingleTailwindPass({
  output: new URL("../.output/public/_nuxt", import.meta.url),
  scale: "purple",
});
