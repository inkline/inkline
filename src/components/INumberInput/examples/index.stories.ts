import INumberInput from '../index.vue';
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
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: INumberInput,
    title: 'Forms/NumberInput',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(INumberInputBasicExample);
export const ColorVariants = () => INumberInputColorVariantsExample;
export const Clearable = () => INumberInputClearableExample;
export const Disabled = () => INumberInputDisabledExample;
export const MinMax = () => INumberInputMinMaxExample;
export const Precision = () => INumberInputPrecisionExample;
export const Readonly = () => INumberInputReadonlyExample;
export const SizeVariants = () => INumberInputSizeVariantsExample;
export const StepSize = () => INumberInputStepSizeExample;
export const PrependAppendText = () => INumberInputPrependAppendTextExample;
export const PrependAppendButton = () => INumberInputPrependAppendButtonExample;
export const PrependAppendDropdown = () => INumberInputPrependAppendDropdownExample;
export const PrefixSuffix = () => INumberInputPrefixSuffixExample;
