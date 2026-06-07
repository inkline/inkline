import { defineComponent, Slot } from "@inkline/core";

export interface InputAppendBaseProps {}

export default defineComponent({ slots: { default: {} } }, (_props: InputAppendBaseProps) => {
  return (
    <div class="input-append">
      <Slot />
    </div>
  );
});
