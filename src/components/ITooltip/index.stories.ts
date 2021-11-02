import ITooltip from './index.vue';
import {
    ITooltipBasicExample,
    ITooltipColorVariantsExample,
    ITooltipSizeVariantsExample,
    ITooltipFreeformExample,
    ITooltipPlacementExample,
    ITooltipTriggerExample
} from './examples';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: ITooltip,
    title: 'Components/Tooltip',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-tooltip v-bind="args">
        Tooltip
    </i-tooltip>`,
});

export const Component = Template.bind({});

export const Basic = () => ITooltipBasicExample;
export const ColorVariants = () => ITooltipColorVariantsExample;
export const SizeVariants = () => ITooltipSizeVariantsExample;
export const Freeform = () => ITooltipFreeformExample;
export const Placement = () => ITooltipPlacementExample;
export const Trigger = () => ITooltipTriggerExample;
            