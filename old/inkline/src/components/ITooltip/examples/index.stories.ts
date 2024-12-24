import { ITooltip } from '@inkline/inkline/components/ITooltip/index';
import {
    ITooltipBasicExample,
    ITooltipColorVariantsExample,
    ITooltipSizeVariantsExample,
    ITooltipFreeformExample,
    ITooltipPlacementExample,
    ITooltipTriggerExample
} from '@inkline/inkline/components/ITooltip/examples/index';
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
