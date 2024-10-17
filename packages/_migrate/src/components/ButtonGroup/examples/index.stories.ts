import ButtonGroup from '@inkline/inkline/components/ButtonGroup/ButtonGroup.vue';
import {
    ButtonGroupBasicExample,
    ButtonGroupBlockExample,
    ButtonGroupDisabledExample,
    ButtonGroupNestedExample,
    ButtonGroupNestedBlockExample,
    ButtonGroupSizeVariantsExample,
    ButtonGroupVerticalExample,
    ButtonGroupVerticalBlockExample,
    ButtonGroupVerticalSizeVariantsExample
} from '@inkline/inkline/components/ButtonGroup/examples/index';
import { createStory, createExampleStory } from '@inkline/inkline/__storybook__';

export default {
    component: ButtonGroup,
    title: 'Components/ButtonGroup'
};

export const Basic = createStory(ButtonGroupBasicExample);
export const Block = createExampleStory(ButtonGroupBlockExample);
export const Disabled = createExampleStory(ButtonGroupDisabledExample);
export const Nested = createExampleStory(ButtonGroupNestedExample);
export const NestedBlock = createExampleStory(ButtonGroupNestedBlockExample);
export const SizeVariants = createExampleStory(ButtonGroupSizeVariantsExample);
export const Vertical = createExampleStory(ButtonGroupVerticalExample);
export const VerticalBlock = createExampleStory(ButtonGroupVerticalBlockExample);
export const VerticalSizeVariants = createExampleStory(ButtonGroupVerticalSizeVariantsExample);
