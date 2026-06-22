import { defineComponent, defineModel } from "@inkline/core";

export interface InputControlBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control. */
  name?: string;
  /** Input type (e.g. `"text"`, `"email"`). Use `IInputTextareaBase` for a `<textarea>`. */
  type?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Marks the control as read-only. */
  readonly?: boolean;
}

// The native `<input>` control: a single static root, so it host-extracts to
// `input[ink-input-control-base]`. The `<textarea>` variant is a sibling component
// (`IInputTextareaBase`); the styled Input picks between them by `type`.
export default defineComponent({ meta: { headless: true } }, (props: InputControlBaseProps) => {
  // Two-way-bindable value: a `value` prop + an `update:value` event, so a parent can `$bind:value`.
  const [value, setValue] = defineModel<string>("value");

  return (
    <input
      class="input-field"
      id={props.id}
      name={props.name}
      type={props.type}
      value={value() ?? ""}
      placeholder={props.placeholder}
      disabled={props.disabled}
      readonly={props.readonly}
      onInput={(e: { currentTarget: HTMLInputElement }) => setValue(e.currentTarget.value)}
    />
  );
});
