import IInput from '../index.vue';
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
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IInput,
    title: 'Components/Input',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-input v-bind="args">
        Input
    </i-input>`,
});

export const Component = Template.bind({});

export const Basic = () => IInputBasicExample;
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
            