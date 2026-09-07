import { defineComponent, defineProps, defineSlot, Slot } from "@inkline/core";

export interface BadgeBaseProps {
  label?: string;
}

export default defineComponent(
  {
    meta: { headless: true },
  },
  () => {
    const props = defineProps<BadgeBaseProps>();
    defineSlot();

    return (
      <div class="badge">
        <Slot>{props.label}</Slot>
      </div>
    );
  },
);
