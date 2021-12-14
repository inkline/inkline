import IPopover from '../index.vue';
import IPopoverBasicExample from './basic.vue';
import IPopoverColorVariantsExample from './color-variants.vue';
import IPopoverSizeVariantsExample from './size-variants.vue';
import IPopoverPlacementExample from './placement.vue';
import IPopoverTriggerExample from './trigger.vue';
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
