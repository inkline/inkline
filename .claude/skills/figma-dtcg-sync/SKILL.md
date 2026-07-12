---
name: figma-dtcg-sync
description: The Figma ↔ Styleframe ↔ DTCG sync architecture — what round-trips losslessly, what doesn't (booleans, composites, viewport units), mode/theme handling, and CLI commands. Use for tooling/figma and tooling/dtcg work.
---

# Figma / DTCG sync

## Architecture

Everything routes through `FigmaExportFormat` (the hub type in `tooling/figma`):

```
Styleframe code ──► FigmaExportFormat ──► Figma variables      (import to Figma)
Figma variables ──► FigmaExportFormat ──► DTCG JSON            (export from Figma)
DTCG JSON       ──► FigmaExportFormat ──► Figma variables
FigmaExportFormat ──► generateStyleframeCode ──► tokens.styleframe.ts
```

Two deliverables in `tooling/figma`: the **converter library** (npm API, `src/converters/`) and the **Figma plugin UI** (`src/plugin/`, built separately, NOT in npm exports; message protocol: import/export/get-collections/set-mode/error). `tooling/dtcg` (v1.x, newest package) holds the W3C DTCG types/classification.

## CLI surface (tooling/cli)

- `styleframe dtcg export` → spec-conformant `tokens.json` (+ `tokens.resolver.json` when themes exist). Pipeline: loader → extract root+theme vars → `evaluate.ts` reduces TokenValues to primitives → classify via @styleframe/dtcg.
- `styleframe dtcg import -i tokens.json` → `tokens.styleframe.ts` (flags: `--composables` default true, `--rem`, `--baseFontSize` 16, `--instanceName` s).
- `styleframe figma export` → **per-mode** `{ModeName}.tokens.json` Figma-compatible DTCG files (one file per mode, token counts + diagnostics logged).
- `styleframe figma import` → per-mode file OR directory of mode files → `tokens.styleframe.ts` (reads `modeName` from each doc, merges).

## What syncs cleanly

- **Color**: CSS hex/rgb/hsl/oklch/oklab ↔ Figma RGBA 0–1 (via culori); hex8 when alpha < 1.
- **Dimension**: px ↔ Figma FLOAT; optional rem with `baseFontSize`.
- **String**; **aliases** `{color.primary}` ↔ two-pass resolution (non-alias vars first, then aliases).
- **Naming**: dot ↔ slash ↔ camelCase ↔ CSS custom-prop conversions.
- **Modes/themes**: stored in `$modifiers.theme.contexts` (standard) with legacy `$extensions["dev.styleframe"].modes` fallback; collection+modes in `$extensions["dev.styleframe"]`. Detection priority: modifier contexts → extension modes → default.
- **Codegen** groups by category into theme composables (color→useColor, spacing→useSpacing, fontSize/fontWeight/fontFamily/lineHeight/letterSpacing/borderWidth/borderRadius/boxShadow); unmatched/alias vars emit raw `variable()` calls.

## Known losses (the fidelity ceiling — current top improvement targets)

1. **BOOLEAN has no DTCG type** → maps to `string`; round-trip is lossy.
2. **Composite tokens unimplemented**: multi-shadows, CSS lists, gradients, typography composites. `tooling/cli/src/commands/dtcg/evaluate.ts` (~line 296): heterogeneous arrays are "out of scope for the primitive evaluator" → fall back to `dev.styleframe.expression` extensions instead of typed DTCG composites.
3. **Viewport/percent units** (`vh`/`vw`/`%`, non-px/rem/em) → `dimensionToPixels` returns null → **dropped**.
4. Non-reducible CSS expressions → preserved as `dev.styleframe.expression`; untyped tokens → `dev.styleframe.unknownType`.
5. Figma type folding on reverse: number/fontWeight/duration→FLOAT, fontFamily→STRING.

## Working rules

- **Never silently drop data.** Every lossy conversion emits a diagnostic naming the token and why. Losing tokens quietly destroys designer trust permanently.
- DTCG is a draft spec: conform where it specifies; where it's silent, use `$extensions["dev.styleframe"]` and document the deviation in the docs integration page.
- Every mapping change ships with round-trip tests (Styleframe → DTCG → Styleframe; Figma-shape fixtures both directions).
- Composite-token work coordinates three surfaces: `dtcg` types → cli `evaluate.ts` → figma converters. Land them together or feature-flag.
