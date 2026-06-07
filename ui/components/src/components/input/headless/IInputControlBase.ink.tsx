import { defineComponent, Show } from "@inkline/core";

export interface InputControlBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control. */
  name?: string;
  /** Input type; `"textarea"` renders a `<textarea>`. */
  type?: string;
  /** Controlled value. */
  value?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Marks the control as read-only. */
  readonly?: boolean;
}

export default defineComponent((props: InputControlBaseProps) => {
  return (
    <Show
      when={props.type === "textarea"}
      fallback={
        <input
          class="input-field"
          id={props.id}
          name={props.name}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readonly={props.readonly}
        />
      }
    >
      <textarea
        class="input-field"
        id={props.id}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readonly={props.readonly}
      />
    </Show>
  );
});
