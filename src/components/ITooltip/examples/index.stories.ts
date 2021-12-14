import ITooltip from '../index.vue';
import ITooltipBasicExample from './basic.vue';
import ITooltipColorVariantsExample from './color-variants.vue';
import ITooltipSizeVariantsExample from './size-variants.vue';
import ITooltipFreeformExample from './freeform.vue';
import ITooltipPlacementExample from './placement.vue';
import ITooltipTriggerExample from './trigger.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ITooltip,
    title: 'Components/Tooltip',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ITooltipBasicExample);
export const ColorVariants = () => ITooltipColorVariantsExample;
export const SizeVariants = () => ITooltipSizeVariantsExample;
export const Freeform = () => ITooltipFreeformExample;
export const Placement = () => ITooltipPlacementExample;
export const Trigger = () => ITooltipTriggerExample;
