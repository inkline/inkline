import { defineComponent, defineModel, Show } from "@inkline/core";

export interface InputControlBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control. */
  name?: string;
  /** Input type; `"textarea"` renders a `<textarea>`. */
  type?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Marks the control as read-only. */
  readonly?: boolean;
}

export default defineComponent((props: InputControlBaseProps) => {
  // Two-way-bindable value: a `value` prop + an `update:value` event, so a parent can `$bind:value`.
  const [value, setValue] = defineModel<string>("value");

  return (
    <Show
      when={props.type === "textarea"}
      fallback={
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
      }
    >
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
    </Show>
  );
});
