import Input from '@inkline/inkline/components/Input/Input.vue';
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
} from '@inkline/inkline/components/Input/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Input,
    title: 'Forms/Input',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(InputBasicExample);
export const ColorVariants = () => InputColorVariantsExample;
export const Clearable = () => InputClearableExample;
export const Disabled = () => InputDisabledExample;
export const Readonly = () => InputReadonlyExample;
export const SizeVariants = () => InputSizeVariantsExample;
export const PrependAppendText = () => InputPrependAppendTextExample;
export const PrependAppendButton = () => InputPrependAppendButtonExample;
export const PrependAppendDropdown = () => InputPrependAppendDropdownExample;
export const PrefixSuffix = () => InputPrefixSuffixExample;
export const Type = () => InputTypeExample;
