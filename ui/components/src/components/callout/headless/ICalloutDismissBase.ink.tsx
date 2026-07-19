import { defineComponent, Slot } from "@inkline/core";

export interface CalloutDismissBaseProps {
  /** Accessible name for the icon-only dismiss button; sets `aria-label`. */
  ariaLabel?: string;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CalloutDismissBaseProps) => {
    return (
      <button class="callout-dismiss" type="button" aria-label={props.ariaLabel ?? "Dismiss"}>
        <Slot />
      </button>
    );
  },
);
