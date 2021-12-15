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
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IButtonGroup,
    title: 'Components/ButtonGroup'
};

export const Basic = createStory(IButtonGroupBasicExample);
export const Block = () => IButtonGroupBlockExample;
export const Disabled = () => IButtonGroupDisabledExample;
export const Nested = () => IButtonGroupNestedExample;
export const NestedBlock = () => IButtonGroupNestedBlockExample;
export const SizeVariants = () => IButtonGroupSizeVariantsExample;
export const Vertical = () => IButtonGroupVerticalExample;
export const VerticalBlock = () => IButtonGroupVerticalBlockExample;
export const VerticalSizeVariants = () => IButtonGroupVerticalSizeVariantsExample;
