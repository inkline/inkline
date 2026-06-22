import { defineComponent, Slot, Show, defineModel, createMemo, hasSlot } from "@inkline/core";
import IInputBase from "../headless/IInputBase.ink.tsx";
import IInputPrefixBase from "../headless/IInputPrefixBase.ink.tsx";
import IInputSuffixBase from "../headless/IInputSuffixBase.ink.tsx";
import IInputControlBase, {
  type InputControlBaseProps,
} from "../headless/IInputControlBase.ink.tsx";
import IInputTextareaBase from "../headless/IInputTextareaBase.ink.tsx";
import {
  inputRecipe,
  inputPrefixRecipe,
  inputSuffixRecipe,
  type InputRecipeProps as InputStylingProps,
} from "virtual:styleframe";

// Styling props are declared explicitly (rather than `extends InputStylingProps`) for two reasons:
// the compiler only enumerates members of directly-named interfaces, and the recipe's
// `disabled`/`readonly` (`"true" | "false" | boolean`) conflict with the control's `boolean`. So
// `disabled`/`readonly` come from the control (a `boolean` satisfies the recipe below), and the
// remaining styling props reference the recipe's types so they stay a single source of truth.
export interface InputProps extends InputControlBaseProps {
  /** Color variant. */
  color?: InputStylingProps["color"];
  /** Style variant. */
  variant?: InputStylingProps["variant"];
  /** Size variant. */
  size?: InputStylingProps["size"];
  /** Invalid-state styling. */
  invalid?: InputStylingProps["invalid"];
}

/**
 * The styled Input: a complete, batteries-included field that composes the shell, the native
 * control, and the optional inline `prefix`/`suffix` addons — styled together. Addon wrappers are
 * gated by `hasSlot` so they aren't emitted when unused (and collapse via CSS `:empty` on
 * Qwik/Angular, which lack runtime slot presence). The two-way `value` is forwarded to the control
 * via `$bind:value`. To attach controls outside the field, wrap them in `IFieldGroup`.
 */
export default defineComponent(
  { meta: { headless: true }, slots: { prefix: {}, suffix: {} } },
  (props: InputProps) => {
    const [value, _setValue] = defineModel<string>("value");

    const shellClassName = createMemo(() =>
      inputRecipe({
        color: props.color,
        variant: props.variant,
        size: props.size,
        invalid: props.invalid,
        disabled: props.disabled,
        readonly: props.readonly,
      }),
    );

    return (
      <IInputBase class={shellClassName()}>
        <Show when={hasSlot("prefix")}>
          <IInputPrefixBase class={inputPrefixRecipe({ size: props.size })}>
            <Slot name="prefix" />
          </IInputPrefixBase>
        </Show>
        <Show
          when={props.type === "textarea"}
          fallback={
            <IInputControlBase
              id={props.id}
              name={props.name}
              type={props.type}
              $bind:value={value}
              placeholder={props.placeholder}
              disabled={props.disabled}
              readonly={props.readonly}
            />
          }
        >
          <IInputTextareaBase
            id={props.id}
            name={props.name}
            $bind:value={value}
            placeholder={props.placeholder}
            disabled={props.disabled}
            readonly={props.readonly}
          />
        </Show>
        <Show when={hasSlot("suffix")}>
          <IInputSuffixBase class={inputSuffixRecipe({ size: props.size })}>
            <Slot name="suffix" />
          </IInputSuffixBase>
        </Show>
      </IInputBase>
    );
  },
);
