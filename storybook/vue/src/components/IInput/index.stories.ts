import { IInput } from '@inkline/inkline/components';
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
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IInput,
    title: 'Forms/Input',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IInputBasicExample);
export const ColorVariants = createStory(IInputColorVariantsExample);
export const Clearable = createStory(IInputClearableExample);
export const Disabled = createStory(IInputDisabledExample);
export const Readonly = createStory(IInputReadonlyExample);
export const SizeVariants = createStory(IInputSizeVariantsExample);
export const PrependAppendText = createStory(IInputPrependAppendTextExample);
export const PrependAppendButton = createStory(IInputPrependAppendButtonExample);
export const PrependAppendDropdown = createStory(IInputPrependAppendDropdownExample);
export const PrefixSuffix = createStory(IInputPrefixSuffixExample);
export const Type = createStory(IInputTypeExample);
