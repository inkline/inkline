import { defineComponent, Slot } from "@inkline/core";

export interface CalloutBaseProps {
  /** ARIA role of the container; override with `"alert"`/`"status"` for dynamically-inserted messages. */
  role?: string;
  /** Hides the container (kept mounted) — mirrors the native `hidden` attribute. */
  hidden?: boolean;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CalloutBaseProps) => {
    return (
      <div class="callout" role={props.role ?? "note"} hidden={props.hidden}>
        <Slot />
      </div>
    );
  },
);
