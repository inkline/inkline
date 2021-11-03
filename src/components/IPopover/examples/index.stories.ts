import IPopover from '../index.vue';
import {
    IPopoverBasicExample,
    IPopoverColorVariantsExample,
    IPopoverSizeVariantsExample,
    IPopoverPlacementExample,
    IPopoverTriggerExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IPopover,
    title: 'Components/Popover',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-popover v-bind="args">
        Popover
    </i-popover>`,
});

export const Component = Template.bind({});

export const Basic = () => IPopoverBasicExample;
export const ColorVariants = () => IPopoverColorVariantsExample;
export const SizeVariants = () => IPopoverSizeVariantsExample;
export const Placement = () => IPopoverPlacementExample;
export const Trigger = () => IPopoverTriggerExample;
            