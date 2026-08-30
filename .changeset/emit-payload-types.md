---
"@inkline/compiler": patch
---

Carry `defineEmits` payload types through to every target. The declared tuple was parsed and then discarded, so events were emitted untyped everywhere — most visibly in Angular, where `defineEmits<{ change: [value: string] }>()` produced a bare `change = output()`. That infers `OutputEmitterRef<void>`, so the generated `this.change.emit(value)` did not even type-check.

`change = output<string>()` now, and the payload reaches the other targets too: React/Solid/Svelte get `onChange?: (value: string) => void` instead of `(...args: any[]) => void`, Qwik the same inside its `QRL<…>`, and Vue re-declares the shape as `defineEmits<{ change: [value: string] }>()` instead of the untyped array form. Custom events remain inert on Astro (`INK0045`), so nothing is typed there.

Angular is the one target that cannot take the tuple verbatim, because an `output<T>` carries exactly one value. A single-value tuple unwraps, an empty one becomes `output<void>()`, and a multi-value tuple stays a tuple with the emit call packing its arguments to match (`emit("move", x, y)` → `this.move.emit([x, y])`) rather than silently dropping all but the first. Declaring events with the runtime array form (`defineEmits(["change"])`) still leaves them untyped, as it carries no type to begin with.
