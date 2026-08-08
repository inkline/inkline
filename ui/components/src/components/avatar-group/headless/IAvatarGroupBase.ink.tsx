import { defineComponent, Slot } from "@inkline/core";

export interface AvatarGroupBaseProps {}

// A container that stacks its avatars with overlap. Avatars must be direct children so the theme's
// `.avatar-group > .avatar` overlap and ring rules apply.
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (_props: AvatarGroupBaseProps) => {
    return (
      <div class="avatar-group">
        <Slot />
      </div>
    );
  },
);
