---
"@inkline/compiler": minor
"@inkline/cli": minor
---

fix(cli): suggest the closest target for a misspelled target in the config file

A misspelled target got a "did you mean" from `--target` and nothing from the config file. The flag
path went through `resolveOptions` and its suggester; the config path stopped at the zod schema and
reported the generic `INK0083`, which names the accepted values but not the one you meant.

```
# before
inkline.config.mjs:0:0  error  INK0083  Invalid config value at targets[0]:
        Invalid option: expected one of "react"|"solid"|"vue"|"svelte"|"angular"|"qwik"|"astro"

# after
inkline.config.mjs:0:0  error  INK0085  Unknown target "reakt"
    help: Did you mean "react"? Available targets: react, solid, vue, svelte, angular, qwik, astro.
```

`targetOutDir` and `targetOptions` are keyed by target name, so a typo in one of those keys is now
matched against the targets rather than against the config key set — it used to produce
`Unknown config key: targetOutDir.raect` with no guess, because suggestions were attempted for
top-level keys only. These stay warnings: an entry for a target you no longer build is ignored, not
consumed.

```
inkline.config.mjs:0:0  warning  INK0082  Unknown config key: targetOutDir.raect. Did you mean targetOutDir.react?
```

An unusable `targets` still stops the run — that stop is the behaviour, and only the message
changed. A non-string in `targets` stays on `INK0083`, because that is a wrong-typed value rather
than a misspelling.

The CLI's own edit-distance copy is deleted; one implementation now answers for every input path.
It counts a transposition as one edit rather than two, which is what lets a five-letter target name
be corrected at all: `raect` is one keystroke from `react` but two Levenshtein edits, and the
threshold for a name that short is one. Consequence on the flag path: `--target raect` now suggests
`react` where it previously suggested nothing. Every other flag-path output is unchanged, pinned
character-exact by test.

New public export from `@inkline/compiler`: `suggestClosest`. The distance function behind it stays
internal — the threshold is the judgement call, and a caller supplying its own stops matching the
compiler.
