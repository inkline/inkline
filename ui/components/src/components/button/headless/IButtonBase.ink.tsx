import { defineComponent, Slot, Show } from "@inkline/core";

export interface ButtonBaseProps {
  label?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
}

export default defineComponent(
  {
    slots: { default: {} },
  },
  (props: ButtonBaseProps) => {
    return (
      <button
        class="button"
        type={props.type ?? "button"}
        disabled={props.disabled || props.loading}
        aria-busy={props.loading ? "true" : "false"}
      >
        <Show when={!!props.loading}>
          <span class="button-spinner" aria-hidden="true" />
        </Show>
        <Slot>{props.label}</Slot>
      </button>
    );
  },
);
