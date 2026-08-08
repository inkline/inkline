import { describeBrandPaletteCss } from "@uxfront/layer-docs/test";

/**
 * Source-level half of the brand-palette guard, from the layer's shared preset
 * so all three of its consumers assert the same invariant the same way.
 *
 * What it guards: a Tailwind `@theme` block only compiles into real `:root`
 * custom properties when it lives in a file that is part of a Tailwind pass. If
 * `app/assets/css/main.css` stops importing the layer's base, the
 * `@theme static { --color-purple … }` block ships to the browser verbatim,
 * browsers discard the unknown at-rule, and every `*-primary` utility falls
 * back to black/transparent site-wide.
 *
 * Cheap — reads one file, so it runs in the default `vp test`. The
 * compiled-output half is `brand-palette-compiled.build.test.ts`.
 */
describeBrandPaletteCss({
  entry: new URL("../app/assets/css/main.css", import.meta.url),
  scale: "purple",
});
