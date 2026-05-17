import './button-group.preview.css';
import { ButtonGroup } from '@inkline/component-button-group';
import {
    ButtonGroupBasicExample,
    ButtonGroupBlockExample,
    ButtonGroupDisabledExample,
    ButtonGroupNestedExample,
    ButtonGroupNestedBlockExample,
    ButtonGroupColorVariantsExample,
    ButtonGroupSizeVariantsExample,
    ButtonGroupVerticalExample,
    ButtonGroupVerticalBlockExample,
    ButtonGroupVerticalSizeVariantsExample
} from '@inkline/component-button-group/examples';
import { markRaw } from 'vue';
import { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof ButtonGroup> = {
    component: markRaw(ButtonGroup),
    title: 'Basic Components/ButtonGroup'
};

export default meta;

export const Basic: StoryFn = () => ButtonGroupBasicExample;
export const Block: StoryFn = () => ButtonGroupBlockExample;
export const Disabled: StoryFn = () => ButtonGroupDisabledExample;
export const Nested: StoryFn = () => ButtonGroupNestedExample;
export const NestedBlock: StoryFn = () => ButtonGroupNestedBlockExample;
export const ColorVariants: StoryFn = () => ButtonGroupColorVariantsExample;
export const SizeVariants: StoryFn = () => ButtonGroupSizeVariantsExample;
export const Vertical: StoryFn = () => ButtonGroupVerticalExample;
export const VerticalBlock: StoryFn = () => ButtonGroupVerticalBlockExample;
export const VerticalSizeVariants: StoryFn = () => ButtonGroupVerticalSizeVariantsExample;
