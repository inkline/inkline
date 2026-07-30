# Vendored JSX element types

`jsx-intrinsics.d.ts` is a verbatim copy of the JSX element type definitions published in the
`solid-js` npm package. It is the upstream that `JSX.IntrinsicElements` is derived from, via the
`Inklinified<T>` alias in `../jsx-runtime.ts`.

| | |
|---|---|
| Source | `solid-js@1.9.13`, file `types/jsx.d.ts`, as published on npm |
| Upstream project | https://github.com/solidjs/solid |
| License | MIT — see [`LICENSE.solid-js`](./LICENSE.solid-js) |
| Local changes | **None.** Everything after the 28-line vendoring header is byte-identical to upstream. |

## Why this is vendored rather than depended on

`solid-js` is a runtime package. Depending on it for types alone would put a framework runtime in
`@inkline/core`'s dependency tree — a package whose entire purpose is to ship *no* runtime, and whose
output erases every `@inkline/core` reference. The dependency would be installed by every consumer,
appear in every audit and lockfile, and imply a framework relationship that does not exist. Inkline
compiles *to* Solid as one of seven targets; it is not built on it.

The element types themselves are just a description of the HTML/SVG/MathML attribute surface. That
description is stable, generated upstream from published specs, and does not need to arrive as a
runtime package.

Only `csstype` remains as a real dependency. It is types-only by construction — the published
package contains `index.d.ts` and no JavaScript at all — and is the same package `@types/react` and
most of the ecosystem use for CSS property types.

## Re-sync procedure

The vendored copy is deliberately excluded from `vp fmt` so that it stays byte-identical to upstream
and this diff stays readable. It is *not* excluded from `vp lint`, because that list also gates the
type-check path and this file is the surface under test. Upstream's open-union idiom
(`"auto" | string`) trips `no-redundant-type-constituents` 11 times; the `oxlint-disable` in the
header silences that for `vp lint`, while `vp check`'s type-aware pass reports the same 11 as
warnings regardless — it does not honour suppression comments. Both commands exit 0. Do not
hand-edit the body; changes belong in `../jsx-runtime.ts`, which is the seam that reshapes the
upstream.

```bash
# 1. Fetch the version you want to move to.
npm pack solid-js@<version>
tar -xzf solid-js-<version>.tgz

# 2. Diff it against the vendored copy, ignoring our header.
diff <(tail -n +29 core/core/src/vendor/jsx-intrinsics.d.ts) package/types/jsx.d.ts

# 3. If you accept the change, replace the body below the header and refresh the LICENSE.
#    Then update the version in the header of jsx-intrinsics.d.ts and in the table above.
cp package/LICENSE core/core/src/vendor/LICENSE.solid-js

# 4. The gate that tells you whether the new surface is safe:
pnpm --filter @inkline/core test   # 13-case probe table — see ../jsx-runtime.probes.test.ts
vp check                           # 101 authored .ink.tsx fixtures + 67 components
```

Step 4 is the point of the whole arrangement. The probe suite pins the *safety level* of the surface
and the fixtures pin its effect on real authored components, so a re-sync that quietly weakens or
tightens type-checking fails loudly instead of drifting.
