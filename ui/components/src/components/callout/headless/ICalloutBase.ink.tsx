import { defineComponent, Slot } from "@inkline/core";

export interface CalloutBaseProps {
  /** ARIA role of the container; override with `"alert"`/`"status"` for dynamically-inserted messages. */
  role?: string;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: CalloutBaseProps) => {
    return (
      <div class="callout" role={props.role ?? "note"}>
        <Slot />
      </div>
    );
  },
);
