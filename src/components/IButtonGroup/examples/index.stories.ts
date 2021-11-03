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
    setup: () => ({ args }),
    template: `<i-button-group v-bind="args">
        <i-button>Left</i-button>
        <i-button>Middle</i-button>
        <i-button>Right</i-button>
    </i-button-group>`,
});

export const Component = Template.bind({});

export const Basic = () => IButtonGroupBasicExample;
export const Block = () => IButtonGroupBlockExample;
export const Disabled = () => IButtonGroupDisabledExample;
export const Nested = () => IButtonGroupNestedExample;
export const NestedBlock = () => IButtonGroupNestedBlockExample;
export const SizeVariants = () => IButtonGroupSizeVariantsExample;
export const Vertical = () => IButtonGroupVerticalExample;
export const VerticalBlock = () => IButtonGroupVerticalBlockExample;
export const VerticalSizeVariants = () => IButtonGroupVerticalSizeVariantsExample;
