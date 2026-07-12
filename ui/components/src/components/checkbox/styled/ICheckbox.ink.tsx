import { defineComponent, Slot, defineModel, createMemo } from "@inkline/core";
import ICheckboxBase from "../headless/ICheckboxBase.ink.tsx";
import ICheckboxControlBase, {
  type CheckboxControlBaseProps,
} from "../headless/ICheckboxControlBase.ink.tsx";
import {
  checkboxRecipe,
  checkboxFieldRecipe,
  type CheckboxFieldRecipeProps as CheckboxFieldStylingProps,
} from "virtual:styleframe";

// Styling props reference the recipe's own types so the axis values stay a single source of truth.
// `size` feeds both the wrapper (`checkbox`) and the box (`checkbox-field`) recipes — they share the
// same `sm | md | lg` set; `color` applies to the box only.
export interface CheckboxProps extends CheckboxControlBaseProps {
  /** Box color variant. */
  color?: CheckboxFieldStylingProps["color"];
  /** Size variant (applied to both the wrapper and the box). */
  size?: CheckboxFieldStylingProps["size"];
  /** Label text; overridden by the default slot. */
  label?: string;
}

/**
 * The styled Checkbox: a labelled boolean control that composes the `<label>` wrapper and the native
 * `<input type="checkbox">`, styled together. The wrapper recipe class lands on the `<label>` and the
 * field recipe class on the `<input>` (each via attribute fallthrough onto its single root). The
 * two-way `checked` is forwarded to the control via `$bind:checked`; `indeterminate` is forwarded as
 * a prop (the control applies it as a DOM property). The checked accent is the theme primary.
 */
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CheckboxProps) => {
    const [checked, _setChecked] = defineModel<boolean>("checked");

    const wrapperClassName = createMemo(() => checkboxRecipe({ size: props.size }));
    const fieldClassName = createMemo(() =>
      checkboxFieldRecipe({ color: props.color, size: props.size }),
    );

    return (
      <ICheckboxBase class={wrapperClassName()}>
        <ICheckboxControlBase
          class={fieldClassName()}
          id={props.id}
          name={props.name}
          disabled={props.disabled}
          required={props.required}
          indeterminate={props.indeterminate}
          $bind:checked={checked}
        />
        <Slot>{props.label}</Slot>
      </ICheckboxBase>
    );
  },
);
