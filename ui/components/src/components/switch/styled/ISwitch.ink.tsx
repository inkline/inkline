import { defineComponent, Slot, defineModel, createMemo } from "@inkline/core";
import ISwitchBase from "../headless/ISwitchBase.ink.tsx";
import ISwitchControlBase, {
  type SwitchControlBaseProps,
} from "../headless/ISwitchControlBase.ink.tsx";
import ISwitchLabelBase from "../headless/ISwitchLabelBase.ink.tsx";
import {
  switchRecipe,
  switchFieldRecipe,
  type SwitchFieldRecipeProps as SwitchFieldStylingProps,
} from "virtual:styleframe";

// The axes reference the recipe's own prop types so they stay a single source of truth (and the
// compiler only enumerates members of this directly-named interface). `color`/`size` come from the
// visual `switch-field` recipe; the shell `switch` recipe shares the same `size` scale.
export interface SwitchProps extends SwitchControlBaseProps {
  /** Off-state track colour. */
  color?: SwitchFieldStylingProps["color"];
  /** Size variant. */
  size?: SwitchFieldStylingProps["size"];
  /** Label text; overridden by the default slot. */
  label?: string;
}

/**
 * The styled Switch: an accessible on/off toggle that composes the shell `<label>`, the native
 * `<input type="checkbox" role="switch">` control, and its text label — styled together with the
 * Styleframe `switch` / `switch-field` recipes. The two-way `checked` model is forwarded to the
 * control via `$bind:checked`; the label text (default slot or `label` prop) supplies the accessible
 * name. Space toggles natively and Enter is handled explicitly.
 */
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: SwitchProps) => {
    const [checked, _setChecked] = defineModel<boolean>("checked");

    const shellClassName = createMemo(() => switchRecipe({ size: props.size }));
    const fieldClassName = createMemo(() =>
      switchFieldRecipe({ color: props.color, size: props.size }),
    );

    return (
      <ISwitchBase class={shellClassName()}>
        <ISwitchControlBase
          class={fieldClassName()}
          id={props.id}
          name={props.name}
          $bind:checked={checked}
          disabled={props.disabled}
        />
        <ISwitchLabelBase>
          <Slot>{props.label}</Slot>
        </ISwitchLabelBase>
      </ISwitchBase>
    );
  },
);
