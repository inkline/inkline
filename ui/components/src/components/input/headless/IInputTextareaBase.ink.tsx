import { defineComponent, defineModel } from "@inkline/core";

export interface InputTextareaBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control. */
  name?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Marks the control as read-only. */
  readonly?: boolean;
}

// The native `<textarea>` control: a single static root, so it host-extracts to
// `textarea[ink-input-textarea-base]`. The styled Input renders this instead of IInputControlBase
// when `type === "textarea"`.
export default defineComponent({ meta: { headless: true } }, (props: InputTextareaBaseProps) => {
  // Two-way-bindable value: a `value` prop + an `update:value` event, so a parent can `$bind:value`.
  const [value, setValue] = defineModel<string>("value");

  return (
    <textarea
      class="input-field"
      id={props.id}
      name={props.name}
      value={value() ?? ""}
      placeholder={props.placeholder}
      disabled={props.disabled}
      readonly={props.readonly}
      onInput={(e: { currentTarget: HTMLTextAreaElement }) => setValue(e.currentTarget.value)}
    />
  );
});
