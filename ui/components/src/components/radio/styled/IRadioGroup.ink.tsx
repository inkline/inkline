import { defineComponent, For, defineModel, createMemo } from "@inkline/core";
import IRadioGroupBase, { type RadioGroupBaseProps } from "../headless/IRadioGroupBase.ink.tsx";
import IRadioBase from "../headless/IRadioBase.ink.tsx";
import IRadioFieldBase from "../headless/IRadioFieldBase.ink.tsx";
import {
  radioGroupRecipe,
  radioRecipe,
  radioFieldRecipe,
  type RadioGroupRecipeProps as RadioGroupStylingProps,
  type RadioFieldRecipeProps as RadioFieldStylingProps,
} from "virtual:styleframe";

/** A single choice in a radio group. */
export interface RadioOption {
  /** The value submitted when this option is selected. */
  value: string;
  /** Visible label; falls back to the value. */
  label?: string;
  /** Disables just this option. */
  disabled?: boolean;
}

// Styling props are declared explicitly (rather than `extends`ing the recipe-props interfaces)
// because the compiler only enumerates members of directly-named interfaces. `size` is shared by all
// three recipes; `color` is the radio-field axis; `orientation` is the radio-group axis. Each
// references the recipe's own type so they stay a single source of truth.
export interface RadioGroupProps extends RadioGroupBaseProps {
  /** The options rendered as radios. */
  options?: RadioOption[];
  /** Shared control name — enables native mutual exclusivity within the group. */
  name?: string;
  /** Color variant, applied to each radio's control. */
  color?: RadioFieldStylingProps["color"];
  /** Size variant. */
  size?: RadioGroupStylingProps["size"];
  /** Layout orientation. */
  orientation?: RadioGroupStylingProps["orientation"];
  /** Disables every option in the group. */
  disabled?: boolean;
}

/**
 * The styled RadioGroup: a complete single-select control. It renders one radio per `options` entry,
 * owns the two-way `value`, and derives each radio's `checked` from it — so exactly one option is
 * selected at a time (reinforced by the shared native `name`). `color`, `size`, and `orientation`
 * map to the styleframe recipe axes. Two-way `value` uses the binding idiom (`$bind:value`); on the
 * static Astro target it lowers to one-way (INK0045).
 */
export default defineComponent({ meta: { headless: true } }, (props: RadioGroupProps) => {
  const [value, setValue] = defineModel<string>("value");

  const items = createMemo(() => props.options ?? []);
  const groupClassName = createMemo(() =>
    radioGroupRecipe({ orientation: props.orientation, size: props.size }),
  );
  const radioClassName = createMemo(() => radioRecipe({ size: props.size }));
  const fieldClassName = createMemo(() =>
    radioFieldRecipe({ color: props.color, size: props.size }),
  );

  return (
    <IRadioGroupBase id={props.id} label={props.label} class={groupClassName()}>
      <For each={items()} key={(option) => option.value}>
        {(option) => (
          <IRadioBase class={radioClassName()}>
            <IRadioFieldBase
              class={fieldClassName()}
              name={props.name}
              value={option.value}
              checked={value() === option.value}
              disabled={props.disabled || option.disabled}
              onChange={() => setValue(option.value)}
            />
            <span class="radio-label">{option.label ?? option.value}</span>
          </IRadioBase>
        )}
      </For>
    </IRadioGroupBase>
  );
});
