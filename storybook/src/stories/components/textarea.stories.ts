import './textarea.preview.css';
import { Textarea } from '@inkline/component-textarea';
import {
    TextareaBasicExample,
    TextareaColorVariantsExample,
    TextareaClearableExample,
    TextareaDisabledExample,
    TextareaReadonlyExample,
    TextareaSizeVariantsExample,
    TextareaPrependAppendTextExample,
    TextareaPrependAppendButtonExample,
    TextareaPrependAppendDropdownExample,
    TextareaPrefixSuffixExample
} from '@inkline/component-textarea/examples';
import { markRaw } from 'vue';
import { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Textarea> = {
    component: markRaw(Textarea),
    title: 'Forms/Textarea'
};

export default meta;

export const Basic: StoryFn = () => TextareaBasicExample;
export const ColorVariants: StoryFn = () => TextareaColorVariantsExample;
export const Clearable: StoryFn = () => TextareaClearableExample;
export const Disabled: StoryFn = () => TextareaDisabledExample;
export const Readonly: StoryFn = () => TextareaReadonlyExample;
export const SizeVariants: StoryFn = () => TextareaSizeVariantsExample;
export const PrependAppendText: StoryFn = () => TextareaPrependAppendTextExample;
export const PrependAppendButton: StoryFn = () => TextareaPrependAppendButtonExample;
export const PrependAppendDropdown: StoryFn = () => TextareaPrependAppendDropdownExample;
export const PrefixSuffix: StoryFn = () => TextareaPrefixSuffixExample;
