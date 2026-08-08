---
"@inkline/compiler": patch
---

Dedupe event declarations when a component declares the same event twice. The parse pass concatenated the options `events` object with the `defineEmits` declarations, so a name present in both produced two entries in the IR and a duplicated channel in every target — `defineEmits(["change", "change"])` in Vue, two `onChange` callback props elsewhere.

The two declarations now collapse into one. Precedence is **last declaration wins**, which makes `defineEmits` beat the options object: the options `events` map declares names only, while `defineEmits<{ change: [value: string] }>()` also carries the payload tuple, so that is the only direction that does not silently drop type information. The winner keeps the first declaration's position, so emitted event order still follows the options object's reading order — `{ events: { change: {}, close: {} } }` plus `defineEmits<{ change: [value: string] }>()` emits `change` (typed) then `close`, not the other way round.

The redundant declaration is reported as `INK0046`, a warning that names the event and points at the declaration to delete. Deduping keeps the output correct on its own; the diagnostic exists because declaring an event in both places is an authoring mistake worth surfacing rather than quietly repairing. Components that declare events from a single source are unaffected.
