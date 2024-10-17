import { Tooltip } from '@inkline/inkline/components/Tooltip/index';
import {
    TooltipBasicExample,
    TooltipColorVariantsExample,
    TooltipSizeVariantsExample,
    TooltipFreeformExample,
    TooltipPlacementExample,
    TooltipTriggerExample
} from '@inkline/inkline/components/Tooltip/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Tooltip,
    title: 'Components/Tooltip',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(TooltipBasicExample);
export const ColorVariants = () => TooltipColorVariantsExample;
export const SizeVariants = () => TooltipSizeVariantsExample;
export const Freeform = () => TooltipFreeformExample;
export const Placement = () => TooltipPlacementExample;
export const Trigger = () => TooltipTriggerExample;
