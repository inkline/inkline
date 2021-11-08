import ITooltip from '../index.vue';
import {
    ITooltipBasicExample,
    ITooltipColorVariantsExample,
    ITooltipSizeVariantsExample,
    ITooltipFreeformExample,
    ITooltipPlacementExample,
    ITooltipTriggerExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ITooltip,
    title: 'Components/Tooltip',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: { ITooltipBasicExample },
    setup: () => ({ args }),
    template: '<ITooltipBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const ColorVariants = () => ITooltipColorVariantsExample;
export const SizeVariants = () => ITooltipSizeVariantsExample;
export const Freeform = () => ITooltipFreeformExample;
export const Placement = () => ITooltipPlacementExample;
export const Trigger = () => ITooltipTriggerExample;
