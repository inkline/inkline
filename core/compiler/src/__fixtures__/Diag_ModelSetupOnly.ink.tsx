import { defineComponent, defineModel } from "@inkline/core";

// The setup body creates a second model, `size`, that the `models` map does not declare: the compiler
// emits the prop and its update event, but a parent's checker never learns about it — INK0094.
export default defineComponent({ models: { open: Boolean } }, () => {
  const [open, setOpen] = defineModel<boolean>("open");
  const [size, setSize] = defineModel<string>("size");
  return (
    <button
      type="button"
      data-size={size()}
      aria-expanded={open() ? "true" : "false"}
      onClick={() => {
        setOpen(!open());
        setSize("lg");
      }}
    >
      Toggle
    </button>
  );
});
