# Parked compiler content

These pages are **not routed**. No Nuxt Content collection matches
`content/_compiler/**` — the `landing` collection reads `*.md` at the content
root and every docs collection reads `docs/<folder>/**`.

They are kept here so the `/compiler` product tree can pick them up rather than
rewrite them from scratch:

| File              | Was                                          | Owner   |
| ----------------- | -------------------------------------------- | ------- |
| `architecture.md` | `docs/02.guide/01.architecture.md`           | UXF-181 |
| `installation.md` | `docs/01.getting-started/01.installation.md` | UXF-182 |

`docs/01.getting-started/01.installation.md` was rewritten in place for the
component library; the text above is its compiler-era original.

Delete this directory once `/compiler` exists and these pages have moved into
it.
