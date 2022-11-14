import { ITextarea } from '../index';
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
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ITextarea,
    title: 'Forms/Textarea',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ITextareaBasicExample);
export const ColorVariants = () => ITextareaColorVariantsExample;
export const Clearable = () => ITextareaClearableExample;
export const Disabled = () => ITextareaDisabledExample;
export const Readonly = () => ITextareaReadonlyExample;
export const SizeVariants = () => ITextareaSizeVariantsExample;
export const PrependAppendText = () => ITextareaPrependAppendTextExample;
export const PrependAppendButton = () => ITextareaPrependAppendButtonExample;
export const PrependAppendDropdown = () => ITextareaPrependAppendDropdownExample;
export const PrefixSuffix = () => ITextareaPrefixSuffixExample;
