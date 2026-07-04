import { defineComponent, Slot, createMemo } from "@inkline/core";
import IAvatarGroupBase, { type AvatarGroupBaseProps } from "../headless/IAvatarGroupBase.ink.tsx";
import {
  avatarGroupRecipe,
  type AvatarGroupRecipeProps as AvatarGroupStylingProps,
} from "virtual:styleframe";

export interface AvatarGroupProps extends AvatarGroupBaseProps, AvatarGroupStylingProps {}

/**
 * The styled Avatar group: lays out its child avatars in an overlapping stack. `size` tunes the
 * overlap spacing only — it does not cascade to the child avatars, so set each avatar's own `size`
 * to match.
 */
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: AvatarGroupProps) => {
    const className = createMemo(() => avatarGroupRecipe({ size: props.size }));
    return (
      <IAvatarGroupBase class={className()}>
        <Slot />
      </IAvatarGroupBase>
    );
  },
);
