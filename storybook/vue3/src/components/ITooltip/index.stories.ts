import { ITooltip } from '@inkline/inkline/components';
import {
    ITooltipBasicExample,
    ITooltipColorVariantsExample,
    ITooltipSizeVariantsExample,
    ITooltipFreeformExample,
    ITooltipPlacementExample,
    ITooltipTriggerExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: ITooltip,
    title: 'Components/Tooltip',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ITooltipBasicExample);
export const ColorVariants = createStory(ITooltipColorVariantsExample);
export const SizeVariants = createStory(ITooltipSizeVariantsExample);
export const Freeform = createStory(ITooltipFreeformExample);
export const Placement = createStory(ITooltipPlacementExample);
export const Trigger = createStory(ITooltipTriggerExample);
