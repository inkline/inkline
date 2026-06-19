import { defineComponent, Slot, Show } from "@inkline/core";

// A headless (behavior-only) button with a single static `<button>` root: exercises the Angular
// host-extraction across every host-binding shape — a static class merged with the forwarded
// `klass`, a static attribute (`type`), a KEEP_PROPERTY dynamic (`disabled`), an attribute-form
// dynamic (`aria-label`), a root event, plus `@if` + slot children projected into the host template.
export interface HeadlessButtonProps {
  label?: string;
  disabled?: boolean;
  loading: boolean;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: HeadlessButtonProps) => {
    return (
      <button
        class="hb"
        type="button"
        disabled={props.disabled}
        aria-label={props.label}
        onClick={(e: { preventDefault: () => void }) => e.preventDefault()}
      >
        <Show when={props.loading}>
          <span class="hb-spinner" aria-hidden="true" />
        </Show>
        <Slot>{props.label}</Slot>
      </button>
    );
  },
);
