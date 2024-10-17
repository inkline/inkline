import { Popover } from '@inkline/inkline/components/Popover/index';
import {
    PopoverBasicExample,
    PopoverColorVariantsExample,
    PopoverSizeVariantsExample,
    PopoverPlacementExample,
    PopoverTriggerExample
} from '@inkline/inkline/components/Popover/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Popover,
    title: 'Components/Popover',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(PopoverBasicExample);
export const ColorVariants = () => PopoverColorVariantsExample;
export const SizeVariants = () => PopoverSizeVariantsExample;
export const Placement = () => PopoverPlacementExample;
export const Trigger = () => PopoverTriggerExample;
