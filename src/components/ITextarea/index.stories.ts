import ITextarea from './index.vue';
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
} from './examples';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: ITextarea,
    title: 'Components/Textarea',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-textarea v-bind="args">
        Textarea
    </i-textarea>`,
});

export const Component = Template.bind({});

export const Basic = () => ITextareaBasicExample;
export const ColorVariants = () => ITextareaColorVariantsExample;
export const Clearable = () => ITextareaClearableExample;
export const Disabled = () => ITextareaDisabledExample;
export const Readonly = () => ITextareaReadonlyExample;
export const SizeVariants = () => ITextareaSizeVariantsExample;
export const PrependAppendText = () => ITextareaPrependAppendTextExample;
export const PrependAppendButton = () => ITextareaPrependAppendButtonExample;
export const PrependAppendDropdown = () => ITextareaPrependAppendDropdownExample;
export const PrefixSuffix = () => ITextareaPrefixSuffixExample;
            