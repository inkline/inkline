import IButtonGroup from '../IButtonGroup.vue';
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
import { createStory, createExampleStory } from '@inkline/inkline/__storybook__';

export default {
    component: IButtonGroup,
    title: 'Components/ButtonGroup'
};

export const Basic = createStory(IButtonGroupBasicExample);
export const Block = createExampleStory(IButtonGroupBlockExample);
export const Disabled = createExampleStory(IButtonGroupDisabledExample);
export const Nested = createExampleStory(IButtonGroupNestedExample);
export const NestedBlock = createExampleStory(IButtonGroupNestedBlockExample);
export const SizeVariants = createExampleStory(IButtonGroupSizeVariantsExample);
export const Vertical = createExampleStory(IButtonGroupVerticalExample);
export const VerticalBlock = createExampleStory(IButtonGroupVerticalBlockExample);
export const VerticalSizeVariants = createExampleStory(IButtonGroupVerticalSizeVariantsExample);
