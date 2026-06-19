import { defineComponent, defineModel } from "@inkline/core";

export interface HamburgerMenuBaseProps {
  /** Accessible name for the icon-only toggle; sets `aria-label`. */
  ariaLabel?: string;
  /** Id of the region the toggle shows/hides; sets `aria-controls`. */
  ariaControls?: string;
  /** Disables the toggle. */
  disabled?: boolean;
}

export default defineComponent({ meta: { headless: true } }, (props: HamburgerMenuBaseProps) => {
  // Two-way disclosure state: an `open` prop + paired `update:open` event, so a parent can `$bind:open`.
  const [open, setOpen] = defineModel<boolean>("open");

  return (
    <button
      class="hamburger-menu"
      type="button"
      aria-expanded={open() ? "true" : "false"}
      aria-controls={props.ariaControls ?? ""}
      aria-label={props.ariaLabel ?? "Toggle menu"}
      disabled={props.disabled}
      onClick={() => setOpen(!open())}
    >
      <span class="hamburger-menu-inner" aria-hidden="true" />
    </button>
  );
});
