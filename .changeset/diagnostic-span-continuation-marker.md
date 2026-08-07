---
"@inkline/cli": patch
---

fix(cli): mark a clamped multi-line span with a `...` continuation line

A source frame clamps a span crossing a line boundary to the end of its first line, so the caret run
stops at the newline. Nothing distinguished that from a span that genuinely ends where the carets
stop: an `INK0065` whose span ran to line 13 underlined to column 68 and read exactly like a span
ending at column 68. The reader was not misled — the message names the construct — only
under-informed.

The frame now prints a `...` continuation line under the carets, following `rustc`'s convention for
an elided span body:

```
$ inkline check src/Menu.ink.tsx
src/Menu.ink.tsx:3:5  error  INK0065  <Transition> expects exactly one child
  3 |     <Transition>
    |     ^^^^^^^^^^^^
    |     ...
```

The clamp itself is unchanged; printing the whole span body was deliberately rejected because it
buries the message. The marker is driven by the raw span end (`offset + length > lineEnd`), not by
the caret count, so a span ending exactly at the line boundary emits nothing, and one marker covers
any number of elided lines. A length overrunning the last line of the file has no next line to
continue into and is left unmarked.
