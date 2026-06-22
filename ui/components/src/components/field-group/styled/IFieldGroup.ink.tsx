import { defineComponent, Slot, createMemo } from "@inkline/core";
import IFieldGroupBase, { type FieldGroupBaseProps } from "../headless/IFieldGroupBase.ink.tsx";
import {
  fieldGroupRecipe,
  type FieldGroupRecipeProps as FieldGroupStylingProps,
} from "virtual:styleframe";

export interface FieldGroupProps extends FieldGroupBaseProps, FieldGroupStylingProps {}

/**
 * The styled FieldGroup: joins bordered controls (input, button, select, badge) placed as its
 * direct children into one unit, merging their border radii and collapsing the inner seams. This is
 * the supported way to attach controls outside an input (the role the removed Input
 * `prepend`/`append` addons used to serve). `orientation` and `block` map to the recipe's styling
 * axes.
 */
export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: FieldGroupProps) => {
    const className = createMemo(() =>
      fieldGroupRecipe({ orientation: props.orientation, block: props.block }),
    );

    return (
      <IFieldGroupBase id={props.id} class={className()}>
        <Slot />
      </IFieldGroupBase>
    );
  },
);
