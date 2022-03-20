import { IButtonGroup } from '@inkline/inkline/components';
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
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IButtonGroup,
    title: 'Components/ButtonGroup'
};

export const Basic = createStory(IButtonGroupBasicExample);
export const Block = createStory(IButtonGroupBlockExample);
export const Disabled = createStory(IButtonGroupDisabledExample);
export const Nested = createStory(IButtonGroupNestedExample);
export const NestedBlock = createStory(IButtonGroupNestedBlockExample);
export const SizeVariants = createStory(IButtonGroupSizeVariantsExample);
export const Vertical = createStory(IButtonGroupVerticalExample);
export const VerticalBlock = createStory(IButtonGroupVerticalBlockExample);
export const VerticalSizeVariants = createStory(IButtonGroupVerticalSizeVariantsExample);
