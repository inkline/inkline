import { ITextarea } from '@inkline/inkline/components';
import {
    ITextareaBasicExample,
    ITextareaColorVariantsExample,
    ITextareaClearableExample,
    ITextareaDisabledExample,
    ITextareaReadonlyExample,
    ITextareaSizeVariantsExample,
    ITextareaPrependAppendTextExample,
    ITextareaPrependAppendButtonExample,
    ITextareaPrependAppendDropdownExample,
    ITextareaPrefixSuffixExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: ITextarea,
    title: 'Forms/Textarea',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ITextareaBasicExample);
export const ColorVariants = createStory(ITextareaColorVariantsExample);
export const Clearable = createStory(ITextareaClearableExample);
export const Disabled = createStory(ITextareaDisabledExample);
export const Readonly = createStory(ITextareaReadonlyExample);
export const SizeVariants = createStory(ITextareaSizeVariantsExample);
export const PrependAppendText = createStory(ITextareaPrependAppendTextExample);
export const PrependAppendButton = createStory(ITextareaPrependAppendButtonExample);
export const PrependAppendDropdown = createStory(ITextareaPrependAppendDropdownExample);
export const PrefixSuffix = createStory(ITextareaPrefixSuffixExample);
