import IPopover from '../index.vue';
import {
    IPopoverBasicExample,
    IPopoverColorVariantsExample,
    IPopoverSizeVariantsExample,
    IPopoverPlacementExample,
    IPopoverTriggerExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IPopover,
    title: 'Components/Popover',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IPopoverBasicExample);
export const ColorVariants = () => IPopoverColorVariantsExample;
export const SizeVariants = () => IPopoverSizeVariantsExample;
export const Placement = () => IPopoverPlacementExample;
export const Trigger = () => IPopoverTriggerExample;
