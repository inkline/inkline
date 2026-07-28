---
"@inkline/compiler": minor
"@inkline/cli": patch
---

Make `inkline compile --watch` inherit the initial build and report every rebuild with a duration.

The watcher started from an empty incremental state, so the first save after startup recompiled
every file — repeating the full build that had just finished. It now inherits the initial pass:
on a 67-file project the first edit rebuilds 1 file and skips 66 instead of rebuilding all 67.

Rebuilds also always print now, including a save that does not change the file's bytes (previously
silent, making a live watcher indistinguishable from a dead one), and every rebuild line carries
elapsed milliseconds:

```
Rebuilt 1 file(s), skipped 66 in 31ms
No changes, 67 file(s) up to date in 23ms
```

`@inkline/compiler` gains `seedIncrementalState(seeds)` and the `IncrementalSeed` type, for adopting
results from a plain `compile()` pass into an `IncrementalState`. Additive — nothing else changes.
