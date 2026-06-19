import { defineComponent, defineModel, createMemo } from "@inkline/core";
import IHamburgerMenuBase, {
  type HamburgerMenuBaseProps,
} from "../headless/IHamburgerMenuBase.ink.tsx";
import {
  hamburgerMenuRecipe,
  type HamburgerMenuRecipeProps as HamburgerMenuStylingProps,
} from "virtual:styleframe";

// `active` is intentionally omitted from the public props: it's derived from `open()` below, never
// set by the consumer. The remaining axes reference the recipe's types so they stay a single source
// of truth (and the compiler only enumerates members of this directly-named interface).
export interface HamburgerMenuProps extends HamburgerMenuBaseProps {
  /** Color variant. */
  color?: HamburgerMenuStylingProps["color"];
  /** Size variant. */
  size?: HamburgerMenuStylingProps["size"];
  /** Shape the bars morph into while open. */
  animation?: HamburgerMenuStylingProps["animation"];
}

export default defineComponent({ meta: { headless: true } }, (props: HamburgerMenuProps) => {
  const [open, _setOpen] = defineModel<boolean>("open");

  const className = createMemo(() =>
    hamburgerMenuRecipe({
      color: props.color,
      size: props.size,
      animation: props.animation,
      active: open() ? "true" : "false",
    }),
  );

  return (
    <IHamburgerMenuBase
      class={className()}
      $bind:open={open}
      ariaLabel={props.ariaLabel}
      ariaControls={props.ariaControls}
      disabled={props.disabled}
    />
  );
});
