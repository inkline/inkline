import INumberInput from '../index.vue';
import INumberInputBasicExample from './basic.vue';
import INumberInputColorVariantsExample from './color-variants.vue';
import INumberInputClearableExample from './clearable.vue';
import INumberInputDisabledExample from './disabled.vue';
import INumberInputMinMaxExample from './minmax.vue';
import INumberInputPrecisionExample from './precision.vue';
import INumberInputReadonlyExample from './readonly.vue';
import INumberInputSizeVariantsExample from './size-variants.vue';
import INumberInputStepSizeExample from './step-size.vue';
import INumberInputPrependAppendTextExample from './prepend-append-text.vue';
import INumberInputPrependAppendButtonExample from './prepend-append-button.vue';
import INumberInputPrependAppendDropdownExample from './prepend-append-dropdown.vue';
import INumberInputPrefixSuffixExample from './prefix-suffix.vue';
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
