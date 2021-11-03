import IButtonGroup from '../index.vue';
import {
    IButtonGroupBasicExample,
    IButtonGroupBlockExample,
    IButtonGroupDisabledExample,
    IButtonGroupNestedExample,
    IButtonGroupNestedBlockExample,
    IButtonGroupSizeVariantsExample,
    IButtonGroupVerticalExample,
    IButtonGroupVerticalBlockExample,
    IButtonGroupVerticalSizeVariantsExample
} from './index';

export default {
    component: IButtonGroup,
    title: 'Components/ButtonGroup',
};

const Template = (args: any) => ({
    components: {
        IButtonGroupBasicExample
    },
    setup: () => ({ args }),
    template: '<IButtonGroupBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const Block = () => IButtonGroupBlockExample;
export const Disabled = () => IButtonGroupDisabledExample;
export const Nested = () => IButtonGroupNestedExample;
export const NestedBlock = () => IButtonGroupNestedBlockExample;
export const SizeVariants = () => IButtonGroupSizeVariantsExample;
export const Vertical = () => IButtonGroupVerticalExample;
export const VerticalBlock = () => IButtonGroupVerticalBlockExample;
export const VerticalSizeVariants = () => IButtonGroupVerticalSizeVariantsExample;
