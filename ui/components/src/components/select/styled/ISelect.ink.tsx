import { defineComponent, For, Show, defineModel, createSignal, createMemo } from "@inkline/core";
import ISelectBase from "../headless/ISelectBase.ink.tsx";
import ISelectTriggerBase from "../headless/ISelectTriggerBase.ink.tsx";
import ISelectListboxBase from "../headless/ISelectListboxBase.ink.tsx";
import ISelectOptionBase from "../headless/ISelectOptionBase.ink.tsx";
import {
  selectRecipe,
  selectPanelRecipe,
  selectOptionRecipe,
  selectArrowRecipe,
  type SelectRecipeProps as SelectStylingProps,
} from "virtual:styleframe";

/** A single choice in a select. */
export interface SelectOption {
  /** The value committed when this option is selected. */
  value: string;
  /** Visible label; falls back to the value. */
  label?: string;
  /** Disables just this option. */
  disabled?: boolean;
}

// Styling props are declared explicitly (rather than `extends`ing the recipe-props interface)
// because the compiler only enumerates members of directly-named interfaces, and the recipe's
// boolean-keyed axes (`invalid`/`disabled`/`readonly`, typed `"true" | "false" | boolean`) conflict
// with the plain `boolean` we want on the public API. So those three are `boolean` (a `boolean`
// satisfies the recipe call below) and the visual axes reference the recipe's own types so they
// stay a single source of truth.
export interface SelectProps {
  /** Id of the select; option and listbox ids are derived from it. */
  id?: string;
  /** The options rendered in the listbox. */
  options?: SelectOption[];
  /** Placeholder shown (with the `-placeholder` modifier) when nothing is selected. */
  placeholder?: string;
  /** Accessible name for the trigger and listbox. */
  label?: string;
  /** Color variant. */
  color?: SelectStylingProps["color"];
  /** Style variant. */
  variant?: SelectStylingProps["variant"];
  /** Size variant. */
  size?: SelectStylingProps["size"];
  /** Invalid-state styling and `aria-invalid`. */
  invalid?: boolean;
  /** Disables the whole control. */
  disabled?: boolean;
  /** Shows the value but blocks opening/changing it. */
  readonly?: boolean;
}

