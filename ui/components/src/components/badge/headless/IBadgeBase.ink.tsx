import { defineComponent, defineProps, Slot } from "@inkline/core";

export interface BadgeBaseProps {
  label?: string;
}

export default defineComponent(
  {
    meta: { headless: true },
    slots: { default: {} },
  },
  () => {
    const props = defineProps<BadgeBaseProps>();

    return (
      <div class="badge">
        <Slot>{props.label}</Slot>
      </div>
    );
  },
);
