import IPopover from '../index.vue';
import {
    IPopoverBasicExample,
    IPopoverColorVariantsExample,
    IPopoverSizeVariantsExample,
    IPopoverPlacementExample,
    IPopoverTriggerExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IPopover,
    title: 'Components/Popover',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IPopoverBasicExample
    },
    setup: () => ({ args }),
    template: '<IPopoverBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const ColorVariants = () => IPopoverColorVariantsExample;
export const SizeVariants = () => IPopoverSizeVariantsExample;
export const Placement = () => IPopoverPlacementExample;
export const Trigger = () => IPopoverTriggerExample;
