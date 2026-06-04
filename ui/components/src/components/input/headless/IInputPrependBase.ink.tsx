import { defineComponent, Slot } from "@inkline/core";

export interface InputPrependBaseProps {}

export default defineComponent({ slots: { default: {} } }, (_props: InputPrependBaseProps) => {
  return (
    <div class="input-prepend">
      <Slot />
    </div>
  );
});
