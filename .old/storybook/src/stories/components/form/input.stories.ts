import './input.preview.css';
import { Input } from '@inkline/component-input';
import {
    InputBasicExample,
    InputColorVariantsExample,
    InputClearableExample,
    InputDisabledExample,
    InputReadonlyExample,
    InputSizeVariantsExample,
    InputPrependAppendTextExample,
    InputPrependAppendButtonExample,
    InputPrependAppendDropdownExample,
    InputPrefixSuffixExample,
    InputTypeExample
} from '@inkline/component-input/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Input> = {
    component: markRaw(Input),
    title: 'Forms/Input'
};

export default meta;

export const Basic: StoryFn = () => InputBasicExample;
export const ColorVariants: StoryFn = () => InputColorVariantsExample;
export const Clearable: StoryFn = () => InputClearableExample;
export const Disabled: StoryFn = () => InputDisabledExample;
export const Readonly: StoryFn = () => InputReadonlyExample;
export const SizeVariants: StoryFn = () => InputSizeVariantsExample;
export const PrependAppendText: StoryFn = () => InputPrependAppendTextExample;
export const PrependAppendButton: StoryFn = () => InputPrependAppendButtonExample;
export const PrependAppendDropdown: StoryFn = () => InputPrependAppendDropdownExample;
export const PrefixSuffix: StoryFn = () => InputPrefixSuffixExample;
export const Type: StoryFn = () => InputTypeExample;
