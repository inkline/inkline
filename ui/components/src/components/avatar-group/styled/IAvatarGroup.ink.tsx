import { defineComponent, Slot, createMemo } from "@inkline/core";
import IAvatarGroupBase, { type AvatarGroupBaseProps } from "../headless/IAvatarGroupBase.ink.tsx";
import {
  avatarGroupRecipe,
  type AvatarGroupRecipeProps as AvatarGroupStylingProps,
} from "virtual:styleframe";

// `size` is declared directly (indexed off the recipe's type) rather than via `extends
// AvatarGroupStylingProps`: the compiler only enumerates members of a directly-named interface, so a
// single inherited styling prop would otherwise not be tracked (its memo would report INK0011).
export interface AvatarGroupProps extends AvatarGroupBaseProps {
  /** Overlap spacing between avatars; does not cascade to the children — set each avatar's own size. */
  size?: AvatarGroupStylingProps["size"];
}

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
