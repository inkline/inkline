import { defineComponent, Slot } from "@inkline/core";

export interface AvatarBadgeBaseProps {}

// The status-indicator dot overlaid on an avatar. Empty by default (a coloured dot); custom content
// can be projected via the default slot. The dot is purely visual, so the styled Avatar marks it
// `aria-hidden` — pair status with visible text, or project an accessible indicator here.
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (_props: AvatarBadgeBaseProps) => {
    return (
      <span class="avatar-badge">
        <Slot />
      </span>
    );
  },
);
