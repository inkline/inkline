import { defineComponent, defineModel } from "@inkline/core";

// The type-only `models` key, agreeing with the setup body. It exists so a parent's checker sees
// `open` / `$bind:open` at JSX attribute position; the compiler never reads it, so the emitted
// output is identical with or without the key on every target.
export default defineComponent({ models: { open: Boolean } }, () => {
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
