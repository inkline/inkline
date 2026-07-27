---
"@inkline/cli": patch
---

fix(cli): give `compile --out-dir` precedence over the config file's `outDir`

`inkline compile --out-dir <path>` was ignored whenever a config file set `outDir`: the resolution
order was config-first, and the flag also carried a citty `default: "dist"` that made it impossible
to tell "flag omitted" from "flag passed as dist". In practice the flag did nothing for any project
with a config file. It now resolves flag > config > `dist`, matching `--target`, `--src-dir` and
`--source-map`.

Behaviour change: a project that relied on the config value winning over an explicitly passed
`--out-dir` will now write to the flag's path. Remove the flag from that invocation to keep the
previous output location. A per-target `targetOutDir` entry in the config is unchanged and still
overrides both for the targets it names.
