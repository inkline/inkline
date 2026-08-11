---
"@inkline/cli": minor
---

Stop `compile --clean` from deleting anything that is not an output directory.

`--clean` defaults to on and removes each target's directory with
`rmSync(dir, { recursive: true, force: true })`. `dir` came straight from `resolveTargetDir`, so a
config value that was type-valid but meaningless as a path took the removal with it:
`targetOutDir: { react: "" }` resolved to the working directory and deleted the project's sources,
README and the config itself before the command failed on its own now-missing input. `outDir: ""`
resolved targets to `/<target>`, outside the project entirely, and `targetOutDir: { react: "/" }`
named the filesystem root. `""` and `"/"` are valid `z.string()` values, so config validation had
nothing to object to — the values had the right type and the wrong meaning, and no schema change
could have caught them.

Every target directory is now vetted before the first removal. Two tiers:

- **No opt-out**: the filesystem root, the working directory, and any directory containing it are
  never cleaned, whoever named them.
- **The output tree must be a sane place and the target must be in it**, applied to paths derived as
  `outDir/<target>`. This is what rejects `outDir: ""` and `outDir: "/"`. `outDir: "."` keeps
  working; `outDir: ".."` and anything else above the project no longer does.

An explicit `targetOutDir` entry is exempt from the second tier and still cleans normally: an
absolute or relative per-target override pointing outside `outDir` is a documented feature and
behaves exactly as before. It is not exempt from the first.

Every comparison is made on **real paths**, with symlinks followed. Comparing resolved strings
compares spellings, and a directory reachable by two names would then be guarded only under the one
`process.cwd()` reports — macOS ships `/tmp` → `/private/tmp` and `/var` → `/private/var` by
default, so `targetOutDir: { react: "/tmp/proj" }` would sail past a check that refuses the
identical `/private/tmp/proj`. The target directory usually does not exist yet on a first build, so
canonicalisation resolves the nearest existing ancestor and re-appends the remainder. Removal still
operates on the path as written, so cleaning a symlinked output directory unlinks the link rather
than its contents.

A refusal names the target, the resolved path, the reason and the config key that produced it, then
exits `2` having deleted nothing — including the targets listed before the bad one, because the
whole set is checked before any of it is removed. It is never a silent skip: a `--clean` that
quietly declined to clean would resurface later as stale output nobody can explain. `--no-clean`
still skips cleaning outright.
