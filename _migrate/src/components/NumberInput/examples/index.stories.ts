import { NumberInput } from '@inkline/inkline/components/NumberInput/index';
import {
    NumberInputBasicExample,
    NumberInputColorVariantsExample,
    NumberInputClearableExample,
    NumberInputDisabledExample,
    NumberInputMinMaxExample,
    NumberInputPrecisionExample,
    NumberInputReadonlyExample,
    NumberInputSizeVariantsExample,
    NumberInputStepSizeExample,
    NumberInputPrependAppendTextExample,
    NumberInputPrependAppendButtonExample,
    NumberInputPrependAppendDropdownExample,
    NumberInputPrefixSuffixExample
} from '@inkline/inkline/components/NumberInput/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: NumberInput,
    title: 'Forms/NumberInput',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(NumberInputBasicExample);
export const ColorVariants = () => NumberInputColorVariantsExample;
export const Clearable = () => NumberInputClearableExample;
export const Disabled = () => NumberInputDisabledExample;
export const MinMax = () => NumberInputMinMaxExample;
export const Precision = () => NumberInputPrecisionExample;
export const Readonly = () => NumberInputReadonlyExample;
export const SizeVariants = () => NumberInputSizeVariantsExample;
export const StepSize = () => NumberInputStepSizeExample;
export const PrependAppendText = () => NumberInputPrependAppendTextExample;
export const PrependAppendButton = () => NumberInputPrependAppendButtonExample;
export const PrependAppendDropdown = () => NumberInputPrependAppendDropdownExample;
export const PrefixSuffix = () => NumberInputPrefixSuffixExample;
