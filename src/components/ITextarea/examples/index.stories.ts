import ITextarea from '../index.vue';
import {
    ITextareaBasicExample,
    ITextareaColorVariantsExample,
    ITextareaClearableExample,
    ITextareaDisabledExample,
    ITextareaReadonlyExample,
    ITextareaSizeVariantsExample,
    ITextareaPrependAppendTextExample,
    ITextareaPrependAppendButtonExample,
    ITextareaPrependAppendDropdownExample,
    ITextareaPrefixSuffixExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ITextarea,
    title: 'Forms/Textarea',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        ITextareaBasicExample
    },
    setup: () => ({ args }),
    template: '<ITextareaBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const ColorVariants = () => ITextareaColorVariantsExample;
export const Clearable = () => ITextareaClearableExample;
export const Disabled = () => ITextareaDisabledExample;
export const Readonly = () => ITextareaReadonlyExample;
export const SizeVariants = () => ITextareaSizeVariantsExample;
export const PrependAppendText = () => ITextareaPrependAppendTextExample;
export const PrependAppendButton = () => ITextareaPrependAppendButtonExample;
export const PrependAppendDropdown = () => ITextareaPrependAppendDropdownExample;
export const PrefixSuffix = () => ITextareaPrefixSuffixExample;
