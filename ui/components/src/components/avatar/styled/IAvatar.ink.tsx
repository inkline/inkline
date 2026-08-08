import { defineComponent, Slot, createMemo } from "@inkline/core";
import IAvatarBase, { type AvatarBaseProps } from "../headless/IAvatarBase.ink.tsx";
import IAvatarBadgeBase from "../headless/IAvatarBadgeBase.ink.tsx";
import {
  avatarRecipe,
  avatarBadgeRecipe,
  type AvatarRecipeProps as AvatarStylingProps,
  type AvatarBadgeRecipeProps as AvatarBadgeStylingProps,
} from "virtual:styleframe";

export interface AvatarProps extends AvatarBaseProps {
  /** Color variant. */
  color?: AvatarStylingProps["color"];
  /** Style variant. */
  variant?: AvatarStylingProps["variant"];
  /** Shape variant. */
  shape?: AvatarStylingProps["shape"];
  /** Size variant; also sizes the status badge. */
  size?: AvatarStylingProps["size"];
  /** Shows a status-indicator dot overlaid on the avatar. */
  badge?: boolean;
  /** Color of the status badge. */
  badgeColor?: AvatarBadgeStylingProps["color"];
  /** Corner the status badge sits in. */
  badgePosition?: AvatarBadgeStylingProps["position"];
}

/**
 * The styled Avatar: an image with an automatic text (initials) fallback and an optional status-dot
 * overlay. The badge is gated by the `badge` prop (a real conditional on every target — no runtime
 * slot presence needed), so an avatar without a badge renders no overlay element at all.
 */
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: AvatarProps) => {
    const className = createMemo(() =>
      avatarRecipe({
        color: props.color,
        variant: props.variant,
        shape: props.shape,
        size: props.size,
      }),
    );

    const badgeClassName = createMemo(() =>
      avatarBadgeRecipe({
        color: props.badgeColor,
        position: props.badgePosition,
        size: props.size,
      }),
    );

    // The badge is a plain node-prop fill (never a conditional in attribute position — that miscompiles
    // on React/Qwik); IAvatarBase gates whether it renders via `showBadge`, in child position.
    return (
      <IAvatarBase
        class={className()}
        src={props.src}
        alt={props.alt}
        showBadge={props.badge}
        badge={<IAvatarBadgeBase class={badgeClassName()} aria-hidden="true" />}
      >
        <Slot>{props.label}</Slot>
      </IAvatarBase>
    );
  },
);
