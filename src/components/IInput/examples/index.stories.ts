import IInput from '../index.vue';
import IInputBasicExample from './basic.vue';
import IInputColorVariantsExample from './color-variants.vue';
import IInputClearableExample from './clearable.vue';
import IInputDisabledExample from './disabled.vue';
import IInputReadonlyExample from './readonly.vue';
import IInputSizeVariantsExample from './size-variants.vue';
import IInputPrependAppendTextExample from './prepend-append-text.vue';
import IInputPrependAppendButtonExample from './prepend-append-button.vue';
import IInputPrependAppendDropdownExample from './prepend-append-dropdown.vue';
import IInputPrefixSuffixExample from './prefix-suffix.vue';
import IInputTypeExample from './type.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IInput,
    title: 'Forms/Input',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IInputBasicExample);
export const ColorVariants = () => IInputColorVariantsExample;
export const Clearable = () => IInputClearableExample;
export const Disabled = () => IInputDisabledExample;
export const Readonly = () => IInputReadonlyExample;
export const SizeVariants = () => IInputSizeVariantsExample;
export const PrependAppendText = () => IInputPrependAppendTextExample;
export const PrependAppendButton = () => IInputPrependAppendButtonExample;
export const PrependAppendDropdown = () => IInputPrependAppendDropdownExample;
export const PrefixSuffix = () => IInputPrefixSuffixExample;
export const Type = () => IInputTypeExample;
