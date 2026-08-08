import { defineComponent, Slot, Show } from "@inkline/core";

export interface AvatarBaseProps {
  /** Image URL. When absent, the `label` / default-slot fallback shows instead. */
  src?: string;
  /**
   * Alternative text for the image. Empty by default (decorative — the common case when a visible
   * username sits beside the avatar); set it when the avatar is the only representation of the user.
   */
  alt?: string;
  /** Fallback text, typically initials, shown when there is no image. Overridden by the default slot. */
  label?: string;
  /** Renders the `badge` slot as a status overlay. */
  showBadge?: boolean;
}

export default defineComponent(
  {
    meta: { headless: true },
    slots: { default: {}, badge: {} },
  },
  (props: AvatarBaseProps) => {
    return (
      <div class="avatar">
        <Show when={!!props.src} fallback={<Slot>{props.label}</Slot>}>
          {/* `src` is guarded truthy by the Show; `alt` is independent, so coalesce it for Solid. */}
          <img src={props.src} alt={props.alt ?? ""} />
        </Show>
        <Show when={!!props.showBadge}>
          <Slot name="badge" />
        </Show>
      </div>
    );
  },
);
