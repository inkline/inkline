# Inkline component conventions (source-anchored)

This is the distilled, **current** practice for authoring `@inkline/components`. The prose in `docs/authoring-components.md` has drifted (it still shows lowercase `<slot>`, `badge(props)`, and a `runScenarioAcrossTargets` test helper that no longer exists). **When in doubt, the live source wins.** Open the nearest exemplar and mirror it:

| Exemplar   | Path                                   | What it teaches                                                                                                                                          |
| ---------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Badge**  | `ui/components/src/components/badge/`  | The canonical single-part pattern — copy this for a simple component.                                                                                    |
| **Button** | `ui/components/src/components/button/` | Conditional render (`<Show>`), state→ARIA, custom styleframe rules + keyframes, a `block` layout flag.                                                   |
| **Input**  | `ui/components/src/components/input/`  | A family: 4 headless parts composed by **one** styled component, named slots gated by `hasSlot`, two-way `value` via `defineModel`, `<textarea>` branch. |

## Directory layout

```
ui/components/src/components/<name>/
├── headless/
│   ├── I<Name>Base.ink.tsx        # behavior, structure, slots, events, a11y — NO styling
│   └── I<Name>Base.ink.test.ts    # colocated test (compile/conformance/snapshot)
├── styled/
│   ├── I<Name>.ink.tsx            # composes headless part(s) + applies styleframe recipe classes
│   ├── I<Name>.styleframe.ts      # registers the recipe(s) + any custom CSS for this family
│   └── I<Name>.ink.test.ts        # colocated test (+ Angular-SSR real-DOM assertions)
└── stories/
    ├── I<Name>.ink.stories.ts     # defineStories meta + variants
    └── <Variant>.ink.tsx          # render-helper showcases (Colors, Sizes, …)
```

- Files are `.ink.tsx` (components/stories) and `.ink.test.ts` (tests), colocated. **Never** a separate `tests/` folder.
- Tests sit next to the file they cover: the headless test in `headless/`, the styled test in `styled/`.
- Compiled output lands per `targetOutDir` in `ui/components/inkline.config.ts` — **currently `ui/<framework>/.inkline/`** (the AGENTS.md/CLAUDE.md prose saying `generated/` is stale; read the config). That directory and `ui/<framework>/.styleframe/` are generated — **never hand-edit**. Same for `.old/` (archived v0, read-only reference only).

## Headless / styled split

Every component ships in two layers:

- **Headless** (`I<Name>Base`) — structure, slots, props, events, accessibility. No design tokens, no styleframe class names. These are the testable, themable behavioral primitives consumers swap in if they ship their own styling.
- **Styled** (`I<Name>`) — composes the headless part(s) and applies `styleframe`-generated classes from `virtual:styleframe`. This is what `@inkline/{react,vue,…}` consumers import by default.

**One styled component per _family_, not per part.** When a component has multiple structural parts (shell, control, addons), author one headless part each, then compose them all in a **single** styled component. Input is the model: `headless/IInput*Base` × 4 → one `styled/IInput.ink.tsx`.

## Naming

- **Component**: PascalCase, `I` prefix. Headless adds `Base`: `IButton` / `IButtonBase`, `IInputControl` / `IInputControlBase`.
- **Props interface**: `<Name>Props` (styled) / `<Name>BaseProps` (headless). The styled interface `extends` the base + the recipe's styling props: `interface BadgeProps extends BadgeBaseProps, BadgeStylingProps {}`.
- **Recipe**: `<name>Recipe` (e.g. `badgeRecipe`), registered and re-exported from `I<Name>.styleframe.ts`.

## Prop-naming philosophy — design the API from the consumer's side first

The bar is "the most common usage needs zero props, and every prop reads like plain English." Rules:

- **Booleans are positive state adjectives, no `is`/`has`/`should` prefix**: `disabled`, `loading`, `readonly`, `invalid`, `required`, `clearable`, `rounded`, `block`. (Keep the HTML-native sense — use `disabled`, not `enabled`.)
- **The canonical visual trio is `color` / `variant` / `size`**, named to match the styleframe recipe parameters exactly, with the standard design-system vocabulary:
  - `color`: `primary` `secondary` `success` `info` `warning` `error` `light` `dark` `neutral`
  - `variant`: `solid` `outline` `soft` `subtle` `ghost` `link`
  - `size`: `xs` `sm` `md` `lg` `xl`
  - Only expose the values the recipe actually supports. Don't invent a fourth axis unless the design system has one.
