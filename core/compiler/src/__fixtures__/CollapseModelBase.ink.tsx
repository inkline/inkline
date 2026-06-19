import { defineComponent, defineModel } from "@inkline/core";

// Headless base with a two-way `open` model and an event handler that writes it via the model's
// setter — the case where the collapse must map the child's setter onto the merged component's model.
export interface CollapseModelBaseProps {
  disabled?: boolean;
}

export default defineComponent({ meta: { headless: true } }, (props: CollapseModelBaseProps) => {
  const [open, setOpen] = defineModel<boolean>("open");
  return (
    <button
      class="cm"
      type="button"
      aria-expanded={open() ? "true" : "false"}
      disabled={props.disabled}
      onClick={() => setOpen(!open())}
    >
      <span class="cm-inner" aria-hidden="true" />
    </button>
  );
});
