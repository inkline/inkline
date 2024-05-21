import IInput from '@inkline/inkline/components/IInput/IInput.vue';
import {
    IInputBasicExample,
    IInputColorVariantsExample,
    IInputClearableExample,
    IInputDisabledExample,
    IInputReadonlyExample,
    IInputSizeVariantsExample,
    IInputPrependAppendTextExample,
    IInputPrependAppendButtonExample,
    IInputPrependAppendDropdownExample,
    IInputPrefixSuffixExample,
    IInputTypeExample
} from '@inkline/inkline/components/IInput/examples/index';
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
