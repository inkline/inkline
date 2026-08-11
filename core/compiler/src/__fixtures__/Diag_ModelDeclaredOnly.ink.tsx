import { defineComponent, defineModel } from "@inkline/core";

// `expanded` is declared in the type-only `models` map but no defineModel call creates it: a parent
// would see `$bind:expanded` at JSX attribute position and bind to a prop no target emits — INK0094.
export default defineComponent({ models: { open: Boolean, expanded: Boolean } }, () => {
  const [open, setOpen] = defineModel<boolean>("open");
  return (
    <button
      type="button"
      aria-expanded={open() ? "true" : "false"}
      onClick={() => setOpen(!open())}
    >
      Toggle
    </button>
  );
});
