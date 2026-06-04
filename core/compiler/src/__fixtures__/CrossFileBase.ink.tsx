import { defineComponent, Slot } from "@inkline/core";

export interface CrossFileBaseProps {
  label?: string;
}

export default defineComponent({ slots: { default: {} } }, (props: CrossFileBaseProps) => {
  return (
    <div class="base">
      <Slot>{props.label}</Slot>
    </div>
  );
});
