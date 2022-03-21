import { INumberInput } from '@inkline/inkline/components';
import {
    INumberInputBasicExample,
    INumberInputColorVariantsExample,
    INumberInputClearableExample,
    INumberInputDisabledExample,
    INumberInputMinMaxExample,
    INumberInputPrecisionExample,
    INumberInputReadonlyExample,
    INumberInputSizeVariantsExample,
    INumberInputStepSizeExample,
    INumberInputPrependAppendTextExample,
    INumberInputPrependAppendButtonExample,
    INumberInputPrependAppendDropdownExample,
    INumberInputPrefixSuffixExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: INumberInput,
    title: 'Forms/NumberInput',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(INumberInputBasicExample);
export const ColorVariants = createStory(INumberInputColorVariantsExample);
export const Clearable = createStory(INumberInputClearableExample);
export const Disabled = createStory(INumberInputDisabledExample);
export const MinMax = createStory(INumberInputMinMaxExample);
export const Precision = createStory(INumberInputPrecisionExample);
export const Readonly = createStory(INumberInputReadonlyExample);
export const SizeVariants = createStory(INumberInputSizeVariantsExample);
export const StepSize = createStory(INumberInputStepSizeExample);
export const PrependAppendText = createStory(INumberInputPrependAppendTextExample);
export const PrependAppendButton = createStory(INumberInputPrependAppendButtonExample);
export const PrependAppendDropdown = createStory(INumberInputPrependAppendDropdownExample);
export const PrefixSuffix = createStory(INumberInputPrefixSuffixExample);