- **Mirror native attribute names exactly** for anything the platform already names: `type`, `name`, `id`, `placeholder`, `value`, `min`, `max`, `step`, `href`, `target`. Never rename them (`class`, not `className`).
- **Content**: a single `label?: string` prop for simple text (with a default `<Slot>` fallback so richer content can override it). Named slots for structured content (`prefix`, `suffix`, `icon`).
- **Two-way state** is a model: `const [value, setValue] = defineModel<string>("value")`; consumers bind `$bind:value`. Name additional models for their meaning (`defineModel<boolean>("open")`).
- **Events** are semantic and unprefixed (the compiler maps to each target's idiom): `change`, `input`, `clear`, `open`, `close`. The model's paired event is `update:value` (emitted by `defineModel`'s setter). Type payloads: `defineEmits<{ change: [value: string] }>()`.
- **Avoid**: abbreviations (`btn`, `lbl`), redundant prefixes (`buttonColor` → `color`), and props that exist only to pass through to one framework.
- Give every optional prop a sensible default applied with `??` so the zero-config case is the common case.

Document **every** prop with a one-line TSDoc comment (`/** Disables the control. */`) — `IInput`'s interfaces are the bar.

## Accessibility baseline (every component clears this)

- **Reach for a native semantic element first** (`<button>`, `<input>`, `<a href>`, `<nav>`, `<dialog>`, `<label>`). Native gives you role, keyboard operability, and focus for free. Use `<div role="…">` only when no native element fits.
- When a native element doesn't fit, **follow the WAI-ARIA Authoring Practices (APG) pattern** for that widget — its required roles, states, properties, and keyboard map. (The research phase pins the exact pattern.)
- **Reflect state in ARIA**: `disabled`/`aria-disabled`, `aria-busy` (loading), `aria-invalid` (invalid), plus widget states where they apply (`aria-expanded`, `aria-selected`, `aria-checked`, `aria-pressed`, `aria-current`).
- **Hide decorative nodes** from the a11y tree: `aria-hidden="true"` on spinners and icons that merely duplicate adjacent text.
- **Accessible name**: every interactive control has one — a visible `<label for>`/`id`, `aria-label`, or `aria-labelledby`. Icon-only controls require `aria-label`.
- **Keyboard + focus**: all interactions operable by keyboard per the APG key bindings (Enter/Space to activate, arrows for composite widgets, Escape to dismiss). Preserve a visible focus indicator; never strip the outline without a replacement. Logical tab order; manage focus for overlays/menus.
- **Motion**: gate animations behind `prefers-reduced-motion` in the styleframe layer.

## Attribute fallthrough (how styled reaches headless)

The styled→headless composition relies on **attribute fallthrough**: a parent's `class` is _merged_ onto the child's single root element, and every other non-prop attribute (`id`, `aria-*`, `data-*`, handlers) is spread onto it. That's how `<IBadgeBase class={badgeRecipe(...)}>` lands the recipe class on the headless `<div class="badge">`.

Fallthrough requires a **single host-element (or single component-instance) root**. A component whose root is a fragment, a control-flow block, or multiple siblings cannot inherit attributes — passing a `class` to it emits **`INK0120`**. Keep headless roots single-element. (Angular applies the inherited `class` to the host element/selector, not the inner template root — style with `:host` if needed.)

## Registration

Re-export the new component from `ui/components/src/components/index.ts` so the compile step picks it up. Export the styled component and every headless part:

```ts
export { default as IBadge } from "./badge/styled/IBadge.ink.tsx";
export { default as IBadgeBase } from "./badge/headless/IBadgeBase.ink.tsx";
```

The per-framework barrels (`index.ts`, `headless.ts`, `stories.ts`) are generated from `inkline.config.ts` → `barrels` — do not write them by hand.

## Canonical references

- `ui/components/AGENTS.md` — package rules (note the `generated/` path is stale; trust `inkline.config.ts`).
- `core/compiler/README.md` — the full `.ink.tsx` language reference (primitives, control flow, slots).
- `core/compiler/src/core/diagnostics/codes.ts` — the authoritative diagnostic-code table.
