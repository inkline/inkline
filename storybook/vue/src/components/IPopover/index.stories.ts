import { IPopover } from '@inkline/inkline/components';
import {
    IPopoverBasicExample,
    IPopoverColorVariantsExample,
    IPopoverSizeVariantsExample,
    IPopoverPlacementExample,
    IPopoverTriggerExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IPopover,
    title: 'Components/Popover',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IPopoverBasicExample);
export const ColorVariants = createStory(IPopoverColorVariantsExample);
export const SizeVariants = createStory(IPopoverSizeVariantsExample);
export const Placement = createStory(IPopoverPlacementExample);
export const Trigger = createStory(IPopoverTriggerExample);