/**
 * The styled Select: a complete single-select combobox. It renders a `role="combobox"` trigger and,
 * while open, a `role="listbox"` panel of `role="option"` rows built from `options`. It owns the
 * two-way `value`, plus internal `open` and virtual-focus `activeIndex` state, and wires the APG
 * select-only keyboard model — Down/Up/Home/End move the active row, Enter/Space open then commit,
 * Escape closes — via `aria-activedescendant` (focus never leaves the trigger). `color`/`variant`/
 * `size`/`invalid` map to the styleframe recipe axes. Two-way `value` uses the binding idiom
 * (`$bind:value`); on the static Astro target it lowers to one-way (INK0045).
 */
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: SelectProps) => {
    const [value, setValue] = defineModel<string>("value");
    const [open, setOpen] = createSignal(false);
    const [activeIndex, setActiveIndex] = createSignal(-1);

    const rootId = createMemo(() => props.id ?? "select");
    const listboxId = createMemo(() => `${rootId()}-listbox`);

    // Enrich each option with a stable id + its index so the render callback (which only receives the
    // item) can wire `aria-activedescendant` and the active row without a separate index argument.
    const enriched = createMemo(() =>
      (props.options ?? []).map((option, index) => ({
        value: option.value,
        label: option.label ?? option.value,
        disabled: option.disabled ?? false,
        index,
        id: `${rootId()}-option-${index}`,
      })),
    );

    const selectedIndex = createMemo(() => enriched().findIndex((o) => o.value === value()));
    const selectedOption = createMemo(() => enriched().find((o) => o.value === value()));
    // `.at()` is a call (not element access), so it sidesteps the dynamic-read warning; the guard
    // keeps a negative index from wrapping to the last element via `.at(-1)`.
    const activeOption = createMemo(() =>
      activeIndex() < 0 ? undefined : enriched().at(activeIndex()),
    );

    const displayLabel = createMemo(() => selectedOption()?.label ?? props.placeholder ?? "");
    const isPlaceholder = createMemo(() => !selectedOption());
    const activeDescendant = createMemo(() => (open() ? activeOption()?.id : undefined));

    const triggerClass = createMemo(
      () =>
        selectRecipe({
          color: props.color,
          variant: props.variant,
          size: props.size,
          invalid: props.invalid,
          disabled: props.disabled,
          readonly: props.readonly,
        }) + (open() ? " -open" : ""),
    );
    const panelClass = createMemo(() =>
      selectPanelRecipe({ color: props.color, size: props.size }),
    );
    const optionClass = createMemo(() =>
      selectOptionRecipe({ color: props.color, size: props.size }),
    );
    const arrowClass = createMemo(() => selectArrowRecipe({ size: props.size }));

    return (
      <ISelectBase id={props.id}>
        <ISelectTriggerBase
          class={triggerClass()}
          arrowClass={arrowClass()}
          label={props.label}
          controls={listboxId()}
          activeDescendant={activeDescendant()}
          expanded={open()}
          invalid={props.invalid}
          readonly={props.readonly}
          disabled={props.disabled}
          placeholder={isPlaceholder()}
          onToggle={() => {
            // Each signal is written exactly once with the guard folded into a ternary RHS: a bare
            // `cond && setX(v)` would be a valid call on React/Solid/Angular but lowers to a bare
            // assignment (`x = v`) on Vue/Svelte/Qwik, where `a && b && x = v` is a syntax error.
            // A single unconditional write per signal is also the only form React honours when the
            // same signal is touched by several branches (last-write-wins on captured state).
            // `setOpen` runs last so the reads above still observe the pre-toggle `open()` — seeding
            // the active row from the current selection when we are about to open.
            setActiveIndex(
              !props.disabled && !props.readonly && !open() ? selectedIndex() : activeIndex(),
            );
            setOpen(!props.disabled && !props.readonly ? !open() : open());
          }}
          onNavigate={(key: string) => {
            // Same single-write-per-signal rule as `onToggle`. `setOpen` is last so `setValue` and
            // `setActiveIndex` read the pre-navigation `open()`; the active-row math clamps with
            // ternaries (Angular templates cannot reference `Math`).
            setValue(
              open() &&
                (key === "Enter" || key === " ") &&
                activeOption() &&
                !activeOption()?.disabled
                ? (activeOption()?.value ?? "")
                : value(),
            );
            setActiveIndex(
              props.disabled || props.readonly
                ? activeIndex()
                : !open()
                  ? key === "ArrowDown" || key === "ArrowUp" || key === "Enter" || key === " "
                    ? selectedIndex()
                    : activeIndex()
                  : key === "ArrowDown"
                    ? activeIndex() + 1 > enriched().length - 1
                      ? enriched().length - 1
                      : activeIndex() + 1
                    : key === "ArrowUp"
                      ? activeIndex() - 1 < 0
                        ? 0
                        : activeIndex() - 1
                      : key === "Home"
                        ? 0
                        : key === "End"
                          ? enriched().length - 1
                          : activeIndex(),
            );
            setOpen(
              props.disabled || props.readonly
                ? open()
                : !open()
                  ? key === "ArrowDown" || key === "ArrowUp" || key === "Enter" || key === " "
                    ? true
                    : open()
                  : (key === "Enter" || key === " ") && activeOption() && !activeOption()?.disabled
                    ? false
                    : key === "Escape"
                      ? false
                      : open(),
            );
          }}
        >
          {displayLabel()}
        </ISelectTriggerBase>
        <Show when={open()}>
          <ISelectListboxBase class={panelClass()} id={listboxId()} label={props.label}>
            <For each={enriched()} key={(option) => option.value}>
              {(option) => (
                <ISelectOptionBase
                  class={optionClass()}
                  id={option.id}
                  selected={value() === option.value}
                  active={activeIndex() === option.index}
                  disabled={option.disabled}
                  onSelect={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
                  onActivate={() => setActiveIndex(option.index)}
                >
                  {option.label}
                </ISelectOptionBase>
              )}
            </For>
          </ISelectListboxBase>
        </Show>
      </ISelectBase>
    );
  },
);
