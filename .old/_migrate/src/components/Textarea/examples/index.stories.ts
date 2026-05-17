import { Textarea } from '@inkline/inkline/components/Textarea/index';
import {
    TextareaBasicExample,
    TextareaColorVariantsExample,
    TextareaClearableExample,
    TextareaDisabledExample,
    TextareaReadonlyExample,
    TextareaSizeVariantsExample,
    TextareaPrependAppendTextExample,
    TextareaPrependAppendButtonExample,
    TextareaPrependAppendDropdownExample,
    TextareaPrefixSuffixExample
} from '@inkline/inkline/components/Textarea/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Textarea,
    title: 'Forms/Textarea',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(TextareaBasicExample);
export const ColorVariants = () => TextareaColorVariantsExample;
export const Clearable = () => TextareaClearableExample;
export const Disabled = () => TextareaDisabledExample;
export const Readonly = () => TextareaReadonlyExample;
export const SizeVariants = () => TextareaSizeVariantsExample;
export const PrependAppendText = () => TextareaPrependAppendTextExample;
export const PrependAppendButton = () => TextareaPrependAppendButtonExample;
export const PrependAppendDropdown = () => TextareaPrependAppendDropdownExample;
export const PrefixSuffix = () => TextareaPrefixSuffixExample;
