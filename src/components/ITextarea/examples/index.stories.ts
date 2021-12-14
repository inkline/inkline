import ITextarea from '../index.vue';
import ITextareaBasicExample from './basic.vue';
import ITextareaColorVariantsExample from './color-variants.vue';
import ITextareaClearableExample from './clearable.vue';
import ITextareaDisabledExample from './disabled.vue';
import ITextareaReadonlyExample from './readonly.vue';
import ITextareaSizeVariantsExample from './size-variants.vue';
import ITextareaPrependAppendTextExample from './prepend-append-text.vue';
import ITextareaPrependAppendButtonExample from './prepend-append-button.vue';
import ITextareaPrependAppendDropdownExample from './prepend-append-dropdown.vue';
import ITextareaPrefixSuffixExample from './prefix-suffix.vue';
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
