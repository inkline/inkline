import { defineComponent, defineProps } from "@inkline/core";
import { type PropsMacroBaseProps } from "./PropsMacroBase.ink.tsx";

// The type argument names a type declared in another module. The macro reads it through the same
// checker call the setup parameter's annotation uses, so an imported interface resolves to the same
// props an in-file one would.
export default defineComponent(() => {
  const props = defineProps<PropsMacroBaseProps>();
  return <div class={props.size}>{props.label}</div>;
});
