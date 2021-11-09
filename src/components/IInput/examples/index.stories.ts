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
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IInput,
    title: 'Forms/Input',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IInputBasicExample
    },
    setup: () => ({ args }),
    template: '<IInputBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
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
