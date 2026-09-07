---
"@inkline/compiler": patch
---

Dedupe slot declarations when a component declares the same slot twice. Slots were the last of the three declaration channels still concatenating: the parse pass joined the options `slots` object with the `defineSlot` declarations, so a repeated name registered twice in the IR and every target emitted the duplicate. Props already refused the pair (`INK0047`) and events already collapsed it (`INK0046`); slots did neither, and reported nothing.

The duplicate declarations now collapse into one. The merge keys on the slot name alone, so it covers both shapes of the bug: a name declared on both channels, and a name declared twice on one — two `defineSlot("header")` calls in a single setup body registered twice as well, and reported nothing either. Precedence is **first declaration wins**, which makes the options entry beat `defineSlot` — the opposite direction from events, because the richer channel is the opposite one: the options entry carries `required` and `scoped`, while `defineSlot` produces a plain declaration from the call alone, so letting setup win would silently drop `required: true`. The binding is unaffected either way; `slotBindings` is a separate map, so `const footer = defineSlot("footer")` still places the slot by its local whichever declaration survives.

Every declaration after the first is reported as `INK0076`, a warning that names the slot and points at the declaration to delete. It is a warning rather than an error for the same reason `INK0046` is: the merge already keeps the output correct on its own, and unlike the two props channels — which carry different shapes, so no merge can be lossless — a slot declared twice is the same slot twice over.

The options channel is unchanged and still supported; only the repeat is reported. Components that declare each slot once are unaffected.
