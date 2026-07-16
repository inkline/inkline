# Switch — staged docs-site page

> **Status: staged, not shipped.** The docs website (`apps/website`) is still a
> Vite vanilla starter — there are no component-doc pages yet. This file holds the
> switch page content so it's ready the day the site lands (per
> `/document-component`, step 4). Drain this queue into the real page when the
> docs-site framework exists. Source of truth for every claim here:
> `ui/components/src/components/switch/**` on `main` (shipped in PR #500).

---

## Switch

A `Switch` is an accessible on/off toggle. It follows the WAI-ARIA
[Switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) on a native
`<input type="checkbox">`: a two-way `checked` model drives `aria-checked`, the
browser toggles on Space natively, and Enter is handled explicitly to complete
the switch keyboard map. Use it for a binary setting that takes effect
immediately (dark mode, notifications on/off) — not for form submission you
review before saving, where a checkbox reads better.

```tsx
// React
import { ISwitch } from "@inkline/react";

<ISwitch checked={enabled} onUpdateChecked={setEnabled}>
  Enable notifications
</ISwitch>;
```

Import the component from your framework package (`@inkline/react`,
`@inkline/vue`, `@inkline/svelte`, `@inkline/solid`, `@inkline/angular`,
`@inkline/qwik`, `@inkline/astro`). The public name is `ISwitch` on every target.

## Anatomy

`ISwitch` is a single styled component that composes three headless parts. You
render `ISwitch`; the parts are exported (`ISwitchBase`, `ISwitchControlBase`,
`ISwitchLabelBase`) only for advanced custom composition.

| Part                 | Element                             | Role                                                                 |
| -------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| `ISwitchBase`        | `<label class="switch">`            | The shell. Wrapping the control implicitly associates the label.     |
| `ISwitchControlBase` | `<input type="checkbox" role="switch">` | The native toggle, styled via `.switch-field` as a sliding switch.   |
| `ISwitchLabelBase`   | `<span class="switch-label">`       | The text. Collapses via `.switch-label:empty` when no label is given. |

Styling comes from the Styleframe `switch` / `switch-field` recipes
(`useSwitchRecipe` / `useSwitchFieldRecipe`), registered in
`ISwitch.styleframe.ts`.

## Props

From `SwitchProps` (`ui/components/src/components/switch/styled/ISwitch.ink.tsx`),
which extends `SwitchControlBaseProps`.

| Prop       | Type                            | Default | Description                                        |
| ---------- | ------------------------------- | ------- | -------------------------------------------------- |
| `checked`  | `boolean`                       | `false` | Two-way model — the on/off state. See Binding.     |
| `label`    | `string`                        | —       | Label text; overridden by the default slot.        |
| `color`    | `"light" \| "dark" \| "neutral"` | —       | Off-state track colour.                            |
| `size`     | `"sm" \| "md" \| "lg"`           | —       | Size variant.                                      |
| `disabled` | `boolean`                       | `false` | Disables the control.                              |
| `id`       | `string`                        | —       | Id of the native control.                          |
| `name`     | `string`                        | —       | Name of the native control (form submission).      |

### Slots

| Slot      | Description                                                          |
| --------- | ------------------------------------------------------------------ |
| `default` | The label content. Overrides the `label` prop when both are given. |

### Model / events

| Model     | Event            | Description                                  |
| --------- | ---------------- | -------------------------------------------- |
| `checked` | `update:checked` | Emitted (with the new boolean) on each toggle. |

## Binding

`checked` is a two-way model. Each framework binds it with its native idiom
(from the two-way-binding work, UXF-5):

| Framework          | Binding                                    |
| ------------------ | ------------------------------------------ |
| Vue                | `v-model:checked="enabled"`                |
| Svelte             | `bind:checked={enabled}`                   |
| Angular            | `[(checked)]="enabled"`                    |
| React / Solid / Qwik | `checked={enabled}` + `onUpdateChecked={setEnabled}` |
| Astro              | render-only (one-way; not interactive — diagnostic `INK0045`) |

## Examples

### Basic (framework parity — one example per target)

```tsx
// React / Solid / Qwik — controlled value + update callback
<ISwitch checked={enabled} onUpdateChecked={setEnabled}>
  Enable notifications
</ISwitch>
```

```vue
<!-- Vue -->
<ISwitch v-model:checked="enabled">Enable notifications</ISwitch>
```

```svelte
<!-- Svelte -->
<ISwitch bind:checked={enabled}>Enable notifications</ISwitch>
```

```html
<!-- Angular -->
<i-switch [(checked)]="enabled">Enable notifications</i-switch>
```

```astro
<!-- Astro — render-only -->
<ISwitch checked={true}>Enable notifications</ISwitch>
```

### Label

The accessible name comes from the default slot, or the `label` prop when you
have no children to slot:

```tsx
<ISwitch checked={enabled} onUpdateChecked={setEnabled} label="Enable notifications" />
```

### Disabled

```tsx
<ISwitch checked={enabled} onUpdateChecked={setEnabled} disabled>
  Unavailable
</ISwitch>
```

### Color and size

```tsx
<ISwitch checked={a} onUpdateChecked={setA} color="dark" size="lg">Large, dark track</ISwitch>
<ISwitch checked={b} onUpdateChecked={setB} color="neutral" size="sm">Small, neutral</ISwitch>
```

## Accessibility

Switch implements the WAI-ARIA
[Switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/):

- **Role.** The control is a native `<input type="checkbox">` with
  `role="switch"`, so assistive tech announces it as a switch, not a checkbox.
- **State.** `aria-checked` mirrors the `checked` model (`"true"` / `"false"`).
- **Name.** The label text (default slot or `label` prop) is the accessible
  name; the shell `<label>` wraps the control, so the association is implicit —
  clicking the label toggles the switch.
- **Keyboard.** `Space` toggles (native checkbox behaviour). `Enter` also
  toggles — the component synthesises the native click on Enter to complete the
  APG switch keyboard map, since a checkbox does not respond to Enter by default.
- **Disabled.** `disabled` sets the native disabled state, removing the control
  from the tab order.

## See also

- Component source: `ui/components/src/components/switch/`
- Recipe styling: `ISwitch.styleframe.ts` → `switch` / `switch-field`
- Changeset: `.changeset/add-switch.md`
